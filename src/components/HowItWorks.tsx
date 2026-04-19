"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Bot, Bell } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { TextReveal } from "@/components/motion/TextReveal";
import { useT } from "@/i18n/provider";

/**
 * Editorial step reveal.  No cards, no boxes.  Each step is a row
 * where the step number floats huge on the side (serif display, low-opacity)
 * and the copy sits next to it.  As you scroll, the numbers drift up
 * at half-speed — subtle parallax.
 */
const iconByStep = [MessageCircle, Bot, Bell];
const accentByStep = [
  "var(--color-signal-400)",
  "var(--color-ember-400)",
  "var(--color-jade-400)",
];

export default function HowItWorks() {
  const t = useT();

  return (
    <section id="how" className="relative overflow-hidden py-32 md:py-48">
      {/* Hairline vertical rule running through everything (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)" }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        {/* Section heading */}
        <div className="mb-24 grid grid-cols-1 gap-6 md:mb-36 md:grid-cols-[1fr_0.8fr] md:items-end md:gap-20">
          <FadeIn>
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.how.eyebrow}
            </p>
            <TextReveal
              whileInView
              as="h2"
              text={t.how.title}
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.96] tracking-[-0.02em] text-white"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="max-w-md text-base leading-relaxed text-white/55">
              Tres pasos. La IA camina el 90% del recorrido; tú solo cierras
              cuando el contexto lo exige.
            </p>
          </FadeIn>
        </div>

        {/* Steps — alternating left/right editorial layout */}
        <div className="flex flex-col gap-28 md:gap-36">
          {t.how.steps.map((step, i) => (
            <Step
              key={step.n}
              index={i}
              number={step.n}
              title={step.title}
              body={step.body}
              Icon={iconByStep[i]}
              accent={accentByStep[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  number,
  title,
  body,
  Icon,
  accent,
}: {
  index: number;
  number: string;
  title: string;
  body: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  accent: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Ghost number drifts at half-speed — classic editorial parallax
  const numberY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.14, 0.14, 0]);

  // Alternate side: step 01 left, 02 right, 03 left...
  const reverse = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-24 ${
        reverse ? "md:[&>:first-child]:order-2" : ""
      }`}
    >
      {/* Ghost number behind the copy */}
      <motion.span
        aria-hidden="true"
        style={{ y: numberY, opacity: numberOpacity, color: accent }}
        className={`pointer-events-none absolute font-display text-[18vw] leading-none tracking-tighter ${
          reverse ? "right-0 md:-right-10" : "left-0 md:-left-10"
        } -top-8 md:-top-16 select-none`}
      >
        {number}
      </motion.span>

      {/* Copy column */}
      <FadeIn>
        <div className="relative max-w-lg">
          {/* Tiny accent dash + index label */}
          <div className="mb-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-10"
              style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
            />
            <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: accent }}>
              Step {number}
            </span>
          </div>

          <h3 className="font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.02em] text-white">
            {title}
          </h3>
          <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
            {body}
          </p>
        </div>
      </FadeIn>

      {/* Icon column — huge circular icon glow, unboxed */}
      <FadeIn delay={0.08}>
        <div className="relative flex items-center justify-center md:h-[280px]">
          <motion.div
            className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/[0.12] backdrop-blur-xl"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <Icon size={30} strokeWidth={1.5} />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0 blur-3xl"
            style={{ background: `radial-gradient(40% 40% at 50% 50%, ${accent} 0%, transparent 70%)`, opacity: 0.5 }}
          />
        </div>
      </FadeIn>
    </div>
  );
}
