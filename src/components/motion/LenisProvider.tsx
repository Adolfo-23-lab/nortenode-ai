"use client";

import * as React from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Smooth-scroll root + GSAP bridge.
 *
 *   - One Lenis instance for the whole document.
 *   - Lenis's scroll event drives ScrollTrigger.update() so any pinned
 *     or scrubbed timelines stay in sync with the smooth-scroll tween.
 *   - gsap.ticker (not requestAnimationFrame) powers Lenis's RAF so
 *     there's exactly one render loop on the page.
 *   - prefers-reduced-motion: skip Lenis entirely and let the native
 *     scroller handle everything. Live media-query watcher starts /
 *     stops Lenis without a reload if the OS setting flips.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: Lenis | null = null;
    const rafTick = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(rafTick);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      gsap.ticker.remove(rafTick);
      lenis?.destroy();
      lenis = null;
      // Return lagSmoothing to its default if we disabled it.
      gsap.ticker.lagSmoothing(500, 33);
    };

    if (!mql.matches) start();

    // Instrument Serif uses display: "swap" → swap triggers a post-mount
    // layout shift. Recalc ScrollTrigger positions once fonts have settled
    // so triggers with e.g. start: "top 82%" stay aligned.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const onChange = (e: MediaQueryListEvent) => (e.matches ? stop() : start());
    mql.addEventListener?.("change", onChange);

    return () => {
      mql.removeEventListener?.("change", onChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
