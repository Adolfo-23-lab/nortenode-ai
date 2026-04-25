"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Capability {
  title_v2: string;
  desc_v2:  string;
}

interface Props {
  title: string;
  items: ReadonlyArray<Capability>;
}

export default function SolucoesCapabilitiesV2({ title, items }: Props) {
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

          gsap.from(root.querySelectorAll("[data-reveal='cap-head']"), {
            y: 24,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%" },
          });

          root.querySelectorAll<HTMLElement>("[data-reveal='cap-row']").forEach((row, i) => {
            gsap.from(row, {
              y: 28,
              opacity: 0,
              filter: "blur(6px)",
              duration: 0.9,
              delay: i * 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 88%" },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-[var(--color-bg-v2)] py-[120px]">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <p data-reveal="cap-head" className="mono-label-v2">
          [ CAPABILITIES ]
        </p>
        <h2
          data-reveal="cap-head"
          className="mt-6 max-w-[20ch] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "48px" }}
        >
          {title}
        </h2>

        <ul className="mt-[60px] flex flex-col">
          {items.map((it, i) => (
            <li
              key={i}
              data-reveal="cap-row"
              className="flex flex-col gap-3 border-t border-[var(--color-border-v2)] py-6 md:flex-row md:items-baseline md:gap-6 md:py-8"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[var(--color-accent-v2)] shrink-0"
                style={{ fontSize: "24px", width: "48px", lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-6 w-px self-stretch bg-[var(--color-border-strong-v2)] md:inline-block"
              />
              <div className="flex-1 md:flex md:flex-row md:items-baseline md:gap-6">
                <h3
                  className="shrink-0 font-medium text-[var(--color-text-primary-v2)] md:w-[260px]"
                  style={{ fontSize: "18px", lineHeight: 1.3 }}
                >
                  {it.title_v2}
                </h3>
                <p
                  className="mt-2 max-w-[70ch] text-[var(--color-text-secondary-v2)] md:mt-0 md:flex-1"
                  style={{ fontSize: "14px", lineHeight: 1.55 }}
                >
                  {it.desc_v2}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
