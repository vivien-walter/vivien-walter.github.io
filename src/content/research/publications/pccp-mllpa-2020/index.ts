import publicationWebsiteIconUrl from '@/assets/images/research/journals/pccp.jpg?url';
import pccpMllpa2020DescriptionImageSrc from '@/assets/images/research/publications/pccp-mllpa-2020/description.png';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'pccp-mllpa-2020' as const satisfies PublicationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const authors = [
  {
    name: 'Vivien WALTER',
  },
  {
    name: 'Céline RUSCHER',
  },
  {
    name: 'Carlos M. MARQUES',
  },
  {
    name: 'Olivier BENZERARA',
  },
  {
    name: 'Fabrice THALMANN',
    href: 'https://ics-mcube.cnrs.fr/spip.php?article61',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['molecular-communication'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['molecular-communication'] as const satisfies readonly ProjectId[];

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getPccpMllpa2020Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'A machine learning study of the two states model for lipid bilayer phase transitions',
    authors,
    publication: 'Physical Chemistry Chemical Physics',
    year: 2020,
    doi: {
      value: '10.1039/d0cp02058c',
      href: 'https://doi.org/10.1039/d0cp02058c',
    },
    reference:
      'Walter, V., Ruscher, C., Marques, C. M., Benzerara, O., and Thalmann, F. (2020). A machine learning study of the two states model for lipid bilayer phase transitions. PCCP, 22 (34), 19147-19154.',
    localizedContent,
    themeIds,
    projectIds,
    experienceIds,
    website: {
      href: 'https://pubs.rsc.org/cp/article-abstract/22/34/19147/679705/A-machine-learning-study-of-the-two-states-model?redirectedFrom=fulltext',
      iconSrc: publicationWebsiteIconUrl,
    },
    descriptionImageSrc: pccpMllpa2020DescriptionImageSrc,
  });
}

export type PccpMllpa2020Content = ReturnType<typeof getPccpMllpa2020Content>;
