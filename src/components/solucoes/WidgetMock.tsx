"use client";

import * as React from "react";
import { Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useT } from "@/i18n/provider";

/**
 * Widget mock — unboxed, floating on a "pretend-website" layer.
 *
 * The pretend website behind the widget is a blurred abstract of dark
 * grey rectangles (hero + content block + nav) — enough to read as
 * "a site" without claiming any specific brand.  The widget itself is
 * the focus: a bezel-less panel in Cinematic Authority tones (ink-100
 * surface, ink-300 accents) so the viewer sees how it lands inside the
 * NorteNode palette rather than a WhatsApp-style window.
 */
export default function WidgetMock() {
  const t = useT();
  const mock = t.solucoes.widget.mock;
  const rootRef = React.useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
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

          gsap.from(root.querySelectorAll("[data-reveal='wg-mock-device']"), {
            y: 44,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 72%" },
          });
          gsap.from(root.querySelectorAll("[data-reveal='wg-mock-copy']"), {
            y: 32,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.1,
            delay: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 72%" },
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
      aria-label={mock.section_label}
      className="relative isolate overflow-hidden bg-[color:var(--color-ink-50)] py-32 md:py-52"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40% 50% at 22% 52%, rgba(47,130,247,0.08), transparent 62%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 items-center gap-12 md:gap-16">
          {/* Left — device stage (inverted vs WhatsApp page for variety) */}
          <div
            data-reveal="wg-mock-device"
            className="col-span-12 md:col-span-7 md:-mt-4 flex justify-center md:justify-start"
          >
            <WidgetStage
              botName={mock.bot_name}
              botStatus={mock.bot_status}
              messages={mock.messages}
            />
          </div>

          {/* Right — narrative */}
          <div
            data-reveal="wg-mock-copy"
            className="col-span-12 md:col-span-5"
          >
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]">
              {mock.section_label}
            </p>
            <h2 className="font-sans text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1] tracking-[-0.02em] text-white text-balance">
              Un chat en el site,
              <br />
              <span className="text-[var(--color-ink-text-muted)]">sin diseño de página.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg">
              Se monta sobre cualquier site sin tocar el layout existente —
              el panel flota a la derecha y recoge cada visita antes de
              que la pierdas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WidgetStage({
  botName,
  botStatus,
  messages,
}: {
  botName: string;
  botStatus: string;
  messages: typeof import("@/i18n/dictionary").es.solucoes.widget.mock.messages;
}) {
  return (
    <div className="relative w-full max-w-[560px]">
      {/* Fake-website scaffold — blurred dark rectangles, zero copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-0 rounded-[28px] overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0f1219 0%, #0a0c12 100%)",
        }}
      >
        <div className="p-6 space-y-6 opacity-40 blur-[1.5px]">
          {/* Pretend nav */}
          <div className="flex items-center gap-3">
            <div className="h-2 w-12 rounded-full bg-[var(--color-skeleton-strong)]" />
            <div className="ml-auto flex gap-2">
              <div className="h-1.5 w-8 rounded-full bg-[var(--color-skeleton-faint)]" />
              <div className="h-1.5 w-8 rounded-full bg-[var(--color-skeleton-faint)]" />
              <div className="h-1.5 w-8 rounded-full bg-[var(--color-skeleton-faint)]" />
            </div>
          </div>
          {/* Pretend hero */}
          <div className="space-y-2 pt-6">
            <div className="h-3 w-2/3 rounded-full bg-[var(--color-skeleton-base)]" />
            <div className="h-3 w-1/2 rounded-full bg-[var(--color-skeleton-base)]" />
          </div>
          {/* Pretend content block */}
          <div className="space-y-1.5 pt-6">
            <div className="h-2 w-full rounded-full bg-[var(--color-skeleton-faint)]" />
            <div className="h-2 w-5/6 rounded-full bg-[var(--color-skeleton-faint)]" />
            <div className="h-2 w-4/6 rounded-full bg-[var(--color-skeleton-faint)]" />
          </div>
        </div>
      </div>

      {/* Floating widget panel — NO visible border, ambient shadow only */}
      <div
        className="relative ml-auto mr-6 mt-14 w-[320px] overflow-hidden rounded-2xl"
        style={{
          background: "var(--color-ink-100)",
          boxShadow: "0 48px 72px -24px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-signal-500)]/20">
            <span className="text-[10px] font-bold text-[color:var(--color-signal-300)]">
              IA
            </span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{botName}</p>
            <p className="flex items-center gap-1.5 text-[11px] text-[var(--color-ink-text-soft)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-signal-400)]" />
              {botStatus}
            </p>
          </div>
        </div>

        {/* Hairline ghost separator per DESIGN.md fallback rule */}
        <div aria-hidden="true" className="h-px w-full bg-[var(--color-glass-surface-hover)]" />

        {/* Messages */}
        <div className="min-h-[220px] space-y-3 p-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] px-3.5 py-2.5 text-[12px] leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-2xl rounded-br-sm bg-[color:var(--color-signal-500)] text-white"
                    : "rounded-2xl rounded-bl-sm bg-[var(--color-glass-surface-hover)] text-white/85"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Hairline ghost + input */}
        <div aria-hidden="true" className="h-px w-full bg-[var(--color-glass-surface-hover)]" />
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex-1 rounded-full bg-[var(--color-glass-surface)] px-4 py-2">
            <p className="text-[11px] text-[var(--color-ink-text-faint)]">Escribe un mensaje…</p>
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-signal-500)]">
            <Send className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
