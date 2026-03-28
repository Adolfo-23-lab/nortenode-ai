import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // --- Parse body safely ---
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
  const treatment = typeof body.treatment === "string" ? body.treatment.trim() : "";
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const time = typeof body.time === "string" ? body.time.trim() : "";

  // --- Validate required fields ---
  if (!name || !whatsapp || !date || !time) {
    return NextResponse.json({ error: "Missing required fields: name, whatsapp, date, time." }, { status: 400 });
  }

  // --- Validate field lengths ---
  if (name.length > 200) {
    return NextResponse.json({ error: "Name must be under 200 characters." }, { status: 400 });
  }
  if (whatsapp.length < 5 || whatsapp.length > 20) {
    return NextResponse.json({ error: "WhatsApp must be between 5 and 20 characters." }, { status: 400 });
  }
  if (treatment.length > 500) {
    return NextResponse.json({ error: "Treatment description too long." }, { status: 400 });
  }

  // --- Validate date format (YYYY-MM-DD) ---
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Date must be in YYYY-MM-DD format." }, { status: 400 });
  }

  // --- Validate time format (HH:MM or HH:MM:SS) ---
  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(time)) {
    return NextResponse.json({ error: "Time must be in HH:MM format." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();

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
