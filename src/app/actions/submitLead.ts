"use server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function submitLeadAction(data: { name: string, email: string, whatsapp: string, treatment: string }) {
  const supabase = getSupabaseAdmin();

  try {
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
  } catch (err: unknown) {
    console.error("Unexpected Database Exception:", err);
    throw new Error(err instanceof Error ? err.message : "Erro crítico de base de dados.");
  }

  return { success: true };
}
