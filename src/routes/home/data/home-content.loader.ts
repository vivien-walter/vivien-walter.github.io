import frHomeContentJson from "@/locales/fr/home/page.json";
import enHomeContentJson from "@/locales/en/home/page.json";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type { HomeContent } from "./home-content.types";

const frHomeContent = frHomeContentJson satisfies HomeContent;
const enHomeContent = enHomeContentJson satisfies HomeContent;

const localizedHomeContent = {
  fr: frHomeContent,
  en: enHomeContent,
} satisfies LocalizedContent<HomeContent>;

export function getHomeContent(language: SupportedLanguage): HomeContent {
  return selectLocalizedContent(localizedHomeContent, language);
}