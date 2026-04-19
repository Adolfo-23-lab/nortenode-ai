-- =====================================================================
-- NorteNode AI — Phase 3 · WhatsApp media storage
-- File: 20260418000004_phase3_media_storage.sql
--
-- Creates:
--   1. Private Storage bucket `conversation-media` (20 MB cap).
--   2. RLS policies on storage.objects restricting reads to members of
--      the owning org (org_id is the first path segment).
--   3. Writes via service_role only — Edge Functions upload media after
--      downloading from Meta.
--
-- Path convention:
--   {org_id}/{conversation_id}/{message_id}.{ext}
--
-- Reading media in the Dashboard (Fase 5):
--   Server generates short-lived signed URLs via supabase.storage
--   .from('conversation-media').createSignedUrl(path, ttl).  Authenticated
--   members can also read directly (RLS-scoped) if they know the path.
--
-- Skills applied:
--   * backend-supabase: multi-tenant isolation enforced at the storage
--     layer, not application layer.
--   * security-owasp: bucket private; no anonymous access; size capped;
--     mime whitelist enforced in client code (meta.ts downloadMedia).
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- 1. Bucket
-- ---------------------------------------------------------------------
insert into storage.buckets (
  id, name, public, file_size_limit, allowed_mime_types
) values (
  'conversation-media',
  'conversation-media',
  false,
  20971520,  -- 20 MB
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'audio/ogg', 'audio/mpeg', 'audio/mp4', 'audio/amr', 'audio/aac',
    'video/mp4', 'video/3gpp',
    'application/pdf'
  ]
) on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ---------------------------------------------------------------------
-- 2. RLS policies on storage.objects
--
--    storage.objects has RLS enabled by default in Supabase.  We add
--    two policies scoped to this bucket — everything else stays denied.
-- ---------------------------------------------------------------------

-- Idempotent drop (helps re-running the migration during iteration)
drop policy if exists "conv_media_member_read"     on storage.objects;
drop policy if exists "conv_media_service_writes"  on storage.objects;

create policy "conv_media_member_read"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'conversation-media'
    and (storage.foldername(name))[1] is not null
    and exists (
      select 1 from public.memberships m
      where m.user_id = auth.uid()
        and m.org_id  = ((storage.foldername(name))[1])::uuid
    )
  );

-- Writes come exclusively from Edge Functions running service_role
-- (which bypasses RLS anyway).  We add an explicit deny-by-default
-- policy for authenticated INSERT/UPDATE/DELETE so a dashboard user
-- can't upload arbitrary files even if they know a valid org_id.
create policy "conv_media_service_writes"
  on storage.objects
  for all
  to authenticated
  using (false)
  with check (false);

commit;
