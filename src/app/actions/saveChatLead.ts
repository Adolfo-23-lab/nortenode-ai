"use server";

import { createClient } from "@supabase/supabase-js";

type ChatLeadData = {
  sessionId: string;
  userMessage: string;
  source: "demo" | "sales";
};

export async function saveChatLeadAction(data: ChatLeadData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) return; // Silent fail — don't crash chat UX

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
