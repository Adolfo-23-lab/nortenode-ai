import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Browser-side Supabase client (uses the anon key).
 * Every request is subject to Row Level Security — no table can be read
 * or mutated without a valid session that belongs to the target org.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase: SupabaseClient<Database> = createClient<Database>(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
