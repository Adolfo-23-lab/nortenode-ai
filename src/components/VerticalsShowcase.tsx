"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Scissors, Hammer, Brush, Dumbbell } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { TextReveal } from "@/components/motion/TextReveal";
import { useT } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * "Vapor" vertical showcase.  No bento boxes.  Cards are just a 1px
 * semi-transparent border that reveals the underlying vertical's video
 * on hover — blurred at rest, crystal sharp + 1.05 zoom on hover.
 */
type VerticalCard = {
  key: "barbershop" | "tattoo" | "locksmith" | "gym";
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  video: string;
  accent: string;
};

const cards: VerticalCard[] = [
  { key: "barbershop", icon: Scissors, video: "/assets/Barber%C3%ADa.mp4",         accent: "rgba(47,130,247,0.75)" },
  { key: "tattoo",     icon: Brush,    video: "/assets/spa%2C_beauty_salon.mp4",   accent: "rgba(240,106,46,0.65)" },
  { key: "locksmith",  icon: Hammer,   video: "/assets/Serralharia.mp4",           accent: "rgba(52,211,153,0.6)"  },
  { key: "gym",        icon: Dumbbell, video: "/assets/metal%20fondo.mp4",         accent: "rgba(126,87,255,0.6)"  },
];

export default function VerticalsShowcase() {
  const t = useT();

  return (
    <section
      id="verticals"
      className="relative overflow-hidden py-32 md:py-44"
    >
      {/* Very subtle background aura — no hard edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[50%] -translate-y-1/2 opacity-60 blur-[120px]"
        style={{
          background: "radial-gradient(60% 60% at 50% 50%, rgba(47,130,247,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        {/* Header — editorial, no badges */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-[1.2fr_1fr] md:items-end">
          <FadeIn>
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.verticals.eyebrow}
            </p>
            <TextReveal
              whileInView
              as="h2"
              text={t.verticals.title}
              className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em] text-white"
            />
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="max-w-md text-base leading-relaxed text-white/55 md:text-right md:ml-auto">
              {t.verticals.sub}
            </p>
          </FadeIn>
        </div>

        {/* Staggered asymmetric layout — no grid of equal boxes */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-10 md:gap-y-16">
          <div className="md:col-span-7">
            <VaporCard
              card={cards[0]}
              name={t.verticals.barbershop.name}
              tag={t.verticals.barbershop.tag}
              size="xl"
            />
          </div>
          <div className="md:col-span-5 md:mt-16">
            <VaporCard
              card={cards[1]}
              name={t.verticals.tattoo.name}
              tag={t.verticals.tattoo.tag}
              size="md"
            />
          </div>
          <div className="md:col-span-5">
            <VaporCard
              card={cards[2]}
              name={t.verticals.locksmith.name}
              tag={t.verticals.locksmith.tag}
              size="md"
            />
          </div>
          <div className="md:col-span-7 md:mt-12">
            <VaporCard
              card={cards[3]}
              name={t.verticals.gym.name}
              tag={t.verticals.gym.tag}
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== *
 * VaporCard — 1px border, transparent body, video reveals on hover.
 * =================================================================== */
function VaporCard({
  card,
  name,
  tag,
  size,
}: {
  card: VerticalCard;
  name: string;
  tag: string;
  size: "md" | "lg" | "xl";
}) {
  const reduce = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  // 3D tilt on cursor
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rX = useSpring(useTransform(mvY, [-0.5, 0.5], [ 4, -4]), { stiffness: 180, damping: 22 });
  const rY = useSpring(useTransform(mvX, [-0.5, 0.5], [-5,  5]), { stiffness: 180, damping: 22 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mvX.set((e.clientX - (r.left + r.width / 2))  / r.width);
    mvY.set((e.clientY - (r.top  + r.height / 2)) / r.height);
  }
  function onLeave() {
    mvX.set(0); mvY.set(0);
    setHovered(false);
  }

  // Pause video when not on screen (battery)
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? el.play().catch(() => {}) : el.pause(); },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Icon = card.icon;
  const heights = { md: "h-[320px]", lg: "h-[380px]", xl: "h-[480px]" };

  return (
    <FadeIn>
      <motion.article
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX: reduce ? 0 : rX,
          rotateY: reduce ? 0 : rY,
          transformStyle: "preserve-3d",
          transformPerspective: 1400,
        }}
        className={cn(
          "group relative isolate w-full overflow-hidden rounded-[28px] border border-white/[0.10] transition-[border-color,transform] duration-500",
          heights[size],
          hovered && "border-white/25",
        )}
      >
        {/* Video layer */}
        <motion.video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          src={card.video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onLoadedData={() => setReady(true)}
          animate={{
            filter: hovered ? "blur(0px) brightness(1)" : "blur(14px) brightness(0.55)",
            scale:  hovered ? 1.05 : 1.0,
            opacity: ready ? 1 : 0,
          }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        />

        {/* Dark gradient for text readability */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          animate={{
            background: hovered
              ? "linear-gradient(180deg, rgba(5,6,10,0.15) 0%, rgba(5,6,10,0.55) 60%, rgba(5,6,10,0.92) 100%)"
              : "linear-gradient(180deg, rgba(5,6,10,0.55) 0%, rgba(5,6,10,0.80) 60%, rgba(5,6,10,0.95) 100%)",
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Colored accent halo on hover */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 -z-10 blur-3xl"
          animate={{ opacity: hovered ? 0.55 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ background: `radial-gradient(60% 60% at 50% 50%, ${card.accent} 0%, transparent 70%)` }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/85 backdrop-blur-sm">
              <Icon size={16} strokeWidth={1.75} />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/50">
              NorteNode
            </span>
          </div>

          <div className="max-w-lg">
            <motion.h3
              className={cn(
                "font-display leading-[0.98] tracking-[-0.02em] text-white",
                size === "xl" ? "text-[clamp(2.5rem,5vw,4.5rem)]"
                              : size === "lg" ? "text-[clamp(2.25rem,4vw,3.5rem)]"
                                               : "text-[clamp(1.75rem,3vw,2.75rem)]",
              )}
              animate={{ y: hovered ? -4 : 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              {name}
            </motion.h3>
            <motion.p
              className={cn(
                "mt-3 text-white/65",
                size === "xl" ? "text-base md:text-lg" : "text-sm md:text-base",
              )}
              animate={{ opacity: hovered ? 1 : 0.75 }}
              transition={{ duration: 0.5 }}
            >
              {tag}
            </motion.p>
          </div>
        </div>
      </motion.article>
    </FadeIn>
  );
}
