import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import BentoGrid from "@/components/BentoGrid";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 font-[family-name:var(--font-geist-sans)]">

      <Hero />
      <SocialProof />
      <AboutUs />
      <BentoGrid />
      <Pricing />
      
      <Footer />
    </main>
  );
}
