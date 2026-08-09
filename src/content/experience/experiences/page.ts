import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import { getExperienceById, getExperienceCollection } from '../catalog';
import enExperienceDetailJson from './page.en.json';
import frExperienceDetailJson from './page.fr.json';

const localizedExperienceDetailContent = {
  fr: frExperienceDetailJson,
  en: enExperienceDetailJson,
} as const;

export function getExperienceDetailContent(language: SupportedLanguage) {
  return selectLocalizedContent(localizedExperienceDetailContent, language);
}

export function getExperienceDetailById(language: SupportedLanguage, experienceId: string) {
  return getExperienceById(language, experienceId);
}

export function getExperienceNavigation(language: SupportedLanguage, experienceId: string) {
  const experiences = getExperienceCollection(language);

  const currentIndex = experiences.findIndex((experience) => experience.id === experienceId);

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    } as const;
  }

  return {
    previous: currentIndex > 0 ? experiences[currentIndex - 1] : undefined,
    next: currentIndex < experiences.length - 1 ? experiences[currentIndex + 1] : undefined,
  } as const;
}

export type ExperienceDetailPageContent = ReturnType<typeof getExperienceDetailContent>;
