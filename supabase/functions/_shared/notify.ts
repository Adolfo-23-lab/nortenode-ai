/**
 * Owner-notification rendering + send.
 *
 * Keeps copy in one place so the content the owner sees over WhatsApp
 * and email stays in lock-step.  Templates are Portuguese (pt-PT) —
 * the target personas (Portuguese small-business owners) read comfortably
 * in PT, and we don't want the dispatcher to call the LLM just to
 * translate a one-line alert.
 *
 * For WhatsApp, we send plain text which ONLY delivers if the owner's
 * number has messaged the sending WABA within the last 24 hours. For
 * out-of-window notifications Meta returns error 131047; the dispatcher
 * records it and the email path (when both channels are configured)
 * carries the notification through.  Approved templates are a follow-up.
 */

import type { SharedEnv } from "./env.ts";
import { sendWhatsAppText, stripPlus } from "./meta.ts";
import type { Database } from "./database.types.ts";

type NotificationRow = Database["public"]["Tables"]["notifications"]["Row"];
type NotificationEvent = Database["public"]["Enums"]["notification_event"];
type OrganizationRow = Database["public"]["Tables"]["organizations"]["Row"];

export interface NotificationRenderCtx {
  org: Pick<OrganizationRow, "name" | "timezone">;
}

export interface RenderedNotification {
  subject: string;
  text: string;
  html: string;
}

export function renderNotification(
  n: NotificationRow,
  ctx: NotificationRenderCtx,
): RenderedNotification {
  const event = n.event_type as NotificationEvent;
  const p     = (n.payload ?? {}) as Record<string, unknown>;
  const brand = ctx.org.name;

  switch (event) {
    case "hot_lead_captured": {
      const intent = asString(p.intent) ?? "novo contacto";
      const source = asString(p.source) ?? "widget";
      const subject = `🔥 Lead quente — ${brand}`;
      const text =
        `Novo lead QUENTE em ${brand}.\n\n` +
        `Intenção: ${intent}\n` +
        `Canal: ${source}\n\n` +
        `Entra no painel para contactar.`;
      return { subject, text, html: toHtml(subject, text) };
    }
    case "appointment_booked": {
      const when = formatWhen(asString(p.starts_at), ctx.org.timezone);
      const service = asString(p.service_name) ?? "serviço";
      const subject = `✅ Nova marcação — ${brand}`;
      const text =
        `Nova marcação confirmada em ${brand}.\n\n` +
        `Serviço: ${service}\n` +
        `Quando: ${when}\n`;
      return { subject, text, html: toHtml(subject, text) };
    }
    case "appointment_cancelled": {
      const when = formatWhen(asString(p.starts_at), ctx.org.timezone);
      const service = asString(p.service_name) ?? "serviço";
      const subject = `❌ Cancelamento — ${brand}`;
      const text =
        `Um cliente cancelou a marcação.\n\n` +
        `Serviço: ${service}\n` +
        `Quando: ${when}\n`;
      return { subject, text, html: toHtml(subject, text) };
    }
    case "bot_escalation": {
      const reason = asString(p.reason) ?? "motivo não especificado";
      const subject = `⚠️ Cliente pede ajuda humana — ${brand}`;
      const text =
        `O assistente IA passou uma conversa para humano.\n\n` +
        `Motivo: ${reason}\n\n` +
        `Responde pelo painel o quanto antes.`;
      return { subject, text, html: toHtml(subject, text) };
    }
    case "new_message_after_hours": {
      const subject = `📩 Mensagem fora de horas — ${brand}`;
      const text = `Um cliente escreveu fora do horário. Vê o painel quando puderes.`;
      return { subject, text, html: toHtml(subject, text) };
    }
    case "bot_error":
    default: {
      const subject = `ℹ️ Notificação — ${brand}`;
      const text = `Evento: ${event}`;
      return { subject, text, html: toHtml(subject, text) };
    }
  }
}

// ---------------------------------------------------------------------
// Email via Resend
// ---------------------------------------------------------------------
export interface SendResult {
  ok: boolean;
  providerMessageId?: string;
  error?: string;
}

export async function sendEmail(
  env: SharedEnv,
  to: string,
  r: RenderedNotification,
): Promise<SendResult> {
  if (!env.RESEND_API_KEY) {
    return { ok: false, error: "resend_api_key_missing" };
  }
  const from = `${env.RESEND_FROM_NAME} <${env.RESEND_FROM_EMAIL}>`;
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: env.RESEND_REPLY_TO,
      subject: r.subject,
      text:    r.text,
      html:    r.html,
    }),
  });

  if (!resp.ok) {
    const body = await safeJson(resp);
    return {
      ok: false,
      error: `resend_${resp.status}:${JSON.stringify(body).slice(0, 300)}`,
    };
  }
  const json = await safeJson(resp) as { id?: string };
  return { ok: true, providerMessageId: json?.id };
}

// ---------------------------------------------------------------------
// WhatsApp dispatch — send from a given tenant channel
// ---------------------------------------------------------------------
export async function sendWhatsAppNotification(
  env: SharedEnv,
  phoneNumberId: string,
  toE164: string,
  r: RenderedNotification,
): Promise<SendResult> {
  const result = await sendWhatsAppText(env, phoneNumberId, stripPlus(toE164), r.text);
  if (!result.ok) {
    return {
      ok: false,
      error: `meta_${result.status}:${JSON.stringify(result.errorBody).slice(0, 300)}`,
    };
  }
  return { ok: true, providerMessageId: result.messageId };
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------
function asString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function formatWhen(iso: string | undefined, tz: string): string {
  if (!iso) return "?";
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("pt-PT", {
      timeZone: tz,
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
  } catch {
    return iso;
  }
}

function toHtml(subject: string, text: string): string {
  const safe = text.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] ?? c));
  return `<div style="font-family:system-ui,-apple-system,sans-serif;color:#0a0a0a;font-size:15px;line-height:1.55;padding:24px;max-width:540px">
<h2 style="font-size:16px;margin:0 0 12px 0;color:#0a0a0a">${subject}</h2>
<pre style="white-space:pre-wrap;font-family:inherit;margin:0">${safe}</pre>
<p style="color:#888;font-size:12px;margin-top:24px">NorteNode — alerta automático</p>
</div>`;
}

async function safeJson(resp: Response): Promise<unknown> {
  try { return await resp.json(); } catch { return null; }
}
