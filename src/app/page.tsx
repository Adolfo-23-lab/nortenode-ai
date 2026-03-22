import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import BentoGrid from "@/components/BentoGrid";
import SocialProof from "@/components/SocialProof";
import ConversionZone from "@/components/ConversionZone";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation (Simplified) */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0 border-white/5 py-4 px-6 flex justify-between items-center bg-slate-950/50 backdrop-blur-md">
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-400">
          NorteNode AI
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-white transition-colors">Missão</a>
          <a href="#benefits" className="hover:text-white transition-colors">Benefícios</a>
          <a href="#demo" className="hover:text-white transition-colors">Demo IA</a>
          <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
        </div>
        <a href="#demo" className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/20 transition-colors">
          Agendar Chamada
        </a>
      </nav>

      <Hero />
      <SocialProof />
      <AboutUs />
      <BentoGrid />
      
      <div className="my-16" />
      
      <ConversionZone />
      <Pricing />
      
      <Footer />
    </main>
  );
}
