import { createContext, useContext, useState, type ReactNode } from 'react';
import ru from './ru.json';
import kk from './kk.json';
import en from './en.json';

export const LANGUAGES = ['ru', 'kk', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

const dictionaries: Record<Language, Record<string, string>> = { ru, kk, en };
const STORAGE_KEY = 'platform:language';

function savedLanguage(): Language {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value && (LANGUAGES as readonly string[]).includes(value)) return value as Language;
  } catch {
    // localStorage может быть недоступен (приватный режим) — тогда русский по умолчанию
  }
  return 'ru';
}

type I18n = { language: Language; setLanguage: (lang: Language) => void; t: (key: string) => string };

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setState] = useState<Language>(savedLanguage);

  const setLanguage = (lang: Language) => {
    setState(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* не критично */ }
  };
  // Ключа нет в словаре — показываем сам ключ, чтобы пропуск было видно
  const t = (key: string) => dictionaries[language][key] ?? key;

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
