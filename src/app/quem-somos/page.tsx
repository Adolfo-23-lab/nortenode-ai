import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Quem Somos | NorteNode",
  description:
    "Conheça o Adolfo e a equipa NorteNode. Engenharia de conversão para clínicas de estética em Vila Nova de Gaia e Porto.",
};

const principles = [
  {
    num: "01",
    title: "Local de raiz",
    body: "Nascemos em Vila Nova de Gaia. Conhecemos o mercado, os pacientes e a cultura do Norte.",
  },
  {
    num: "02",
    title: "Foco em resultados",
    body: "Não vendemos tecnologia — vendemos marcações. A métrica é simples: mais pacientes na cadeira.",
  },
  {
    num: "03",
    title: "Sem fidelizações longas",
    body: "Se os resultados não aparecerem, não ficamos presos. Trabalhamos para merecer a renovação todos os meses.",
  },
];

export default function QuemSomosPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — sticky photo */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800">
              <Image
                src="/adolfo_nortenode.jpg"
                alt="Adolfo — Fundador da NorteNode"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950/90 to-transparent">
                <p className="text-white font-semibold text-sm">Adolfo</p>
                <p className="text-zinc-500 text-xs mt-0.5">Fundador · NorteNode</p>
              </div>
            </div>
          </div>

          {/* Right — editorial content */}
          <div className="flex flex-col gap-14 pt-2">

            {/* Heading */}
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600 mb-5">Quem Somos</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                Engenheiros de
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-500 tracking-tight leading-[1.05]">
                conversão local.
              </h1>
            </div>

            {/* Copy */}
            <div className="space-y-5">
              <p className="text-base text-zinc-400 leading-relaxed">
                Sou o Adolfo. Fundei a NorteNode em Vila Nova de Gaia com uma missão precisa:
                trazer a tecnologia de conversão que as grandes redes usam para as clínicas de
                estética independentes do Porto e Gaia.
              </p>
              <p className="text-base text-zinc-400 leading-relaxed">
                Não somos uma agência de Lisboa com clientes espalhados pelo país. Somos parceiros
                locais. Conhecemos o mercado, os hábitos dos pacientes do Norte, e o valor que
                uma receção bem automatizada pode ter para uma clínica de 2 a 10 funcionários.
              </p>
            </div>

            {/* Principles */}
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600 mb-6">
                Os nossos princípios
              </p>
              <div className="divide-y divide-zinc-800 border-t border-zinc-800">
                {principles.map((p) => (
                  <div
                    key={p.num}
                    className="py-6 grid grid-cols-[48px_1fr] gap-4 group cursor-default"
                  >
                    <span className="text-xs font-mono text-zinc-700 pt-1 group-hover:text-signal-500 transition-colors duration-200">
                      {p.num}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">{p.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/contactos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-signal-500/50 hover:text-white transition-all duration-200 group w-fit"
            >
              Falar connosco
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
