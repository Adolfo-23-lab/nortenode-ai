"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Props {
  eyebrow: string;
  title:   string;
  body:    string[];
}

export default function QuemSomosManifesto({ eyebrow, title, body }: Props) {
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
          <div className="col-span-12 md:col-span-9">
            <p
              data-reveal
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
            >
              {eyebrow}
            </p>
            <h2
              data-reveal
              className="mb-14 font-sans font-medium text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.015em] text-white text-balance md:mb-20"
            >
              {title}
            </h2>
            <div className="flex flex-col gap-8 md:gap-10">
              {body.map((paragraph, idx) => (
                <p
                  key={idx}
                  data-reveal
                  className={
                    idx === 0
                      ? "font-sans text-lg leading-relaxed text-[var(--color-ink-text-primary)] md:text-xl"
                      : "font-sans text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
