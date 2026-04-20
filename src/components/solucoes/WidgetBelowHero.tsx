"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import SolucoesIntegration from "./SolucoesIntegration";
import SolucoesCapabilities from "./SolucoesCapabilities";
import SolucoesFinalCTA from "./SolucoesFinalCTA";

/**
 * Thin client shell that feeds the widget-specific dictionary subtree
 * into the three generic section components.  Twin of WhatsAppBelowHero.
 */
export default function WidgetBelowHero() {
  const t = useT();
  const wg = t.solucoes.widget;
  const common = t.solucoes.common;

  return (
    <>
      <SolucoesIntegration
        eyebrow={common.integration_eyebrow}
        title={common.integration_title}
        steps={wg.integration_steps}
      />
      <SolucoesCapabilities
        eyebrow={common.capabilities_eyebrow}
        title={common.capabilities_title}
        items={wg.capabilities}
      />
      <SolucoesFinalCTA
        eyebrow={common.cta_eyebrow}
        headline={wg.cta_headline}
        primaryLabel={common.cta_primary}
        primaryHref="/contactos"
        secondaryLabel={common.cta_secondary}
        secondaryHref="/demo"
      />
    </>
  );
}
