import { NextResponse } from "next/server";

/**
 * PHASE-2 PENDING — disabled on 2026-04-17.
 *
 * The old mono-tenant schema (leads.whatsapp / appointments.date+time) is
 * gone.  Phase 2 reimplements this endpoint to:
 *   1. Resolve the tenant via a signed widget/bot token.
 *   2. Upsert `contacts` within the tenant's `org_id`.
 *   3. Insert an `appointments` row with `starts_at` / `ends_at`
 *      timestamptz values and `created_by = 'contact' | 'bot'`.
 *   4. Rely on `tg_notify_on_appointment_change` to queue the owner
 *      notification in `public.notifications`.
 *
 * Returns 503 in the meantime.
 */

export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    {
      error: "Endpoint temporarily unavailable (multi-tenant migration).",
      phase: "2-pending",
    },
    { status: 503 },
  );
}
