"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magnetic cursor follower with a layered effect:
 *   - The outer wrapper translates toward the cursor (strong pull).
 *   - The inner child translates a bit less + tilts in 3D.
 * Result: a tangible, responsive "grab" that beats the old flat lerp.
 *
 * Auto-disables under prefers-reduced-motion.
 */
export interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;        // px max displacement, default 18
  tilt?: number;            // degrees max tilt, default 8
  children: React.ReactNode;
}

export function MagneticButton({
  strength = 18,
  tilt = 8,
  className,
  children,
  ...rest
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const reduce = useReducedMotion();

  // Outer: generous travel
  const sx = useSpring(mvX, { stiffness: 260, damping: 22, mass: 0.6 });
  const sy = useSpring(mvY, { stiffness: 260, damping: 22, mass: 0.6 });

  // Inner: half-travel + 3D tilt
  const ix  = useTransform(sx, (v) => v * 0.5);
  const iy  = useTransform(sy, (v) => v * 0.5);
  const rX  = useTransform(sy, [-strength, strength], [ tilt, -tilt]);
  const rY  = useTransform(sx, [-strength, strength], [-tilt,  tilt]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - (r.left + r.width / 2))  / (r.width  / 2);
    const ny = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    mvX.set(nx * strength);
    mvY.set(ny * strength);
  }
  function onLeave() { mvX.set(0); mvY.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block will-change-transform", className)}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      <motion.div
        style={{
          x: ix,
          y: iy,
          rotateX: rX,
          rotateY: rY,
          transformStyle: "preserve-3d",
          transformPerspective: 800,
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
