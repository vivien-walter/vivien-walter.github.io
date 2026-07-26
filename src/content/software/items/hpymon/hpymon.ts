import { ArticleIcon, AtomIcon, CodeIcon } from '@phosphor-icons/react';

import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enHPyMonJson from './hpymon.en.json';
import frHPyMonJson from './hpymon.fr.json';

export const hPyMonId = 'hpymon' as const satisfies SoftwareId;

const localizedHPyMonContent = {
  fr: frHPyMonJson,
  en: enHPyMonJson,
} as const;

const year = 2025;

const languages = ['Python'] as const;

const projectIds = [] as const satisfies readonly ProjectId[];

const experienceIds = [] as const satisfies readonly ExperienceId[];

export function getHPyMonContent(language: SupportedLanguage) {
  const localized = selectLocalizedContent(localizedHPyMonContent, language);

  return {
    id: hPyMonId,
    icon: CodeIcon,
    kind: 'software',
    year,
    languages,
    eyebrow: localized.eyebrow,
    title: localized.title,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights.researchTopic,
        icon: AtomIcon,
      },
      {
        ...localized.highlights.computationalApproaches,
        icon: CodeIcon,
      },
      {
        ...localized.highlights.publications,
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

export type HPyMonContent = ReturnType<typeof getHPyMonContent>;
