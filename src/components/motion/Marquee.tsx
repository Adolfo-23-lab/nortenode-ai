"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-only infinite horizontal marquee.  Duplicates children once so the
 * animation can translate by -50% seamlessly.  Pauses on hover.
 */
export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;     // seconds, default 40
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gapClassName?: string; // e.g. "gap-16"
  children: React.ReactNode;
}

export function Marquee({
  duration = 40,
  direction = "left",
  pauseOnHover = true,
  gapClassName = "gap-12",
  className,
  children,
  ...rest
}: MarqueeProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden mask-fade-x", className)}
      {...rest}
    >
      <div
        className={cn(
          "flex w-max flex-nowrap items-center",
          gapClassName,
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        <div className={cn("flex flex-nowrap items-center", gapClassName)}>
          {children}
        </div>
        <div aria-hidden="true" className={cn("flex flex-nowrap items-center", gapClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
