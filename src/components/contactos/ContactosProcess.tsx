"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Props {
  eyebrow: string;
  title: string;
  steps: Array<{ num: string; title: string; body: string }>;
}

export default function ContactosProcess({ eyebrow, title, steps }: Props) {
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

          gsap.from(root.querySelectorAll("[data-reveal='process-head']"), {
            y: 28,
            opacity: 0,
            filter: "blur(6px)",
            duration: 1.0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 78%" },
          });

          root.querySelectorAll<HTMLElement>("[data-reveal='process-step']").forEach((step, i) => {
            gsap.from(step, {
              y: 40,
              opacity: 0,
              filter: "blur(8px)",
              duration: 1.05,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 85%" },
            });
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
        <div className="mb-16 grid grid-cols-12 gap-6 md:mb-24">
          <div className="col-span-12 md:col-span-9">
            <p
              data-reveal="process-head"
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
            >
              {eyebrow}
            </p>
            <h2
              data-reveal="process-head"
              className="font-sans font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em] text-white text-balance"
            >
              {title}
            </h2>
          </div>
        </div>

        <ol className="flex flex-col">
          {steps.map((step) => (
            <li
              key={step.num}
              data-reveal="process-step"
              className="group relative grid grid-cols-12 items-baseline gap-6 border-t border-[var(--color-hairline)] py-8 md:py-10"
            >
              <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-faint)] md:col-span-1">
                {step.num}
              </span>
              <div className="col-span-10 md:col-span-11">
                <h3 className="mb-3 font-sans text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-snug tracking-[-0.01em] text-white md:mb-4">
                  {step.title}
                </h3>
                <p className="max-w-2xl font-sans text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
