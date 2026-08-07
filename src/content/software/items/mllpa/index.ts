import { ArticleIcon, AtomIcon, BrainIcon, CodeIcon, GithubLogoIcon, GlobeHemisphereWestIcon } from '@phosphor-icons/react';

import mllpaDescriptionImageSrc from '@/assets/images/softwares/items/mllpa/description.png';
import mllpaHeroImageSrc from '@/assets/images/softwares/items/mllpa/hero.png';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createSoftwareContent, type SoftwareResource } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'mllpa' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const projectIds = ['molecular-dynamics'] as const satisfies readonly ProjectId[];

const experienceIds = ['strasbourg-mllpa'] as const satisfies readonly ExperienceId[];

export function getMllpaContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'software',
    year: 2020,
    languages: ['Python'],
    localizedContent,
    highlightIcons: [BrainIcon, AtomIcon, ArticleIcon],
    getResources: (localized): readonly SoftwareResource[] => [
      {
        label: localized.linkLabels.github,
        href: 'https://github.com/vivien-walter/mllpa',
        icon: GithubLogoIcon,
        isExternal: true,
      },
      {
        label: localized.linkLabels.website,
        href: 'https://vivien-walter.github.io/mllpa/',
        icon: GlobeHemisphereWestIcon,
        isExternal: true,
      },
    ],
    projectIds,
    experienceIds,
    heroImageSrc: mllpaHeroImageSrc,
    descriptionImageSrc: mllpaDescriptionImageSrc,
  });
}

export type MllpaContent = ReturnType<typeof getMllpaContent>;
