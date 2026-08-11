import { CodeIcon, MicroscopeIcon, TargetIcon } from '@phosphor-icons/react';

import descriptionImage from '@/assets/images/experiences/strasbourg-thesis/description.png';
import { createExperienceContent } from '@/content/experience/experience-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ExperienceId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'strasbourg-thesis' as const satisfies ExperienceId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getStrasbourgThesisContent(language: SupportedLanguage) {
  return createExperienceContent(language, {
    id: itemId,
    organization: 'Université de Strasbourg (Institut Charles Sadron)',
    location: 'Strasbourg, France',
    period: {
      start: '2014-10',
      end: '2017-09',
    },
    localizedContent,
    highlightIcons: [TargetIcon, MicroscopeIcon, CodeIcon],
    descriptionImageSrc: descriptionImage,
    finalStateCompleted: true,
  });
}

export type StrasbourgThesisContent = ReturnType<typeof getStrasbourgThesisContent>;
