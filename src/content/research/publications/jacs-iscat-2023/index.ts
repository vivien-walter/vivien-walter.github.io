import publicationWebsiteIconUrl from '@/assets/images/research/journals/jacs.svg?url';
import jacsIScat2023DescriptionImageSrc from '@/assets/images/research/publications/jacs-iscat-2023/description.png';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'jacs-iscat-2023' as const satisfies PublicationId;

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
    name: 'Vivien WALTER',
  },
  {
    name: 'Steven VANUYTSEL',
  },
  {
    name: 'Christopher PARPERIS',
    href: 'https://orcid.org/0009-0006-0592-3519',
  },
  {
    name: 'Jason T SENGEL',
  },
  {
    name: 'Eve E WEATHERILL',
  },
  {
    name: 'Mark I WALLACE',
    href: 'https://markwallace.org',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['optics-photonics'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['molecular-communication'] as const satisfies readonly ProjectId[];

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getjacsIScat2023Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'Real-Time Monitoring and Control of Nanoparticle Formation',
    authors,
    publication: 'Journal of the American Chemical Society',
    year: 2023,
    doi: {
      value: '10.1021/jacs.3c02484',
      href: 'https://doi.org/10.1021/jacs.3c02484',
    },
    reference:
      'Guo, Y., Walter, V., Vanuytsel, S., Parperis, C., Sengel, J. T., Weatherill, E. E., and Wallace, M. I. (2023). Real-Time Monitoring and Control of Nanoparticle Formation. JACS, 145 (29), 15809-15815.',
    localizedContent,
    website: {
      href: 'https://pubs.acs.org/jacsat/article/145/29/15809/1694936/Real-Time-Monitoring-and-Control-of-Nanoparticle',
      iconSrc: publicationWebsiteIconUrl,
    },
    themeIds,
    projectIds,
    experienceIds,
    descriptionImageSrc: jacsIScat2023DescriptionImageSrc,
  });
}

export type jacsIScat2023Content = ReturnType<typeof getjacsIScat2023Content>;
