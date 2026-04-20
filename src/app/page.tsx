import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

/**
 * Marketing home — Cinematic Authority narrative:
 *   1. Hero       — full-bleed concrete timelapse + "A RECEÇÃO INVISÍVEL."
 *   2. Servicios  — what NorteNode builds (WhatsApp, Widget, Landing).
 *   3. SocialProof— legacy stats strip, pending replacement in B.2b.2.
 *   4. Pricing    — legacy pricing grid, pending removal in B.2b.4.
 *   5. FinalCTA   — legacy closing, pending rewrite in B.2b.4.
 *   6. Footer
 */
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-ink-0)]">
      <Hero />
      <Servicios />
      <SocialProof />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
