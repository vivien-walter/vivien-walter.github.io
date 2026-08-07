import publicationWebsiteIconUrl from '@/assets/images/research/journals/langmuir.svg?url';
import langmuirDragonfly2019DescriptionImageSrc from '@/assets/images/research/publications/langmuir-dragonfly-2019/description.png';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'langmuir-dragonfly-2019' as const satisfies PublicationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const authors = [
  {
    name: 'Samuel CHEESEMAN',
  },
  {
    name: 'Vi Khanh TRUONG',
  },
  {
    name: 'Vivien WALTER',
  },
  {
    name: 'Fabrice THALMANN',
    href: 'https://ics-mcube.cnrs.fr/spip.php?article61',
  },
  {
    name: 'Carlos M MARQUES',
  },
  {
    name: 'Eric HANSSEN',
  },
  {
    name: 'Jitraporn VONGSVIVUT',
  },
  {
    name: 'Mark J TOBIN',
  },
  {
    name: 'Vladimir A BAULIN',
  },
  {
    name: 'Saulius JUODKAZIS',
  },
  {
    name: 'Shane MACLAUGHLIN',
  },
  {
    name: 'Gary BRYANT',
  },
  {
    name: 'Russel J CRAWFORD',
  },
  {
    name: 'Elena P IVANOVA',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['molecular-interfaces'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['lipid-membranes'] as const satisfies readonly ProjectId[];

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getLangmuirDragonfly2019Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'Interaction of Giant Unilamellar Vesicles with the Surface Nanostructures on Dragonfly Wings',
    authors,
    publication: 'Langmuir',
    year: 2019,
    doi: {
      value: '10.1021/acs.langmuir.8b03470',
      href: 'https://doi.org/10.1021/acs.langmuir.8b03470',
    },
    reference:
      'Cheeseman, S., et al. (2019). Interaction of Giant Unilamellar Vesicles with the Surface Nanostructures on Dragonfly Wings. Langmuir, 35 (6), 2422-2430.',
    localizedContent,
    website: {
      href: 'https://pubs.acs.org/langd5/article-abstract/35/6/2422/617020/Interaction-of-Giant-Unilamellar-Vesicles-with-the',
      iconSrc: publicationWebsiteIconUrl,
    },
    themeIds,
    projectIds,
    experienceIds,
    descriptionImageSrc: langmuirDragonfly2019DescriptionImageSrc,
  });
}

export type LangmuirDragonfly2019Content = ReturnType<typeof getLangmuirDragonfly2019Content>;
