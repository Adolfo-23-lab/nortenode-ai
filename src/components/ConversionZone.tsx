"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import InteractiveDemo from "./InteractiveDemo";

export default function ConversionZone() {
  return (
    <section className="py-24 relative px-4 md:px-6 max-w-7xl mx-auto" id="demo">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Pronto para escalar a sua Clínica?
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Experimente o fluxo conversacional no lado direito, ou agende uma demonstração gratuita com a nossa equipa preenchendo o formulário.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex h-full w-full"
        >
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex h-full w-full"
        >
          <InteractiveDemo />
        </motion.div>
      </div>
    </section>
  );
}
