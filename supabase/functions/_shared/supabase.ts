/**
 * Service-role Supabase client for Edge Functions.
 * Bypasses RLS — callers are trusted server code.
 */

import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.0";
import type { Database } from "./database.types.ts";
import type { SharedEnv } from "./env.ts";

export type TypedSupabase = SupabaseClient<Database>;

export function serviceClient(env: SharedEnv): TypedSupabase {
  return createClient<Database>(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-nortenode-context": "edge-function" } },
  });
}
