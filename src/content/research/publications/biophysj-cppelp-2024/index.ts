import publicationWebsiteIconUrl from '@/assets/images/research/journals/cell-press.png?url';
import biophysJCppelp2024DescriptionImageSrc from '@/assets/images/research/publications/biophysj-cppelp-2024/description.jpg';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'biophysj-cppelp-2024' as const satisfies PublicationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const authors = [
  {
    name: 'Vivien WALTER',
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
    name: 'Sarah R MACEWAN',
  },
  {
    name: 'Ashutosh CHILKOTI',
  },
  {
    name: 'Carlos M MARQUES',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['molecular-communication'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['molecular-communication'] as const satisfies readonly ProjectId[];

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getBiophysJCppelp2024Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'Negative lipid membranes enhance the adsorption of TAT-decorated elastin-like polypeptide micelles',
    authors,
    publication: 'Biophysical Journal',
    year: 2024,
    doi: {
      value: '10.1016/j.bpj.2024.03.001',
      href: 'https://doi.org/10.1016/j.bpj.2024.03.001',
    },
    reference:
      'Walter, V., Schmatko, T., Muller, P., Schroder, A. P., MacEwan, S. R., Chilkoti, A., and Marques, C. M. (2024). Negative lipid membranes enhance the adsorption of TAT-decorated elastin-like polypeptide micelles. Biophysical Journal, 123, 901-908.',
    localizedContent,
    website: {
      href: 'https://www.cell.com/biophysj/fulltext/S0006-3495(24)00166-8',
      iconSrc: publicationWebsiteIconUrl,
    },
    themeIds,
    projectIds,
    experienceIds,
    descriptionImageSrc: biophysJCppelp2024DescriptionImageSrc,
  });
}

export type BiophysJCppelp2024Content = ReturnType<typeof getBiophysJCppelp2024Content>;
