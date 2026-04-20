"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useT } from "@/i18n/provider";

/**
 * Page-level hero for /solucoes/widget-web.
 *
 * Twin of WhatsAppHero — same composition, different copy subtree.
 * Keeps consistency explicit across the two /solucoes/* pages.
 */
export default function WidgetHero() {
  const t = useT();
  const h = t.solucoes.widget.hero;

  return (
    <section
      aria-label={h.eyebrow}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] pt-40 pb-32 md:pt-52 md:pb-40"
    >
      <div
        aria-hidden="true"
        data-widget-hero-parallax
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(55% 55% at 15% 30%, rgba(47,130,247,0.08), transparent 60%)," +
            "radial-gradient(45% 45% at 90% 90%, rgba(94,170,255,0.05), transparent 65%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            <p
              data-reveal="wg-hero-eyebrow"
              className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
            >
              {h.eyebrow}
            </p>

            <h1
              data-reveal="wg-hero-headline"
              className="mb-10 font-sans text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.025em] text-white text-balance"
            >
              {h.headline_l1}
              <br />
              <span className="text-white/55">{h.headline_l2}</span>
            </h1>

            <p
              data-reveal="wg-hero-sub"
              className="mb-12 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
            >
              {h.sub}
            </p>

            <div
              data-reveal="wg-hero-cta"
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 rounded bg-[color:var(--color-snow)] px-7 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-[color:var(--color-ink-100)] transition-colors hover:bg-white"
              >
                {t.common.cta_primary}
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/contactos"
                className="group inline-flex items-center gap-2 rounded border border-white/15 px-7 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                {t.common.cta_secondary}
                <ArrowRight
                  size={14}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
