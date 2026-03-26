import Footer from "@/components/Footer";
import Link from "next/link";
import { Bot, Zap, Shield, UserCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Widget Web IA | NorteNode AI",
  description: "Transforme o seu site numa máquina de vendas com o nosso Widget Web IA. Captura automática de leads 24h por dia para clínicas no Porto e Gaia.",
};

const features = [
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Resposta em menos de 2 segundos",
    description: "O paciente nunca espera. A IA responde instantaneamente a qualquer dúvida sobre tratamentos, horários ou preços.",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-emerald-400" />,
    title: "Captura automática de dados",
    description: "Nome e WhatsApp capturados de forma natural durante a conversa. Enviamos diretamente para a vossa equipa fechar a marcação.",
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    title: "Zero leads perdidos",
    description: "Cada visitante do vosso site é atendido. Mesmo às 3h da manhã, o bot está ativo e pronto para converter.",
  },
];

export default function WidgetWebPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
          <Bot className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Widget Web IA
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
          O seu site atual transformado numa máquina de vendas. Respondemos às dúvidas dos pacientes em menos de 2 segundos, 24h por dia. Capturamos Nome e WhatsApp automaticamente e enviamos para a vossa equipa fechar a marcação. Zero leads perdidos.
        </p>
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all hover:scale-105"
        >
          Ver Demo em Direto
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
