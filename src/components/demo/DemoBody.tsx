"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import DemoHero from "./DemoHero";
import DemoChat from "./DemoChat";
import DemoParagraphs from "./DemoParagraphs";
import DemoSuggestedPrompts from "./DemoSuggestedPrompts";
import DemoFinal from "./DemoFinal";

export default function DemoBody() {
  const t = useT();
  const d = t.demo;

  return (
    <>
      <DemoHero
        headline_v2={d.hero.headline_v2}
        sub_v2={d.hero.sub_v2}
      />
      <section className="bg-[var(--color-bg-v2)] pb-[80px]">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_320px]">
            <DemoChat />
            <DemoParagraphs paragraphs={d.paragraphs} />
          </div>
          <DemoSuggestedPrompts />
        </div>
      </section>
      <DemoFinal final={d.final} />
    </>
  );
}
