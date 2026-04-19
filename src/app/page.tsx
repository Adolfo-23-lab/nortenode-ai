import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import VerticalsShowcase from "@/components/VerticalsShowcase";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

/**
 * Marketing home — narrative flow:
 *   1. Hero          — full-bleed cinematic.  "La IA responde, tú cobras."
 *   2. SocialProof   — hard numbers after the emotional hit.
 *   3. Verticals     — who it's for, one video per vertical.
 *   4. HowItWorks    — mechanics, three-step editorial.
 *   5. Pricing       — commercial offer.
 *   6. FinalCTA      — closing full-bleed.  Video book-ends the Hero.
 *   7. Footer
 */
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-ink-0)]">
      <Hero />
      <SocialProof />
      <VerticalsShowcase />
      <HowItWorks />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
