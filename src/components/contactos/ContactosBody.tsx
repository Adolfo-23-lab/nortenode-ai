"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import ContactosHero from "./ContactosHero";
import ContactosForm from "./ContactosForm";
import ContactosSidebar from "./ContactosSidebar";
import ContactosClosing from "./ContactosClosing";

export default function ContactosBody() {
  const t = useT();
  const c = t.contactos;

  return (
    <>
      <ContactosHero
        headline_v2={c.hero.headline_v2}
        sub={c.hero.sub}
      />
      <section className="bg-[var(--color-bg-v2)] pb-[120px]">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
            <ContactosForm />
            <ContactosSidebar
              what_happens_next_items={c.sidebar.what_happens_next.items}
            />
          </div>
        </div>
      </section>
      <ContactosClosing line={c.closing.line} />
    </>
  );
}
