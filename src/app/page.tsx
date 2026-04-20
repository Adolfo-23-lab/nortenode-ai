import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import PruebaSocial from "@/components/PruebaSocial";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

/**
 * Marketing home — Cinematic Authority narrative:
 *   1. Hero         — full-bleed concrete timelapse + "A RECEÇÃO INVISÍVEL."
 *   2. Servicios    — what NorteNode builds (WhatsApp, Widget, Landing).
 *   3. PruebaSocial — logos + testimonials scaffolding ("Coming soon").
 *   4. Pricing      — legacy pricing grid, pending removal in B.2b.4.
 *   5. FinalCTA     — legacy closing, pending rewrite in B.2b.4.
 *   6. Footer
 */
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-ink-0)]">
      <Hero />
      <Servicios />
      <PruebaSocial />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
