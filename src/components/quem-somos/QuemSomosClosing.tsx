"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  line: string;
}

export default function QuemSomosClosing({ line }: Props) {
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
            y: 24,
            opacity: 0,
            filter: "blur(6px)",
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
    <section ref={rootRef} className="bg-[var(--color-bg-v2)] py-[120px]">
      <div className="mx-auto w-full max-w-[800px] px-6 text-center md:px-12">
        <p
          data-reveal
          className="mx-auto max-w-[50ch] font-normal text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "24px", lineHeight: 1.5 }}
        >
          {line}
        </p>
        <p data-reveal className="mt-6">
          <a
            href="mailto:contacto@nortenode.com"
            className="font-mono text-[var(--color-accent-v2)] no-underline transition-opacity hover:underline hover:opacity-90"
            style={{ fontSize: "var(--text-body-sm-v2)" }}
          >
            contacto@nortenode.com
          </a>
        </p>
      </div>
    </section>
  );
}
