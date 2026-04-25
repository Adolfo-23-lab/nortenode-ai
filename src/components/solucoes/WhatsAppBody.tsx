"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import WhatsAppHero from "./WhatsAppHero";
import SolucoesSpecs from "./SolucoesSpecs";
import SolucoesCapabilitiesV2 from "./SolucoesCapabilitiesV2";
import WhatsAppIntegrations from "./WhatsAppIntegrations";
import SolucoesPricing from "./SolucoesPricing";
import SolucoesFAQ from "./SolucoesFAQ";
import SolucoesFinalCTAV2 from "./SolucoesFinalCTAV2";

const WHATSAPP_SPEC_META: ReadonlyArray<{ label: string; value: string }> = [
  { label: "RESPONSE LATENCY", value: "<200ms" },
  { label: "LANGUAGES",        value: "3" },
  { label: "AVAILABILITY",     value: "24/7" },
  { label: "DEPLOYMENT TIME",  value: "14 days" },
];

const WHATSAPP_INTEGRATIONS: ReadonlyArray<string> = [
  "Google Calendar",
  "Cal.com",
  "Calendly",
  "Custom CRM",
  "HubSpot",
  "Notion",
];

export default function WhatsAppBody() {
  const t = useT();
  const w = t.solucoes.whatsapp;

  const specsItems = WHATSAPP_SPEC_META.map((meta, i) => ({
    label: meta.label,
    value: meta.value,
    desc:  w.specs_v2.items_v2[i]?.desc_v2 ?? "",
  }));

  return (
    <>
      <WhatsAppHero
        headline={w.hero_v2.headline_v2}
        sub={w.hero_v2.sub_v2}
        ctaDemo={w.hero_v2.cta_demo_v2}
        ctaTalk={w.hero_v2.cta_talk_v2}
      />
      <SolucoesSpecs items={specsItems} />
      <SolucoesCapabilitiesV2
        title={w.capabilities_v2.title_v2}
        items={w.capabilities_v2.items_v2}
      />
      <WhatsAppIntegrations
        subhead={w.integrations_v2.subhead_v2}
        items={WHATSAPP_INTEGRATIONS}
        note={w.integrations_v2.note_v2}
      />
      <SolucoesPricing
        title={w.pricing_v2.title_v2}
        paragraph1={w.pricing_v2.paragraph_1_v2}
        paragraph2={w.pricing_v2.paragraph_2_v2}
        ctaLabel={w.pricing_v2.cta_label_v2}
      />
      <SolucoesFAQ
        title={w.faq_v2.title_v2}
        items={w.faq_v2.items_v2}
      />
      <SolucoesFinalCTAV2
        title={w.final_v2.title_v2}
        ctaLabel={w.final_v2.cta_label_v2}
      />
    </>
  );
}
