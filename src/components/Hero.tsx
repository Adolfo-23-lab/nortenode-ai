"use client";

import { motion } from "framer-motion";
import { Bot, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 w-full h-full bg-slate-950 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm font-medium text-emerald-400 mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Exclusivo para Clínicas em Gaia & Porto</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400"
        >
          Ainda paga comissões a plataformas?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10"
        >
          A sua própria IA em Gaia agenda e cobra as suas marcações 24/7. Webs autogeridas com Agentes de IA para clínicas de estética.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="#demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-all hover:scale-105"
          >
            Ver Demo IA Direta
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass text-white font-medium hover:bg-white/10 transition-all hover:scale-105"
          >
            <Bot className="w-5 h-5" />
            Saber Mais
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
