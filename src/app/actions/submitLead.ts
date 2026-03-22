"use server";

import { createClient } from "@supabase/supabase-js";

export async function submitLeadAction(data: { name: string, email: string, whatsapp: string, treatment: string }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials (SUPABASE_SERVICE_ROLE_KEY not configured).");
  }

  // Cremos un cliente con Service Role para saltar las políticas de RLS.
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { error } = await supabase.from("leads").upsert([
    {
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      treatment: data.treatment,
      status_ia: "pending_demo"
    }
  ], { onConflict: "whatsapp" });

  if (error) {
    console.error("Supabase insert error (Server Action):", error);
    throw new Error(error.message);
  }

  return { success: true };
}
