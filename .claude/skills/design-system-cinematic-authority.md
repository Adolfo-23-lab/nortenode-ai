---
name: Cinematic Authority design system
description: Design stance for NorteNode landing — dark, editorial, asymmetric, zero-border. Load before any UI/visual work.
trigger: "UI, visual, landing, componente, Hero, Pricing, página, route, Tailwind, CSS, motion, animation, GSAP, Lenis"
---

# Cinematic Authority — NorteNode landing design system

This skill captures the visual + editorial stance for the NorteNode landing (Phase 4+).
Load it automatically on any UI-touching work. The authoritative reference files live at:

- `docs/design-refs/DESIGN.md` — full spec (drop-in, currently placeholder).
- `docs/design-refs/authority-reference.html` — Tailwind config snapshot (drop-in).
- `docs/design-refs/authority-reference.png` — visual target (drop-in).
- `docs/design-refs/baseline/` — baseline screenshots of Phase 4 pre-refactor.

If the drop-ins are missing, consult this file + `src/app/globals.css` (which already
contains the tokens).

---

## 1 · Stance

**Cinematic Authority.** Dark, editorial, quiet luxury, asymmetric, full-bleed, zero-border.

- **North-star references**: Linear.app, Vercel, Stripe, Apple, Arc'teryx, restrained Nike / Adidas.
- **Anti-references**: stock SaaS bento, centered hero with twin CTA buttons, emoji-heavy copy,
  rainbow gradient headlines, rounded-panel-on-solid-background layouts, "shouty" marketing.
- **Feel**: the reader should feel admitted to an under-the-radar premium brand, not sold to.

## 2 · Copywriting

- pt-PT primary: **"A RECEÇÃO INVISÍVEL."**
- es-ES secondary: **"LA RECEPCIÓN INVISIBLE."**
- Eyebrows are uppercase, mono, wide-tracked (`tracking-[0.22em]`), low-opacity (`text-white/45`).
- Body copy is short, declarative. Ban superlatives ("el mejor", "revolutionary", "increíble").
- Proof-by-number, not proof-by-adjective.

## 3 · Palette (already in `globals.css`)

Dark canvas, restrained blue accent. Warmth reserved for alerts.

```
--color-ink-0      #05060a   canvas
--color-ink-100    #0b0d14   panel
--color-ink-300    #1a1d28   elevated
--color-snow       #f6f7fb   primary type
--color-steel-400  #9aa0b1   muted type
--color-signal-500 #2f82f7   brand accent
--color-ember-500  #f06a2e   hot lead / alert
--color-jade-500   #10b981   success
```

Never introduce new hex colours outside these tokens. Tailwind v4 picks them up via
`@theme` — use `bg-ink-100`, `text-snow`, `text-signal-400`, etc.

## 4 · Typography

- `--font-display` → Instrument Serif (italic allowed for punchlines).
- `--font-sans` → Geist Sans.
- `--font-mono` → Geist Mono (eyebrows, code, numeric ticks).
- Display sizing: `text-[clamp(2.5rem,6vw,5.5rem)]` with `leading-[0.96]` and `tracking-[-0.02em]`.

## 5 · Layout

- **Full-bleed first.** Only constrain with `max-w-[1280px]` when copy density requires it.
- **Asymmetry.** 12-col grids, off-centre columns (e.g. `md:grid-cols-[1.2fr_1fr]`,
  `md:col-span-7` + `md:col-span-5 md:mt-16`).
- **Zero visible borders on sections.** Use a single hairline vertical rule
  (`1px` solid `rgba(255,255,255,0.07)`) for structural cues instead.
- **Long padding.** `py-32 md:py-44` is the floor between sections.
- **No rounded panels on solid bg.** Panels exist only via `.glass` / `.glass-strong`
  utilities (already in `globals.css`).

## 6 · Motion

- **Libraries**: GSAP (ScrollTrigger) for section choreography, Lenis for smooth scroll.
  Framer Motion stays only for micro-interactions (hover, magnetic buttons).
- **Easings**: `--ease-expo` (`cubic-bezier(0.19, 1, 0.22, 1)`) dominates; springs are
  reserved for cursor-following elements.
- **Reduced motion**: always honour `prefers-reduced-motion` (already wired in `globals.css`).
- **No confetti, no bounce, no emoji flips.**

## 7 · Imagery

- Sourced from Unsplash / Pexels.
- Search terms allowed: *minimalist architecture*, *dark interior*, *editorial monochrome*,
  *luxury texture*, *slow motion hands*, *studio lighting*, *analog craft*.
- Videos loop, always muted, always `playsInline`, `prefers-reduced-motion` → paused.
- Asset path: `/public/assets/*`. `.mp4` is gitignored — keep originals on a CDN.

## 8 · Bilingual

- pt-PT is primary (default locale). es-ES is secondary.
- Copy lives in `src/i18n/dictionary/`. Never hardcode strings in components.

## 9 · Engineering guardrails

- Tailwind v4 (`@theme` in `globals.css`, no `tailwind.config.js`). When adding tokens, add
  them under `@theme` — do not create `tailwind.config.ts`.
- Next.js 16.2.1 + Turbopack. Check `node_modules/next/dist/docs/` for any API before using.
- React 19.2.4. Server components by default; add `"use client"` only when necessary.
- No new UI dependency without approval. Prefer composing with the tokens + motion primitives
  already in `src/components/motion/`.

## 10 · Definition of done (per UI change)

1. No new hex colours. No new hard-coded border-radii outside tokens.
2. No rounded cards on solid bg unless through `.glass` utility.
3. Passes `prefers-reduced-motion`.
4. Baseline screenshot re-captured in `docs/design-refs/baseline/`.
5. Copy reviewed against the "no superlatives" rule.
