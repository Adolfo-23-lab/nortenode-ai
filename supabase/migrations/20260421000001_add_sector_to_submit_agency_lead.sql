-- ============================================================
-- Migration: add p_sector to submit_agency_lead
-- Purpose:   Capture business vertical from marketing contact form
--            without altering leads/contacts schema. Sector is
--            stored inside leads.qualification JSONB for queryability
--            without a dedicated column.
-- Date:      2026-04-21
-- ============================================================

-- Drop the 5-param version first.
-- Rationale: Postgres identifies functions by name + signature.
-- CREATE OR REPLACE only replaces when signatures match exactly.
-- Adding p_sector creates a *new* function overload, leaving the
-- original behind. We drop the old one explicitly to guarantee a
-- single canonical version of the RPC.
drop function if exists public.submit_agency_lead(text, text, text, text, text);

create or replace function public.submit_agency_lead(
  p_agency_slug text,
  p_name        text,
  p_email       text,
  p_phone       text,
  p_message     text,
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

-- Cleanup agency org contact data
-- Reason: owner_contact_phone was a placeholder (+351910000000)
--        and contributed to failed WhatsApp notifications.
--        owner_contact_email was adolfo@nortenode.com (pending domain),
--        real operational inbox is nortenode.ia@gmail.com.
update public.organizations
   set owner_contact_phone = '+351937809995',
       owner_contact_email = 'nortenode.ia@gmail.com'
 where slug = 'nortenode-ai';
