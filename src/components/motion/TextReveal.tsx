"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Editorial headline reveal — words rise from below their own clip
 * mask with a blur-to-sharp pass.  Faster and more fluid than the
 * previous version: stagger 0.04, duration 0.95, custom expo-out.
 */
export interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  whileInView?: boolean;
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const wordVariants: Variants = {
  hidden: {
    y: "115%",
    opacity: 0,
    filter: "blur(8px)",
    rotate: 2.5,
  },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    rotate: 0,
    transition: { duration: 0.95, ease: [0.19, 1, 0.22, 1] },
  },
};

export function TextReveal({
  text,
  as = "h2",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.04,
  whileInView = false,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");
  const Tag = as as React.ElementType;

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn(className)}>
      <motion.span
        initial="hidden"
        animate={whileInView ? undefined : "visible"}
        whileInView={whileInView ? "visible" : undefined}
        viewport={whileInView ? { once: true, margin: "-15% 0px" } : undefined}
        variants={containerVariants(stagger, delay)}
        className="block"
      >
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi) => (
              <span
                key={wi}
                className="inline-block overflow-hidden align-top pr-[0.24em] last:pr-0"
              >
                <motion.span
                  variants={wordVariants}
                  className={cn("inline-block will-change-transform", wordClassName)}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
