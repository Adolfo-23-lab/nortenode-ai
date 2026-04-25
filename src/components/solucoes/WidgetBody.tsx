"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import WidgetHero from "./WidgetHero";
import SolucoesSpecs from "./SolucoesSpecs";
import WidgetInstallation from "./WidgetInstallation";
import SolucoesCapabilities from "./SolucoesCapabilities";
import WidgetAppearance from "./WidgetAppearance";
import SolucoesPricing from "./SolucoesPricing";
import SolucoesFAQ from "./SolucoesFAQ";
import SolucoesFinalCTA from "./SolucoesFinalCTA";

const WIDGET_SPEC_META: ReadonlyArray<{ label: string; value: string }> = [
  { label: "WIDGET SIZE", value: "<14kb" },
  { label: "LOAD TIME",   value: "<80ms" },
  { label: "LANGUAGES",   value: "3" },
  { label: "DEPLOYMENT",  value: "1 day" },
];

export default function WidgetBody() {
  const t = useT();
  const w = t.solucoes.widget;

  const specsItems = WIDGET_SPEC_META.map((meta, i) => ({
    label: meta.label,
    value: meta.value,
    desc:  w.specs_v2.items_v2[i]?.desc_v2 ?? "",
  }));

  return (
    <>
      <WidgetHero
        headline={w.hero_v2.headline_v2}
        sub={w.hero_v2.sub_v2}
        ctaDemo={w.hero_v2.cta_demo_v2}
        ctaTalk={w.hero_v2.cta_talk_v2}
      />
      <SolucoesSpecs items={specsItems} />
      <WidgetInstallation
        title={w.installation_v2.title_v2}
        body={w.installation_v2.body_v2}
      />
      <SolucoesCapabilities
        title={w.capabilities_v2.title_v2}
        items={w.capabilities_v2.items_v2}
      />
      <WidgetAppearance
        title={w.appearance_v2.title_v2}
        themes={w.appearance_v2.themes_v2}
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
      <SolucoesFinalCTA
        title={w.final_v2.title_v2}
        ctaLabel={w.final_v2.cta_label_v2}
      />
    </>
  );
}
