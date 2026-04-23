-- ============================================================
-- Migration: make submit_agency_lead optional params nullable
-- Purpose:   Align RPC signature with actual runtime behavior.
--            p_email / p_phone / p_message are already handled
--            as nullable inside the body (validation allows null
--            and the "at-least-one-of email/phone required" rule
--            is enforced by the function itself). Declaring them
--            with DEFAULT NULL makes Supabase's type generator
--            correctly emit `string | null` in the RPC Args type.
-- Date:      2026-04-22
-- Context:   Follow-up to 20260421000001 (B.4.3a-dx).
-- ============================================================

-- Drop the 6-param version (non-nullable p_email/p_phone/p_message)
-- to avoid overload coexistence when the new version is created.
drop function if exists public.submit_agency_lead(text, text, text, text, text, text);

create or replace function public.submit_agency_lead(
  p_agency_slug text,
  p_name        text,
  p_email       text default null,
  p_phone       text default null,
  p_message     text default null,
  p_sector      text default null
)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_org        public.organizations%rowtype;
  v_contact_id uuid;
  v_lead_id    uuid;
  v_qualification jsonb;
begin
  -- Basic input validation
  if coalesce(length(p_name), 0) < 2 or length(p_name) > 200 then
    raise exception 'invalid_name' using errcode = '22023';
  end if;
  if p_email is not null and length(p_email) > 254 then
    raise exception 'invalid_email' using errcode = '22023';
  end if;
  if p_phone is not null and length(p_phone) > 32 then
    raise exception 'invalid_phone' using errcode = '22023';
  end if;
  if p_message is not null and length(p_message) > 2000 then
    raise exception 'invalid_message' using errcode = '22023';
  end if;
  if p_sector is not null and length(p_sector) > 100 then
    raise exception 'invalid_sector' using errcode = '22023';
  end if;
  if p_email is null and p_phone is null then
    raise exception 'email_or_phone_required' using errcode = '22023';
  end if;

  select * into v_org from public.organizations where slug = p_agency_slug;
  if not found then
    raise exception 'agency_org_not_found' using errcode = '42704';
  end if;

  -- Find-or-create contact within the agency org
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
    insert into public.contacts(org_id, phone_e164, email, full_name)
    values (v_org.id, p_phone, p_email, p_name)
    returning id into v_contact_id;
  else
    update public.contacts
       set phone_e164   = coalesce(phone_e164, p_phone),
           email        = coalesce(email, p_email),
           full_name    = coalesce(p_name, full_name),
           last_seen_at = now()
     where id = v_contact_id;
  end if;

  -- Build qualification JSONB with sector if present
  v_qualification := jsonb_build_object('form', 'marketing-contact');
  if p_sector is not null and length(trim(p_sector)) > 0 then
    v_qualification := v_qualification || jsonb_build_object('sector', trim(p_sector));
  end if;

  -- Insert hot lead (fires notification trigger)
  insert into public.leads(
    org_id, contact_id, source,
    intent, temperature, status, qualification, notes
  ) values (
    v_org.id, v_contact_id, 'web_widget',
    'contacto-comercial', 'hot', 'new',
    v_qualification,
    p_message
  ) returning id into v_lead_id;

  return v_lead_id;
end;
$function$;
