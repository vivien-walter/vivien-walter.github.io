import enResearchAxesJson from "@/locales/en/home/research-axes.json";
import frResearchAxesJson from "@/locales/fr/home/research-axes.json";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type { ResearchAxesContent } from "./research-axis-content.types";

const frResearchAxes =
  frResearchAxesJson as ResearchAxesContent;

const enResearchAxes =
  enResearchAxesJson as ResearchAxesContent;

const localizedResearchAxes: LocalizedContent<ResearchAxesContent> = {
  fr: frResearchAxes,
  en: enResearchAxes,
};

export function getResearchAxesContent(
  language: SupportedLanguage,
): ResearchAxesContent {
  return selectLocalizedContent(localizedResearchAxes, language);
}