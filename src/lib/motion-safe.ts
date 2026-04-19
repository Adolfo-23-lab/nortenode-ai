"use client";

import { useCallback } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Framer Motion + prefers-reduced-motion helper.
 *
 * Returns a wrapper for `initial={...}`:
 *   - reduced motion ON  → returns `false` so Framer skips the entry
 *     animation and the element renders in its `animate` state.
 *   - reduced motion OFF → returns the value unchanged.
 *
 *   const mInit = useMotionInitial();
 *   <motion.div initial={mInit({ opacity: 0, y: 20 })} animate={{ opacity: 1, y: 0 }} />
 */
export function useMotionInitial() {
  const reduce = useReducedMotion();
  return useCallback(
    <T,>(value: T): T | false => (reduce ? false : value),
    [reduce],
  );
}
