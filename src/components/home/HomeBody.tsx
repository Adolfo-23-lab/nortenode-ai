"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import HomeHero from "./HomeHero";
import HomeProof from "./HomeProof";
import HomeProduct from "./HomeProduct";
import HomeProcess from "./HomeProcess";
import HomeExample from "./HomeExample";
import HomeFinal from "./HomeFinal";

export default function HomeBody() {
  const t = useT();
  const h = t.home;

  return (
    <>
      <HomeHero    hero={h.hero} />
      <HomeProof   cohort={h.proof.cohort_v2} />
      <HomeProduct title={h.product.title_v2} items={h.product.items} />
      <HomeProcess title={h.process.title_v2} steps={h.process.steps} />
      <HomeExample title={h.example.title_v2} />
      <HomeFinal   final={h.final} />
    </>
  );
}
