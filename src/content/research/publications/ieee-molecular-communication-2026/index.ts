import publicationWebsiteIconUrl from '@/assets/images/research/journals/ieee.svg?url';
import ieeeMolecularCommunication2026DescriptionImageSrc from '@/assets/images/research/publications/ieee-molecular-communication-2026/description.png';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createPublicationContent, type PublicationAuthor } from '@/content/research/publication-content';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from '../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'ieee-molecular-communication-2026' as const satisfies PublicationId;

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
    name: 'Daniel L RUIZ BLANCO',
  },
  {
    name: 'Yansha DENG',
    href: 'https://www.yanshadeng.org',
  },
] as const satisfies readonly PublicationAuthor[];

const themeIds = ['molecular-communication', 'artificial-intelligence'] as const satisfies readonly ResearchThemeId[];

const projectIds = ['molecular-communication'] as const satisfies readonly ProjectId[];

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getIeeeMolecularCommunication2026Content(language: SupportedLanguage) {
  return createPublicationContent(language, {
    id: itemId,
    kind: 'article',
    title: 'CNN-Based Detection of Mixed-Molecule Concentrations in Molecular Communication',
    authors,
    publication: 'IEEE Transactions on Molecular, Biological, and Multi-Scale Communications',
    year: 2026,
    doi: {
      value: '10.1109/TMBMC.2026.3677602',
      href: 'https://doi.org/10.1109/TMBMC.2026.3677602',
    },
    reference:
      'Walter, V., Bi, D., Ruiz Blanco, D. L., and Deng, Y. (2023). CNN-Based Detection of Mixed-Molecule Concentrations in Molecular Communication. IEEE Transactions on Molecular, Biological, and Multi-Scale Communications, 12, 434-445.',
    localizedContent,
    website: {
      href: 'https://ieeexplore.ieee.org/document/11456236',
      iconSrc: publicationWebsiteIconUrl,
    },
    themeIds,
    projectIds,
    experienceIds,
    descriptionImageSrc: ieeeMolecularCommunication2026DescriptionImageSrc,
  });
}

export type IeeeMolecularCommunication2026Content = ReturnType<typeof getIeeeMolecularCommunication2026Content>;
