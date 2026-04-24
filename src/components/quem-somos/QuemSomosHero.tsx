"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Props {
  eyebrow:       string;
  headline_l1:   string;
  headline_l2:   string;
  sub:           string;
  meta:          Array<{ label: string; value: string }>;
  photo_alt:     string;
  photo_caption: string;
}

export default function QuemSomosHero({
  eyebrow,
  headline_l1,
  headline_l2,
  sub,
  meta,
  photo_alt,
  photo_caption,
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

          gsap.from(root.querySelectorAll("[data-reveal]:not([data-reveal-plate])"), {
            y: 40,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.1,
            stagger: 0.14,
            ease: "power3.out",
          });

          gsap.from(root.querySelectorAll("[data-reveal-plate]"), {
            opacity: 0,
            scale: 0.8,
            duration: 1.8,
            ease: "power2.out",
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
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] pt-40 pb-32 md:pt-52 md:pb-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          data-reveal-plate
          className="absolute left-1/2 top-1/3 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-signal-500)_0%,transparent_60%)] opacity-[0.12] blur-3xl"
        />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div
            data-reveal
            className="col-span-12 md:col-span-5"
          >
            <figure className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-ink-900)]">
              <Image
                src="/adolfo_nortenode.jpg"
                alt={photo_alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </figure>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]">
              {photo_caption}
            </figcaption>
          </div>

          <div className="col-span-12 md:col-span-7">
            <p
              data-reveal
              className="mb-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
            >
              {eyebrow}
            </p>
            <h1
              data-reveal
              className="font-sans font-medium text-[clamp(2.75rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.02em] text-white text-balance"
            >
              <span className="block">{headline_l1}</span>
              {headline_l2 ? <span className="block text-[var(--color-ink-text-muted)]">{headline_l2}</span> : null}
            </h1>
            <p
              data-reveal
              className="mt-10 max-w-md font-sans text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg"
            >
              {sub}
            </p>
            <ul
              data-reveal
              className="mt-16 grid grid-cols-2 gap-y-8 gap-x-8 md:mt-20 md:grid-cols-2 md:gap-x-12"
            >
              {meta.map((item) => (
                <li key={item.label} className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]">
                    {item.label}
                  </span>
                  <span className="font-sans text-base leading-snug text-[var(--color-ink-text-primary)] md:text-lg">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
