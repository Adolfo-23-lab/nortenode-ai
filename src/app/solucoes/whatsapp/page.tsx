import WhatsAppHero from "@/components/solucoes/WhatsAppHero";
import WhatsAppMock from "@/components/solucoes/WhatsAppMock";
import WhatsAppBelowHero from "@/components/solucoes/WhatsAppBelowHero";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Recepción WhatsApp con IA | NorteNode",
  description:
    "Agente IA en tu WhatsApp Business. Atiende, cualifica y agenda 24/7 con integración oficial de Meta.",
};

/**
 * /solucoes/whatsapp — Cinematic Authority rework.
 *
 *   1. WhatsAppHero       — eyebrow, display headline, sub, dual CTA.
 *   2. WhatsAppMock       — unboxed conversation, authentic WhatsApp colours.
 *   3. SolucoesIntegration (3 steps).
 *   4. SolucoesCapabilities (6 bullets in 2 cols).
 *   5. SolucoesFinalCTA   — closing full-bleed.
 *   6. Footer.
 */
export default function WhatsAppPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-ink-0)]">
      <WhatsAppHero />
      <WhatsAppMock />
      <WhatsAppBelowHero />
      <Footer />
    </main>
  );
}
