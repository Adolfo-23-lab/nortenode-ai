"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SpecBlock {
  label: string;
  value: string;
  desc:  string;
}

interface Props {
  items: ReadonlyArray<SpecBlock>;
}

export default function SolucoesSpecs({ items }: Props) {
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
            y: 24,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 85%" },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-[var(--color-bg-v2)] py-[80px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p data-reveal className="mono-label-v2 mb-12">
          [ SPECIFICATIONS ]
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {items.map((spec, i) => (
            <li key={i} data-reveal className="flex flex-col">
              <span className="mono-label-v2">{spec.label}</span>
              <span aria-hidden="true" className="mt-3 h-px w-full bg-[var(--color-border-v2)]" />
              <span
                className="mt-4 font-mono font-medium text-[var(--color-text-primary-v2)]"
                style={{ fontSize: "48px", lineHeight: 1 }}
              >
                {spec.value}
              </span>
              <span
                className="mt-4 text-[var(--color-text-secondary-v2)]"
                style={{ fontSize: "13px", lineHeight: 1.45 }}
              >
                {spec.desc}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
