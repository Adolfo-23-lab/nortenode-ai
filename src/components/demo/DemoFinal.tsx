"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  final: {
    title_v2:     string;
    sub_v2:       string;
    cta_label_v2: string;
  };
}

export default function DemoFinal({ final }: Props) {
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
            y: 28,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.12,
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
    <section ref={rootRef} className="relative bg-[var(--color-bg-v2)] py-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <h2
          data-reveal
          className="max-w-[24ch] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "var(--text-headline-lg-v2)" }}
        >
          {final.title_v2}
        </h2>
        <p
          data-reveal
          className="mt-8 max-w-[60ch] font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]"
        >
          {final.sub_v2}
        </p>
        <div data-reveal className="mt-10">
          <Link
            href="/contactos"
            className="inline-flex items-center justify-center rounded-[var(--radius-v2)] bg-white px-8 py-4 font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-[var(--color-bg-v2)] transition-shadow duration-200 hover:shadow-[var(--shadow-glow-soft-v2)]"
          >
            {final.cta_label_v2}
          </Link>
        </div>
      </div>
    </section>
  );
}
