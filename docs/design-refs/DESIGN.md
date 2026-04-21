# Design System Specification: The Cinematic Authority

## 1. Overview & Creative North Star
This design system is not a framework; it is an editorial statement. Moving away from the cluttered, "boxy" nature of traditional SaaS, this system adopts a philosophy we call **"The Cinematic Authority."**

It draws inspiration from the archival precision of high-end fashion and the uncompromising functionalism of modern tech giants. The goal is to create a sense of "Quiet Luxury" where the interface recedes to allow the product and typography to command the stage. We break the "template" look through **intentional asymmetry** — placing elements off-center to create visual tension — and **massive negative space** that forces the eye to focus on a single, authoritative message.

## 2. Colors & Tonal Layering
The palette is rooted in the absence of color, using a spectrum of blacks and charcoals to create depth. The primary accent (`#b3c5ff`) is a surgical tool — use it only to highlight the most critical path.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Traditional dividers are a sign of lazy hierarchy.
- Boundaries must be defined solely through background color shifts.
- For example, a `surface-container-low` (#131313) section sitting on a `surface` (#0e0e0e) background provides all the separation required.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers to "nest" importance:
- **Level 0 (Background):** `#0e0e0e` — The canvas.
- **Level 1 (Sections):** `surface-container-low` (#131313) — Full-bleed content blocks.
- **Level 2 (Cards/Modules):** `surface-container-high` (#1f1f1f) — To pull specific data forward.
- **Level 3 (Interactive):** `surface-container-highest` (#262626) — For active states or floating menus.

### The "Glass & Gradient" Rule
To add "soul" to the tech-heavy palette:
- **Glassmorphism:** Use `surface` colors at 60–80% opacity with a `20px–40px` backdrop-blur for global navigation or floating overlays.
- **Signature Textures:** Apply a subtle radial gradient from `primary` (#b3c5ff) to `primary-container` (#003fa4) at 5% opacity in hero sections to mimic professional studio lighting.

## 3. Typography: Aggressive Editorial
Typography is our primary design element. We use **Inter** to achieve a look that is both neutral and authoritative.

- **Extreme Contrast:** The system thrives on the gap between the massive and the minute. Use `display-lg` (3.5rem) or custom "Super-Display" sizes (6rem/96px+) for headlines, paired immediately with `body-md` (0.875rem/14px) for descriptions.
- **Asymmetrical Tracking:** For `display` styles, use a tight letter-spacing (-0.02em) to make headlines feel like a single cohesive "block." For `label-sm`, increase tracking (0.05em) and use uppercase to maintain legibility and a premium "Swiss" feel.
- **Hierarchy of Intent:** Headlines are for brand authority; labels are for utility. Never let them compete in scale.

## 4. Elevation & Depth
In this system, depth is felt, not seen. We reject the heavy "material" shadows of the past.

- **The Layering Principle:** Use the color tokens to create a "soft lift." A `surface-container-lowest` (#000000) card on a `surface-container-low` (#131313) background creates a natural recession without a single pixel of shadow.
- **Ambient Shadows:** When a floating element (like a modal) is required, use a shadow with a 64px blur at 8% opacity. The shadow color should be `#000000`, creating a "void" effect rather than a gray smudge.
- **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` (#484848) at **15% opacity**. It should be barely perceptible — a "ghost" of a line.

## 5. Components

### Buttons
- **Primary:** `tertiary` (#f9f9f9) background with `on_tertiary` (#5e5f60) text. Sharp, high-contrast, and unavoidable.
- **Secondary:** `surface_container_highest` (#262626) with `on_surface` (#e5e5e5) text.
- **Shape:** Use `DEFAULT` (0.25rem) for a disciplined, architectural look. Avoid `full` rounding unless it is a status chip.

### Input Fields
- No boxes. Use a `surface-container-low` background with a `surface-variant` bottom-only stroke (2px).
- Labels must use `label-md` and be positioned 16px above the input area to maintain "breathing room."

### Cards & Lists
- **Rule:** Absolute prohibition of divider lines.
- **Separation:** Use 32px, 48px, or 64px of vertical space from the spacing scale. If a list is dense, use alternating `surface` and `surface-container-low` background rows.

### The "Immersive" Component (Custom)
- **The Full-Bleed Stage:** For high-fidelity mockups, the image must extend to the edges of the viewport. Content should be overlaid using `display-lg` typography with a `backdrop-blur` text-protection layer if necessary.

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Place your headline in the top-left and your CTA in the bottom-right of a hero section. Use the negative space as a bridge.
- **Use High-Fidelity Imagery:** Since the UI is minimal, the "burden of beauty" falls on photography. Use 4K renders or high-contrast monochrome photography.
- **Respect the Grid, then Break It:** Use a 12-column grid for alignment, but allow "hero" elements to bleed across columns 1 through 9, leaving 10–12 empty.

### Don't:
- **Don't use 100% opacity borders:** It breaks the "Quiet Luxury" aesthetic.
- **Don't crowd the canvas:** If a screen feels "busy," your first instinct should be to increase the margin-top/bottom, not to add a border.
- **Don't use the accent color for everything:** If the `primary` slate-blue is everywhere, it loses its "surgical" authority. Use it for one thing per screen.
- **Don't use standard drop shadows:** They make the interface feel like a legacy SaaS app. Stick to tonal layering.

## §7 — Opacity-Split Rule

**Stance:** tono nunca se expresa via opacity ad-hoc. Todo tono vive en un token declarado en `@theme`.

**Prohibido:**
- `text-white/45`, `text-white/55`, `text-white/60`, etc.
- `border-white/10`, `border-white/15`, etc.
- `bg-white/05`, `bg-black/40`, etc., cuando se usan como superficie.

**Footnote — utilities con opacity de color:** la regla aplica a toda utility que use color + opacity slash, no solo a `text-`/`border-`/`bg-`. Incluye explícitamente: `ring-white/NN`, `divide-white/NN`, `outline-white/NN`, `shadow-*white/NN`, `placeholder-white/NN`, `decoration-white/NN`, `fill-white/NN`, `stroke-white/NN`, `from-white/NN` / `via-white/NN` / `to-white/NN` (excepto overlays sobre media — ver "Única excepción"). Misma solución: todo tono viene de tokens `@theme`.

**Tailwind v4 gotcha:** `bg-white/8` y `bg-white/12` (sin brackets) parsean pero no pertenecen a la scale standard (que va 5/10/20/...). Estos valores siempre deben usar tokens o notación bracket `bg-white/[0.08]`. En la práctica: si el valor no existe como token, se añade al `@theme`. Nunca notación bracket libre en código nuevo.

**Permitido:**
- Tokens tonales declarados: `text-[var(--color-steel-400)]`, `border-[var(--color-hairline)]`, etc.
- Si falta un tono: se añade al `@theme` en el mismo commit que lo usa.

**Única excepción:** gradientes y overlays sobre media (video/imagen). Ahí `bg-gradient-to-b from-black/0 via-black/40 to-black` es legítimo porque está modulando contenido visual no-token.

**Excepciones adicionales:**

1. **Contenido dentro de UI-de-mock** (WhatsAppMock, WidgetMock). Los mocks representan productos externos (WhatsApp) o componentes con paleta autónoma (widget) y mantienen sus colores auténticos. `text-white/85` y `text-white/90` en bubbles de bot son exception por estar dentro del mock-as-content, igual que el `#005C4B` verde WhatsApp.

2. **Skeletons/loaders** usan tokens `--color-skeleton-*` explícitos. Son estados temporales de contenido no-existente, no superficies del sistema.

**Razón:** coexistir tokens tonales con opacities ad-hoc genera valores que se parecen pero no son iguales (`#f6f7fb @ 45%` ≠ `steel-400` declarado). En superficie grande, se nota como "tipografía inconsistente entre secciones".
