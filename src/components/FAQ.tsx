"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import { useT } from "@/i18n/provider";
import { type FAQEntry } from "@/i18n/dictionary";

/**
 * FAQ — editorial accordion.
 *
 * Separation between items is a "ghost" hairline at 15% opacity per the
 * DESIGN.md fallback rule, never a solid divider.  Expand / collapse is
 * animated by GSAP on an explicit height — not max-height — so the
 * duration is predictable regardless of answer length and there's no
 * layout jump at the end of the tween.  prefers-reduced-motion skips
 * the tween and toggles height instantly.
 */
export default function FAQ() {
  const t = useT();
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
          const { isMotion } = ctx.conditions as { isMotion: boolean; isReduced: boolean };
          const root = rootRef.current;
          if (!root) return;

          if (!isMotion) {
            gsap.set(root.querySelectorAll("[data-reveal]"), { clearProps: "all" });
            return;
          }

          gsap.from(root.querySelectorAll("[data-reveal='faq-eyebrow'],[data-reveal='faq-title']"), {
            y: 32,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 72%" },
          });

          gsap.from(root.querySelectorAll("[data-reveal='faq-item']"), {
            y: 24,
            opacity: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 65%" },
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
      id="faq"
      aria-label={t.faq.title}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-50)] py-36 md:py-52"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 grid grid-cols-12 gap-6 md:mb-32">
          <div className="col-span-12 md:col-span-9">
            <p
              data-reveal="faq-eyebrow"
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]"
            >
              {t.faq.eyebrow}
            </p>
            <h2
              data-reveal="faq-title"
              className="font-sans text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white text-balance"
            >
              {t.faq.title}
            </h2>
          </div>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col">
          {t.faq.items.map((item, i) => (
            <FAQItem key={i} index={i} entry={item} />
          ))}
          {/* closing ghost rule */}
          <div aria-hidden="true" className="h-px w-full bg-[var(--color-glass-surface-hover)]" />
        </div>
      </div>
    </section>
  );
}

function FAQItem({ index, entry }: { index: number; entry: FAQEntry }) {
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const iconRef  = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    const icon  = iconRef.current;
    if (!panel || !inner) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = open ? inner.offsetHeight : 0;

    if (reduce) {
      gsap.set(panel, { height: target });
      if (icon) gsap.set(icon, { rotation: open ? 45 : 0 });
      return;
    }

    gsap.to(panel, {
      height: target,
      duration: 0.45,
      ease: "power3.out",
      onComplete: () => {
        // When fully open, let the panel grow naturally if content reflows.
        if (open) gsap.set(panel, { height: "auto" });
      },
    });
    if (icon) {
      gsap.to(icon, {
        rotation: open ? 45 : 0,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [open]);

  const headingId = `faq-q-${index}`;
  const panelId   = `faq-a-${index}`;

  return (
    <div
      data-reveal="faq-item"
      className="border-t border-[var(--color-hairline)]"
    >
      <button
        type="button"
        id={headingId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-8 py-7 text-left transition-colors md:py-9"
      >
        <span className="font-sans text-lg font-medium leading-snug tracking-[-0.01em] text-white md:text-2xl">
          {entry.q}
        </span>
        <span
          ref={iconRef}
          aria-hidden="true"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-[var(--color-ink-text-muted)]"
        >
          <Plus size={18} strokeWidth={1.5} />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        ref={panelRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div ref={innerRef} className="pb-8 pr-12 md:pb-10 md:pr-16">
          <p className="max-w-2xl text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg">
            {entry.a}
          </p>
        </div>
      </div>
    </div>
  );
}
