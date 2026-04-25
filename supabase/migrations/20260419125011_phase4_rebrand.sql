-- =====================================================================
-- NorteNode · Phase 4 · Rebrand .ai → .com
-- File: 20260418000005_phase4_rebrand.sql
--
-- One-shot UPDATE to align existing seeded data with the new brand:
--   * org name   "NorteNode AI" → "NorteNode"
--   * domain     nortenode.ai   → nortenode.com
--   * owner mail adolfo@nortenode.ai → adolfo@nortenode.com
--
-- Safe to re-run — UPDATEs are idempotent.
-- =====================================================================

begin;

-- Organizations
update public.organizations
   set name                = 'NorteNode',
       owner_contact_email = 'adolfo@nortenode.com'
 where slug = 'nortenode-ai'
   and (name = 'NorteNode AI' or owner_contact_email like '%@nortenode.ai');

-- Tenant demo owner emails (.ai domain placeholders → .com stays unchanged;
-- we ONLY rewrite the agency org's email to avoid touching fake demo data.)

-- Optional: also fix any lingering widget description strings that hard-code
-- the old brand.  Channels metadata is jsonb, so we overlay.
update public.channels
   set display_name = replace(display_name, 'NorteNode AI', 'NorteNode')
 where display_name like '%NorteNode AI%';

commit;
