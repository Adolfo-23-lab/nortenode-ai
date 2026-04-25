"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import QuemSomosHeroQuote from "./QuemSomosHeroQuote";
import QuemSomosPortrait from "./QuemSomosPortrait";
import QuemSomosPrinciples from "./QuemSomosPrinciples";
import QuemSomosClosing from "./QuemSomosClosing";

export default function QuemSomosBody() {
  const t = useT();
  const q = t.quem_somos;

  return (
    <>
      <QuemSomosHeroQuote
        quote={q.hero_quote_v2.quote}
        attribution={q.hero_quote_v2.attribution}
      />
      <QuemSomosPortrait
        paragraphs={q.portrait_v2.paragraphs}
      />
      <QuemSomosPrinciples
        title={q.principles_v2.title}
        items={q.principles_v2.items}
      />
      <QuemSomosClosing
        line={q.closing_v2.line}
      />
    </>
  );
}
