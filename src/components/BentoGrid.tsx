"use client";

import { motion } from "framer-motion";
import { Bot, LineChart, Zap, LayoutDashboard } from "lucide-react";

const features = [
  {
    title: "Agente de Triagem e Reservas 24/7",
    description: "SaaS conversacional que atende clínicas via WhatsApp ou Web a qualquer hora.",
    icon: <Bot className="w-8 h-8 text-emerald-400" />,
    className: "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/5 to-emerald-500/10",
  },
  {
    title: "SEO Local Dominante",
    description: "Posicionamento orgânico no Porto & Gaia para estética.",
    icon: <LineChart className="w-8 h-8 text-blue-400" />,
    className: "md:col-span-1 lg:col-span-1 glass",
  },
  {
    title: "Carga Inferior a 1s",
    description: "Otimizado para mobile onde estão 90% dos seus pacientes.",
    icon: <Zap className="w-8 h-8 text-amber-400" />,
    className: "md:col-span-1 lg:col-span-1 glass",
  },
  {
    title: "Painel de Controlo de Reservas",
    description: "Gestão centralizada de reservas potenciada por Supabase.",
    icon: <LayoutDashboard className="w-8 h-8 text-purple-400" />,
    className: "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/5 to-purple-500/10",
  },
];

export default function BentoGrid() {
  return (
    <section className="py-24 relative px-4 md:px-6 max-w-7xl mx-auto" id="benefits">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Engenharia de Conversão
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Não desenhamos folhetos digitais. Instalamos sistemas que capturam procura e poupam 10 horas semanais em gestão de marcações.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`rounded-3xl p-8 flex flex-col justify-between overflow-hidden border border-white/10 ${feature.className}`}
          >
            <div>{feature.icon}</div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
