# GSAP Skills

Canonical skills from GreenSock's official `gsap-skills` repository,
copied into this project as versioned reference for AI coding agents.

## Source

- **Repository:** https://github.com/greensock/gsap-skills
- **License:** MIT (see `LICENSE` in this directory)
- **Fetched:** 2026-04-22
- **Fetched from branch:** main

## Contents

| File                                  | Covers                                                                   |
|---------------------------------------|--------------------------------------------------------------------------|
| `gsap-core.md`                        | Core tween APIs, easing, duration, stagger, defaults                     |
| `gsap-timeline.md`                    | Timelines, position param, labels, nesting, playback control             |
| `gsap-scrolltrigger.md`               | Scroll-linked animation, pinning, scrub, triggers, refresh, cleanup      |
| `gsap-plugins.md`                     | ScrollToPlugin, ScrollSmoother, Flip, Draggable, Observer, SplitText, …  |
| `gsap-utils.md`                       | `gsap.utils.*` helpers: clamp, mapRange, interpolate, random, toArray, … |
| `gsap-react.md`                       | `useGSAP`, refs, `gsap.context()`, cleanup, SSR                          |
| `gsap-performance.md`                 | Transforms, will-change, batching, ScrollTrigger performance             |
| `gsap-frameworks.md`                  | Vue / Svelte integration (reference only, not used in this repo)         |
| `react.instructions.md`               | Path-specific rules for React + GSAP (Copilot/Cursor/Claude Code style)  |
| `scrolltrigger.instructions.md`       | Path-specific rules for ScrollTrigger                                    |

## When to consult

- Before writing any new GSAP code: skim the relevant skill file.
- When reviewing PRs that touch `.tsx` files importing `gsap` or
  `@gsap/react`: check against `react.instructions.md` and
  `scrolltrigger.instructions.md`.
- When debugging motion issues (jank, leaks, stale triggers):
  `gsap-performance.md` + `gsap-scrolltrigger.md` are first stops.

## NOT a substitute for

- This project's `design-system-cinematic-authority.md` skill, which
  defines *what* we animate and *how* it should feel.
- The canonical GSAP docs at `https://gsap.com/docs/` for API
  reference beyond what the skills cover.

## Updating

When upstream publishes new skills or revisions:
1. Re-fetch from `https://github.com/greensock/gsap-skills` main branch.
2. Overwrite files in this directory preserving the filename mapping
   above.
3. Update the `Fetched:` date in this README.
4. Commit with message: `chore(skills): refresh gsap skills from upstream {date}`.
