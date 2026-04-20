"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  return (
    <section
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
