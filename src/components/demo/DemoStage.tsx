"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import InteractiveDemo from "./InteractiveDemo";

export default function DemoStage() {
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
            y: 40,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 78%" },
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
      aria-label="LIVE DEMO"
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-0)] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div data-reveal>
          <InteractiveDemo />
        </div>
      </div>
    </section>
  );
}
