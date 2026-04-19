import { groq } from "@ai-sdk/groq";
import { streamText, stepCountIs, type ModelMessage } from "ai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { resolveBotChannel, type BotChannelKey } from "@/lib/tenant-config";
import { createRateLimiter } from "@/lib/rate-limit";
import { createBotTools, bookingTimeHint } from "@/lib/bot-tools";
import type { Database } from "@/lib/database.types";

export const maxDuration = 30;

type BotConfigRow = Database["public"]["Tables"]["bot_configs"]["Row"];
type MessageRow   = Database["public"]["Tables"]["messages"]["Row"];

const chatLimiter = createRateLimiter({ windowMs: 60_000, maxRequests: 20 });

const HISTORY_LIMIT = 30;
const BOT_CHANNEL_KEYS: readonly BotChannelKey[] = ["sales", "demo"] as const;

interface ChatRequestBody {
  messages?: unknown;
  botType?:  BotChannelKey;
  sessionId?: string;
}

export async function POST(req: Request): Promise<Response> {
  // ------------------------------------------------------------------
  // 1. Rate limit by IP
  // ------------------------------------------------------------------
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!chatLimiter.check(ip)) {
    return problem(429, "rate_limited", "Too many requests. Please wait a moment.");
  }

  // ------------------------------------------------------------------
  // 2. Parse + validate body
  // ------------------------------------------------------------------
  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return problem(400, "invalid_json", "Invalid request body.");
  }

  // DEV diagnostics — prints the first 500 chars of the request body the
  // very first time a validation fails, so we can diagnose shape issues
  // coming from the AI SDK without sniffing the browser.
  const dev = process.env.NODE_ENV !== "production";

  const botType = body.botType;
  if (!botType || !BOT_CHANNEL_KEYS.includes(botType)) {
    if (dev) console.warn("[api/chat] invalid_bot_type", {
      botType,
      keys: Object.keys(body),
    });
    return problem(400, "invalid_bot_type", `Unknown bot channel: ${String(botType)}`);
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  if (sessionId.length < 8 || sessionId.length > 128) {
    if (dev) console.warn("[api/chat] invalid_session_id", {
      received: body.sessionId,
      length: sessionId.length,
    });
    return problem(400, "invalid_session_id", "Missing or invalid session id.");
  }

  const latestUserText = extractLatestUserText(body.messages);
  if (!latestUserText || latestUserText.length > 4000) {
    if (dev) {
      const msgs = Array.isArray(body.messages) ? body.messages : [];
      const last = msgs[msgs.length - 1];
      console.warn("[api/chat] invalid_message", {
        messagesIsArray: Array.isArray(body.messages),
        messagesLen: msgs.length,
        lastRole: (last as { role?: string })?.role,
        lastShape: last ? Object.keys(last as object) : null,
        lastSerialized: JSON.stringify(last).slice(0, 400),
      });
    }
    return problem(400, "invalid_message", "Empty or oversized message.");
  }

  // ------------------------------------------------------------------
  // 3. Ingest inbound message via tenant-scoped RPC
  // ------------------------------------------------------------------
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    console.error("supabase_admin_unavailable", err);
    return problem(500, "service_unavailable", "Service temporarily unavailable.");
  }

  const { widgetToken } = resolveBotChannel(botType);

  const { data: conversationId, error: ingestErr } = await supabase.rpc(
    "ingest_widget_message",
    {
      p_channel_token: widgetToken,
      p_session_id:    sessionId,
      p_text:          latestUserText,
    },
  );

  if (ingestErr || !conversationId) {
    console.error("ingest_widget_message failed", ingestErr);
    return problem(502, "ingest_failed", "Could not register your message.");
  }

  // ------------------------------------------------------------------
  // 4. Load bot config (channel-scoped or org-default) + history + tz
  // ------------------------------------------------------------------
  const { data: conv, error: convErr } = await supabase
    .from("conversations")
    .select("id, org_id, channel_id, bot_enabled")
    .eq("id", conversationId)
    .single();
  if (convErr || !conv) {
    return problem(502, "conversation_lookup_failed", "Conversation state error.");
  }
  if (!conv.bot_enabled) {
    return problem(409, "bot_disabled", "Bot currently disabled for this conversation.");
  }

  const botCfg = await loadBotConfig(supabase, conv.org_id, conv.channel_id);
  if (!botCfg) {
    return problem(500, "bot_config_missing", "No bot configured for this tenant.");
  }

  const { data: org } = await supabase
    .from("organizations")
    .select("timezone")
    .eq("id", conv.org_id)
    .single();
  const timezone = org?.timezone ?? "Europe/Lisbon";

  const history = await loadHistory(supabase, conversationId);

  // ------------------------------------------------------------------
  // 5. Stream LLM reply (with tool-calling) + persist on finish
  // ------------------------------------------------------------------
  const modelMessages: ModelMessage[] = history.map(rowToModelMessage).filter(nonNull);
  const tools = createBotTools(supabase, { conversationId });

  const result = streamText({
    model:       groq(botCfg.model),
    system:      `${botCfg.system_prompt}\n\n${bookingTimeHint(timezone)}`,
    messages:    modelMessages,
    temperature: Number(botCfg.temperature ?? 0.4),
    tools,
    stopWhen:    stepCountIs(3),
    onFinish: async ({ text, totalUsage }) => {
      const reply = sanitizeForUser(text?.trim() ?? "");
      if (!reply) return;
      const { error } = await supabase.rpc("append_bot_message", {
        p_conversation_id: conversationId,
        p_text:            reply,
        p_token_usage:     totalUsage
          ? {
              prompt:     totalUsage.inputTokens,
              completion: totalUsage.outputTokens,
              total:      totalUsage.totalTokens,
            }
          : null,
          p_external_id:   null,
      });
      if (error) console.error("append_bot_message failed", error);
    },
  });

  return result.toUIMessageStreamResponse();
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

function problem(status: number, code: string, detail: string): Response {
  return new Response(
    JSON.stringify({ error: { code, detail } }),
    { status, headers: { "Content-Type": "application/json" } },
  );
}

function extractLatestUserText(messages: unknown): string | null {
  if (!Array.isArray(messages)) return null;
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i] as {
      role?: string;
      content?: unknown;
      parts?: Array<{ type?: string; text?: string }>;
    };
    if (m?.role !== "user") continue;
    if (Array.isArray(m.parts)) {
      const txt = m.parts
        .filter((p) => p?.type === "text" && typeof p.text === "string")
        .map((p) => p.text!)
        .join("")
        .trim();
      if (txt) return txt;
    }
    if (typeof m.content === "string" && m.content.trim()) return m.content.trim();
  }
  return null;
}

async function loadBotConfig(
  sb: ReturnType<typeof getSupabaseAdmin>,
  orgId: string,
  channelId: string,
): Promise<BotConfigRow | null> {
  const byChannel = await sb
    .from("bot_configs")
    .select("*")
    .eq("org_id",     orgId)
    .eq("channel_id", channelId)
    .eq("enabled",    true)
    .maybeSingle();
  if (byChannel.data) return byChannel.data;

  const byOrg = await sb
    .from("bot_configs")
    .select("*")
    .eq("org_id",  orgId)
    .is("channel_id", null)
    .eq("enabled", true)
    .maybeSingle();
  return byOrg.data ?? null;
}

async function loadHistory(
  sb: ReturnType<typeof getSupabaseAdmin>,
  conversationId: string,
): Promise<Pick<MessageRow, "sender" | "direction" | "text" | "status">[]> {
  const { data } = await sb
    .from("messages")
    .select("sender, direction, text, status, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(HISTORY_LIMIT);
  return (data ?? []).slice().reverse();
}

function rowToModelMessage(
  m: Pick<MessageRow, "sender" | "direction" | "text" | "status">,
): ModelMessage | null {
  if (!m.text) return null;
  if (m.sender === "contact") return { role: "user", content: m.text };
  if (m.sender === "bot" || m.sender === "agent") {
    const prefix = m.status === "failed"
      ? "[AVISO: esta mensagem NÃO foi entregue ao cliente] "
      : "";
    return { role: "assistant", content: prefix + m.text };
  }
  return null;
}

function nonNull<T>(v: T | null): v is T {
  return v !== null;
}

// Safety net: Llama 3.x on Groq sometimes leaks its native tool-call format
// `<function=name>{...}</function>` into message.content instead of hoisting
// it into tool_calls. Strip the tags before persistence so customers never
// see raw syntax — even if the stream already flashed them in the browser,
// at least the stored history stays clean and future replies don't re-learn
// the pattern from their own messages.
const FUNCTION_TAG_RE =
  /<function=[a-zA-Z_][a-zA-Z0-9_]*>[\s\S]*?<\/function>/g;

function sanitizeForUser(text: string): string {
  return text
    .replace(FUNCTION_TAG_RE, "")                   // balanced pairs
    .replace(/<function=[^>]*>[\s\S]*$/g, "")       // orphan opening → drop tail
    .replace(/<\/function>/g, "")                    // orphan closing
    .replace(/\s{2,}/g, " ")
    .trim();
}
