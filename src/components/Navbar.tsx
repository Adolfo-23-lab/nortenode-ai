"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useT } from "@/i18n/provider";
import { LOCALES } from "@/i18n/dictionary";
import { useMotionInitial } from "@/lib/motion-safe";

export default function Navbar() {
  const pathname = usePathname();
  const t = useT();
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const mInit = useMotionInitial();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => { setOpen(false); }, [pathname]);

  const links: Array<{ href: string; label: string }> = [
    { href: "/solucoes/whatsapp",   label: t.nav.whatsapp },
    { href: "/solucoes/widget-web", label: t.nav.widget },
    { href: "/demo",                label: t.nav.demo },
    { href: "/quem-somos",          label: t.nav.about },
    { href: "/contactos",           label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled
          ? "border-b border-[var(--color-border-v2)] bg-[var(--color-bg-v2)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[60px] w-full max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-12">
        {/* Brand */}
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
            priority
          />
          <span className="text-[16px] font-medium tracking-[-0.01em] text-[var(--color-text-primary-v2)]">
            NorteNode
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = isActive(l.href.split("#")[0] || "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative py-1 text-[14px] font-normal transition-colors",
                  active
                    ? "text-[var(--color-text-primary-v2)]"
                    : "text-[var(--color-text-secondary-v2)] hover:text-[var(--color-text-primary-v2)]",
                )}
              >
                {l.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 h-px w-full bg-[var(--color-accent-soft-v2)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Locale inline pills */}
          <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] md:flex">
            {LOCALES.map((l, i) => (
              <React.Fragment key={l}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-[var(--color-text-disabled-v2)]">
                    ·
                  </span>
                )}
                <button
                  onClick={() => setLocale(l)}
                  className={cn(
                    "transition-colors",
                    l === locale
                      ? "text-[var(--color-text-primary-v2)]"
                      : "text-[var(--color-text-muted-v2)] hover:text-[var(--color-text-primary-v2)]",
                  )}
                  aria-pressed={l === locale}
                  aria-label={`Switch language to ${l.toUpperCase()}`}
                >
                  {l.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Ghost CTA */}
          <Link
            href="/demo"
            className="hidden items-center rounded-[var(--radius-v2)] border border-[var(--color-border-strong-v2)] px-5 py-2.5 text-[14px] font-medium text-[var(--color-text-primary-v2)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--color-accent-v2)] hover:shadow-[var(--shadow-glow-soft-v2)] md:inline-flex"
          >
            Request demo →
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="inline-flex h-9 w-9 items-center justify-center text-[var(--color-text-primary-v2)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer (fullscreen) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={mInit({ opacity: 0 })}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 top-[60px] z-40 bg-[var(--color-bg-v2)] md:hidden"
          >
            <div className="flex h-[calc(100dvh-60px)] flex-col px-6 py-10">
              <nav className="flex flex-col gap-6">
                {links.map((l) => {
                  const active = isActive(l.href.split("#")[0] || "/");
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={cn(
                        "text-[24px] font-normal transition-colors",
                        active
                          ? "text-[var(--color-text-primary-v2)]"
                          : "text-[var(--color-text-secondary-v2)]",
                      )}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-10 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em]">
                {LOCALES.map((l, i) => (
                  <React.Fragment key={l}>
                    {i > 0 && (
                      <span aria-hidden="true" className="text-[var(--color-text-disabled-v2)]">
                        ·
                      </span>
                    )}
                    <button
                      onClick={() => setLocale(l)}
                      className={cn(
                        l === locale
                          ? "text-[var(--color-text-primary-v2)]"
                          : "text-[var(--color-text-muted-v2)]",
                      )}
                      aria-pressed={l === locale}
                    >
                      {l.toUpperCase()}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href="/demo"
                  className="flex w-full items-center justify-center rounded-[var(--radius-v2)] border border-[var(--color-border-strong-v2)] px-5 py-3.5 text-[14px] font-medium text-[var(--color-text-primary-v2)]"
                >
                  Request demo →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
