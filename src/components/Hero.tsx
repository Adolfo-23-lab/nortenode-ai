"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useT } from "@/i18n/provider";

/**
 * Hero — Cinematic Authority.
 *
 * Full-bleed 100vh stage with a concrete-timelapse video as background.
 * Asymmetric composition: label + headline top-left, CTA bottom-right,
 * massive negative space bridging them.  No boxes, no dividers, no
 * drop shadows — depth comes from a tonal gradient + grain + a subtle
 * backdrop-blur plate behind the headline to guarantee contrast.
 *
 * GSAP entrance animation lands in B.2.4 inside `[data-hero-reveal]`
 * targets — this component stays dumb about motion until then.
 */
export default function Hero() {
  const t = useT();
  const rootRef = React.useRef<HTMLElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Pause when the hero leaves the viewport — saves decode cycles on
  // long landing sessions and respects battery on mobile.
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else                      el.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // GSAP entrance choreography. matchMedia branches on reduced-motion
  // so the whole animation is skipped — elements render in their
  // final state and the background video stays perfectly still.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMotion:  "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isMotion } = ctx.conditions as { isMotion: boolean; isReduced: boolean };
          const targets = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");

          if (!isMotion) {
            // Reduced motion: land everything at its final state, no video zoom.
            gsap.set(targets, { clearProps: "all" });
            return;
          }

          gsap.from(targets, {
            y: 28,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
          });

          // Micro zoom on the video — 1 → 1.05 over 8s, yo-yo loop.
          const video = rootRef.current?.querySelector<HTMLElement>("[data-hero-video]");
          if (video) {
            gsap.fromTo(
              video,
              { scale: 1 },
              {
                scale: 1.05,
                duration: 8,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                transformOrigin: "50% 50%",
              },
            );
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-[var(--color-ink-0)]"
      aria-label={t.hero.eyebrow}
    >
      {/* ───────────────────────── Video layer ───────────────────────── */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        data-hero-video
        src="/assets/hero/hero-concrete.mp4"
        poster="/assets/hero/hero-concrete-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Tonal gradient — protects text without a box */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[var(--color-ink-0)] via-[var(--color-ink-0)]/60 to-transparent"
      />
      {/* Top fade so the Navbar pill never fights the video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[var(--color-ink-0)] to-transparent"
      />
      {/* Right-hand vignette — eases the CTA into readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_100%_100%,rgba(47,130,247,0.06),transparent_65%)]"
      />

      {/* ─────────────────────── Asymmetric grid ─────────────────────── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1440px] grid-cols-12 gap-6 px-6 pt-40 pb-12 md:px-12 md:pt-44 md:pb-16">
        {/* Top-left: label + headline (cols 1-8 desktop, full on mobile) */}
        <div className="col-span-12 flex flex-col gap-8 md:col-span-8">
          <p
            data-hero-reveal="label"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-muted)]"
          >
            {t.hero.eyebrow}
          </p>
          <h1
            data-hero-reveal="headline"
            className="font-sans text-[clamp(3.5rem,9.5vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-white text-balance"
          >
            {t.hero.headline_l1}
            <br />
            <span className="text-[var(--color-ink-text-muted)]">{t.hero.headline_l2}</span>
          </h1>
          {t.hero.sub ? (
            <p
              data-hero-reveal="sub"
              className="max-w-md text-base leading-relaxed text-[var(--color-ink-text-secondary)] md:text-lg"
            >
              {t.hero.sub}
            </p>
          ) : null}
        </div>

        {/* Bottom-right: CTA (cols 9-12 desktop, full on mobile) */}
        <div className="col-span-12 flex items-end justify-start md:col-span-4 md:col-start-9 md:justify-end">
          <div data-hero-reveal="cta" className="flex items-center gap-5">
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded bg-[color:var(--color-snow)] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.05em] text-[color:var(--color-ink-100)] transition-colors hover:bg-white"
            >
              {t.common.cta_primary}
              <ArrowRight
                size={14}
                strokeWidth={1.75}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
