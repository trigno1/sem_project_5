import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { Language, languageNames } from "./dictionaries";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manage focus when opening/closing
  useEffect(() => {
    if (isOpen) {
      // Focus first option when opened
      const firstOption = listboxRef.current?.querySelector('button');
      if (firstOption) firstOption.focus();
    } else if (isOpen === false && document.activeElement !== triggerRef.current && dropdownRef.current?.contains(document.activeElement)) {
      // Return focus to trigger when closed, if focus was inside dropdown
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, lang: Language) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setLanguage(lang);
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select Language"
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-black/70 hover:text-black transition-colors rounded-full bg-black/[0.04] hover:bg-black/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-black/5"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase text-xs tracking-wider">{language}</span>
      </button>
      
      {isOpen && (
        <div 
          ref={listboxRef}
          role="listbox" 
          className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-black/5 py-1 z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          {(Object.keys(languageNames) as Language[]).map((lang) => (
            <button
              key={lang}
              role="option"
              aria-selected={language === lang}
              onClick={() => {
                setLanguage(lang);
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              onKeyDown={(e) => handleOptionKeyDown(e, lang)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                language === lang ? "font-bold text-indigo-600 bg-indigo-50" : "font-medium text-black/60 hover:text-black hover:bg-black/5 focus:bg-black/5"
              }`}
            >
              {languageNames[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
