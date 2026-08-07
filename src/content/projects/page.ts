import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import enProjectsPageJson from './page.en.json';
import frProjectsPageJson from './page.fr.json';

const localizedProjectsPageContent = {
  fr: frProjectsPageJson,
  en: enProjectsPageJson,
} as const;

export function getProjectsPage(language: SupportedLanguage) {
  return selectLocalizedContent(localizedProjectsPageContent, language);
}

export type ProjectsPageContent = ReturnType<typeof getProjectsPage>;
