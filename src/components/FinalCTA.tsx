"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useT } from "@/i18n/provider";

/**
 * FinalCTA — closing full-bleed block.
 *
 * Bookends the Hero: same ink-0 canvas, asymmetric 12-col grid, copy
 * bound to the left, CTAs anchored below with massive negative space
 * bridging into the Footer.  No video, no card — tonal radial glows
 * provide the only depth cue (parallax in B.2b.5).
 */
export default function FinalCTA() {
  const t = useT();
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
          const { isMotion } = ctx.conditions as { isMotion: boolean; isReduced: boolean };
          const root = rootRef.current;
          if (!root) return;

          if (!isMotion) {
            gsap.set(root.querySelectorAll("[data-reveal]"), { clearProps: "all" });
            gsap.set(root.querySelectorAll("[data-cta-parallax]"), { clearProps: "all" });
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

          // Parallax on the radial-glow backdrop.
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
      aria-label={t.cta.headline}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] py-40 md:py-56"
    >
      {/* Parallax background — will be driven by GSAP in B.2b.5. */}
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
              data-reveal="cta-eyebrow"
              className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
            >
              {t.cta.eyebrow}
            </p>

            <h2
              data-reveal="cta-headline"
              className="mb-14 font-sans text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.025em] text-white text-balance"
            >
              {t.cta.headline}
            </h2>

            <div
              data-reveal="cta-actions"
              className="flex flex-wrap items-center gap-5"
            >
              <Link
                href="/contactos"
                className="group inline-flex items-center gap-2 rounded bg-[color:var(--color-snow)] px-7 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-[color:var(--color-ink-100)] transition-colors hover:bg-white"
              >
                {t.cta.primary}
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 rounded border border-[var(--color-ghost-border)] px-7 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-[var(--color-ink-text-primary)] transition-colors hover:border-[var(--color-ghost-border-hover)] hover:text-white"
              >
                {t.cta.secondary}
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
