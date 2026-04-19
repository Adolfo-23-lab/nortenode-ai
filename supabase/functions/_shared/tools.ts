/**
 * Deno-side bot tool specs + dispatch.
 *
 * Mirrors src/lib/bot-tools.ts but in the OpenAI function-calling JSON
 * format expected by Groq (and consumed by raw `fetch` to Groq's
 * chat/completions endpoint, since the AI SDK isn't Deno-bundled).
 *
 * Keep the tool names, argument names, and descriptions in lock-step
 * with the Next-side definitions so both bot surfaces (web widget +
 * WhatsApp) have identical behaviour.  The canonical business logic
 * lives in the SQL RPCs declared in migration 20260418000001.
 */

import type { TypedSupabase } from "./supabase.ts";
import type { Database } from "./database.types.ts";

type LeadTemperature = Database["public"]["Enums"]["lead_temperature"];

// ---------------------------------------------------------------------
// OpenAI function-calling tool specs
// ---------------------------------------------------------------------
export interface OpenAIToolSpec {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export const BOT_TOOL_SPECS: OpenAIToolSpec[] = [
  {
    type: "function",
    function: {
      name: "qualify_lead",
      description:
        "Create or update a qualified lead for this conversation's customer. " +
        "Call as soon as you have enough context to judge whether they're " +
        "hot/warm/cold. A 'hot' lead instantly pings the business owner.",
      parameters: {
        type: "object",
        properties: {
          intent: {
            type: "string",
            minLength: 1,
            maxLength: 200,
            description:
              "Short tag of what the customer wants (e.g. 'marcar-degrade', " +
              "'preco-tatuagem-braco', 'urgencia-porta-partida'). 1–6 words.",
          },
          temperature: {
            type: "string",
            enum: ["cold", "warm", "hot"],
            description:
              "Lead readiness: 'hot' = ready to book / emergency now, " +
              "'warm' = interested still asking, 'cold' = just browsing.",
          },
          qualification: {
            type: "object",
            description:
              "Vertical-specific facts gathered from the conversation. Free-form JSON.",
            additionalProperties: true,
          },
          notes: {
            type: "string",
            maxLength: 2000,
            description: "Free-text note for the owner.",
          },
        },
        required: ["intent", "temperature"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "book_appointment",
      description:
        "Atomically book an appointment in the tenant's calendar. " +
        "service_query is fuzzy-matched to the services catalogue; business " +
        "hours and existing bookings are validated server-side. On error codes: " +
        "'service_not_found' → clarify with customer; 'conflict' or " +
        "'outside_business_hours' → suggest another time; 'past_time' → explain " +
        "and ask for a future slot. " +
        "PRECONDITIONS: You MUST have collected customer_name AND customer_phone " +
        "before calling this. If you don't have them, ask the customer first — " +
        "do not call with empty or placeholder values. Only after this tool " +
        "returns ok:true you may tell the customer 'agendado' or 'confirmado'.",
      parameters: {
        type: "object",
        properties: {
          service_query: {
            type: "string",
            minLength: 1,
            maxLength: 120,
            description:
              "Free-text service name. Will be fuzzy-matched. " +
              "Example: 'degrade com desenho', 'tatuagem pequena'.",
          },
          starts_at: {
            type: "string",
            description:
              "ISO 8601 start timestamp WITH timezone offset in the tenant's " +
              "local time (e.g. '2026-04-20T10:30:00+01:00'). Must be in the " +
              "future and inside the tenant's business hours.",
          },
          duration_minutes_override: {
            type: "integer",
            minimum: 5,
            maximum: 480,
            description:
              "Override the service's default duration. Only set when the " +
              "customer explicitly requests a longer/shorter slot.",
          },
          notes: {
            type: "string",
            maxLength: 2000,
          },
        },
        required: ["service_query", "starts_at"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "escalate_to_human",
      description:
        "Hand the conversation over to a human. This DISABLES the bot " +
        "permanently for this conversation until an operator re-enables it. " +
        "Only call when ONE of: (a) the customer explicitly requests a human/" +
        "real person/agent; (b) the customer reports a formal complaint that " +
        "requires refund, cancellation, or manager intervention; (c) the " +
        "request is clearly outside the business scope (legal, medical, etc). " +
        "DO NOT escalate based on emotional tone, short messages, or perceived " +
        "frustration — prefer apologizing and re-offering help.",
      parameters: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            minLength: 3,
            maxLength: 500,
            description: "Short reason the bot is handing over.",
          },
        },
        required: ["reason"],
        additionalProperties: false,
      },
    },
  },
];

// ---------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------
export interface OpenAIToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;  // JSON string
  };
}

export interface ToolExecutionResult {
  content: string;       // JSON string we feed back to the LLM
  tool_call_id: string;
}

export async function executeBotTool(
  sb: TypedSupabase,
  conversationId: string,
  toolCall: OpenAIToolCall,
): Promise<ToolExecutionResult> {
  const { id, function: fn } = toolCall;
  let args: Record<string, unknown>;
  try {
    args = fn.arguments ? JSON.parse(fn.arguments) : {};
  } catch {
    return {
      tool_call_id: id,
      content: JSON.stringify({ ok: false, error: "invalid_arguments_json" }),
    };
  }

  try {
    switch (fn.name) {
      case "qualify_lead": {
        const intent      = typeof args.intent      === "string" ? args.intent      : "";
        const temperature = args.temperature as LeadTemperature;
        const qualification = (args.qualification ?? {}) as Database["public"]["Tables"]["leads"]["Row"]["qualification"];
        const notes       = typeof args.notes       === "string" ? args.notes       : null;

        const { data, error } = await sb.rpc("bot_qualify_lead", {
          p_conversation_id: conversationId,
          p_intent:          intent,
          p_temperature:     temperature,
          p_qualification:   qualification,
          p_notes:           notes,
        });
        return {
          tool_call_id: id,
          content: JSON.stringify(
            error
              ? { ok: false, error: `rpc_error:${error.code ?? "unknown"}` }
              : data ?? { ok: false, error: "empty_response" },
          ),
        };
      }

      case "book_appointment": {
        const serviceQuery   = typeof args.service_query === "string" ? args.service_query : "";
        const startsAt       = typeof args.starts_at     === "string" ? args.starts_at     : "";
        const durOverride    = typeof args.duration_minutes_override === "number"
                                 ? args.duration_minutes_override : null;
        const notes          = typeof args.notes         === "string" ? args.notes         : null;

        const { data, error } = await sb.rpc("bot_book_appointment", {
          p_conversation_id:           conversationId,
          p_service_query:             serviceQuery,
          p_starts_at:                 startsAt,
          p_duration_minutes_override: durOverride,
          p_notes:                     notes,
        });
        return {
          tool_call_id: id,
          content: JSON.stringify(
            error
              ? { ok: false, error: `rpc_error:${error.code ?? "unknown"}` }
              : data ?? { ok: false, error: "empty_response" },
          ),
        };
      }

      case "escalate_to_human": {
        const reason = typeof args.reason === "string" ? args.reason : "";
        const { data, error } = await sb.rpc("bot_escalate_conversation", {
          p_conversation_id: conversationId,
          p_reason:          reason,
        });
        return {
          tool_call_id: id,
          content: JSON.stringify(
            error
              ? { ok: false, error: `rpc_error:${error.code ?? "unknown"}` }
              : data ?? { ok: false, error: "empty_response" },
          ),
        };
      }

      default:
        return {
          tool_call_id: id,
          content: JSON.stringify({ ok: false, error: `unknown_tool:${fn.name}` }),
        };
    }
  } catch (err) {
    return {
      tool_call_id: id,
      content: JSON.stringify({
        ok: false,
        error: err instanceof Error ? err.message.slice(0, 200) : "unknown_exception",
      }),
    };
  }
}

// ---------------------------------------------------------------------
// Time hint helper (mirrors Next bookingTimeHint)
// ---------------------------------------------------------------------
export function bookingTimeHint(timezone: string, now = new Date()): string {
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    const iso = new Intl.DateTimeFormat("sv-SE", {
      timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
    }).format(d);
    const dow = new Intl.DateTimeFormat("pt-PT", {
      timeZone: timezone, weekday: "long",
    }).format(d);
    days.push(`${iso}=${dow}`);
  }
  const nowLocal = new Intl.DateTimeFormat("sv-SE", {
    timeZone: timezone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).format(now).replace(" ", "T");
  return `Hora local atual (${timezone}): ${nowLocal}. ` +
         `Próximos 7 dias (ISO=weekday): ${days.join(", ")}. ` +
         `IMPORTANTE: quando o cliente disser um dia da semana (ex: "sábado"), ` +
         `deves mapear exatamente para a data ISO correspondente desta lista. Nunca inventes.`;
}
