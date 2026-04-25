"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  title: string;
  items: ReadonlyArray<{ title: string; desc: string }>;
}

export default function QuemSomosPrinciples({ title, items }: Props) {
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

          gsap.from(root.querySelectorAll("[data-reveal='principle-head']"), {
            y: 28,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%" },
          });

          root.querySelectorAll<HTMLElement>("[data-reveal='principle']").forEach((p, i) => {
            gsap.from(p, {
              y: 32,
              opacity: 0,
              filter: "blur(6px)",
              duration: 1.0,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: p, start: "top 88%" },
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
      <div className="mx-auto w-full max-w-[900px] px-6 md:px-12">
        <h2
          data-reveal="principle-head"
          className="font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "var(--text-headline-lg-v2)" }}
        >
          {title}
        </h2>

        <ol className="mt-[80px] flex flex-col gap-12">
          {items.map((it, i) => (
            <li
              key={i}
              data-reveal="principle"
              className="flex flex-col items-start gap-x-8 gap-y-3 md:flex-row"
            >
              <span
                aria-hidden="true"
                className="shrink-0 font-mono font-normal text-[var(--color-text-muted-v2)]"
                style={{ fontSize: "96px", lineHeight: 0.9, width: "120px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h3
                  className="font-medium text-[var(--color-text-primary-v2)]"
                  style={{ fontSize: "var(--text-headline-sm-v2)", lineHeight: 1.15 }}
                >
                  {it.title}
                </h3>
                <p
                  className="mt-3 max-w-[55ch] text-[var(--color-text-secondary-v2)]"
                  style={{ fontSize: "var(--text-body-lg-v2)", lineHeight: 1.55 }}
                >
                  {it.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
