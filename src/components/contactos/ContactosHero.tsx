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
  meta:        Array<{ label: string; value: string }>;
}

export default function ContactosHero({ eyebrow, headline_l1, headline_l2, sub, meta }: Props) {
  const rootRef = React.useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
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
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] pt-40 pb-32 md:pt-52 md:pb-40"
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
          className="font-sans font-medium text-[clamp(3.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-white text-balance"
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
        <ul
          data-reveal
          className="mt-20 grid grid-cols-2 gap-y-8 gap-x-8 md:mt-28 md:grid-cols-4 md:gap-x-12"
        >
          {meta.map((item) => (
            <li key={item.label} className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]">
                {item.label}
              </span>
              <span className="font-sans text-base leading-snug text-[var(--color-ink-text-primary)] md:text-lg">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
