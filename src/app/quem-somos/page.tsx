import Image from "next/image";
import Footer from "@/components/Footer";
import { MapPin, Target, Users, Sparkles } from "lucide-react";

export const metadata = {
  title: "Quem Somos | NorteNode AI",
  description: "Conheça o Adolfo e a equipa NorteNode AI. Engenharia de conversão para clínicas de estética em Vila Nova de Gaia e Porto.",
};

export default function QuemSomosPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Photo */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-white/10">
              <Image
                src="/adolfo_nortenode.jpg"
                alt="Adolfo — Fundador da NorteNode AI"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative glow */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-500/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-500/15 rounded-full blur-[60px] -z-10" />
          </div>

          {/* Right Column — Copy */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Vila Nova de Gaia, Portugal
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                A Nossa Missão no Norte
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mb-8" />
            </div>

            <p className="text-lg text-slate-300 leading-relaxed">
              Olá, sou o Adolfo, engenheiro de conversão e otimizador de negócios. Fundei a NorteNode AI em Vila Nova de Gaia com uma missão clara: trazer a tecnologia de Inteligência Artificial de elite que as grandes redes usam para as clínicas de estética locais do Porto e Gaia.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              Não somos programadores distantes; somos os vossos parceiros locais focados em transformar visitantes em pacientes fiéis. Conhecemos o mercado do Norte e sabemos que o tempo da vossa receção vale ouro.
            </p>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="glass p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Localização</h4>
                  <p className="text-xs text-slate-400">Vila Nova de Gaia</p>
                </div>
              </div>
              <div className="glass p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Foco</h4>
                  <p className="text-xs text-slate-400">Clínicas de Estética</p>
                </div>
              </div>
              <div className="glass p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg shrink-0">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Equipa</h4>
                  <p className="text-xs text-slate-400">Parceiros dedicados</p>
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
