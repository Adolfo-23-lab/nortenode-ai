import Footer from "@/components/Footer";
import ContactosBody from "@/components/contactos/ContactosBody";
import { pt } from "@/i18n/dictionary";

// Metadata is server-side static; we source it from the pt-PT locale
// (the primary site language) while the client-side I18nProvider
// swaps the in-page copy after hydration for the active locale.
const c = pt.contactos;

export const metadata = {
  title: c.meta_title,
  description: c.meta_description,
};

export default function ContactosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-bg-v2)]">
      <ContactosBody />
      <Footer />
    </main>
  );
}
