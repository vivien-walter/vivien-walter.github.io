import publicationWebsiteIconUrl from '@/assets/images/research/journals/nature.svg?url';
import natureIScat2025DescriptionImageSrc from '@/assets/images/research/publications/nature-iscat-2025/description.webp';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'nature-iscat-2025' as const satisfies PublicationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const authors = [
  {
    name: 'Yujie GUO',
    href: 'https://orcid.org/0009-0003-8411-8400',
  },
  {
    name: 'Tianlai XIA',
  },
  {
    name: 'Vivien WALTER',
  },
  {
    name: 'Yujie XIE',
  },
  {
    name: 'Julia Y RHO',
  },
  {
    name: 'Laihui XIAO',
  },
  {
    name: "Rachel K O'REILLY",
  },
  {
    name: 'Mark I WALLACE',
    href: 'https://markwallace.org',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['optics-photonics'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['molecular-communication'] as const satisfies readonly ProjectId[];

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getNatureIScat2025Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'Real-time label-free imaging of living crystallization-driven self-assembly',
    authors,
    publication: 'Nature Communications',
    year: 2025,
    doi: {
      value: '10.1038/s41467-025-57776-9',
      href: 'https://doi.org/10.1038/s41467-025-57776-9',
    },
    reference:
      "Guo, Y., Xia, T., Walter, V., Xie, Y., Rho, J. Y., Xiao, L., O'Reilly, R. K., and Wallace, M. I. (2023). Real-time label-free imaging of living crystallization-driven self-assembly. Nature Communications, 16, 2672.",
    localizedContent,
    website: {
      href: 'https://www.nature.com/articles/s41467-025-57776-9',
      iconSrc: publicationWebsiteIconUrl,
    },
    themeIds,
    projectIds,
    experienceIds,
    descriptionImageSrc: natureIScat2025DescriptionImageSrc,
  });
}

export type NatureIScat2025Content = ReturnType<typeof getNatureIScat2025Content>;
