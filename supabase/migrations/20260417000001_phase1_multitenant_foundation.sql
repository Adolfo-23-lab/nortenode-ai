-- =====================================================================
-- NorteNode AI — Phase 1: Multi-tenant Foundation
-- File: 20260417000001_phase1_multitenant_foundation.sql
--
-- WARNING — DESTRUCTIVE MIGRATION
--   This migration DROPS the legacy mono-tenant tables (leads, appointments)
--   and rebuilds the schema with strict multi-tenant isolation, RLS on
--   every table, and audit/webhook plumbing.
--
-- Skills enforced:
--   * backend-supabase-skill   RLS mandatory, FKs, precise types, indexes
--   * security-owasp-skill     access control at DB layer, audit trail,
--                              idempotent webhook inbox, SECURITY DEFINER
--                              with locked search_path, least privilege
--                              grants.
--
-- Conventions:
--   * All business data hangs off `organizations.id` (tenant root).
--   * `org_id` is denormalized onto hot tables for RLS index efficiency.
--   * Mutations by the bot/Edge Functions use service_role (bypasses RLS).
--   * Mutations by humans go through authenticated role (RLS-gated).
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- 0. Drop legacy mono-tenant objects
-- ---------------------------------------------------------------------
drop table if exists public.appointments cascade;
drop table if exists public.leads cascade;

-- ---------------------------------------------------------------------
-- 1. Extensions
-- ---------------------------------------------------------------------
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;
create extension if not exists unaccent;

-- ---------------------------------------------------------------------
-- 2. Enum types
-- ---------------------------------------------------------------------
do $$ begin
  create type public.org_vertical as enum (
    'barbershop','tattoo_studio','emergency_service','gym','other'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.org_plan as enum ('trial','starter','pro','agency');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.org_plan_status as enum (
    'trialing','active','past_due','canceled','paused'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.member_role as enum ('owner','admin','agent','viewer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.channel_type as enum ('whatsapp','web_widget','instagram');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.channel_status as enum (
    'active','pending_verification','disabled'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.conversation_status as enum ('open','snoozed','closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.message_direction as enum ('inbound','outbound');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.message_sender as enum ('contact','bot','agent','system');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.message_content_type as enum (
    'text','image','audio','video','document','template',
    'location','interactive','sticker'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.message_status as enum (
    'queued','sent','delivered','read','failed'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lead_source as enum (
    'whatsapp','web_widget','manual','phone','instagram'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lead_temperature as enum ('cold','warm','hot');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lead_status as enum (
    'new','contacted','qualified','converted','lost'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.appointment_status as enum (
    'pending','confirmed','cancelled','completed','no_show','rescheduled'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.appointment_creator as enum ('bot','agent','contact');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.notification_event as enum (
    'hot_lead_captured',
    'appointment_booked',
    'appointment_cancelled',
    'bot_escalation',
    'new_message_after_hours',
    'bot_error'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.notification_channel as enum (
    'whatsapp','email','both','none'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.notification_status as enum (
    'queued','sent','delivered','failed'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.webhook_provider as enum ('meta_whatsapp','internal_widget');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------
-- 3. Shared utility: updated_at trigger
-- ---------------------------------------------------------------------
create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- 4. Tables
-- ---------------------------------------------------------------------

-- 4.1 organizations (tenants) -----------------------------------------
create table public.organizations (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique
                         check (slug ~ '^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$'),
  name                   text not null check (char_length(name) between 2 and 120),
  vertical               public.org_vertical   not null default 'other',
  plan                   public.org_plan        not null default 'trial',
  plan_status            public.org_plan_status not null default 'trialing',
  trial_ends_at          timestamptz,
  locale                 text not null default 'pt-PT',
  timezone               text not null default 'Europe/Lisbon',
  owner_contact_email    text,
  owner_contact_phone    text,  -- E.164 format
  notify_hot_lead        boolean not null default true,
  notify_appointments    boolean not null default true,
  notify_after_hours     boolean not null default false,
  notify_channel         public.notification_channel not null default 'both',
  business_hours         jsonb  not null default $json${
    "mon":[{"from":"09:00","to":"19:00"}],
    "tue":[{"from":"09:00","to":"19:00"}],
    "wed":[{"from":"09:00","to":"19:00"}],
    "thu":[{"from":"09:00","to":"19:00"}],
    "fri":[{"from":"09:00","to":"19:00"}],
    "sat":[{"from":"10:00","to":"14:00"}],
    "sun":[]
  }$json$::jsonb,
  metadata               jsonb not null default '{}'::jsonb,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create trigger set_updated_at before update on public.organizations
  for each row execute function public.tg_set_updated_at();

-- 4.2 profiles (extends auth.users) -----------------------------------
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text,
  avatar_url   text,
  phone        text,
  locale       text not null default 'pt-PT',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create trigger set_updated_at before update on public.profiles
  for each row execute function public.tg_set_updated_at();

-- 4.3 memberships -----------------------------------------------------
create table public.memberships (
  id         uuid primary key default gen_random_uuid(),
  org_id     uuid not null references public.organizations(id) on delete cascade,
  user_id    uuid not null references auth.users(id)          on delete cascade,
  role       public.member_role not null default 'agent',
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (org_id, user_id)
);
create index memberships_user_idx on public.memberships(user_id);
create index memberships_org_idx  on public.memberships(org_id);

-- 4.4 channels --------------------------------------------------------
create table public.channels (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references public.organizations(id) on delete cascade,
  type            public.channel_type   not null,
  external_id     text,                         -- Meta phone_number_id, widget key, etc.
  display_name    text not null,
  phone_e164      text,
  status          public.channel_status not null default 'pending_verification',
  config          jsonb not null default '{}'::jsonb,
  webhook_secret  text,                         -- HMAC secret for inbound verification
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (org_id, type, external_id)
);
create index channels_org_idx on public.channels(org_id);
create trigger set_updated_at before update on public.channels
  for each row execute function public.tg_set_updated_at();

-- 4.5 services --------------------------------------------------------
create table public.services (
  id                uuid primary key default gen_random_uuid(),
  org_id            uuid not null references public.organizations(id) on delete cascade,
  name              text not null check (char_length(name) between 1 and 120),
  description       text,
  duration_minutes  int  not null default 30 check (duration_minutes > 0),
  price_cents       int  check (price_cents is null or price_cents >= 0),
  currency          text not null default 'EUR',
  active            boolean not null default true,
  metadata          jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index services_org_active_idx on public.services(org_id, active);
create trigger set_updated_at before update on public.services
  for each row execute function public.tg_set_updated_at();

-- 4.6 contacts (end-customers of the tenant's business) --------------
create table public.contacts (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references public.organizations(id) on delete cascade,
  phone_e164      text,
  email           text,
  full_name       text,
  locale          text,
  tags            text[] not null default '{}',
  metadata        jsonb  not null default '{}'::jsonb,
  first_seen_at   timestamptz not null default now(),
  last_seen_at    timestamptz not null default now(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint contacts_has_identifier check (
    phone_e164 is not null or email is not null
  )
);
create unique index contacts_org_phone_idx
  on public.contacts(org_id, phone_e164) where phone_e164 is not null;
create unique index contacts_org_email_idx
  on public.contacts(org_id, lower(email)) where email is not null;
create index contacts_org_lastseen_idx
  on public.contacts(org_id, last_seen_at desc);
create index contacts_name_trgm_idx
  on public.contacts using gin (full_name gin_trgm_ops);
create trigger set_updated_at before update on public.contacts
  for each row execute function public.tg_set_updated_at();

-- 4.7 conversations ---------------------------------------------------
create table public.conversations (
  id                   uuid primary key default gen_random_uuid(),
  org_id               uuid not null references public.organizations(id) on delete cascade,
  contact_id           uuid not null references public.contacts(id)      on delete cascade,
  channel_id           uuid not null references public.channels(id)      on delete restrict,
  status               public.conversation_status not null default 'open',
  bot_enabled          boolean not null default true,
  assignee_user_id     uuid references auth.users(id) on delete set null,
  last_message_at      timestamptz not null default now(),
  last_message_preview text,
  unread_count         int not null default 0,
  metadata             jsonb not null default '{}'::jsonb,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
create index conversations_org_lastmsg_idx
  on public.conversations(org_id, last_message_at desc);
create index conversations_org_status_idx
  on public.conversations(org_id, status, last_message_at desc);
create index conversations_contact_idx on public.conversations(contact_id);
create trigger set_updated_at before update on public.conversations
  for each row execute function public.tg_set_updated_at();

-- 4.8 messages --------------------------------------------------------
create table public.messages (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references public.organizations(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id)  on delete cascade,
  direction       public.message_direction    not null,
  sender          public.message_sender       not null,
  sender_user_id  uuid references auth.users(id) on delete set null,
  content_type    public.message_content_type not null default 'text',
  text            text,
  media_url       text,
  media_metadata  jsonb,
  external_id     text,                       -- wamid for WhatsApp idempotency
  status          public.message_status       not null default 'queued',
  error_text      text,
  token_usage     jsonb,
  created_at      timestamptz not null default now()
);
create unique index messages_external_idx
  on public.messages(external_id) where external_id is not null;
create index messages_conversation_idx
  on public.messages(conversation_id, created_at);
create index messages_org_created_idx
  on public.messages(org_id, created_at desc);

-- 4.9 leads -----------------------------------------------------------
create table public.leads (
  id                  uuid primary key default gen_random_uuid(),
  org_id              uuid not null references public.organizations(id) on delete cascade,
  contact_id          uuid not null references public.contacts(id)      on delete cascade,
  conversation_id     uuid references public.conversations(id) on delete set null,
  source              public.lead_source not null,
  intent              text,
  temperature         public.lead_temperature not null default 'warm',
  status              public.lead_status      not null default 'new',
  qualification       jsonb not null default '{}'::jsonb,  -- vertical-specific
  assigned_to_user_id uuid references auth.users(id) on delete set null,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index leads_org_status_idx on public.leads(org_id, status, created_at desc);
create index leads_org_temp_idx   on public.leads(org_id, temperature, created_at desc);
create trigger set_updated_at before update on public.leads
  for each row execute function public.tg_set_updated_at();

-- 4.10 appointments ---------------------------------------------------
create table public.appointments (
  id             uuid primary key default gen_random_uuid(),
  org_id         uuid not null references public.organizations(id) on delete cascade,
  contact_id     uuid not null references public.contacts(id)      on delete cascade,
  lead_id        uuid references public.leads(id)      on delete set null,
  service_id     uuid references public.services(id)   on delete set null,
  starts_at      timestamptz not null,
  ends_at        timestamptz not null,
  status         public.appointment_status  not null default 'pending',
  notes          text,
  created_by     public.appointment_creator not null default 'bot',
  reminded_at    timestamptz,
  cancelled_at   timestamptz,
  cancel_reason  text,
  metadata       jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  constraint appointments_time_order check (ends_at > starts_at)
);
create index appointments_org_start_idx   on public.appointments(org_id, starts_at);
create index appointments_contact_idx     on public.appointments(contact_id, starts_at);
create index appointments_status_idx      on public.appointments(org_id, status, starts_at);
create trigger set_updated_at before update on public.appointments
  for each row execute function public.tg_set_updated_at();

-- 4.11 bot_configs ----------------------------------------------------
create table public.bot_configs (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references public.organizations(id) on delete cascade,
  channel_id      uuid references public.channels(id) on delete cascade,
  persona_name    text not null default 'Recepcionista IA',
  system_prompt   text not null,
  knowledge_base  jsonb not null default '{}'::jsonb,
  model           text not null default 'llama-3.3-70b-versatile',
  temperature     numeric(3,2) not null default 0.4
                    check (temperature between 0 and 2),
  max_tokens      int not null default 800,
  tools           jsonb not null default '[]'::jsonb,
  enabled         boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
-- One default config per org (channel_id null) + one per channel:
create unique index bot_configs_default_idx
  on public.bot_configs(org_id) where channel_id is null;
create unique index bot_configs_channel_idx
  on public.bot_configs(org_id, channel_id) where channel_id is not null;
create trigger set_updated_at before update on public.bot_configs
  for each row execute function public.tg_set_updated_at();

-- 4.12 notifications (outbound queue to business owner) ---------------
create table public.notifications (
  id                      uuid primary key default gen_random_uuid(),
  org_id                  uuid not null references public.organizations(id) on delete cascade,
  event_type              public.notification_event   not null,
  channel                 public.notification_channel not null,
  recipient               text not null,               -- phone E.164 or email
  subject                 text,
  payload                 jsonb not null default '{}'::jsonb,
  related_lead_id         uuid references public.leads(id)         on delete set null,
  related_appointment_id  uuid references public.appointments(id)  on delete set null,
  related_conversation_id uuid references public.conversations(id) on delete set null,
  status                  public.notification_status not null default 'queued',
  attempts                int not null default 0,
  last_error              text,
  scheduled_at            timestamptz not null default now(),
  sent_at                 timestamptz,
  created_at              timestamptz not null default now()
);
create index notifications_org_status_idx
  on public.notifications(org_id, status, scheduled_at);
create index notifications_queue_idx
  on public.notifications(status, scheduled_at) where status = 'queued';

-- 4.13 notification_preferences (per-user override) -------------------
create table public.notification_preferences (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid not null references public.organizations(id) on delete cascade,
  user_id      uuid not null references auth.users(id)           on delete cascade,
  event_type   public.notification_event    not null,
  channel      public.notification_channel  not null default 'both',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (org_id, user_id, event_type)
);
create trigger set_updated_at before update on public.notification_preferences
  for each row execute function public.tg_set_updated_at();

-- 4.14 audit_log ------------------------------------------------------
create table public.audit_log (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid references public.organizations(id) on delete set null,
  user_id      uuid references auth.users(id)           on delete set null,
  action       text not null,
  entity_type  text not null,
  entity_id    uuid,
  metadata     jsonb not null default '{}'::jsonb,
  ip           inet,
  user_agent   text,
  created_at   timestamptz not null default now()
);
create index audit_log_org_created_idx on public.audit_log(org_id, created_at desc);
create index audit_log_entity_idx      on public.audit_log(entity_type, entity_id);

-- 4.15 webhook_events (idempotency inbox) -----------------------------
create table public.webhook_events (
  id           uuid primary key default gen_random_uuid(),
  provider     public.webhook_provider not null,
  external_id  text not null,
  org_id       uuid references public.organizations(id) on delete set null,
  payload      jsonb not null,
  processed_at timestamptz,
  error        text,
  created_at   timestamptz not null default now(),
  unique (provider, external_id)
);
create index webhook_events_unprocessed_idx
  on public.webhook_events(provider, created_at) where processed_at is null;

-- ---------------------------------------------------------------------
-- 5. Authorization helpers (SECURITY DEFINER, locked search_path)
-- ---------------------------------------------------------------------

create or replace function public.is_member(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1 from public.memberships
    where org_id = target_org
      and user_id = auth.uid()
  );
$$;

create or replace function public.has_role_in(
  target_org     uuid,
  required_roles public.member_role[]
) returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1 from public.memberships
    where org_id  = target_org
      and user_id = auth.uid()
      and role    = any(required_roles)
  );
$$;

revoke all on function public.is_member(uuid)                                  from public;
revoke all on function public.has_role_in(uuid, public.member_role[])          from public;
grant  execute on function public.is_member(uuid)                              to authenticated;
grant  execute on function public.has_role_in(uuid, public.member_role[])      to authenticated;

-- ---------------------------------------------------------------------
-- 6. Bootstrap RPC: create_organization
--    Lets an authenticated user create an org AND auto-assigns them
--    as owner.  Required because `organizations` has no INSERT policy
--    (prevents tenant squatting via raw SQL).
-- ---------------------------------------------------------------------
create or replace function public.create_organization(
  p_name        text,
  p_slug        text,
  p_vertical    public.org_vertical default 'other',
  p_owner_phone text default null,
  p_owner_email text default null
) returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user uuid := auth.uid();
  v_org_id uuid;
begin
  if v_user is null then
    raise exception 'Not authenticated' using errcode = '42501';
  end if;

  insert into public.organizations(
    name, slug, vertical,
    owner_contact_phone, owner_contact_email
  ) values (
    p_name, p_slug, p_vertical,
    p_owner_phone, p_owner_email
  ) returning id into v_org_id;

  insert into public.memberships(org_id, user_id, role)
  values (v_org_id, v_user, 'owner');

  return v_org_id;
end;
$$;

revoke all on function public.create_organization(text, text, public.org_vertical, text, text)
  from public;
grant  execute on function public.create_organization(text, text, public.org_vertical, text, text)
  to authenticated;

-- ---------------------------------------------------------------------
-- 7. Lifecycle triggers
-- ---------------------------------------------------------------------

-- 7.1 Auto-create profile row when a user signs up
create or replace function public.tg_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles(id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.tg_handle_new_user();

-- 7.2 Update conversation preview/unread on new message
create or replace function public.tg_conversation_on_message()
returns trigger
language plpgsql
as $$
declare
  preview text;
begin
  preview := left(coalesce(new.text, '[' || new.content_type::text || ']'), 140);
  update public.conversations
    set last_message_at      = new.created_at,
        last_message_preview = preview,
        unread_count         = case
                                 when new.direction = 'inbound'
                                 then unread_count + 1
                                 else unread_count
                               end,
        updated_at           = now()
    where id = new.conversation_id;
  return new;
end;
$$;

create trigger messages_update_conversation
  after insert on public.messages
  for each row execute function public.tg_conversation_on_message();

-- 7.3 Enqueue notification on HOT lead
create or replace function public.tg_notify_on_hot_lead()
returns trigger
language plpgsql
as $$
declare
  org public.organizations%rowtype;
begin
  select * into org from public.organizations where id = new.org_id;
  if not org.notify_hot_lead then return new; end if;

  if org.notify_channel in ('whatsapp','both')
     and org.owner_contact_phone is not null then
    insert into public.notifications(
      org_id, event_type, channel, recipient, payload, related_lead_id
    ) values (
      new.org_id, 'hot_lead_captured', 'whatsapp',
      org.owner_contact_phone,
      jsonb_build_object(
        'lead_id', new.id,
        'intent',  new.intent,
        'contact_id', new.contact_id,
        'source',  new.source
      ),
      new.id
    );
  end if;

  if org.notify_channel in ('email','both')
     and org.owner_contact_email is not null then
    insert into public.notifications(
      org_id, event_type, channel, recipient, payload, related_lead_id
    ) values (
      new.org_id, 'hot_lead_captured', 'email',
      org.owner_contact_email,
      jsonb_build_object(
        'lead_id', new.id,
        'intent',  new.intent,
        'contact_id', new.contact_id,
        'source',  new.source
      ),
      new.id
    );
  end if;

  return new;
end;
$$;

create trigger leads_notify_hot_insert
  after insert on public.leads
  for each row
  when (new.temperature = 'hot')
  execute function public.tg_notify_on_hot_lead();

create trigger leads_notify_hot_update
  after update of temperature on public.leads
  for each row
  when (new.temperature = 'hot' and old.temperature is distinct from 'hot')
  execute function public.tg_notify_on_hot_lead();

-- 7.4 Enqueue notification on appointment booked/cancelled
create or replace function public.tg_notify_on_appointment_change()
returns trigger
language plpgsql
as $$
declare
  org public.organizations%rowtype;
  evt public.notification_event;
begin
  select * into org from public.organizations where id = new.org_id;
  if not org.notify_appointments then return new; end if;

  if TG_OP = 'INSERT' and new.status in ('confirmed','pending') then
    evt := 'appointment_booked';
  elsif TG_OP = 'UPDATE'
        and new.status = 'cancelled'
        and old.status is distinct from 'cancelled' then
    evt := 'appointment_cancelled';
  else
    return new;
  end if;

  if org.notify_channel in ('whatsapp','both')
     and org.owner_contact_phone is not null then
    insert into public.notifications(
      org_id, event_type, channel, recipient, payload, related_appointment_id
    ) values (
      new.org_id, evt, 'whatsapp', org.owner_contact_phone,
      jsonb_build_object(
        'appointment_id', new.id,
        'starts_at',      new.starts_at,
        'ends_at',        new.ends_at,
        'service_id',     new.service_id,
        'contact_id',     new.contact_id,
        'status',         new.status
      ),
      new.id
    );
  end if;

  if org.notify_channel in ('email','both')
     and org.owner_contact_email is not null then
    insert into public.notifications(
      org_id, event_type, channel, recipient, payload, related_appointment_id
    ) values (
      new.org_id, evt, 'email', org.owner_contact_email,
      jsonb_build_object(
        'appointment_id', new.id,
        'starts_at',      new.starts_at,
        'ends_at',        new.ends_at,
        'service_id',     new.service_id,
        'contact_id',     new.contact_id,
        'status',         new.status
      ),
      new.id
    );
  end if;

  return new;
end;
$$;

create trigger appointments_notify_insert
  after insert on public.appointments
  for each row execute function public.tg_notify_on_appointment_change();

create trigger appointments_notify_update
  after update of status on public.appointments
  for each row execute function public.tg_notify_on_appointment_change();

-- ---------------------------------------------------------------------
-- 8. Row Level Security — enable + force
-- ---------------------------------------------------------------------
alter table public.organizations             enable row level security;
alter table public.profiles                  enable row level security;
alter table public.memberships               enable row level security;
alter table public.channels                  enable row level security;
alter table public.services                  enable row level security;
alter table public.contacts                  enable row level security;
alter table public.conversations             enable row level security;
alter table public.messages                  enable row level security;
alter table public.leads                     enable row level security;
alter table public.appointments              enable row level security;
alter table public.bot_configs               enable row level security;
alter table public.notifications             enable row level security;
alter table public.notification_preferences  enable row level security;
alter table public.audit_log                 enable row level security;
alter table public.webhook_events            enable row level security;

alter table public.organizations             force row level security;
alter table public.profiles                  force row level security;
alter table public.memberships               force row level security;
alter table public.channels                  force row level security;
alter table public.services                  force row level security;
alter table public.contacts                  force row level security;
alter table public.conversations             force row level security;
alter table public.messages                  force row level security;
alter table public.leads                     force row level security;
alter table public.appointments              force row level security;
alter table public.bot_configs               force row level security;
alter table public.notifications             force row level security;
alter table public.notification_preferences  force row level security;
alter table public.audit_log                 force row level security;
alter table public.webhook_events            force row level security;

-- ---------------------------------------------------------------------
-- 9. Policies
--    Golden rule: everything is org-scoped.  Bots/webhooks use
--    service_role (bypasses RLS).  No public access anywhere.
-- ---------------------------------------------------------------------

-- 9.1 organizations
create policy org_select_member on public.organizations
  for select to authenticated
  using (public.is_member(id));

create policy org_update_admin on public.organizations
  for update to authenticated
  using      (public.has_role_in(id, array['owner','admin']::public.member_role[]))
  with check (public.has_role_in(id, array['owner','admin']::public.member_role[]));
-- INSERT is handled exclusively by public.create_organization().
-- DELETE is intentionally forbidden at this layer (service_role only).

-- 9.2 profiles
create policy profile_self_select on public.profiles
  for select to authenticated using (id = auth.uid());

create policy profile_same_org_select on public.profiles
  for select to authenticated
  using (
    exists (
      select 1
      from public.memberships m1
      join public.memberships m2 on m1.org_id = m2.org_id
      where m1.user_id = auth.uid()
        and m2.user_id = profiles.id
    )
  );

create policy profile_self_update on public.profiles
  for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- 9.3 memberships
create policy membership_select_self_or_member on public.memberships
  for select to authenticated
  using (user_id = auth.uid() or public.is_member(org_id));

create policy membership_manage_admin on public.memberships
  for all to authenticated
  using      (public.has_role_in(org_id, array['owner','admin']::public.member_role[]))
  with check (public.has_role_in(org_id, array['owner','admin']::public.member_role[]));

-- 9.4 channels
create policy channel_select on public.channels
  for select to authenticated using (public.is_member(org_id));

create policy channel_manage_admin on public.channels
  for all to authenticated
  using      (public.has_role_in(org_id, array['owner','admin']::public.member_role[]))
  with check (public.has_role_in(org_id, array['owner','admin']::public.member_role[]));

-- 9.5 services
create policy service_select on public.services
  for select to authenticated using (public.is_member(org_id));

create policy service_manage_admin on public.services
  for all to authenticated
  using      (public.has_role_in(org_id, array['owner','admin']::public.member_role[]))
  with check (public.has_role_in(org_id, array['owner','admin']::public.member_role[]));

-- 9.6 contacts
create policy contact_select on public.contacts
  for select to authenticated using (public.is_member(org_id));

create policy contact_manage_agent on public.contacts
  for all to authenticated
  using      (public.has_role_in(org_id, array['owner','admin','agent']::public.member_role[]))
  with check (public.has_role_in(org_id, array['owner','admin','agent']::public.member_role[]));

-- 9.7 conversations
create policy conversation_select on public.conversations
  for select to authenticated using (public.is_member(org_id));

create policy conversation_manage_agent on public.conversations
  for all to authenticated
  using      (public.has_role_in(org_id, array['owner','admin','agent']::public.member_role[]))
  with check (public.has_role_in(org_id, array['owner','admin','agent']::public.member_role[]));

-- 9.8 messages
create policy message_select on public.messages
  for select to authenticated using (public.is_member(org_id));

-- Humans can only insert agent/system messages; bot/contact go via service_role.
create policy message_insert_agent on public.messages
  for insert to authenticated
  with check (
    public.has_role_in(org_id, array['owner','admin','agent']::public.member_role[])
    and sender in ('agent','system')
  );

-- 9.9 leads
create policy lead_select on public.leads
  for select to authenticated using (public.is_member(org_id));

create policy lead_manage_agent on public.leads
  for all to authenticated
  using      (public.has_role_in(org_id, array['owner','admin','agent']::public.member_role[]))
  with check (public.has_role_in(org_id, array['owner','admin','agent']::public.member_role[]));

-- 9.10 appointments
create policy appointment_select on public.appointments
  for select to authenticated using (public.is_member(org_id));

create policy appointment_manage_agent on public.appointments
  for all to authenticated
  using      (public.has_role_in(org_id, array['owner','admin','agent']::public.member_role[]))
  with check (public.has_role_in(org_id, array['owner','admin','agent']::public.member_role[]));

-- 9.11 bot_configs
create policy bot_config_select on public.bot_configs
  for select to authenticated using (public.is_member(org_id));

create policy bot_config_manage_admin on public.bot_configs
  for all to authenticated
  using      (public.has_role_in(org_id, array['owner','admin']::public.member_role[]))
  with check (public.has_role_in(org_id, array['owner','admin']::public.member_role[]));

-- 9.12 notifications (read-only for members; writes via service_role/trigger)
create policy notification_select on public.notifications
  for select to authenticated using (public.is_member(org_id));

-- 9.13 notification_preferences
create policy notif_pref_select_self on public.notification_preferences
  for select to authenticated
  using (user_id = auth.uid() and public.is_member(org_id));

create policy notif_pref_write_self on public.notification_preferences
  for all to authenticated
  using      (user_id = auth.uid() and public.is_member(org_id))
  with check (user_id = auth.uid() and public.is_member(org_id));

-- 9.14 audit_log (read-only for admins)
create policy audit_read_admin on public.audit_log
  for select to authenticated
  using (
    org_id is not null
    and public.has_role_in(org_id, array['owner','admin']::public.member_role[])
  );

-- 9.15 webhook_events — NO policies (service_role only).

-- ---------------------------------------------------------------------
-- 10. Grants — least privilege defaults
-- ---------------------------------------------------------------------
revoke all on all tables    in schema public from public;
revoke all on all sequences in schema public from public;
revoke all on all functions in schema public from public;

grant usage on schema public to authenticated, anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select                    on all sequences in schema public to authenticated;

-- anon gets nothing by default.  Any public-facing surface will be
-- exposed through explicit SECURITY DEFINER RPCs later.

alter default privileges in schema public
  grant select, insert, update, delete on tables    to authenticated;
alter default privileges in schema public
  grant usage, select                  on sequences to authenticated;

commit;

-- =====================================================================
-- END OF MIGRATION
-- Next step: run `supabase gen types typescript --linked > src/lib/database.types.ts`
-- to replace the hand-written types committed in this same PR.
-- =====================================================================
