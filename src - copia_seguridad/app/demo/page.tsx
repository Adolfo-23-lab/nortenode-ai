import ConversionZone from "@/components/ConversionZone";
import Footer from "@/components/Footer";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Demo IA | NorteNode AI",
  description: "Teste o nosso Agente de IA em tempo real. Veja como automatizamos agendamentos para clínicas de estética no Porto e Gaia.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      {/* Hero banner */}
      <section className="py-16 px-4 md:px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Demonstração Gratuita
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Teste o nosso Agente <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">em Tempo Real</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          Experimente o fluxo conversacional do lado direito, ou agende uma demonstração personalizada com a nossa equipa preenchendo o formulário.
        </p>
      </section>

      <ConversionZone />

      <Footer />
    </main>
  );
}
