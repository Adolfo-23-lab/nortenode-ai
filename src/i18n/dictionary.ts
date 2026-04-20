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

export interface SolucoesStep {
  num: string;
  title: string;
  body: string;
}

export interface WhatsAppMockMessage {
  role: "user" | "bot";
  text: string;
  time: string;
}

export interface WidgetMockMessage {
  role: "user" | "bot";
  text: string;
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
  solucoes: {
    common: {
      integration_eyebrow: string;
      integration_title: string;
      capabilities_eyebrow: string;
      capabilities_title: string;
      cta_eyebrow: string;
      cta_primary: string;
      cta_secondary: string;
    };
    whatsapp: {
      meta_title: string;
      meta_description: string;
      hero: {
        eyebrow: string;
        headline_l1: string;
        headline_l2: string;
        sub: string;
      };
      mock: {
        section_label: string;
        business_name: string;
        business_status: string;
        messages: WhatsAppMockMessage[];
      };
      integration_steps: SolucoesStep[];
      capabilities: string[];
      cta_headline: string;
    };
    widget: {
      meta_title: string;
      meta_description: string;
      hero: {
        eyebrow: string;
        headline_l1: string;
        headline_l2: string;
        sub: string;
      };
      mock: {
        section_label: string;
        bot_name: string;
        bot_status: string;
        messages: WidgetMockMessage[];
      };
      integration_steps: SolucoesStep[];
      capabilities: string[];
      cta_headline: string;
    };
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
  solucoes: {
    common: {
      integration_eyebrow: "Cómo funciona",
      integration_title: "Activo en 72 horas.",
      capabilities_eyebrow: "Capacidades",
      capabilities_title: "Todo lo que hace por ti.",
      cta_eyebrow: "Listos cuando tú lo estés",
      cta_primary: "Hablar con nosotros",
      cta_secondary: "Ver la demo primero",
    },
    whatsapp: {
      meta_title: "Recepción WhatsApp con IA | NorteNode",
      meta_description:
        "Agente IA en tu WhatsApp Business. Atiende, cualifica y agenda 24/7 con integración oficial de Meta.",
      hero: {
        eyebrow: "Recepción WhatsApp · Producto 01",
        headline_l1: "Atiende cuando",
        headline_l2: "tu negocio está cerrado.",
        sub: "Integración oficial de WhatsApp Business. Responde, cualifica y agenda en segundos, 24/7.",
      },
      mock: {
        section_label: "Ejemplo · Barbería",
        business_name: "Barbería Silva",
        business_status: "en línea",
        messages: [
          { role: "bot",  text: "¡Hola! Bienvenido a Barbería Silva. ¿En qué te ayudo?",  time: "10:02" },
          { role: "user", text: "Quería agendar corte + barba para el sábado",             time: "10:03" },
          { role: "bot",  text: "Tengo el sábado a las 10:30 o 15:00 con João. ¿Cuál prefieres?", time: "10:03" },
          { role: "user", text: "10:30 perfecto",                                           time: "10:04" },
          { role: "bot",  text: "Agendado: sábado 10:30 con João. Te esperamos ✅",        time: "10:04" },
        ],
      },
      integration_steps: [
        {
          num: "01",
          title: "Contratas",
          body: "Firmas y abrimos el onboarding en menos de 24 h. Cero fricción técnica por tu lado.",
        },
        {
          num: "02",
          title: "Configuramos la cuenta",
          body: "Conectamos tu WhatsApp Business oficial, entrenamos el agente con tu léxico y probamos cada flujo contigo.",
        },
        {
          num: "03",
          title: "Activo 24/7",
          body: "El agente empieza a atender en tu número desde el día 3. Ves cada conversación en tiempo real en el panel.",
        },
      ],
      capabilities: [
        "Agendamiento con confirmación automática",
        "Cualificación de leads antes de la consulta",
        "Transferencia a humano cuando sea necesario",
        "Respuestas a preguntas frecuentes 24 horas",
        "Conversaciones en portugués, español e inglés",
        "Integración con Google Calendar y Cal.com",
      ],
      cta_headline: "¿Listo para que WhatsApp responda por ti?",
    },
    widget: {
      meta_title: "Widget Web IA | NorteNode",
      meta_description:
        "Chat en tu site que responde en menos de 2 s y captura el lead con contexto. Instalación en un único script.",
      hero: {
        eyebrow: "Widget Web · Producto 02",
        headline_l1: "El primer mensaje",
        headline_l2: "ya no se pierde.",
        sub: "Un chat en tu sitio que responde en menos de dos segundos y entrega el lead con contexto completo.",
      },
      mock: {
        section_label: "Ejemplo · Clínica",
        bot_name: "Asistente IA",
        bot_status: "En línea",
        messages: [
          { role: "bot",  text: "Tengo 2 segundos para ayudarte. ¿Qué buscas?" },
          { role: "user", text: "Precios para armonización facial" },
          { role: "bot",  text: "Entre 250 € y 450 € por sesión, y la valoración es gratis. ¿Cuál es tu email?" },
          { role: "user", text: "ana@clinica.pt" },
          { role: "bot",  text: "✓ Enviado al equipo. Te contactamos hoy mismo." },
        ],
      },
      integration_steps: [
        {
          num: "01",
          title: "Copia una sola etiqueta",
          body: "Un único <script> en el <head> de tu site. Sin build, sin deploy.",
        },
        {
          num: "02",
          title: "Pégalo en tu site",
          body: "Copia, pega, publica. Funciona en Next, WordPress, Shopify, Webflow y cualquier framework.",
        },
        {
          num: "03",
          title: "Personaliza en el panel",
          body: "Colores, copy y prompt del agente — todo editable sin tocar código.",
        },
      ],
      capabilities: [
        "Modo claro / oscuro automático",
        "Respuestas en portugués, español e inglés",
        "Captura de email + contexto de la conversación",
        "Notificaciones en Slack y por email",
        "Analítica de conversiones integrada",
        "Tema personalizado por cliente",
      ],
      cta_headline: "¿Listo para que tu site venda cuando tú duermes?",
    },
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
  solucoes: {
    common: {
      integration_eyebrow: "How it works",
      integration_title: "Live in 72 hours.",
      capabilities_eyebrow: "Capabilities",
      capabilities_title: "Everything the agent does for you.",
      cta_eyebrow: "Ready when you are",
      cta_primary: "Talk to us",
      cta_secondary: "See the demo first",
    },
    whatsapp: {
      meta_title: "WhatsApp AI Reception | NorteNode",
      meta_description:
        "An AI agent on your WhatsApp Business number. Replies, qualifies and books 24/7 on Meta's official integration.",
      hero: {
        eyebrow: "WhatsApp Reception · Product 01",
        headline_l1: "Answers when",
        headline_l2: "your business is closed.",
        sub: "Official WhatsApp Business integration. Replies, qualifies and books in seconds, 24/7.",
      },
      mock: {
        section_label: "Example · Barbershop",
        business_name: "Silva Barbershop",
        business_status: "online",
        messages: [
          { role: "bot",  text: "Hi! Welcome to Silva Barbershop. How can I help?", time: "10:02" },
          { role: "user", text: "I'd like to book a cut + beard for Saturday",     time: "10:03" },
          { role: "bot",  text: "I have Saturday 10:30 or 15:00 with João. Which works?", time: "10:03" },
          { role: "user", text: "10:30 works",                                     time: "10:04" },
          { role: "bot",  text: "Booked: Saturday 10:30 with João. See you then ✅", time: "10:04" },
        ],
      },
      integration_steps: [
        {
          num: "01",
          title: "You sign up",
          body: "Sign off and we open onboarding in under 24 h. Zero technical friction on your side.",
        },
        {
          num: "02",
          title: "We set it up",
          body: "We connect your official WhatsApp Business account, train the agent on your lexicon, and test every flow with you.",
        },
        {
          num: "03",
          title: "Live 24/7",
          body: "The agent starts handling messages on your number from day 3. You see every conversation live in the dashboard.",
        },
      ],
      capabilities: [
        "Bookings with automatic confirmation",
        "Lead qualification before the consult",
        "Hand-off to a human when needed",
        "FAQ answers 24 hours a day",
        "Conversations in Portuguese, Spanish and English",
        "Google Calendar and Cal.com integrations",
      ],
      cta_headline: "Ready for WhatsApp to answer for you?",
    },
    widget: {
      meta_title: "Web Widget AI | NorteNode",
      meta_description:
        "Chat on your site that replies in under 2 s and captures leads with full context. One-script install.",
      hero: {
        eyebrow: "Web Widget · Product 02",
        headline_l1: "The first message",
        headline_l2: "never gets lost.",
        sub: "A chat on your site that replies in under two seconds and hands the lead over with full context.",
      },
      mock: {
        section_label: "Example · Clinic",
        bot_name: "AI Assistant",
        bot_status: "Online",
        messages: [
          { role: "bot",  text: "Got 2 seconds to help. What are you looking for?" },
          { role: "user", text: "Pricing for facial harmonisation" },
          { role: "bot",  text: "€250–€450 per session, and the consult is free. What's your email?" },
          { role: "user", text: "ana@clinic.com" },
          { role: "bot",  text: "✓ Sent to the team. We'll reach out today." },
        ],
      },
      integration_steps: [
        {
          num: "01",
          title: "Copy one tag",
          body: "A single <script> in your <head>. No build, no deploy.",
        },
        {
          num: "02",
          title: "Paste it on your site",
          body: "Copy, paste, publish. Works on Next, WordPress, Shopify, Webflow and any stack.",
        },
        {
          num: "03",
          title: "Customise from the dashboard",
          body: "Colours, copy and agent prompt — everything editable without touching code.",
        },
      ],
      capabilities: [
        "Automatic light / dark mode",
        "Responses in Portuguese, Spanish and English",
        "Email + conversation-context capture",
        "Slack and email notifications",
        "Built-in conversion analytics",
        "Per-client custom theme",
      ],
      cta_headline: "Ready for your site to sell while you sleep?",
    },
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
  solucoes: {
    common: {
      integration_eyebrow: "Como funciona",
      integration_title: "Ativo em 72 horas.",
      capabilities_eyebrow: "Capacidades",
      capabilities_title: "Tudo o que o agente faz por ti.",
      cta_eyebrow: "Prontos quando tu estiveres",
      cta_primary: "Falar connosco",
      cta_secondary: "Ver a demo primeiro",
    },
    whatsapp: {
      meta_title: "Receção WhatsApp com IA | NorteNode",
      meta_description:
        "Agente IA no teu WhatsApp Business. Atende, qualifica e agenda 24/7 com integração oficial da Meta.",
      hero: {
        eyebrow: "Receção WhatsApp · Produto 01",
        headline_l1: "Atende quando",
        headline_l2: "o teu negócio está fechado.",
        sub: "Integração oficial do WhatsApp Business. Responde, qualifica e agenda em segundos, 24/7.",
      },
      mock: {
        section_label: "Exemplo · Barbearia",
        business_name: "Barbearia Silva",
        business_status: "online",
        messages: [
          { role: "bot",  text: "Olá! Bem-vindo à Barbearia Silva. Em que posso ajudar?", time: "10:02" },
          { role: "user", text: "Queria marcar corte + barba para sábado",                 time: "10:03" },
          { role: "bot",  text: "Tenho sábado às 10:30 ou 15:00 com o João. Qual preferes?", time: "10:03" },
          { role: "user", text: "10:30 ✅",                                                 time: "10:04" },
          { role: "bot",  text: "Marcado: sábado 10:30 com o João. Até lá ✅",            time: "10:04" },
        ],
      },
      integration_steps: [
        {
          num: "01",
          title: "Contratas",
          body: "Assinas e abrimos o onboarding em menos de 24 h. Zero fricção técnica do teu lado.",
        },
        {
          num: "02",
          title: "Configuramos a conta",
          body: "Ligamos ao teu WhatsApp Business oficial, treinamos o agente com o teu léxico e testamos cada fluxo contigo.",
        },
        {
          num: "03",
          title: "Ativo 24/7",
          body: "O agente começa a atender no teu número desde o dia 3. Vês cada conversa em tempo real no painel.",
        },
      ],
      capabilities: [
        "Marcações com confirmação automática",
        "Qualificação de leads antes da consulta",
        "Transferência para humano quando necessário",
        "Respostas a perguntas frequentes 24 horas",
        "Conversas em português, espanhol e inglês",
        "Integração com Google Calendar e Cal.com",
      ],
      cta_headline: "Pronto para que o WhatsApp responda por ti?",
    },
    widget: {
      meta_title: "Widget Web com IA | NorteNode",
      meta_description:
        "Chat no teu site que responde em menos de 2 s e capta o lead com contexto. Instalação com um único script.",
      hero: {
        eyebrow: "Widget Web · Produto 02",
        headline_l1: "A primeira mensagem",
        headline_l2: "já não se perde.",
        sub: "Um chat no teu site que responde em menos de dois segundos e entrega o lead com contexto completo.",
      },
      mock: {
        section_label: "Exemplo · Clínica",
        bot_name: "Assistente IA",
        bot_status: "Online agora",
        messages: [
          { role: "bot",  text: "Tenho 2 segundos para te ajudar. O que procuras?" },
          { role: "user", text: "Preços para harmonização facial" },
          { role: "bot",  text: "Entre 250 € e 450 € por sessão, e a avaliação é grátis. Qual é o teu email?" },
          { role: "user", text: "ana@clinica.pt" },
          { role: "bot",  text: "✓ Enviado para a equipa. Contactamos hoje ainda." },
        ],
      },
      integration_steps: [
        {
          num: "01",
          title: "Copia uma tag",
          body: "Um único <script> no <head> do teu site. Sem build, sem deploy.",
        },
        {
          num: "02",
          title: "Cola no teu site",
          body: "Copia, cola, publica. Funciona em Next, WordPress, Shopify, Webflow e qualquer stack.",
        },
        {
          num: "03",
          title: "Personaliza no painel",
          body: "Cores, copy e prompt do agente — tudo editável sem tocar em código.",
        },
      ],
      capabilities: [
        "Modo claro / escuro automático",
        "Respostas em português, espanhol e inglês",
        "Captura de email + contexto da conversa",
        "Notificações em Slack e por email",
        "Analítica de conversões integrada",
        "Tema personalizado por cliente",
      ],
      cta_headline: "Pronto para o teu site vender enquanto dormes?",
    },
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
