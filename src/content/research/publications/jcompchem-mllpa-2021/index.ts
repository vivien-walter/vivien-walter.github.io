import publicationWebsiteIconUrl from '@/assets/images/research/journals/wiley.svg?url';
import jCompChemMllpa2021DescriptionImageSrc from '@/assets/images/research/publications/jcompchem-mllpa-2021/description.jpg';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'jcompchem-mllpa-2021' as const satisfies PublicationId;

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

export function getJCompChemMllpa2021Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'MLLPA: A Machine Learning-assisted Python module to study phase-specific events in lipid membranes',
    authors,
    publication: 'Journal of Computational Chemistry',
    year: 2021,
    doi: {
      value: '10.1002/jcc.26508',
      href: 'https://doi.org/10.1002/jcc.26508',
    },
    reference:
      'Walter, V., Ruscher, C., Benzerara, O., and Thalmann, F. (2021). MLLPA: A Machine Learning-assisted Python module to study phase-specific events in lipid membranes. Journal of Computational Chemistry, 42 (13), 930-943.',
    localizedContent,
    themeIds,
    projectIds,
    experienceIds,
    website: {
      href: 'https://onlinelibrary.wiley.com/doi/10.1002/jcc.26508',
      iconSrc: publicationWebsiteIconUrl,
    },
    descriptionImageSrc: jCompChemMllpa2021DescriptionImageSrc,
  });
}

export type JCompChemMllpa2021Content = ReturnType<typeof getJCompChemMllpa2021Content>;
