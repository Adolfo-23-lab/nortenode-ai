"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  title: string;
  steps: Array<{ title_v2: string; desc_v2: string }>;
}

export default function HomeProcess({ title, steps }: Props) {
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
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 78%" },
          });

          root.querySelectorAll<HTMLElement>("[data-reveal='process-step']").forEach((step, i) => {
            gsap.from(step, {
              y: 32,
              opacity: 0,
              filter: "blur(6px)",
              duration: 0.95,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 88%" },
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
      aria-label="PROCESS"
      className="relative bg-[var(--color-bg-v2)] py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p data-reveal="process-head" className="mono-label-v2">
          04 / 06 — PROCESS
        </p>
        <h2
          data-reveal="process-head"
          className="mt-10 max-w-[20ch] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "var(--text-headline-lg-v2)" }}
        >
          {title}
        </h2>

        <ol className="relative mt-[80px] flex flex-col">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <li
                key={i}
                data-reveal="process-step"
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[12px] top-8 bottom-0 w-px bg-[var(--color-accent-v2)] opacity-40"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="relative z-10 shrink-0 font-mono text-[var(--color-accent-v2)]"
                  style={{ fontSize: "24px", width: "48px", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="font-medium text-[var(--color-text-primary-v2)]"
                    style={{ fontSize: "24px", lineHeight: 1.2 }}
                  >
                    {step.title_v2}
                  </h3>
                  <p
                    className="mt-2 max-w-[60ch] text-[var(--color-text-secondary-v2)]"
                    style={{ fontSize: "var(--text-body-v2)", lineHeight: 1.55 }}
                  >
                    {step.desc_v2}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
