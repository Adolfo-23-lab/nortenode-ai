"use client";

import * as React from "react";
import { useT } from "@/i18n/provider";
import ContactosHero from "./ContactosHero";
import ContactosDirectory from "./ContactosDirectory";
import ContactosProcess from "./ContactosProcess";
import ContactosPosition from "./ContactosPosition";
import ContactosForm from "./ContactosForm";

/**
 * Thin client shell — feeds the contactos dictionary subtree into
 * the visual sections. Kept separate from the page so the page can
 * stay a server component and export metadata.
 */
export default function ContactosBody() {
  const t = useT();
  const c = t.contactos;

  return (
    <>
      <ContactosHero
        eyebrow={c.hero.eyebrow}
        headline_l1={c.hero.headline_l1}
        headline_l2={c.hero.headline_l2}
        sub={c.hero.sub}
        meta={c.hero.meta}
      />
      <ContactosDirectory eyebrow={c.directory.eyebrow} rows={c.directory.rows} />
      <ContactosProcess eyebrow={c.process.eyebrow} title={c.process.title} steps={c.process.steps} />
      <ContactosPosition eyebrow={c.position.eyebrow} title={c.position.title} items={c.position.items} />
      <ContactosForm />
    </>
  );
}
