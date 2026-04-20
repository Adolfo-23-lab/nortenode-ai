"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";

/**
 * PruebaSocial — placeholder scaffolding for logos + testimonials.
 *
 * Real content lands when live clients sign. Until then, the empty
 * slots read as intentional: a "Coming soon" label in mono-wide-tracked
 * micro-type on a dim plate, no lorem, no fake avatars, no skeletons
 * that pretend to be loading.
 *
 * Tonal step from Servicios (ink-50) back to ink-0 provides the visual
 * boundary without a rule.
 */
export default function PruebaSocial() {
  const t = useT();

  return (
    <section
      aria-label={t.social.title}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] py-36 md:py-52"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {/* Eyebrow + title */}
        <div className="mb-24 grid grid-cols-12 gap-6 md:mb-32">
          <div className="col-span-12 md:col-span-9">
            <p
              data-reveal="social-eyebrow"
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45"
            >
              {t.social.eyebrow}
            </p>
            <h2
              data-reveal="social-title"
              className="font-sans text-[clamp(2.25rem,5.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.022em] text-white text-balance"
            >
              {t.social.title}
            </h2>
          </div>
        </div>

        {/* Logos scaffolding */}
        <div
          data-reveal="social-logos"
          className="mb-32 md:mb-48"
        >
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
            {t.social.logos_label}
          </p>
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-6 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-14 items-center justify-center"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/25">
                  {t.social.coming_soon}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials — 2 empty cards, asymmetric */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <TestimonialSkeleton
            placeholder={t.social.testimonial_role_placeholder}
            comingSoon={t.social.coming_soon}
            className="col-span-12 md:col-span-7"
          />
          <TestimonialSkeleton
            placeholder={t.social.testimonial_role_placeholder}
            comingSoon={t.social.coming_soon}
            className="col-span-12 md:col-span-4 md:col-start-9 md:mt-24"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialSkeleton({
  placeholder,
  comingSoon,
  className,
}: {
  placeholder: string;
  comingSoon: string;
  className?: string;
}) {
  return (
    <article
      data-reveal="social-testimonial"
      className={["flex flex-col gap-8", className].filter(Boolean).join(" ")}
    >
      {/* Quote plate — no box, no border, just a tonal nested layer. */}
      <div className="rounded-sm bg-[color:var(--color-ink-100)] p-10 md:p-12">
        <p
          aria-hidden="true"
          className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.25] tracking-[-0.012em] text-white/20"
        >
          “”
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
          {comingSoon}
        </p>
      </div>

      {/* Byline row — empty avatar + placeholder meta */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-[color:var(--color-ink-200)]" />
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            {placeholder}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/25">
            {comingSoon}
          </span>
        </div>
      </div>
    </article>
  );
}
