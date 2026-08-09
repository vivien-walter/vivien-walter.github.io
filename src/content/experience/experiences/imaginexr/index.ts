import { CurrencyEurIcon, TargetIcon, UsersThreeIcon } from '@phosphor-icons/react';

import descriptionImage from '@/assets/images/experiences/imaginexr/description.png';
import { createExperienceContent } from '@/content/experience/experience-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ExperienceId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'imaginexr' as const satisfies ExperienceId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getImaginexrContent(language: SupportedLanguage) {
  return createExperienceContent(language, {
    id: itemId,
    organization: 'i-magineXR',
    location: 'La Roche-sur-Yon, France',
    period: {
      start: '2024-01-03',
      end: '2026-08-17',
    },
    localizedContent,
    highlightIcons: [TargetIcon, CurrencyEurIcon, UsersThreeIcon],
    descriptionImageSrc: descriptionImage,
    finalStateCompleted: false,
  });
}

export type ImaginexrContent = ReturnType<typeof getImaginexrContent>;
