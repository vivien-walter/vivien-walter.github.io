import { ArticleIcon, AtomIcon, CodeIcon } from '@phosphor-icons/react';

import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enFormaoJson from './formao.en.json';
import frFormaoJson from './formao.fr.json';

export const formaoId = 'formao' as const satisfies SoftwareId;

const localizedFormaoContent = {
  fr: frFormaoJson,
  en: enFormaoJson,
} as const;

const year = 2026;

const languages = ['TypeScript'] as const;

const projectIds = [] as const satisfies readonly ProjectId[];

const experienceIds = [] as const satisfies readonly ExperienceId[];

export function getFormaoContent(language: SupportedLanguage) {
  const localized = selectLocalizedContent(localizedFormaoContent, language);

  return {
    id: formaoId,
    icon: CodeIcon,
    kind: 'web-application',
    year,
    languages,
    eyebrow: localized.eyebrow,
    title: localized.title,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights.purpose,
        icon: AtomIcon,
      },
      {
        ...localized.highlights.features,
        icon: CodeIcon,
      },
      {
        ...localized.highlights.usage,
        icon: ArticleIcon,
      },
    ],
    description: localized.description,
    technologyGroups: localized.technologyGroups,
    resources: [],
    projectIds,
    experienceIds,
  } as const;
}

export type FormaoContent = ReturnType<typeof getFormaoContent>;
