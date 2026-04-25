"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import WhatsAppMockup from "./WhatsAppMockup";

interface Props {
  headline: string;
  sub:      string;
  ctaDemo:  string;
  ctaTalk:  string;
}

export default function WhatsAppHero({ headline, sub, ctaDemo, ctaTalk }: Props) {
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

  const endsWithDot = headline.endsWith(".");
  const main        = endsWithDot ? headline.slice(0, -1) : headline;
  const period      = endsWithDot ? "." : "";

  const talkText = ctaTalk.replace(/\s*→\s*$/, "");

  return (
    <section
      ref={rootRef}
      aria-label="WHATSAPP OPERATOR"
      className="relative bg-[var(--color-bg-v2)] pt-[140px] pb-[80px] md:pt-[180px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p data-reveal className="mono-label-v2">
          PRODUCT 01 / 03 — WHATSAPP OPERATOR
        </p>
        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[60%_40%]">
          {/* LEFT — copy */}
          <div>
            <h1
              data-reveal
              className="font-medium leading-[1.0] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
              style={{ fontSize: "var(--text-headline-xl-v2)" }}
            >
              {main}
              {period && <span className="cyan-period-v2">{period}</span>}
            </h1>
            <p
              data-reveal
              className="mt-8 max-w-[60ch] text-[var(--color-text-secondary-v2)]"
              style={{ fontSize: "var(--text-body-lg-v2)", lineHeight: 1.55 }}
            >
              {sub}
            </p>
            <div data-reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-[var(--radius-v2)] bg-white px-6 py-3.5 font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-[var(--color-bg-v2)] transition-shadow duration-200 hover:shadow-[var(--shadow-glow-soft-v2)]"
              >
                {ctaDemo}
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
          {/* RIGHT — mockup */}
          <div data-reveal className="flex justify-center lg:justify-end">
            <WhatsAppMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
