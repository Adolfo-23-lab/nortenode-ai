"use client";

import * as React from "react";

/**
 * Capabilities — 2-col editorial bullet list.
 *
 * Reused by both /solucoes/* pages.  Each row is a single line with
 * a mono bullet on the left and plain-text copy — no icons, no cards,
 * no hairline rules between items.  Rhythm comes from generous row
 * spacing and the 2-col grid collapse on mobile.
 */
export default function SolucoesCapabilities({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <section
      aria-label={title}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-50)] py-32 md:py-52"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-16 grid grid-cols-12 gap-6 md:mb-24">
          <div className="col-span-12 md:col-span-9">
            <p
              data-reveal="capabilities-eyebrow"
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
            >
              {eyebrow}
            </p>
            <h2
              data-reveal="capabilities-title"
              className="font-sans text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white text-balance"
            >
              {title}
            </h2>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2 md:gap-y-10">
          {items.map((item, i) => (
            <li
              key={i}
              data-reveal="capability-item"
              className="flex items-baseline gap-4"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base leading-relaxed text-white/75 md:text-lg">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
