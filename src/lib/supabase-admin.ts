import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Server-side Supabase client using SERVICE_ROLE_KEY.
 *
 * Bypasses Row Level Security.  Use ONLY from:
 *   - Next.js server actions / route handlers (`"use server"`)
 *   - Supabase Edge Functions (Deno)
 *
 * NEVER import this module from a client component.  The service role
 * key grants full DB access — leaking it to the browser = total breach.
 */
export function getSupabaseAdmin(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase server credentials. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.",
    );
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-nortenode-context": "service-role" } },
  });
}
