import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const { name, whatsapp, treatment, date, time } = await req.json();

    if (!name || !whatsapp || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Insert or update lead
    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .upsert(
        { name, whatsapp, treatment, status_ia: "booked" },
        { onConflict: "whatsapp" }
      )
      .select()
      .single();

    if (leadError) throw leadError;

    // 2. Insert appointment
    const { error: aptError } = await supabase
      .from("appointments")
      .insert({
        lead_id: leadData.id,
        date,
        time,
        confirmed: false,
      });

    if (aptError) throw aptError;

    return NextResponse.json({ success: true, message: "Appointment booked successfully", leadId: leadData.id });
  } catch (error: unknown) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}
