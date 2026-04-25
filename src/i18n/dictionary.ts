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
      meta_title_v2:       string;
      meta_description_v2: string;
      hero_v2: {
        headline_v2: string;
        sub_v2:      string;
        cta_demo_v2: string;
        cta_talk_v2: string;
      };
      specs_v2: {
        items_v2: ReadonlyArray<{ desc_v2: string }>;
      };
      capabilities_v2: {
        title_v2: string;
        items_v2: ReadonlyArray<{ title_v2: string; desc_v2: string }>;
      };
      integrations_v2: {
        subhead_v2: string;
        note_v2:    string;
      };
      pricing_v2: {
        title_v2:       string;
        paragraph_1_v2: string;
        paragraph_2_v2: string;
        cta_label_v2:   string;
      };
      faq_v2: {
        title_v2: string;
        items_v2: ReadonlyArray<{ q: string; a: string }>;
      };
      final_v2: {
        title_v2:     string;
        cta_label_v2: string;
      };
    };
    widget: {
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
      headline_v2: string;
      sub: string;
      sub_v2: string;
      meta: Array<{ label: string; value: string }>;
    };
    how: {
      eyebrow: string;
      title: string;
      steps: Array<{ num: string; title: string; body: string }>;
    };
    limits: {
      eyebrow: string;
      title: string;
      items: Array<{ label: string; body: string }>;
    };
    paragraphs: {
      intent:  { title_v2: string; desc_v2: string };
      context: { title_v2: string; desc_v2: string };
      tools:   { title_v2: string; desc_v2: string };
    };
    final_cta: {
      eyebrow: string;
      title: string;
      body: string;
      cta_label: string;
      cta_href: string;
    };
    final: {
      title_v2:     string;
      sub_v2:       string;
      cta_label_v2: string;
    };
  };
  contactos: {
    meta_title: string;
    meta_description: string;
    hero: {
      eyebrow: string;
      headline_l1: string;
      headline_l2: string;
      headline_v2: string;
      sub: string;
      meta: Array<{ label: string; value: string }>;
    };
    directory: {
      eyebrow: string;
      rows: ContactRow[];
    };
    process: {
      eyebrow: string;
      title: string;
      steps: Array<{ num: string; title: string; body: string }>;
    };
    position: {
      eyebrow: string;
      title: string;
      items: Array<{ label: string; body: string }>;
    };
    sidebar: {
      what_happens_next: {
        items: string[];
      };
    };
    closing: {
      line: string;
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
      submit_v2: string;
      success_title: string;
      success_body: string;
      error_title: string;
      error_body: string;
      error_by_code: {
        invalid_name:            string;
        invalid_email:           string;
        invalid_phone:           string;
        invalid_sector:          string;
        invalid_message:         string;
        email_or_phone_required: string;
        service_unavailable:     string;
        rpc_failed:              string;
      };
    };
  };
  quem_somos: {
    meta_title: string;
    meta_description: string;
    hero: {
      eyebrow: string;
      headline_l1: string;
      headline_l2: string;
      sub: string;
      meta: Array<{ label: string; value: string }>;
      photo_alt: string;
      photo_caption: string;
    };
    manifesto: {
      eyebrow: string;
      title: string;
      body: string[];
    };
    principles: {
      eyebrow: string;
      title: string;
      items: Array<{ num: string; title: string; body: string }>;
    };
    trajectory: {
      eyebrow: string;
      title: string;
      chapters: Array<{ date: string; title: string; body: string }>;
    };
    final_cta: {
      eyebrow: string;
      title: string;
      body: string;
      cta_label: string;
      cta_href: string;
    };
    hero_quote_v2: {
      quote:       string;
      attribution: string;
    };
    portrait_v2: {
      paragraphs: readonly string[];
    };
    principles_v2: {
      title: string;
      items: ReadonlyArray<{ title: string; desc: string }>;
    };
    closing_v2: {
      line: string;
    };
  };
  home: {
    hero: {
      headline_v2: string;
      sub_v2:      string;
      cta_demo:    string;
      cta_talk:    string;
    };
    proof: {
      cohort_v2: string;
    };
    product: {
      title_v2: string;
      items: Array<{ desc_v2: string }>;
    };
    process: {
      title_v2: string;
      steps: Array<{ title_v2: string; desc_v2: string }>;
    };
    example: {
      title_v2: string;
    };
    final: {
      title_v2: string;
      sub_v2:   string;
      cta_v2:   string;
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
    widget: "Web",
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
      meta_title_v2:       "WhatsApp Operator",
      meta_description_v2: "Agente IA autónomo para WhatsApp Business. Atiende, califica y reserva en 14 días.",
      hero_v2: {
        headline_v2: "WhatsApp Operator.",
        sub_v2:      "Un agente IA autónomo para la API oficial WhatsApp Business. Atiende mensajes 24/7. Reserva, califica y escala.",
        cta_demo_v2: "Ver demo →",
        cta_talk_v2: "Hablar con nosotros →",
      },
      specs_v2: {
        items_v2: [
          { desc_v2: "Tiempo medio de entrada a salida." },
          { desc_v2: "PT, ES, EN con auto-detección." },
          { desc_v2: "Incluye festivos y fuera de horario." },
          { desc_v2: "Del contrato al operador en vivo." },
        ],
      },
      capabilities_v2: {
        title_v2: "Lo que el operador maneja.",
        items_v2: [
          { title_v2: "Reserva y reprogramación", desc_v2: "Lee disponibilidad, confirma slots, envía recordatorios." },
          { title_v2: "Consultas de precios",     desc_v2: "Cotiza precios de servicios, explica paquetes, gestiona descuentos." },
          { title_v2: "Calificación de leads",    desc_v2: "Detecta urgencia, clasifica intención, dirige leads calientes al owner." },
          { title_v2: "Historial del cliente",    desc_v2: "Reconoce clientes recurrentes, recuerda preferencias." },
          { title_v2: "Cambio de idioma",         desc_v2: "Auto-detecta PT, ES, EN. Cambia a mitad de conversación si necesario." },
          { title_v2: "Transferencia humana",     desc_v2: "Cuando el operador no puede ayudar, dirige a un miembro humano con contexto completo." },
        ],
      },
      integrations_v2: {
        subhead_v2: "Se conecta a tus herramientas existentes sin reconstruir nada.",
        note_v2:    "Integraciones personalizadas bajo petición.",
      },
      pricing_v2: {
        title_v2:       "Alcance fijo. Precio fijo.",
        paragraph_1_v2: "Despliegue estándar: 14 días. Incluye setup de la API WhatsApp Business, entrenamiento personalizado, integración de calendario, y 30 días de ajuste post-lanzamiento.",
        paragraph_2_v2: "Precio depende del volumen de conversaciones y complejidad de integración. Cotización fija tras llamada de descubrimiento de 30 minutos.",
        cta_label_v2:   "Solicitar cotización →",
      },
      faq_v2: {
        title_v2: "Preguntas frecuentes.",
        items_v2: [
          { q: "¿Gestionan la verificación Meta Business?",  a: "Sí. Gestionamos el proceso completo de verificación Meta Business, desde el setup del número hasta la aprobación de templates de mensajes. Suele tomar 7-10 días hábiles, paralelo al desarrollo del operador." },
          { q: "¿El operador puede transferir a un humano?", a: "Sí. Cuando detecta intención compleja o el cliente lo pide explícitamente, transfiere la conversación a un miembro de tu equipo con el contexto completo ya documentado." },
          { q: "¿Qué pasa durante downtime?",                a: "Los mensajes se ponen en cola y se procesan en cuanto el servicio reanuda. Operadores tienen uptime de 99.9%+. En incidentes raros, recordatorio automático al owner para atender manualmente." },
          { q: "¿Puedo ver un log real de conversación?",    a: "Sí. Durante el discovery call, compartimos ejemplos anonimizados de conversaciones reales de clientes en producción. Bajo NDA si prefieres." },
          { q: "¿Qué idiomas soportan?",                     a: "Portugués, Español e Inglés con auto-detección. Otros idiomas viables con entrenamiento personalizado — habla con nosotros para detalles." },
        ],
      },
      final_v2: {
        title_v2:     "Despliega tu operador WhatsApp en 14 días.",
        cta_label_v2: "Hablar con nosotros →",
      },
    },
    widget: {
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
    meta_title: "Demo",
    meta_description: "Pruebe nuestro agente de IA en conversación real. El mismo motor que operamos para clientes.",
    hero: {
      eyebrow: "DEMO EN VIVO",
      headline_l1: "Pruébelo ahora.",
      headline_l2: "Conversación real, no vídeo.",
      headline_v2: "Pruebe el operador.",
      sub: "Este es el mismo motor que operamos para clientes. Escriba como si fuera un cliente real — responde con contexto, no con respuestas pre-grabadas.",
      sub_v2: "Este es un operador NorteNode real. Envíe cualquier mensaje en PT, ES o EN. Pregunte sobre reservas, precios u horarios.",
      meta: [
        { label: "MODELO",   value: "Groq / Llama 3.3" },
        { label: "LATENCIA", value: "< 500 ms" },
        { label: "CONTEXTO", value: "Barbería ficticia" },
        { label: "SESIÓN",   value: "Anónima" },
      ],
    },
    how: {
      eyebrow: "DEL DEMO A SU AGENTE",
      title: "De lo que prueba aquí a lo que operamos por usted.",
      steps: [
        { num: "01", title: "Conversación de prueba, sin compromiso.",   body: "Use este chat lo que quiera. No guardamos el historial ni contactamos después. Es solo para que vea el tono y la calidad de la respuesta." },
        { num: "02", title: "Si tiene sentido, agenda una llamada.",     body: "Hablamos de su caso concreto — sector, volumen, integraciones. Decidimos juntos si el proyecto avanza." },
        { num: "03", title: "Agente entrenado y operado por nosotros.",  body: "Montamos el agente con el contexto real de su negocio, lo integramos en su WhatsApp y sitio, y operamos el día a día. Usted recibe los leads cualificados." },
      ],
    },
    limits: {
      eyebrow: "LO QUE ESTE DEMO NO HACE",
      title: "Transparencia sobre lo que está probando.",
      items: [
        { label: "NO TIENE SU CONTEXTO", body: "Este demo responde como si fuera una barbería genérica. Su agente tendría sus horarios, servicios, precios y objeciones reales." },
        { label: "NO AGENDA REALMENTE",  body: "Si el demo dice 'agendé a las 15h', es simulación. En su caso, el agente agendaría en su Google Calendar o sistema interno." },
        { label: "NO ENVÍA POR WHATSAPP", body: "Aquí es chat web. El agente en producción responde directamente en el WhatsApp Business de su negocio, con su número." },
      ],
    },
    paragraphs: {
      intent: {
        title_v2: "Detección de intención",
        desc_v2:  "Cada mensaje es procesado por un clasificador entrenado en conversaciones portuguesas y españolas de negocios de servicios.",
      },
      context: {
        title_v2: "Memoria de contexto",
        desc_v2:  "Los operadores mantienen contexto entre sesiones. Reservas anteriores e historial informan cada respuesta.",
      },
      tools: {
        title_v2: "Ejecución de herramientas",
        desc_v2:  "Cuando el operador confirma una reserva, ejecuta una llamada a la API del calendario (Google, Cal.com, custom).",
      },
    },
    final_cta: {
      eyebrow: "SIGUIENTE PASO",
      title: "Si el demo tuvo sentido, hablemos.",
      body: "Una llamada de 30 minutos. Sin formulario intermedio, sin presión comercial.",
      cta_label: "Agendar llamada",
      cta_href: "/contactos",
    },
    final: {
      title_v2:     "¿Listo para desplegar tu operador?",
      sub_v2:       "Primer operador desplegado en 14 días. Alcance fijo. Precio fijo.",
      cta_label_v2: "Hablar con nosotros →",
    },
  },
  contactos: {
    meta_title: "Contacto",
    meta_description: "Hable con nosotros. Email, teléfono, WhatsApp. Vila Nova de Gaia, Portugal.",
    hero: {
      eyebrow: "CONTACTO",
      headline_l1: "Hablemos.",
      headline_l2: "",
      headline_v2: "Conecte.",
      sub: "Respondemos en menos de un día laborable. Elija el canal que prefiera.",
      meta: [
        { label: "LUGAR",     value: "Vila Nova de Gaia" },
        { label: "RESPUESTA", value: "< 1 día laborable" },
        { label: "IDIOMAS",   value: "PT · ES · EN" },
        { label: "DESDE",     value: "2026" },
      ],
    },
    directory: {
      eyebrow: "DIRECTORIO",
      rows: [
        { label: "EMAIL",     value: "contacto@nortenode.com",      href: "mailto:contacto@nortenode.com", external: false, kind: "email" },
        { label: "TELÉFONO",  value: "+351 937 809 995",            href: "tel:+351937809995",             external: false, kind: "phone" },
        { label: "WHATSAPP",  value: "Enviar mensaje",              href: "https://wa.me/351937809995",    external: true,  kind: "whatsapp" },
        { label: "LUGAR",     value: "Vila Nova de Gaia, Portugal", href: null,                            external: false, kind: "location" },
      ],
    },
    process: {
      eyebrow: "CÓMO TRABAJAMOS",
      title: "Del primer mensaje al agente en producción.",
      steps: [
        { num: "01", title: "Respuesta en menos de un día laborable.", body: "Leemos el contexto que nos escriba y respondemos con una primera lectura del problema. Sin formularios intermedios ni demos enlatadas." },
        { num: "02", title: "Llamada de diagnóstico de 30 minutos.",   body: "Entendemos su negocio, el volumen de conversaciones que pierde, y qué necesita resolver. Si no tenemos sentido para su caso, se lo decimos aquí." },
        { num: "03", title: "Propuesta concreta en menos de una semana.", body: "Alcance, precio fijo, plazo, y qué vamos a operar por usted. Sin licencias recurrentes opacas ni ingeniería de features que no usa." },
      ],
    },
    position: {
      eyebrow: "LO QUE NO SOMOS",
      title: "Para evitar malentendidos.",
      items: [
        { label: "NO VENDEMOS SOFTWARE",        body: "No paga licencia de una plataforma de chatbots. Operamos el agente por usted, integrado en su WhatsApp y su sitio web." },
        { label: "NO SOMOS AGENCIA DE MARKETING", body: "No hacemos anuncios, SEO, ni redes sociales. Foco único: que las conversaciones que ya le llegan se conviertan en citas agendadas." },
        { label: "NO USAMOS BOTS GENÉRICOS",     body: "Cada agente se entrena con el contexto de su negocio — horarios, servicios, precios, objeciones reales. No es un árbol de decisión con 10 respuestas." },
      ],
    },
    sidebar: {
      what_happens_next: {
        items: [
          "Leemos cada formulario en 4h",
          "Llamada de descubrimiento de 30 min",
          "Propuesta fija en <7 días",
        ],
      },
    },
    closing: {
      line: "Somos un pequeño equipo en Porto.",
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
      submit_v2: "Solicitar demo →",
      success_title: "Recibido.",
      success_body: "Le respondemos por email en menos de un día laborable.",
      error_title: "No pudimos enviar.",
      error_body: "Inténtelo de nuevo o escriba directamente a contacto@nortenode.com.",
      error_by_code: {
        invalid_name:            "Nombre no válido.",
        invalid_email:           "Email no válido.",
        invalid_phone:           "Teléfono no válido.",
        invalid_sector:          "Sector no válido.",
        invalid_message:         "El mensaje es demasiado largo.",
        email_or_phone_required: "Indique email o teléfono.",
        service_unavailable:     "Servicio temporalmente no disponible.",
        rpc_failed:              "No pudimos registrar su solicitud. Vuelva a intentarlo.",
      },
    },
  },
  quem_somos: {
    meta_title: "Quiénes Somos",
    meta_description: "Agencia independiente que opera agentes de IA para negocios locales. Fundada en Vila Nova de Gaia.",
    hero: {
      eyebrow: "QUIÉN OPERA",
      headline_l1: "Una agencia independiente.",
      headline_l2: "Operada por quien la fundó.",
      sub: "No somos una plataforma a escala. Somos un operador local que construye agentes de IA para quien los necesita funcionando mañana.",
      meta: [
        { label: "FUNDADOR",     value: "Adolfo" },
        { label: "SEDE",         value: "Vila Nova de Gaia" },
        { label: "ESPECIALIDAD", value: "Agentes operativos" },
        { label: "DESDE",        value: "2026" },
      ],
      photo_alt: "Adolfo, fundador de NorteNode, en Vila Nova de Gaia",
      photo_caption: "Adolfo · Fundador y Operador",
    },
    manifesto: {
      eyebrow: "POR QUÉ EXISTIMOS",
      title: "La mayoría de los negocios locales pierde conversaciones que no sabe que pierde.",
      body: [
        "Barberías, clínicas, gimnasios — todos tienen el mismo patrón. Un cliente pregunta por WhatsApp, nadie responde en veinte minutos, y ese cliente agenda en otro sitio. No es falta de ganas. Es falta de tiempo de alguien detrás del mostrador.",
        "NorteNode existe para operar esa respuesta. No vendemos una plataforma para que la configure usted solo. Construimos el agente con el contexto real de su negocio, lo integramos en su WhatsApp, y lo operamos el día a día. Usted recibe los leads ya cualificados.",
        "Decidimos hacer esto de una manera específica: como agencia, no como producto SaaS; con precio fijo por proyecto, no con licencias recurrentes; operando localmente en Portugal y España, no a escala global. Es una elección deliberada. Es lo que sabemos hacer bien.",
      ],
    },
    principles: {
      eyebrow: "CÓMO OPERAMOS",
      title: "Tres decisiones que definen nuestro trabajo.",
      items: [
        { num: "01", title: "Cobramos por resultado, no por licencia.",           body: "Precio fijo por proyecto, con mantenimiento mensual transparente. Nunca pagará una licencia recurrente por un software cuyo código no controla." },
        { num: "02", title: "Operamos el agente, no se lo vendemos a usted.",     body: "No recibirá un panel para configurar respuestas y prompts. Nosotros gestionamos el agente con el contexto de su negocio. Usted recibe las citas y los leads." },
        { num: "03", title: "Decimos cuándo no tenemos sentido.",                 body: "En la primera llamada decidimos juntos si el proyecto tiene sentido para su caso. Si el volumen no lo justifica, o si el problema es otro, se lo decimos aquí. No vendemos a todos." },
      ],
    },
    trajectory: {
      eyebrow: "TRAYECTORIA",
      title: "Dónde estamos hoy.",
      chapters: [
        { date: "2026 · Q1",      title: "Fundación y primeros prototipos.", body: "Construcción del motor que opera los agentes — Groq, WhatsApp Cloud API, integraciones básicas. Pruebas con barberías ficticias." },
        { date: "2026 · Q2",      title: "Primeros clientes reales.",        body: "Primera barbería en producción en Vila Nova de Gaia. Iteración sobre tono, contexto, escalado al operador humano." },
        { date: "Capítulo actual", title: "Construyendo en público.",         body: "Abrimos calendario para más negocios locales en Portugal y España. Cada cliente nuevo informa cómo evoluciona el producto y la operación." },
      ],
    },
    final_cta: {
      eyebrow: "SIGUIENTE PASO",
      title: "Si tiene sentido, hablemos.",
      body: "Una llamada de 30 minutos para entender su caso. Sin formulario intermedio, sin presión comercial.",
      cta_label: "Hablar con Adolfo",
      cta_href: "/contactos",
    },
    hero_quote_v2: {
      quote:       "Prefiero construir una\nrecepción IA que\nfunciona de verdad,\nque diez que\nparecen impresionantes.",
      attribution: "Adolfo Byrne · Fundador",
    },
    portrait_v2: {
      paragraphs: [
        "Soy Adolfo. Empecé NorteNode en 2026 para resolver un problema concreto: negocios de servicios perdiendo clientes por respuestas lentas.",
        "Background en software. Trabajo de producto end-to-end. Del tipo en que, si se rompe, lo arreglo yo.",
        "Basado en Porto. Operando en Portugal y España. Cada email que recibo, lo leo.",
      ],
    },
    principles_v2: {
      title: "En lo que creemos.",
      items: [
        { title: "Entregar en semanas, no en trimestres", desc: "La mayoría de agencias habla en meses, nosotros en semanas. Primer operador en vivo en 14 días. El punto es empezar a recoger conversaciones reales rápido." },
        { title: "Custom sobre template",                 desc: "Sin UI de configuración estilo plataforma. Cada operador se construye con tu contexto — servicios, horarios, precios, objeciones reales. Los templates pierden lo que hace tu negocio tuyo." },
        { title: "Los ingenieros tocan el código",        desc: "No pagas por un dashboard que nunca vas a abrir. Nosotros desplegamos, monitorizamos y arreglamos. Tu tiempo va a tu negocio, no a prompts." },
        { title: "Discretos por diseño",                  desc: "Sin upsells, sin emails agresivos, sin métricas vacías. Te decimos qué funciona, arreglamos lo que no, y facturamos de forma predecible." },
      ],
    },
    closing_v2: {
      line: "Si llevas un negocio de servicios y estás cansado de llamadas perdidas y respuestas lentas, escríbeme. Leo cada email.",
    },
  },
  home: {
    hero: {
      headline_v2: "Construimos la\nrecepción IA que\ntu negocio\ntodavía no\nsabe que necesita.",
      sub_v2:      "Operadores IA personalizados para negocios de servicios. Una capa de conversación en WhatsApp y la web. Desplegamos en 14 días.",
      cta_demo:    "Ver demo →",
      cta_talk:    "Hablar con nosotros →",
    },
    proof: {
      cohort_v2: "Actualmente en producción con la cohorte fundadora. Incorporando nuevas cuentas cada semana.",
    },
    product: {
      title_v2: "Tres operadores.\nUna capa de inteligencia.",
      items: [
        { desc_v2: "Recepción 24/7 a través de la API oficial Business. Reserva, califica, escala." },
        { desc_v2: "Superficie de chat ligera para tu sitio. Mismo operador, misma inteligencia." },
        { desc_v2: "Agente de voz para llamadas entrantes. Lanzamiento limitado Q2 2026." },
      ],
    },
    process: {
      title_v2: "Del primer mensaje a la cita confirmada.",
      steps: [
        { title_v2: "Inbound",    desc_v2: "El cliente envía un mensaje. El operador analiza en menos de 200ms." },
        { title_v2: "Comprender", desc_v2: "Intención e historial cruzados con el perfil del cliente." },
        { title_v2: "Responder",  desc_v2: "Responder, calificar el lead, o escalar." },
        { title_v2: "Ejecutar",   desc_v2: "Reservar la cita, registrar el lead, notificar al owner." },
      ],
    },
    example: {
      title_v2: "Cómo se ve en producción.",
    },
    final: {
      title_v2: "Tu recepción\nfunciona mientras\ntú no.",
      sub_v2:   "Primer operador desplegado en 14 días. Alcance fijo. Precio fijo.",
      cta_v2:   "Solicitar demo →",
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
    blurb: "Recepción IA para negocios de servicios. Construido en Porto, desplegado en cualquier lugar.",
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
    widget: "Web",
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
      meta_title_v2:       "WhatsApp Operator",
      meta_description_v2: "Autonomous AI agent for WhatsApp Business. Answers, qualifies, and books in 14 days.",
      hero_v2: {
        headline_v2: "WhatsApp Operator.",
        sub_v2:      "An autonomous AI agent for the official WhatsApp Business API. Answers messages 24/7. Books, qualifies, escalates.",
        cta_demo_v2: "Try the demo →",
        cta_talk_v2: "Talk to us →",
      },
      specs_v2: {
        items_v2: [
          { desc_v2: "Median inbound to outbound." },
          { desc_v2: "PT, ES, EN with auto-detect." },
          { desc_v2: "Including holidays and off-hours." },
          { desc_v2: "From contract signed to live." },
        ],
      },
      capabilities_v2: {
        title_v2: "What the operator handles.",
        items_v2: [
          { title_v2: "Booking and rescheduling", desc_v2: "Reads availability, confirms slots, sends reminders." },
          { title_v2: "Pricing inquiries",        desc_v2: "Quotes service prices, explains packages, handles discounts." },
          { title_v2: "Lead qualification",       desc_v2: "Detects urgency, scores intent, routes hot leads to the owner." },
          { title_v2: "Customer history",         desc_v2: "Recognizes returning customers, remembers preferences." },
          { title_v2: "Multi-language switching", desc_v2: "Auto-detects PT, ES, EN. Switches mid-conversation if needed." },
          { title_v2: "Human handoff",            desc_v2: "When the operator can't help, it routes to a human team member with full context." },
        ],
      },
      integrations_v2: {
        subhead_v2: "Connects to your existing tools without rebuilding anything.",
        note_v2:    "Custom integrations on request.",
      },
      pricing_v2: {
        title_v2:       "Fixed scope. Fixed price.",
        paragraph_1_v2: "Standard deployment: 14 days. Includes WhatsApp Business API setup, custom training, calendar integration, and 30 days of post-launch tuning.",
        paragraph_2_v2: "Pricing depends on conversation volume and integration complexity. Fixed quote after a 30-minute discovery call.",
        cta_label_v2:   "Request quote →",
      },
      faq_v2: {
        title_v2: "Frequently asked.",
        items_v2: [
          { q: "Do you handle the Meta Business verification?", a: "Yes. We handle the full Meta Business verification process, from number setup to message template approval. Typically takes 7-10 business days, parallel to operator development." },
          { q: "Can the operator transfer to a human?",         a: "Yes. When it detects complex intent or the customer asks explicitly, it transfers the conversation to a team member with full context already documented." },
          { q: "What happens during downtime?",                 a: "Messages are queued and processed as soon as the service resumes. Operators have 99.9%+ uptime. In rare incidents, automatic reminder to the owner to handle manually." },
          { q: "Can I see a real conversation log?",            a: "Yes. During the discovery call, we share anonymized examples of real customer conversations in production. Under NDA if preferred." },
          { q: "What languages do you support?",                a: "Portuguese, Spanish and English with auto-detection. Other languages viable with custom training — talk to us for details." },
        ],
      },
      final_v2: {
        title_v2:     "Deploy your WhatsApp operator in 14 days.",
        cta_label_v2: "Talk to us →",
      },
    },
    widget: {
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
    meta_title: "Demo",
    meta_description: "Test our AI agent in real conversation. The same engine we run for clients.",
    hero: {
      eyebrow: "LIVE DEMO",
      headline_l1: "Try it now.",
      headline_l2: "Real conversation, not video.",
      headline_v2: "Test the operator.",
      sub: "This is the same engine we run for clients. Write as if you were a real customer — it replies with context, not canned answers.",
      sub_v2: "This is a real NorteNode operator. Send any message in PT, ES, or EN. Ask about scheduling, pricing, or hours.",
      meta: [
        { label: "MODEL",   value: "Groq / Llama 3.3" },
        { label: "LATENCY", value: "< 500 ms" },
        { label: "CONTEXT", value: "Fictional barbershop" },
        { label: "SESSION", value: "Anonymous" },
      ],
    },
    how: {
      eyebrow: "FROM DEMO TO YOUR AGENT",
      title: "From what you test here to what we run for you.",
      steps: [
        { num: "01", title: "Test conversation, no commitment.", body: "Use this chat as much as you want. We don't store the history or follow up. It's just so you see the tone and quality of the response." },
        { num: "02", title: "If it fits, book a call.",          body: "We discuss your specific case — sector, volume, integrations. We decide together if the project moves forward." },
        { num: "03", title: "Agent trained and run by us.",      body: "We build the agent with the real context of your business, integrate it into your WhatsApp and website, and run the day-to-day. You receive qualified leads." },
      ],
    },
    limits: {
      eyebrow: "WHAT THIS DEMO DOESN'T DO",
      title: "Transparency about what you're testing.",
      items: [
        { label: "NO ACCESS TO YOUR CONTEXT", body: "This demo replies as a generic barbershop. Your agent would have your hours, services, prices, and real objections." },
        { label: "DOESN'T ACTUALLY BOOK",     body: "If the demo says 'booked for 3pm', it's simulation. In your case, the agent would book in your Google Calendar or internal system." },
        { label: "NOT WHATSAPP HERE",         body: "This is web chat. The production agent replies directly in your business's WhatsApp Business, from your number." },
      ],
    },
    paragraphs: {
      intent: {
        title_v2: "Intent Detection",
        desc_v2:  "Each message is parsed by an intent classifier trained on Portuguese and Spanish service-business conversations.",
      },
      context: {
        title_v2: "Context Memory",
        desc_v2:  "Operators maintain conversation context across sessions. Previous bookings inform each response.",
      },
      tools: {
        title_v2: "Tool Execution",
        desc_v2:  "When the operator confirms a booking, it executes a tool call to your calendar (Google, Cal.com, custom).",
      },
    },
    final_cta: {
      eyebrow: "NEXT STEP",
      title: "If the demo made sense, let's talk.",
      body: "A 30-minute call. No intermediate form, no sales pressure.",
      cta_label: "Book a call",
      cta_href: "/contactos",
    },
    final: {
      title_v2:     "Ready to deploy your operator?",
      sub_v2:       "First operator live in 14 days. Fixed scope. Fixed price.",
      cta_label_v2: "Talk to us →",
    },
  },
  contactos: {
    meta_title: "Contact",
    meta_description: "Get in touch. Email, phone, WhatsApp. Vila Nova de Gaia, Portugal.",
    hero: {
      eyebrow: "CONTACT",
      headline_l1: "Talk",
      headline_l2: "to us.",
      headline_v2: "Connect.",
      sub: "We answer within one business day. Pick whichever channel you prefer.",
      meta: [
        { label: "PLACE",     value: "Vila Nova de Gaia" },
        { label: "RESPONSE",  value: "< 1 business day" },
        { label: "LANGUAGES", value: "PT · ES · EN" },
        { label: "SINCE",     value: "2026" },
      ],
    },
    directory: {
      eyebrow: "DIRECTORY",
      rows: [
        { label: "EMAIL",    value: "contacto@nortenode.com",      href: "mailto:contacto@nortenode.com", external: false, kind: "email" },
        { label: "PHONE",    value: "+351 937 809 995",            href: "tel:+351937809995",             external: false, kind: "phone" },
        { label: "WHATSAPP", value: "Send a message",              href: "https://wa.me/351937809995",    external: true,  kind: "whatsapp" },
        { label: "PLACE",    value: "Vila Nova de Gaia, Portugal", href: null,                            external: false, kind: "location" },
      ],
    },
    process: {
      eyebrow: "HOW WE WORK",
      title: "From first message to agent in production.",
      steps: [
        { num: "01", title: "Reply within one business day.",      body: "We read the context you send us and reply with a first read on the problem. No intermediate forms, no canned demos." },
        { num: "02", title: "30-minute diagnostic call.",          body: "We understand your business, the volume of conversations you're losing, and what you need to solve. If we're not a fit, we tell you here." },
        { num: "03", title: "Concrete proposal within a week.",    body: "Scope, fixed price, timeline, and what we'll operate for you. No opaque recurring licenses, no feature engineering you won't use." },
      ],
    },
    position: {
      eyebrow: "WHAT WE ARE NOT",
      title: "To avoid misunderstandings.",
      items: [
        { label: "WE DON'T SELL SOFTWARE",      body: "You don't pay a chatbot platform license. We operate the agent for you, integrated into your WhatsApp and your website." },
        { label: "WE'RE NOT A MARKETING AGENCY", body: "No ads, no SEO, no social media. Single focus: the conversations you already receive convert into bookings." },
        { label: "WE DON'T USE GENERIC BOTS",   body: "Each agent is trained with the context of your business — hours, services, prices, real objections. Not a decision tree with 10 answers." },
      ],
    },
    sidebar: {
      what_happens_next: {
        items: [
          "We read every form within 4h",
          "30-min discovery call",
          "Fixed proposal in <7 days",
        ],
      },
    },
    closing: {
      line: "We're a small team in Porto.",
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
      submit_v2: "Request demo →",
      success_title: "Received.",
      success_body: "We'll reply by email within one business day.",
      error_title: "We couldn't send it.",
      error_body: "Try again or email contacto@nortenode.com directly.",
      error_by_code: {
        invalid_name:            "Invalid name.",
        invalid_email:           "Invalid email.",
        invalid_phone:           "Invalid phone number.",
        invalid_sector:          "Invalid sector.",
        invalid_message:         "Message is too long.",
        email_or_phone_required: "Please provide an email or phone.",
        service_unavailable:     "Service temporarily unavailable.",
        rpc_failed:              "We couldn't register your request. Try again.",
      },
    },
  },
  quem_somos: {
    meta_title: "About",
    meta_description: "Independent agency operating AI agents for local businesses. Founded in Vila Nova de Gaia.",
    hero: {
      eyebrow: "WHO OPERATES",
      headline_l1: "An independent agency.",
      headline_l2: "Run by the person who founded it.",
      sub: "We're not a platform at scale. We're a local operator building AI agents for businesses that need them running tomorrow.",
      meta: [
        { label: "FOUNDER",   value: "Adolfo" },
        { label: "BASED IN",  value: "Vila Nova de Gaia" },
        { label: "SPECIALTY", value: "Operational agents" },
        { label: "SINCE",     value: "2026" },
      ],
      photo_alt: "Adolfo, founder of NorteNode, in Vila Nova de Gaia",
      photo_caption: "Adolfo · Founder & Operator",
    },
    manifesto: {
      eyebrow: "WHY WE EXIST",
      title: "Most local businesses lose conversations they don't know they're losing.",
      body: [
        "Barbershops, clinics, gyms — they all have the same pattern. A customer asks on WhatsApp, no one replies within twenty minutes, and that customer books somewhere else. It's not a lack of will. It's a lack of time from whoever's at the counter.",
        "NorteNode exists to operate that reply. We don't sell you a platform so you configure it yourself. We build the agent with the real context of your business, integrate it into your WhatsApp, and run it day to day. You receive already-qualified leads.",
        "We decided to do this a specific way: as an agency, not a SaaS product; with fixed per-project pricing, not recurring licenses; operating locally in Portugal and Spain, not at global scale. It's a deliberate choice. It's what we do well.",
      ],
    },
    principles: {
      eyebrow: "HOW WE OPERATE",
      title: "Three decisions that define our work.",
      items: [
        { num: "01", title: "We charge for outcome, not for license.",             body: "Fixed per-project price, with transparent monthly maintenance. You'll never pay a recurring license for software whose code you don't control." },
        { num: "02", title: "We operate the agent, we don't sell it to you.",      body: "You won't get a panel to configure prompts and responses. We manage the agent with your business context. You receive bookings and leads." },
        { num: "03", title: "We say when we're not a fit.",                         body: "In the first call we decide together if the project makes sense for your case. If the volume doesn't justify it, or if the problem is different, we say so here. We don't sell to everyone." },
      ],
    },
    trajectory: {
      eyebrow: "TRAJECTORY",
      title: "Where we are today.",
      chapters: [
        { date: "2026 · Q1",       title: "Founding and first prototypes.", body: "Building the engine that runs the agents — Groq, WhatsApp Cloud API, basic integrations. Testing with fictional barbershops." },
        { date: "2026 · Q2",       title: "First real clients.",            body: "First barbershop in production in Vila Nova de Gaia. Iteration on tone, context, handoff to human operator." },
        { date: "Current chapter", title: "Building in public.",            body: "We're opening calendar for more local businesses in Portugal and Spain. Each new client informs how product and operations evolve." },
      ],
    },
    final_cta: {
      eyebrow: "NEXT STEP",
      title: "If it's a fit, let's talk.",
      body: "A 30-minute call to understand your case. No intermediate form, no sales pressure.",
      cta_label: "Talk to Adolfo",
      cta_href: "/contactos",
    },
    hero_quote_v2: {
      quote:       "I'd rather build one\nAI receptionist that\nactually works,\nthan ten that\nlook impressive.",
      attribution: "Adolfo Byrne · Founder",
    },
    portrait_v2: {
      paragraphs: [
        "I'm Adolfo. I started NorteNode in 2026 to fix one specific problem: service businesses losing customers to slow replies.",
        "Software background. End-to-end product work. The kind where if it breaks, I fix it.",
        "Based in Porto. Operating across Portugal and Spain. Every email I get, I read.",
      ],
    },
    principles_v2: {
      title: "What we believe.",
      items: [
        { title: "Ship in weeks not quarters", desc: "Most agencies talk months, we talk weeks. First operator live in 14 days. The whole point is to start collecting real conversations fast." },
        { title: "Custom over template",       desc: "No platform-style configuration UI. Each operator is built with your context — services, hours, prices, real objections. Templates miss what makes your business yours." },
        { title: "Engineers handle code",      desc: "You don't pay for a dashboard you'll never open. We deploy, monitor, and fix. Your time goes into running your business, not into prompts." },
        { title: "Quiet by design",            desc: "No upsells, no aggressive emails, no meaningless metrics. We tell you what's working, fix what isn't, and bill predictably." },
      ],
    },
    closing_v2: {
      line: "If you run a service business and you're tired of missed calls and slow replies, write to me. I read every email.",
    },
  },
  home: {
    hero: {
      headline_v2: "We build the AI\nreception your\nbusiness doesn't\nknow it needs.",
      sub_v2:      "Custom AI operators for service businesses. One conversation layer across WhatsApp and web. We deploy in 14 days.",
      cta_demo:    "See live demo →",
      cta_talk:    "Talk to us →",
    },
    proof: {
      cohort_v2: "Currently in production with the founding cohort. Onboarding new accounts each week.",
    },
    product: {
      title_v2: "Three operators.\nOne intelligence layer.",
      items: [
        { desc_v2: "24/7 reception across the official Business API. Books, qualifies, escalates." },
        { desc_v2: "Lightweight chat surface for your site. Same operator, same intelligence." },
        { desc_v2: "Inbound voice agent. Limited release in Q2 2026." },
      ],
    },
    process: {
      title_v2: "From first message to booked appointment.",
      steps: [
        { title_v2: "Inbound",    desc_v2: "Customer sends a message. Operator parses it in under 200ms." },
        { title_v2: "Understand", desc_v2: "Intent and history matched against customer profile." },
        { title_v2: "Respond",    desc_v2: "Reply, qualify the lead, or escalate." },
        { title_v2: "Execute",    desc_v2: "Book appointment, log lead, notify owner." },
      ],
    },
    example: {
      title_v2: "What it looks like in production.",
    },
    final: {
      title_v2: "Your reception\nruns while\nyou don't.",
      sub_v2:   "First operator deployed in 14 days. Fixed scope. Fixed price.",
      cta_v2:   "Request demo →",
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
    blurb: "AI receptionists for service businesses. Built in Porto, deployed everywhere.",
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
    widget: "Web",
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
      meta_title_v2:       "WhatsApp Operator",
      meta_description_v2: "Agente IA autónomo para WhatsApp Business. Atende, qualifica e marca em 14 dias.",
      hero_v2: {
        headline_v2: "WhatsApp Operator.",
        sub_v2:      "Um agente IA autónomo para a API oficial WhatsApp Business. Atende mensagens 24/7. Marca, qualifica e escala.",
        cta_demo_v2: "Ver demo →",
        cta_talk_v2: "Falar connosco →",
      },
      specs_v2: {
        items_v2: [
          { desc_v2: "Tempo médio de entrada a saída." },
          { desc_v2: "PT, ES, EN com auto-deteção." },
          { desc_v2: "Inclui feriados e horário não-laboral." },
          { desc_v2: "Da assinatura ao operador ao vivo." },
        ],
      },
      capabilities_v2: {
        title_v2: "O que o operador trata.",
        items_v2: [
          { title_v2: "Marcação e remarcação", desc_v2: "Lê disponibilidade, confirma slots, envia lembretes." },
          { title_v2: "Consultas de preços",   desc_v2: "Quota preços de serviços, explica pacotes, gere descontos." },
          { title_v2: "Qualificação de leads", desc_v2: "Deteta urgência, classifica intenção, encaminha leads quentes ao owner." },
          { title_v2: "Histórico do cliente",  desc_v2: "Reconhece clientes recorrentes, lembra preferências." },
          { title_v2: "Mudança de idioma",     desc_v2: "Auto-deteta PT, ES, EN. Muda a meio de conversação se necessário." },
          { title_v2: "Transferência humana",  desc_v2: "Quando o operador não pode ajudar, encaminha a um membro humano com contexto completo." },
        ],
      },
      integrations_v2: {
        subhead_v2: "Liga-se às tuas ferramentas existentes sem reconstruir nada.",
        note_v2:    "Integrações personalizadas a pedido.",
      },
      pricing_v2: {
        title_v2:       "Escopo fixo. Preço fixo.",
        paragraph_1_v2: "Implementação padrão: 14 dias. Inclui setup da API WhatsApp Business, formação personalizada, integração de calendário, e 30 dias de afinação pós-lançamento.",
        paragraph_2_v2: "Preço depende de volume de conversações e complexidade de integração. Cotação fixa após chamada de descoberta de 30 minutos.",
        cta_label_v2:   "Pedir cotação →",
      },
      faq_v2: {
        title_v2: "Perguntas frequentes.",
        items_v2: [
          { q: "Tratam da verificação Meta Business?",     a: "Sim. Tratamos do processo completo de verificação Meta Business, do setup do número à aprovação dos templates de mensagem. Demoram normalmente 7-10 dias úteis, paralelo ao desenvolvimento do operador." },
          { q: "O operador pode transferir para um humano?", a: "Sim. Quando deteta intenção complexa ou cliente pede explicitamente, transfere a conversação a um membro da tua equipa com o contexto completo já documentado." },
          { q: "O que acontece durante downtime?",          a: "Mensagens são enfileiradas e processadas assim que o serviço retoma. Operadores têm uptime de 99.9%+. Em incidentes raros, lembrete automático ao owner para atender manualmente." },
          { q: "Posso ver um log real de conversação?",     a: "Sim. Durante o discovery call, partilhamos exemplos anonimizados de conversações reais de clientes em produção. Sob NDA se preferires." },
          { q: "Que idiomas suportam?",                     a: "Português, Espanhol e Inglês com auto-deteção. Outros idiomas viáveis com formação personalizada — fala connosco para detalhes." },
        ],
      },
      final_v2: {
        title_v2:     "Implementa o teu operador WhatsApp em 14 dias.",
        cta_label_v2: "Falar connosco →",
      },
    },
    widget: {
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
    meta_title: "Demo",
    meta_description: "Teste o nosso agente de IA em conversa real. Mesmo motor que operamos para clientes.",
    hero: {
      eyebrow: "DEMO AO VIVO",
      headline_l1: "Experimente agora.",
      headline_l2: "Conversa real, não vídeo.",
      headline_v2: "Teste o operador.",
      sub: "Este é o mesmo motor que operamos para clientes. Escreva como se fosse um cliente real — ele responde com contexto, não com respostas pré-gravadas.",
      sub_v2: "Este é um operador NorteNode real. Envie qualquer mensagem em PT, ES ou EN. Pergunte sobre marcações, preços ou horários.",
      meta: [
        { label: "MODELO",   value: "Groq / Llama 3.3" },
        { label: "LATÊNCIA", value: "< 500 ms" },
        { label: "CONTEXTO", value: "Barbearia fictícia" },
        { label: "SESSÃO",   value: "Anónima" },
      ],
    },
    how: {
      eyebrow: "DEMO AO SEU AGENTE",
      title: "Do que testa aqui ao que operamos por si.",
      steps: [
        { num: "01", title: "Conversa de teste, sem compromisso.", body: "Use este chat quanto quiser. Não guardamos o histórico nem contactamos depois. É só para que veja o tom e a qualidade da resposta." },
        { num: "02", title: "Se faz sentido, agenda uma chamada.", body: "Falamos do seu caso concreto — setor, volume, integrações. Decidimos juntos se o projeto avança." },
        { num: "03", title: "Agente treinado e operado por nós.",  body: "Montamos o agente com o contexto real do seu negócio, integramos no seu WhatsApp e site, e operamos o dia-a-dia. Você recebe os leads qualificados." },
      ],
    },
    limits: {
      eyebrow: "O QUE ESTE DEMO NÃO FAZ",
      title: "Transparência sobre o que está a testar.",
      items: [
        { label: "NÃO TEM O SEU CONTEXTO", body: "Este demo responde como se fosse uma barbearia genérica. O seu agente teria os seus horários, serviços, preços e objeções reais." },
        { label: "NÃO AGENDA REALMENTE",   body: "Se o demo disser que 'agendou às 15h', é simulação. No seu caso, o agente agendaria no seu Google Calendar ou sistema interno." },
        { label: "NÃO ENVIA POR WHATSAPP", body: "Aqui é chat web. O agente em produção responde diretamente no WhatsApp Business do seu negócio, com o seu número." },
      ],
    },
    paragraphs: {
      intent: {
        title_v2: "Deteção de intenção",
        desc_v2:  "Cada mensagem é processada por um classificador treinado em conversas portuguesas e espanholas de negócios de serviços.",
      },
      context: {
        title_v2: "Memória de contexto",
        desc_v2:  "Os operadores mantêm contexto entre sessões. Marcações anteriores e histórico informam cada resposta.",
      },
      tools: {
        title_v2: "Execução de ferramentas",
        desc_v2:  "Quando o operador confirma uma marcação, executa uma chamada à API do calendário (Google, Cal.com, custom).",
      },
    },
    final_cta: {
      eyebrow: "PRÓXIMO PASSO",
      title: "Se o demo fez sentido, falemos.",
      body: "Uma chamada de 30 minutos. Sem formulário intermédio, sem pressão comercial.",
      cta_label: "Agendar chamada",
      cta_href: "/contactos",
    },
    final: {
      title_v2:     "Pronto para implementar o seu operador?",
      sub_v2:       "Primeiro operador implementado em 14 dias. Escopo fixo. Preço fixo.",
      cta_label_v2: "Falar connosco →",
    },
  },
  contactos: {
    meta_title: "Contactos",
    meta_description: "Fale connosco. Email, telefone, WhatsApp. Vila Nova de Gaia, Portugal.",
    hero: {
      eyebrow: "CONTACTOS",
      headline_l1: "Fale",
      headline_l2: "connosco.",
      headline_v2: "Conecte.",
      sub: "Respondemos em menos de um dia útil. Escolha o canal que preferir.",
      meta: [
        { label: "LOCAL",    value: "Vila Nova de Gaia" },
        { label: "RESPOSTA", value: "< 1 dia útil" },
        { label: "IDIOMAS",  value: "PT · ES · EN" },
        { label: "DESDE",    value: "2026" },
      ],
    },
    directory: {
      eyebrow: "DIRETÓRIO",
      rows: [
        { label: "EMAIL",     value: "contacto@nortenode.com",      href: "mailto:contacto@nortenode.com", external: false, kind: "email" },
        { label: "TELEFONE",  value: "+351 937 809 995",            href: "tel:+351937809995",             external: false, kind: "phone" },
        { label: "WHATSAPP",  value: "Enviar mensagem",             href: "https://wa.me/351937809995",    external: true,  kind: "whatsapp" },
        { label: "LOCAL",     value: "Vila Nova de Gaia, Portugal", href: null,                            external: false, kind: "location" },
      ],
    },
    process: {
      eyebrow: "COMO TRABALHAMOS",
      title: "Da primeira mensagem ao agente em produção.",
      steps: [
        { num: "01", title: "Resposta em menos de um dia útil.",         body: "Lemos o contexto que nos escrever e respondemos com uma primeira leitura do problema. Sem formulários intermédios nem demos pré-fabricadas." },
        { num: "02", title: "Chamada de diagnóstico de 30 minutos.",     body: "Entendemos o seu negócio, o volume de conversas que perde, e o que precisa resolver. Se não fazemos sentido para o seu caso, dizemo-lo aqui." },
        { num: "03", title: "Proposta concreta em menos de uma semana.", body: "Escopo, preço fixo, prazo, e o que vamos operar por si. Sem licenças recorrentes opacas nem engenharia de features que não usa." },
      ],
    },
    position: {
      eyebrow: "O QUE NÃO SOMOS",
      title: "Para evitar mal-entendidos.",
      items: [
        { label: "NÃO VENDEMOS SOFTWARE",         body: "Não paga licença de uma plataforma de chatbots. Operamos o agente por si, integrado no seu WhatsApp e no seu site." },
        { label: "NÃO SOMOS AGÊNCIA DE MARKETING", body: "Não fazemos anúncios, SEO, nem redes sociais. Foco único: que as conversas que já chegam se convertam em agendamentos." },
        { label: "NÃO USAMOS BOTS GENÉRICOS",     body: "Cada agente é treinado com o contexto do seu negócio — horários, serviços, preços, objeções reais. Não é uma árvore de decisão com 10 respostas." },
      ],
    },
    sidebar: {
      what_happens_next: {
        items: [
          "Lemos cada formulário em 4h",
          "Chamada de descoberta de 30 min",
          "Proposta fixa em <7 dias",
        ],
      },
    },
    closing: {
      line: "Somos uma pequena equipa no Porto.",
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
      submit_v2: "Pedir demo →",
      success_title: "Recebido.",
      success_body: "Respondemos por email em menos de um dia útil.",
      error_title: "Não conseguimos enviar.",
      error_body: "Tente novamente ou escreva diretamente para contacto@nortenode.com.",
      error_by_code: {
        invalid_name:            "Nome inválido.",
        invalid_email:           "Email inválido.",
        invalid_phone:           "Contacto de telefone inválido.",
        invalid_sector:          "Setor inválido.",
        invalid_message:         "Mensagem demasiado longa.",
        email_or_phone_required: "Indique email ou telefone.",
        service_unavailable:     "Serviço temporariamente indisponível.",
        rpc_failed:              "Não foi possível registar o pedido. Tente novamente.",
      },
    },
  },
  quem_somos: {
    meta_title: "Quem Somos",
    meta_description: "Agência independente que opera agentes de IA para negócios locais. Fundada em Vila Nova de Gaia.",
    hero: {
      eyebrow: "QUEM OPERA",
      headline_l1: "Uma agência independente.",
      headline_l2: "Operada por quem a fundou.",
      sub: "Não somos uma plataforma em escala. Somos um operador local que constrói agentes de IA para quem precisa deles a funcionar amanhã.",
      meta: [
        { label: "FUNDADOR",      value: "Adolfo" },
        { label: "SEDE",          value: "Vila Nova de Gaia" },
        { label: "ESPECIALIDADE", value: "Agentes operacionais" },
        { label: "DESDE",         value: "2026" },
      ],
      photo_alt: "Adolfo, fundador da NorteNode, em Vila Nova de Gaia",
      photo_caption: "Adolfo · Fundador & Operador",
    },
    manifesto: {
      eyebrow: "POR QUE EXISTIMOS",
      title: "A maior parte dos negócios locais perde conversas que não sabe que perde.",
      body: [
        "Barbearias, clínicas, ginásios — todos têm o mesmo padrão. Um cliente pergunta no WhatsApp, ninguém responde em vinte minutos, e esse cliente marca noutro lado. Não é falta de vontade. É falta de tempo de alguém atrás do balcão.",
        "A NorteNode existe para operar essa resposta. Não vendemos uma plataforma para que você configure sozinho. Construímos o agente com o contexto real do seu negócio, integramo-lo no seu WhatsApp, e operamo-lo no dia-a-dia. Você recebe os leads já qualificados.",
        "Decidimos fazer isto de uma maneira específica: como agência, não como produto SaaS; com preço fixo por projeto, não com licenças recorrentes; operando localmente em Portugal e Espanha, não em escala global. É uma escolha deliberada. É o que sabemos fazer bem.",
      ],
    },
    principles: {
      eyebrow: "COMO OPERAMOS",
      title: "Três decisões que definem o nosso trabalho.",
      items: [
        { num: "01", title: "Cobramos por resultado, não por licença.",       body: "Preço fixo pelo projeto, com manutenção mensal transparente. Nunca pagará uma licença recorrente por um software cujo código não controla." },
        { num: "02", title: "Operamos o agente, não o vendemos para si.",     body: "Não receberá um painel para configurar respostas e prompts. Nós gerimos o agente com o contexto do seu negócio. Você recebe os agendamentos e os leads." },
        { num: "03", title: "Dizemos quando não fazemos sentido.",            body: "Na primeira chamada decidimos juntos se o projeto faz sentido para o seu caso. Se o volume não justifica, ou se o problema é outro, dizemo-lo aqui. Não vendemos a todos." },
      ],
    },
    trajectory: {
      eyebrow: "TRAJETÓRIA",
      title: "Onde estamos hoje.",
      chapters: [
        { date: "2026 · Q1",     title: "Fundação e primeiros protótipos.", body: "Construção do motor que opera os agentes — Groq, WhatsApp Cloud API, integrações básicas. Testes com barbearias fictícias." },
        { date: "2026 · Q2",     title: "Primeiros clientes reais.",        body: "Primeira barbearia em produção em Vila Nova de Gaia. Iteração sobre tom, contexto, escalonamento ao operador humano." },
        { date: "Capítulo atual", title: "A construir em público.",          body: "Abrimos calendário para mais negócios locais em Portugal e Espanha. Cada cliente novo informa como o produto e a operação evoluem." },
      ],
    },
    final_cta: {
      eyebrow: "PRÓXIMO PASSO",
      title: "Se faz sentido, falemos.",
      body: "Uma chamada de 30 minutos para perceber o seu caso. Sem formulário intermédio, sem pressão comercial.",
      cta_label: "Falar com o Adolfo",
      cta_href: "/contactos",
    },
    hero_quote_v2: {
      quote:       "Prefiro construir uma\nreceção IA que\nfunciona mesmo,\ndo que dez que\nparecem impressionantes.",
      attribution: "Adolfo Byrne · Fundador",
    },
    portrait_v2: {
      paragraphs: [
        "Sou o Adolfo. Comecei a NorteNode em 2026 para resolver um problema concreto: negócios de serviços a perder clientes por respostas lentas.",
        "Background em software. Trabalho de produto end-to-end. Daquele em que, se partir, sou eu que arranjo.",
        "Sediado no Porto. A operar em Portugal e Espanha. Cada email que recebo, leio-o.",
      ],
    },
    principles_v2: {
      title: "Aquilo em que acreditamos.",
      items: [
        { title: "Entregar em semanas, não em trimestres", desc: "A maioria das agências fala em meses, nós falamos em semanas. Primeiro operador ao vivo em 14 dias. O ponto é começar a recolher conversas reais depressa." },
        { title: "Custom acima de template",               desc: "Sem UI de configuração estilo plataforma. Cada operador é construído com o seu contexto — serviços, horários, preços, objeções reais. Templates perdem o que torna o seu negócio seu." },
        { title: "Engenheiros tratam do código",           desc: "Não paga por um dashboard que nunca vai abrir. Nós implementamos, monitorizamos e arranjamos. O seu tempo vai para gerir o negócio, não para prompts." },
        { title: "Discretos por design",                   desc: "Sem upsells, sem emails agressivos, sem métricas vazias. Dizemos o que está a funcionar, arranjamos o que não está, e faturamos de forma previsível." },
      ],
    },
    closing_v2: {
      line: "Se gere um negócio de serviços e está cansado de chamadas perdidas e respostas lentas, escreva-me. Leio cada email.",
    },
  },
  home: {
    hero: {
      headline_v2: "Construímos a\nreceção IA que\no seu negócio\nainda não\nsabe que precisa.",
      sub_v2:      "Operadores IA personalizados para negócios de serviços. Uma camada de conversação no WhatsApp e na web. Implementamos em 14 dias.",
      cta_demo:    "Ver demo →",
      cta_talk:    "Falar connosco →",
    },
    proof: {
      cohort_v2: "Atualmente em produção com a coorte fundadora. A integrar novas contas todas as semanas.",
    },
    product: {
      title_v2: "Três operadores.\nUma camada de inteligência.",
      items: [
        { desc_v2: "Receção 24/7 através da API oficial Business. Marca, qualifica, escala." },
        { desc_v2: "Superfície de chat leve para o seu site. Mesmo operador, mesma inteligência." },
        { desc_v2: "Agente de voz para chamadas recebidas. Lançamento limitado Q2 2026." },
      ],
    },
    process: {
      title_v2: "Da primeira mensagem à marcação confirmada.",
      steps: [
        { title_v2: "Inbound",     desc_v2: "O cliente envia uma mensagem. O operador analisa em menos de 200ms." },
        { title_v2: "Compreender", desc_v2: "Intenção e histórico cruzados com o perfil do cliente." },
        { title_v2: "Responder",   desc_v2: "Responder, qualificar o lead, ou escalar." },
        { title_v2: "Executar",    desc_v2: "Marcar a consulta, registar o lead, notificar o owner." },
      ],
    },
    example: {
      title_v2: "O que parece em produção.",
    },
    final: {
      title_v2: "A sua receção\nfunciona enquanto\nvocê não.",
      sub_v2:   "Primeiro operador implementado em 14 dias. Escopo fixo. Preço fixo.",
      cta_v2:   "Pedir demo →",
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
    blurb: "Receção IA para negócios de serviços. Construído no Porto, implantado em qualquer lado.",
    sections: { product: "Produto", company: "Empresa", legal: "Legal" },
    rights: "Todos os direitos reservados.",
    privacy: "Privacidade",
    terms: "Termos",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { es, en, pt };
export type Locale = "es" | "en" | "pt";
export const LOCALES: readonly Locale[] = ["es", "en", "pt"];
