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

export interface ContactRow {
  label: string;
  value: string;
  href: string | null;
  external: boolean;
  kind: "email" | "phone" | "whatsapp" | "location";
}

export interface ContactFormField {
  label: string;
  placeholder: string;
}

export interface ChatCopy {
  greeting: string;
  title: string;
  status: string;
  input_placeholder: string;
  send_label: string;
  you_label: string;
  bot_label: string;
  thinking: string;
  error_generic: string;
  error_network: string;
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
  demo: {
    meta_title: string;
    meta_description: string;
    hero: {
      eyebrow: string;
      headline_l1: string;
      headline_l2: string;
      sub: string;
    };
    stage: {
      narrative_eyebrow: string;
      narrative_title: string;
      narrative_body: string;
      live_label: string;
    };
  };
  contactos: {
    meta_title: string;
    meta_description: string;
    hero: {
      eyebrow: string;
      headline_l1: string;
      headline_l2: string;
      sub: string;
    };
    directory: {
      eyebrow: string;
      rows: ContactRow[];
    };
    form: {
      eyebrow: string;
      title: string;
      sub: string;
      fields: {
        name: ContactFormField;
        email: ContactFormField;
        phone: ContactFormField;
        vertical: ContactFormField;
        message: ContactFormField;
      };
      submit_idle: string;
      submit_loading: string;
      success_title: string;
      success_body: string;
      error_title: string;
      error_body: string;
    };
  };
  chat: ChatCopy;
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
  demo: {
    meta_title: "Demo · NorteNode",
    meta_description: "Habla ahora con nuestro agente de IA. Respuestas en tiempo real, sin formularios.",
    hero: {
      eyebrow: "DEMO EN DIRECTO",
      headline_l1: "Habla ahora.",
      headline_l2: "Sin formularios.",
      sub: "El mismo agente que atiende a sus clientes, respondiéndole aquí. Pregunte lo que quiera.",
    },
    stage: {
      narrative_eyebrow: "CÓMO FUNCIONA",
      narrative_title: "Responde como un humano. Trabaja como un sistema.",
      narrative_body: "Entiende contexto, cualifica, agenda. Si el caso es complejo, se lo pasa con el histórico completo. Nunca dos veces la misma pregunta.",
      live_label: "EN LÍNEA",
    },
  },
  contactos: {
    meta_title: "Contacto · NorteNode",
    meta_description: "Hable con nosotros. Email, teléfono, WhatsApp. Vila Nova de Gaia, Portugal.",
    hero: {
      eyebrow: "CONTACTO",
      headline_l1: "Hablemos.",
      headline_l2: "",
      sub: "Respondemos en menos de un día laborable. Elija el canal que prefiera.",
    },
    directory: {
      eyebrow: "DIRECTORIO",
      rows: [
        { label: "EMAIL",     value: "nortenode.ia@gmail.com",      href: "mailto:nortenode.ia@gmail.com", external: false, kind: "email" },
        { label: "TELÉFONO",  value: "+351 937 809 995",            href: "tel:+351937809995",             external: false, kind: "phone" },
        { label: "WHATSAPP",  value: "Enviar mensaje",              href: "https://wa.me/351937809995",    external: true,  kind: "whatsapp" },
        { label: "LUGAR",     value: "Vila Nova de Gaia, Portugal", href: null,                            external: false, kind: "location" },
      ],
    },
    form: {
      eyebrow: "O ESCRIBA",
      title: "Cuéntenos el contexto.",
      sub: "Cuanto más sepamos sobre su negocio, más concreta será la primera conversación.",
      fields: {
        name:     { label: "Nombre",   placeholder: "Cómo le llamamos" },
        email:    { label: "Email",    placeholder: "su@email.es" },
        phone:    { label: "Teléfono", placeholder: "+34" },
        vertical: { label: "Sector",   placeholder: "Barbería, clínica, gimnasio…" },
        message:  { label: "Contexto", placeholder: "Qué necesita resolver" },
      },
      submit_idle: "Enviar",
      submit_loading: "Enviando…",
      success_title: "Recibido.",
      success_body: "Le respondemos por email en menos de un día laborable.",
      error_title: "No pudimos enviar.",
      error_body: "Inténtelo de nuevo o escriba directamente a nortenode.ia@gmail.com.",
    },
  },
  chat: {
    greeting: "Hola. Soy el agente de NorteNode. Pregunte lo que quiera — precios, horarios, reservas. Para eso estoy.",
    title: "Agente NorteNode",
    status: "EN LÍNEA",
    input_placeholder: "Escriba su mensaje…",
    send_label: "Enviar",
    you_label: "Usted",
    bot_label: "Agente",
    thinking: "Pensando…",
    error_generic: "Algo falló. Vuelva a intentarlo.",
    error_network: "Sin conexión. Revise la red y vuelva a intentarlo.",
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
  demo: {
    meta_title: "Demo · NorteNode",
    meta_description: "Talk to our AI agent now. Real-time answers, no forms.",
    hero: {
      eyebrow: "LIVE DEMO",
      headline_l1: "Talk now.",
      headline_l2: "No forms.",
      sub: "The same agent that handles your customers, answering you here. Ask anything.",
    },
    stage: {
      narrative_eyebrow: "HOW IT WORKS",
      narrative_title: "Answers like a human. Works like a system.",
      narrative_body: "Understands context, qualifies, books. If the case is complex, it hands off to you with the full history. Never the same question twice.",
      live_label: "LIVE",
    },
  },
  contactos: {
    meta_title: "Contact · NorteNode",
    meta_description: "Get in touch. Email, phone, WhatsApp. Vila Nova de Gaia, Portugal.",
    hero: {
      eyebrow: "CONTACT",
      headline_l1: "Talk",
      headline_l2: "to us.",
      sub: "We answer within one business day. Pick whichever channel you prefer.",
    },
    directory: {
      eyebrow: "DIRECTORY",
      rows: [
        { label: "EMAIL",    value: "nortenode.ia@gmail.com",      href: "mailto:nortenode.ia@gmail.com", external: false, kind: "email" },
        { label: "PHONE",    value: "+351 937 809 995",            href: "tel:+351937809995",             external: false, kind: "phone" },
        { label: "WHATSAPP", value: "Send a message",              href: "https://wa.me/351937809995",    external: true,  kind: "whatsapp" },
        { label: "PLACE",    value: "Vila Nova de Gaia, Portugal", href: null,                            external: false, kind: "location" },
      ],
    },
    form: {
      eyebrow: "OR WRITE",
      title: "Tell us the context.",
      sub: "The more we know about your business, the more concrete our first conversation will be.",
      fields: {
        name:     { label: "Name",    placeholder: "What we should call you" },
        email:    { label: "Email",   placeholder: "you@email.com" },
        phone:    { label: "Phone",   placeholder: "+1" },
        vertical: { label: "Sector",  placeholder: "Barbershop, clinic, gym…" },
        message:  { label: "Context", placeholder: "What you need to solve" },
      },
      submit_idle: "Send",
      submit_loading: "Sending…",
      success_title: "Received.",
      success_body: "We'll reply by email within one business day.",
      error_title: "We couldn't send it.",
      error_body: "Try again or email nortenode.ia@gmail.com directly.",
    },
  },
  chat: {
    greeting: "Hi. I'm NorteNode's agent. Ask anything — pricing, hours, booking. That's what I'm here for.",
    title: "NorteNode Agent",
    status: "LIVE",
    input_placeholder: "Write your message…",
    send_label: "Send",
    you_label: "You",
    bot_label: "Agent",
    thinking: "Thinking…",
    error_generic: "Something went wrong. Try again.",
    error_network: "No connection. Check your network and try again.",
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
  demo: {
    meta_title: "Demo · NorteNode",
    meta_description: "Converse agora com o nosso agente de IA. Respostas em tempo real, sem formulários.",
    hero: {
      eyebrow: "DEMO EM DIRETO",
      headline_l1: "Converse agora.",
      headline_l2: "Sem formulários.",
      sub: "O mesmo agente que atende os seus clientes, a responder-lhe aqui. Pergunte o que quiser.",
    },
    stage: {
      narrative_eyebrow: "COMO FUNCIONA",
      narrative_title: "Responde como um humano. Trabalha como um sistema.",
      narrative_body: "Entende contexto, qualifica, agenda. Se o caso for complexo, encaminha para si com o histórico completo. Nunca duas vezes a mesma pergunta.",
      live_label: "EM LINHA",
    },
  },
  contactos: {
    meta_title: "Contactos · NorteNode",
    meta_description: "Fale connosco. Email, telefone, WhatsApp. Vila Nova de Gaia, Portugal.",
    hero: {
      eyebrow: "CONTACTOS",
      headline_l1: "Fale",
      headline_l2: "connosco.",
      sub: "Respondemos em menos de um dia útil. Escolha o canal que preferir.",
    },
    directory: {
      eyebrow: "DIRETÓRIO",
      rows: [
        { label: "EMAIL",     value: "nortenode.ia@gmail.com",      href: "mailto:nortenode.ia@gmail.com", external: false, kind: "email" },
        { label: "TELEFONE",  value: "+351 937 809 995",            href: "tel:+351937809995",             external: false, kind: "phone" },
        { label: "WHATSAPP",  value: "Enviar mensagem",             href: "https://wa.me/351937809995",    external: true,  kind: "whatsapp" },
        { label: "LOCAL",     value: "Vila Nova de Gaia, Portugal", href: null,                            external: false, kind: "location" },
      ],
    },
    form: {
      eyebrow: "OU ESCREVA",
      title: "Conte-nos o contexto.",
      sub: "Quanto mais souber sobre o seu negócio, mais concreta será a primeira conversa.",
      fields: {
        name:     { label: "Nome",     placeholder: "Como lhe chamamos" },
        email:    { label: "Email",    placeholder: "o.seu@email.pt" },
        phone:    { label: "Telefone", placeholder: "+351" },
        vertical: { label: "Setor",    placeholder: "Barbearia, clínica, ginásio…" },
        message:  { label: "Contexto", placeholder: "O que precisa de resolver" },
      },
      submit_idle: "Enviar",
      submit_loading: "A enviar…",
      success_title: "Recebido.",
      success_body: "Respondemos por email em menos de um dia útil.",
      error_title: "Não conseguimos enviar.",
      error_body: "Tente novamente ou escreva diretamente para nortenode.ia@gmail.com.",
    },
  },
  chat: {
    greeting: "Olá. Sou o agente da NorteNode. Pergunte o que quiser — preços, horários, marcação. Estou aqui para isto.",
    title: "Agente NorteNode",
    status: "EM LINHA",
    input_placeholder: "Escreva a sua mensagem…",
    send_label: "Enviar",
    you_label: "Você",
    bot_label: "Agente",
    thinking: "A pensar…",
    error_generic: "Algo correu mal. Tente outra vez.",
    error_network: "Sem ligação. Verifique a rede e tente outra vez.",
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
