"use server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

type ChatLeadData = {
  sessionId: string;
  userMessage: string;
  source: "demo" | "sales";
};

export async function saveChatLeadAction(data: ChatLeadData) {
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    console.warn("saveChatLeadAction: Supabase credentials missing. Lead NOT saved.");
    return; // Don't crash chat UX
  }

  try {
    await supabase.from("leads").upsert(
      {
        whatsapp: data.sessionId,
        name: data.source === "sales" ? "Sales Bot Lead" : "Demo User",
        treatment: data.userMessage,
        status_ia: data.source === "sales" ? "sales_pending" : "pending",
      },
      { onConflict: "whatsapp" }
    );
  } catch (error) {
    console.error("saveChatLeadAction error:", error);
  }
}
