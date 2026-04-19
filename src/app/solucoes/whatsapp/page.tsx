import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "WhatsApp IA | NorteNode",
  description:
    "Agente de IA diretamente no WhatsApp da sua clínica. Atendimento natural 24/7 para clínicas de estética no Porto e Gaia.",
};

const features = [
  {
    num: "01",
    title: "Conversas naturais e persuasivas",
    body: "A IA conversa como uma rececionista experiente. Identifica o tratamento ideal e guia o paciente até à marcação.",
  },
  {
    num: "02",
    title: "Ativo enquanto a equipa está ocupada",
    body: "Quando estão em consultas presenciais, o bot atende cada mensagem de WhatsApp sem demora. Nenhum paciente fica sem resposta.",
  },
  {
    num: "03",
    title: "Integração oficial e segura",
    body: "Utilizamos a API oficial do WhatsApp Business. Dados encriptados, conformidade total com RGPD e sem risco de bloqueio.",
  },
];

const messages = [
  {
    role: "clinic",
    text: "Olá! 👋 Bem-vindo à Clínica. Em que posso ajudar?",
    time: "10:02",
    delay: 0.4,
  },
  {
    role: "patient",
    text: "Boa tarde! Queria marcar toxina botulínica",
    time: "10:03",
    delay: 1.1,
  },
  {
    role: "clinic",
    text: "Claro! Temos disponibilidade esta semana. Qual o melhor dia para si?",
    time: "10:03",
    delay: 1.8,
  },
  {
    role: "patient",
    text: "Quinta de manhã, se possível",
    time: "10:04",
    delay: 2.5,
  },
  {
    role: "clinic",
    text: "Perfeito! Quinta às 10h está disponível. Fico a reservar ✅",
    time: "10:04",
    delay: 3.2,
  },
];

export default function WhatsAppPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-20">
      <section className="pt-16 px-5 md:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — editorial */}
          <div className="flex flex-col gap-14 pt-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600 mb-5">Solução WhatsApp</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                WhatsApp IA
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-500 tracking-tight leading-[1.05]">
                sempre disponível.
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed mt-8 max-w-sm">
                O nosso agente IA opera diretamente no WhatsApp da sua clínica. Atende pacientes
                com naturalidade enquanto a equipa está em consultas presenciais.
              </p>
            </div>

            {/* Feature list */}
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600 mb-6">O que inclui</p>
              <div className="divide-y divide-zinc-800 border-t border-zinc-800">
                {features.map((f) => (
                  <div
                    key={f.num}
                    className="py-5 grid grid-cols-[48px_1fr] gap-4 group cursor-default"
                  >
                    <span className="text-xs font-mono text-zinc-700 pt-1 group-hover:text-signal-500 transition-colors duration-200">
                      {f.num}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-signal-500 hover:bg-signal-400 text-white text-sm font-bold transition-all group w-fit"
            >
              Experimentar Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right — WhatsApp chat mockup */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[360px] mx-auto">

              {/* WhatsApp-style header */}
              <div className="bg-[#1F2C34] px-4 py-3.5 flex items-center gap-3 border-b border-zinc-700/30">
                <div className="w-9 h-9 rounded-full bg-emerald-600/40 flex items-center justify-center shrink-0">
                  <span className="text-emerald-300 text-xs font-bold">C</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">Clínica NorteNode</p>
                  <p className="text-[#8696A0] text-[11px]">online</p>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-4 h-4 text-[#8696A0]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <svg className="w-4 h-4 text-[#8696A0]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
              </div>

              {/* Chat background */}
              <div
                className="p-4 space-y-1.5 min-h-[280px]"
                style={{ background: "#0B141A" }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{ animationDelay: `${msg.delay}s` }}
                    className={`flex animate-[fadeSlideUp_0.45s_ease_both] [animation-fill-mode:both] ${
                      msg.role === "patient" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[78%] px-3 py-2 rounded-xl text-[13px] leading-relaxed relative ${
                        msg.role === "patient"
                          ? "rounded-tr-sm text-white"
                          : "rounded-tl-sm text-zinc-200"
                      }`}
                      style={{
                        background: msg.role === "patient" ? "#005C4B" : "#1F2C34",
                      }}
                    >
                      {msg.text}
                      <span
                        className="block text-right mt-0.5 text-[10px]"
                        style={{ color: msg.role === "patient" ? "#53BDEB" : "#8696A0" }}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div
                className="px-3 py-2.5 flex items-center gap-2"
                style={{ background: "#1F2C34" }}
              >
                <div
                  className="flex-1 rounded-full px-4 py-2.5 text-[11px]"
                  style={{ background: "#2A3942", color: "#8696A0" }}
                >
                  Mensagem
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#00A884" }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
