import { CurrencyGbpIcon, MicroscopeIcon, UsersThreeIcon } from '@phosphor-icons/react';

import descriptionImage from '@/assets/images/experiences/kcl-iscat/description.png';
import { createExperienceContent } from '@/content/experience/experience-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ExperienceId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'kcl-iscat' as const satisfies ExperienceId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getKclIscatContent(language: SupportedLanguage) {
  return createExperienceContent(language, {
    id: itemId,
    organization: 'King’s College London (Department of Chemistry)',
    location: 'London, United Kingdom',
    period: {
      start: '2018-04',
      end: '2021-03',
    },
    localizedContent,
    highlightIcons: [MicroscopeIcon, CurrencyGbpIcon, UsersThreeIcon],
    descriptionImageSrc: descriptionImage,
    finalStateCompleted: true,
  });
}

export type KclIscatContent = ReturnType<typeof getKclIscatContent>;
