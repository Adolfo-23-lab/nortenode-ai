"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Closing full-bleed CTA shared by /solucoes/* pages.
 *
 * Structural twin of the home FinalCTA: ink-0 canvas, radial
 * signal-blue glow bottom-left for depth, asymmetric 12-col grid with
 * copy anchored left and dual CTAs (snow fill + ghost 15% border).
 */
export default function SolucoesFinalCTA({
  eyebrow,
  headline,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow: string;
  headline: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
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
            gsap.set(root.querySelectorAll("[data-cta-parallax]"), { clearProps: "all" });
            return;
          }

          gsap.from(root.querySelectorAll("[data-reveal]"), {
            y: 36,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 72%" },
          });

          gsap.to(root.querySelector("[data-cta-parallax]"), {
            yPercent: -12,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
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
      aria-label={headline}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] py-36 md:py-52"
    >
      <div
        aria-hidden="true"
        data-cta-parallax
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(60% 80% at 15% 100%, rgba(47,130,247,0.10),  transparent 55%)," +
            "radial-gradient(40% 60% at 92% 0%,   rgba(255,255,255,0.025), transparent 60%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            <p
              data-reveal="final-cta-eyebrow"
              className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
            >
              {eyebrow}
            </p>

            <h2
              data-reveal="final-cta-headline"
              className="mb-12 font-sans text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.025em] text-white text-balance"
            >
              {headline}
            </h2>

            <div
              data-reveal="final-cta-actions"
              className="flex flex-wrap items-center gap-5"
            >
              <Link
                href={primaryHref}
                className="group inline-flex items-center gap-2 rounded bg-[color:var(--color-snow)] px-7 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-[color:var(--color-ink-100)] transition-colors hover:bg-white"
              >
                {primaryLabel}
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={secondaryHref}
                className="group inline-flex items-center gap-2 rounded border border-white/15 px-7 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                {secondaryLabel}
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
