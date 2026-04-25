"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  final: {
    title_v2: string;
    sub_v2:   string;
    cta_v2:   string;
  };
}

export default function HomeFinal({ final }: Props) {
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
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 78%" },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const titleLines = final.title_v2.split("\n");

  return (
    <section
      ref={rootRef}
      aria-label="END"
      className="relative bg-[var(--color-bg-v2)] py-[160px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p data-reveal className="mono-label-v2">
          06 / 06 — END
        </p>
        <h2
          data-reveal
          className="mt-10 font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "var(--text-display-v2)" }}
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>
        <p
          data-reveal
          className="mt-12 max-w-[60ch] font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]"
        >
          {final.sub_v2}
        </p>
        <div data-reveal className="mt-12">
          <Link
            href="/contactos"
            className="inline-flex items-center justify-center rounded-[var(--radius-v2)] bg-white px-8 py-4 font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-[var(--color-bg-v2)] transition-shadow duration-200 hover:shadow-[var(--shadow-glow-soft-v2)]"
          >
            {final.cta_v2}
          </Link>
        </div>
      </div>
    </section>
  );
}
