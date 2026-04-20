import WhatsAppHero from "@/components/solucoes/WhatsAppHero";
import WhatsAppMock from "@/components/solucoes/WhatsAppMock";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Recepción WhatsApp con IA | NorteNode",
  description:
    "Agente IA en tu WhatsApp Business. Atiende, cualifica y agenda 24/7 con integración oficial de Meta.",
};

/**
 * /solucoes/whatsapp — Cinematic Authority rework.
 *
 *   1. Hero de página      — eyebrow, display headline, sub, dual CTA.
 *   2. Mock conversación   — unboxed, authentic WhatsApp colours inside.
 *   3. Integración 3 pasos — pending wiring in B.3.2.
 *   4. Capacidades         — pending wiring in B.3.2.
 *   5. CTA final           — pending wiring in B.3.2.
 *   6. Footer
 */
export default function WhatsAppPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-ink-0)]">
      <WhatsAppHero />
      <WhatsAppMock />
      <Footer />
    </main>
  );
}
