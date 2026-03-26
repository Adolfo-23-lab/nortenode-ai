import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contactos | NorteNode AI",
  description: "Entre em contacto com a NorteNode AI. Email, WhatsApp e localização em Vila Nova de Gaia, Porto.",
};

const contacts = [
  {
    icon: <Mail className="w-7 h-7 text-emerald-400" />,
    label: "Email",
    value: "nortenode.ia@gmail.com",
    href: "mailto:nortenode.ia@gmail.com",
  },
  {
    icon: <Phone className="w-7 h-7 text-blue-400" />,
    label: "Telemóvel",
    value: "+351 937 809 995",
    href: "tel:+351937809995",
  },
  {
    icon: <MessageCircle className="w-7 h-7 text-green-400" />,
    label: "WhatsApp",
    value: "Enviar mensagem",
    href: "https://wa.me/351937809995",
  },
  {
    icon: <MapPin className="w-7 h-7 text-amber-400" />,
    label: "Localização",
    value: "Vila Nova de Gaia, Portugal",
    href: null,
  },
];

export default function ContactosPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Contactos
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Estamos sempre disponíveis para falar sobre como a IA pode transformar a sua clínica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left — Contact cards */}
          <div className="space-y-4">
            {contacts.map((contact, i) => {
              const Wrapper = contact.href ? "a" : "div";
              const extraProps = contact.href
                ? {
                    href: contact.href,
                    target: contact.href.startsWith("http") ? "_blank" as const : undefined,
                    rel: contact.href.startsWith("http") ? "noopener noreferrer" : undefined,
                  }
                : {};

              return (
                <Wrapper
                  key={i}
                  {...extraProps}
                  className="glass rounded-2xl p-6 border border-white/10 flex items-center gap-5 hover:border-emerald-500/30 transition-colors group block"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/10 transition-colors">
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase tracking-wider font-medium mb-1">{contact.label}</p>
                    <p className="text-lg text-white font-semibold">{contact.value}</p>
                  </div>
                </Wrapper>
              );
            })}
          </div>

          {/* Right — Google Maps */}
          <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48076.95474874805!2d-8.6443!3d41.1236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2465abc4e153c1%3A0xa648d95640cfd193!2sVila%20Nova%20de%20Gaia!5e0!3m2!1spt-PT!2spt!4v1704067200000!5m2!1spt-PT!2spt"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização NorteNode AI — Vila Nova de Gaia"
              className="w-full [filter:invert(95%)_hue-rotate(180deg)_brightness(80%)_contrast(85%)]"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
