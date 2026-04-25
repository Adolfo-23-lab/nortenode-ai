"use client";

import * as React from "react";

export default function WhatsAppMockup() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex flex-col overflow-hidden rounded-[28px] border border-[var(--color-border-strong-v2)] bg-[var(--color-bg-elevated-v2)]"
      style={{ width: 280, height: 560 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border-v2)] px-4 py-3">
        <span className="dot-pulse-v2" />
        <span
          className="font-mono text-[var(--color-text-secondary-v2)]"
          style={{ fontSize: "11px", letterSpacing: "0.08em" }}
        >
          Barbería Norte · Online
        </span>
      </div>

      {/* Conversation */}
      <div className="flex flex-1 flex-col justify-end gap-3 p-4">
        <div className="flex justify-end">
          <div
            className="max-w-[78%] rounded-[var(--radius-lg-v2)] bg-[rgba(255,255,255,0.06)] px-3 py-2 text-[var(--color-text-primary-v2)]"
            style={{ fontSize: "13px", lineHeight: 1.45 }}
          >
            Tienen hueco mañana?
          </div>
        </div>
        <div className="flex justify-start">
          <div
            className="max-w-[78%] rounded-[var(--radius-lg-v2)] border border-[rgba(0,212,255,0.30)] px-3 py-2 text-[var(--color-text-primary-v2)]"
            style={{ fontSize: "13px", lineHeight: 1.45 }}
          >
            Mañana 18:00 con Adolfo. ¿Confirmamos?
          </div>
        </div>
        <div className="flex justify-end">
          <div
            className="max-w-[78%] rounded-[var(--radius-lg-v2)] bg-[rgba(255,255,255,0.06)] px-3 py-2 text-[var(--color-text-primary-v2)]"
            style={{ fontSize: "13px", lineHeight: 1.45 }}
          >
            Perfecto sí
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-bg-elevated-v2)] to-transparent" />
    </div>
  );
}
