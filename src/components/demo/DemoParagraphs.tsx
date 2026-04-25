"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Paragraph {
  title_v2: string;
  desc_v2:  string;
}

interface Props {
  paragraphs: {
    intent:  Paragraph;
    context: Paragraph;
    tools:   Paragraph;
  };
}

export default function DemoParagraphs({ paragraphs }: Props) {
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
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 85%" },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const items: Array<{ num: string; p: Paragraph }> = [
    { num: "01", p: paragraphs.intent  },
    { num: "02", p: paragraphs.context },
    { num: "03", p: paragraphs.tools   },
  ];

  return (
    <aside ref={rootRef} className="flex w-full flex-col gap-y-12 lg:w-[320px]">
      {items.map(({ num, p }) => (
        <div key={num} data-reveal>
          <p
            aria-hidden="true"
            className="font-mono font-normal text-[var(--color-accent-v2)]"
            style={{ fontSize: "32px", lineHeight: 1 }}
          >
            {num}
          </p>
          <h3
            className="mt-4 font-medium text-[var(--color-text-primary-v2)]"
            style={{ fontSize: "var(--text-body-lg-v2)", lineHeight: 1.3 }}
          >
            {p.title_v2}
          </h3>
          <p
            className="mt-3 text-[var(--color-text-secondary-v2)]"
            style={{ fontSize: "var(--text-body-sm-v2)", lineHeight: 1.55 }}
          >
            {p.desc_v2}
          </p>
        </div>
      ))}
    </aside>
  );
}
