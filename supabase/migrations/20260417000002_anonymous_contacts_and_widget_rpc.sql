-- =====================================================================
-- NorteNode AI — Phase 2: Anonymous contacts + widget ingestion RPC
-- File: 20260417000002_anonymous_contacts_and_widget_rpc.sql
--
-- Rationale:
--   * A web-widget visitor may chat anonymously before handing over
--     phone or email.  The Phase-1 constraint required one of those two
--     identifiers; we relax it with a third identifier (`external_ref`)
--     that stores the widget session id.
--
--   * Web widgets do NOT authenticate.  We expose a single SECURITY
--     DEFINER RPC (`ingest_widget_message`) so the Next.js server
--     action can forward an inbound message using just a channel token
--     (acts as a capability).  The RPC enforces:
--       - channel must exist, be of type 'web_widget' and status 'active'
--       - input length caps
--       - idempotent upserts of contact + conversation
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- 1. Relax contacts identifier constraint
-- ---------------------------------------------------------------------
alter table public.contacts add column if not exists external_ref text;

alter table public.contacts drop constraint if exists contacts_has_identifier;
alter table public.contacts
  add constraint contacts_has_identifier
  check (
    phone_e164   is not null
    or email     is not null
    or external_ref is not null
  );

create unique index if not exists contacts_org_external_ref_idx
  on public.contacts(org_id, external_ref) where external_ref is not null;

-- ---------------------------------------------------------------------
-- 2. RPC: ingest_widget_message
--    Called by Next.js server action on every inbound widget message.
--    Returns the conversation_id so the streaming endpoint can look up
--    history.
-- ---------------------------------------------------------------------
create or replace function public.ingest_widget_message(
  p_channel_token text,
  p_session_id    text,
  p_text          text,
  p_visitor_name  text default null,
  p_visitor_phone text default null,
  p_visitor_email text default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_channel         public.channels%rowtype;
  v_contact_id      uuid;
  v_conversation_id uuid;
begin
  -- --- Input validation (defense-in-depth; Next also validates) -----
  if p_channel_token is null or length(p_channel_token) < 8 then
    raise exception 'invalid_channel_token' using errcode = '22023';
  end if;
  if p_session_id is null or length(p_session_id) < 8
     or length(p_session_id) > 128 then
    raise exception 'invalid_session_id' using errcode = '22023';
  end if;
  if p_text is null or length(p_text) = 0 or length(p_text) > 4000 then
    raise exception 'invalid_text' using errcode = '22023';
  end if;

  -- --- Resolve channel -----------------------------------------------
  select * into v_channel
  from public.channels
  where type = 'web_widget'
    and external_id = p_channel_token
    and status = 'active'
  limit 1;

  if not found then
    raise exception 'channel_not_found_or_inactive' using errcode = '42704';
  end if;

  -- --- Upsert contact (anonymous by default) -------------------------
  insert into public.contacts(
    org_id, external_ref,
    phone_e164, email, full_name,
    last_seen_at
  ) values (
    v_channel.org_id, p_session_id,
    p_visitor_phone, p_visitor_email, p_visitor_name,
    now()
  )
  on conflict (org_id, external_ref) where external_ref is not null
  do update set
    last_seen_at = excluded.last_seen_at,
    phone_e164   = coalesce(public.contacts.phone_e164, excluded.phone_e164),
    email        = coalesce(public.contacts.email,     excluded.email),
    full_name    = coalesce(public.contacts.full_name, excluded.full_name)
  returning id into v_contact_id;

  -- --- Upsert conversation (one open per (channel, contact)) ---------
  select id into v_conversation_id
  from public.conversations
  where org_id     = v_channel.org_id
    and contact_id = v_contact_id
    and channel_id = v_channel.id
    and status = 'open'
  order by last_message_at desc
  limit 1;

  if v_conversation_id is null then
    insert into public.conversations(
      org_id, contact_id, channel_id, status
    ) values (
      v_channel.org_id, v_contact_id, v_channel.id, 'open'
    ) returning id into v_conversation_id;
  end if;

  -- --- Insert inbound message ----------------------------------------
  insert into public.messages(
    org_id, conversation_id,
    direction, sender, content_type, text, status
  ) values (
    v_channel.org_id, v_conversation_id,
    'inbound', 'contact', 'text', p_text, 'delivered'
  );

  return v_conversation_id;
end;
$$;

revoke all on function public.ingest_widget_message(text, text, text, text, text, text)
  from public;
-- The server action calls this with service_role, which bypasses RLS.
-- Explicit grant kept narrow in case we ever call from authenticated.
grant execute on function public.ingest_widget_message(text, text, text, text, text, text)
  to service_role, authenticated;

-- ---------------------------------------------------------------------
-- 3. RPC: append_bot_message
--    Inserts an outbound bot message into an existing conversation.
--    Called by the Next streaming endpoint (and by bot-reply Edge Fn)
--    once the LLM response is complete.
-- ---------------------------------------------------------------------
create or replace function public.append_bot_message(
  p_conversation_id uuid,
  p_text            text,
  p_token_usage     jsonb default null,
  p_external_id     text  default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_conv public.conversations%rowtype;
  v_msg_id uuid;
begin
  if p_text is null or length(p_text) = 0 or length(p_text) > 4000 then
    raise exception 'invalid_text' using errcode = '22023';
  end if;

  select * into v_conv from public.conversations
  where id = p_conversation_id;
  if not found then
    raise exception 'conversation_not_found' using errcode = '42704';
  end if;

  insert into public.messages(
    org_id, conversation_id,
    direction, sender, content_type,
    text, status, token_usage, external_id
  ) values (
    v_conv.org_id, v_conv.id,
    'outbound', 'bot', 'text',
    p_text, 'queued', p_token_usage, p_external_id
  ) returning id into v_msg_id;

  return v_msg_id;
end;
$$;

revoke all on function public.append_bot_message(uuid, text, jsonb, text) from public;
grant execute on function public.append_bot_message(uuid, text, jsonb, text)
  to service_role;

-- ---------------------------------------------------------------------
-- 4. RPC: submit_agency_lead
--    Public-facing ingestion of the marketing-site contact form.
--    Creates a 'hot' lead in the NorteNode AI agency org so the
--    notification trigger fires WhatsApp + email to Adolfo.
-- ---------------------------------------------------------------------
create or replace function public.submit_agency_lead(
  p_agency_slug text,
  p_name        text,
  p_email       text,
  p_phone       text,
  p_message     text
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_org      public.organizations%rowtype;
  v_contact_id uuid;
  v_lead_id    uuid;
begin
  -- --- Basic input validation ----------------------------------------
  if coalesce(length(p_name), 0)  < 2  or length(p_name)  > 200 then
    raise exception 'invalid_name'  using errcode = '22023';
  end if;
  if p_email  is not null and length(p_email)  > 254 then
    raise exception 'invalid_email' using errcode = '22023';
  end if;
  if p_phone  is not null and length(p_phone)  > 32  then
    raise exception 'invalid_phone' using errcode = '22023';
  end if;
  if p_message is not null and length(p_message) > 2000 then
    raise exception 'invalid_message' using errcode = '22023';
  end if;
  if p_email is null and p_phone is null then
    raise exception 'email_or_phone_required' using errcode = '22023';
  end if;

  select * into v_org from public.organizations where slug = p_agency_slug;
  if not found then
    raise exception 'agency_org_not_found' using errcode = '42704';
  end if;

  -- --- Find-or-create contact within the agency org ------------------
  v_contact_id := null;

  if p_phone is not null then
    select id into v_contact_id
      from public.contacts
     where org_id = v_org.id and phone_e164 = p_phone
     limit 1;
  end if;

  if v_contact_id is null and p_email is not null then
    select id into v_contact_id
      from public.contacts
     where org_id = v_org.id and lower(email) = lower(p_email)
     limit 1;
  end if;

  if v_contact_id is null then
    insert into public.contacts(
      org_id, phone_e164, email, full_name
    ) values (
      v_org.id, p_phone, p_email, p_name
    ) returning id into v_contact_id;
  else
    update public.contacts
       set phone_e164   = coalesce(phone_e164, p_phone),
           email        = coalesce(email,      p_email),
           full_name    = coalesce(p_name,     full_name),
           last_seen_at = now()
     where id = v_contact_id;
  end if;

  -- --- Insert hot lead (fires notification trigger) ------------------
  insert into public.leads(
    org_id, contact_id, source,
    intent, temperature, status, qualification, notes
  ) values (
    v_org.id, v_contact_id, 'web_widget',
    'contacto-comercial', 'hot', 'new',
    jsonb_build_object('form', 'marketing-contact'),
    p_message
  ) returning id into v_lead_id;

  return v_lead_id;
end;
$$;

revoke all on function public.submit_agency_lead(text, text, text, text, text) from public;
grant execute on function public.submit_agency_lead(text, text, text, text, text)
  to service_role, authenticated;

commit;
