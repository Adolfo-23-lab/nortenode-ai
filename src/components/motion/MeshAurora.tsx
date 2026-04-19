"use client";

import { cn } from "@/lib/utils";

/**
 * Animated mesh-gradient aurora.  Four soft orbs float behind the hero.
 * Pure CSS (transform-based animation) — GPU-cheap, no JS on the main
 * thread.  Opacity pulled way back (0.35-0.5) so type stays readable.
 */
export function MeshAurora({
  className,
  intensity = "default",
}: {
  className?: string;
  intensity?: "muted" | "default" | "bold";
}) {
  const alpha = intensity === "bold" ? 0.7 : intensity === "muted" ? 0.3 : 0.5;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute left-[-10%] top-[-20%] h-[80vh] w-[80vh] rounded-full blur-[120px] will-change-transform"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(47,130,247,${alpha}) 0%, transparent 55%)`,
          animation: "aurora-pan 22s var(--ease-expo) infinite",
        }}
      />
      <div
        className="absolute right-[-20%] top-[10%] h-[70vh] w-[70vh] rounded-full blur-[120px] will-change-transform"
        style={{
          background: `radial-gradient(circle at 70% 40%, rgba(240,106,46,${alpha * 0.6}) 0%, transparent 60%)`,
          animation: "aurora-pan-alt 28s var(--ease-expo) infinite",
        }}
      />
      <div
        className="absolute left-[20%] bottom-[-25%] h-[90vh] w-[90vh] rounded-full blur-[140px] will-change-transform"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(126,87,255,${alpha * 0.55}) 0%, transparent 60%)`,
          animation: "aurora-pan 32s var(--ease-expo) infinite reverse",
        }}
      />
      <div
        className="absolute right-[10%] bottom-[0%] h-[50vh] w-[50vh] rounded-full blur-[100px] will-change-transform"
        style={{
          background: `radial-gradient(circle at 40% 60%, rgba(52,211,153,${alpha * 0.4}) 0%, transparent 60%)`,
          animation: "aurora-pan-alt 24s var(--ease-expo) infinite",
        }}
      />
    </div>
  );
}
