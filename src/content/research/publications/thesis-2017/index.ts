import thesis2017DescriptionImageSrc from '@/assets/images/research/publications/thesis-2017/description.png';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'thesis-2017' as const satisfies PublicationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const authors = [
  {
    name: 'Vivien WALTER',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['molecular-interfaces'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['molecular-communication'] as const satisfies readonly ProjectId[];

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getThesis2017Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'thesis',
    title: 'Lipid membrane interaction with self-assembling cell-penetrating peptides',
    authors,
    year: 2017,
    doi: {
      value: '10.70675/8b873141z2171z4c98zb0d4z9bf0de62506b',
      href: 'https://doi.org/10.70675/8b873141z2171z4c98zb0d4z9bf0de62506b',
    },
    reference: 'Walter, V. (2017). Lipid membrane interaction with self-assembling cell-penetrating peptides.',
    localizedContent,
    themeIds,
    projectIds,
    experienceIds,
    descriptionImageSrc: thesis2017DescriptionImageSrc,
  });
}

export type Thesis2017Content = ReturnType<typeof getThesis2017Content>;
