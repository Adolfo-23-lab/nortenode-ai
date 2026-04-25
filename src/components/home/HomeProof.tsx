"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  cohort: string;
}

export default function HomeProof({ cohort }: Props) {
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
            y: 24,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 85%" },
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
      aria-label="STATUS"
      className="relative bg-[var(--color-bg-v2)]"
    >
      <div className="hairline-v2" aria-hidden="true" />
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-12 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <div data-reveal className="flex items-center gap-6">
            <p className="mono-label-v2">02 / 06 — STATUS</p>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="dot-pulse-v2" />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-secondary-v2)]">
                LIVE
              </span>
            </div>
          </div>
          <p
            data-reveal
            className="max-w-[60ch] text-[var(--color-text-secondary-v2)]"
            style={{ fontSize: "var(--text-body-v2)" }}
          >
            {cohort}
          </p>
        </div>
      </div>
      <div className="hairline-v2" aria-hidden="true" />
    </section>
  );
}
