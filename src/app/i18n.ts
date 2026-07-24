import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  getLanguageFromPathname,
} from "@/app/routing/navigation";
import {
  defaultLanguage,
  supportedLanguages,
} from "@/lib/content/localization";
import enCommon from "@/locales/en/common.json";
import frCommon from "@/locales/fr/common.json";
import type { SupportedLanguage } from "@/types/localization";

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  return getLanguageFromPathname(
    window.location.pathname,
  );
}

void i18n.use(initReactI18next).init({
  resources: {
    fr: {
      common: frCommon,
    },
    en: {
      common: enCommon,
    },
  },
  lng: getInitialLanguage(),
  supportedLngs: supportedLanguages,
  fallbackLng: defaultLanguage,
  defaultNS: "common",
  ns: ["common"],
  initAsync: false,
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;