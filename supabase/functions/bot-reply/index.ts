/**
 * Edge Function: bot-reply
 *
 * Invoked internally (service-role) to generate a bot reply for an
 * existing conversation_id.  Used when:
 *   - The whatsapp-webhook defers reply generation (future: async queue)
 *   - The Dashboard triggers a "nudge" reply manually
 *
 * NOT exposed to anonymous callers — requires a valid service-role JWT.
 *
 * Deploy:
 *   supabase functions deploy bot-reply
 */

import { loadEnv } from "../_shared/env.ts";
import { serviceClient } from "../_shared/supabase.ts";
import { generateAndPersistReply } from "../_shared/bot.ts";
import { sendWhatsAppText } from "../_shared/meta.ts";
import type { Database } from "../_shared/database.types.ts";

const env = loadEnv();

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("method_not_allowed", { status: 405 });
  }

  let body: { conversation_id?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const conversationId = body.conversation_id;
  if (!conversationId || typeof conversationId !== "string") {
    return json({ error: "missing_conversation_id" }, 400);
  }

  const sb = serviceClient(env);

  const { data: conv, error: convErr } = await sb
    .from("conversations")
    .select("id, org_id, channel_id, contact_id, bot_enabled")
    .eq("id", conversationId)
    .single();
  if (convErr || !conv) return json({ error: "conversation_not_found" }, 404);

  if (!conv.bot_enabled) return json({ error: "bot_disabled" }, 409);

  try {
    const reply = await generateAndPersistReply(env, sb, conversationId);

    // If the conversation lives on a WhatsApp channel, also send via Meta.
    const { data: channel } = await sb
      .from("channels")
      .select("type, external_id")
      .eq("id", conv.channel_id)
      .maybeSingle();

    if (channel?.type === "whatsapp" && channel.external_id) {
      const { data: contact } = await sb
        .from("contacts")
        .select("phone_e164")
        .eq("id", conv.contact_id)
        .single();

      if (contact?.phone_e164) {
        const to = contact.phone_e164.replace(/^\+/, "");
        const sendResult = await sendWhatsAppText(env, channel.external_id, to, reply.text);
        await sb.from("messages")
          .update({
            status:      sendResult.ok ? "sent" : "failed",
            external_id: sendResult.messageId ?? null,
            error_text:  sendResult.ok ? null : JSON.stringify(sendResult.errorBody).slice(0, 1000),
          })
          .eq("id", reply.messageId);
      }
    }

    return json({ ok: true, message_id: reply.messageId, text: reply.text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("bot_reply_error", message);
    return json({ ok: false, error: message }, 500);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export type _BotReplyInput = { conversation_id: string };
export type _MessageRow = Database["public"]["Tables"]["messages"]["Row"];
