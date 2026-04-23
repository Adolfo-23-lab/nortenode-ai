"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

          gsap.from(root.querySelectorAll("[data-reveal='capabilities-eyebrow'],[data-reveal='capabilities-title']"), {
            y: 32,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 72%" },
          });

          gsap.from(root.querySelectorAll("[data-reveal='capability-item']"), {
            y: 20,
            opacity: 0,
            duration: 0.85,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 65%" },
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
      aria-label={title}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-50)] py-32 md:py-52"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-16 grid grid-cols-12 gap-6 md:mb-24">
          <div className="col-span-12 md:col-span-9">
            <p
              data-reveal="capabilities-eyebrow"
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
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
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-faint)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base leading-relaxed text-[var(--color-ink-text-primary)] md:text-lg">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
