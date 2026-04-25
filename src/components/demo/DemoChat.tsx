"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const InteractiveDemo = dynamic(() => import("./InteractiveDemo"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]">
        Loading demo…
      </span>
    </div>
  ),
});

export default function DemoChat() {
  return (
    <div className="relative">
      <p className="mono-label-v2 mb-4 flex flex-wrap items-center gap-x-2">
        <span>[ INSTANCE: DEMO_BARBERIA &nbsp;·&nbsp; MODEL: LLAMA-3.3-70B &nbsp;·&nbsp; STATUS:</span>
        <span aria-hidden="true" className="dot-pulse-v2" />
        <span>LIVE ]</span>
      </p>
      <div className="flex h-[600px] flex-col rounded-[var(--radius-v2)] border border-[var(--color-border-v2)] bg-[var(--color-bg-elevated-v2)] md:h-[600px]">
        <header className="flex items-center justify-between border-b border-[var(--color-border-v2)] px-4 py-3">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="dot-pulse-v2" />
            <span
              className="text-[var(--color-text-secondary-v2)]"
              style={{ fontSize: "var(--text-body-sm-v2)" }}
            >
              Live
            </span>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col">
          <InteractiveDemo />
        </div>
      </div>
    </div>
  );
}
