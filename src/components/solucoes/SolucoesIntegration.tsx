"use client";

import * as React from "react";

/**
 * Integration — 3 numbered steps.
 *
 * Reused by both /solucoes/* pages.  Each step is raw editorial copy
 * beside a mono numeral — no card, no background shift between items,
 * no divider.  Vertical rhythm (gap-20) carries the separation.
 */
export default function SolucoesIntegration({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: Array<{ num: string; title: string; body: string }>;
}) {
  return (
    <section
      aria-label={title}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] py-32 md:py-52"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-20 grid grid-cols-12 gap-6 md:mb-32">
          <div className="col-span-12 md:col-span-9">
            <p
              data-reveal="integration-eyebrow"
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
            >
              {eyebrow}
            </p>
            <h2
              data-reveal="integration-title"
              className="font-sans text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white text-balance"
            >
              {title}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {steps.map((step) => (
            <article
              key={step.num}
              data-reveal="integration-step"
              className="grid grid-cols-12 items-start gap-6"
            >
              <span className="col-span-12 font-mono text-[11px] uppercase tracking-[0.22em] text-white/35 md:col-span-1">
                {step.num}
              </span>
              <div className="col-span-12 md:col-span-10 md:col-start-3">
                <h3 className="mb-4 font-sans text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-white">
                  {step.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
