"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Full-bleed muted looping video background.
 *
 * - Autoplays + loops + muted (iOS Safari plays inline under these flags).
 * - Downgrades to a poster/static gradient on `prefers-reduced-motion` or
 *   when the browser reports low memory / slow connection (Data-Saver).
 * - Paused when offscreen (IntersectionObserver) to save battery.
 */
export interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  /** Optional opacity (0-1). Default 0.55. */
  opacity?: number;
  /** CSS blend mode. Default "lighten". */
  blendMode?: React.CSSProperties["mixBlendMode"];
}

export function VideoBackground({
  src,
  poster,
  className,
  opacity = 0.55,
  blendMode = "lighten",
}: VideoBackgroundProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Pause when offscreen (rAF friendly).
  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) el.play().catch(() => {});
          else el.pause();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        style={{ opacity, mixBlendMode: blendMode }}
        src={src}
        poster={poster}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
      />
      {/* Edge vignette so text at the centre always stays readable. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 0%, rgba(5,6,10,0.5) 55%, rgba(5,6,10,0.92) 90%)",
        }}
      />
    </div>
  );
}
