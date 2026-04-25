import Footer from "@/components/Footer";
import DemoBody from "@/components/demo/DemoBody";
import { pt } from "@/i18n/dictionary";

const d = pt.demo;

export const metadata = {
  title: d.meta_title,
  description: d.meta_description,
};

export default function DemoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg-v2)]">
      <DemoBody />
      <Footer />
    </main>
  );
}
