import { CodeIcon, GlobeHemisphereWestIcon, TargetIcon, UsersThreeIcon } from '@phosphor-icons/react';

import descriptionImage from '@/assets/images/experiences/strasbourg-mllpa/description.png';
import { createExperienceContent, type ExperienceResource } from '@/content/experience/experience-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ExperienceId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'strasbourg-mllpa' as const satisfies ExperienceId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getStrasbourgMllpaContent(language: SupportedLanguage) {
  return createExperienceContent(language, {
    id: itemId,
    organization: 'Université de Strasbourg (Institut Charles Sadron)',
    location: 'Strasbourg, France',
    period: {
      start: '2017-10',
      end: '2018-03',
    },
    localizedContent,
    highlightIcons: [TargetIcon, CodeIcon, UsersThreeIcon],
    getResources: (localized): readonly ExperienceResource[] => [
      {
        label: localized.linkLabels.mllpaWebsite,
        href: 'https://vivien-walter.github.io/mllpa/',
        icon: GlobeHemisphereWestIcon,
        isExternal: true,
      },
    ],
    descriptionImageSrc: descriptionImage,
    finalStateCompleted: true,
  });
}

export type StrasbourgMllpaContent = ReturnType<typeof getStrasbourgMllpaContent>;
