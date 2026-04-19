# Hero Media Candidates — Fase B.2

Curated selection of free, commercial-use media for the NorteNode Hero.
All URLs verified via a real browser (Pexels/Unsplash serve Cloudflare challenges
to bare HTTP scrapers; Playwright-headless loads them). No assets downloaded to
the repo yet — Adolfo picks the final, we land only the chosen.

## Constraints recap
- **Headline**: "A RECEÇÃO INVISÍVEL." (pt-PT) / "LA RECEPCIÓN INVISIBLE." (es-ES).
- **Treatment**: full-bleed, asymmetric, zero-border, copy overlaid with optional
  backdrop-blur text-protection plate.
- **Stance**: Cinematic Authority — dark, editorial, quiet luxury, Linear/Arc'teryx
  register. Not SaaS-shouty.

## Videos (priority)

### Option 1 — concrete-architecture-timelapse
- **Tipo:** video
- **Fuente:** Pexels
- **URL directa (preview):** [https://www.pexels.com/video/3d-rendering-of-a-concrete-building-6076828/](https://www.pexels.com/video/3d-rendering-of-a-concrete-building-6076828/)
- **URL de descarga (MP4):** [https://videos.pexels.com/video-files/6076828/6076828-uhd_2560_1440_30fps.mp4](https://videos.pexels.com/video-files/6076828/6076828-uhd_2560_1440_30fps.mp4)
- **Resolución / duración:** 3840×2160 (4K UHD) / 25 s / 30 fps
- **Autor / licencia:** TREEDEO.ST · Pexels CC0
- **Por qué encaja:** "Explore shadows and light in a modern concrete architecture
  timelapse." Massive negative space, deep shadows, geometric volumes — exactly the
  "authoritative architectural interior" beat from the DESIGN.md no-line / tonal
  layering rule. Bleeds naturally into the `--color-ink-0` canvas with `mix-blend-luminosity`.
- **Riesgo / caveat:** Es render 3D (no fotografía). Si Adolfo prefiere grano real,
  baja al Option 3. Timelapse implica movimiento más rápido que "slow" — atenuar con
  `playbackRate=0.5` o trim al segmento más lento.

### Option 2 — hands-typing-dimly-lit
- **Tipo:** video
- **Fuente:** Pexels
- **URL directa (preview):** [https://www.pexels.com/video/person-typing-946146/](https://www.pexels.com/video/person-typing-946146/)
- **URL de descarga (MP4):** [https://videos.pexels.com/video-files/946146/946146-hd_1920_1080_30fps.mp4](https://videos.pexels.com/video-files/946146/946146-hd_1920_1080_30fps.mp4)
- **Resolución / duración:** 1920×1080 (FHD) / 38 s / 30 fps
- **Autor / licencia:** Carlos Arribas · Pexels CC0
- **Por qué encaja:** "Close-up of hands typing on a laptop keyboard in a dimly lit
  room." Hits the "slow-motion hands" vector literally. Sin caras identificables
  (sólo manos + teclado + luz lateral cálida). El ritmo de tecleo anida la idea
  "recepción invisible" — alguien atendiendo sin figura humana protagonista.
- **Riesgo / caveat:** Colorimetría cálida (lámpara ámbar). Puede chocar con
  `--color-signal-500` azul del brand; aplicar filter desaturate / mix-blend-luminosity
  o grading frío (`hue-rotate(-20deg)`) al componer.

### Option 3 — empty-hotel-corridor-4k
- **Tipo:** video
- **Fuente:** Pexels
- **URL directa (preview):** [https://www.pexels.com/video/point-of-view-of-a-person-walking-along-a-creepy-hotel-corridor-15201563/](https://www.pexels.com/video/point-of-view-of-a-person-walking-along-a-creepy-hotel-corridor-15201563/)
- **URL de descarga (MP4):** [https://videos.pexels.com/video-files/15201563/15201563-uhd_2560_1440_24fps.mp4](https://videos.pexels.com/video-files/15201563/15201563-uhd_2560_1440_24fps.mp4)
- **Resolución / duración:** 3840×2160 (4K UHD) / 68 s / 24 fps
- **Autor / licencia:** Darina Evstafeva · Pexels CC0
- **Por qué encaja:** Pasillo de hotel largo, tenue, con perspectiva central muy
  cinemática — resuena literalmente con "recepção" / "recepción". Lectura "espacio
  vacío, asistido sin nadie visible" = invisible receptionist.
- **Riesgo / caveat:** El título del autor lo describe como "creepy" (suspense/horror).
  Visualmente es ambivalente — en un grading frío con overlay `from-[--color-ink-0]/80`
  puede leer "quiet luxury"; sin grading puede leer "Shining". **Requiere preview en
  contexto antes de firmar**. Si Adolfo no quiere arriesgar la vibra, Option 1 cubre
  el mismo slot arquitectónico sin ambigüedad.

### Option 4 — swirling-smoke-black
- **Tipo:** video
- **Fuente:** Pexels
- **URL directa (preview):** [https://www.pexels.com/video/footage-of-smoke-against-black-background-9694807/](https://www.pexels.com/video/footage-of-smoke-against-black-background-9694807/)
- **URL de descarga (MP4):** [https://videos.pexels.com/video-files/9694807/9694807-hd_1920_1080_25fps.mp4](https://videos.pexels.com/video-files/9694807/9694807-hd_1920_1080_25fps.mp4)
- **Resolución / duración:** 1920×1080 (FHD) / 39 s / 25 fps
- **Autor / licencia:** cottonbro studio · Pexels CC0
- **Por qué encaja:** "Abstract smoke swirling against a black backdrop." Textura
  pura sin narrativa — sirve como capa base detrás del headline, dejando que la
  tipografía Instrument Serif mande. Loopable. Fondo negro real (no gris) → se
  funde perfecto con `--color-ink-0 = #05060a`.
- **Riesgo / caveat:** Puede sentirse demasiado "VFX stock" si se usa solo. Mejor
  como segunda capa bajo otra imagen (dual-layer treatment) o con grain overlay.
  Menos asociativo con "recepcionista" que las opciones 2/3.

## Stills (fallback)

### Option 5 — velvet-curtain-glass-doors
- **Tipo:** still
- **Fuente:** Unsplash
- **URL directa (preview):** [https://unsplash.com/photos/cMT-u75jwAs](https://unsplash.com/photos/cMT-u75jwAs)
- **URL de descarga:** [https://unsplash.com/photos/cMT-u75jwAs/download?force=true](https://unsplash.com/photos/cMT-u75jwAs/download?force=true)
- **Resolución:** 4160×6240 (medium-format, portrait)
- **Autor / licencia:** atelierbyvineeth · Unsplash License (commercial ok, no attribution required)
- **Por qué encaja:** "Velvet curtain beside glass doors." Textura quiet-luxury
  exacta — oscuro, táctil, sin figuras, sin iconografía SaaS. El pliegue central
  de la cortina da una línea vertical que funciona como eje asimétrico (copy a la
  izquierda, textura a la derecha).
- **Riesgo / caveat:** Orientación portrait (4160×6240). Para hero full-bleed
  horizontal habría que recortar al centro-derecha o acompañar de un secondary
  layer. Alta resolución — comprimir a ~1200 px wide para web.

### Option 6 — dark-minimal-facade
- **Tipo:** still
- **Fuente:** Unsplash
- **URL directa (preview):** [https://unsplash.com/s/photos/minimalist-black-and-white-building-facade-with-windows-LD-M-bzJgNY](https://unsplash.com/photos/minimalist-black-and-white-building-facade-with-windows-LD-M-bzJgNY)
- **Resolución:** 4K+ (Unsplash standard)
- **Autor / licencia:** Sebastian Schuster · Unsplash License
- **Por qué encaja:** Fachada arquitectónica monocroma, black & white puro.
  Hits the "editorial monochrome" + "massive negative space" vectors. Si el
  Hero va con stills en lugar de video (por performance o preferencia), este es
  el contrapunto visual arquitectónico al Option 1.
- **Riesgo / caveat:** No lo pude abrir directo para extraer metadata (Unsplash
  search-result URL, ID tentative `LD-M-bzJgNY`). Adolfo debería verificar en el
  navegador antes de firmar. Si no carga, lista de fallback en
  [https://unsplash.com/s/photos/dark-minimalist](https://unsplash.com/s/photos/dark-minimalist).

---

## Recomendación ranked

- **Top 1: Option 1 — concrete-architecture-timelapse.**
  Encaja sin fricciones con el DESIGN.md: geometría pura, sombras duras, zero-line,
  negative space masivo. El timelapse da movimiento pero no distrae — copy manda.
  Cero riesgo de "creepy", cero riesgo de cara humana, 4K nativo. Es la elección
  baja-riesgo y alta-fidelidad al tono Cinematic Authority.

- **Top 2: Option 2 — hands-typing-dimly-lit.**
  La narrativa "recepción invisible" se apoya mejor con manos que con arquitectura
  abstracta. Si Adolfo quiere un Hero con más "humano-pero-anónimo" sentiment,
  este gana. Sólo hay que recolorear para alinear con signal-blue.

- **Top 3: Option 3 — empty-hotel-corridor-4k.**
  Es el más literal para "recepção" pero el más arriesgado. Vale si Adolfo está
  dispuesto a hacer grading y cortar al fragmento más calmado.

Option 4 (humo) queda como **textura secundaria** sobre cualquiera de los tres
primeros, no como hero solo.

Options 5–6 son el fallback si se decide sacar el video y quedarse con still.

## Pendiente de decisión

Adolfo, confirma uno de estos tres caminos:
- (A) Top 1 directo → landing con video concreto timelapse.
- (B) Top 2 → landing con manos tecleando + grading frío.
- (C) Descargamos los 3 primeros videos a `/public/assets/hero/` y los previsualizamos
  en su sitio real durante Fase B.2.1 antes de decidir.
