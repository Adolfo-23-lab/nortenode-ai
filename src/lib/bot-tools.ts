import { tool, jsonSchema, type Tool } from "ai";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import type { LeadTemperature } from "@/lib/database.types.custom";

/**
 * Bot tool-calling definitions (Phase 3).
 *
 * Each tool is a thin wrapper around a SECURITY DEFINER RPC declared in
 * supabase/migrations/20260418000001_phase3_bot_tools.sql.  The business
 * rules (service fuzzy-match, business-hours check, conflict detection,
 * hot-lead trigger) live in SQL so the exact same guarantees apply to
 * the Deno Edge Function loop for WhatsApp.
 *
 * Call-site contract:
 *   const tools = createBotTools(supabaseAdmin, { conversationId });
 *   streamText({ tools, stopWhen: stepCountIs(3), ... });
 *
 * Security notes:
 *   * The bot runs with service_role and is already tenant-scoped via
 *     `conversationId` — every RPC derives `org_id` from the conversation
 *     row, so the LLM cannot target another tenant even if prompted to.
 *   * Input schemas cap string lengths in JSON schema; SQL re-validates
 *     (defence in depth).
 *   * Results are returned verbatim to the model as `{ ok, ... }` —
 *     error codes drive follow-up behaviour ("service_not_found" →
 *     the model asks the user to clarify, "conflict" → suggests
 *     another slot, etc.).
 */

export interface BotToolContext {
  conversationId: string;
}

type TypedAdmin = SupabaseClient<Database>;

// ---------------------------------------------------------------------
// Tool: qualify_lead
// ---------------------------------------------------------------------
interface QualifyLeadInput {
  intent: string;
  temperature: LeadTemperature;
  qualification?: Record<string, unknown>;
  notes?: string;
}

const qualifyLeadSchema = jsonSchema<QualifyLeadInput>({
  type: "object",
  properties: {
    intent: {
      type: "string",
      minLength: 1,
      maxLength: 200,
      description:
        "Short tag of what the customer wants — e.g. 'marcar-degrade', " +
        "'preco-tatuagem-braco', 'urgencia-porta-partida'. 1 to 6 words.",
    },
    temperature: {
      type: "string",
      enum: ["cold", "warm", "hot"],
      description:
        "Lead readiness: 'hot' = ready to book / emergency now, " +
        "'warm' = interested, still asking, 'cold' = just browsing.",
    },
    qualification: {
      type: "object",
      description:
        "Vertical-specific facts gathered from the conversation " +
        "(e.g. { tamanho_cm: 8, zona: 'braco' } for a tattoo studio, " +
        "{ servico: 'degrade', dia_preferido: 'sabado' } for a barbershop).",
      additionalProperties: true,
    },
    notes: {
      type: "string",
      maxLength: 2000,
      description: "Free-text note for the business owner.",
    },
  },
  required: ["intent", "temperature"],
  additionalProperties: false,
});

// ---------------------------------------------------------------------
// Tool: book_appointment
// ---------------------------------------------------------------------
interface BookAppointmentInput {
  service_query: string;
  starts_at: string;            // ISO 8601 with offset (e.g. "2026-04-20T10:30:00+01:00")
  duration_minutes_override?: number;
  notes?: string;
}

const bookAppointmentSchema = jsonSchema<BookAppointmentInput>({
  type: "object",
  properties: {
    service_query: {
      type: "string",
      minLength: 1,
      maxLength: 120,
      description:
        "Free-text name of the service the customer wants. Will be " +
        "fuzzy-matched against the tenant's services catalogue. " +
        "Example: 'degrade com desenho', 'tatuagem pequena', 'aula experimental'.",
    },
    starts_at: {
      type: "string",
      description:
        "ISO 8601 start timestamp WITH timezone offset in the tenant's " +
        "local time, e.g. '2026-04-20T10:30:00+01:00'. Must be in the " +
        "future and inside the tenant's business hours.",
    },
    duration_minutes_override: {
      type: "integer",
      minimum: 5,
      maximum: 480,
      description:
        "Override the service's default duration (minutes). " +
        "ONLY set when the customer explicitly requests a longer/shorter slot.",
    },
    notes: {
      type: "string",
      maxLength: 2000,
      description: "Customer-provided details worth attaching to the booking.",
    },
  },
  required: ["service_query", "starts_at"],
  additionalProperties: false,
});

// ---------------------------------------------------------------------
// Tool: escalate_to_human
// ---------------------------------------------------------------------
interface EscalateInput {
  reason: string;
}

const escalateSchema = jsonSchema<EscalateInput>({
  type: "object",
  properties: {
    reason: {
      type: "string",
      minLength: 3,
      maxLength: 500,
      description:
        "Short reason the bot is handing over — e.g. 'cliente pediu " +
        "para falar com humano', 'pergunta fora do âmbito', " +
        "'reclamação séria'.",
    },
  },
  required: ["reason"],
  additionalProperties: false,
});

// ---------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------
export function createBotTools(
  sb: TypedAdmin,
  ctx: BotToolContext,
): Record<string, Tool> {
  const { conversationId } = ctx;

  const qualify_lead = tool({
    description:
      "Create or update a qualified lead for this conversation's customer. " +
      "Call as soon as you have enough context to judge whether they're hot/warm/cold. " +
      "A 'hot' lead instantly pings the business owner on WhatsApp and email.",
    inputSchema: qualifyLeadSchema,
    async execute(input: QualifyLeadInput) {
      const { data, error } = await sb.rpc("bot_qualify_lead", {
        p_conversation_id: conversationId,
        p_intent:          input.intent,
        p_temperature:     input.temperature,
        p_qualification:   (input.qualification ?? {}) as Database["public"]["Tables"]["leads"]["Row"]["qualification"],
        p_notes:           input.notes ?? undefined,
      });
      if (error) return { ok: false, error: `rpc_error:${error.code ?? "unknown"}` };
      return data ?? { ok: false, error: "empty_response" };
    },
  });

  const book_appointment = tool({
    description:
      "Book an appointment in the tenant's calendar. The service_query is " +
      "fuzzy-matched to the services catalogue. The call is atomic: " +
      "business hours and existing bookings are validated server-side. " +
      "On success, the owner is notified automatically. " +
      "If error='service_not_found' ask the customer to clarify; if " +
      "error='conflict' or 'outside_business_hours', suggest another time; " +
      "if error='past_time' explain and ask for a future slot. " +
      "PRECONDITIONS: You MUST have collected customer_name AND customer_phone " +
      "before calling this. If you don't have them, ask the customer first — " +
      "do not call with empty or placeholder values. Only after this tool " +
      "returns ok:true you may tell the customer 'agendado' or 'confirmado'.",
    inputSchema: bookAppointmentSchema,
    async execute(input: BookAppointmentInput) {
      const { data, error } = await sb.rpc("bot_book_appointment", {
        p_conversation_id:            conversationId,
        p_service_query:              input.service_query,
        p_starts_at:                  input.starts_at,
        p_duration_minutes_override:  input.duration_minutes_override ?? undefined,
        p_notes:                      input.notes ?? undefined,
      });
      if (error) return { ok: false, error: `rpc_error:${error.code ?? "unknown"}` };
      return data ?? { ok: false, error: "empty_response" };
    },
  });

  const escalate_to_human = tool({
    description:
      "Hand the conversation over to a human. This DISABLES the bot " +
      "permanently for this conversation until an operator re-enables it. " +
      "Only call when ONE of: (a) the customer explicitly requests a human/" +
      "real person/agent; (b) the customer reports a formal complaint that " +
      "requires refund, cancellation, or manager intervention; (c) the " +
      "request is clearly outside the business scope (legal, medical, etc). " +
      "DO NOT escalate based on emotional tone, short messages, or perceived " +
      "frustration — prefer apologizing and re-offering help. After calling, " +
      "briefly reassure the customer that a person will reply shortly.",
    inputSchema: escalateSchema,
    async execute(input: EscalateInput) {
      const { data, error } = await sb.rpc("bot_escalate_conversation", {
        p_conversation_id: conversationId,
        p_reason:          input.reason,
      });
      if (error) return { ok: false, error: `rpc_error:${error.code ?? "unknown"}` };
      return data ?? { ok: false, error: "empty_response" };
    },
  });

  return { qualify_lead, book_appointment, escalate_to_human };
}

// ---------------------------------------------------------------------
// Public helper — tenants may want to extend the system prompt with a
// "current local time" hint so the model doesn't hallucinate ISO dates.
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
