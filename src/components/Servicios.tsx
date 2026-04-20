"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useT } from "@/i18n/provider";

/**
 * Servicios — "what NorteNode builds".
 *
 * Zero-border stack of 3 asymmetric blocks.  Separation from the Hero
 * above is a tonal step (ink-0 → ink-50), never a rule or divider.
 * Each block is offset horizontally so the eye zig-zags down the page
 * instead of reading a predictable 3-column grid.
 *
 * Motion (reveals + parallax) lands in B.2b.5; this file only ships the
 * structural markers (data-reveal, data-servicios-parallax) the GSAP
 * layer will bind against.
 */
export default function Servicios() {
  const t = useT();
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
          const { isMotion } = ctx.conditions as { isMotion: boolean; isReduced: boolean };
          const root = rootRef.current;
          if (!root) return;

          if (!isMotion) {
            gsap.set(root.querySelectorAll("[data-reveal]"), { clearProps: "all" });
            gsap.set(root.querySelectorAll("[data-servicios-parallax]"), { clearProps: "all" });
            return;
          }

          // Heading reveal (eyebrow + title together).
          gsap.from(root.querySelectorAll("[data-reveal^='servicios-eyebrow'],[data-reveal^='servicios-title']"), {
            y: 32,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 72%" },
          });

          // Each servicio item reveals individually as it enters.
          root.querySelectorAll<HTMLElement>("[data-reveal='servicios-item']").forEach((item, i) => {
            gsap.from(item, {
              y: 44,
              opacity: 0,
              filter: "blur(8px)",
              duration: 1.1,
              delay: i * 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 82%" },
            });
          });

          // Background parallax — 10% drift top → bottom.
          gsap.to(root.querySelector("[data-servicios-parallax]"), {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
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
      id="servicios"
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-50)] py-36 md:py-56"
      aria-label={t.services.title}
    >
      {/* Parallax texture — two faint radial glows, signal-blue tinted. */}
      <div
        aria-hidden="true"
        data-servicios-parallax
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(55% 38% at 18% 22%, rgba(47,130,247,0.055), transparent 65%)," +
            "radial-gradient(48% 32% at 88% 78%, rgba(158,198,255,0.04),  transparent 72%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {/* Eyebrow + title */}
        <div className="mb-24 grid grid-cols-12 gap-6 md:mb-40">
          <div className="col-span-12 md:col-span-9">
            <p
              data-reveal="servicios-eyebrow"
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
            >
              {t.services.eyebrow}
            </p>
            <h2
              data-reveal="servicios-title"
              className="font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.025em] text-white text-balance"
            >
              {t.services.title}
            </h2>
          </div>
        </div>

        {/* 3 asymmetric blocks */}
        <div className="flex flex-col gap-28 md:gap-44">
          {t.services.items.map((item, i) => (
            <article
              key={item.num}
              data-reveal="servicios-item"
              data-index={i}
              className={[
                "grid grid-cols-12 items-start gap-6",
                i === 0 ? ""                : "",
                i === 1 ? "md:pl-[16%]"     : "",
                i === 2 ? "md:pl-[28%]"     : "",
              ].join(" ")}
            >
              <div className="col-span-12 md:col-span-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
                  {item.num}
                </span>
              </div>

              <div className="col-span-12 md:col-span-8">
                <h3 className="mb-5 font-sans text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.018em] text-white">
                  {item.name}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
                  {item.desc}
                </p>
                <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-signal-300)]/75">
                  {item.tag}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
