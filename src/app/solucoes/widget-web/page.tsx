import WidgetHero from "@/components/solucoes/WidgetHero";
import WidgetMock from "@/components/solucoes/WidgetMock";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Widget Web IA | NorteNode",
  description:
    "Chat en tu site que responde en menos de 2 s y captura el lead con contexto. Instalación en un único script.",
};

/**
 * /solucoes/widget-web — Cinematic Authority rework.
 *
 *   1. WidgetHero        — eyebrow, display headline, sub, dual CTA.
 *   2. WidgetMock        — unboxed panel floating over a blurred
 *                          "pretend-website" layer.
 *   3. SolucoesIntegration (3 steps) — pending wiring in B.3.4.
 *   4. SolucoesCapabilities        — pending wiring in B.3.4.
 *   5. SolucoesFinalCTA            — pending wiring in B.3.4.
 *   6. Footer.
 */
export default function WidgetWebPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-ink-0)]">
      <WidgetHero />
      <WidgetMock />
      <Footer />
    </main>
  );
}
