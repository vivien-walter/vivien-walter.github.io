import { ArticleIcon, AtomIcon, CodeIcon, MicroscopeIcon } from '@phosphor-icons/react';

import type { ProjectId } from '@/content/projects/registry';
import type { PublicationId } from '@/content/research/publications/registry';
import type { SoftwareId } from '@/content/software/registry';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { ParallelActivityId } from '../../registry';
import enScientificResearchJson from './scientific-research.en.json';
import frScientificResearchJson from './scientific-research.fr.json';

export const scientificResearchId = 'scientific-research' as const satisfies ParallelActivityId;

const localizedScientificResearchContent = {
  fr: frScientificResearchJson,
  en: enScientificResearchJson,
} as const;

const projectIds = ['molecular-dynamics'] as const satisfies readonly ProjectId[];

const softwareIds = ['mllpa'] as const satisfies readonly SoftwareId[];

const publicationIds = [
  // "pccp-2020",
  // "jcc-mllpa-2021",
  // "bba-2021",
] as const satisfies readonly PublicationId[];

export function getScientificResearchContent(language: SupportedLanguage) {
  const localized = selectLocalizedContent(localizedScientificResearchContent, language);

  return {
    id: scientificResearchId,
    icon: MicroscopeIcon,
    title: localized.title,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights.activity,
        icon: AtomIcon,
      },
      {
        ...localized.highlights.relatedSoftware,
        icon: CodeIcon,
      },
      {
        ...localized.highlights.researchTopics,
        icon: ArticleIcon,
      },
    ],
    description: localized.description,
    directContributions: localized.directContributions,
    technologyGroups: localized.technologyGroups,
    projectIds,
    softwareIds,
    publicationIds,
  } as const;
}

export type ScientificResearchContent = ReturnType<typeof getScientificResearchContent>;
