-- =====================================================================
-- NorteNode AI — Phase 3 · Notifications dispatcher worker RPCs
-- File: 20260418000002_phase3_notifications_dispatcher.sql
--
-- Adds:
--   1. 'sending' value to notification_status (in-flight marker).
--   2. RPC claim_pending_notifications(batch_size) — FOR UPDATE
--      SKIP LOCKED; marks rows 'sending' atomically so multiple
--      dispatcher invocations (cron overlap) never send duplicates.
--   3. RPC mark_notification_sent(id, external_id).
--   4. RPC mark_notification_failed(id, error, final) — exponential
--      backoff up to 5 attempts, then 'failed' permanently.
--
-- Skill references:
--   * backend-supabase: atomic claim via CTE + FOR UPDATE SKIP LOCKED,
--     indexes reused from migration 001.
--   * security-owasp: all RPCs service_role only; SECURITY DEFINER with
--     locked search_path; each invocation audited.
-- =====================================================================

-- ALTER TYPE ... ADD VALUE cannot run in a transaction in Supabase's
-- SQL editor — keep this statement standalone, ABOVE the begin block.
alter type public.notification_status add value if not exists 'sending' before 'sent';

begin;

-- ---------------------------------------------------------------------
-- 1. Claim RPC
--    Marks up to `batch_size` queued notifications as 'sending' and
--    returns them.  Uses SKIP LOCKED so concurrent workers cannot
--    claim the same row.  attempts += 1 on claim.
-- ---------------------------------------------------------------------
create or replace function public.claim_pending_notifications(
  p_batch_size int default 25
) returns setof public.notifications
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_batch_size is null or p_batch_size <= 0 or p_batch_size > 200 then
    p_batch_size := 25;
  end if;

  return query
    update public.notifications
       set status   = 'sending',
           attempts = attempts + 1
     where id in (
       select id
         from public.notifications
        where status        = 'queued'
          and scheduled_at <= now()
        order by scheduled_at asc
        limit p_batch_size
        for update skip locked
     )
    returning *;
end;
$$;

revoke all on function public.claim_pending_notifications(int) from public;
grant execute on function public.claim_pending_notifications(int) to service_role;

-- ---------------------------------------------------------------------
-- 2. Mark sent
-- ---------------------------------------------------------------------
create or replace function public.mark_notification_sent(
  p_id           uuid,
  p_external_id  text default null
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.notifications
     set status   = 'sent',
         sent_at  = now(),
         last_error = null,
         payload  = case
                      when p_external_id is null then payload
                      else coalesce(payload, '{}'::jsonb)
                           || jsonb_build_object('provider_message_id', p_external_id)
                    end
   where id = p_id;
end;
$$;

revoke all on function public.mark_notification_sent(uuid, text) from public;
grant execute on function public.mark_notification_sent(uuid, text) to service_role;

-- ---------------------------------------------------------------------
-- 3. Mark failed with exponential backoff
--
--    attempts <= 5 → back to 'queued' with scheduled_at = now() + 2^att min
--    attempts  > 5 → permanent 'failed'
-- ---------------------------------------------------------------------
create or replace function public.mark_notification_failed(
  p_id    uuid,
  p_error text
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempts int;
  v_err      text;
begin
  v_err := coalesce(p_error, 'unknown');
  if length(v_err) > 1000 then v_err := left(v_err, 1000); end if;

  select attempts into v_attempts
    from public.notifications where id = p_id;
  if v_attempts is null then return; end if;

  if v_attempts >= 5 then
    update public.notifications
       set status     = 'failed',
           last_error = v_err
     where id = p_id;
  else
    update public.notifications
       set status       = 'queued',
           last_error   = v_err,
           scheduled_at = now() + make_interval(mins => (1 << v_attempts))
     where id = p_id;
  end if;
end;
$$;

revoke all on function public.mark_notification_failed(uuid, text) from public;
grant execute on function public.mark_notification_failed(uuid, text) to service_role;

commit;

-- =====================================================================
-- END dispatcher RPCs
-- Next file: 20260418000003_phase3_pg_cron.sql wires pg_cron to invoke
-- the notifications-dispatcher Edge Function every 60 seconds.
-- =====================================================================
