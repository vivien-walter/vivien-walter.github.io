import publicationWebsiteIconUrl from '@/assets/images/research/journals/nature.svg?url';
import natureCppelp2017DescriptionImageSrc from '@/assets/images/research/publications/nature-cppelp-2017/description.webp';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'nature-cppelp-2017' as const satisfies PublicationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const authors = [
  {
    name: 'Andreas WEINBERGER',
  },
  {
    name: 'Vivien WALTER',
  },
  {
    name: 'Sarah R MACEWAN',
  },
  {
    name: 'Tatiana SCHMATKO',
  },
  {
    name: 'Pierre MULLER',
  },
  {
    name: 'André P SCHRODER',
  },
  {
    name: 'Ashutosh CHILKOTI',
  },
  {
    name: 'Carlos M MARQUES',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['molecular-interfaces'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['lipid-membranes'] as const satisfies readonly ProjectId[];

const experienceIds = ['strasbourg-thesis'] as const satisfies readonly ExperienceId[];

export function getNatureCppelp2017Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'Cargo self-assembly rescues affinity of cell-penetrating peptides to lipid membranes',
    authors,
    publication: 'Scientific Reports',
    year: 2017,
    doi: {
      value: '10.1038/srep43963',
      href: 'https://doi.org/10.1038/srep43963',
    },
    reference:
      'Weinberger, A., Walter, V., MacEwan, S. R., Schmatko, T., Muller, P., Schroder, A. P., Chilkoti, A., and Marques, C. M. (2017). Cargo self-assembly rescues affinity of cell-penetrating peptides to lipid membranes. Scientific Reports, 7, 73963.',
    localizedContent,
    website: {
      href: 'https://www.nature.com/articles/srep43963',
      iconSrc: publicationWebsiteIconUrl,
    },
    themeIds,
    projectIds,
    experienceIds,
    descriptionImageSrc: natureCppelp2017DescriptionImageSrc,
  });
}

export type NatureCppelp2017Content = ReturnType<typeof getNatureCppelp2017Content>;
