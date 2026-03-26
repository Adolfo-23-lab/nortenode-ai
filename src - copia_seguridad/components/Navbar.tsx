"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Menu, X, ChevronDown } from "lucide-react";

const mainLinks = [
  { label: "Início", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Demo", href: "/demo" },
  { label: "Contactos", href: "/contactos" },
];

const solucoesLinks = [
  { label: "Widget Web IA", href: "/solucoes/widget-web" },
  { label: "WhatsApp IA", href: "/solucoes/whatsapp" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solucoesOpen, setSolucoesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolucoesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setSolucoesOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href ? "text-emerald-400" : "text-slate-300 hover:text-white";

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            NorteNode <span className="text-emerald-500">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {mainLinks.slice(0, 1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Soluções dropdown — click-outside pattern instead of onBlur */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setSolucoesOpen((prev) => !prev)}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/solucoes")
                  ? "text-emerald-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Soluções
              <ChevronDown
                className={`w-4 h-4 transition-transform ${solucoesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {solucoesOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 shadow-2xl">
                {solucoesLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${isActive(link.href)}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {mainLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/demo"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/20 transition-colors"
        >
          Agendar Chamada
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5 px-4 pb-6 pt-2">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 text-sm font-medium border-b border-white/5 transition-colors ${isActive(link.href)}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Soluções section */}
          <div className="py-3 border-b border-white/5">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Soluções</p>
            {solucoesLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 pl-3 text-sm font-medium transition-colors ${isActive(link.href)}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/demo"
            className="mt-4 w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-emerald-500 text-slate-950 text-sm font-bold hover:bg-emerald-400 transition-colors"
          >
            Agendar Chamada
          </Link>
        </div>
      )}
    </nav>
  );
}
