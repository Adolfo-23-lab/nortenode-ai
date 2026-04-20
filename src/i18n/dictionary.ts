/**
 * NorteNode · copy catalogues for the marketing site.
 *
 * Keys are nested for readability.  Accessed via the `useT()` hook, which
 * returns a dot-path resolver.  String values may contain literal HTML
 * newlines `\n` to break into display lines — components handle that.
 *
 * All three locales MUST satisfy the `Dictionary` interface, so a
 * compile error is raised if any key drifts between locales.
 */

export interface FAQEntry {
  q: string;
  a: string;
}

export interface ServiceItem {
  num: string;
  name: string;
  desc: string;
  tag: string;
}

export interface Dictionary {
  common: {
    brand: string; tagline: string;
    cta_primary: string; cta_secondary: string;
    language_label: string;
  };
  nav: {
    home: string; demo: string; solutions: string;
    about: string; contact: string; login: string;
    whatsapp: string; widget: string;
  };
  hero: {
    eyebrow: string;
    headline_l1: string; headline_l2: string; headline_l3: string;
    sub: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: ServiceItem[];
  };
  social: {
    eyebrow: string;
    title: string;
    logos_label: string;
    coming_soon: string;
    testimonial_role_placeholder: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FAQEntry[];
  };
  cta: {
    eyebrow: string;
    headline: string;
    primary: string;
    secondary: string;
  };
  footer: {
    blurb: string;
    sections: { product: string; company: string; legal: string };
    rights: string; privacy: string; terms: string;
  };
}

export const es: Dictionary = {
  common: {
    brand: "NorteNode",
    tagline: "Recepcionista IA 24/7",
    cta_primary: "Ver demo en vivo",
    cta_secondary: "Hablar con nosotros",
    language_label: "Idioma",
  },
  nav: {
    home: "Inicio",
    demo: "Demo",
    solutions: "Soluciones",
    about: "Nosotros",
    contact: "Contacto",
    login: "Entrar",
    whatsapp: "WhatsApp",
    widget: "Widget Web",
  },
  hero: {
    eyebrow: "NORTENODE · RECEPCIÓN IA",
    headline_l1: "LA RECEPCIÓN",
    headline_l2: "INVISIBLE.",
    headline_l3: "",
    sub: "Respondemos por ti, 24 horas al día.",
  },
  services: {
    eyebrow: "Lo que construimos",
    title: "Tres piezas. Una sola recepción.",
    items: [
      {
        num: "01",
        name: "Recepción WhatsApp con IA",
        desc:
          "El agente atiende, cualifica y agenda directamente en el WhatsApp Business " +
          "de tu negocio. Integración oficial, cero latencia, sin caídas.",
        tag: "WhatsApp Business API",
      },
      {
        num: "02",
        name: "Widget web conversacional",
        desc:
          "Un chat ligero en tu sitio que responde en menos de dos segundos, capta el " +
          "lead con contexto completo y lo pasa al equipo listo para cerrar.",
        tag: "Next.js · 2s de respuesta",
      },
      {
        num: "03",
        name: "Landing + integración completa",
        desc:
          "Diseñamos y entregamos la página nueva con el widget conectado, dominio, " +
          "analítica y SEO técnico listos para convertir desde el día uno.",
        tag: "Producción en 72 h",
      },
    ],
  },
  social: {
    eyebrow: "Prueba social",
    title: "Historias reales en camino.",
    logos_label: "Negocios que confían en NorteNode",
    coming_soon: "Próximamente",
    testimonial_role_placeholder: "Testimonio pendiente",
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que nos preguntan antes de firmar.",
    items: [
      {
        q: "¿Cuánto tarda en estar listo mi bot?",
        a:
          "Configuramos, entrenamos y dejamos operativo tu agente en 72 horas hábiles " +
          "desde la kick-off. Incluye revisión de flujo y ajuste de guion con tu equipo.",
      },
      {
        q: "¿Qué necesito tener antes de contratar?",
        a:
          "Un número WhatsApp Business verificado o la intención de migrar a uno, " +
          "una lista de servicios y precios, y una persona de contacto para 30 min " +
          "de alineación inicial. Nosotros hacemos el resto.",
      },
      {
        q: "¿Cómo se integra con mi WhatsApp?",
        a:
          "Usamos la API oficial de WhatsApp Business de Meta. Tus conversaciones, " +
          "plantillas y número quedan bajo tu dominio — no usamos soluciones no " +
          "oficiales ni cuentas que puedan ser suspendidas.",
      },
      {
        q: "¿Es multilingüe?",
        a:
          "Sí. Los agentes responden en portugués, español e inglés de forma nativa. " +
          "Si un cliente escribe en un idioma, la IA responde en ese idioma " +
          "sin intervención humana.",
      },
      {
        q: "¿Qué soporte ofrecen después?",
        a:
          "Monitorizamos cada conversación en tiempo real, hacemos ajustes mensuales " +
          "sobre lo que convierte y lo que no, y mantenemos actualizaciones de la " +
          "plataforma Meta incluidas sin coste extra.",
      },
    ],
  },
  cta: {
    eyebrow: "Listos cuando tú lo estés",
    headline: "¿Listo para automatizar tu recepción?",
    primary: "Hablar con nosotros",
    secondary: "Ver la demo primero",
  },
  footer: {
    blurb: "Recepcionista IA 24/7 para pequeños negocios.",
    sections: {
      product: "Producto",
      company: "Empresa",
      legal: "Legal",
    },
    rights: "Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos",
  },
};

export const en: Dictionary = {
  common: {
    brand: "NorteNode",
    tagline: "AI receptionist 24/7",
    cta_primary: "See live demo",
    cta_secondary: "Talk to us",
    language_label: "Language",
  },
  nav: {
    home: "Home",
    demo: "Demo",
    solutions: "Solutions",
    about: "About",
    contact: "Contact",
    login: "Sign in",
    whatsapp: "WhatsApp",
    widget: "Web Widget",
  },
  hero: {
    eyebrow: "NORTENODE · AI RECEPTION",
    headline_l1: "THE INVISIBLE",
    headline_l2: "RECEPTION.",
    headline_l3: "",
    sub: "We answer for you, around the clock.",
  },
  services: {
    eyebrow: "What we build",
    title: "Three pieces. One reception.",
    items: [
      {
        num: "01",
        name: "WhatsApp AI reception",
        desc:
          "The agent attends, qualifies and books directly on your WhatsApp Business " +
          "number. Official integration, zero latency, no downtime.",
        tag: "WhatsApp Business API",
      },
      {
        num: "02",
        name: "Conversational web widget",
        desc:
          "A lightweight chat on your site that replies in under two seconds, captures " +
          "the lead with full context and hands it to your team ready to close.",
        tag: "Next.js · 2s reply",
      },
      {
        num: "03",
        name: "Landing + full integration",
        desc:
          "We design and ship the new page with the widget wired, domain, analytics " +
          "and technical SEO ready to convert from day one.",
        tag: "72-hour delivery",
      },
    ],
  },
  social: {
    eyebrow: "Social proof",
    title: "Real stories, on their way.",
    logos_label: "Businesses trusting NorteNode",
    coming_soon: "Coming soon",
    testimonial_role_placeholder: "Testimonial pending",
  },
  faq: {
    eyebrow: "Frequently asked",
    title: "Everything clients ask before signing.",
    items: [
      {
        q: "How long until my bot is live?",
        a:
          "We configure, train and go live in 72 business hours from kick-off. " +
          "This includes flow review and script alignment with your team.",
      },
      {
        q: "What do I need before signing?",
        a:
          "A verified WhatsApp Business number (or the intent to migrate to one), a " +
          "list of services and prices, and one person for a 30-minute alignment " +
          "call. We handle the rest.",
      },
      {
        q: "How does it integrate with my WhatsApp?",
        a:
          "We use Meta's official WhatsApp Business API. Your conversations, " +
          "templates and number stay under your control — no grey-area tools " +
          "that can be suspended.",
      },
      {
        q: "Is it multilingual?",
        a:
          "Yes. Agents respond natively in Portuguese, Spanish and English. When a " +
          "customer writes in one language the AI replies in that language with no " +
          "human intervention.",
      },
      {
        q: "What support do you offer after launch?",
        a:
          "We monitor every conversation in real time, make monthly adjustments on " +
          "what converts and what doesn't, and keep Meta platform updates included " +
          "at no extra cost.",
      },
    ],
  },
  cta: {
    eyebrow: "Ready when you are",
    headline: "Ready to automate your reception?",
    primary: "Talk to us",
    secondary: "See the demo first",
  },
  footer: {
    blurb: "AI receptionist 24/7 for small businesses.",
    sections: { product: "Product", company: "Company", legal: "Legal" },
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
  },
};

export const pt: Dictionary = {
  common: {
    brand: "NorteNode",
    tagline: "Rececionista IA 24/7",
    cta_primary: "Ver demo ao vivo",
    cta_secondary: "Falar connosco",
    language_label: "Idioma",
  },
  nav: {
    home: "Início",
    demo: "Demo",
    solutions: "Soluções",
    about: "Quem somos",
    contact: "Contactos",
    login: "Entrar",
    whatsapp: "WhatsApp",
    widget: "Widget Web",
  },
  hero: {
    eyebrow: "NORTENODE · RECEÇÃO IA",
    headline_l1: "A RECEÇÃO",
    headline_l2: "INVISÍVEL.",
    headline_l3: "",
    sub: "Respondemos por ti, 24 horas por dia.",
  },
  services: {
    eyebrow: "O que construímos",
    title: "Três peças. Uma só receção.",
    items: [
      {
        num: "01",
        name: "Receção WhatsApp com IA",
        desc:
          "O agente atende, qualifica e agenda diretamente no WhatsApp Business " +
          "da tua clínica. Integração oficial, latência zero, sem quedas.",
        tag: "WhatsApp Business API",
      },
      {
        num: "02",
        name: "Widget web conversacional",
        desc:
          "Um chat leve no teu site que responde em menos de dois segundos, capta o " +
          "lead com contexto completo e passa-o à equipa pronto a fechar.",
        tag: "Next.js · 2s de resposta",
      },
      {
        num: "03",
        name: "Landing + integração completa",
        desc:
          "Desenhamos e entregamos a página nova com o widget ligado, domínio, " +
          "analítica e SEO técnico prontos a converter desde o primeiro dia.",
        tag: "Entrega em 72 h",
      },
    ],
  },
  social: {
    eyebrow: "Prova social",
    title: "Histórias reais a caminho.",
    logos_label: "Negócios que confiam na NorteNode",
    coming_soon: "Em breve",
    testimonial_role_placeholder: "Testemunho em preparação",
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    title: "O que nos perguntam antes de assinar.",
    items: [
      {
        q: "Quanto tempo demora a ter o bot pronto?",
        a:
          "Configuramos, treinamos e deixamos operacional em 72 horas úteis a partir " +
          "do kick-off. Inclui revisão do fluxo e alinhamento do guião com a equipa.",
      },
      {
        q: "O que preciso de ter antes de contratar?",
        a:
          "Um número WhatsApp Business verificado (ou vontade de migrar para um), " +
          "uma lista de serviços e preços, e uma pessoa para 30 min de alinhamento " +
          "inicial. O resto é connosco.",
      },
      {
        q: "Como se integra com o meu WhatsApp?",
        a:
          "Usamos a API oficial WhatsApp Business da Meta. As conversas, templates " +
          "e número ficam sob o teu controlo — não usamos soluções cinzentas que " +
          "possam ser suspensas.",
      },
      {
        q: "É multilingue?",
        a:
          "Sim. Os agentes respondem nativamente em português, espanhol e inglês. " +
          "Se o cliente escreve num idioma, a IA responde nesse idioma, sem " +
          "intervenção humana.",
      },
      {
        q: "Que suporte oferecem depois?",
        a:
          "Monitorizamos cada conversa em tempo real, fazemos ajustes mensais " +
          "sobre o que converte e o que não, e mantemos as actualizações da " +
          "plataforma Meta incluídas sem custo extra.",
      },
    ],
  },
  cta: {
    eyebrow: "Prontos quando tu estiveres",
    headline: "Pronto para automatizar a tua receção?",
    primary: "Falar connosco",
    secondary: "Ver a demo primeiro",
  },
  footer: {
    blurb: "Rececionista IA 24/7 para pequenos negócios.",
    sections: { product: "Produto", company: "Empresa", legal: "Legal" },
    rights: "Todos os direitos reservados.",
    privacy: "Privacidade",
    terms: "Termos",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { es, en, pt };
export type Locale = "es" | "en" | "pt";
export const LOCALES: readonly Locale[] = ["es", "en", "pt"];
