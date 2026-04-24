"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Props {
  eyebrow: string;
  title: string;
  items: Array<{ label: string; body: string }>;
}

export default function ContactosPosition({ eyebrow, title, items }: Props) {
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

          gsap.from(root.querySelectorAll("[data-reveal='position-head']"), {
            y: 24,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%" },
          });

          root.querySelectorAll<HTMLElement>("[data-reveal='position-item']").forEach((item, i) => {
            gsap.from(item, {
              y: 32,
              opacity: 0,
              filter: "blur(8px)",
              duration: 1.0,
              delay: i * 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 88%" },
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
              data-reveal="position-head"
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
            >
              {eyebrow}
            </p>
            <h2
              data-reveal="position-head"
              className="font-sans font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em] text-white text-balance"
            >
              {title}
            </h2>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <li
              key={item.label}
              data-reveal="position-item"
              className="flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-6 md:pt-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]">
                {item.label}
              </span>
              <p className="font-sans text-base leading-relaxed text-[var(--color-ink-text-primary)] md:text-lg">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
