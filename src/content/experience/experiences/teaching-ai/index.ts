import { BrainIcon, CodeIcon, TargetIcon } from '@phosphor-icons/react';

import { createExperienceContent } from '@/content/experience/experience-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ExperienceId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'teaching-ai' as const satisfies ExperienceId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getTeachingAiContent(language: SupportedLanguage) {
  return createExperienceContent(language, {
    id: itemId,
    organization: 'Université de Strasbourg (ECPM)',
    location: 'Strasbourg, France',
    period: {
      start: '2021-09',
      end: '2023-06',
    },
    parallelActivity: true,
    localizedContent,
    highlightIcons: [TargetIcon, BrainIcon, CodeIcon],
    finalStateCompleted: true,
  });
}

export type TeachingAiContent = ReturnType<typeof getTeachingAiContent>;
