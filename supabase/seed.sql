-- =====================================================================
-- NorteNode AI — Phase 2 seed data (2026-04-17)
--
-- Idempotent.  Run after migrations 001 + 002 are applied.
-- Usage:
--   Supabase Dashboard ? SQL Editor ? paste this file ? Run
--   or: supabase db reset (CLI) — will also re-apply migrations.
--
-- Creates:
--   * 5 organizations (NorteNode AI agency + 4 fictitious tenants)
--   * One web_widget channel per org (tokens printed at bottom)
--   * Representative services per vertical
--   * Tenant-scoped bot_configs with PT-PT persona prompts
--   * A small demo conversation inside the NorteNode Demo org so the
--     upcoming Dashboard renders against non-empty data.
--
-- Demo flag: the four tenants below are explicitly tagged
-- `metadata->>'demo' = 'true'` so the UI can label them as
-- "Demo Interactiva" per skill: anti-generic-design (trust/transparency).
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- 1. Organizations
-- ---------------------------------------------------------------------
insert into public.organizations (
  id, slug, name, vertical, plan, plan_status,
  locale, timezone,
  owner_contact_email, owner_contact_phone,
  notify_channel,
  metadata
) values
  -- NorteNode AI (the agency itself — owns the marketing-site leads)
  (
    '00000000-0000-4000-a000-000000000001',
    'nortenode-ai',
    'NorteNode',
    'other',
    'agency',
    'active',
    'pt-PT',
    'Europe/Lisbon',
    'adolfo@nortenode.com',
    '+351910000000',   -- REPLACE with Adolfo's real WhatsApp
    'both',
    jsonb_build_object('demo', false, 'role', 'house-agency')
  ),
  -- Barbearia Silva — barbershop / Pro plan
  (
    '00000000-0000-4000-a000-000000000002',
    'barbearia-silva',
    'Barbearia Silva',
    'barbershop',
    'pro',
    'active',
    'pt-PT',
    'Europe/Lisbon',
    'dono@barbeariasilva.demo',
    '+351911111111',
    'both',
    jsonb_build_object('demo', true, 'city', 'Porto')
  ),
  -- Tinta Nova Tattoo — tattoo studio / Pro plan
  (
    '00000000-0000-4000-a000-000000000003',
    'tinta-nova-tattoo',
    'Tinta Nova Tattoo',
    'tattoo_studio',
    'pro',
    'active',
    'pt-PT',
    'Europe/Lisbon',
    'studio@tintanova.demo',
    '+351922222222',
    'both',
    jsonb_build_object('demo', true, 'city', 'Gaia')
  ),
  -- Serralharia do Norte 24h — emergency service / Pro plan
  (
    '00000000-0000-4000-a000-000000000004',
    'serralharia-do-norte',
    'Serralharia do Norte 24h',
    'emergency_service',
    'pro',
    'active',
    'pt-PT',
    'Europe/Lisbon',
    'urgencias@serralhariadonorte.demo',
    '+351933333333',
    'both',
    jsonb_build_object('demo', true, 'city', 'Matosinhos')
  ),
  -- Forma Ginásio — gym / Starter plan
  (
    '00000000-0000-4000-a000-000000000005',
    'forma-ginasio',
    'Forma Ginásio',
    'gym',
    'starter',
    'active',
    'pt-PT',
    'Europe/Lisbon',
    'geral@formaginasio.demo',
    '+351944444444',
    'email',
    jsonb_build_object('demo', true, 'city', 'Vila Nova de Gaia')
  )
on conflict (id) do update set
  name                = excluded.name,
  vertical            = excluded.vertical,
  plan                = excluded.plan,
  plan_status         = excluded.plan_status,
  owner_contact_email = excluded.owner_contact_email,
  owner_contact_phone = excluded.owner_contact_phone,
  notify_channel      = excluded.notify_channel,
  metadata            = excluded.metadata,
  updated_at          = now();

-- ---------------------------------------------------------------------
-- 2. Channels (one web_widget per org)
--    external_id = widget token (public, opaque, bound to the tenant).
--    The marketing site and tenant micro-sites embed this token in
--    the widget snippet so the server action can resolve org_id.
--
--    PROD recommendation: rotate these via `supabase secrets` and the
--    admin console before going live.
-- ---------------------------------------------------------------------
insert into public.channels (
  id, org_id, type, external_id, display_name, status, config
) values
  (
    '10000000-0000-4000-a000-000000000001',
    '00000000-0000-4000-a000-000000000001',
    'web_widget',
    'widget_nortenode_live_01',
    'Widget NorteNode — Homepage',
    'active',
    jsonb_build_object(
      'origin_allowlist', jsonb_build_array(
        'https://nortenode.com',
        'http://localhost:3000'
      ),
      'brand_color', '#0a0a0a'
    )
  ),
  (
    '10000000-0000-4000-a000-000000000002',
    '00000000-0000-4000-a000-000000000002',
    'web_widget',
    'widget_barbearia_silva_01',
    'Widget — Barbearia Silva',
    'active',
    jsonb_build_object('origin_allowlist', jsonb_build_array('https://barbeariasilva.demo'))
  ),
  (
    '10000000-0000-4000-a000-000000000003',
    '00000000-0000-4000-a000-000000000003',
    'web_widget',
    'widget_tinta_nova_01',
    'Widget — Tinta Nova Tattoo',
    'active',
    jsonb_build_object('origin_allowlist', jsonb_build_array('https://tintanova.demo'))
  ),
  (
    '10000000-0000-4000-a000-000000000004',
    '00000000-0000-4000-a000-000000000004',
    'web_widget',
    'widget_serralharia_01',
    'Widget — Serralharia do Norte',
    'active',
    jsonb_build_object('origin_allowlist', jsonb_build_array('https://serralhariadonorte.demo'))
  ),
  (
    '10000000-0000-4000-a000-000000000005',
    '00000000-0000-4000-a000-000000000005',
    'web_widget',
    'widget_forma_ginasio_01',
    'Widget — Forma Ginásio',
    'active',
    jsonb_build_object('origin_allowlist', jsonb_build_array('https://formaginasio.demo'))
  )
on conflict (id) do update set
  external_id  = excluded.external_id,
  display_name = excluded.display_name,
  status       = excluded.status,
  config       = excluded.config,
  updated_at   = now();

-- ---------------------------------------------------------------------
-- 3. Services
-- ---------------------------------------------------------------------
insert into public.services (
  id, org_id, name, description, duration_minutes, price_cents, currency, active
) values
  -- Barbearia Silva
  ('20000000-0000-4000-a000-000000000001', '00000000-0000-4000-a000-000000000002',
    'Corte Clássico', 'Corte de cabelo tradicional com máquina e tesoura',
    30, 1500, 'EUR', true),
  ('20000000-0000-4000-a000-000000000002', '00000000-0000-4000-a000-000000000002',
    'Barba + Toalha Quente', 'Barba esculpida com toalha quente e aftershave premium',
    20, 1000, 'EUR', true),
  ('20000000-0000-4000-a000-000000000003', '00000000-0000-4000-a000-000000000002',
    'Degradê + Desenho', 'Degradê navalhado com desenho personalizado',
    45, 2500, 'EUR', true),

  -- Tinta Nova Tattoo
  ('20000000-0000-4000-a000-000000000011', '00000000-0000-4000-a000-000000000003',
    'Consulta + Desenho Inicial', 'Reunião de 1h com o artista para desenhar a ideia',
    60, 0, 'EUR', true),
  ('20000000-0000-4000-a000-000000000012', '00000000-0000-4000-a000-000000000003',
    'Tatuagem Pequena', 'Peças até 10cm, mono-sessão',
    90, 8000, 'EUR', true),
  ('20000000-0000-4000-a000-000000000013', '00000000-0000-4000-a000-000000000003',
    'Sessão Grande (4h)', 'Peças médias/grandes — valor por sessão',
    240, 35000, 'EUR', true),

  -- Serralharia do Norte 24h
  ('20000000-0000-4000-a000-000000000021', '00000000-0000-4000-a000-000000000004',
    'Abertura de Porta', 'Abertura sem danos (diurno)',
    60, 8000, 'EUR', true),
  ('20000000-0000-4000-a000-000000000022', '00000000-0000-4000-a000-000000000004',
    'Mudança de Canhão', 'Substituição de canhão europeu padrão',
    90, 12000, 'EUR', true),
  ('20000000-0000-4000-a000-000000000023', '00000000-0000-4000-a000-000000000004',
    'Urgência Noturna (22h-06h)', 'Suplemento por deslocação fora de horas',
    60, 15000, 'EUR', true),

  -- Forma Ginásio
  ('20000000-0000-4000-a000-000000000031', '00000000-0000-4000-a000-000000000005',
    'Aula Experimental', 'Grupo, 60 min, sem compromisso',
    60, 0, 'EUR', true),
  ('20000000-0000-4000-a000-000000000032', '00000000-0000-4000-a000-000000000005',
    'Avaliação Física', 'Bioimpedância + plano inicial',
    45, 0, 'EUR', true)
on conflict (id) do update set
  name             = excluded.name,
  description      = excluded.description,
  duration_minutes = excluded.duration_minutes,
  price_cents      = excluded.price_cents,
  currency         = excluded.currency,
  active           = excluded.active,
  updated_at       = now();

-- ---------------------------------------------------------------------
-- 4. Bot configs — PT-PT persona per vertical
-- ---------------------------------------------------------------------
insert into public.bot_configs (
  id, org_id, channel_id,
  persona_name, system_prompt, model, temperature, max_tokens, tools, enabled
) values
  -- NorteNode AI agency bot (sales)
  (
    '30000000-0000-4000-a000-000000000001',
    '00000000-0000-4000-a000-000000000001',
    null,  -- default for org
    'Assistente NorteNode',
    'Eres el asistente virtual oficial de NorteNode. Hablas con dueños de pequeños negocios (barberías, tatuadores, cerrajeros, gimnasios, clínicas pequeñas) que pierden clientes por no responder a tiempo. Habla en el idioma del cliente (español, português ou english). '
    'REGRAS DE OURO:'
    '1. Nunca inventes funcionalidades, integrações ou preços. Somos rigorosos. '
    '2. Os nossos planos são: Starter €49/mês (widget web + bot básico), Pro €97/mês (inclui WhatsApp Meta API 24/7), Agency sob consulta (integrações avançadas). '
    '3. Se o cliente pedir algo muito técnico ou fora dos planos, diz com naturalidade que o Diretor Adolfo vai analisar o caso e pede o WhatsApp para contacto. '
    '4. Sê conciso (máximo 2-3 frases) e termina com uma pergunta amigável.',
    'llama-3.3-70b-versatile', 0.3, 600,
    '[]'::jsonb, true
  ),

  -- Barbearia Silva
  (
    '30000000-0000-4000-a000-000000000002',
    '00000000-0000-4000-a000-000000000002',
    null,
    'Rececionista Silva',
    'És a rececionista virtual da Barbearia Silva, no Porto. '
    'Serviços: Corte Clássico (30min, 15€), Barba+Toalha Quente (20min, 10€), Degradê+Desenho (45min, 25€). '
    'Horário: seg-sex 9h-19h, sáb 10h-14h, domingo encerrado. '
    'REGRAS: '
    '1. Pergunta sempre o serviço pretendido antes de oferecer horários. '
    '2. Se o cliente quiser agendar, pede nome e número e confirma data+hora numa frase. '
    '3. Nunca inventes serviços ou preços. '
    '4. Máximo 2 frases. Termina com pergunta.',
    'llama-3.3-70b-versatile', 0.3, 500,
    jsonb_build_array('book_appointment', 'qualify_lead'),
    true
  ),

  -- Tinta Nova Tattoo
  (
    '30000000-0000-4000-a000-000000000003',
    '00000000-0000-4000-a000-000000000003',
    null,
    'Assistente do Studio',
    'És a assistente virtual do Tinta Nova Tattoo em Gaia. Os artistas são perfeccionistas; a tua função é pré-qualificar ideias antes de marcar consulta. '
    'Serviços: Consulta+Desenho (1h, gratuito), Tatuagem Pequena (90min, desde 80€), Sessão Grande (4h, desde 350€). '
    'Em cada conversa pede: (a) ideia/referência, (b) tamanho aproximado em cm, (c) zona do corpo, (d) primeira tatuagem? '
    'Nunca prometas preço final — depende de complexidade. Máximo 2-3 frases. Termina com pergunta.',
    'llama-3.3-70b-versatile', 0.4, 600,
    jsonb_build_array('qualify_lead'),
    true
  ),

  -- Serralharia do Norte 24h
  (
    '30000000-0000-4000-a000-000000000004',
    '00000000-0000-4000-a000-000000000004',
    null,
    'Atendimento Urgente',
    'És o atendedor 24h da Serralharia do Norte. As pessoas contactam em pânico — sê calmo, direto e empático. '
    'Em <3 frases averigua: (a) é urgência agora ou agendamento? (b) morada em Matosinhos/Porto? (c) porta partida, perdida, ou canhão avariado? '
    'Preços indicativos: Abertura 80€, Canhão 120€, Suplemento noturno (22h-06h) +150€. Confirma sempre pelo telefone antes de deslocação. '
    'Se for urgência real, diz que um técnico contacta em menos de 15 minutos.',
    'llama-3.3-70b-versatile', 0.2, 500,
    jsonb_build_array('qualify_lead', 'escalate_to_human'),
    true
  ),

  -- Forma Ginásio
  (
    '30000000-0000-4000-a000-000000000005',
    '00000000-0000-4000-a000-000000000005',
    null,
    'Recepção Forma',
    'És a recepção virtual do Forma Ginásio em Gaia. O teu objetivo é converter visitantes em aulas experimentais gratuitas. '
    'Oferece sempre primeiro: Aula Experimental (60min, grátis) OU Avaliação Física (45min, grátis). '
    'Pede nome, contacto e objetivo (perder peso, ganhar massa, reabilitação, bem-estar). '
    'Horário: seg-sex 7h-22h, sáb 9h-14h. Máximo 2 frases. Termina com pergunta.',
    'llama-3.3-70b-versatile', 0.35, 500,
    jsonb_build_array('qualify_lead'),
    true
  )
on conflict (id) do update set
  system_prompt = excluded.system_prompt,
  persona_name  = excluded.persona_name,
  model         = excluded.model,
  temperature   = excluded.temperature,
  max_tokens    = excluded.max_tokens,
  tools         = excluded.tools,
  enabled       = excluded.enabled,
  updated_at    = now();

-- ---------------------------------------------------------------------
-- 5. Minimal demo data inside Barbearia Silva (for Dashboard preview)
-- ---------------------------------------------------------------------
insert into public.contacts (
  id, org_id, phone_e164, full_name, locale, tags, first_seen_at, last_seen_at
) values
  ('40000000-0000-4000-a000-000000000001',
   '00000000-0000-4000-a000-000000000002',
   '+351961234567', 'João Pereira', 'pt-PT',
   array['demo','returning-customer'], now() - interval '2 days', now() - interval '3 hours'),
  ('40000000-0000-4000-a000-000000000002',
   '00000000-0000-4000-a000-000000000002',
   '+351969876543', 'Rita Moreira', 'pt-PT',
   array['demo','first-time'], now() - interval '1 day', now() - interval '30 minutes')
on conflict (id) do update set
  full_name   = excluded.full_name,
  last_seen_at = excluded.last_seen_at,
  updated_at   = now();

insert into public.conversations (
  id, org_id, contact_id, channel_id, status, bot_enabled, last_message_at
) values
  (
    '50000000-0000-4000-a000-000000000001',
    '00000000-0000-4000-a000-000000000002',
    '40000000-0000-4000-a000-000000000001',
    '10000000-0000-4000-a000-000000000002',
    'open', true, now() - interval '3 hours'
  ),
  (
    '50000000-0000-4000-a000-000000000002',
    '00000000-0000-4000-a000-000000000002',
    '40000000-0000-4000-a000-000000000002',
    '10000000-0000-4000-a000-000000000002',
    'open', true, now() - interval '30 minutes'
  )
on conflict (id) do update set
  status          = excluded.status,
  bot_enabled     = excluded.bot_enabled,
  last_message_at = excluded.last_message_at,
  updated_at      = now();

-- Seed messages only if empty (avoid dupes on repeated seeds)
insert into public.messages (
  org_id, conversation_id, direction, sender, content_type, text, status, created_at
)
select * from (values
  ('00000000-0000-4000-a000-000000000002'::uuid,
   '50000000-0000-4000-a000-000000000001'::uuid,
   'inbound'::public.message_direction,  'contact'::public.message_sender, 'text'::public.message_content_type,
   'Olá! Queria marcar um degradê para sábado de manhã.', 'delivered'::public.message_status,
   now() - interval '3 hours 2 minutes'),
  ('00000000-0000-4000-a000-000000000002'::uuid,
   '50000000-0000-4000-a000-000000000001'::uuid,
   'outbound'::public.message_direction, 'bot'::public.message_sender, 'text'::public.message_content_type,
   'Olá João! Para sábado tenho às 10h30 ou 12h00. Qual prefere?', 'sent'::public.message_status,
   now() - interval '3 hours 1 minute'),
  ('00000000-0000-4000-a000-000000000002'::uuid,
   '50000000-0000-4000-a000-000000000001'::uuid,
   'inbound'::public.message_direction,  'contact'::public.message_sender, 'text'::public.message_content_type,
   '10h30 perfeito.', 'delivered'::public.message_status,
   now() - interval '3 hours'),
  ('00000000-0000-4000-a000-000000000002'::uuid,
   '50000000-0000-4000-a000-000000000002'::uuid,
   'inbound'::public.message_direction,  'contact'::public.message_sender, 'text'::public.message_content_type,
   'Boa tarde, é a minha primeira vez. Fazem corte de senhora?', 'delivered'::public.message_status,
   now() - interval '31 minutes')
) as v(org_id, conversation_id, direction, sender, content_type, text, status, created_at)
where not exists (
  select 1 from public.messages
  where conversation_id in (
    '50000000-0000-4000-a000-000000000001'::uuid,
    '50000000-0000-4000-a000-000000000002'::uuid
  )
);

-- Demo lead (warm) + appointment for Barbearia Silva
insert into public.leads (
  id, org_id, contact_id, conversation_id,
  source, intent, temperature, status, qualification
) values
  (
    '60000000-0000-4000-a000-000000000001',
    '00000000-0000-4000-a000-000000000002',
    '40000000-0000-4000-a000-000000000001',
    '50000000-0000-4000-a000-000000000001',
    'web_widget', 'marcar-degrade', 'warm', 'qualified',
    jsonb_build_object('service', 'Degradê + Desenho', 'when', 'sábado 10h30')
  )
on conflict (id) do update set
  status        = excluded.status,
  qualification = excluded.qualification,
  updated_at    = now();

insert into public.appointments (
  id, org_id, contact_id, lead_id, service_id,
  starts_at, ends_at, status, created_by
) values
  (
    '70000000-0000-4000-a000-000000000001',
    '00000000-0000-4000-a000-000000000002',
    '40000000-0000-4000-a000-000000000001',
    '60000000-0000-4000-a000-000000000001',
    '20000000-0000-4000-a000-000000000003',  -- Degradê + Desenho
    (date_trunc('day', now()) + interval '3 days' + interval '10 hours 30 minutes')::timestamptz,
    (date_trunc('day', now()) + interval '3 days' + interval '11 hours 15 minutes')::timestamptz,
    'confirmed', 'bot'
  )
on conflict (id) do update set
  starts_at = excluded.starts_at,
  ends_at   = excluded.ends_at,
  status    = excluded.status,
  updated_at= now();

commit;

-- =====================================================================
-- Post-seed reference (paste into .env.local):
--
--   NORTENODE_AGENCY_ORG_SLUG=nortenode-ai
--   NORTENODE_AGENCY_WIDGET_TOKEN=widget_nortenode_live_01
--   NORTENODE_DEMO_WIDGET_TOKEN=widget_barbearia_silva_01
--
-- To promote yourself to owner of the agency org:
--   1. Sign up normally via the app (once auth flows ship in Fase 5).
--   2. Or run, as service_role:
--        insert into public.memberships (org_id, user_id, role)
--        values (
--          '00000000-0000-4000-a000-000000000001',
--          '<your auth.users.id>',
--          'owner'
--        );
-- =====================================================================
