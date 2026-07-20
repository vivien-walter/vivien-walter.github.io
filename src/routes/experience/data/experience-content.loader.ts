import enExperienceEntriesJson from "@/locales/en/experience/entries.json";
import enExperienceIndexJson from "@/locales/en/experience/index.json";
import enExperiencePageJson from "@/locales/en/experience/page.json";
import frExperienceEntriesJson from "@/locales/fr/experience/entries.json";
import frExperienceIndexJson from "@/locales/fr/experience/index.json";
import frExperiencePageJson from "@/locales/fr/experience/page.json";
import type {
  ContentId,
  ContentIndex,
  ContentPage,
} from "@/shared/content/content.types";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type {
  ExperienceCollection,
  ExperienceContent,
} from "./experience-content.types";

const frExperiencePage = frExperiencePageJson satisfies ContentPage;
const enExperiencePage = enExperiencePageJson satisfies ContentPage;

const frExperienceIndex = frExperienceIndexJson satisfies ContentIndex;
const enExperienceIndex = enExperienceIndexJson satisfies ContentIndex;

const frExperiences = frExperienceEntriesJson satisfies ExperienceCollection;
const enExperiences = enExperienceEntriesJson satisfies ExperienceCollection;

const localizedExperiencePages: LocalizedContent<ContentPage> = {
  fr: frExperiencePage,
  en: enExperiencePage,
};

const localizedExperienceIndexes: LocalizedContent<ContentIndex> = {
  fr: frExperienceIndex,
  en: enExperienceIndex,
};

const localizedExperienceCollections: LocalizedContent<ExperienceCollection> = {
  fr: frExperiences,
  en: enExperiences,
};

function getExperienceCollection(
  language: SupportedLanguage,
): ExperienceCollection {
  return selectLocalizedContent(localizedExperienceCollections, language);
}

function hasOwnExperience(
  experiences: ExperienceCollection,
  id: ContentId | undefined,
): id is ContentId {
  return (
    id !== undefined && Object.prototype.hasOwnProperty.call(experiences, id)
  );
}

export function getExperiencePage(language: SupportedLanguage): ContentPage {
  return selectLocalizedContent(localizedExperiencePages, language);
}

export function getExperienceIndex(language: SupportedLanguage): ContentIndex {
  return selectLocalizedContent(localizedExperienceIndexes, language);
}

export function getExperienceById(
  language: SupportedLanguage,
  id: ContentId,
): ExperienceContent | undefined {
  const experiences = getExperienceCollection(language);

  return hasOwnExperience(experiences, id) ? experiences[id] : undefined;
}