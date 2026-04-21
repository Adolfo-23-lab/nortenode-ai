"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useT } from "@/i18n/provider";

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  const cols: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
    {
      title: t.footer.sections.product,
      links: [
        { href: "/demo",                   label: t.nav.demo },
        { href: "/solucoes/whatsapp",      label: t.nav.whatsapp },
        { href: "/solucoes/widget-web",    label: t.nav.widget },
        { href: "/#faq",                   label: t.faq.eyebrow },
      ],
    },
    {
      title: t.footer.sections.company,
      links: [
        { href: "/quem-somos", label: t.nav.about },
        { href: "/contactos",  label: t.nav.contact },
      ],
    },
    {
      title: t.footer.sections.legal,
      links: [
        { href: "/privacy", label: t.footer.privacy },
        { href: "/terms",   label: t.footer.terms },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-[var(--color-hairline)] bg-[var(--color-ink-50)]">
      {/* Decorative aurora bleed at top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[color:var(--color-signal-500)]/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(47,130,247,0.22) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.5fr_2fr] md:gap-20">
          {/* Brand block */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-glass-surface)] ring-1 ring-[var(--color-hairline-strong)]">
                <Image src="/nortenode_star_icon.png" alt="" width={22} height={22} />
              </span>
              <span className="font-display text-2xl tracking-tight text-white">
                NorteNode
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--color-ink-text-muted)]">
              {t.footer.blurb}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <SocialIconLink href="mailto:adolfo@nortenode.com" label="Email">
                <Mail size={14} />
              </SocialIconLink>
              <SocialIconLink href="https://www.instagram.com/nortenode" label="Instagram">
                <Instagram size={14} />
              </SocialIconLink>
              <SocialIconLink href="https://linkedin.com/company/nortenode" label="LinkedIn">
                <Linkedin size={14} />
              </SocialIconLink>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-3 gap-6 md:gap-10">
            {cols.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-text-soft)]">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-[var(--color-ink-text-primary)] transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-hairline)] pt-6 text-xs text-[var(--color-ink-text-soft)] md:flex-row">
          <p>© {year} NorteNode · {t.footer.rights}</p>
          <p className="font-mono tracking-wide">nortenode.com</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-glass-surface)] text-[var(--color-ink-text-primary)] transition-all hover:border-[var(--color-ghost-border-hover)] hover:bg-[var(--color-glass-surface-hover)] hover:text-white"
    >
      {children}
    </Link>
  );
}
