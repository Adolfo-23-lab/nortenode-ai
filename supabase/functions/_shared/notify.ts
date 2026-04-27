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
type LeadTemperature = Database["public"]["Enums"]["lead_temperature"];

/** Full lead+contact context the dispatcher may pre-fetch for hot_lead_captured. */
export interface LeadDetails {
  lead_id:     string;
  intent:      string | null;
  source:      string | null;
  temperature: LeadTemperature | null;
  notes:       string | null;
  created_at:  string;
  contact: {
    full_name: string | null;
    email:     string | null;
    phone:     string | null;
  };
}

export interface NotificationRenderCtx {
  org: Pick<OrganizationRow, "name" | "timezone">;
  lead?: LeadDetails;
}

export interface RenderedNotification {
  subject: string;
  text: string;
  html: string;
  /** Per-message Reply-To override (e.g. lead's email so owner can reply directly). */
  replyTo?: string;
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
      // Rich template when dispatcher pre-fetched the lead + contact.
      // Falls back to minimal payload-only template otherwise (e.g. WhatsApp
      // notifications, where we don't run the JOIN).
      if (ctx.lead) {
        return renderHotLeadRich(ctx.lead, ctx.org.timezone);
      }
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
      reply_to: r.replyTo ?? env.RESEND_REPLY_TO,
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

function temperatureLabel(t: LeadTemperature | null | undefined): string {
  if (t === "hot")  return "QUENTE";
  if (t === "warm") return "MORNO";
  if (t === "cold") return "FRIO";
  return "QUENTE";
}

function formatLeadTimestamp(iso: string, tz: string): string {
  try {
    return new Intl.DateTimeFormat("pt-PT", {
      timeZone: tz,
      day:    "2-digit",
      month:  "2-digit",
      year:   "numeric",
      hour:   "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&"']/g, (c) => (
    { "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;", "'": "&#39;" }[c] ?? c
  ));
}

function renderHotLeadRich(lead: LeadDetails, tz: string): RenderedNotification {
  const tempUpper = temperatureLabel(lead.temperature);
  const name      = lead.contact.full_name?.trim() || "(sem nome)";
  const email     = lead.contact.email?.trim()     || "";
  const phone     = lead.contact.phone?.trim()     || "";
  const source    = lead.source                    || "desconhecido";
  const intent    = lead.intent                    || "(sem intenção registada)";
  const message   = lead.notes?.trim()             || "(sem mensagem)";
  const when      = formatLeadTimestamp(lead.created_at, tz);

  const subject = `🔥 Lead ${tempUpper} — ${name} (${source})`;

  const text =
    `🔥 NOVO LEAD ${tempUpper} — NorteNode\n\n` +
    `NOME:     ${name}\n` +
    `EMAIL:    ${email || "(não fornecido)"}\n` +
    `TELEFONE: ${phone || "(não fornecido)"}\n` +
    `CANAL:    ${source}\n` +
    `INTENÇÃO: ${intent}\n` +
    `RECEBIDO: ${when}\n\n` +
    `MENSAGEM:\n${message}\n\n` +
    `—\nLead ID: ${lead.lead_id}\nNorteNode — sistema automático`;

  const emailLink = email
    ? `<a href="mailto:${escapeHtml(email)}" style="color: #00d4ff; text-decoration: none;">${escapeHtml(email)}</a>`
    : `<span style="color: #6b7280;">(não fornecido)</span>`;
  const phoneLink = phone
    ? `<a href="tel:${escapeHtml(phone)}" style="color: #0a0d12; text-decoration: none;">${escapeHtml(phone)}</a>`
    : `<span style="color: #6b7280;">(não fornecido)</span>`;

  const labelStyle = `padding: 12px 0; color: #6b7280; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; vertical-align: top; width: 120px;`;
  const valueStyle = `padding: 12px 0; color: #0a0d12; font-weight: 500;`;
  const sepLabel   = `${labelStyle} border-top: 1px solid rgba(10,13,18,0.05);`;
  const sepValue   = `padding: 12px 0; border-top: 1px solid rgba(10,13,18,0.05); color: #0a0d12;`;

  const html = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Geist Sans', 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; color: #0a0d12;">
  <h2 style="font-size: 20px; font-weight: 500; margin: 0 0 24px 0; padding-bottom: 16px; border-bottom: 1px solid rgba(10,13,18,0.08);">🔥 Novo Lead ${escapeHtml(tempUpper)}</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr>
      <td style="${labelStyle}">NOME</td>
      <td style="${valueStyle}">${escapeHtml(name)}</td>
    </tr>
    <tr>
      <td style="${sepLabel}">EMAIL</td>
      <td style="${sepValue}">${emailLink}</td>
    </tr>
    <tr>
      <td style="${sepLabel}">TELEFONE</td>
      <td style="${sepValue}">${phoneLink}</td>
    </tr>
    <tr>
      <td style="${sepLabel}">CANAL</td>
      <td style="${sepValue}">${escapeHtml(source)}</td>
    </tr>
    <tr>
      <td style="${sepLabel}">INTENÇÃO</td>
      <td style="${sepValue}">${escapeHtml(intent)}</td>
    </tr>
    <tr>
      <td style="${sepLabel}">RECEBIDO</td>
      <td style="${sepValue}">${escapeHtml(when)}</td>
    </tr>
  </table>
  <div style="margin-top: 32px; padding: 16px; background: #f5f5f5; border-left: 3px solid #00d4ff; border-radius: 4px;">
    <div style="color: #6b7280; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; margin-bottom: 8px;">MENSAGEM</div>
    <div style="color: #0a0d12; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
  </div>
  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(10,13,18,0.08); font-size: 12px; color: #6b7280;">
    Lead ID: ${escapeHtml(lead.lead_id)}<br/>
    NorteNode — sistema automático de notificações
  </div>
</div>`;

  return { subject, text, html, replyTo: email || undefined };
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
