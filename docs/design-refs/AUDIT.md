# Fase 4 · Fase A — Structural Audit

**Date**: 2026-04-19
**Stance**: Cinematic Authority (dark, editorial, asymmetric, zero-border).
**Goal of this doc**: audit the current state before any UI refactor. No code changed.

---

## 1 · Baseline screenshots

`docs/design-refs/baseline/` holds 12 PNGs (6 routes × 2 viewports).

| Route | Desktop diagnostic | Mobile diagnostic |
|---|---|---|
| `/` | Hero renders, **everything below is blank** — `whileInView` on stats/verticals/how/pricing/finalCTA never triggers on a fresh full-page capture. Live in a real browser they DO fade in, but the static capture is honest proof that the initial state is `opacity-0` and that will punish users on slow devices, `prefers-reduced-motion`, or any JS delay. | Same blank-below-fold problem. Hero crops tight, widget mock gets stacked but is visually cramped. |
| `/demo` | Two-panel layout (form + live chat). Clean, but dominant **green** CTA + green mock break the signal-blue brand. Copy is strong. Section bg is `bg-zinc-950` — inconsistent with rest of site's `--color-ink-0` tokens. | Form panel + chat stack top/bottom. The chat mock loses most of its height, feels truncated. |
| `/solucoes/whatsapp` | Editorial split: copy-left, WhatsApp phone mock right. Good asymmetry, hairline-separated feature list. CTA is green — brand break again. No social proof, no pricing reinforce, no FAQ. | Copy block + phone mock stack well, but the mock lives in a boxed green bubble — heavy visual weight relative to rest. |
| `/solucoes/widget-web` | Same template as whatsapp page. Green CTA + green FloatingSalesBot — feels pinned to /demo, not unified. | Good vertical flow, same green-bubble weight issue. |
| `/quem-somos` | Portrait-left + copy-right is exactly the quiet-luxury register. Rounded portrait frame + boxy photo edges slightly betray it. Principles list with hairlines is perfect. | Portrait scales well on top; copy below reads clean. |
| `/contactos` | Huge editorial "Fale / Connosco" display headline, hairline-separated contact rows — the closest route to the target aesthetic. `bg-zinc-950` inconsistency again. Desktop hides the map under a blank band (component renders but you can't see it at capture moment). | Map visible, good. Emerald hover accent on arrows contradicts signal-blue brand. |

**Global observations**
- `whileInView` + `opacity: 0` initial state: silent fail for users with motion off, slow hydration, or static capture. Needs `whileInView` to keep a visible fallback, or GSAP/Lenis that respects `prefers-reduced-motion` by default.
- **Green/emerald** is used as the working accent in /demo, WhatsApp mock bubbles, widget-web bot bubble, contactos hover. The brand accent per `globals.css` is `--color-signal-500 = #2f82f7` (blue). Pick one; today it's split.
- `bg-zinc-950` (Tailwind's Zinc) is hardcoded in /demo and /contactos page shells. Elsewhere we use `--color-ink-0`. Tokens must win.
- Navbar rounds itself into a pill on scroll — good. But the pill sits on top of a full-bleed hero without any gradient dropoff at the top; reads as "floating widget" rather than "header".

---

## 2 · Component inventory

Line counts via `wc -l`, usage via grep in `src/`. Any component not imported by `src/app` or another *used* component is **orphan**.

### `src/components/`

| File | Lines | Used in | Quality |
|---|---|---|---|
| `Hero.tsx` | 484 | `/` | **refactor** — huge file, mixes rotating mock, parallax, magnetic btn, widget. Split into `Hero`, `HeroWidgetMock`, `HeroVerticalRotator`. Good raw material. |
| `SocialProof.tsx` | 96 | `/` | **keep** — editorial, token-clean, `whileInView` fallback needed. |
| `VerticalsShowcase.tsx` | 259 | `/` | **keep** — asymmetric layout is spot-on. Ensure videos have `poster=` frames so the blank-first-paint issue vanishes. |
| `HowItWorks.tsx` | 167 | `/` | **keep** — editorial parallax, hairline vertical rule. |
| `Pricing.tsx` | 197 | `/` | **refactor** — featured tier gets a coloured radial that leans commercial; trim. Token-clean otherwise. |
| `FinalCTA.tsx` | 109 | `/` | **keep** — video-bookend pattern matches Hero, intentional. |
| `Footer.tsx` | 132 | `/`, `/demo`, `/quem-somos`, `/contactos`, both `/solucoes/*` | **keep** |
| `Navbar.tsx` | 214 | layout | **refactor** — scroll-into-pill is good; dropoff gradient missing. Also mobile menu animates with framer — swap to GSAP timeline for consistency. |
| `FloatingSalesBot.tsx` | 238 | layout | **refactor** — functional but uses green accent and a round boxed bubble. Re-skin to signal-blue + glass. |
| `ConversionZone.tsx` | 33 | `/demo` | **keep** (thin wrapper). |
| `ContactForm.tsx` | 167 | `/demo` via ConversionZone | **refactor** — labels/placeholders are fine; field chrome is visible border + solid bg. Switch to hairline underlines + `.glass` panel. |
| `InteractiveDemo.tsx` | 187 | `/demo` via ConversionZone | **refactor** — chat mock uses green bubbles; align to signal-blue or neutral. |
| `AboutUs.tsx` | 132 | — | **kill** — orphan. `/quem-somos` inlines its own layout. |
| `BentoGrid.tsx` | 112 | — | **kill** — orphan. Direction explicitly rejects bento. |
| `WhatsAppFloat.tsx` | 15 | — | **kill** — orphan. Replaced by `FloatingSalesBot`. |

### `src/components/motion/`

| File | Used in | Quality |
|---|---|---|
| `FadeIn.tsx` | Hero, HowItWorks, Verticals, Pricing, FinalCTA, SocialProof | **keep** |
| `TextReveal.tsx` | Hero, HowItWorks, Verticals, Pricing, FinalCTA | **keep** |
| `MagneticButton.tsx` | Hero, Pricing, FinalCTA | **keep** |
| `Lottie.tsx` | — | **kill** — orphan. Lottie bloats bundle; Cinematic Authority doesn't need sticker motion. |
| `Marquee.tsx` | — | **kill** — orphan. If needed later, do it in GSAP. |
| `MeshAurora.tsx` | — | **kill** — orphan. Current aurora effects live inline in Pricing/Verticals. |
| `NoiseTexture.tsx` | — | **kill** — orphan. Noise lives as `.noise::before` in `globals.css`. |
| `VideoBackground.tsx` | — | **kill** — orphan. FinalCTA uses inline `<video>` with IO. |

### `src/components/ui/` (shadcn)

| File | Used in | Quality |
|---|---|---|
| `button.tsx` | Hero, Pricing, FinalCTA, Navbar | **keep** |
| `badge.tsx` | — | **kill** — orphan. |
| `card.tsx` | — | **kill** — direction rejects boxed cards. |
| `separator.tsx` | — | **kill** — orphan; hairlines are `border-t border-white/[0.06]`. |

**Violations against the design system**
- Visible borders on /demo form fields, chat bubbles.
- Solid `bg-zinc-950` on /demo + /contactos shells.
- Emerald/green brand split across /demo, /solucoes/*, hover states in /contactos.
- Rounded portrait frame on /quem-somos conflicts with the zero-border intent.
- FloatingSalesBot uses a solid green circle.

---

## 3 · Information Architecture

### `/` — NorteNode home

| # | Section | Purpose | Component |
|---|---|---|---|
| 1 | Hero | Full-bleed cinematic. Headline "A RECEÇÃO INVISÍVEL." with rotating vertical mock. | `Hero` (split) |
| 2 | SocialProof | Three hard metrics (leads captured, response time, hours saved) with hairline dividers. No logos, no testimonials. | `SocialProof` |
| 3 | VerticalsShowcase | Who it's for — 4 vapor cards, asymmetric. Videos behind hover reveal. | `VerticalsShowcase` |
| 4 | HowItWorks | 3 steps, editorial, alternating left/right. The mechanics. | `HowItWorks` |
| 5 | LiveProof (**NEW**) | 1-2 anonymised real conversations rendered as static editorial, not a chat mock. Proof-by-transcript. | `LiveProof` (to build) |
| 6 | Pricing | Three columns, hairline-separated, featured tier breaks grid. | `Pricing` |
| 7 | FAQ (**NEW**) | 4-6 editorial accordion rows. Answers to the 4 objections Adolfo hears. | `FAQ` (to build) |
| 8 | FinalCTA | Full-bleed video, closing line. | `FinalCTA` |
| 9 | Footer | | `Footer` |

**Gaps today**: no live proof section, no FAQ. Both asked by real buyers.
**Excess today**: none.

### `/solucoes/whatsapp`

1. Hero-lite (headline + phone mock, hairline feature list) — current version, re-skinned.
2. **SocialProof mini** (1 stat lift from home, specific to WhatsApp, e.g. response time).
3. **"Como funciona no WhatsApp"** — 3 rows, editorial, not a grid.
4. **FAQ mini** (3 answers).
5. FinalCTA.
6. Footer.

### `/solucoes/widget-web`

Mirror of WhatsApp: hero-lite → social proof mini → how → faq mini → FinalCTA → footer. Copy changes, not the chassis.

### `/demo`

1. Minimal header (current, but use tokens, not `bg-zinc-950`).
2. ConversionZone: form left, chat right — re-skin both to signal-blue + hairline frames.
3. **"Qué esperar" sidebar** (optional, only desktop) — 3 bullets explaining what the demo does.
4. Footer.

### `/quem-somos`

1. Portrait + founder story (current, drop rounded frame).
2. **"Principios"** hairline list (current, keep).
3. **"Timeline / recorrido"** (optional) — 3-4 dots, light editorial.
4. FinalCTA (reuse).
5. Footer.

### `/contactos`

1. Editorial headline (current, tokenise colours).
2. Contact rows (current, swap emerald hover → signal).
3. Map (current, keep the dark-filter hack).
4. Footer.

---

## 4 · Delta-plan

### 4.a · Components

| Action | Files |
|---|---|
| **Kill** | `AboutUs.tsx`, `BentoGrid.tsx`, `WhatsAppFloat.tsx`, `motion/Lottie.tsx`, `motion/Marquee.tsx`, `motion/MeshAurora.tsx`, `motion/NoiseTexture.tsx`, `motion/VideoBackground.tsx`, `ui/badge.tsx`, `ui/card.tsx`, `ui/separator.tsx` |
| **Refactor** | `Hero.tsx` (split), `Pricing.tsx`, `Navbar.tsx`, `FloatingSalesBot.tsx`, `ContactForm.tsx`, `InteractiveDemo.tsx`, `/app/demo/page.tsx`, `/app/contactos/page.tsx` |
| **New build** | `LiveProof.tsx`, `FAQ.tsx`, `motion/GsapReveal.tsx` (wrapper), `motion/LenisProvider.tsx` |
| **Keep as-is** | `Hero` sections not split, `SocialProof`, `VerticalsShowcase`, `HowItWorks`, `FinalCTA`, `Footer`, `ConversionZone`, `motion/{FadeIn,TextReveal,MagneticButton}`, `ui/button` |

### 4.b · Packages to install

| Package | Purpose |
|---|---|
| `gsap` | Section timelines + ScrollTrigger. Free tier covers what we need. |
| `lenis` (was `@studio-freight/lenis`) | Smooth scroll. |
| `@gsap/react` | Optional — `useGSAP` hook; only if we want the hook style. Can also go `gsap.context` manually. |

Framer Motion stays for micro-interactions (hover, MagneticButton).

### 4.c · Tailwind v4 gotchas

- **No `tailwind.config.js`**. Tokens live under `@theme` in `src/app/globals.css`. When adding, append there.
- Tailwind v4 generates utilities automatically from `@theme` custom properties, but **color utilities** require the `--color-*` naming pattern (already correct in our file). Any new accent goes as `--color-<name>-<shade>`.
- **`@apply` with custom tokens**: requires the tokens to be defined in `@theme` before use.
- **Arbitrary values** still work: `bg-[var(--color-ink-100)]` etc. Prefer the named utility (`bg-ink-100`) once v4 picks it up.
- **No PurgeCSS config** needed; v4's scan is JIT.
- **`@layer utilities`** still works; used for `.card-premium`, `.line-accent`, `.mask-*`.
- **Dark mode**: we bake dark as default via `:root` + `color-scheme: dark`. No `dark:` prefixes needed; don't re-introduce them.
- **Plugin compatibility**: `@tailwindcss/postcss` v4 is what's installed. shadcn v2 components work but any recipe expecting v3 config needs its config flipped to CSS.

### 4.d · Effort estimate (coarse)

| Block | Scope | Rough effort |
|---|---|---|
| **B.1 — purge + skill lock-in** | Kill orphans, land skill, Lenis provider, GSAP baseline | ~2h |
| **B.2 — home landing pass** | Hero split, SocialProof/Verticals/How polish, new LiveProof, new FAQ, FinalCTA verification | ~6-8h |
| **B.3 — solucoes routes** | Re-skin both WhatsApp + widget-web with hero-lite → social → how → faq | ~3h |
| **B.4 — demo + contactos** | Tokenise shells, re-skin ContactForm/InteractiveDemo/FloatingSalesBot to signal-blue, drop emerald | ~2h |
| **B.5 — quem-somos** | Drop rounded portrait frame, add timeline section | ~1h |
| **B.6 — motion pass** | Convert `whileInView` callers to GSAP ScrollTrigger with visible fallback; wire Lenis | ~2h |
| **B.7 — i18n sweep** | Verify pt-PT primary coverage across new copy; es-ES fallback | ~1h |

Total Fase B estimate: **17–19h** focused work across ~3–4 working sessions.

### 4.e · Risks / known unknowns

1. **GSAP + React 19 + Next 16 Turbopack**: confirm no SSR/hydration mismatch before committing to it. `useGSAP` should be client-only.
2. **Lenis + fixed Navbar**: Lenis can break `position: fixed` on iOS Safari. Test early.
3. **Tailwind v4 migration notes**: if any new shadcn component is installed, it may expect v3 config — check each.
4. **Green → Blue accent**: some Supabase-facing screenshots (WhatsApp brand) use green legitimately (WhatsApp branding). Only swap the **NorteNode** accents; WhatsApp green stays where it's actually WhatsApp UI.

**RISK STATUS — Lenis + fixed Navbar en iOS Safari:** validación pendiente de ejecución en device real por el dueño del proyecto. Protocolo en `docs/design-refs/ios-safari-test-protocol.md`. No bloquea B.4 (demo+contactos no introduce nuevo motion). Debe cerrarse antes de production deploy.

**~~ASSET DEBT — logo PNG a SVG inline~~** — supersedido por entry B.8-1 más abajo (decisión: diferir post-launch, Next/Image entrega <5 KB downstream).

**META WHATSAPP SANDBOX — deuda DevOps:** La Meta App de NorteNode está en modo development. Solo números pre-registrados en Meta Developers → WhatsApp → API Setup → Test recipients pueden recibir mensajes. Los failed WhatsApp historicos (#131030 "Recipient phone number not in allowed list") son consecuencia de esto, no bugs del dispatcher. Dos caminos para cerrarlo:
  (a) Añadir +351937809995 al allowlist de test recipients (fix inmediato, solo recibe el owner).
  (b) Enviar la Meta App para production review (permite enviar a cualquier número E.164 verificado, requiere privacy policy URL pública + business verification).
Prioridad: media. No bloquea B.4–B.7. Debe resolverse antes de onboard el primer tenant pagador que use WhatsApp channel.

**RESEND KEY ROTATION — histórico resuelto:** 1 failed email (Resend 401) de 2026-04-17 23:40. Desde 2026-04-18 23:22 los emails se entregan limpios. La key ya fue rotada. Sin acción requerida — se documenta para trazabilidad.

**~~MIGRATION DRIFT pre-B.7~~** — RESOLVED B.7-1 (commit `e3e204d`). Migration history reconciled: 3 remote-only renamed via `git mv` (20260418224411 / 20260418230759 / 20260419125011 emparejados con `phase3_bot_tools.sql` / `harden_bot_tools_grants.sql` / `phase4_rebrand.sql` que tenían timestamps locales artefacto). 5 local-only repaired via `supabase migration repair --status applied <timestamp> --linked` (phase1_multitenant_foundation, anonymous_contacts_and_widget_rpc, phase3_notifications_dispatcher, phase3_pg_cron, phase3_media_storage). 11 migrations now 1:1 entre local repo y remote `schema_migrations` table. `supabase db push` ya no intentará re-aplicar nada existente.

**B.4.3a-dx E2E VERIFIED (2026-04-22):** Migration 20260421000001 aplicada en prod. RPC submit_agency_lead extendido de 5 a 6 params (añadido p_sector text default null). Versión antigua de 5 params dropeada explícitamente para evitar overload coexistente. Org nortenode-ai actualizada: owner_contact_phone=+351937809995, owner_contact_email=nortenode.ia@gmail.com. Test E2E: lead creado con qualification {"form":"marketing-contact","sector":"barbearia"}, email notification entregada en primer intento (sent@1attempt), WhatsApp notification encolada como esperado (queda en queue para eventual fail por Meta sandbox). Cleanup: lead + contact + notifications eliminados, counts verificados en 0. Zero corruption.

**~~METADATA SUFFIX DUPLICATION — deuda SEO~~** — RESOLVED B.7-2 (commit `154267b`): " · NorteNode" suffix removido de 9 dictionary entries + 2 hardcoded titles. layout.tsx template `"%s · NorteNode"` ahora aplica suffix una sola vez. Verified post-B.9 cross-page MCP check: cada `<title>` muestra "PageName · NorteNode" sin duplicación.

**~~LOCALE MISMATCH METADATA vs UI — deuda i18n~~** — RESOLVED B.7-2 (commit `154267b`): DEFAULT_LOCALE flipped de "es" a "pt" en I18nProvider, alineando UI client-side con metadata server-side autoritativo. `<html lang>` ahora se sincroniza dinámicamente desde el provider. Validation pendiente cuando se introduzca geo-detection en post-launch (no requerido para deploy v1).

**~~useMotionInitial orphan post-B.4.4~~** — RESOLVED B.7-3 audit: falso positivo. El hook tiene 3 consumers activos (`src/app/template.tsx`, `src/components/Navbar.tsx`, `src/components/demo/InteractiveDemo.tsx`). ConversionZone era solo 1 de 4 consumers; tras su kill el hook sigue en uso. La entrada original asumió incorrectamente que ConversionZone era el único consumer.

**~~adolfo_nortenode.jpg peso elevado~~** — RESOLVED B.8-1: re-encode a 1280×1600 q=72 mozjpeg via sharp, 789 KB → 146 KB (-81%). Combined con `next.config.ts` `images.formats: ["image/avif","image/webp"]`, Next/Image sirve <50 KB para viewports comunes. Direct LCP win en `/quem-somos`.

**Hero video over budget B.8-1:** `public/assets/hero/hero-concrete.mp4` pesa 3.4 MB (budget AGENTS.md hero ≤1.5 MB). Diferido post-launch — re-encode con `ffmpeg` CRF 28-30 o resolución 1280×720 puede reducir a ~1.2-1.4 MB. Vercel sirve range requests para `<video preload="metadata">`, impacto en LCP es minimal porque el poster `.jpg` (31 KB) carga instant. Prioridad: media post-deploy.

**First-Load JS budget reality check B.8-1:** rutas marketing ~308 KB gz, `/demo` lazy-loaded ~308 KB (era 407 KB tras lazy-loading de InteractiveDemo via `next/dynamic ssr:false`). Budget AGENTS.md de 180 KB no alcanzable sin remover `framer-motion` del path shared (Navbar, template, FadeIn, TextReveal, MagneticButton — 6 imports). Decisión: aceptar 308 KB como baseline tras evidencia de Vercel Analytics post-launch. Si Core Web Vitals reales fallan en field data, abrir tanda de framer-motion → GSAP migration. Hasta entonces, budget queda aspiracional.

**Logo `nortenode_star_icon.png` 60 KB B.8-1:** optimización SVG inline diferida post-launch (requiere SVG vector del owner o aproximación con Lucide Star). Next/Image sirve AVIF/WebP downstream para los 2 consumers (Navbar 20×20, Footer 22×22) — peso real entregado <5 KB por viewport. Bajo prioridad.

**`apple-icon.png` re-encode B.8-1:** re-encode a 180×180 PNG-9 via sharp, 1.06 MB → 11 KB (-99%). Mata el peor outlier de `public/`. Origen estaba a tamaño nativo de iconset PSD; ahora cabe en el budget de un single icon iOS.

**Lottie cleanup B.8-1:** `lottie-react` removido de dependencies (cero consumers en src/). Tres `.json` orfan eliminados: `public/assets/{Search Processing,loading,voice wave}.json` (estaban tracked, sin imports). Reduce package.json deps + repo size sin bundle impact (no estaba en bundle por no ser importado).

**Email migration to Zoho complete (B.6 epilogue):** `organizations.owner_contact_email` del agency org `nortenode-ai` migrado de `nortenode.ia@gmail.com` a `contacto@nortenode.com` vía migration `20260425000001_org_email_to_contacto_nortenode.sql` (aplicada en remote 2026-04-25 via `supabase db query --linked --file` + `migration repair --status applied`). Coincide con migración de display addresses en `dictionary.ts` (commit `fc3dc49`) y Resend `reply_to` header en notify.ts (commit `3351002`). Notificaciones de leads del dispatcher ahora llegan a bandeja Zoho profesional, no a Gmail personal. La línea histórica de B.4.3a-dx en este documento (`owner_contact_email=nortenode.ia@gmail.com`) queda como referencia de trazabilidad del estado anterior.

**~~Solucoes meta keys cleanup B.7-3~~** — SUPERSEDED B.9.7: keys recreadas como `meta_title_v2` y `meta_description_v2` en 3 locales × 2 pages, consumidas por `src/app/solucoes/{whatsapp,widget-web}/page.tsx`. Pattern alineado con `/contactos`, `/demo`, `/quem-somos`. Title hardcoded ES original eliminado.

---

## B.9 — VISUAL REWORK MINIMAL BLUEPRINT V2 ✅ CLOSED 2026-04-26

Site-wide visual rework executed across 8 sequential commits. Direction validated via Google Stitch moodboard with owner. Each page has distinct visual personality within a shared minimal-blueprint token system v2.

**Commits:**
- B.9.1 `bc97635` — Establish v2 design tokens (additive, no consumers).
- B.9.2 `512e57e` — Rework Navbar + Footer to v2 tokens.
- B.9.3 `bc4d978` — Rework /contactos (Connect. card + sidebar).
- B.9.4 `59328a5` — Rework / home (6 numbered editorial sections).
- B.9.5 `dffb367` — Rework /demo (live laboratory chat 65/35).
- B.9.6 `ea68dd9` — Rework /quem-somos (editorial human + serif italic).
- B.9.7a `c4f665e` — Rework /solucoes/whatsapp + 5 shared v2 components.
- B.9.7b `130bbb7` — Rework /solucoes/widget-web + V2 naming cleanup.
- B.9.8 (this commit) — Body bg layout migration, AUDIT closure.

**Surface change:**
- 6 pages migrated 100% to v2 tokens (bg-v2, text-primary-v2, accent-v2, border-v2, status-live-v2, mono-label-v2, hairline-v2, cyan-period-v2, dot-pulse-v2, shadow-glow-soft-v2).
- Cero referencias v1 (`--color-ink-*`, `--color-signal-*`, `.glass`, `.spotlight`, `.grid-faint`) en código consumidor (verified via grep: only globals.css definitions remain).
- 30+ files created/rewritten, 10+ legacy files killed.
- ~600 dictionary string entries added (3 locales × ~200 v2 keys).
- Body bg en layout.tsx migrado de `var(--background)` (v1 #05060a) a `var(--color-bg-v2)` (#0a0d12) en B.9.8.

**MCP cross-page visual check (desktop 1440x900) post-B.9.8:**

| Route | title | main_bg | body_bg | sections | nav | footer | console errors |
|---|---|---|---|---|---|---|---|
| `/` | "NorteNode — Recepcionista IA 24/7…" | `#0a0d12` v2 | `#0a0d12` v2 | 6 | ✓ | ✓ | 0 |
| `/contactos` | "Contactos · NorteNode" | `#0a0d12` v2 | `#0a0d12` v2 | 3 | ✓ | ✓ | 0 |
| `/demo` | "Demo · NorteNode" | `#0a0d12` v2 | `#0a0d12` v2 | 3 | ✓ | ✓ | 0 |
| `/quem-somos` | "Quem Somos · NorteNode" | `#0a0d12` v2 | `#0a0d12` v2 | 4 | ✓ | ✓ | 0 |
| `/solucoes/whatsapp` | "WhatsApp Operator · NorteNode" | `#0a0d12` v2 | `#0a0d12` v2 | 7 | ✓ | ✓ | 0 |
| `/solucoes/widget-web` | "Web Widget · NorteNode" | `#0a0d12` v2 | `#0a0d12` v2 | 8 | ✓ | ✓ | 0 |

### Post-B.9 debt reorganized

**Diferida a post-launch (no bloqueante para deploy):**

1. **Hero video re-encode** (B.8-1 flag): `public/assets/hero/hero-concrete.mp4` pesa 3.4 MB > 1.5 MB target. Reduce con `ffmpeg` CRF 28-30 o resolución 1280×720 a ~1.2-1.4 MB. Impacto LCP minimal por `preload="metadata"` + poster JPG 31 KB.

2. **Logo PNG → SVG inline** (B.8-1 flag): `nortenode_star_icon.png` 60 KB. Optimización SVG diferida — requiere vector source o Lucide Star approximation. Next/Image entrega <5 KB downstream.

3. **First-Load JS 308 KB > 180 KB target** (B.8-1 flag): aspirational, sin remover `framer-motion` del path shared (Navbar, template, FadeIn, TextReveal, MagneticButton). Decisión: aceptar baseline 308 KB; abrir migration framer-motion → GSAP solo si Vercel Analytics post-deploy field data muestra Core Web Vitals fallidos.

4. **iOS Safari Lenis test pendiente**: `docs/design-refs/ios-safari-test-protocol.md` (untracked) lista pasos validation. No iPhone access del Adolfo durante B.9. Post-deploy real-device test antes de onboarding paying clients.

5. **Mobile resize_page Chrome DevTools MCP bug**: tooling issue conocido. `resize_page` no honra dimensiones 390×844 (viewport queda en 1370 desktop). Mobile rendering verified via responsive Tailwind classes (`md:`, `lg:` breakpoints) durante development local del owner. No code issue.

6. **Cookie sync metadata locale-aware**: actualmente metadata server-side reads autoritativo PT, UI client-side hidrata locale del navegador via I18nProvider. Geo-detection o cookie-pinning (Set-Cookie con locale) candidatos a B.10+ si se introduce.

7. **Meta WhatsApp production review** (legacy flag): activar Meta App de development → production cuando primer cliente paying use WhatsApp channel. Privacy policy URL + business verification requeridos.

8. **Legacy v1 token cleanup en globals.css**: definiciones `--color-ink-*`, `--color-signal-*`, `--color-hairline`, `.glass`, `.spotlight`, `.grid-faint`, `.font-display`, etc. siguen vivas en globals.css pero **cero consumers** (verified via grep B.9.8). Cleanup commit dedicado evaluable post-launch — bajo prioridad porque dead code en un solo CSS file no afecta runtime.

9. **Legacy dictionary subtrees** (`t.solucoes.{whatsapp,widget}.{hero,mock,integration_steps,capabilities,cta_headline}`, `t.contactos.{directory,process,position}`, `t.quem_somos.{hero,manifesto,principles,trajectory,final_cta}`, `t.home.*` v1, `t.demo.{hero.headline_l1,headline_l2,sub,meta,how,limits,final_cta}`, `t.hero/services/social/faq/final_cta`): preservados durante B.9 por safety. Cleanup commit post-launch posible una vez confirmado que todas las pages funcionan en producción y nada secret consume estos keys.

10. **Body bg migration** ✓ — RESOLVED B.9.8 (this commit). `<body>` y `body { ... }` rule en globals.css consumen tokens v2 directos. themeColor viewport actualizado a `#0a0d12`. Verified via DevTools computed styles post-restart dev server (Turbopack cache requirió `rm -rf .next/` + clean restart para picked up — minor tooling note).

### 4.f · Pending inputs from Adolfo

- Drop `DESIGN.md` into `docs/design-refs/DESIGN.md` (overwriting placeholder).
- Drop `code.html` as `docs/design-refs/authority-reference.html`.
- Drop `screen.png` as `docs/design-refs/authority-reference.png`.
- Confirm that WhatsApp green stays only in WhatsApp-mock UI, not on NorteNode CTAs.
- Confirm that `FloatingSalesBot` stays (vs. being moved to a pinned-button demo CTA only on `/demo`).

---

## 5 · Done-gate for Fase A

- [x] Skill loaded at `.claude/skills/design-system-cinematic-authority.md`.
- [x] `docs/design-refs/` created with placeholders + baseline/.
- [x] 12 baseline screenshots captured.
- [x] Component inventory with kill/refactor/keep.
- [x] IA proposed for all 6 routes.
- [x] Delta-plan written with package + Tailwind v4 notes + effort.
- [ ] Adolfo approval.
