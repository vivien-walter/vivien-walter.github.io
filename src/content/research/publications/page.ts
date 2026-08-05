import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import { getPublicationById, getPublicationCollection } from './catalog';
import enResearchPublicationPageJson from './page.en.json';
import frResearchPublicationPageJson from './page.fr.json';

const localizedResearchPublicationPageContent = {
  fr: frResearchPublicationPageJson,
  en: enResearchPublicationPageJson,
} as const;

export function getResearchPublicationPageContent(language: SupportedLanguage) {
  return selectLocalizedContent(localizedResearchPublicationPageContent, language);
}

export function getResearchPublicationDetailById(language: SupportedLanguage, publicationId: string) {
  return getPublicationById(language, publicationId);
}

export function getResearchPublicationNavigation(language: SupportedLanguage, publicationId: string) {
  const publications = getPublicationCollection(language);

  const currentIndex = publications.findIndex((publication) => publication.id === publicationId);

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    } as const;
  }

  return {
    previous: currentIndex > 0 ? publications[currentIndex - 1] : undefined,
    next: currentIndex < publications.length - 1 ? publications[currentIndex + 1] : undefined,
  } as const;
}

export type ResearchPublicationPageContent = ReturnType<typeof getResearchPublicationPageContent>;
