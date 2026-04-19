-- =====================================================================
-- NorteNode · Phase 3 · Secure pg_cron schedule for notifications-dispatcher
-- File: 20260418000003_phase3_pg_cron.sql
--
-- SECURITY: both the service_role JWT and the project URL are read from
-- Supabase Vault at job runtime.  Neither value is written to this
-- file, the cron.job table, or job_run_details logs.
--
-- ONE-TIME BOOTSTRAP  (run BEFORE this migration, once per environment)
-- =====================================================================
--   -- 1. Store the service_role JWT
--   select vault.create_secret(
--     '<paste your SERVICE_ROLE_KEY here>',
--     'dispatcher_service_role_key',
--     'Service role JWT used by pg_cron to call notifications-dispatcher'
--   );
--
--   -- 2. Store the project URL (no trailing slash)
--   select vault.create_secret(
--     'https://<project-ref>.supabase.co',
--     'project_url',
--     'Project base URL used by pg_cron to call edge functions'
--   );
-- =====================================================================
-- Rotation:
--   select vault.update_secret(
--     (select id from vault.secrets where name = 'dispatcher_service_role_key'),
--     '<new SRK>'
--   );
-- Nothing else changes — cron picks up the new value on the next tick.
-- =====================================================================

create extension if not exists pg_cron;
create extension if not exists pg_net;
-- `vault` schema is provisioned automatically on Supabase projects.

-- ---------------------------------------------------------------------
-- Idempotent unschedule of any prior job
-- ---------------------------------------------------------------------
do $$
begin
  perform cron.unschedule('dispatch-notifications');
exception when others then
  null;  -- job did not exist yet
end
$$;

-- ---------------------------------------------------------------------
-- Schedule — runs every minute.  URL + SRK are resolved at invocation
-- time from Vault, so rotation is zero-downtime and no secret ever
-- appears in migration files, cron.job, or job_run_details.
-- ---------------------------------------------------------------------
select cron.schedule(
  'dispatch-notifications',
  '* * * * *',
  $cron$
    select net.http_post(
      url := (
        select decrypted_secret
          from vault.decrypted_secrets
         where name = 'project_url'
         limit 1
      ) || '/functions/v1/notifications-dispatcher',
      headers := jsonb_build_object(
        'Authorization', 'Bearer ' || (
          select decrypted_secret
            from vault.decrypted_secrets
           where name = 'dispatcher_service_role_key'
           limit 1
        ),
        'Content-Type', 'application/json'
      ),
      body := '{}'::jsonb,
      timeout_milliseconds := 25000
    );
  $cron$
);

-- ---------------------------------------------------------------------
-- Sanity check after first tick (run manually):
--   select jobid, status, return_message, start_time, end_time
--     from cron.job_run_details
--    where jobid = (select jobid from cron.job where jobname = 'dispatch-notifications')
--    order by start_time desc limit 10;
--
-- A healthy row shows `status = 'succeeded'` and a non-null end_time.
-- If you see `status = 'failed'` with an auth error, the Vault lookup
-- returned null — verify both secrets exist:
--   select name from vault.secrets
--    where name in ('project_url', 'dispatcher_service_role_key');
-- ---------------------------------------------------------------------
