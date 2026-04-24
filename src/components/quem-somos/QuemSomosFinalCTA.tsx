"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Props {
  eyebrow:   string;
  title:     string;
  body:      string;
  cta_label: string;
  cta_href:  string;
}

export default function QuemSomosFinalCTA({ eyebrow, title, body, cta_label, cta_href }: Props) {
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
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%" },
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
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <p
              data-reveal
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
            >
              {eyebrow}
            </p>
            <h2
              data-reveal
              className="mb-8 font-sans font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em] text-white text-balance md:mb-10"
            >
              {title}
            </h2>
            <p
              data-reveal
              className="mb-12 max-w-xl font-sans text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg"
            >
              {body}
            </p>
            <div data-reveal>
              <Link
                href={cta_href}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-signal-500)] px-8 py-4 font-sans text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--color-signal-400)]"
              >
                {cta_label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
