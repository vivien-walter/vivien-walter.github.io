import publicationWebsiteIconUrl from '@/assets/images/research/journals/bba.png?url';
import bbaRipplePhase2021DescriptionImageSrc from '@/assets/images/research/publications/bba-ripple-phase-2021/description.jpg';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'bba-ripple-phase-2021' as const satisfies PublicationId;

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
    name: 'Adrien GOLA',
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

const themeIds = ['molecular-interfaces', 'artificial-intelligence'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['molecular-dynamics'] as const satisfies readonly ProjectId[];

const experienceIds = ['strasbourg-mllpa'] as const satisfies readonly ExperienceId[];

export function getBbaRipplePhase2021Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'Ripple-like instability in the simulated gel phase of finite size phosphocholine bilayers',
    authors,
    publication: 'Biochimica et Biophysica Acta - Biomembranes',
    year: 2021,
    doi: {
      value: '10.1016/j.bbamem.2021.183714',
      href: 'https://doi.org/10.1016/j.bbamem.2021.183714',
    },
    reference:
      'Walter, V., Ruscher, C., Gola, A., Marques, C. M., Benzerara, O., and Thalmann, F. (2021). Ripple-like instability in the simulated gel phase of finite size phosphocholine bilayers. BBA - Biomembranes, 1863 (11), 183714.',
    localizedContent,
    themeIds,
    projectIds,
    experienceIds,
    website: {
      href: 'https://www.sciencedirect.com/science/article/pii/S0005273621001620?via%3Dihub#d1e251',
      iconSrc: publicationWebsiteIconUrl,
    },
    descriptionImageSrc: bbaRipplePhase2021DescriptionImageSrc,
  });
}

export type BbaRipplePhase2021Content = ReturnType<typeof getBbaRipplePhase2021Content>;
