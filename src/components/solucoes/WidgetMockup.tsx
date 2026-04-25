"use client";

import * as React from "react";

export default function WidgetMockup() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto overflow-hidden rounded-[var(--radius-lg-v2)] border border-[var(--color-border-v2)] bg-[var(--color-bg-v2)]"
      style={{ width: 600, height: 400, maxWidth: "100%" }}
    >
      {/* Browser top bar */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border-v2)] bg-[var(--color-bg-elevated-v2)] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong-v2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong-v2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong-v2)]" />
        </div>
        <span
          className="ml-4 font-mono text-[var(--color-text-muted-v2)]"
          style={{ fontSize: "11px", letterSpacing: "0.08em" }}
        >
          yoursite.com
        </span>
      </div>

      {/* Faded content placeholders */}
      <div className="relative px-8 py-8" style={{ opacity: 0.3 }}>
        <div className="h-6 w-3/5 rounded bg-[var(--color-border-strong-v2)]" />
        <div className="mt-4 h-3 w-4/5 rounded bg-[var(--color-border-v2)]" />
        <div className="mt-2 h-3 w-3/4 rounded bg-[var(--color-border-v2)]" />
        <div className="mt-2 h-3 w-2/3 rounded bg-[var(--color-border-v2)]" />
        <div className="mt-8 h-3 w-3/4 rounded bg-[var(--color-border-v2)]" />
        <div className="mt-2 h-3 w-1/2 rounded bg-[var(--color-border-v2)]" />
      </div>

      {/* Floating widget */}
      <div
        className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-[var(--radius-lg-v2)] border border-[rgba(0,212,255,0.30)] bg-[var(--color-bg-elevated-v2)]"
        style={{ width: 180, height: 220 }}
      >
        <div className="flex items-center gap-2 border-b border-[var(--color-border-v2)] px-3 py-2">
          <span className="dot-pulse-v2" />
          <span
            className="font-mono text-[var(--color-text-secondary-v2)]"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            NorteNode
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 p-2">
          <div className="flex justify-start">
            <div
              className="max-w-[85%] rounded-[var(--radius-v2)] border border-[rgba(0,212,255,0.30)] px-2 py-1.5 text-[var(--color-text-primary-v2)]"
              style={{ fontSize: "10px", lineHeight: 1.35 }}
            >
              ¿En qué te ayudo?
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className="max-w-[85%] rounded-[var(--radius-v2)] bg-[rgba(255,255,255,0.06)] px-2 py-1.5 text-[var(--color-text-primary-v2)]"
              style={{ fontSize: "10px", lineHeight: 1.35 }}
            >
              Reservar cita
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--color-border-v2)] px-2 py-1.5">
          <span
            className="font-mono italic text-[var(--color-text-muted-v2)]"
            style={{ fontSize: "10px" }}
          >
            Type a message…
          </span>
        </div>
      </div>
    </div>
  );
}
