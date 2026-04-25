"use client";

import Link from "next/link";
import Image from "next/image";
import { useT } from "@/i18n/provider";

export default function Footer() {
  const t = useT();

  const productLinks: Array<{ href: string; label: string }> = [
    { href: "/solucoes/whatsapp",   label: t.nav.whatsapp },
    { href: "/solucoes/widget-web", label: t.nav.widget },
    { href: "/demo",                label: t.nav.demo },
  ];

  const agencyLinks: Array<{ href: string; label: string }> = [
    { href: "/quem-somos", label: t.nav.about },
    { href: "/contactos",  label: t.nav.contact },
    { href: "/privacy",    label: t.footer.privacy },
    { href: "/terms",      label: t.footer.terms },
  ];

  return (
    <footer className="relative bg-[var(--color-bg-v2)]">
      <div className="hairline-v2" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[35%_35%_30%] md:gap-16">
          {/* LEFT — Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="NorteNode"
            >
              <Image
                src="/nortenode_star_icon.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
              />
              <span className="text-[16px] font-medium tracking-[-0.01em] text-[var(--color-text-primary-v2)]">
                NorteNode
              </span>
            </Link>
            <p className="mt-6 max-w-[35ch] text-[14px] leading-relaxed text-[var(--color-text-secondary-v2)]">
              {t.footer.blurb}
            </p>
            <p className="mono-label-v2 mt-8">© 2026 NORTENODE LDA</p>
          </div>

          {/* CENTER — Product + Agency */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="mono-label-v2">PRODUCT</p>
              <ul className="mt-5 flex flex-col gap-3">
                {productLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-[var(--color-text-secondary-v2)] transition-colors hover:text-[var(--color-text-primary-v2)] hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono-label-v2">AGENCY</p>
              <ul className="mt-5 flex flex-col gap-3">
                {agencyLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-[var(--color-text-secondary-v2)] transition-colors hover:text-[var(--color-text-primary-v2)] hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — Direct */}
          <div>
            <p className="mono-label-v2">DIRECT</p>
            <dl className="mt-5 flex flex-col gap-4 text-[14px]">
              <div className="flex items-baseline gap-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]">
                  EMAIL
                </dt>
                <dd>
                  <a
                    href="mailto:contacto@nortenode.com"
                    className="text-[var(--color-accent-v2)] transition-opacity hover:opacity-80"
                  >
                    contacto@nortenode.com
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]">
                  PHONE
                </dt>
                <dd className="text-[var(--color-text-primary-v2)]">+351 937 809 995</dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted-v2)]">
                  OFFICE
                </dt>
                <dd className="text-[var(--color-text-primary-v2)]">Porto, Portugal</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="hairline-v2 mt-16" aria-hidden="true" />
        <p className="mono-label-v2 mt-6 text-center md:text-left">
          ENGINEERED IN PORTO &nbsp;·&nbsp; STATUS: LIVE &nbsp;·&nbsp; v.1.0.0
        </p>
      </div>
    </footer>
  );
}
