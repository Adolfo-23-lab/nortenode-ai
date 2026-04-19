"use client";

import * as React from "react";
import Lenis from "lenis";

/**
 * Smooth-scroll root. Mounts one Lenis instance for the whole app and
 * disables itself when the user prefers reduced motion — native scroll
 * takes over so axes, focus, and jump-links behave predictably.
 *
 * We intentionally do NOT wrap children in any extra DOM — Lenis reads
 * the document scroller directly.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const mql = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

    let lenis: Lenis | null = null;
    let rafId = 0;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        smoothWheel: true,
      });
      const tick = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
      lenis?.destroy();
      lenis = null;
    };

    if (!mql?.matches) start();

    const onChange = (e: MediaQueryListEvent) => (e.matches ? stop() : start());
    mql?.addEventListener?.("change", onChange);

    return () => {
      mql?.removeEventListener?.("change", onChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
