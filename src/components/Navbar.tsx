"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale, useT } from "@/i18n/provider";
import { LOCALES, type Locale } from "@/i18n/dictionary";
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
    { href: "/#servicios",          label: t.services.eyebrow },
    { href: "/quem-somos",          label: t.nav.about },
    { href: "/contactos",           label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-full border transition-all duration-300",
            scrolled
              ? "glass-strong border-white/10 px-3 py-2"
              : "border-transparent bg-transparent px-3 py-2",
          )}
        >
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-2.5 pl-2" aria-label="NorteNode">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-105">
              <Image
                src="/nortenode_star_icon.png"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
                priority
              />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              NorteNode
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const href0 = l.href.split("#")[0] || "/";
              const active = href0 === "/"
                ? pathname === "/"
                : pathname.startsWith(href0);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LocaleMenu current={locale} onChange={setLocale} />

            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/demo">{t.common.cta_primary}</Link>
            </Button>

            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={mInit({ opacity: 0, y: -6 })}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="mx-auto mt-3 w-full max-w-7xl px-5 md:hidden"
          >
            <div className="glass-strong rounded-2xl p-2">
              <nav className="flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/[0.06] hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="mt-1 p-2">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/demo">{t.common.cta_primary}</Link>
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------------------------------------------------------------------
// Locale picker
// ---------------------------------------------------------------------
function LocaleMenu({
  current,
  onChange,
}: {
  current: Locale;
  onChange: (l: Locale) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const mInit = useMotionInitial();

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", onDoc);
    return () => window.removeEventListener("mousedown", onDoc);
  }, []);

  const labels: Record<Locale, string> = { es: "ES", en: "EN", pt: "PT" };
  const names:  Record<Locale, string> = { es: "Español", en: "English", pt: "Português" };

  return (
    <div ref={ref} className="relative">
      <button
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 text-[11px] font-medium tracking-wide text-white/80 hover:text-white"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe size={12} strokeWidth={1.75} />
        {labels[current]}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={mInit({ opacity: 0, y: 4 })}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-[var(--color-ink-100)]/95 p-1 shadow-[var(--shadow-panel)] backdrop-blur-xl"
          >
            {LOCALES.map((l) => (
              <button
                key={l}
                role="option"
                aria-selected={l === current}
                onClick={() => { onChange(l); setOpen(false); }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors",
                  l === current
                    ? "bg-white/[0.08] text-white"
                    : "text-white/60 hover:bg-white/[0.04] hover:text-white",
                )}
              >
                <span>{labels[l]}</span>
                <span className="text-[10px] text-white/40">{names[l]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
