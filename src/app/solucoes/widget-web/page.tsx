import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";

export const metadata = {
  title: "Widget Web IA | NorteNode",
  description:
    "Transforme o seu site numa máquina de vendas com o nosso Widget Web IA. Captura automática de leads 24h por dia para clínicas no Porto e Gaia.",
};

const features = [
  {
    num: "01",
    title: "Resposta em menos de 2s",
    body: "O paciente nunca espera. A IA responde instantaneamente a qualquer dúvida sobre tratamentos, horários ou preços.",
  },
  {
    num: "02",
    title: "Captura automática de dados",
    body: "Nome e WhatsApp capturados de forma natural durante a conversa. Enviamos diretamente para a vossa equipa fechar a marcação.",
  },
  {
    num: "03",
    title: "Zero leads perdidos",
    body: "Cada visitante do vosso site é atendido. Mesmo às 3h da manhã, o bot está ativo e pronto para converter.",
  },
];

const messages = [
  { role: "bot", text: "Olá! Sou a assistente da clínica. Em que posso ajudar?", delay: 0.4 },
  { role: "user", text: "Quero saber preços para harmonização facial", delay: 1.1 },
  {
    role: "bot",
    text: "Ótima escolha! Posso partilhar os valores e agendar uma avaliação gratuita. Qual é o seu nome?",
    delay: 1.8,
  },
  { role: "user", text: "Ana Silva", delay: 2.6 },
];

export default function WidgetWebPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-20">
      <section className="pt-16 px-5 md:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — editorial */}
          <div className="flex flex-col gap-14 pt-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600 mb-5">Solução Web</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                Widget IA
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-500 tracking-tight leading-[1.05]">
                para o seu site.
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed mt-8 max-w-sm">
                O seu site atual transformado numa máquina de vendas. Respondemos às dúvidas dos
                pacientes em menos de 2 segundos, 24h por dia, sem intervenção humana.
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
                    <span className="text-xs font-mono text-zinc-700 pt-1 group-hover:text-emerald-500 transition-colors duration-200">
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-sm font-bold transition-all group w-fit"
            >
              Ver Demo ao Vivo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right — chat widget mockup */}
          <div className="lg:sticky lg:top-28 self-start flex flex-col items-end gap-3">
            {/* Widget popup */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[340px]">
              {/* Header */}
              <div className="bg-zinc-800/80 px-5 py-4 flex items-center gap-3 border-b border-zinc-700/50">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-[10px] font-bold">IA</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Assistente IA</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <p className="text-zinc-500 text-[11px]">Online agora</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 min-h-[240px]">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{ animationDelay: `${msg.delay}s` }}
                    className={`flex animate-[fadeSlideUp_0.45s_ease_both] [animation-fill-mode:both] ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-emerald-500 text-zinc-950 font-semibold rounded-br-sm"
                          : "bg-zinc-800 text-zinc-300 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div className="border-t border-zinc-800 px-4 py-3 flex items-center gap-2">
                <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2">
                  <p className="text-zinc-600 text-[11px]">Escreva uma mensagem...</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <Send className="w-3 h-3 text-zinc-950" />
                </div>
              </div>
            </div>

            {/* Floating trigger button */}
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 mr-1">
              <svg
                className="w-5 h-5 text-zinc-950"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.18-1.27A9.9 9.9 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14H7v-2h6v2zm2-4H7v-2h8v2zm0-4H7V6h8v2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
