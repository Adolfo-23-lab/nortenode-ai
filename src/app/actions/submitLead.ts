"use server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { agencyOrgSlug } from "@/lib/tenant-config";

/**
 * Marketing-site contact form submission.
 *
 * Creates a 'hot' lead in the NorteNode agency org. The
 * `tg_notify_on_hot_lead` trigger enqueues WhatsApp + email
 * notifications to the owner.
 *
 * Validation is defence-in-depth: the `submit_agency_lead` SQL RPC
 * also enforces length + identifier checks, so even a direct PostgREST
 * bypass can't poison the table.
 *
 * Error contract:
 *   - On validation failure: returns { ok: false, code: <ErrorCode> }.
 *   - On RPC failure:        returns { ok: false, code: "rpc_failed" }.
 *   - On success:            returns { ok: true, leadId }.
 *
 * Callers map ErrorCode → localized UI string via dictionary.
 */

export interface SubmitLeadInput {
  name:     string;
  email?:   string;
  phone?:   string;
  sector?:  string;
  message?: string;
}

export type SubmitLeadErrorCode =
  | "invalid_name"
  | "invalid_email"
  | "invalid_phone"
  | "invalid_sector"
  | "invalid_message"
  | "email_or_phone_required"
  | "service_unavailable"
  | "rpc_failed";

export type SubmitLeadResult =
  | { ok: true;  leadId: string }
  | { ok: false; code: SubmitLeadErrorCode };

const NAME_MIN    = 2;
const NAME_MAX    = 200;
const EMAIL_MAX   = 254;
const PHONE_MAX   = 32;
const SECTOR_MAX  = 100;
const MESSAGE_MAX = 2000;

// Conservative regex — defence-in-depth, not authoritative.
// Real validation is the RPC's input checks + the downstream
// find-or-create on contacts.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9 ()\-]{5,32}$/;

export async function submitLeadAction(
  data: SubmitLeadInput,
): Promise<SubmitLeadResult> {
  const name    = (data.name    ?? "").trim();
  const email   = (data.email   ?? "").trim();
  const phone   = (data.phone   ?? "").trim();
  const sector  = (data.sector  ?? "").trim();
  const message = (data.message ?? "").trim();

  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return { ok: false, code: "invalid_name" };
  }
  if (email && (email.length > EMAIL_MAX || !EMAIL_RE.test(email))) {
    return { ok: false, code: "invalid_email" };
  }
  if (phone && (phone.length > PHONE_MAX || !PHONE_RE.test(phone))) {
    return { ok: false, code: "invalid_phone" };
  }
  if (!email && !phone) {
    return { ok: false, code: "email_or_phone_required" };
  }
  if (sector.length > SECTOR_MAX) {
    return { ok: false, code: "invalid_sector" };
  }
  if (message.length > MESSAGE_MAX) {
    return { ok: false, code: "invalid_message" };
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    console.error("submitLeadAction: Supabase admin client unavailable", err);
    return { ok: false, code: "service_unavailable" };
  }

  const { data: leadId, error } = await supabase.rpc("submit_agency_lead", {
    p_agency_slug: agencyOrgSlug(),
    p_name:        name,
    p_email:       email   || undefined,
    p_phone:       phone   || undefined,
    p_message:     message || undefined,
    p_sector:      sector  || undefined,
  });

  if (error || !leadId) {
    console.error("submit_agency_lead RPC failed", error);
    return { ok: false, code: "rpc_failed" };
  }

  return { ok: true, leadId };
}
