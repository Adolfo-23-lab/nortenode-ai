import WidgetBody from "@/components/solucoes/WidgetBody";
import Footer from "@/components/Footer";
import { pt } from "@/i18n/dictionary";

const w = pt.solucoes.widget;

export const metadata = {
  title:       w.meta_title_v2,
  description: w.meta_description_v2,
};

export default function WidgetWebPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg-v2)]">
      <WidgetBody />
      <Footer />
    </main>
  );
}
