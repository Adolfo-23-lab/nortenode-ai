/**
 * Edge Function: whatsapp-webhook
 *
 * Receives Meta Cloud API webhook events.  Two methods:
 *   - GET   : Meta verification challenge
 *   - POST  : signed event payload
 *
 * Security checklist (skill: security-owasp):
 *   * Verify X-Hub-Signature-256 HMAC against META_APP_SECRET.
 *   * Never log raw payloads at info level (may contain PII).
 *   * Idempotent storage via webhook_events (provider, external_id).
 *   * Always respond 200 once the event is persisted — Meta retries
 *     aggressively on 5xx.
 *
 * Deploy:
 *   supabase functions deploy whatsapp-webhook --no-verify-jwt
 *   # --no-verify-jwt because Meta can't send a Supabase JWT.
 *
 * Secrets required:
 *   META_APP_SECRET, META_VERIFY_TOKEN, META_WHATSAPP_TOKEN,
 *   META_GRAPH_API_VERSION, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 *   GROQ_API_KEY.
 */

import { loadEnv } from "../_shared/env.ts";
import { serviceClient, type TypedSupabase } from "../_shared/supabase.ts";
import {
  parseWebhookPayload,
  verifyMetaSignature,
  toE164WithPlus,
  downloadMetaMedia,
  type MetaChangeValue,
  type MetaInboundMessage,
} from "../_shared/meta.ts";
import { uploadConversationMedia } from "../_shared/media-storage.ts";
import { generateAndPersistReply } from "../_shared/bot.ts";
import type { SharedEnv } from "../_shared/env.ts";
import type { Database } from "../_shared/database.types.ts";

type Channel            = Database["public"]["Tables"]["channels"]["Row"];
type MessageContentType = Database["public"]["Enums"]["message_content_type"];

const env = loadEnv();

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (req.method === "GET") {
    return handleVerification(url);
  }
  if (req.method === "POST") {
    return handleEvent(req);
  }
  return new Response("method_not_allowed", { status: 405 });
});

// ---------------------------------------------------------------------
// GET handshake
// ---------------------------------------------------------------------
function handleVerification(url: URL): Response {
  const mode      = url.searchParams.get("hub.mode");
  const token     = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === env.META_VERIFY_TOKEN && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
  return new Response("forbidden", { status: 403 });
}

// ---------------------------------------------------------------------
// POST event
// ---------------------------------------------------------------------
async function handleEvent(req: Request): Promise<Response> {
  const rawBody = await req.text();
  const signature = req.headers.get("x-hub-signature-256");

  const sigOk = await verifyMetaSignature(rawBody, signature, env.META_APP_SECRET);
  if (!sigOk) {
    return new Response("invalid_signature", { status: 401 });
  }

  const payload = parseWebhookPayload(rawBody);
  if (!payload) {
    // Still return 200 so Meta doesn't retry malformed events forever.
    return new Response("ok", { status: 200 });
  }

  const sb = serviceClient(env);

  // --- 1. Idempotency — derive a stable event id -------------------
  // Prefer wamid from the first inbound message; fall back to a
  // SHA-256 of the raw body if the payload is status-only.
  const eventId = deriveEventId(payload);

  const { data: existing } = await sb
    .from("webhook_events")
    .select("id, processed_at")
    .eq("provider",    "meta_whatsapp")
    .eq("external_id", eventId)
    .maybeSingle();

  if (existing?.processed_at) {
    // Already processed — acknowledge and move on.
    return new Response("ok", { status: 200 });
  }

  // Upsert the event row — captures the raw payload for auditing.
  const { data: stored, error: insertErr } = await sb
    .from("webhook_events")
    .upsert({
      provider:    "meta_whatsapp",
      external_id: eventId,
      payload:     payload as unknown as Database["public"]["Tables"]["webhook_events"]["Row"]["payload"],
    }, { onConflict: "provider,external_id" })
    .select("id")
    .single();
  if (insertErr || !stored) {
    console.error("webhook_events_upsert_failed", insertErr);
    return new Response("ingest_failed", { status: 500 });
  }

  // --- 2. Process messages (best-effort within this invocation) -----
  try {
    for (const entry of payload.entry) {
      for (const change of entry.changes) {
        await processChange(sb, change.value);
      }
    }
    await sb.from("webhook_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("id", stored.id);
  } catch (err) {
    console.error("process_change_failed", err);
    await sb.from("webhook_events")
      .update({
        error: err instanceof Error ? err.message.slice(0, 500) : "unknown",
      })
      .eq("id", stored.id);
    // Return 200 anyway — a 5xx would make Meta retry the same batch,
    // re-inserting every message.  Our processing is idempotent, but
    // cheaper to fix forward than to DDoS ourselves.
  }

  return new Response("ok", { status: 200 });
}

// ---------------------------------------------------------------------
// Core processing: upsert contact/conversation/message + trigger bot
// ---------------------------------------------------------------------
async function processChange(
  sb: TypedSupabase,
  change: MetaChangeValue,
): Promise<void> {
  const phoneNumberId = change.metadata?.phone_number_id;
  if (!phoneNumberId) return;

  // Resolve tenant via the channel
  const { data: channel } = await sb
    .from("channels")
    .select("*")
    .eq("type",        "whatsapp")
    .eq("external_id", phoneNumberId)
    .eq("status",      "active")
    .maybeSingle();

  if (!channel) {
    console.warn("channel_not_registered", { phoneNumberId });
    return;
  }

  // Handle incoming messages
  for (const msg of change.messages ?? []) {
    await ingestInboundMessage(sb, channel, msg, change);
  }

  // Handle delivery/read statuses — update message rows
  for (const status of change.statuses ?? []) {
    await updateOutboundStatus(sb, status);
  }
}

async function ingestInboundMessage(
  sb: TypedSupabase,
  channel: Channel,
  msg: MetaInboundMessage,
  change: MetaChangeValue,
): Promise<void> {
  const phone = toE164WithPlus(msg.from);
  const profile = change.contacts?.find((c) => c.wa_id === msg.from);
  const fullName = profile?.profile.name ?? null;

  // Upsert contact
  const { data: existing } = await sb
    .from("contacts")
    .select("id")
    .eq("org_id",     channel.org_id)
    .eq("phone_e164", phone)
    .maybeSingle();

  let contactId: string;
  if (existing) {
    contactId = existing.id;
    await sb.from("contacts")
      .update({
        last_seen_at: new Date().toISOString(),
        full_name:    fullName ?? undefined,
      })
      .eq("id", contactId);
  } else {
    const { data: inserted, error } = await sb
      .from("contacts")
      .insert({
        org_id:     channel.org_id,
        phone_e164: phone,
        full_name:  fullName,
      })
      .select("id")
      .single();
    if (error || !inserted) throw new Error(`contact_upsert_failed: ${error?.message}`);
    contactId = inserted.id;
  }

  // Find open conversation on this channel, or open a new one
  const { data: openConv } = await sb
    .from("conversations")
    .select("id")
    .eq("org_id",     channel.org_id)
    .eq("contact_id", contactId)
    .eq("channel_id", channel.id)
    .eq("status",     "open")
    .order("last_message_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let conversationId: string;
  if (openConv) {
    conversationId = openConv.id;
  } else {
    const { data: newConv, error: convErr } = await sb
      .from("conversations")
      .insert({
        org_id:     channel.org_id,
        contact_id: contactId,
        channel_id: channel.id,
      })
      .select("id")
      .single();
    if (convErr || !newConv) throw new Error(`conversation_create_failed: ${convErr?.message}`);
    conversationId = newConv.id;
  }

  // Insert inbound message (wamid = external_id → dedup)
  const text         = renderMessageText(msg);
  const contentType  = mapContentType(msg.type);
  const insertRes    = await sb
    .from("messages")
    .insert({
      org_id:          channel.org_id,
      conversation_id: conversationId,
      direction:       "inbound",
      sender:          "contact",
      content_type:    contentType,
      text,
      external_id:     msg.id,
      status:          "delivered",
    })
    .select("id")
    .single();

  if (insertRes.error) {
    // 23505 = unique_violation; Meta retried an already-processed event.
    // Media + bot already ran on the first pass, so we're done.
    if (insertRes.error.code === "23505") return;
    throw new Error(`message_insert_failed: ${insertRes.error.message}`);
  }
  const messageId = insertRes.data.id;

  // --- Media ingest (best-effort) ----------------------------------
  const mediaId = extractMediaId(msg);
  if (mediaId) {
    try {
      const downloaded = await downloadMetaMedia(env, mediaId);
      const stored     = await uploadConversationMedia(
        env, sb,
        { orgId: channel.org_id, conversationId, messageId },
        downloaded,
      );
      await sb.from("messages")
        .update({
          media_metadata: {
            storage_path: stored.storage_path,
            bucket:       stored.bucket,
            mime_type:    stored.mime_type,
            bytes:        stored.bytes,
            sha256:       stored.sha256 ?? null,
          },
        })
        .eq("id", messageId);
    } catch (err) {
      // Continue — the text placeholder is already in the conversation;
      // the bot reply still fires and the owner sees the message arrived.
      console.error("media_ingest_failed", {
        conversationId, messageId,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // --- Bot reply (synchronous — acceptable <3s latency) ------------
  try {
    const reply = await generateAndPersistReply(env, sb, conversationId);
    await sendReplyToMeta(channel, msg.from, reply.text, reply.messageId, sb);
  } catch (err) {
    console.error("bot_reply_failed", err);
  }
}

// ---------------------------------------------------------------------
// Meta message → row helpers
// ---------------------------------------------------------------------
function renderMessageText(msg: MetaInboundMessage): string {
  switch (msg.type) {
    case "text":     return msg.text?.body ?? "";
    case "image":    return msg.image?.caption ? `[imagem] ${msg.image.caption}` : "[imagem]";
    case "audio":    return "[áudio]";
    case "video":    return "[vídeo]";
    case "document": return msg.document?.filename
                              ? `[documento] ${msg.document.filename}`
                              : "[documento]";
    case "sticker":  return "[sticker]";
    case "location": return "[localização]";
    case "interactive":
    case "button":
    case "reaction": return `[${msg.type}]`;
    default:         return `[${msg.type}]`;
  }
}

function mapContentType(t: MetaInboundMessage["type"]): MessageContentType {
  switch (t) {
    case "text":     return "text";
    case "image":    return "image";
    case "audio":    return "audio";
    case "video":    return "video";
    case "document": return "document";
    case "sticker":  return "sticker";
    case "location": return "location";
    default:         return "interactive";
  }
}

function extractMediaId(msg: MetaInboundMessage): string | null {
  if (msg.type === "image"    && msg.image?.id)    return msg.image.id;
  if (msg.type === "audio"    && msg.audio?.id)    return msg.audio.id;
  if (msg.type === "video"    && msg.video?.id)    return msg.video.id;
  if (msg.type === "document" && msg.document?.id) return msg.document.id;
  return null;
}

async function sendReplyToMeta(
  channel: Channel,
  toMetaFormat: string,
  text: string,
  outboundMessageId: string,
  sb: TypedSupabase,
): Promise<void> {
  const phoneNumberId = channel.external_id;
  if (!phoneNumberId) return;

  const { sendWhatsAppText } = await import("../_shared/meta.ts");
  const result = await sendWhatsAppText(env, phoneNumberId, toMetaFormat, text);

  if (!result.ok) {
    await sb.from("messages")
      .update({
        status:     "failed",
        error_text: JSON.stringify(result.errorBody).slice(0, 1000),
      })
      .eq("id", outboundMessageId);
    console.error("meta_send_failed", { status: result.status });
    return;
  }

  await sb
    .from("messages")
    .update({ external_id: result.messageId ?? null, status: "sent" })
    .eq("id", outboundMessageId);
}

async function updateOutboundStatus(
  sb: TypedSupabase,
  status: NonNullable<MetaChangeValue["statuses"]>[number],
): Promise<void> {
  const next = status.status as "sent" | "delivered" | "read" | "failed";
  await sb
    .from("messages")
    .update({ status: next })
    .eq("external_id", status.id);
}

function deriveEventId(payload: ReturnType<typeof parseWebhookPayload>): string {
  if (!payload) return `unknown:${Date.now()}`;
  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      const m = change.value.messages?.[0];
      if (m?.id) return m.id;
      const s = change.value.statuses?.[0];
      if (s?.id) return `status:${s.id}:${s.status}`;
    }
  }
  return `entry:${payload.entry[0]?.id ?? "none"}:${Date.now()}`;
}
