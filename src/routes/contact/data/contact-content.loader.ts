import frContactContentJson from "@/locales/fr/contact/page.json";
import enContactContentJson from "@/locales/en/contact/page.json";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type { ContactContent } from "./contact-content.types";

const frContactContent = frContactContentJson satisfies ContactContent;
const enContactContent = enContactContentJson satisfies ContactContent;

const localizedContactContent = {
  fr: frContactContent,
  en: enContactContent,
} satisfies LocalizedContent<ContactContent>;

export function getContactContent(language: SupportedLanguage): ContactContent {
  return selectLocalizedContent(localizedContactContent, language);
}