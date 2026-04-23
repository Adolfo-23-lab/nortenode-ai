# NorteNode — Brain Handoff
_Documento vivo. Última actualización: 2026-04-22._

## Qué es este documento

Contexto + criterios para que un Claude actuando como **planning layer**
(típicamente en claude.ai) pueda retomar la dirección del proyecto sin
leer toda la conversación histórica. Complementa — no reemplaza — los
handoffs por sesión de Claude Code (`handoff-YYYY-MM-DD.md`), que
cubren "qué commits se hicieron" en vez de "cómo pensamos".

Actualizar al cierre de cada tanda grande (B.4 cierre, B.5 cierre, etc.)
o cuando se tome una decisión estratégica que otro Claude no podría
reconstruir de los commits solos.

---

## Quién trabaja en este proyecto

**Adolfo** (owner, desarrollador, operador). Decide dirección, escribe
código solo cuando es necesario ejecutar algo en su máquina
(migraciones SQL, tests E2E, validación en iPhone real).

**Planning Claude** (en claude.ai, "el cerebro"). Lee reportes de
Claude Code, decide estrategia, redacta briefs listos para pegar,
mantiene coherencia narrativa entre tandas. No ejecuta código. No
tiene acceso al repo.

**Claude Code** (en Antigravity IDE o terminal). Ejecuta todo: edita
archivos, corre tests, hace commits, consulta Supabase CLI. Trabaja
con briefs recibidos vía copy-paste del owner. Cada sesión empieza
leyendo el handoff más reciente del repo.

**Flujo:** Planning Claude escribe brief → Adolfo lo pega a Claude Code
→ Claude Code ejecuta y reporta → Adolfo pega el reporte a Planning
Claude → Planning Claude escribe siguiente brief.

---

## Qué es NorteNode

Agencia B2B portuguesa (Vila Nova de Gaia, Porto) que opera agentes
de IA conversacionales (WhatsApp + widget web) para negocios locales
— barberías, estéticas, gimnasios, servicios de emergencia. El
producto técnico: bot que entiende contexto, cualifica, agenda, y
escala al dueño con el histórico si el caso es complejo.

**Posicionamiento: agencia, no SaaS.** "Lo operamos por ti", no
"regístrate y configúralo tú". Sin trial, sin signup público, sin
pricing page. CTAs de marketing apuntan a `/contactos` o `/demo`,
nunca a `/login`.

Locales soportados: pt-PT (primario, autoritativo), es-ES, en-US.

---

## Stack técnico (no cambiar sin migración explícita)

- Next.js 16.2.1 con Turbopack (App Router)
- Tailwind v4 con `@theme` en globals.css (no tailwind.config.js)
- TypeScript estricto
- Supabase (Postgres + Edge Functions + RLS FORCE en 15 tablas)
- GSAP + @gsap/react + ScrollTrigger (skills oficiales en
  `.claude/skills/gsap/`)
- Lenis smooth-scroll (bridge con gsap.ticker)
- next/font: Geist Sans + Geist Mono + Instrument Serif italic
- Groq (LLM para bots via Edge Functions)
- Resend (emails)
- Meta Cloud API (WhatsApp)

Despliegue: Vercel. Instancia Supabase: `kcfofziypxdulviefsqz.supabase.co`
(West EU Ireland). Org agency slug: `nortenode-ai`.

---

## Filosofía dura — nunca negociar

1. **Sin cabos sueltos.** Ningún "lo arreglamos después". Cualquier
   deuda se documenta explícitamente en AUDIT.md §4.e con criterio
   de cierre. El código no debe contener TODOs, código muerto, ni
   patrones inconsistentes "por ahora".

2. **Todo tiene propósito.** Cada tabla, columna, componente,
   endpoint, import. Si algo no tiene consumidor, se elimina.
   "Speculative flexibility" no es virtud.

3. **Backend y frontend se complementan.** El shape del dictionary
   se alinea al shape del RPC. El tipo TypeScript refleja la
   signature SQL. Los error codes de la action existen en el
   dictionary. Sin divergencias silenciosas.

4. **Seguridad no es opcional.** Multi-tenant con RLS FORCE. Service
   role solo server-side. Rutas públicas no hacen queries directas
   a tablas — vía RPCs SECURITY DEFINER con search_path locked.
   `SUPABASE_SERVICE_ROLE_KEY` jamás llega al bundle cliente.

5. **No somos generadores de web-genérica-IA.** La referencia visual
   es editorial/agencia (Pentagram, Stripe, Linear, Vercel). NO
   bento cards, NO gradientes decorativos, NO emojis, NO badges
   floating, NO "hero centrado con twin CTAs".

---

## Invariantes escritos en el repo

No duplicar aquí. Viven en:

- **`AGENTS.md`** — Next 16 gotchas, performance budget (LCP ≤1.5s,
  CLS <0.05, INP <200ms, first-load JS ≤180KB), media policy (mp4
  gitignored + CDN, imágenes next/image AVIF), motion policy (no
  scroll-hijack, entrance ≤600ms, parallax ≤10% yPercent,
  reduced-motion siempre), copy rules (sin superlativos, sin
  emojis, sin "features", sin "signup"), multi-tenant frontend
  rules (zero queries directas desde rutas públicas).

- **`docs/design-refs/DESIGN.md` §7** — Opacity-Split Rule.
  Prohibido `text-white/NN`, `border-white/NN`, `bg-white/NN`,
  `ring-white/NN`, `divide-white/NN`, `outline-white/NN`,
  `shadow-*white/NN`, `placeholder-white/NN`, `fill-white/NN`,
  `stroke-white/NN`, `from/via/to-white/NN`. Excepción única:
  overlays sobre media (gradientes) + contenido dentro de UI-de-mock
  + skeletons tokenizados.

- **`.claude/skills/design-system-cinematic-authority.md`** — Stance
  visual. Dark/editorial/quiet-luxury/asymmetric/full-bleed/zero-
  border. Copy ban a superlativos. Eyebrows en mono tracking-[0.22em].
  Display headlines clamp-fluid. Layout floor py-32 md:py-44.
  Proof-by-number, not proof-by-adjective.

- **`.claude/skills/gsap/`** — Skills oficiales GreenSock (MIT).
  Patrones canónicos para useGSAP, ScrollTrigger, matchMedia,
  performance. Consultar antes de escribir GSAP nuevo.

---

## Decisiones estratégicas tomadas

### Multi-tenant
- `organizations.id` es raíz de tenant. `org_id` denormalizado en
  todas las tablas de negocio.
- RLS FORCE en las 15 tablas. Service role bypass para Edge
  Functions + bot. Humanos via `public.is_member(org_id)` +
  `public.has_role_in(org_id, roles[])`.
- Marketing contact form → RPC `public.submit_agency_lead`
  SECURITY DEFINER (único input path sanitizado).
- Widget web → RPC `public.ingest_widget_message` SECURITY DEFINER
  con `widgetToken` como tenant resolver.

### Diseño
- **Cinematic Authority** es el norte. Editorial, no SaaS.
- **Zero-border**: separación por background shift + hairlines ghost
  (7-15% opacity tokenizadas). NUNCA `border-1 solid`.
- **Tokens tonales**: pirámide `--color-ink-text-*` (strong /primary
  /secondary/muted/soft/faint) + hairline + ghost-border + glass-
  surface + skeleton. Todo tono viene de token, nunca de
  `text-white/NN` ad-hoc.
- **Motion**: GSAP + matchMedia. Reveal con fade + y + blur.
  Parallax scrub ≤10%. Reduced-motion via `gsap.matchMedia` con
  `gsap.set(..., { clearProps: "all" })` para land state.

### Producto / IA
- `/demo` muestra InteractiveDemo (chat vivo real contra Groq).
  NO hay form "pide demo" + demo en la misma página — separación
  semántica: `/demo` = prueba, `/contactos` = háblanos.
- FloatingSalesBot (chat flotante de ventas) eliminado en B.4.2
  por ser redundante con InteractiveDemo en la misma ruta.
- El saludo/tono del bot debe respetar copy rules — sin emojis,
  sin superlativos, sin "asistente virtual inteligente".

### Copy / i18n
- Todo texto user-facing vive en `src/i18n/dictionary.ts`. Cero
  hardcode en componentes.
- Error codes de server actions devueltos como union types
  tagueados (ej: `SubmitLeadErrorCode`). Dictionary tiene
  `error_by_code` granular. Cliente mapea code → string via
  dictionary.
- Interface `Dictionary` tipada en TS — compile error si un locale
  drifta.

---

## Decisiones pendientes (require input del owner)

### `/contactos` polish visual (B.4.3c.4)
Owner reportó que el hero no convence. Diagnóstico probable:
Instrument Serif italic demasiado dominante + valores directory
demasiado grandes + hero con mucho aire vacío. Referencias
propuestas: Stripe y Vercel.

Preguntas abiertas:
1. ¿Sans dominante + serif solo como acento puntual, o mantener
   italic serif en display?
2. Hero con mucho espacio vacío — ¿añadir metadata card (equipo +
   ubicación + horario) o un claim complementario?
3. Botón CTA — estilo Stripe (pill signal-blue) o Vercel
   (borderless glass)?

Hasta que owner responda, no se arranca polish.

### `t.demo` extension (B.4.4 prep)
Dictionary actual solo tiene `t.demo.stage.narrative_title/body`
(un bloque) y NO tiene `cta_*`. Para el rework de `/demo`:
- Opción A: extender con `how_steps: SolucoesStep[]` + `cta_*`.
  Diseño narrativo propio.
- Opción B: reutilizar `t.solucoes.common.cta_*`. Menos trabajo,
  menos diferenciación.

Mi voto: Opción A (separación semántica). Esperando confirmación.

---

## Deuda tracked (en AUDIT.md §4.e)

- **Meta WhatsApp sandbox**: app en development mode, solo números
  allowlisted reciben. Owner debe añadir `+351937809995` al test
  recipients o enviar app a production review.
- **Migration drift**: 3 migrations en remote sin archivo local
  (20260418224411, 20260418230759, 20260419125011). Cerrar
  pre-B.7 via `supabase db pull` + commit.
- **Metadata suffix duplication**: todas las pages renderizan
  `<title>` con sufijo "· NorteNode" duplicado. Fix en B.7.
- **Locale mismatch**: metadata lee hardcoded pt-PT, UI cliente
  renderiza es-ES por default del I18nProvider. Fix en B.7 junto
  con `<html lang>`.
- **PNG logo 60KB**: `public/nortenode_star_icon.png` consumido
  por Navbar + Footer. Candidato a SVG inline tokenizado. Baja
  prioridad.
- **Zero tests**: ni unit ni integration ni E2E automatizado.
  Sembrar test suite mínimo post-B.7.

---

## Roadmap vigente

Orden operativo:
- **B.4.3d.2** — GSAP sweep refactor (en curso al momento del
  handoff).
- **B.4.3d.3** — FAQ `gsap.context()` fix.
- **B.4.3c.4** — `/contactos` polish (bloqueado por input owner).
- **B.4.4** — `/demo` rework completo.
- **B.5** — `/quem-somos` rework (editorial, sin rounded portrait,
  con timeline section opcional).
- **B.6** — Motion pass final sobre rutas no-aún-reworked.
- **B.7** — i18n sweep + fix `<html lang>` + metadata suffix
  duplication + locale mismatch + migration drift reconcile.
- **B.8 (proyectado)** — Performance audit formal contra budget
  escrito en AGENTS.md.

Fases futuras (post-B.8):
- Test suite mínimo (unit + E2E sobre actions críticas).
- Asset polish (logo SVG inline, mp4 a CDN, optimize imágenes).
- DevOps pre-production (Meta Cloud API production review, Resend
  domain custom, SMTP fallback, monitoring).

---

## Patrones de trabajo que funcionan

**Briefs granulares**. Un commit = un cambio narrativo coherente.
Brief incluye pasos numerados, criterios de aceptación, comandos
de verificación, mensaje de commit listo para pegar.

**Build-gate entre pasos**. Cada paso termina con `npm run build`
limpio o STOP y reportar.

**Selective git add**. Nunca `git add -A`. Siempre archivos
nombrados explícitamente + verificar con `git status` antes del
commit.

**STOP proactivo**. Si Claude Code detecta algo fuera de scope,
consumidor inesperado, o ambigüedad real, STOP y reporta. No
improvisar.

**Aditivo primero, destructivo después**. Añadir keys/componentes
nuevos primero. Eliminar old code solo cuando ya no tiene
consumidores.

**Handoffs proactivos antes de auto-compact**. Cuando una sesión
de Claude Code llega a ~66% de contexto, generar `handoff-<fecha>.md`
y cerrar sesión limpia. Evita que auto-compact rompa refactors
a medio ejecutar.

**Verificar RPC signature antes de tocar server actions**. Supabase
es source of truth para DB schema. TypeScript se deriva via
`supabase gen types typescript --linked`.

---

## Gotchas aprendidos (para no repetir)

1. **Windows + Supabase gen types**: redirección `>` genera UTF-16
   LE. Usar PowerShell .NET `WriteAllText` con `UTF8Encoding($false)`.
   `iconv` corrompe. `Out-File -Encoding utf8NoBOM` no existe en
   PS 5.1.

2. **tsx + top-level await**: no soportado con CJS output. Envolver
   en `async function main() { ... } main().catch(...)`.

3. **Postgres function overloading**: `CREATE OR REPLACE FUNCTION`
   NO reemplaza si la signature cambia. Deja ambas versiones. Drop
   explícito de la vieja antes de crear la nueva.

4. **Supabase CLI type generator**: infiere nullable solo si param
   tiene `DEFAULT NULL` explícito. Si el body maneja null pero la
   signature no lo declara, tipos quedan divergentes.

5. **Tailwind v4 font variables**: `font-[var(--font-display)]`
   puede no resolver. Verificar con DevTools Elements que
   `font-family` computed sea la esperada, no fallback sans.

6. **Next 16 Turbopack**: no imprime first-load JS por ruta en
   stdout del build. Usar `--profile` o parsear
   `.next/build-manifest.json`.

7. **Meta sandbox + WhatsApp**: #131030 "Recipient phone not in
   allowed list" es config, no bug.

8. **Route-change ScrollTrigger cleanup**: Next App Router unmonta
   components → useGSAP auto-cleanup se dispara → no se necesita
   `ScrollTrigger.getAll().kill()` manual en route change. Validado
   por patrón, no por smoke test.

---

## Cómo arrancar conmigo (Planning Claude) en sesión nueva

1. Abres nuevo chat en claude.ai con Claude 4.7.
2. Adjuntas este archivo (`brain-handoff.md`) + el último
   `handoff-YYYY-MM-DD.md` más reciente del repo.
3. Primer mensaje:

> Soy Adolfo, proyecto NorteNode. Adjunto brain-handoff.md (mi
> visión + decisiones + filosofía) y handoff-YYYY-MM-DD.md (estado
> técnico del repo). Léelos completos y confírmame que entiendes
> el estado. Actúas como planning layer para Claude Code que vive
> en Antigravity/terminal. Yo pego los briefs que escribes, él
> ejecuta, yo te traigo los reportes.

Con eso estás al día en 1-2 turnos.

Si algo en el brain-handoff se contradice con un reporte reciente
de Claude Code o un commit en main — el repo manda. El brain-handoff
describe intención y criterios, pero el estado real vive en git.

---

## Cuándo actualizar este documento

- Al cerrar una tanda grande (B.4 completo, B.5 completo, etc.).
- Cuando se toma una decisión estratégica no trivial (ej: "kill
  FloatingSalesBot porque duplicaba con InteractiveDemo").
- Cuando se descubre un gotcha técnico que vale la pena grabar.
- Cuando cambia el roadmap (se añade fase, se reordena).

Commit style: `docs(handoff): update brain-handoff — <razón breve>`.

---

_Fin del documento._
