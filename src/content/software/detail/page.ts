import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import { getSoftwareById, getSoftwareCollection } from '../catalog';
import enSoftwareDetailJson from './page.en.json';
import frSoftwareDetailJson from './page.fr.json';

const localizedSoftwareDetailContent = {
  fr: frSoftwareDetailJson,
  en: enSoftwareDetailJson,
} as const;

export function getSoftwareDetailContent(language: SupportedLanguage) {
  return selectLocalizedContent(localizedSoftwareDetailContent, language);
}

export function getSoftwareDetailById(language: SupportedLanguage, softwareId: string) {
  return getSoftwareById(language, softwareId);
}

export function getSoftwareDetailNavigation(language: SupportedLanguage, softwareId: string) {
  const softwareCollection = getSoftwareCollection(language);

  const currentIndex = softwareCollection.findIndex((software) => software.id === softwareId);

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    } as const;
  }

  return {
    previous: currentIndex > 0 ? softwareCollection[currentIndex - 1] : undefined,
    next: currentIndex < softwareCollection.length - 1 ? softwareCollection[currentIndex + 1] : undefined,
  } as const;
}

export type SoftwareDetailPageContent = ReturnType<typeof getSoftwareDetailContent>;
