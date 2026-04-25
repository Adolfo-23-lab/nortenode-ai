"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  subhead: string;
  items:   ReadonlyArray<string>;
  note:    string;
}

export default function WhatsAppIntegrations({ subhead, items, note }: Props) {
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
            stagger: 0.08,
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
    <section ref={rootRef} className="bg-[var(--color-bg-v2)] py-[100px]">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <p data-reveal className="mono-label-v2">
          [ INTEGRATIONS ]
        </p>
        <p
          data-reveal
          className="mt-6 max-w-[60ch] text-[var(--color-text-secondary-v2)]"
          style={{ fontSize: "16px", lineHeight: 1.55 }}
        >
          {subhead}
        </p>
        <ul data-reveal className="mt-10 flex flex-wrap gap-3">
          {items.map((name) => (
            <li key={name}>
              <span
                className="inline-block rounded-[var(--radius-v2)] border border-[var(--color-border-strong-v2)] px-4 py-2 text-[var(--color-text-secondary-v2)] transition-colors hover:border-[var(--color-accent-v2)] hover:text-[var(--color-text-primary-v2)]"
                style={{ fontSize: "14px" }}
              >
                {name}
              </span>
            </li>
          ))}
        </ul>
        <p
          data-reveal
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]"
        >
          {note}
        </p>
      </div>
    </section>
  );
}
