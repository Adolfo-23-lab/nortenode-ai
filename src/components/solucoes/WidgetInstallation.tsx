"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  title: string;
  body:  string;
}

export default function WidgetInstallation({ title, body }: Props) {
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
            duration: 0.95,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 82%" },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const TAG_CYAN  = "text-[var(--color-accent-v2)]";
  const ATTR_GRAY = "text-[var(--color-text-muted-v2)]";
  const VAL_WHITE = "text-[var(--color-text-primary-v2)]";

  return (
    <section ref={rootRef} className="bg-[var(--color-bg-v2)] py-[120px]">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <p data-reveal className="mono-label-v2">
          [ INSTALLATION ]
        </p>
        <h2
          data-reveal
          className="mt-6 max-w-[20ch] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "48px" }}
        >
          {title}
        </h2>

        <pre
          data-reveal
          className="mt-10 overflow-x-auto rounded-[var(--radius-v2)] border border-[var(--color-border-v2)] bg-[var(--color-bg-elevated-v2)] p-6 font-mono text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "14px", lineHeight: 1.6 }}
        >
          <code>
            <span className={TAG_CYAN}>{"<script"}</span>
            {"\n  "}
            <span className={ATTR_GRAY}>src</span>
            <span className={ATTR_GRAY}>=</span>
            <span className={ATTR_GRAY}>{"\""}</span>
            <span className={VAL_WHITE}>https://widget.nortenode.com/v1.js</span>
            <span className={ATTR_GRAY}>{"\""}</span>
            {"\n  "}
            <span className={ATTR_GRAY}>data-token</span>
            <span className={ATTR_GRAY}>=</span>
            <span className={ATTR_GRAY}>{"\""}</span>
            <span className={VAL_WHITE}>YOUR_WIDGET_TOKEN</span>
            <span className={ATTR_GRAY}>{"\""}</span>
            {"\n  "}
            <span className={ATTR_GRAY}>data-locale</span>
            <span className={ATTR_GRAY}>=</span>
            <span className={ATTR_GRAY}>{"\""}</span>
            <span className={VAL_WHITE}>auto</span>
            <span className={ATTR_GRAY}>{"\""}</span>
            {"\n  "}
            <span className={ATTR_GRAY}>defer</span>
            {"\n"}
            <span className={TAG_CYAN}>{"></script>"}</span>
          </code>
        </pre>

        <p
          data-reveal
          className="mt-8 max-w-[60ch] text-[var(--color-text-secondary-v2)]"
          style={{ fontSize: "16px", lineHeight: 1.55 }}
        >
          {body}
        </p>
      </div>
    </section>
  );
}
