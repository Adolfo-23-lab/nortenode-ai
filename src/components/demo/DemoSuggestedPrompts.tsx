"use client";

import * as React from "react";

const PROMPTS = [
  "¿Hay hueco hoy?",
  "¿Cuánto cuesta?",
  "¿Hacéis tinte?",
  "Cancelar mi cita",
];

function dispatchToInput(text: string): void {
  if (typeof document === "undefined") return;
  const inputEl = document.querySelector<HTMLInputElement>('[data-nn-demo-input]');
  if (!inputEl) return;
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  )?.set;
  if (!setter) return;
  setter.call(inputEl, text);
  inputEl.dispatchEvent(new Event("input", { bubbles: true }));
  inputEl.focus();
}

export default function DemoSuggestedPrompts() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]">
        Try
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => dispatchToInput(prompt)}
            className="rounded-[var(--radius-v2)] border border-[var(--color-border-strong-v2)] px-4 py-2 text-[var(--color-text-secondary-v2)] transition-[border-color,box-shadow,color] duration-200 hover:border-[var(--color-accent-v2)] hover:text-[var(--color-text-primary-v2)] hover:shadow-[var(--shadow-glow-soft-v2)]"
            style={{ fontSize: "var(--text-body-sm-v2)" }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
