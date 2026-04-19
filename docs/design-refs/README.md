# Design References — Cinematic Authority (Phase 4)

This directory holds the canonical visual + editorial references for the NorteNode landing.
Three files are expected and must be placed here by Adolfo (they were not recoverable from
the post-`/compact` session state):

| File                           | Source                | Purpose                                           |
|--------------------------------|-----------------------|---------------------------------------------------|
| `DESIGN.md`                    | drop-in               | Full design system spec (tokens, motion, copy).   |
| `authority-reference.html`     | drop-in (was code.html) | Tailwind-config snapshot with full palette.     |
| `authority-reference.png`      | drop-in (was screen.png) | Visual target "THE NEW STANDARD".              |

The skill at `.claude/skills/design-system-cinematic-authority.md` loads the design stance
into every UI-touching conversation. Once the three files above exist, the skill should
reference them directly.

## Direction (captured from Adolfo's brief)

- **Stance**: Cinematic Authority. Dark, editorial, quiet luxury. Asymmetric. Full-bleed. Zero-border.
- **Tone**: Apple / Linear / Arc'teryx / Stripe / Vercel. NOT Nike-shouty. NOT commercial.
- **Copywriting**:
  - pt-PT primary headline: **"A RECEÇÃO INVISÍVEL."**
  - es-ES secondary headline: **"LA RECEPCIÓN INVISIBLE."**
- **Motion**: GSAP + Lenis. Slow, expo easings. No bouncing.
- **Imagery**: Unsplash/Pexels. Search terms: *minimalist architecture*, *dark interior*,
  *editorial monochrome*, *luxury texture*, *slow motion hands*.
- **Bilingual**: pt-PT primary, es-ES secondary.

## Baseline

`baseline/` holds before-refactor screenshots from the Playwright audit of Fase A, one per
route × viewport. Use these as the diff when Fase B lands.
