"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contactos/ContactosForm";
import InteractiveDemo from "./InteractiveDemo";
import { useMotionInitial } from "@/lib/motion-safe";

export default function ConversionZone() {
  const mInit = useMotionInitial();
  return (
    <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto" id="demo">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <motion.div
          initial={mInit({ opacity: 0, y: 20 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex h-full w-full"
        >
          <ContactForm />
        </motion.div>

        <motion.div
          initial={mInit({ opacity: 0, y: 20 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex h-full w-full"
        >
          <InteractiveDemo />
        </motion.div>
      </div>
    </section>
  );
}
