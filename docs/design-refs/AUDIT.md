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

**ASSET DEBT — logo PNG a SVG inline:** `public/nortenode_star_icon.png` (60KB) es el logo de marca usado en Navbar y Footer. Candidato a convertir a SVG inline tokenizado con `currentColor` y `fill` via `--color-snow`. Prioridad baja: no bloquea ninguna fase. Adecuado para un bloque de asset-polish posterior a B.7.

**META WHATSAPP SANDBOX — deuda DevOps:** La Meta App de NorteNode está en modo development. Solo números pre-registrados en Meta Developers → WhatsApp → API Setup → Test recipients pueden recibir mensajes. Los failed WhatsApp historicos (#131030 "Recipient phone number not in allowed list") son consecuencia de esto, no bugs del dispatcher. Dos caminos para cerrarlo:
  (a) Añadir +351937809995 al allowlist de test recipients (fix inmediato, solo recibe el owner).
  (b) Enviar la Meta App para production review (permite enviar a cualquier número E.164 verificado, requiere privacy policy URL pública + business verification).
Prioridad: media. No bloquea B.4–B.7. Debe resolverse antes de onboard el primer tenant pagador que use WhatsApp channel.

**RESEND KEY ROTATION — histórico resuelto:** 1 failed email (Resend 401) de 2026-04-17 23:40. Desde 2026-04-18 23:22 los emails se entregan limpios. La key ya fue rotada. Sin acción requerida — se documenta para trazabilidad.

**MIGRATION DRIFT — escalado a pre-B.7:** 3 migrations en remote no existen como archivos locales: 20260418224411, 20260418230759, 20260419125011. Flag original en B.3.5. Bloquea `supabase db push` estándar. Workaround en B.4.3a-dx: migration 20260421000001 aplicada via `supabase db query --linked --file`, seguido de `migration repair --status applied 20260421000001 --linked` para sincronizar historial. Cerrar antes de B.7 via `supabase db pull`, revisar contenido de las 3 migrations remotas, y commitearlas localmente.

**B.4.3a-dx E2E VERIFIED (2026-04-22):** Migration 20260421000001 aplicada en prod. RPC submit_agency_lead extendido de 5 a 6 params (añadido p_sector text default null). Versión antigua de 5 params dropeada explícitamente para evitar overload coexistente. Org nortenode-ai actualizada: owner_contact_phone=+351937809995, owner_contact_email=nortenode.ia@gmail.com. Test E2E: lead creado con qualification {"form":"marketing-contact","sector":"barbearia"}, email notification entregada en primer intento (sent@1attempt), WhatsApp notification encolada como esperado (queda en queue para eventual fail por Meta sandbox). Cleanup: lead + contact + notifications eliminados, counts verificados en 0. Zero corruption.

**METADATA SUFFIX DUPLICATION — deuda SEO:** Todas las pages tienen `title: "X | NorteNode"` o similar en su metadata, pero layout.tsx aplica template `"%s · NorteNode"`. Resultado: `<title>` renderizado duplica el suffix ("Contactos · NorteNode · NorteNode"). Afecta TODAS las rutas. Cerrar en B.7 junto con el i18n sweep.

**LOCALE MISMATCH METADATA vs UI — deuda i18n:** Metadata se lee server-side desde `pt.contactos.meta_*` (primary locale hardcoded). UI se renderiza cliente via I18nProvider que defaultea a ES. Resultado: `<title>` y `<meta description>` en PT, contenido visible en ES. Bug de coherencia SEO vs UX. Cerrar en B.7 junto con decisión de `<html lang>` + geo-detection vs hardcoded.

**useMotionInitial orphan post-B.4.4:** El hook `src/lib/motion-safe.ts` → `useMotionInitial` quedó sin consumers tras el kill de ConversionZone en B.4.4. InteractiveDemo todavía lo consume (vía framer-motion residual). Al migrar InteractiveDemo a GSAP en B.6, verificar con grep total si el hook queda sin consumers. Si sí, eliminar hook + archivo `motion-safe.ts` + revisar otros módulos framer-motion residuales. Baja prioridad.

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
