"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "O cliente escreve",
    description:
      "Via widget na web ou WhatsApp. A qualquer hora, em Português impecável. Sem esperar pelo horário da clínica.",
    tag: "Canal de entrada",
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-500/30",
  },
  {
    number: "02",
    title: "A IA qualifica e agenda",
    description:
      "O agente pergunta sobre o tratamento, verifica disponibilidade e confirma o agendamento em menos de 2 minutos.",
    tag: "Motor de IA",
    accent: "text-blue-400",
    border: "group-hover:border-blue-500/30",
  },
  {
    number: "03",
    title: "A clínica recebe o lead",
    description:
      "Notificação instantânea e registo automático no painel Supabase. Sem trabalho manual, sem leads perdidos.",
    tag: "Gestão centralizada",
    accent: "text-violet-400",
    border: "group-hover:border-violet-500/30",
  },
  {
    number: "04",
    title: "Métricas em tempo real",
    description:
      "Taxa de conversão, volume de mensagens e agendamentos confirmados num só painel de controlo.",
    tag: "Analytics",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/30",
  },
];

export default function BentoGrid() {
  return (
    <section className="py-28 px-5 md:px-8 max-w-7xl mx-auto" id="benefits">
      {/* Header */}
      <div className="mb-20 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-zinc-600 mb-5"
        >
          Como funciona
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
        >
          De visita a agendamento
          <br />
          <span className="text-zinc-500">em menos de 2 minutos.</span>
        </motion.h2>
      </div>

      {/* Steps */}
      <div className="border-t border-zinc-800">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`group grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 py-8 border-b border-zinc-800 items-start hover:bg-white/[0.015] transition-colors duration-300 px-4 -mx-4 rounded-xl border border-transparent ${step.border} transition-all`}
          >
            {/* Número */}
            <span
              className={`text-4xl font-bold tabular-nums ${step.accent} opacity-30 group-hover:opacity-100 transition-opacity duration-300 leading-none pt-1`}
            >
              {step.number}
            </span>

            {/* Contenido */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-lg">
                {step.description}
              </p>
            </div>

            {/* Tag */}
            <div className="md:pt-1">
              <span
                className={`inline-block text-xs font-medium px-3 py-1 rounded-full border border-zinc-800 text-zinc-600 group-hover:${step.accent} group-hover:border-current transition-colors duration-300 whitespace-nowrap`}
              >
                {step.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
