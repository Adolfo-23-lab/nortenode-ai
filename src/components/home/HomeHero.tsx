"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  hero: {
    headline_v2: string;
    sub_v2:      string;
    cta_demo:    string;
    cta_talk:    string;
  };
}

export default function HomeHero({ hero }: Props) {
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
            stagger: 0.12,
            ease: "power3.out",
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const lines    = hero.headline_v2.split("\n");
  const lastLine = lines[lines.length - 1] ?? "";
  const lastEndsDot = lastLine.endsWith(".");
  const talkText = hero.cta_talk.replace(/\s*→\s*$/, "");

  return (
    <section
      ref={rootRef}
      aria-label="INDEX"
      className="relative bg-[var(--color-bg-v2)] min-h-[90vh] flex flex-col justify-center pt-[120px] pb-[80px] md:pt-[160px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p data-reveal className="mono-label-v2 text-left">
          01 / 06 — INDEX
        </p>

        <h1
          data-reveal
          className="mt-[80px] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--color-text-primary-v2)] text-balance"
          style={{ fontSize: "var(--text-display-lg-v2)" }}
        >
          {lines.map((line, i) => {
            const isLast = i === lines.length - 1;
            if (isLast && lastEndsDot) {
              return (
                <span key={i} className="block">
                  {line.slice(0, -1)}
                  <span className="cyan-period-v2">.</span>
                </span>
              );
            }
            return <span key={i} className="block">{line}</span>;
          })}
        </h1>

        <p
          data-reveal
          className="mt-[80px] max-w-[60ch] leading-relaxed text-[var(--color-text-secondary-v2)]"
          style={{ fontSize: "var(--text-body-lg-v2)" }}
        >
          {hero.sub_v2}
        </p>

        <div data-reveal className="mt-[60px] flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-[var(--radius-v2)] bg-white px-6 py-3.5 font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-[var(--color-bg-v2)] transition-shadow duration-200 hover:shadow-[var(--shadow-glow-soft-v2)]"
          >
            {hero.cta_demo}
          </Link>
          <Link
            href="/contactos"
            className="inline-flex items-center text-[14px] font-medium text-[var(--color-text-secondary-v2)] transition-colors hover:text-[var(--color-text-primary-v2)]"
          >
            {talkText}
            <span aria-hidden="true" className="ml-2 text-[var(--color-accent-v2)]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
