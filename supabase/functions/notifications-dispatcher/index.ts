/**
 * Edge Function: notifications-dispatcher
 *
 * Pulls queued rows from public.notifications and ships them through
 * WhatsApp (Meta Cloud API) and/or email (Resend).  Invoked every 60s
 * by pg_cron (see migration 20260418000003_phase3_pg_cron.sql).
 *
 * Guarantees:
 *   * At-most-once per attempt: claim_pending_notifications uses
 *     FOR UPDATE SKIP LOCKED, so overlapping cron invocations never
 *     double-send.
 *   * At-least-once overall: on send failure the row goes back to
 *     'queued' with exponential backoff; permanently 'failed' after 5
 *     attempts.
 *
 * Deploy:
 *   supabase functions deploy notifications-dispatcher
 *
 * Required secrets:
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *   META_APP_SECRET, META_VERIFY_TOKEN, META_WHATSAPP_TOKEN,
 *   META_GRAPH_API_VERSION, GROQ_API_KEY   (loaded by loadEnv)
 *   RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_FROM_NAME
 */

import { loadEnv } from "../_shared/env.ts";
import { serviceClient, type TypedSupabase } from "../_shared/supabase.ts";
import {
  renderNotification,
  sendEmail,
  sendWhatsAppNotification,
  type LeadDetails,
  type RenderedNotification,
} from "../_shared/notify.ts";
import type { Database } from "../_shared/database.types.ts";

type NotificationRow = Database["public"]["Tables"]["notifications"]["Row"];

const env = loadEnv();
const BATCH = 25;

Deno.serve(async (req) => {
  // Reject direct unauthenticated invocations — pg_cron sends a
  // service_role bearer that Supabase's gateway already validates when
  // the function is deployed without `--no-verify-jwt`.  For manual
  // triggering (debug) we still require the method.
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const sb = serviceClient(env);

  const { data: claimed, error: claimErr } = await sb.rpc(
    "claim_pending_notifications",
    { p_batch_size: BATCH },
  );
  if (claimErr) {
    console.error("claim_failed", claimErr);
    return json({ ok: false, error: "claim_failed" }, 500);
  }

  const batch = (claimed ?? []) as NotificationRow[];
  if (batch.length === 0) {
    return json({ ok: true, processed: 0 });
  }

  // Pre-load org data in a single round-trip
  const orgIds = Array.from(new Set(batch.map((n) => n.org_id)));
  const { data: orgsData } = await sb
    .from("organizations")
    .select("id, name, timezone")
    .in("id", orgIds);
  const orgById = new Map<string, { name: string; timezone: string }>();
  for (const o of orgsData ?? []) {
    orgById.set(o.id, { name: o.name, timezone: o.timezone });
  }

  // Pre-load an active WhatsApp sender channel per org (first active)
  const waChannelByOrg = await loadWaChannels(sb, orgIds);

  // Pre-load lead + contact details for hot_lead_captured email rows so the
  // template can render the full lead context (name, email, phone, message,
  // timestamp). The trigger only puts {lead_id, intent, source, contact_id}
  // in the payload — everything else lives in `leads` + `contacts`.
  const leadDetailsById = await loadLeadDetailsForBatch(sb, batch);

  const results = await Promise.allSettled(
    batch.map((n) => dispatchOne(sb, n, orgById, waChannelByOrg, leadDetailsById)),
  );

  let sent = 0, failed = 0;
  for (const r of results) {
    if (r.status === "fulfilled" && r.value) sent++;
    else failed++;
  }
  return json({ ok: true, claimed: batch.length, sent, failed });
});

// ---------------------------------------------------------------------
// Per-notification dispatch
// ---------------------------------------------------------------------
async function dispatchOne(
  sb: TypedSupabase,
  n: NotificationRow,
  orgById: Map<string, { name: string; timezone: string }>,
  waChannelByOrg: Map<string, { phoneNumberId: string }>,
  leadDetailsById: Map<string, LeadDetails>,
): Promise<boolean> {
  const org = orgById.get(n.org_id) ?? { name: "NorteNode", timezone: "Europe/Lisbon" };
  const lead = n.related_lead_id ? leadDetailsById.get(n.related_lead_id) : undefined;
  const rendered: RenderedNotification = renderNotification(n, { org, lead });

  try {
    if (n.channel === "email") {
      const r = await sendEmail(env, n.recipient, rendered);
      if (r.ok) {
        await sb.rpc("mark_notification_sent", { p_id: n.id, p_external_id: r.providerMessageId ?? null });
        return true;
      }
      await sb.rpc("mark_notification_failed", { p_id: n.id, p_error: r.error ?? "unknown" });
      return false;
    }

    if (n.channel === "whatsapp") {
      const wa = waChannelByOrg.get(n.org_id);
      if (!wa) {
        await sb.rpc("mark_notification_failed", {
          p_id: n.id,
          p_error: "no_active_whatsapp_channel_for_org",
        });
        return false;
      }
      const r = await sendWhatsAppNotification(env, wa.phoneNumberId, n.recipient, rendered);
      if (r.ok) {
        await sb.rpc("mark_notification_sent", { p_id: n.id, p_external_id: r.providerMessageId ?? null });
        return true;
      }
      await sb.rpc("mark_notification_failed", { p_id: n.id, p_error: r.error ?? "unknown" });
      return false;
    }

    // 'both' and 'none' shouldn't appear on a queued row — owner prefs
    // are expanded into separate rows at trigger time.  Flag as failed.
    await sb.rpc("mark_notification_failed", {
      p_id: n.id,
      p_error: `unsupported_channel:${n.channel}`,
    });
    return false;
  } catch (err) {
    const message = err instanceof Error ? err.message.slice(0, 500) : "unknown_exception";
    console.error("dispatch_exception", { id: n.id, message });
    await sb.rpc("mark_notification_failed", { p_id: n.id, p_error: message });
    return false;
  }
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------
async function loadLeadDetailsForBatch(
  sb: TypedSupabase,
  batch: NotificationRow[],
): Promise<Map<string, LeadDetails>> {
  const map = new Map<string, LeadDetails>();
  const leadIds = Array.from(new Set(
    batch
      .filter((n) => n.event_type === "hot_lead_captured" && n.related_lead_id)
      .map((n) => n.related_lead_id as string),
  ));
  if (leadIds.length === 0) return map;

  const { data, error } = await sb
    .from("leads")
    .select("id, intent, source, temperature, notes, created_at, contact:contacts(full_name, email, phone_e164)")
    .in("id", leadIds);

  if (error) {
    console.error("loadLeadDetailsForBatch failed", error);
    return map;
  }

  for (const row of data ?? []) {
    // Supabase typing returns contact as array | object depending on relationship cardinality.
    const contactRaw = (row as { contact: unknown }).contact;
    const c = Array.isArray(contactRaw) ? contactRaw[0] : contactRaw;
    const contact = (c ?? {}) as { full_name?: string | null; email?: string | null; phone_e164?: string | null };
    map.set(row.id, {
      lead_id:     row.id,
      intent:      row.intent,
      source:      row.source,
      temperature: row.temperature,
      notes:       row.notes,
      created_at:  row.created_at,
      contact: {
        full_name: contact.full_name ?? null,
        email:     contact.email     ?? null,
        phone:     contact.phone_e164 ?? null,
      },
    });
  }
  return map;
}

async function loadWaChannels(
  sb: TypedSupabase,
  orgIds: string[],
): Promise<Map<string, { phoneNumberId: string }>> {
  const map = new Map<string, { phoneNumberId: string }>();
  if (orgIds.length === 0) return map;

  const { data } = await sb
    .from("channels")
    .select("org_id, external_id")
    .in("org_id", orgIds)
    .eq("type", "whatsapp")
    .eq("status", "active");

  for (const row of data ?? []) {
    if (row.external_id && !map.has(row.org_id)) {
      map.set(row.org_id, { phoneNumberId: row.external_id });
    }
  }
  return map;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
