"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, LOCALES, type Dictionary, type Locale } from "./dictionary";

const STORAGE_KEY = "nn_locale";
const DEFAULT_LOCALE: Locale = "pt";   // PT primary autoritativo (alineado con metadata.title del layout)

interface I18nCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage or browser locale — client-only.
  // Replicates setLocale() logic inline (state + document.lang sync) so the
  // <html lang="..."> attribute reflects the hydrated locale on mount, not
  // just on subsequent setLocale() calls from a UI selector.
  useEffect(() => {
    const applyLocale = (l: Locale) => {
      setLocaleState(l);
      if (typeof document !== "undefined") {
        document.documentElement.lang = l === "pt" ? "pt-PT" : l;
      }
    };
    const stored = typeof window !== "undefined"
      ? (window.localStorage.getItem(STORAGE_KEY) as Locale | null)
      : null;
    if (stored && LOCALES.includes(stored)) {
      applyLocale(stored);
      return;
    }
    if (typeof navigator !== "undefined") {
      const browser = navigator.language.slice(0, 2).toLowerCase() as Locale;
      if (LOCALES.includes(browser)) applyLocale(browser);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
    // Keep <html lang="..."> in sync for accessibility / SEO.
    if (typeof document !== "undefined") {
      document.documentElement.lang = l === "pt" ? "pt-PT" : l;
    }
  }, []);

  const value = useMemo<I18nCtx>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useT(): Dictionary {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useT must be used inside <I18nProvider>");
  return ctx.t;
}

export function useLocale(): { locale: Locale; setLocale: (l: Locale) => void } {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used inside <I18nProvider>");
  return { locale: ctx.locale, setLocale: ctx.setLocale };
}
