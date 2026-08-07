import { AtomIcon, CodeIcon, FlaskIcon, MagnifyingGlassIcon, TargetIcon, YoutubeLogoIcon } from '@phosphor-icons/react';

import molecularCommunicationDescriptionImage from '@/assets/images/projects/molecular-communication/description.png';
import molecularCommunicationHeroImage from '@/assets/images/projects/molecular-communication/hero.png';
import type { ExperienceId } from '@/content/experience/registry';
import { createProjectContent, type ProjectResource } from '@/content/projects/project-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ProjectId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'molecular-communication' as const satisfies ProjectId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getMolecularCommunicationContent(language: SupportedLanguage) {
  return createProjectContent(language, {
    id: itemId,
    period: {
      start: '2021-03',
      end: '2023-08',
    },
    localizedContent,
    featureIcons: [FlaskIcon, AtomIcon, MagnifyingGlassIcon, AtomIcon, CodeIcon, TargetIcon],
    getResources: (localized): readonly ProjectResource[] => [
      {
        label: localized.linkLabels.molecularCommunicationPresentation,
        href: 'https://www.youtube.com/watch?v=rzgGDwzSxzg',
        icon: YoutubeLogoIcon,
      },
    ],
    heroImageSrc: molecularCommunicationHeroImage,
    overviewImageSrc: molecularCommunicationDescriptionImage,
    experienceIds,
  });
}

export type MolecularCommunicationContent = ReturnType<typeof getMolecularCommunicationContent>;
