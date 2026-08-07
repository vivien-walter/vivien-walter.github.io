import { AtomIcon, CodeIcon, GlobeHemisphereWestIcon, MagnifyingGlassIcon, WavesIcon } from '@phosphor-icons/react';

import descriptionImage from '@/assets/images/projects/molecular-dynamics/description.png';
import heroImage from '@/assets/images/projects/molecular-dynamics/hero.png';
import type { ExperienceId } from '@/content/experience/registry';
import { createProjectContent, type ProjectResource } from '@/content/projects/project-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ProjectId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'molecular-dynamics' as const satisfies ProjectId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const experienceIds = ['strasbourg-mllpa'] as const satisfies readonly ExperienceId[];

export function getMolecularDynamicsContent(language: SupportedLanguage) {
  return createProjectContent(language, {
    id: itemId,
    period: {
      start: '2017-10',
    },
    localizedContent,
    featureIcons: [WavesIcon, MagnifyingGlassIcon, AtomIcon, CodeIcon],
    getResources: (localized): readonly ProjectResource[] => [
      {
        label: localized.linkLabels.mllpaWebsite,
        href: 'https://vivien-walter.github.io/mllpa/',
        icon: GlobeHemisphereWestIcon,
      },
    ],
    experienceIds,
    heroImageSrc: heroImage,
    overviewImageSrc: descriptionImage,
  });
}

export type MolecularDynamicsContent = ReturnType<typeof getMolecularDynamicsContent>;
