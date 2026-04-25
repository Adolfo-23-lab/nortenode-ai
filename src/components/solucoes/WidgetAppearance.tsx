"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ThemeMeta {
  label: string;
  preview: "dark" | "light" | "branded";
}

interface ThemeI18n {
  desc_v2: string;
}

interface Props {
  title:  string;
  themes: ReadonlyArray<ThemeI18n>;
}

const THEME_META: ReadonlyArray<ThemeMeta> = [
  { label: "01 / DARK",    preview: "dark" },
  { label: "02 / LIGHT",   preview: "light" },
  { label: "03 / BRANDED", preview: "branded" },
];

function ThemePreview({ kind }: { kind: ThemeMeta["preview"] }) {
  if (kind === "light") {
    return (
      <div
        aria-hidden="true"
        className="relative flex w-full flex-col overflow-hidden rounded-[var(--radius-lg-v2)] border border-[var(--color-border-v2)] bg-white"
        style={{ height: 200 }}
      >
        <div className="flex items-center gap-2 border-b border-black/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#2f82f7]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-black/60">NorteNode</span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 p-3">
          <div className="flex justify-start">
            <span className="max-w-[80%] rounded-[var(--radius-v2)] border border-[#2f82f7]/40 px-2 py-1.5 text-[10px] text-black">
              How can I help?
            </span>
          </div>
          <div className="flex justify-end">
            <span className="max-w-[80%] rounded-[var(--radius-v2)] bg-black/5 px-2 py-1.5 text-[10px] text-black">
              Pricing
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "branded") {
    return (
      <div
        aria-hidden="true"
        className="relative flex w-full flex-col overflow-hidden rounded-[var(--radius-lg-v2)] border border-white/20"
        style={{ height: 200, background: "#2c5530" }}
      >
        <div className="flex items-center gap-2 border-b border-white/15 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/80">NorteNode</span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 p-3">
          <div className="flex justify-start">
            <span className="max-w-[80%] rounded-[var(--radius-v2)] border border-white/40 px-2 py-1.5 text-[10px] text-white">
              How can I help?
            </span>
          </div>
          <div className="flex justify-end">
            <span className="max-w-[80%] rounded-[var(--radius-v2)] bg-white/15 px-2 py-1.5 text-[10px] text-white">
              Pricing
            </span>
          </div>
        </div>
      </div>
    );
  }
  // dark (default)
  return (
    <div
      aria-hidden="true"
      className="relative flex w-full flex-col overflow-hidden rounded-[var(--radius-lg-v2)] border border-[var(--color-border-v2)] bg-[var(--color-bg-elevated-v2)]"
      style={{ height: 200 }}
    >
      <div className="flex items-center gap-2 border-b border-[var(--color-border-v2)] px-3 py-2">
        <span className="dot-pulse-v2" />
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-secondary-v2)]">NorteNode</span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 p-3">
        <div className="flex justify-start">
          <span className="max-w-[80%] rounded-[var(--radius-v2)] border border-[rgba(0,212,255,0.30)] px-2 py-1.5 text-[10px] text-[var(--color-text-primary-v2)]">
            How can I help?
          </span>
        </div>
        <div className="flex justify-end">
          <span className="max-w-[80%] rounded-[var(--radius-v2)] bg-[rgba(255,255,255,0.06)] px-2 py-1.5 text-[10px] text-[var(--color-text-primary-v2)]">
            Pricing
          </span>
        </div>
      </div>
    </div>
  );
}

export default function WidgetAppearance({ title, themes }: Props) {
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
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 82%" },
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
        <p data-reveal className="mono-label-v2">
          [ APPEARANCE ]
        </p>
        <h2
          data-reveal
          className="mt-6 max-w-[28ch] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "36px" }}
        >
          {title}
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {THEME_META.map((meta, i) => (
            <li key={meta.label} data-reveal className="flex flex-col">
              <ThemePreview kind={meta.preview} />
              <p className="mono-label-v2 mt-4">{meta.label}</p>
              <p
                className="mt-2 text-[var(--color-text-secondary-v2)]"
                style={{ fontSize: "14px", lineHeight: 1.55 }}
              >
                {themes[i]?.desc_v2 ?? ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
