"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ContactRow } from "@/i18n/dictionary";

interface Props {
  eyebrow: string;
  rows:    ContactRow[];
}

export default function ContactosDirectory({ eyebrow, rows }: Props) {
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

          gsap.from(root.querySelectorAll("[data-reveal='dir-eyebrow']"), {
            y: 24,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%" },
          });

          root.querySelectorAll<HTMLElement>("[data-reveal='dir-row']").forEach((row, i) => {
            gsap.from(row, {
              y: 32,
              opacity: 0,
              filter: "blur(8px)",
              duration: 1.0,
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

  return (
    <section
      ref={rootRef}
      aria-label={eyebrow}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p
          data-reveal="dir-eyebrow"
          className="mb-14 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)] md:mb-20"
        >
          {eyebrow}
        </p>

        <ul className="flex flex-col">
          {rows.map((row) => {
            const content = (
              <div
                data-reveal="dir-row"
                className="group relative grid grid-cols-12 items-baseline gap-6 py-6 md:py-8"
              >
                <span className="col-span-12 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)] md:col-span-3">
                  {row.label}
                </span>
                <span className="col-span-12 font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-normal leading-snug tracking-[-0.005em] text-[var(--color-ink-text-primary)] transition-colors duration-500 group-hover:text-white md:col-span-8">
                  {row.value}
                </span>
                {row.href ? (
                  <ArrowUpRight
                    aria-hidden
                    className="col-span-12 h-5 w-5 text-[var(--color-ink-text-faint)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white md:col-span-1 md:justify-self-end"
                  />
                ) : null}
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-[var(--color-hairline)] transition-opacity duration-500 group-hover:opacity-100 md:opacity-60"
                />
              </div>
            );

            if (row.href) {
              return (
                <li key={row.kind}>
                  <Link
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block"
                  >
                    {content}
                  </Link>
                </li>
              );
            }
            return (
              <li key={row.kind}>
                <div className="block cursor-default">{content}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
