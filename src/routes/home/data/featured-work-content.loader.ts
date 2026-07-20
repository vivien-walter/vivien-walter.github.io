import enFeaturedWorksJson from "@/locales/en/home/featured-works.json";
import frFeaturedWorksJson from "@/locales/fr/home/featured-works.json";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type { FeaturedWorksContent } from "./featured-work-content.types";

const frFeaturedWorks =
  frFeaturedWorksJson as FeaturedWorksContent;

const enFeaturedWorks =
  enFeaturedWorksJson as FeaturedWorksContent;

const localizedFeaturedWorks: LocalizedContent<FeaturedWorksContent> = {
  fr: frFeaturedWorks,
  en: enFeaturedWorks,
};

export function getFeaturedWorksContent(
  language: SupportedLanguage,
): FeaturedWorksContent {
  return selectLocalizedContent(localizedFeaturedWorks, language);
}