"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  title: string;
  items: ReadonlyArray<FAQItem>;
}

export default function SolucoesFAQ({ title, items }: Props) {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

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
            scrollTrigger: { trigger: root, start: "top 80%" },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-[var(--color-bg-v2)] py-[120px]">
      <div className="mx-auto w-full max-w-[900px] px-6 md:px-12">
        <p data-reveal className="mono-label-v2">
          [ QUESTIONS ]
        </p>
        <h2
          data-reveal
          className="mt-6 font-medium leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "36px" }}
        >
          {title}
        </h2>

        <ul className="mt-[60px] flex flex-col">
          {items.map((it, i) => {
            const open = openIdx === i;
            return (
              <li
                key={i}
                data-reveal
                className="border-t border-[var(--color-border-v2)] last:border-b last:border-b-[var(--color-border-v2)]"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--color-text-primary-v2)]"
                >
                  <span
                    className="font-medium text-[var(--color-text-primary-v2)]"
                    style={{ fontSize: "18px", lineHeight: 1.3 }}
                  >
                    {it.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-[var(--color-accent-v2)] transition-transform"
                    style={{ fontSize: "24px", lineHeight: 1, transform: open ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <p
                    className="max-w-[70ch] pb-6 text-[var(--color-text-secondary-v2)]"
                    style={{ fontSize: "14px", lineHeight: 1.6 }}
                  >
                    {it.a}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
