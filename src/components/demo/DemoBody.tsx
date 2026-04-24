"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import DemoHero from "./DemoHero";
import DemoStage from "./DemoStage";
import DemoHow from "./DemoHow";
import DemoLimits from "./DemoLimits";
import DemoFinalCTA from "./DemoFinalCTA";

export default function DemoBody() {
  const t = useT();
  const d = t.demo;

  return (
    <>
      <DemoHero
        eyebrow={d.hero.eyebrow}
        headline_l1={d.hero.headline_l1}
        headline_l2={d.hero.headline_l2}
        sub={d.hero.sub}
        meta={d.hero.meta}
      />
      <DemoStage />
      <DemoHow eyebrow={d.how.eyebrow} title={d.how.title} steps={d.how.steps} />
      <DemoLimits eyebrow={d.limits.eyebrow} title={d.limits.title} items={d.limits.items} />
      <DemoFinalCTA
        eyebrow={d.final_cta.eyebrow}
        title={d.final_cta.title}
        body={d.final_cta.body}
        cta_label={d.final_cta.cta_label}
        cta_href={d.final_cta.cta_href}
      />
    </>
  );
}
