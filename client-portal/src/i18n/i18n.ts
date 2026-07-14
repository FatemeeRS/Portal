import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import fa from "./locales/fa.json";
import en from "./locales/en.json";

// DESIGN.md "RTL First": Persian is the primary language, English is secondary.
export const supportedLanguages = ["fa", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const rtlLanguages: ReadonlySet<SupportedLanguage> = new Set(["fa"]);

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: fa },
      en: { translation: en }
    },
    fallbackLng: "fa",
    supportedLngs: supportedLanguages,
    interpolation: { escapeValue: false }
  });

export default i18n;
