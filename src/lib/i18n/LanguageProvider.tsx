import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Language, type TranslationShape } from "./translations";

/**
 * Single, global source of truth for the site's language. Detected once from
 * the browser (no visible switcher, no persisted preference — see the task
 * that introduced this file): `en*` → English, everything else (including
 * `nl*`) → Dutch fallback. Every component reads the SAME decision via
 * useLanguage() so the site can never end up with one section in a
 * different language from the rest.
 */
const detectLanguage = (): Language => {
  if (typeof navigator === "undefined") return "nl";
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "nl";
};

interface LanguageContextValue {
  language: Language;
  t: TranslationShape;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Lazy initial state — this is a client-only SPA (no SSR), so navigator is
  // always available at first render, meaning the correct language is known
  // immediately and nothing ever flashes in the wrong language first.
  const [language] = useState<Language>(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    const t = translations[language];
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", t.meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", t.meta.description);
  }, [language]);

  const value = useMemo(() => ({ language, t: translations[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
