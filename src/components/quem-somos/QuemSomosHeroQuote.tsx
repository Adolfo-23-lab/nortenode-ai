"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  quote:       string;
  attribution: string;
}

export default function QuemSomosHeroQuote({ quote, attribution }: Props) {
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
            y: 32,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const lines = quote.split("\n");

  return (
    <section
      ref={rootRef}
      aria-label="ABOUT"
      className="relative bg-[var(--color-bg-v2)] pt-[160px] pb-[120px] md:pt-[200px]"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <p data-reveal className="mono-label-v2">
          04 / 06 — ABOUT
        </p>
        <blockquote
          data-reveal
          className="mt-[120px] text-[var(--color-text-primary-v2)]"
          style={{
            fontFamily: "var(--font-serif-v2)",
            fontStyle:  "italic",
            fontWeight: 400,
            fontSize:   "clamp(36px, 5vw, 56px)",
            lineHeight: 1.2,
          }}
        >
          {lines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </blockquote>
        <p
          data-reveal
          className="mt-10 font-sans text-[14px] text-[var(--color-text-muted-v2)]"
        >
          {attribution}
        </p>
      </div>
    </section>
  );
}
