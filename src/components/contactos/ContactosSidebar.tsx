"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  what_happens_next_items: string[];
}

export default function ContactosSidebar({ what_happens_next_items }: Props) {
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
            scrollTrigger: { trigger: root, start: "top 80%" },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <aside ref={rootRef} className="flex w-full flex-col gap-y-8 lg:w-[320px] lg:gap-y-12">
      {/* Card 1 — DIRECT */}
      <div data-reveal>
        <p className="mono-label-v2">DIRECT</p>
        <div className="hairline-v2 mt-3" aria-hidden="true" />
        <dl className="mt-4 flex flex-col gap-3" style={{ fontSize: "var(--text-body-sm-v2)" }}>
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]">
              EMAIL
            </dt>
            <dd>
              <a
                href="mailto:contacto@nortenode.com"
                className="text-[var(--color-accent-v2)] transition-opacity hover:opacity-80"
              >
                contacto@nortenode.com
              </a>
            </dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]">
              PHONE
            </dt>
            <dd className="text-[var(--color-text-primary-v2)]">+351 937 809 995</dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]">
              OFFICE
            </dt>
            <dd className="text-[var(--color-text-primary-v2)]">Porto, Portugal</dd>
          </div>
        </dl>
      </div>

      {/* Card 2 — WHAT HAPPENS NEXT */}
      <div data-reveal>
        <p className="mono-label-v2">WHAT HAPPENS NEXT</p>
        <div className="hairline-v2 mt-3" aria-hidden="true" />
        <ul className="mt-4 flex flex-col gap-3">
          {what_happens_next_items.map((item, i) => (
            <li key={i} className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-[var(--color-accent-v2)]"
                style={{ fontSize: "var(--text-body-sm-v2)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[var(--color-text-secondary-v2)]"
                style={{ fontSize: "var(--text-body-sm-v2)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card 3 — AVAILABILITY */}
      <div data-reveal>
        <p className="mono-label-v2">AVAILABILITY</p>
        <div className="hairline-v2 mt-3" aria-hidden="true" />
        <div className="mt-4 flex items-center gap-3">
          <span className="dot-pulse-v2" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-secondary-v2)]">
            ACCEPTING NEW PROSPECTS
          </span>
        </div>
      </div>
    </aside>
  );
}
