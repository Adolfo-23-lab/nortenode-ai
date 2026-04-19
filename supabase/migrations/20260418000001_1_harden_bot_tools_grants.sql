-- =====================================================================
-- NorteNode AI — Phase 3 · Bot tool-calling RPCs · grant hardening
-- File: 20260418000001_1_harden_bot_tools_grants.sql
--
-- Companion to 20260418000001_phase3_bot_tools.sql.
-- The intent stated in 001 was "callable only by service_role (bots
-- never run as `authenticated`)". However, Supabase projects have
-- default privileges that implicitly grant EXECUTE on any new function
-- in the `public` schema to the `anon` and `authenticated` roles.
-- The `REVOKE ALL ... FROM public` in 001 only targets the PUBLIC
-- pseudo-role, not anon/authenticated, so those two roles ended up
-- with EXECUTE on all six bot RPCs — invokable from PostgREST with
-- the anon key by any client that happens to know a conversation_id
-- UUID.
--
-- This migration narrows the surface back to the originally intended
-- perimeter: postgres (owner) + service_role only.
-- =====================================================================

begin;

revoke execute on function public.bot_find_service(uuid, text)
  from anon, authenticated;
revoke execute on function public.bot_has_conflict(uuid, timestamptz, timestamptz, uuid)
  from anon, authenticated;
revoke execute on function public.bot_within_business_hours(uuid, timestamptz, timestamptz)
  from anon, authenticated;
revoke execute on function public.bot_qualify_lead(uuid, text, public.lead_temperature, jsonb, text)
  from anon, authenticated;
revoke execute on function public.bot_book_appointment(uuid, text, timestamptz, int, text)
  from anon, authenticated;
revoke execute on function public.bot_escalate_conversation(uuid, text)
  from anon, authenticated;

-- Re-assert service_role grants explicitly, so that if a future
-- blanket revoke runs this file can be re-run to restore the intended
-- perimeter without reaching back into 001.
grant execute on function public.bot_find_service(uuid, text)
  to service_role;
grant execute on function public.bot_has_conflict(uuid, timestamptz, timestamptz, uuid)
  to service_role;
grant execute on function public.bot_within_business_hours(uuid, timestamptz, timestamptz)
  to service_role;
grant execute on function public.bot_qualify_lead(uuid, text, public.lead_temperature, jsonb, text)
  to service_role;
grant execute on function public.bot_book_appointment(uuid, text, timestamptz, int, text)
  to service_role;
grant execute on function public.bot_escalate_conversation(uuid, text)
  to service_role;

commit;

-- =====================================================================
-- END · grant hardening
-- =====================================================================
