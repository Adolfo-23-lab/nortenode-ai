"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  title: string;
}

const CONVERSATION: Array<{ from: "customer" | "operator"; text: string }> = [
  { from: "customer", text: "Tienen hueco mañana sobre las 6?" },
  { from: "operator", text: "Sí, a las 18:00 con Adolfo. ¿Confirmamos?" },
  { from: "customer", text: "perfecto" },
  { from: "operator", text: "Reservado. Recibirás recordatorio 1h antes." },
];

export default function HomeExample({ title }: Props) {
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

          gsap.from(root.querySelectorAll("[data-reveal='example-head']"), {
            y: 28,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 78%" },
          });

          root.querySelectorAll<HTMLElement>("[data-reveal='example-msg']").forEach((msg, i) => {
            gsap.from(msg, {
              y: 16,
              opacity: 0,
              duration: 0.6,
              delay: i * 0.18,
              ease: "power2.out",
              scrollTrigger: { trigger: msg, start: "top 90%" },
            });
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
      aria-label="EXAMPLE"
      className="relative bg-[var(--color-bg-v2)] py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <p data-reveal="example-head" className="mono-label-v2">
          05 / 06 — EXAMPLE
        </p>
        <h2
          data-reveal="example-head"
          className="mt-10 font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-text-primary-v2)]"
          style={{ fontSize: "var(--text-headline-lg-v2)" }}
        >
          {title}
        </h2>

        <div className="mx-auto mt-[80px] flex w-full max-w-[600px] flex-col gap-3">
          {CONVERSATION.map((msg, i) => (
            <div
              key={i}
              data-reveal="example-msg"
              className={msg.from === "customer" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={
                  msg.from === "customer"
                    ? "rounded-[var(--radius-lg-v2)] bg-[var(--color-bg-elevated-v2)] px-4 py-2.5 max-w-[80%] text-[var(--color-text-primary-v2)]"
                    : "rounded-[var(--radius-lg-v2)] border border-[rgba(0,212,255,0.30)] px-4 py-2.5 max-w-[80%] text-[var(--color-text-primary-v2)]"
                }
                style={{ fontSize: "var(--text-body-v2)" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <p
          data-reveal="example-msg"
          className="mx-auto mt-10 max-w-[60ch] text-center font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]"
        >
          Real exchange. WhatsApp Business API. Sub-200ms response.
        </p>
      </div>
    </section>
  );
}
