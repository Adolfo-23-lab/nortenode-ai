"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  line: string;
}

export default function ContactosClosing({ line }: Props) {
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
            filter: "blur(8px)",
            duration: 1.0,
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
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p
          data-reveal
          className="mx-auto max-w-[40ch] text-center font-medium text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "var(--text-headline-v2)", lineHeight: 1.2 }}
        >
          {line}
        </p>
      </div>
    </section>
  );
}
