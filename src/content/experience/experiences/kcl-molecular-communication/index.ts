import { CurrencyGbpIcon, FlaskIcon, UsersThreeIcon } from '@phosphor-icons/react';

import descriptionImage from '@/assets/images/experiences/kcl-molecular-communication/description.png';
import { createExperienceContent } from '@/content/experience/experience-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ExperienceId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'kcl-molecular-communication' as const satisfies ExperienceId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getKclMolecularCommunicationContent(language: SupportedLanguage) {
  return createExperienceContent(language, {
    id: itemId,
    organization: 'King’s College London (Department of Engineering)',
    location: 'London, United Kingdom',
    period: {
      start: '2021-03',
      end: '2023-08',
    },
    localizedContent,
    highlightIcons: [FlaskIcon, CurrencyGbpIcon, UsersThreeIcon],
    descriptionImageSrc: descriptionImage,
    finalStateCompleted: true,
  });
}

export type KclMolecularCommunicationContent = ReturnType<typeof getKclMolecularCommunicationContent>;
