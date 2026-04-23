"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language } from "./dictionaries";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("phygital_lang") as Language;
      if (savedLang && dictionaries[savedLang]) {
        setLanguageState(savedLang);
      }
    } catch (e) {
      console.warn("localStorage is not available for reading");
    } finally {
      setMounted(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("phygital_lang", lang);
    } catch (e) {
      console.warn("localStorage is not available for writing");
    }
  };

  const t = (key: string) => {
    const dict = dictionaries[language] as Record<string, string>;
    const enDict = dictionaries["en"] as Record<string, string>;
    return dict[key] || enDict[key] || key;
  };

  // Prevent hydration mismatch by not rendering context children immediately or just trusting client
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
