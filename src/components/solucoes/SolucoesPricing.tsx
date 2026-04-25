"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  title:      string;
  paragraph1: string;
  paragraph2: string;
  ctaLabel:   string;
  ctaHref?:   string;
}

export default function SolucoesPricing({
  title, paragraph1, paragraph2, ctaLabel, ctaHref = "/contactos",
}: Props) {
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
            y: 28,
            opacity: 0,
            filter: "blur(6px)",
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
    <section ref={rootRef} className="bg-[var(--color-bg-v2)] py-[120px]">
      <div className="mx-auto w-full max-w-[900px] px-6 md:px-12">
        <p data-reveal className="mono-label-v2">
          [ PRICING ]
        </p>
        <h2
          data-reveal
          className="mt-6 font-medium leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "48px" }}
        >
          {title}
        </h2>

        <div className="mt-10 flex flex-col gap-y-4">
          <p
            data-reveal
            className="max-w-[60ch] text-[var(--color-text-secondary-v2)]"
            style={{ fontSize: "18px", lineHeight: 1.55 }}
          >
            {paragraph1}
          </p>
          <p
            data-reveal
            className="max-w-[60ch] text-[var(--color-text-secondary-v2)]"
            style={{ fontSize: "18px", lineHeight: 1.55 }}
          >
            {paragraph2}
          </p>
        </div>

        <div data-reveal className="mt-10">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-[var(--radius-v2)] bg-white px-8 py-4 font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-[var(--color-bg-v2)] transition-shadow duration-200 hover:shadow-[var(--shadow-glow-soft-v2)]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
