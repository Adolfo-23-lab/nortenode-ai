"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  title: string;
  items: Array<{ desc_v2: string }>;
}

const PRODUCT_TITLES = ["WhatsApp Operator", "Web Widget", "Voice (beta)"];

export default function HomeProduct({ title, items }: Props) {
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

          gsap.from(root.querySelectorAll("[data-reveal='product-head']"), {
            y: 28,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 78%" },
          });

          root.querySelectorAll<HTMLElement>("[data-reveal='product-row']").forEach((row, i) => {
            gsap.from(row, {
              y: 32,
              opacity: 0,
              filter: "blur(6px)",
              duration: 0.95,
              delay: i * 0.08,
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

  const titleLines = title.split("\n");

  return (
    <section
      ref={rootRef}
      aria-label="PRODUCT"
      className="relative bg-[var(--color-bg-v2)] py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p data-reveal="product-head" className="mono-label-v2">
          03 / 06 — PRODUCT
        </p>
        <h2
          data-reveal="product-head"
          className="mt-10 font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "var(--text-headline-lg-v2)" }}
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>

        <ul className="mt-[80px] flex flex-col">
          {items.map((item, i) => (
            <li
              key={i}
              data-reveal="product-row"
              className="flex flex-col gap-3 border-t border-[var(--color-border-v2)] py-8 md:flex-row md:items-baseline md:gap-6 md:py-10"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[var(--color-accent-v2)] shrink-0"
                style={{ fontSize: "var(--text-body-sm-v2)", width: "32px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-medium text-[var(--color-text-primary-v2)] shrink-0 md:w-[220px]"
                style={{ fontSize: "var(--text-body-lg-v2)" }}
              >
                {PRODUCT_TITLES[i] ?? ""}
              </span>
              <span
                aria-hidden="true"
                className="hidden text-[var(--color-text-disabled-v2)] md:inline"
              >
                ——————
              </span>
              <p
                className="max-w-[50ch] text-[var(--color-text-secondary-v2)] md:flex-1"
                style={{ fontSize: "var(--text-body-v2)", lineHeight: 1.55 }}
              >
                {item.desc_v2}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
