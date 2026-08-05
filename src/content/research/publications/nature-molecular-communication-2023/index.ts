import publicationWebsiteIconUrl from '@/assets/images/research/journals/nature.svg?url';
import natureMolecularCommunication2023DescriptionImageSrc from '@/assets/images/research/publications/nature-molecular-communication-2023/description.webp';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'nature-molecular-communication-2023' as const satisfies PublicationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const authors = [
  {
    name: 'Vivien WALTER',
  },
  {
    name: 'Dadi BI',
    href: 'https://orcid.org/0000-0002-4743-3685',
  },
  {
    name: 'Ali SALEHI-REYHANI',
  },
  {
    name: 'Yansha DENG',
    href: 'https://www.yanshadeng.org',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['molecular-communication'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['molecular-communication'] as const satisfies readonly ProjectId[];

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getNatureMolecularCommunication2023Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'Real-time signal processing via chemical reactions for a microfluidic molecular communication system',
    authors,
    publication: 'Nature Communications',
    year: 2023,
    doi: {
      value: '10.1038/s41467-023-42885-0',
      href: 'https://doi.org/10.1038/s41467-023-42885-0',
    },
    reference:
      'Walter, V., Bi, D., Salehi-Reyhani, A., and Deng, Y. (2023). Real-time signal processing via chemical reactions for a microfluidic molecular communication system. Nature Communications, 14, 7188.',
    localizedContent,
    website: {
      href: 'https://www.nature.com/articles/s41467-023-42885-0',
      iconSrc: publicationWebsiteIconUrl,
    },
    themeIds,
    projectIds,
    experienceIds,
    descriptionImageSrc: natureMolecularCommunication2023DescriptionImageSrc,
  });
}

export type NatureMolecularCommunication2023Content = ReturnType<typeof getNatureMolecularCommunication2023Content>;
