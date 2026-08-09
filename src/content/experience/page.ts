import { CodeIcon, type Icon, MicroscopeIcon, TargetIcon } from '@phosphor-icons/react';

import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import enExperiencePageJson from './page.en.json';
import frExperiencePageJson from './page.fr.json';

export const experienceExpertiseOrder = ['project-leadership', 'software-ai', 'instrumentation', 'collaboration'] as const;

export type ExperienceExpertiseId = (typeof experienceExpertiseOrder)[number];

export type ExperienceExpertise = {
  readonly id: ExperienceExpertiseId;
  readonly icon: Icon;
  readonly title: string;
  readonly description: string;
};

const localizedExperiencePageContent = {
  fr: frExperiencePageJson,
  en: enExperiencePageJson,
} as const;

export function getExperiencePage(language: SupportedLanguage) {
  const localized = selectLocalizedContent(localizedExperiencePageContent, language);

  return {
    ...localized,
    expertise: [
      {
        id: 'project-leadership',
        icon: TargetIcon,
        ...localized.expertise.projectLeadership,
      },
      {
        id: 'software-ai',
        icon: CodeIcon,
        ...localized.expertise.softwareAi,
      },
      {
        id: 'instrumentation',
        icon: MicroscopeIcon,
        ...localized.expertise.instrumentation,
      },
    ] satisfies readonly ExperienceExpertise[],
  } as const;
}

export type ExperiencePageContent = ReturnType<typeof getExperiencePage>;
