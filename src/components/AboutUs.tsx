"use client";

import { motion } from "framer-motion";

const values = [
  {
    label: "Localização",
    value: "Vila Nova de Gaia",
    sub: "Portugal",
  },
  {
    label: "Foco",
    value: "Clínicas de estética",
    sub: "Porto & Gaia exclusivamente",
  },
  {
    label: "Modelo",
    value: "Boutique",
    sub: "Sócios dedicados ao seu projeto",
  },
];

export default function AboutUs() {
  return (
    <section className="py-28 px-5 md:px-8 max-w-7xl mx-auto" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left — valores / credenciais */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          {/* Label */}
          <p className="text-xs uppercase tracking-widest text-zinc-600">Quem somos</p>

          {/* Headline grande */}
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            Construídos no Norte,
            <br />
            <span className="text-zinc-500">para o Norte.</span>
          </h2>

          {/* Divider */}
          <div className="w-10 h-px bg-emerald-500 my-6" />

          {/* Stats grid */}
          <div className="space-y-px rounded-2xl overflow-hidden border border-zinc-800">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center justify-between px-5 py-4 bg-zinc-900 hover:bg-zinc-800/70 transition-colors group"
              >
                <span className="text-xs uppercase tracking-widest text-zinc-600 w-28 shrink-0">
                  {v.label}
                </span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{v.value}</p>
                  <p className="text-xs text-zinc-600">{v.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="text-lg text-zinc-300 leading-relaxed"
          >
            Somos uma agência boutique sediada em{" "}
            <span className="text-white font-medium">Vila Nova de Gaia</span>,
            exclusivamente focada em engenharia de conversão para clínicas de saúde e estética.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="text-lg text-zinc-400 leading-relaxed"
          >
            Acreditamos que uma clínica moderna não precisa de mais &quot;likes&quot;
            ou websites lentos. Precisa de sistemas inteligentes que transformem
            visitantes locais em pacientes na sua agenda — sem comissões a terceiros.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="text-sm text-zinc-600 leading-relaxed border-l-2 border-zinc-800 pl-4"
          >
            &quot;Trabalhamos apenas com um número limitado de clínicas por zona,
            garantindo atenção total e resultados mensuráveis.&quot;
          </motion.p>

          {/* Pill tags */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-wrap gap-2 mt-2"
          >
            {["Next.js", "IA Conversacional", "WhatsApp API", "Supabase", "SEO Local"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full border border-zinc-800 text-zinc-500 bg-zinc-900"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
