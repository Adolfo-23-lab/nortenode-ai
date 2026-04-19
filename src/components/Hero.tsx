"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TextReveal } from "@/components/motion/TextReveal";
import { useT } from "@/i18n/provider";

/* -------------------------------------------------------------------
 * Rotating mock conversations, vertical by vertical.
 * ------------------------------------------------------------------- */
type MockMsg = { id: number; role: "user" | "assistant"; text: string };

const conversations: Record<string, { label: string; messages: MockMsg[] }> = {
  barbershop: {
    label: "Barbería · Porto",
    messages: [
      { id: 1, role: "assistant", text: "¡Hola! ¿En qué servicio estás pensando?" },
      { id: 2, role: "user",      text: "Un degradé para el sábado por la mañana." },
      { id: 3, role: "assistant", text: "Tengo 10:30 o 12:00. ¿Cuál te sirve?" },
      { id: 4, role: "user",      text: "10:30 perfecto." },
      { id: 5, role: "assistant", text: "✓ Reservado sábado 10:30 con Silva." },
    ],
  },
  tattoo: {
    label: "Tattoo Studio · Gaia",
    messages: [
      { id: 1, role: "assistant", text: "Bienvenida al studio. ¿Qué idea tienes?" },
      { id: 2, role: "user",      text: "Minimalista, 5cm, en el antebrazo." },
      { id: 3, role: "assistant", text: "¿Primera tatuaje? Reservo consulta gratis." },
      { id: 4, role: "user",      text: "Sí, primera." },
      { id: 5, role: "assistant", text: "✓ Jueves 18h. Te mando cuestionario ya." },
    ],
  },
  locksmith: {
    label: "Cerrajería 24h",
    messages: [
      { id: 1, role: "user",      text: "Me quedé fuera, estoy en Matosinhos." },
      { id: 2, role: "assistant", text: "Tranquilo. ¿Puerta normal o de seguridad?" },
      { id: 3, role: "user",      text: "De seguridad. Urgente." },
      { id: 4, role: "assistant", text: "✓ Técnico en camino. 18 min. 80€ base." },
    ],
  },
  gym: {
    label: "Gimnasio · VNG",
    messages: [
      { id: 1, role: "assistant", text: "¡Hola! ¿Buscas clase experimental?" },
      { id: 2, role: "user",      text: "Sí, quiero probar functional." },
      { id: 3, role: "assistant", text: "Mañana 19h libre. ¿Te reservo?" },
      { id: 4, role: "user",      text: "Dale." },
      { id: 5, role: "assistant", text: "✓ Mañana 19h. Te espero en recepción." },
    ],
  },
};

type VerticalKey = keyof typeof conversations;
const verticalOrder: VerticalKey[] = ["barbershop", "tattoo", "locksmith", "gym"];

/* =================================================================== */
export default function Hero() {
  const t = useT();
  const [idx, setIdx] = React.useState(0);
  const vertical = verticalOrder[idx];
  const reduce = useReducedMotion();

  // Parallax on the floating widget — ties its Y translate to scroll.
  const { scrollY } = useScroll();
  const widgetY = useTransform(scrollY, [0, 600], [0, -80]);

  // Rotate verticals every 7s
  React.useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % verticalOrder.length);
    }, 7_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* ──────── FULL-BLEED VIDEO BG ──────── */}
      <VideoLayer />

      {/* Soft readability mask — left 55% darker, right fades into video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background: `
            linear-gradient(90deg,
              rgba(5,6,10,0.92) 0%,
              rgba(5,6,10,0.78) 35%,
              rgba(5,6,10,0.45) 60%,
              rgba(5,6,10,0.30) 100%),
            linear-gradient(180deg,
              rgba(5,6,10,0.70) 0%,
              rgba(5,6,10,0.25) 30%,
              rgba(5,6,10,0.25) 70%,
              rgba(5,6,10,0.90) 100%)
          `,
        }}
      />

      {/* Extremely faint grid on top of the mask to add structure */}
      <div aria-hidden="true" className="grid-faint absolute inset-0 -z-[4] opacity-[0.35]" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-20 px-6 pt-40 pb-24 md:px-12 md:pt-48 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        {/* ╔══════════════════════  COPY  ══════════════════════╗ */}
        <div className="flex flex-col gap-8">
          {/* Eyebrow (no badge box — just a dot + micro text) */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center gap-3"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-signal-400)] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-signal-400)]" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              {t.common.badge_live} · {t.hero.eyebrow}
            </span>
          </motion.div>

          {/* Display headline — unboxed, huge, weight-200 serif */}
          <div className="relative">
            <TextReveal
              as="h1"
              text={t.hero.headline_l1}
              className="font-display text-[clamp(3.25rem,8.8vw,7.75rem)] leading-[0.92] tracking-[-0.02em] text-white"
              delay={0.1}
              stagger={0.04}
            />
            <TextReveal
              as="h1"
              text={t.hero.headline_l2}
              className="font-display text-[clamp(3.25rem,8.8vw,7.75rem)] leading-[0.92] tracking-[-0.02em] italic text-white/40"
              delay={0.22}
              stagger={0.04}
            />
            <TextReveal
              as="h1"
              text={t.hero.headline_l3}
              className="text-gradient font-display text-[clamp(3.25rem,8.8vw,7.75rem)] leading-[0.92] tracking-[-0.02em]"
              delay={0.34}
              stagger={0.04}
            />
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-xl text-[15px] leading-relaxed text-white/70 md:text-lg"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTAs + trust — no box, no separator bar */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.0, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6"
          >
            <MagneticButton strength={16} tilt={6}>
              <Button asChild size="xl" className="group">
                <Link href="/demo">
                  {t.common.cta_primary}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </MagneticButton>
            <Link
              href="/#pricing"
              className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <span className="relative">
                {t.common.cta_secondary}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.25 }}
            className="flex items-center gap-2 text-[11px] text-white/40"
          >
            <Check size={12} className="text-[color:var(--color-jade-400)]" />
            {t.hero.trust}
          </motion.p>
        </div>

        {/* ╔══════════  FLOATING 3D WIDGET  ══════════╗ */}
        <motion.div
          style={{ y: reduce ? 0 : widgetY }}
          className="relative mx-auto w-full max-w-[460px] lg:max-w-none"
        >
          <FloatingWidget verticalKey={vertical} verticals={verticalOrder} onDot={setIdx} activeIdx={idx} />
        </motion.div>
      </div>

      {/* Bottom vignette to blend into next section (no hard cut) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--color-ink-0)]"
      />
    </section>
  );
}

/* =================================================================== *
 * Full-bleed looping video, with pause-offscreen for battery.
 * =================================================================== */
function VideoLayer() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? el.play().catch(() => {}) : el.pause(); },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[var(--color-ink-0)]">
      <video
        ref={videoRef}
        className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 object-cover will-change-transform"
        src="/assets/AI_fondo2.mp4"
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
      />
      {/* Slight blue chromatic wash to match brand */}
      <div
        className="absolute inset-0 mix-blend-color"
        style={{ background: "linear-gradient(135deg, rgba(47,130,247,0.10), rgba(126,87,255,0.08))" }}
      />
    </div>
  );
}

/* =================================================================== *
 * Floating 3D glass widget — tilts in response to cursor, rotates
 * the displayed conversation with a fade cross-dissolve.
 * =================================================================== */
function FloatingWidget({
  verticalKey,
  verticals,
  activeIdx,
  onDot,
}: {
  verticalKey: VerticalKey;
  verticals: VerticalKey[];
  activeIdx: number;
  onDot: (i: number) => void;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  // Cursor-driven 3D tilt
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rX  = useSpring(useTransform(mvY, [-0.5, 0.5], [ 10, -10]), { stiffness: 180, damping: 22 });
  const rY  = useSpring(useTransform(mvX, [-0.5, 0.5], [-14,  14]), { stiffness: 180, damping: 22 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mvX.set((e.clientX - (r.left + r.width / 2))  / r.width);
    mvY.set((e.clientY - (r.top  + r.height / 2)) / r.height);
  }
  function handleLeave() { mvX.set(0); mvY.set(0); }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto w-full max-w-[440px]"
      style={{ perspective: 1600 }}
    >
      {/* Soft ambient glow under the widget */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(47,130,247,0.45) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{
          rotateX: reduce ? 0 : rX,
          rotateY: reduce ? 0 : rY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Glass frame — 1px borders, no solid fill (vapour feel) */}
        <div
          className="relative overflow-hidden rounded-[28px] border border-white/[0.12] will-change-transform"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.015) 100%)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.08) inset, 0 40px 80px -30px rgba(0,0,0,0.85), 0 0 80px -20px rgba(47,130,247,0.35)",
          }}
        >
          {/* Top thin bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3">
            <div className="flex items-center gap-2">
              <Sparkles size={11} className="text-[color:var(--color-signal-400)]" />
              <span className="text-[11px] tracking-[0.06em] text-white/65">
                NorteNode · {conversations[verticalKey].label}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            </div>
          </div>

          {/* Messages area with cross-fade on vertical change */}
          <div className="relative h-[380px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={verticalKey}
                initial={reduce ? false : { opacity: 0, filter: "blur(14px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{   opacity: 0, filter: "blur(14px)" }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0"
              >
                <ConversationStream key={verticalKey} verticalKey={verticalKey} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Input sliver */}
          <div className="border-t border-white/[0.08] px-5 py-3">
            <div className="flex items-center gap-2 text-[12px] text-white/35">
              <span className="flex-1">Escribe un mensaje...</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-signal-500)]/25">
                <ArrowRight size={11} className="text-[color:var(--color-signal-300)]" />
              </span>
            </div>
          </div>
        </div>

        {/* Dots — floating OUTSIDE the box, unboxed */}
        <div className="mt-7 flex items-center justify-center gap-2">
          {verticals.map((k, i) => (
            <button
              key={k}
              aria-label={`Show ${k}`}
              onClick={() => onDot(i)}
              className={`h-[2px] rounded-full transition-all duration-700 ${
                i === activeIdx
                  ? "w-10 bg-white/90"
                  : "w-4 bg-white/15 hover:bg-white/35"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* =================================================================== *
 * Auto-typing conversation.  Renders vertical-specific messages with
 * typing indicator and auto-loop.
 * =================================================================== */
function ConversationStream({ verticalKey }: { verticalKey: VerticalKey }) {
  const messages = conversations[verticalKey].messages;
  const [visible, setVisible] = React.useState(0);
  const [typing, setTyping]   = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    setVisible(0);
    setTyping(false);
    let i = 0;
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    function step() {
      if (i >= messages.length) return;
      const msg = messages[i];
      if (msg.role === "assistant") {
        setTyping(true);
        timers.push(setTimeout(() => {
          setTyping(false);
          setVisible(++i);
          timers.push(setTimeout(step, 1050));
        }, 820));
      } else {
        timers.push(setTimeout(() => {
          setVisible(++i);
          timers.push(setTimeout(step, 760));
        }, 320));
      }
    }

    timers.push(setTimeout(step, 450));
    return () => timers.forEach(clearTimeout);
  }, [verticalKey, messages]);

  return (
    <div className="flex h-full flex-col justify-end gap-2.5 p-5">
      {messages.map((msg, i) => (
        <motion.div
          key={msg.id}
          initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{
            opacity: i < visible ? 1 : 0,
            y:       i < visible ? 0 : 10,
            filter:  i < visible ? "blur(0px)" : "blur(6px)",
          }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
              msg.role === "user"
                ? "rounded-br-md bg-[color:var(--color-signal-500)] text-white"
                : "rounded-bl-md border border-white/[0.08] bg-white/[0.04] text-white/90"
            }`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}

      {typing && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.14 }}
                className="inline-block h-1.5 w-1.5 rounded-full bg-white/50"
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
