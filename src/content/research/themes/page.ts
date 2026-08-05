import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import { getResearchThemeById, getResearchThemeCollection } from './catalog';
import enResearchThemePageJson from './page.en.json';
import frResearchThemePageJson from './page.fr.json';

const localizedResearchThemePageContent = {
  fr: frResearchThemePageJson,
  en: enResearchThemePageJson,
} as const;

export function getResearchThemePageContent(language: SupportedLanguage) {
  return selectLocalizedContent(localizedResearchThemePageContent, language);
}

export function getResearchThemeDetailById(language: SupportedLanguage, themeId: string) {
  return getResearchThemeById(language, themeId);
}

export function getResearchThemeNavigation(language: SupportedLanguage, themeId: string) {
  const themes = getResearchThemeCollection(language);

  const currentIndex = themes.findIndex((theme) => theme.id === themeId);

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    } as const;
  }

  return {
    previous: currentIndex > 0 ? themes[currentIndex - 1] : undefined,
    next: currentIndex < themes.length - 1 ? themes[currentIndex + 1] : undefined,
  } as const;
}

export type ResearchThemePageContent = ReturnType<typeof getResearchThemePageContent>;
