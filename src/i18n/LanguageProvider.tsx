'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale, Localized, LocalizedList } from '@/content/types';
import { dictionary, type Dictionary } from './dictionary';

const STORAGE_KEY = 'luma-language';
const DEFAULT_LOCALE: Locale = 'en';

interface LanguageContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Dot-path lookup into the UI dictionary, with {placeholder} interpolation. */
  t: (path: string, vars?: Record<string, string | number>) => string;
  /** Pick the active language out of a bilingual content value. */
  pick: <T extends string | string[]>(value: Record<Locale, T>) => T;
  /** Locale-aware number formatting (Arabic uses Eastern Arabic numerals). */
  formatNumber: (value: number) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolve(source: Dictionary, path: string): string {
  const value = path
    .split('.')
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === 'object'
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      source,
    );

  return typeof value === 'string' ? value : path;
}

function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return Object.entries(vars).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Read the stored preference after mount. The inline script in <head>
  // (see layout.tsx) has already applied lang/dir to <html>, so this only
  // syncs React state and never causes a visible flash.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'ar') {
        setLocaleState(stored);
        return;
      }
      if (document.documentElement.lang === 'ar') setLocaleState('ar');
    } catch {
      /* localStorage unavailable — stay on the default locale */
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    const root = document.documentElement;
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* preference simply will not persist */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const active = dictionary[locale];
    const isRTL = locale === 'ar';

    return {
      locale,
      isRTL,
      dir: isRTL ? 'rtl' : 'ltr',
      setLocale,
      toggleLocale: () => setLocale(locale === 'en' ? 'ar' : 'en'),
      t: (path, vars) => interpolate(resolve(active, path), vars),
      pick: <T extends string | string[]>(v: Record<Locale, T>) => v[locale],
      formatNumber: (n: number) =>
        new Intl.NumberFormat(isRTL ? 'ar-JO' : 'en-US').format(n),
    };
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside <LanguageProvider>');
  }
  return context;
}

/** Convenience alias for components that only need the translate function. */
export function useT() {
  return useLanguage().t;
}

export type { Localized, LocalizedList };
