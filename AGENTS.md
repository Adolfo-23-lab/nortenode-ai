<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Performance budget

Medido en build de producción, 4G emulado (no localhost warm).

- LCP ≤ 1.5s
- CLS < 0.05
- INP < 200ms
- TBT < 200ms
- First-load JS por ruta ≤ 180KB gzipped

Cualquier PR que exceda uno de estos requiere justificación en el commit body.

## Media policy

**Video:**
- Formato de entrega: H.264 (baseline compat). AV1 opcional como fuente adicional via `<source type="video/av1">`.
- Atributos obligatorios: `muted playsinline preload="metadata"` y `poster="..."`.
- Peso máximo: 1.5MB hero, 500KB secondary.
- `.mp4` gitignored salvo excepción declarada en .gitignore.
- Originales en CDN (no en repo).

**Imágenes:**
- `next/image` siempre. Nunca `<img>` salvo dentro de .md.
- AVIF preferente, JPEG fallback.
- `sizes` declarado en toda imagen responsiva.
- `loading="lazy"` en toda imagen below-the-fold. Hero LCP image con `priority`.

## Motion policy

- Ningún scroll-hijack. Lenis suaviza el scroll nativo, no lo reemplaza.
- Duración máx entrada: 600ms.
- Parallax máx: 10% yPercent.
- Ninguna animación se dispara durante input del usuario (escribir, click, drag). Respetar INP.
- `useGSAP` siempre con `scope` prop. Nunca selectors globales.
- `prefers-reduced-motion` respetado via `gsap.matchMedia`, final state aplicado con `gsap.set(..., { clearProps: "all" })`.

## Copy rules (agency positioning)

- Nunca "features". Usar "capacidades" / "qué hacemos por ti".
- Nunca "free trial", "sign up", "sign in" en páginas públicas de marketing. Login vive off-nav, solo accesible vía URL directa.
- CTAs de marketing apuntan a `/contactos` o `/demo`. Nunca a `/login` desde hot path.
- Números con fuente o no se usan. Prohibido "reduce X%" sin caso medido citable.
- Superlativos prohibidos: "el mejor", "revolutionary", "increíble", "leading", "next-gen".

## Multi-tenant frontend rules

- Rutas públicas (`/`, `/solucoes/*`, `/demo`, `/contactos`, `/quem-somos`) no hacen queries directas a tablas Supabase.
- Toda escritura desde cliente público va via RPC `SECURITY DEFINER` explícitamente diseñada para `anon` (ej: `widget_create_contact`).
- `SUPABASE_SERVICE_ROLE_KEY` jamás llega al bundle cliente. Solo Edge Functions y API routes server-only.
- `anon` role no recibe SELECT en ninguna tabla de negocio. Confirmado: migraciones actuales no le dan.
- Ninguna página pública lee/escribe con `org_id` hardcoded. El org se resuelve server-side vía slug o se expone solo via RPC.
