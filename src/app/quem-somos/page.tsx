import Footer from "@/components/Footer";
import QuemSomosBody from "@/components/quem-somos/QuemSomosBody";
import { pt } from "@/i18n/dictionary";

const q = pt.quem_somos;

export const metadata = {
  title: q.meta_title,
  description: q.meta_description,
};

export default function QuemSomosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg-v2)]">
      <QuemSomosBody />
      <Footer />
    </main>
  );
}
