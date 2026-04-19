"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/provider";
import { useMotionInitial } from "@/lib/motion-safe";

/**
 * Pricing without boxes.  Tiers are vertical columns separated by
 * hairline rules.  The "featured" tier breaks the grid visually with
 * a radiant backdrop + magnetic CTA; it does NOT live inside a card.
 */
export default function Pricing() {
  const t = useT();
  const tiers = t.pricing.tiers;

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-32 md:py-44"
    >
      {/* Soft aurora behind pricing — bleeds into the edges, no boundary */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(47,130,247,0.22) 0%, rgba(126,87,255,0.15) 40%, transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        {/* Heading — centred editorial */}
        <div className="mx-auto mb-20 max-w-3xl text-center md:mb-28">
          <FadeIn>
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-white/45">
              {t.pricing.eyebrow}
            </p>
          </FadeIn>
          <TextReveal
            whileInView
            as="h2"
            text={t.pricing.title}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-[-0.02em] text-white"
          />
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55 md:text-lg">
              {t.pricing.sub}
            </p>
          </FadeIn>
        </div>

        {/* Tiers — 3 columns separated by hairlines on desktop */}
        <div className="relative grid grid-cols-1 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <Column key={tier.name} tier={tier} index={i} per={t.pricing.per} currency={t.pricing.currency} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Column({
  tier,
  index,
  per,
  currency,
}: {
  tier: ReturnType<typeof useT>["pricing"]["tiers"][number];
  index: number;
  per: string;
  currency: string;
}) {
  const featured = !!tier.featured;
  const mInit = useMotionInitial();

  return (
    <FadeIn
      delay={index * 0.08}
      className={cn(
        "relative flex flex-col px-6 py-10 md:px-10 md:py-14",
        // Hairline separators between columns, no full card border
        "md:border-l md:border-white/[0.06] first:md:border-l-0",
        featured && "md:-mt-6 md:mb-[-1.5rem]",
      )}
    >
      {/* Glow behind featured tier ONLY — no card fill */}
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[-10%] bottom-[-10%] -z-10 mx-4 rounded-[32px] md:mx-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(47,130,247,0.18) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Featured badge — floats above, not attached */}
      {featured && (
        <motion.div
          initial={mInit({ opacity: 0, y: -8 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="mb-5 inline-flex w-fit items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-signal-300)]"
        >
          <Sparkles size={11} />
          Más popular
        </motion.div>
      )}

      {/* Name + tagline */}
      <h3
        className={cn(
          "font-display tracking-[-0.01em]",
          featured ? "text-3xl text-white" : "text-2xl text-white/90",
        )}
      >
        {tier.name}
      </h3>
      <p className="mt-1 text-sm text-white/50">{tier.tagline}</p>

      {/* Price */}
      <div className="mt-8 flex items-end gap-1.5">
        {tier.price === null ? (
          <span className="font-display text-5xl leading-none text-white">
            Custom
          </span>
        ) : (
          <>
            <span
              className={cn(
                "font-display tabular-nums leading-none text-white",
                featured ? "text-7xl" : "text-6xl",
              )}
            >
              <span className="mr-0.5 align-top text-2xl text-white/60">
                {currency}
              </span>
              {tier.price}
            </span>
            <span className="mb-1 text-sm text-white/40">{per}</span>
          </>
        )}
      </div>

      {/* Features — hairline separated bullets */}
      <ul className="mt-10 space-y-4 border-t border-white/[0.06] pt-8">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/75">
            <span
              className={cn(
                "mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full",
                featured
                  ? "bg-[color:var(--color-signal-500)]/25 text-[color:var(--color-signal-300)]"
                  : "bg-white/[0.06] text-white/80",
              )}
            >
              <Check size={11} strokeWidth={3} />
            </span>
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA — magnetic only on featured, underline-link on others */}
      <div className="mt-auto pt-10">
        {featured ? (
          <MagneticButton strength={14} tilt={6}>
            <Button asChild size="xl" className="w-full">
              <Link href="/contactos">{tier.cta}</Link>
            </Button>
          </MagneticButton>
        ) : (
          <Link
            href="/contactos"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            <span className="relative">
              {tier.cta}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-50 bg-white/35 transition-transform duration-500 group-hover:scale-x-100 group-hover:bg-white/80" />
            </span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </FadeIn>
  );
}
