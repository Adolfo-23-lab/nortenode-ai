"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import QuemSomosHero from "./QuemSomosHero";
import QuemSomosManifesto from "./QuemSomosManifesto";
import QuemSomosPrinciples from "./QuemSomosPrinciples";
import QuemSomosTrajectory from "./QuemSomosTrajectory";
import QuemSomosFinalCTA from "./QuemSomosFinalCTA";

export default function QuemSomosBody() {
  const t = useT();
  const q = t.quem_somos;

  return (
    <>
      <QuemSomosHero
        eyebrow={q.hero.eyebrow}
        headline_l1={q.hero.headline_l1}
        headline_l2={q.hero.headline_l2}
        sub={q.hero.sub}
        meta={q.hero.meta}
        photo_alt={q.hero.photo_alt}
        photo_caption={q.hero.photo_caption}
      />
      <QuemSomosManifesto
        eyebrow={q.manifesto.eyebrow}
        title={q.manifesto.title}
        body={q.manifesto.body}
      />
      <QuemSomosPrinciples
        eyebrow={q.principles.eyebrow}
        title={q.principles.title}
        items={q.principles.items}
      />
      <QuemSomosTrajectory
        eyebrow={q.trajectory.eyebrow}
        title={q.trajectory.title}
        chapters={q.trajectory.chapters}
      />
      <QuemSomosFinalCTA
        eyebrow={q.final_cta.eyebrow}
        title={q.final_cta.title}
        body={q.final_cta.body}
        cta_label={q.final_cta.cta_label}
        cta_href={q.final_cta.cta_href}
      />
    </>
  );
}
