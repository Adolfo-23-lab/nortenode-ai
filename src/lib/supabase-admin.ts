import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using SERVICE_ROLE_KEY.
 * This client bypasses RLS — use ONLY in server actions and API routes.
 * NEVER import this file from a client component.
 */
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase server credentials. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set."
    );
  }

  return createClient(url, key);
}

export { getSupabaseAdmin };
