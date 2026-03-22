"use client";

import { motion } from "framer-motion";
import { Bot, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 w-full h-full bg-slate-950 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Copy */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-emerald-500/20 text-sm font-medium text-emerald-400 mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Exclusivo para Clínicas em Gaia & Porto</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 leading-tight"
            >
              Ainda paga <br/> comissões a plataformas?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed"
            >
              No Porto e Gaia, as clínicas mais rentáveis usam a NorteNode AI para automatizar agendamentos. Webs com Agentes de IA que falam Português impecável e fecham vendas 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass border border-white/10 text-white font-medium hover:bg-white/10 transition-all hover:scale-105"
              >
                <Bot className="w-5 h-5" />
                Saber Mais
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-square flex items-center justify-center"
          >
            {/* Mockup wrapper */}
            <div className="relative w-full h-full max-h-[600px] glass rounded-[2.5rem] p-4 border border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 z-0" />
              <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden border border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Aesthetic Clinic Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Floating UI Elements over image */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-6 mx-4 left-0 right-0 glass rounded-2xl p-4 border border-white/20 shadow-xl flex items-center gap-4 bg-slate-950/80 backdrop-blur-md"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Novo Agendamento</h3>
                    <p className="text-xs text-slate-300">&quot;Queria agendar preenchimento facial para amanhã...&quot;</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-[40px] z-0" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-[50px] z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
