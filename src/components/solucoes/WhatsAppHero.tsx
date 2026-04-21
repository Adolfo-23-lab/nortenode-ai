"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useT } from "@/i18n/provider";

/**
 * Page-level hero for /solucoes/whatsapp.
 *
 * Sibling pattern to the home Hero but without the concrete video:
 * on interior pages the video weight would compete with the mock
 * that follows. Instead we use a pure tonal stage — ink-0 canvas,
 * signal-blue radial glow bottom-right, grain-free. Copy dominates.
 */
export default function WhatsAppHero() {
  const t = useT();
  const h = t.solucoes.whatsapp.hero;
  const rootRef = React.useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
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
            gsap.set(root.querySelectorAll("[data-whatsapp-hero-parallax]"), { clearProps: "all" });
            return;
          }

          gsap.from(root.querySelectorAll("[data-reveal]"), {
            y: 32,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
          });

          gsap.to(root.querySelector("[data-whatsapp-hero-parallax]"), {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
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
      aria-label={h.eyebrow}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] pt-40 pb-32 md:pt-52 md:pb-40"
    >
      {/* Ambient tonal lighting */}
      <div
        aria-hidden="true"
        data-whatsapp-hero-parallax
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(55% 55% at 85% 30%, rgba(47,130,247,0.08), transparent 60%)," +
            "radial-gradient(45% 45% at 10% 90%, rgba(94,170,255,0.05), transparent 65%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            <p
              data-reveal="wa-hero-eyebrow"
              className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
            >
              {h.eyebrow}
            </p>

            <h1
              data-reveal="wa-hero-headline"
              className="mb-10 font-sans text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.025em] text-white text-balance"
            >
              {h.headline_l1}
              <br />
              <span className="text-[var(--color-ink-text-muted)]">{h.headline_l2}</span>
            </h1>

            <p
              data-reveal="wa-hero-sub"
              className="mb-12 max-w-xl text-base leading-relaxed text-[var(--color-ink-text-secondary)] md:text-lg"
            >
              {h.sub}
            </p>

            <div
              data-reveal="wa-hero-cta"
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
                className="group inline-flex items-center gap-2 rounded border border-[var(--color-ghost-border)] px-7 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-[var(--color-ink-text-primary)] transition-colors hover:border-[var(--color-ghost-border-hover)] hover:text-white"
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
