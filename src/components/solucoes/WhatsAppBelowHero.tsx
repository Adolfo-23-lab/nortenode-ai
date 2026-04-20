"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import SolucoesIntegration from "./SolucoesIntegration";
import SolucoesCapabilities from "./SolucoesCapabilities";
import SolucoesFinalCTA from "./SolucoesFinalCTA";

/**
 * Thin client shell that feeds the whatsapp-specific dictionary
 * subtree into the three generic section components.  Kept separate
 * from the page so the page itself stays a server component and can
 * export metadata.
 */
export default function WhatsAppBelowHero() {
  const t = useT();
  const wa = t.solucoes.whatsapp;
  const common = t.solucoes.common;

  return (
    <>
      <SolucoesIntegration
        eyebrow={common.integration_eyebrow}
        title={common.integration_title}
        steps={wa.integration_steps}
      />
      <SolucoesCapabilities
        eyebrow={common.capabilities_eyebrow}
        title={common.capabilities_title}
        items={wa.capabilities}
      />
      <SolucoesFinalCTA
        eyebrow={common.cta_eyebrow}
        headline={wa.cta_headline}
        primaryLabel={common.cta_primary}
        primaryHref="/contactos"
        secondaryLabel={common.cta_secondary}
        secondaryHref="/demo"
      />
    </>
  );
}
