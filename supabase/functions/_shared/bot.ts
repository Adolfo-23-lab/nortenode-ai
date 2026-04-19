/**
 * Shared bot-reply logic with OpenAI-compatible tool-calling loop.
 *
 * Loads tenant-scoped context (bot_config + recent messages + org tz),
 * calls Groq's chat/completions endpoint with function-calling enabled,
 * executes any tool calls via executeBotTool, and loops until the model
 * produces a final natural-language reply or the step budget is hit.
 *
 * Streaming is intentionally NOT used here — WhatsApp doesn't support
 * partial message delivery, so we wait for the full reply before
 * sending it through the Meta Cloud API.  The Next.js /api/chat route
 * handles streaming separately for the web widget.
 */

import type { SharedEnv } from "./env.ts";
import type { TypedSupabase } from "./supabase.ts";
import type { Database } from "./database.types.ts";
import {
  BOT_TOOL_SPECS,
  bookingTimeHint,
  executeBotTool,
  type OpenAIToolCall,
} from "./tools.ts";

type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
type BotConfig    = Database["public"]["Tables"]["bot_configs"]["Row"];
type Message      = Database["public"]["Tables"]["messages"]["Row"];

const MAX_HISTORY = 20;
const MAX_TOOL_STEPS = 3;          // match the Next-side stopWhen(stepCountIs(3))
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// Llama 3.x emits tool calls natively as `<function=NAME>{json}</function>`.
// Groq's OpenAI-compatible parser usually hoists them into message.tool_calls
// but sometimes leaks them as raw text content. We defensively strip and
// reparse them so the customer never sees the tags.
const FUNCTION_TAG_RE =
  /<function=([a-zA-Z_][a-zA-Z0-9_]*)>([\s\S]*?)<\/function>/g;

type OpenAIChatMessage =
  | { role: "system"; content: string }
  | { role: "user"; content: string }
  | { role: "assistant"; content: string | null; tool_calls?: OpenAIToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };

interface GroqResponse {
  choices: Array<{
    message: {
      role: "assistant";
      content: string | null;
      tool_calls?: OpenAIToolCall[];
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

export interface BotReplyResult {
  text: string;
  messageId: string;
  usage: { prompt?: number; completion?: number; total?: number };
}

export async function generateAndPersistReply(
  env: SharedEnv,
  sb: TypedSupabase,
  conversationId: string,
): Promise<BotReplyResult> {
  // --- 1. Load context ----------------------------------------------
  const { data: conv, error: convErr } = await sb
    .from("conversations")
    .select("*")
    .eq("id", conversationId)
    .single();
  if (convErr || !conv) throw new Error(`conversation_not_found: ${convErr?.message ?? conversationId}`);
  if (!conv.bot_enabled) throw new Error("bot_disabled_for_conversation");

  const [botCfg, orgTz] = await Promise.all([
    loadBotConfig(sb, conv),
    loadOrgTimezone(sb, conv.org_id),
  ]);

  const { data: history, error: histErr } = await sb
    .from("messages")
    .select("direction, sender, text, status, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(MAX_HISTORY);
  if (histErr) throw new Error(`history_load_failed: ${histErr.message}`);

  const ordered = (history ?? []).slice().reverse();

  // --- 2. Seed the conversation for Groq ----------------------------
  const messages: OpenAIChatMessage[] = [
    {
      role: "system",
      content: `${botCfg.system_prompt}\n\n${bookingTimeHint(orgTz)}`,
    },
    ...ordered
      .map(messageToOpenAIRole)
      .filter((m): m is OpenAIChatMessage => m !== null),
  ];

  // --- 3. Tool-calling loop -----------------------------------------
  let finalText = "";
  let aggUsage = { prompt: 0, completion: 0, total: 0 };

  for (let step = 0; step < MAX_TOOL_STEPS; step++) {
    const resp = await callGroq(env, botCfg, messages, /* withTools */ true);
    accumulateUsage(aggUsage, resp.usage);

    const choice = resp.choices?.[0];
    if (!choice) throw new Error("groq_no_choice");
    const msg = choice.message;

    // Defensive: rescue any <function=...> tags that leaked into content.
    const { cleanContent, extractedCalls } = extractLeakedToolCalls(msg.content);
    const toolCalls = [...(msg.tool_calls ?? []), ...extractedCalls];

    // Record the assistant turn (with any tool_calls) in our history.
    messages.push({
      role: "assistant",
      content: cleanContent || null,
      ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
    });

    if (toolCalls.length === 0) {
      finalText = cleanContent.trim();
      break;
    }

    // Execute every tool call sequentially (deterministic side-effects).
    for (const call of toolCalls) {
      const result = await executeBotTool(sb, conversationId, call);
      messages.push({
        role: "tool",
        tool_call_id: result.tool_call_id,
        content: result.content,
      });
    }
  }

  // If we ran out of steps without a text reply, ask the model for one
  // last synthesis turn WITHOUT tools so it must produce prose.
  if (!finalText) {
    const finalResp = await callGroq(env, botCfg, messages, /* withTools */ false);
    accumulateUsage(aggUsage, finalResp.usage);
    finalText = (finalResp.choices?.[0]?.message?.content ?? "").trim();
  }

  // Safety net: strip any residual <function=...> tags before they reach
  // the customer. This protects against both parser regressions and any
  // tags that survived the extraction above.
  const sanitized = sanitizeForUser(finalText);

  if (!sanitized) {
    throw new Error("groq_empty_reply_after_loop");
  }

  // --- 4. Persist outbound ------------------------------------------
  const { data: newId, error: rpcErr } = await sb.rpc("append_bot_message", {
    p_conversation_id: conversationId,
    p_text:            sanitized,
    p_token_usage:     aggUsage.total > 0
      ? { prompt: aggUsage.prompt, completion: aggUsage.completion, total: aggUsage.total }
      : null,
    p_external_id:     null,
  });
  if (rpcErr || !newId) {
    throw new Error(`append_bot_message_failed: ${rpcErr?.message ?? "no id returned"}`);
  }

  return {
    text:      sanitized,
    messageId: newId,
    usage:     aggUsage,
  };
}

// ---------------------------------------------------------------------
// Llama native tool-tag helpers
// ---------------------------------------------------------------------
function extractLeakedToolCalls(
  raw: string | null | undefined,
): { cleanContent: string; extractedCalls: OpenAIToolCall[] } {
  if (!raw) return { cleanContent: "", extractedCalls: [] };
  const extractedCalls: OpenAIToolCall[] = [];
  let idx = 0;
  const cleanContent = raw.replace(FUNCTION_TAG_RE, (_match, name, body) => {
    extractedCalls.push({
      id: `leaked_${Date.now().toString(36)}_${idx++}`,
      type: "function",
      function: {
        name: String(name),
        arguments: typeof body === "string" ? body.trim() : "",
      },
    });
    return "";
  }).replace(/\s{2,}/g, " ").trim();
  return { cleanContent, extractedCalls };
}

export function sanitizeForUser(text: string): string {
  return text
    .replace(FUNCTION_TAG_RE, "")                   // balanced pairs
    .replace(/<function=[^>]*>[\s\S]*$/g, "")       // orphan opening → drop tail
    .replace(/<\/function>/g, "")                    // orphan closing
    .replace(/\s{2,}/g, " ")
    .trim();
}

// ---------------------------------------------------------------------
// Groq HTTP call
// ---------------------------------------------------------------------
async function callGroq(
  env: SharedEnv,
  botCfg: BotConfig,
  messages: OpenAIChatMessage[],
  withTools: boolean,
): Promise<GroqResponse> {
  const body: Record<string, unknown> = {
    model:       botCfg.model ?? env.GROQ_MODEL_DEFAULT,
    temperature: Number(botCfg.temperature ?? 0.4),
    max_tokens:  botCfg.max_tokens ?? 800,
    messages,
  };
  if (withTools) {
    body.tools       = BOT_TOOL_SPECS;
    body.tool_choice = "auto";
  }

  const resp = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.GROQ_API_KEY}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`groq_error:${resp.status}:${text.slice(0, 400)}`);
  }
  return await resp.json() as GroqResponse;
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------
async function loadBotConfig(sb: TypedSupabase, conv: Conversation): Promise<BotConfig> {
  const byChannel = await sb
    .from("bot_configs")
    .select("*")
    .eq("org_id", conv.org_id)
    .eq("channel_id", conv.channel_id)
    .eq("enabled", true)
    .maybeSingle();
  if (byChannel.data) return byChannel.data;

  const byOrg = await sb
    .from("bot_configs")
    .select("*")
    .eq("org_id", conv.org_id)
    .is("channel_id", null)
    .eq("enabled", true)
    .maybeSingle();
  if (byOrg.data) return byOrg.data;

  throw new Error("no_bot_config");
}

async function loadOrgTimezone(sb: TypedSupabase, orgId: string): Promise<string> {
  const { data } = await sb
    .from("organizations")
    .select("timezone")
    .eq("id", orgId)
    .single();
  return data?.timezone ?? "Europe/Lisbon";
}

function messageToOpenAIRole(
  m: Pick<Message, "direction" | "sender" | "text" | "status">,
): OpenAIChatMessage | null {
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

function accumulateUsage(
  agg: { prompt: number; completion: number; total: number },
  usage?: GroqResponse["usage"],
): void {
  if (!usage) return;
  agg.prompt     += usage.prompt_tokens     ?? 0;
  agg.completion += usage.completion_tokens ?? 0;
  agg.total      += usage.total_tokens      ?? 0;
}
