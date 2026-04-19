/**
 * Meta WhatsApp Cloud API helpers for Edge Functions.
 * Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
 *
 * Scope: signature verification of inbound webhooks, typed payload
 * parsing, and a minimal typed sender for outbound text/template
 * messages.  Deliberately small — we trade breadth for auditability.
 */

import type { SharedEnv } from "./env.ts";

// ---------------------------------------------------------------------
// Signature verification (X-Hub-Signature-256)
// ---------------------------------------------------------------------
export async function verifyMetaSignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string,
): Promise<boolean> {
  if (!signatureHeader) return false;
  const expectedPrefix = "sha256=";
  if (!signatureHeader.startsWith(expectedPrefix)) return false;

  const provided = signatureHeader.slice(expectedPrefix.length).toLowerCase();

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(rawBody),
  );
  const computed = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Timing-safe comparison
  if (provided.length !== computed.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) {
    diff |= provided.charCodeAt(i) ^ computed.charCodeAt(i);
  }
  return diff === 0;
}

// ---------------------------------------------------------------------
// Typed payloads (only the fields we care about)
// ---------------------------------------------------------------------
export interface MetaInboundMessage {
  id: string;            // wamid — idempotency key for our messages table
  from: string;          // contact phone in E.164 without +
  timestamp: string;     // unix seconds as string
  type: "text" | "image" | "audio" | "video" | "document" | "sticker"
      | "location" | "interactive" | "button" | "reaction";
  text?: { body: string };
  image?:    { id: string; mime_type: string; sha256?: string; caption?: string };
  audio?:    { id: string; mime_type: string; voice?: boolean };
  video?:    { id: string; mime_type: string; sha256?: string; caption?: string };
  document?: { id: string; mime_type: string; filename?: string; sha256?: string };
  sticker?:  { id: string; mime_type: string; animated?: boolean };
}

export interface MetaContactProfile {
  profile: { name?: string };
  wa_id: string;
}

export interface MetaChangeValue {
  messaging_product: "whatsapp";
  metadata: {
    display_phone_number: string;
    phone_number_id: string;        // maps to channels.external_id
  };
  contacts?: MetaContactProfile[];
  messages?: MetaInboundMessage[];
  statuses?: Array<{
    id: string;
    status: "sent" | "delivered" | "read" | "failed";
    timestamp: string;
    recipient_id: string;
  }>;
}

export interface MetaWebhookPayload {
  object: "whatsapp_business_account";
  entry: Array<{
    id: string;
    changes: Array<{
      field: "messages";
      value: MetaChangeValue;
    }>;
  }>;
}

export function parseWebhookPayload(raw: string): MetaWebhookPayload | null {
  try {
    const json = JSON.parse(raw);
    if (json?.object === "whatsapp_business_account" && Array.isArray(json.entry)) {
      return json as MetaWebhookPayload;
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------
// Outbound: send a plain text message
// ---------------------------------------------------------------------
export interface SendTextResult {
  ok: boolean;
  messageId?: string;
  status: number;
  errorBody?: unknown;
}

export async function sendWhatsAppText(
  env: SharedEnv,
  phoneNumberId: string,
  toE164NoPlus: string,
  body: string,
): Promise<SendTextResult> {
  const url = `https://graph.facebook.com/${env.META_GRAPH_API_VERSION}/${phoneNumberId}/messages`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.META_WHATSAPP_TOKEN}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type:    "individual",
      to:                toE164NoPlus,
      type:              "text",
      text:              { preview_url: false, body },
    }),
  });

  if (!resp.ok) {
    const errorBody = await safeJson(resp);
    return { ok: false, status: resp.status, errorBody };
  }

  const json = await safeJson(resp) as { messages?: Array<{ id: string }> };
  return {
    ok: true,
    status: resp.status,
    messageId: json?.messages?.[0]?.id,
  };
}

// ---------------------------------------------------------------------
// Outbound: send an approved template (pre-registered in Meta)
// ---------------------------------------------------------------------
export async function sendWhatsAppTemplate(
  env: SharedEnv,
  phoneNumberId: string,
  toE164NoPlus: string,
  templateName: string,
  languageCode: string,
  bodyParams: string[] = [],
): Promise<SendTextResult> {
  const url = `https://graph.facebook.com/${env.META_GRAPH_API_VERSION}/${phoneNumberId}/messages`;
  const components = bodyParams.length
    ? [{
        type: "body",
        parameters: bodyParams.map((t) => ({ type: "text", text: t })),
      }]
    : undefined;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.META_WHATSAPP_TOKEN}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to:                toE164NoPlus,
      type:              "template",
      template: {
        name:     templateName,
        language: { code: languageCode },
        ...(components ? { components } : {}),
      },
    }),
  });

  if (!resp.ok) {
    return { ok: false, status: resp.status, errorBody: await safeJson(resp) };
  }
  const json = await safeJson(resp) as { messages?: Array<{ id: string }> };
  return { ok: true, status: resp.status, messageId: json?.messages?.[0]?.id };
}

async function safeJson(resp: Response): Promise<unknown> {
  try { return await resp.json(); } catch { return null; }
}

// ---------------------------------------------------------------------
// Normalize phone: Meta gives "351911111111"; we store "+351911111111"
// ---------------------------------------------------------------------
export function toE164WithPlus(rawFromMeta: string): string {
  return rawFromMeta.startsWith("+") ? rawFromMeta : `+${rawFromMeta}`;
}

export function stripPlus(e164: string): string {
  return e164.startsWith("+") ? e164.slice(1) : e164;
}

// ---------------------------------------------------------------------
// Media download (two-step: metadata lookup → binary fetch)
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media
// ---------------------------------------------------------------------

const ALLOWED_MIME = new Set<string>([
  "image/jpeg", "image/png", "image/webp", "image/gif",
  "audio/ogg", "audio/mpeg", "audio/mp4", "audio/amr", "audio/aac",
  "video/mp4", "video/3gpp",
  "application/pdf",
]);

const MAX_BYTES = 20 * 1024 * 1024;  // 20 MB — matches storage bucket cap

export interface DownloadedMedia {
  bytes:     Uint8Array;
  mimeType:  string;
  sizeBytes: number;
  ext:       string;
  sha256?:   string;
}

export async function downloadMetaMedia(
  env: SharedEnv,
  mediaId: string,
): Promise<DownloadedMedia> {
  // Step 1: resolve signed URL + MIME
  const metaUrl = `https://graph.facebook.com/${env.META_GRAPH_API_VERSION}/${mediaId}`;
  const metaResp = await fetch(metaUrl, {
    headers: { "Authorization": `Bearer ${env.META_WHATSAPP_TOKEN}` },
  });
  if (!metaResp.ok) {
    throw new Error(`meta_media_meta_${metaResp.status}:${(await metaResp.text()).slice(0, 200)}`);
  }
  const meta = await metaResp.json() as {
    url?: string;
    mime_type?: string;
    sha256?: string;
    file_size?: number;
  };
  if (!meta.url || !meta.mime_type) {
    throw new Error("meta_media_metadata_incomplete");
  }
  if (!ALLOWED_MIME.has(meta.mime_type)) {
    throw new Error(`meta_media_mime_rejected:${meta.mime_type}`);
  }
  if (typeof meta.file_size === "number" && meta.file_size > MAX_BYTES) {
    throw new Error(`meta_media_too_large:${meta.file_size}`);
  }

  // Step 2: fetch binary (requires same bearer token)
  const binResp = await fetch(meta.url, {
    headers: { "Authorization": `Bearer ${env.META_WHATSAPP_TOKEN}` },
  });
  if (!binResp.ok) {
    throw new Error(`meta_media_binary_${binResp.status}`);
  }
  const buf = new Uint8Array(await binResp.arrayBuffer());
  if (buf.byteLength > MAX_BYTES) {
    throw new Error(`meta_media_binary_too_large:${buf.byteLength}`);
  }

  return {
    bytes:     buf,
    mimeType:  meta.mime_type,
    sizeBytes: buf.byteLength,
    ext:       mimeToExt(meta.mime_type),
    sha256:    meta.sha256,
  };
}

export function mimeToExt(mime: string): string {
  switch (mime) {
    case "image/jpeg": return "jpg";
    case "image/png":  return "png";
    case "image/webp": return "webp";
    case "image/gif":  return "gif";
    case "audio/ogg":  return "ogg";
    case "audio/mpeg": return "mp3";
    case "audio/mp4":  return "m4a";
    case "audio/amr":  return "amr";
    case "audio/aac":  return "aac";
    case "video/mp4":  return "mp4";
    case "video/3gpp": return "3gp";
    case "application/pdf": return "pdf";
    default: return "bin";
  }
}
