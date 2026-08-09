import publicationWebsiteIconUrl from '@/assets/images/research/journals/wiley.svg?url';
import natureIScat2025DescriptionImageSrc from '@/assets/images/research/publications/jmicroscopy-iscat-2025/description.jpg';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'jmicroscopy-iscat-2025' as const satisfies PublicationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const authors = [
  {
    name: 'Vivien WALTER',
  },
  {
    name: 'Yujie GUO',
    href: 'https://orcid.org/0009-0003-8411-8400',
  },
  {
    name: 'Christopher PARPERIS',
    href: 'https://orcid.org/0009-0006-0592-3519',
  },
  {
    name: 'Mark I WALLACE',
    href: 'https://markwallace.org',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['optics-photonics'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['iscat-platform'] as const satisfies readonly ProjectId[];

const experienceIds = ['kcl-iscat'] as const satisfies readonly ExperienceId[];

export function getJMicroscopyIScat2025Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'Spatial light modulation for interferometric scattering microscopy',
    authors,
    publication: 'Journal of Microscopy',
    year: 2025,
    doi: {
      value: '10.1111/jmi.13347',
      href: 'https://doi.org/10.1111/jmi.13347',
    },
    reference:
      'Walter, V., Guo, Y., Parperis, C., and Wallace, M. I. (2023). Spatial light modulation for interferometric scattering microscopy. Journal of Microscopy, 297 (1), 88-95.',
    localizedContent,
    website: {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/jmi.13347',
      iconSrc: publicationWebsiteIconUrl,
    },
    themeIds,
    projectIds,
    experienceIds,
    descriptionImageSrc: natureIScat2025DescriptionImageSrc,
  });
}

export type JMicroscopyIScat2025Content = ReturnType<typeof getJMicroscopyIScat2025Content>;
