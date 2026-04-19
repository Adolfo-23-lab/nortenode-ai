import ConversionZone from "@/components/ConversionZone";
import FloatingSalesBot from "@/components/FloatingSalesBot";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Demo IA | NorteNode",
  description:
    "Teste o nosso Agente de IA em tempo real. Veja como automatizamos agendamentos para clínicas de estética no Porto e Gaia.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-20">
      {/* Minimal header */}
      <section className="pt-16 pb-0 px-5 md:px-8 max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-zinc-600 mb-5">Demo IA</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
          Teste o agente
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-500 tracking-tight leading-[1.05]">
          em tempo real.
        </h1>
        <p className="text-sm text-zinc-500 max-w-md mt-6 leading-relaxed">
          Preencha o formulário para uma demonstração personalizada, ou comece a conversar com
          o agente agora mesmo no lado direito.
        </p>
      </section>

      <ConversionZone />

      <Footer />
      <FloatingSalesBot />
    </main>
  );
}
