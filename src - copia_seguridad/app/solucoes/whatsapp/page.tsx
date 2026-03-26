import Footer from "@/components/Footer";
import Link from "next/link";
import { MessageCircle, Brain, Clock, Lock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "WhatsApp IA | NorteNode AI",
  description: "Agente de IA diretamente no WhatsApp da sua clínica. Atendimento natural 24/7 para clínicas de estética no Porto e Gaia.",
};

const features = [
  {
    icon: <Brain className="w-6 h-6 text-purple-400" />,
    title: "Conversas naturais e persuasivas",
    description: "A IA conversa como uma rececionista experiente. Identifica o tratamento ideal e guia o paciente até à marcação.",
  },
  {
    icon: <Clock className="w-6 h-6 text-amber-400" />,
    title: "Ativo enquanto a equipa está ocupada",
    description: "Quando estão em consultas presenciais, o bot atende cada mensagem de WhatsApp sem demora. Nenhum paciente fica sem resposta.",
  },
  {
    icon: <Lock className="w-6 h-6 text-emerald-400" />,
    title: "Integração oficial e segura",
    description: "Utilizamos a API oficial do WhatsApp Business. Dados encriptados, conformidade total com RGPD e sem risco de bloqueio.",
  },
];

export default function WhatsAppPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
          <MessageCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          WhatsApp IA
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
          O nosso cérebro IA, operando diretamente no WhatsApp da sua clínica. Atendemos pacientes com naturalidade enquanto a vossa equipa está ocupada em consultas presenciais. Integração oficial e segura.
        </p>
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all hover:scale-105"
        >
          Experimentar Demo
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
