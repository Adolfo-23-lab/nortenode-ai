# Design References — Cinematic Authority (Phase 4)

This directory holds the canonical visual + editorial references for the NorteNode landing.

| File                           | Status               | Purpose                                           |
|--------------------------------|----------------------|---------------------------------------------------|
| `DESIGN.md`                    | ✓ landed             | Full design system spec (tokens, motion, copy).   |
| `authority-reference.html`     | ✓ landed             | Tailwind-config snapshot with full palette.       |
| `authority-reference.png`      | pending manual drop  | Visual target "THE NEW STANDARD".                 |

> **Note on `authority-reference.png`**: the image was shown in-session but never
> arrived as a binary file Claude could access. Drop it manually at
> `docs/design-refs/authority-reference.png` when convenient.

The skill at `.claude/skills/design-system-cinematic-authority.md` loads the design stance
into every UI-touching conversation. It references this directory.

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

## Baselines

- `baseline/` — screenshots pre-refactor (committed as `d227d4f`).
- `post-b1/` — screenshots after B.1 (committed as `4691bde`).
- `hero-candidates.md` — curated media options for the Hero (Fase B.2).
