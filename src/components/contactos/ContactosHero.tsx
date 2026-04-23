"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Props {
  eyebrow:     string;
  headline_l1: string;
  headline_l2: string;
  sub:         string;
}

export default function ContactosHero({ eyebrow, headline_l1, headline_l2, sub }: Props) {
  const rootRef = React.useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add(
        {
          isMotion:  "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isMotion } = ctx.conditions as { isMotion: boolean };
          const root = rootRef.current;
          if (!root) return;

          if (!isMotion) {
            gsap.set(root.querySelectorAll("[data-reveal]"), { clearProps: "all" });
            return;
          }

          gsap.from(root.querySelectorAll("[data-reveal]"), {
            y: 40,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.1,
            stagger: 0.14,
            ease: "power3.out",
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-label={eyebrow}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] pt-40 pb-24 md:pt-56 md:pb-40"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p
          data-reveal
          className="mb-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
        >
          {eyebrow}
        </p>
        <h1
          data-reveal
          className="font-[var(--font-display)] text-[clamp(3.5rem,12vw,11rem)] font-normal italic leading-[0.88] tracking-[-0.015em] text-white"
        >
          <span className="block">{headline_l1}</span>
          {headline_l2 ? <span className="block text-[var(--color-ink-text-muted)]">{headline_l2}</span> : null}
        </h1>
        <p
          data-reveal
          className="mt-14 max-w-md font-sans text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg"
        >
          {sub}
        </p>
      </div>
    </section>
  );
}
