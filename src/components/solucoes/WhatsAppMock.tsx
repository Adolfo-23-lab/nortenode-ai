"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useT } from "@/i18n/provider";

/**
 * WhatsApp conversation mock — unboxed presentation.
 *
 * No phone chrome, no visible card border. The mock is a tonal nested
 * plate on a slightly deeper canvas (ink-50 on ink-0) with an ambient
 * signal-blue spotlight behind it. WhatsApp-authentic colours live
 * only inside the conversation itself (brand recognition), never on
 * the page surroundings.
 *
 * Layout is asymmetric on desktop: title stack at col 1-5, device
 * mock offset to col 7-12 with a slight upward shift.
 */
export default function WhatsAppMock() {
  const t = useT();
  const mock = t.solucoes.whatsapp.mock;
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

          gsap.from(root.querySelectorAll("[data-reveal='wa-mock-copy']"), {
            y: 32,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 72%" },
          });
          gsap.from(root.querySelectorAll("[data-reveal='wa-mock-device']"), {
            y: 44,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.2,
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
      {/* Ambient lighting behind the mock */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40% 50% at 78% 48%, rgba(47,130,247,0.08), transparent 62%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 items-center gap-12 md:gap-16">
          {/* Left — narrative */}
          <div
            data-reveal="wa-mock-copy"
            className="col-span-12 md:col-span-5"
          >
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-text-soft)]">
              {mock.section_label}
            </p>
            <h2 className="font-sans text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1] tracking-[-0.02em] text-white text-balance">
              La conversación real,
              <br />
              <span className="text-[var(--color-ink-text-muted)]">sin atajos.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--color-ink-text-muted)] md:text-lg">
              El agente detecta la intención, ofrece horas disponibles reales y
              confirma en el mismo turno. Sin formularios, sin esperas.
            </p>
          </div>

          {/* Right — device mock, offset up */}
          <div
            data-reveal="wa-mock-device"
            className="col-span-12 md:col-span-7 md:-mt-6 flex justify-center md:justify-end"
          >
            <WhatsAppDevice
              businessName={mock.business_name}
              businessStatus={mock.business_status}
              messages={mock.messages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppDevice({
  businessName,
  businessStatus,
  messages,
}: {
  businessName: string;
  businessStatus: string;
  messages: typeof import("@/i18n/dictionary").es.solucoes.whatsapp.mock.messages;
}) {
  return (
    <div className="relative w-full max-w-[400px]">
      {/* Soft ambient glow under the device */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-[44px]"
        style={{
          boxShadow: "0 64px 64px -16px rgba(0,0,0,0.55)",
        }}
      />

      {/*
        Device shell: no visible border.  The rounded mask isolates the
        WhatsApp interior from the surrounding tonal plate so the brand
        greens inside can breathe without bleeding into the site chrome.
      */}
      <div className="overflow-hidden rounded-[44px]">
        {/* Chat header — WhatsApp-authentic */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ background: "#1F2C34" }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(0, 168, 132, 0.35)" }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: "#E9EDEF" }}
            >
              {businessName.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {businessName}
            </p>
            <p className="text-[11px]" style={{ color: "#8696A0" }}>
              {businessStatus}
            </p>
          </div>
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ color: "#8696A0" }}
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </div>

        {/* Messages pane — WhatsApp-authentic dark */}
        <div
          className="min-h-[320px] space-y-1.5 p-4"
          style={{ background: "#0B141A" }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[78%] px-3 py-2 text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-2xl rounded-tr-sm text-white"
                    : "rounded-2xl rounded-tl-sm text-white/90"
                }`}
                style={{
                  background: msg.role === "user" ? "#005C4B" : "#1F2C34",
                }}
              >
                {msg.text}
                <span
                  className="ml-2 inline-block text-[10px] align-baseline"
                  style={{ color: msg.role === "user" ? "#53BDEB" : "#8696A0" }}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar — WhatsApp-authentic */}
        <div
          className="flex items-center gap-2 px-3 py-2.5"
          style={{ background: "#1F2C34" }}
        >
          <div
            className="flex-1 rounded-full px-4 py-2.5 text-[11px]"
            style={{ background: "#2A3942", color: "#8696A0" }}
          >
            Mensagem
          </div>
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: "#00A884" }}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
