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

export interface PricingTier {
  name: string;
  price: number | null;
  tagline: string;
  featured?: boolean;
  features: string[];
  cta: string;
}

export interface Dictionary {
  common: {
    brand: string; tagline: string;
    cta_primary: string; cta_secondary: string; cta_contact: string;
    badge_live: string; language_label: string;
  };
  nav: {
    home: string; demo: string; solutions: string; pricing: string;
    about: string; contact: string; login: string;
    whatsapp: string; widget: string;
  };
  hero: {
    eyebrow: string;
    headline_l1: string; headline_l2: string; headline_l3: string;
    sub: string;
    metric_response_label: string; metric_response_value: string;
    metric_coverage_label: string; metric_coverage_value: string;
    metric_conversion_label: string; metric_conversion_value: string;
    trust: string;
  };
  verticals: {
    eyebrow: string; title: string; sub: string;
    barbershop: { name: string; tag: string };
    tattoo:     { name: string; tag: string };
    locksmith:  { name: string; tag: string };
    gym:        { name: string; tag: string };
  };
  how: {
    eyebrow: string; title: string;
    steps: Array<{ n: string; title: string; body: string }>;
  };
  stats: {
    leads: string; saved: string; response: string; uptime: string;
  };
  pricing: {
    eyebrow: string; title: string; sub: string;
    currency: string; per: string;
    tiers: PricingTier[];
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
    cta_secondary: "Ver planes",
    cta_contact: "Hablar con ventas",
    badge_live: "Online ahora",
    language_label: "Idioma",
  },
  nav: {
    home: "Inicio",
    demo: "Demo",
    solutions: "Soluciones",
    pricing: "Precios",
    about: "Nosotros",
    contact: "Contacto",
    login: "Entrar",
    whatsapp: "WhatsApp",
    widget: "Widget Web",
  },
  hero: {
    eyebrow: "SaaS · Tecnología conversacional",
    headline_l1: "El cliente escribe.",
    headline_l2: "La IA responde.",
    headline_l3: "Tú cobras.",
    sub:
      "Barbería, tatuaje, cerrajería, gimnasio. Una recepcionista IA que contesta en segundos, " +
      "cualifica al cliente y reserva la cita, aunque sea domingo a las 3 de la madrugada.",
    metric_response_label: "Tiempo de respuesta medio",
    metric_response_value: "1.2s",
    metric_coverage_label: "Cobertura",
    metric_coverage_value: "24/7",
    metric_conversion_label: "Conversión",
    metric_conversion_value: "+34%",
    trust: "Sin permanencia · Prueba gratis · GDPR compliant",
  },
  verticals: {
    eyebrow: "Negocios que ya lo usan",
    title: "Una IA por vertical, no un chatbot genérico.",
    sub: "Cada agente aprende el léxico, los servicios y la agenda de tu negocio.",
    barbershop: {
      name: "Barbería",
      tag: "Corte, barba, agenda cerrada.",
    },
    tattoo: {
      name: "Estudio de Tatuaje",
      tag: "Pre-cualifica ideas antes de la consulta.",
    },
    locksmith: {
      name: "Cerrajería 24h",
      tag: "Emergencias con respuesta en 15 min.",
    },
    gym: {
      name: "Gimnasio",
      tag: "Convierte visitas en clases de prueba.",
    },
  },
  how: {
    eyebrow: "Cómo funciona",
    title: "De visita a reserva en menos de 2 minutos.",
    steps: [
      {
        n: "01",
        title: "El cliente escribe",
        body:
          "Vía WhatsApp o widget web, a cualquier hora. En español, portugués o inglés.",
      },
      {
        n: "02",
        title: "La IA cualifica y agenda",
        body:
          "Pregunta por el servicio, verifica disponibilidad y confirma la cita en segundos.",
      },
      {
        n: "03",
        title: "Tú recibes el lead",
        body:
          "Notificación instantánea por WhatsApp y email. Todo en tu panel, en tiempo real.",
      },
    ],
  },
  stats: {
    leads: "Leads cualificados / mes",
    saved: "Horas ahorradas / semana",
    response: "Respuesta media",
    uptime: "Disponibilidad",
  },
  pricing: {
    eyebrow: "Planes",
    title: "Precio cerrado. Sin letra pequeña.",
    sub: "Cancela cuando quieras. Migración incluida.",
    currency: "€",
    per: "/mes",
    tiers: [
      {
        name: "Starter",
        price: 49,
        tagline: "Widget web + bot básico",
        features: [
          "Agente IA en el widget web",
          "1 canal, hasta 500 mensajes/mes",
          "Dashboard multi-usuario",
          "Notificaciones por email",
        ],
        cta: "Empezar con Starter",
      },
      {
        name: "Pro",
        price: 97,
        tagline: "+ WhatsApp Meta API 24/7",
        featured: true,
        features: [
          "Todo lo de Starter",
          "Integración WhatsApp Business oficial",
          "Respuestas multilingüe (ES/EN/PT)",
          "Alertas WhatsApp al dueño",
          "Mensajes ilimitados",
        ],
        cta: "Hablar con ventas",
      },
      {
        name: "Agency",
        price: null,
        tagline: "Integraciones a medida",
        features: [
          "Todo lo de Pro",
          "Integraciones con tu ERP/CRM",
          "Soporte dedicado",
          "SLA empresarial",
        ],
        cta: "Solicitar propuesta",
      },
    ],
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
    cta_secondary: "View pricing",
    cta_contact: "Talk to sales",
    badge_live: "Live now",
    language_label: "Language",
  },
  nav: {
    home: "Home",
    demo: "Demo",
    solutions: "Solutions",
    pricing: "Pricing",
    about: "About",
    contact: "Contact",
    login: "Sign in",
    whatsapp: "WhatsApp",
    widget: "Web Widget",
  },
  hero: {
    eyebrow: "SaaS · Conversational tech",
    headline_l1: "They message.",
    headline_l2: "The AI replies.",
    headline_l3: "You get paid.",
    sub:
      "Barbershop, tattoo studio, locksmith, gym. An AI receptionist that answers in seconds, " +
      "qualifies the lead and books the slot — even on Sunday at 3 am.",
    metric_response_label: "Avg. response",
    metric_response_value: "1.2s",
    metric_coverage_label: "Coverage",
    metric_coverage_value: "24/7",
    metric_conversion_label: "Conversion",
    metric_conversion_value: "+34%",
    trust: "No lock-in · Free trial · GDPR ready",
  },
  verticals: {
    eyebrow: "Businesses using it",
    title: "A vertical-trained AI, not a generic chatbot.",
    sub: "Each agent learns your services, tone, and booking rules.",
    barbershop: { name: "Barbershop", tag: "Cut, beard, packed calendar." },
    tattoo:     { name: "Tattoo Studio", tag: "Pre-qualifies ideas before the consult." },
    locksmith:  { name: "24h Locksmith", tag: "Emergencies answered in 15 min." },
    gym:        { name: "Gym", tag: "Turns visitors into free trials." },
  },
  how: {
    eyebrow: "How it works",
    title: "From visitor to booking in under 2 minutes.",
    steps: [
      { n: "01", title: "They message you",
        body: "Via WhatsApp or web widget, anytime. English, Spanish, Portuguese." },
      { n: "02", title: "AI qualifies + books",
        body: "Asks about service, checks availability, confirms the slot in seconds." },
      { n: "03", title: "You get the lead",
        body: "Instant alert on WhatsApp and email. Everything in your dashboard, live." },
    ],
  },
  stats: {
    leads: "Qualified leads / month",
    saved: "Hours saved / week",
    response: "Avg. response",
    uptime: "Uptime",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Flat price. No fine print.",
    sub: "Cancel anytime. Migration included.",
    currency: "€",
    per: "/mo",
    tiers: [
      {
        name: "Starter", price: 49, tagline: "Web widget + basic bot",
        features: [
          "AI agent on your web widget",
          "1 channel, up to 500 msgs/mo",
          "Multi-user dashboard",
          "Email notifications",
        ],
        cta: "Start with Starter",
      },
      {
        name: "Pro", price: 97, tagline: "+ WhatsApp Meta API 24/7", featured: true,
        features: [
          "Everything in Starter",
          "Official WhatsApp Business integration",
          "Multilingual replies (EN/ES/PT)",
          "Owner WhatsApp alerts",
          "Unlimited messages",
        ],
        cta: "Talk to sales",
      },
      {
        name: "Agency", price: null, tagline: "Custom integrations",
        features: ["Everything in Pro", "ERP/CRM integrations", "Dedicated support", "Enterprise SLA"],
        cta: "Request proposal",
      },
    ],
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
    cta_secondary: "Ver preços",
    cta_contact: "Falar com vendas",
    badge_live: "Em linha",
    language_label: "Idioma",
  },
  nav: {
    home: "Início",
    demo: "Demo",
    solutions: "Soluções",
    pricing: "Preços",
    about: "Quem somos",
    contact: "Contactos",
    login: "Entrar",
    whatsapp: "WhatsApp",
    widget: "Widget Web",
  },
  hero: {
    eyebrow: "SaaS · Tecnologia conversacional",
    headline_l1: "O cliente escreve.",
    headline_l2: "A IA responde.",
    headline_l3: "Tu recebes.",
    sub:
      "Barbearia, tatuagem, serralharia, ginásio. Uma rececionista IA que responde em segundos, " +
      "qualifica o cliente e marca a consulta — mesmo ao domingo às 3h da manhã.",
    metric_response_label: "Resposta média",
    metric_response_value: "1.2s",
    metric_coverage_label: "Cobertura",
    metric_coverage_value: "24/7",
    metric_conversion_label: "Conversão",
    metric_conversion_value: "+34%",
    trust: "Sem fidelização · Teste grátis · GDPR",
  },
  verticals: {
    eyebrow: "Negócios que já usam",
    title: "Uma IA por vertical, não um chatbot genérico.",
    sub: "Cada agente aprende o léxico, os serviços e a agenda do teu negócio.",
    barbershop: { name: "Barbearia", tag: "Corte, barba, agenda cheia." },
    tattoo:     { name: "Studio de Tatuagem", tag: "Pré-qualifica ideias antes da consulta." },
    locksmith:  { name: "Serralharia 24h", tag: "Emergências respondidas em 15 min." },
    gym:        { name: "Ginásio", tag: "Converte visitas em aulas experimentais." },
  },
  how: {
    eyebrow: "Como funciona",
    title: "De visita a marcação em menos de 2 minutos.",
    steps: [
      { n: "01", title: "O cliente escreve",
        body: "Via WhatsApp ou widget web, a qualquer hora. Em PT, ES ou EN." },
      { n: "02", title: "A IA qualifica e agenda",
        body: "Pergunta o serviço, verifica disponibilidade e confirma em segundos." },
      { n: "03", title: "Tu recebes o lead",
        body: "Alerta instantâneo por WhatsApp e email. Tudo no teu painel, ao vivo." },
    ],
  },
  stats: {
    leads: "Leads qualificados / mês",
    saved: "Horas poupadas / semana",
    response: "Resposta média",
    uptime: "Disponibilidade",
  },
  pricing: {
    eyebrow: "Planos",
    title: "Preço fechado. Sem letras pequenas.",
    sub: "Cancela quando quiseres. Migração incluída.",
    currency: "€",
    per: "/mês",
    tiers: [
      {
        name: "Starter", price: 49, tagline: "Widget web + bot básico",
        features: [
          "Agente IA no widget web",
          "1 canal, até 500 mensagens/mês",
          "Dashboard multi-utilizador",
          "Notificações por email",
        ],
        cta: "Começar com Starter",
      },
      {
        name: "Pro", price: 97, tagline: "+ WhatsApp Meta API 24/7", featured: true,
        features: [
          "Tudo do Starter",
          "Integração oficial WhatsApp Business",
          "Respostas multilingue (PT/ES/EN)",
          "Alertas WhatsApp para o dono",
          "Mensagens ilimitadas",
        ],
        cta: "Falar com vendas",
      },
      {
        name: "Agency", price: null, tagline: "Integrações à medida",
        features: ["Tudo do Pro", "Integrações ERP/CRM", "Suporte dedicado", "SLA empresarial"],
        cta: "Pedir proposta",
      },
    ],
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
