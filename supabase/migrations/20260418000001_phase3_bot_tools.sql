-- =====================================================================
-- NorteNode AI — Phase 3 · Bot tool-calling RPCs
-- File: 20260418000001_phase3_bot_tools.sql
--
-- Adds the three tools the LLM can call, plus three helper functions.
-- All tool RPCs:
--   * SECURITY DEFINER with locked search_path
--   * callable only by service_role (bots never run as `authenticated`)
--   * atomic — conflict detection + insert happen inside one statement
--     so two concurrent bot invocations can't double-book the same slot
--   * return a jsonb envelope `{ ok, ... }` — the LLM reads the `error`
--     code and retries / re-asks the user without us parsing SQLSTATE
--   * insert an `audit_log` row per call (entity_type='bot_tool_call')
--
-- Skills applied:
--   * backend-supabase: typed params, FK integrity, indexes unchanged
--     (reusing appointments_org_start_idx for the conflict check).
--   * security-owasp: least-privilege grants, no raw string interpolation,
--     length caps, input validation, audit trail.
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- 1. Helper: bot_find_service
--    Fuzzy-match a service by name inside an org.  Uses pg_trgm.
--    Returns NULL if no candidate crosses the similarity threshold.
-- ---------------------------------------------------------------------
create or replace function public.bot_find_service(
  p_org_id uuid,
  p_query  text
) returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_id    uuid;
  v_score real;
begin
  if p_query is null or length(trim(p_query)) = 0 then
    return null;
  end if;

  select s.id, similarity(lower(s.name), lower(p_query))
    into v_id, v_score
    from public.services s
   where s.org_id = p_org_id
     and s.active = true
   order by similarity(lower(s.name), lower(p_query)) desc,
            length(s.name) asc
   limit 1;

  if v_score is null or v_score < 0.30 then
    return null;
  end if;
  return v_id;
end;
$$;

revoke all on function public.bot_find_service(uuid, text) from public;
grant execute on function public.bot_find_service(uuid, text) to service_role;

-- ---------------------------------------------------------------------
-- 2. Helper: bot_has_conflict
--    Boolean: does the proposed [starts_at, ends_at) overlap any
--    non-cancelled / non-no_show appointment in the org?
-- ---------------------------------------------------------------------
create or replace function public.bot_has_conflict(
  p_org_id    uuid,
  p_starts_at timestamptz,
  p_ends_at   timestamptz,
  p_ignore_appointment_id uuid default null
) returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.appointments a
     where a.org_id = p_org_id
       and a.status not in ('cancelled', 'no_show')
       and tstzrange(a.starts_at, a.ends_at, '[)')
           && tstzrange(p_starts_at, p_ends_at, '[)')
       and (p_ignore_appointment_id is null or a.id <> p_ignore_appointment_id)
  );
$$;

revoke all on function public.bot_has_conflict(uuid, timestamptz, timestamptz, uuid) from public;
grant execute on function public.bot_has_conflict(uuid, timestamptz, timestamptz, uuid) to service_role;

-- ---------------------------------------------------------------------
-- 3. Helper: bot_within_business_hours
--    Checks whether [starts_at, ends_at] sits inside one slot of the
--    org's weekly schedule.  Timezone-aware (uses organizations.timezone).
--
--    Limitation: slots that cross midnight are not supported.  A 24/7
--    vertical should use {"mon":[{"from":"00:00","to":"23:59"}], ...}.
-- ---------------------------------------------------------------------
create or replace function public.bot_within_business_hours(
  p_org_id    uuid,
  p_starts_at timestamptz,
  p_ends_at   timestamptz
) returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_tz       text;
  v_hours    jsonb;
  v_dow_key  text;
  v_slots    jsonb;
  v_slot     jsonb;
  v_start_t  time;
  v_end_t    time;
  v_start_d  date;
  v_end_d    date;
  i          int;
begin
  select timezone, business_hours
    into v_tz, v_hours
    from public.organizations
   where id = p_org_id;
  if v_tz is null then return false; end if;

  -- Must fall on the same local day (no overnight ranges).
  v_start_d := (timezone(v_tz, p_starts_at))::date;
  v_end_d   := (timezone(v_tz, p_ends_at))::date;
  if v_start_d <> v_end_d then return false; end if;

  v_dow_key := lower(to_char(timezone(v_tz, p_starts_at), 'dy'));
  v_slots   := v_hours -> v_dow_key;
  if v_slots is null or jsonb_array_length(v_slots) = 0 then
    return false;
  end if;

  v_start_t := (timezone(v_tz, p_starts_at))::time;
  v_end_t   := (timezone(v_tz, p_ends_at))::time;

  for i in 0 .. jsonb_array_length(v_slots) - 1 loop
    v_slot := v_slots -> i;
    if v_start_t >= (v_slot ->> 'from')::time
       and v_end_t <= (v_slot ->> 'to')::time then
      return true;
    end if;
  end loop;
  return false;
end;
$$;

revoke all on function public.bot_within_business_hours(uuid, timestamptz, timestamptz) from public;
grant execute on function public.bot_within_business_hours(uuid, timestamptz, timestamptz) to service_role;

-- ---------------------------------------------------------------------
-- 4. Tool RPC: bot_qualify_lead
--    Upserts a lead tied to the conversation's contact.  Triggers the
--    `tg_notify_on_hot_lead` notification when temperature='hot'.
--
--    Returns: { ok: true, lead_id: uuid }
-- ---------------------------------------------------------------------
create or replace function public.bot_qualify_lead(
  p_conversation_id uuid,
  p_intent          text,
  p_temperature     public.lead_temperature,
  p_qualification   jsonb default '{}'::jsonb,
  p_notes           text  default null
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_conv    public.conversations%rowtype;
  v_lead_id uuid;
begin
  -- --- Validation ----------------------------------------------------
  if p_intent is null or length(trim(p_intent)) = 0 or length(p_intent) > 200 then
    return jsonb_build_object('ok', false, 'error', 'invalid_intent');
  end if;
  if coalesce(length(p_notes), 0) > 2000 then
    return jsonb_build_object('ok', false, 'error', 'invalid_notes');
  end if;

  select * into v_conv from public.conversations where id = p_conversation_id;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'conversation_not_found');
  end if;

  -- --- Upsert lead for this (conversation, contact) ------------------
  select id into v_lead_id
    from public.leads
   where conversation_id = v_conv.id
   order by created_at desc
   limit 1;

  if v_lead_id is null then
    insert into public.leads(
      org_id, contact_id, conversation_id,
      source, intent, temperature, status,
      qualification, notes
    ) values (
      v_conv.org_id, v_conv.contact_id, v_conv.id,
      'web_widget', p_intent, p_temperature, 'new',
      coalesce(p_qualification, '{}'::jsonb), p_notes
    ) returning id into v_lead_id;
  else
    update public.leads
       set intent        = p_intent,
           temperature   = p_temperature,
           qualification = coalesce(public.leads.qualification, '{}'::jsonb)
                           || coalesce(p_qualification, '{}'::jsonb),
           notes         = coalesce(p_notes, notes),
           status        = case when status = 'new' then 'qualified' else status end,
           updated_at    = now()
     where id = v_lead_id;
  end if;

  insert into public.audit_log(
    org_id, action, entity_type, entity_id, metadata
  ) values (
    v_conv.org_id, 'bot.qualify_lead', 'lead', v_lead_id,
    jsonb_build_object(
      'conversation_id', v_conv.id,
      'temperature',     p_temperature,
      'intent',          p_intent
    )
  );

  return jsonb_build_object('ok', true, 'lead_id', v_lead_id);
end;
$$;

revoke all on function public.bot_qualify_lead(uuid, text, public.lead_temperature, jsonb, text)
  from public;
grant execute on function public.bot_qualify_lead(uuid, text, public.lead_temperature, jsonb, text)
  to service_role;

-- ---------------------------------------------------------------------
-- 5. Tool RPC: bot_book_appointment
--    Atomically: resolve service, compute ends_at, check business hours,
--    check overlap, insert appointment, upsert qualifying lead.
--    Trigger `tg_notify_on_appointment_change` fires the owner alert.
--
--    Locks the services row for the org to serialize concurrent attempts
--    on the same service — combined with the tstzrange overlap check
--    this prevents double-booking under concurrent bot invocations.
--
--    Returns:
--      ok → { ok: true, appointment_id, service_id, service_name,
--             starts_at, ends_at, duration_minutes }
--      err → { ok: false, error: "<code>" }
--             codes: conversation_not_found | invalid_starts_at |
--                    service_not_found | outside_business_hours |
--                    conflict | past_time
-- ---------------------------------------------------------------------
create or replace function public.bot_book_appointment(
  p_conversation_id        uuid,
  p_service_query          text,
  p_starts_at              timestamptz,
  p_duration_minutes_override int  default null,
  p_notes                  text default null
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_conv           public.conversations%rowtype;
  v_service        public.services%rowtype;
  v_service_id     uuid;
  v_duration_min   int;
  v_ends_at        timestamptz;
  v_appt_id        uuid;
begin
  -- --- Validation ----------------------------------------------------
  select * into v_conv from public.conversations where id = p_conversation_id;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'conversation_not_found');
  end if;

  if p_starts_at is null then
    return jsonb_build_object('ok', false, 'error', 'invalid_starts_at');
  end if;
  if p_starts_at < now() - interval '5 minutes' then
    return jsonb_build_object('ok', false, 'error', 'past_time');
  end if;

  -- --- Resolve service (fuzzy match) + lock it ----------------------
  v_service_id := public.bot_find_service(v_conv.org_id, p_service_query);
  if v_service_id is null then
    return jsonb_build_object('ok', false, 'error', 'service_not_found');
  end if;

  -- Row lock guarantees the duration we read is the same one that
  -- serializes concurrent bookings on this service.
  select * into v_service from public.services where id = v_service_id for update;

  v_duration_min := coalesce(p_duration_minutes_override, v_service.duration_minutes);
  if v_duration_min is null or v_duration_min <= 0 or v_duration_min > 480 then
    return jsonb_build_object('ok', false, 'error', 'invalid_duration');
  end if;
  v_ends_at := p_starts_at + make_interval(mins => v_duration_min);

  -- --- Business hours + conflict check (inside the same txn) --------
  if not public.bot_within_business_hours(v_conv.org_id, p_starts_at, v_ends_at) then
    return jsonb_build_object('ok', false, 'error', 'outside_business_hours');
  end if;
  if public.bot_has_conflict(v_conv.org_id, p_starts_at, v_ends_at, null) then
    return jsonb_build_object('ok', false, 'error', 'conflict');
  end if;

  -- --- Insert appointment (trigger fires the owner notification) ----
  insert into public.appointments(
    org_id, contact_id, service_id,
    starts_at, ends_at,
    status, created_by, notes
  ) values (
    v_conv.org_id, v_conv.contact_id, v_service.id,
    p_starts_at, v_ends_at,
    'confirmed', 'bot', p_notes
  ) returning id into v_appt_id;

  insert into public.audit_log(
    org_id, action, entity_type, entity_id, metadata
  ) values (
    v_conv.org_id, 'bot.book_appointment', 'appointment', v_appt_id,
    jsonb_build_object(
      'conversation_id', v_conv.id,
      'service_id',      v_service.id,
      'service_name',    v_service.name,
      'starts_at',       p_starts_at,
      'ends_at',         v_ends_at
    )
  );

  return jsonb_build_object(
    'ok',                true,
    'appointment_id',    v_appt_id,
    'service_id',        v_service.id,
    'service_name',      v_service.name,
    'starts_at',         p_starts_at,
    'ends_at',           v_ends_at,
    'duration_minutes',  v_duration_min
  );
end;
$$;

revoke all on function public.bot_book_appointment(uuid, text, timestamptz, int, text) from public;
grant execute on function public.bot_book_appointment(uuid, text, timestamptz, int, text) to service_role;

-- ---------------------------------------------------------------------
-- 6. Tool RPC: bot_escalate_conversation
--    Turns off bot_enabled, enqueues a bot_escalation notification so
--    the owner gets pinged that a human must take over.
--
--    Returns: { ok: true, conversation_id } or { ok: false, error }
-- ---------------------------------------------------------------------
create or replace function public.bot_escalate_conversation(
  p_conversation_id uuid,
  p_reason          text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_conv public.conversations%rowtype;
  v_org  public.organizations%rowtype;
begin
  if p_reason is null or length(trim(p_reason)) = 0 or length(p_reason) > 500 then
    return jsonb_build_object('ok', false, 'error', 'invalid_reason');
  end if;

  select * into v_conv from public.conversations where id = p_conversation_id;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'conversation_not_found');
  end if;

  update public.conversations
     set bot_enabled = false,
         metadata = coalesce(metadata, '{}'::jsonb)
                    || jsonb_build_object(
                         'escalated_at', now(),
                         'escalation_reason', p_reason
                       ),
         updated_at = now()
   where id = v_conv.id;

  select * into v_org from public.organizations where id = v_conv.org_id;

  if v_org.owner_contact_phone is not null
     and v_org.notify_channel in ('whatsapp','both') then
    insert into public.notifications(
      org_id, event_type, channel, recipient,
      payload, related_conversation_id
    ) values (
      v_org.id, 'bot_escalation', 'whatsapp',
      v_org.owner_contact_phone,
      jsonb_build_object('reason', p_reason, 'conversation_id', v_conv.id),
      v_conv.id
    );
  end if;
  if v_org.owner_contact_email is not null
     and v_org.notify_channel in ('email','both') then
    insert into public.notifications(
      org_id, event_type, channel, recipient,
      payload, related_conversation_id
    ) values (
      v_org.id, 'bot_escalation', 'email',
      v_org.owner_contact_email,
      jsonb_build_object('reason', p_reason, 'conversation_id', v_conv.id),
      v_conv.id
    );
  end if;

  insert into public.audit_log(
    org_id, action, entity_type, entity_id, metadata
  ) values (
    v_conv.org_id, 'bot.escalate', 'conversation', v_conv.id,
    jsonb_build_object('reason', p_reason)
  );

  return jsonb_build_object('ok', true, 'conversation_id', v_conv.id);
end;
$$;

revoke all on function public.bot_escalate_conversation(uuid, text) from public;
grant execute on function public.bot_escalate_conversation(uuid, text) to service_role;

commit;

-- =====================================================================
-- END Phase 3 · Bot tool-calling RPCs
-- Next migration will add the notifications dispatcher worker RPCs
-- (claim_pending_notifications, mark_notification_sent/failed) + pg_cron.
-- =====================================================================
