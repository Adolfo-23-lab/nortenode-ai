import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Contactos | NorteNode",
  description:
    "Entre em contacto com a NorteNode. Email, WhatsApp e localização em Vila Nova de Gaia, Porto.",
};

const contacts = [
  {
    label: "Email",
    value: "nortenode.ia@gmail.com",
    href: "mailto:nortenode.ia@gmail.com",
    external: false,
    Icon: Mail,
  },
  {
    label: "Telemóvel",
    value: "+351 937 809 995",
    href: "tel:+351937809995",
    external: false,
    Icon: Phone,
  },
  {
    label: "WhatsApp",
    value: "Enviar mensagem",
    href: "https://wa.me/351937809995",
    external: true,
    Icon: MessageCircle,
  },
  {
    label: "Localização",
    value: "Vila Nova de Gaia, Portugal",
    href: null,
    external: false,
    Icon: MapPin,
  },
];

export default function ContactosPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-20">

      {/* Heading */}
      <section className="pt-16 pb-12 px-5 md:px-8 max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-zinc-600 mb-5">Contactos</p>
        <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tight leading-[0.92]">
          Fale
        </h1>
        <h1 className="text-6xl md:text-9xl font-bold text-zinc-600 tracking-tight leading-[0.92]">
          Connosco.
        </h1>
        <p className="text-sm text-zinc-500 mt-8 max-w-sm leading-relaxed">
          Estamos sempre disponíveis para falar sobre como a IA pode transformar a sua clínica.
        </p>
      </section>

      {/* Contact rows */}
      <section className="px-5 md:px-8 max-w-7xl mx-auto pb-16">
        <div className="divide-y divide-zinc-800 border-t border-zinc-800">
          {contacts.map((c) =>
            c.href ? (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center justify-between py-7 -mx-5 md:-mx-8 px-5 md:px-8 group hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-5 md:gap-8">
                  <span className="text-xs uppercase tracking-widest text-zinc-600 w-20 md:w-28 shrink-0">
                    {c.label}
                  </span>
                  <span className="text-base md:text-lg font-medium text-zinc-400 group-hover:text-white transition-colors">
                    {c.value}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-signal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
              </a>
            ) : (
              <div
                key={c.label}
                className="flex items-center py-7 -mx-5 md:-mx-8 px-5 md:px-8"
              >
                <div className="flex items-center gap-5 md:gap-8">
                  <span className="text-xs uppercase tracking-widest text-zinc-600 w-20 md:w-28 shrink-0">
                    {c.label}
                  </span>
                  <span className="text-base md:text-lg font-medium text-zinc-500">
                    {c.value}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Map */}
      <section className="px-5 md:px-8 max-w-7xl mx-auto pb-24">
        <div className="rounded-2xl overflow-hidden border border-zinc-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48076.95474874805!2d-8.6443!3d41.1236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2465abc4e153c1%3A0xa648d95640cfd193!2sVila%20Nova%20de%20Gaia!5e0!3m2!1spt-PT!2spt!4v1704067200000!5m2!1spt-PT!2spt"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização NorteNode — Vila Nova de Gaia"
            className="w-full [filter:invert(95%)_hue-rotate(180deg)_brightness(80%)_contrast(85%)]"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
