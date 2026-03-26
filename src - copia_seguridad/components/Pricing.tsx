"use client";

import { Check, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className="py-24 relative px-4 md:px-6 max-w-6xl mx-auto" id="pricing">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Investimento Inteligente
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Escolha o modelo que melhor se adapta ao volume da sua clínica no Porto ou Gaia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Plan 1 — Sob Consulta */}
        <div className="glass rounded-3xl p-8 border border-white/10 hover:border-emerald-500/50 transition-colors relative flex flex-col">
          <h3 className="text-2xl font-bold text-white mb-2">Soluções Web Premium</h3>
          <p className="text-slate-400 mb-6">Design & IA sob medida. Ideal para clínicas que necessitam renovar a sua imagem digital completa.</p>
          <div className="text-4xl font-extrabold text-white mb-8">
            Sob Consulta
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            {["Design UI/UX Alto Impacto", "Agente IA Configurado", "Integração WhatsApp & Web", "Painel de Controlo Supabase", "SEO Local (Porto/Gaia)"].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <Link
            href="/contactos"
            className="w-full py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all text-center block"
          >
            Consultar Projeto
          </Link>
        </div>

        {/* Plan 2 — SaaS */}
        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 border border-emerald-500/30 rounded-3xl p-8 relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-emerald-500/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-slate-950 px-4 py-1 rounded-full text-sm font-bold tracking-wide">
            MAIS POPULAR
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">SaaS Gestão IA</h3>
          <p className="text-slate-400 mb-6">Nós gerimos o seu bot e servidores. Sem complicações para si.</p>
          <div className="mb-8">
            <div className="text-4xl font-extrabold text-white">
              A partir de €97<span className="text-lg text-slate-500 font-normal">/mês</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Sujeito a Taxa de Setup Única</p>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            {["Agente Conversacional Ilimitado", "Integração com a sua web atual", "Suporte Técnico 24/7", "Atualizações de IA", "Sem fidelização"].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <Link
            href="/demo"
            className="w-full py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all hover:scale-105 shadow-lg shadow-emerald-500/25 text-center block"
          >
            Iniciar Teste Gratuito
          </Link>
        </div>
      </div>
      
      {/* Contact CTA */}
      <div className="mt-32 max-w-4xl mx-auto text-center glass rounded-3xl p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
        <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Dúvidas sobre a implementação?</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10">
          Falamos sem compromisso. Tripeiros ajudando clínicas locais a escalar através de tecnologia de ponta.
        </p>
        <a 
          href="https://wa.me/351937809995" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all hover:scale-105 relative z-10"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          Falar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}
