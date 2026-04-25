import WidgetHero from "@/components/solucoes/WidgetHero";
import WidgetMock from "@/components/solucoes/WidgetMock";
import WidgetBelowHero from "@/components/solucoes/WidgetBelowHero";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Widget Web IA",
  description:
    "Chat en tu site que responde en menos de 2 s y captura el lead con contexto. Instalación en un único script.",
};

/**
 * /solucoes/widget-web — Cinematic Authority rework.
 *
 *   1. WidgetHero          — eyebrow, display headline, sub, dual CTA.
 *   2. WidgetMock          — unboxed panel over blurred pretend-website.
 *   3. SolucoesIntegration (3 steps).
 *   4. SolucoesCapabilities (6 bullets in 2 cols).
 *   5. SolucoesFinalCTA    — closing full-bleed.
 *   6. Footer.
 */
export default function WidgetWebPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-ink-0)]">
      <WidgetHero />
      <WidgetMock />
      <WidgetBelowHero />
      <Footer />
    </main>
  );
}
