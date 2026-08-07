import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import { getProjectById, getProjectCollection } from '../catalog';
import enProjectDetailJson from './page.en.json';
import frProjectDetailJson from './page.fr.json';

const localizedProjectDetailContent = {
  fr: frProjectDetailJson,
  en: enProjectDetailJson,
} as const;

export function getProjectDetailContent(language: SupportedLanguage) {
  return selectLocalizedContent(localizedProjectDetailContent, language);
}

export function getProjectDetailById(language: SupportedLanguage, projectId: string) {
  return getProjectById(language, projectId);
}

export function getProjectDetailNavigation(language: SupportedLanguage, projectId: string) {
  const projects = getProjectCollection(language);

  const currentIndex = projects.findIndex((project) => project.id === projectId);

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    } as const;
  }

  return {
    previous: currentIndex > 0 ? projects[currentIndex - 1] : undefined,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined,
  } as const;
}

export type ProjectDetailPageContent = ReturnType<typeof getProjectDetailContent>;
