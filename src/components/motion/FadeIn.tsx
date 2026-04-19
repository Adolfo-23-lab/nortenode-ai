"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal wrapper.  Applies an editorial fade-up (+ optional
 * blur lift) once the element enters view.  Use liberally across
 * sections to create the cinematic "camera unfocuses into content"
 * feel.  Respects prefers-reduced-motion.
 */
export interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Seconds to delay the animation after intersection. */
  delay?: number;
  /** Pixels to translate from (default 32). */
  y?: number;
  /** Whether to blur-in from 8px (default true). */
  blur?: boolean;
  /** Viewport root margin passed to IntersectionObserver. */
  rootMargin?: string;
  /** Fire every time (default: once). */
  repeat?: boolean;
  /** Override the underlying element. */
  as?: "div" | "section" | "article" | "aside" | "span";
  children: React.ReactNode;
}

export function FadeIn({
  delay = 0,
  y = 32,
  blur = true,
  rootMargin = "-10% 0px -10% 0px",
  repeat = false,
  as = "div",
  className,
  children,
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      filter: blur ? "blur(12px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.1,
        delay,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  if (reduce) {
    return <div className={className} {...rest}>{children}</div>;
  }

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: rootMargin }}
      variants={variants}
      className={cn(className)}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </Tag>
  );
}
