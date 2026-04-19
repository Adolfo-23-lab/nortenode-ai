"use server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { agencyOrgSlug } from "@/lib/tenant-config";

/**
 * Marketing-site contact form submission.
 *
 * Creates a 'hot' lead in the NorteNode agency org.  The
 * `tg_notify_on_hot_lead` trigger then enqueues WhatsApp + email
 * notifications to Adolfo (per the org's notify_channel).
 *
 * Validation is defence-in-depth: the `submit_agency_lead` SQL RPC also
 * enforces length + identifier checks, so even a direct PostgREST
 * bypass can't poison the table.
 */

export interface SubmitLeadInput {
  name: string;
  email: string;
  whatsapp: string;
  treatment: string;  // "intent" — kept as `treatment` for call-site compat
}

export interface SubmitLeadResult {
  success: boolean;
  leadId?: string;
  error?: string;
}

const NAME_MIN = 2;
const NAME_MAX = 200;
const EMAIL_MAX = 254;
const PHONE_MAX = 32;
const MESSAGE_MAX = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9 ()\-]{5,32}$/;

export async function submitLeadAction(
  data: SubmitLeadInput,
): Promise<SubmitLeadResult> {
  // --- Input validation ----------------------------------------------
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.whatsapp ?? "").trim();
  const message = (data.treatment ?? "").trim();

  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return { success: false, error: "Nome inválido." };
  }
  if (email && (email.length > EMAIL_MAX || !EMAIL_RE.test(email))) {
    return { success: false, error: "Email inválido." };
  }
  if (phone && (phone.length > PHONE_MAX || !PHONE_RE.test(phone))) {
    return { success: false, error: "Contacto WhatsApp inválido." };
  }
  if (!email && !phone) {
    return { success: false, error: "Indique email ou WhatsApp." };
  }
  if (message.length > MESSAGE_MAX) {
    return { success: false, error: "Mensagem demasiado longa." };
  }

  // --- Submit via SECURITY DEFINER RPC -------------------------------
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    console.error("submitLeadAction: Supabase admin client unavailable", err);
    return { success: false, error: "Serviço temporariamente indisponível." };
  }

  const { data: leadId, error } = await supabase.rpc("submit_agency_lead", {
    p_agency_slug: agencyOrgSlug(),
    p_name:        name,
    p_email:       email || null,
    p_phone:       phone || null,
    p_message:     message || null,
  });

  if (error) {
    console.error("submit_agency_lead RPC failed", error);
    return { success: false, error: "Não foi possível registar o pedido. Tente novamente." };
  }

  return { success: true, leadId: leadId ?? undefined };
}
