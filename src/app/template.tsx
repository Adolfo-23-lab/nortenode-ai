"use client";

import { motion } from "framer-motion";
import { useMotionInitial } from "@/lib/motion-safe";

export default function Template({ children }: { children: React.ReactNode }) {
  const mInit = useMotionInitial();
  return (
    <motion.div
      initial={mInit({ opacity: 0, y: 15 })}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
