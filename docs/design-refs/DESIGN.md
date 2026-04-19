# DESIGN.md — Cinematic Authority (placeholder)

> **STATUS: PLACEHOLDER.** The authoritative DESIGN.md authored by Adolfo must be
> pasted here. This file exists so the skill at
> `.claude/skills/design-system-cinematic-authority.md` can link a stable path.

## Direction

- **Tone**: quiet luxury. Dark-first. Editorial. Asymmetric.
- **References**: Linear.app, Vercel, Stripe, Apple, Nike (without the shouting),
  Adidas (the restrained side), Arc'teryx.
- **Anti-references**: stock SaaS template, bento-box rigidity, emoji-heavy marketing,
  rainbow gradients, centered hero with two-button CTA.

## Headlines

- pt-PT: **"A RECEÇÃO INVISÍVEL."** (primary)
- es-ES: **"LA RECEPCIÓN INVISIBLE."** (secondary)

## Motion

- **Libraries**: GSAP (ScrollTrigger) + Lenis (smooth scroll).
- **Easings**: expo out (`cubic-bezier(0.19, 1, 0.22, 1)`) dominates. No springy bounces.
- **Pacing**: slow reveals, generous whitespace, long section padding
  (`py-32` baseline, `py-44`+ desktop).

## Layout

- Full-bleed canvas. No max-width "page" look. Let content touch the viewport edges.
- Zero visible borders on sections; only hairline rules (1px, 7% white) where
  structure demands it.
- Asymmetry by default: 12-col grids with off-centre columns (e.g. 7+5, 8+4).

## Typography

- Display: Instrument Serif (already wired in `globals.css` as `--font-display`).
- Body: Geist Sans.
- Numbers / labels: Geist Mono, small caps-style uppercase eyebrows with wide tracking
  (`tracking-[0.22em]`).

## Palette (see `src/app/globals.css`)

The tokens already live in `globals.css` under `@theme`:
- `--color-ink-0/50/100/200/300/400` (canvas + panels)
- `--color-snow`, `--color-steel-400/500/600` (type)
- `--color-signal-300/400/500/600` (brand accent blue)
- `--color-ember-400/500`, `--color-jade-400/500` (alerts / success)

## Pending inputs

Adolfo to drop:
- The real `DESIGN.md` (overwriting this placeholder).
- `authority-reference.html` (was `code.html`).
- `authority-reference.png` (was `screen.png`).
