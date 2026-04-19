"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { useMotionInitial } from "@/lib/motion-safe";
import { useT } from "@/i18n/provider";

/**
 * Stats strip — no box, no background band.  Numbers sit on the page
 * with hairline separators; counters tick up on enter.
 */
type Stat = {
  valueTo: number;
  suffix: string;
  labelKey: keyof ReturnType<typeof useT>["stats"];
  decimals?: number;
};

const stats: Stat[] = [
  { valueTo: 2800, suffix: "+", labelKey: "leads" },
  { valueTo: 12,   suffix: "h", labelKey: "saved" },
  { valueTo: 1.2,  suffix: "s", labelKey: "response", decimals: 1 },
  { valueTo: 99.9, suffix: "%", labelKey: "uptime",   decimals: 1 },
];

export default function SocialProof() {
  const t = useT();
  const mInit = useMotionInitial();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        <FadeIn className="mb-10 md:mb-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
            Signal, not hype
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.labelKey}
              initial={mInit({ opacity: 0, y: 18, filter: "blur(10px)" })}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col gap-2 px-6 first:pl-0 md:px-8 md:first:pl-0"
            >
              <AnimatedValue
                to={s.valueTo}
                suffix={s.suffix}
                decimals={s.decimals ?? 0}
                play={inView}
              />
              <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                {t.stats[s.labelKey]}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedValue({
  to,
  suffix,
  decimals,
  play,
}: {
  to: number;
  suffix: string;
  decimals: number;
  play: boolean;
}) {
  const mv = useMotionValue(0);
  const [text, setText] = React.useState("0");

  React.useEffect(() => {
    if (!play) return;
    const controls = animate(mv, to, {
      duration: 1.8,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: (v) => setText(v.toFixed(decimals)),
    });
    return controls.stop;
  }, [play, mv, to, decimals]);

  return (
    <span className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none tracking-[-0.02em] tabular-nums text-white">
      {text}
      <span className="text-white/40">{suffix}</span>
    </span>
  );
}
