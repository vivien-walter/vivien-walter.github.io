import { CodeIcon, MicroscopeIcon, TargetIcon } from '@phosphor-icons/react';

import { createExperienceContent } from '@/content/experience/experience-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ExperienceId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'consultant-microscope' as const satisfies ExperienceId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getConsultantMicroscopeContent(language: SupportedLanguage) {
  return createExperienceContent(language, {
    id: itemId,
    organization: 'Vidya Health Ltd',
    location: 'London, United Kingdom',
    period: {
      start: '2020-04',
      end: '2020-10',
    },
    parallelActivity: true,
    localizedContent,
    highlightIcons: [TargetIcon, MicroscopeIcon, CodeIcon],
    finalStateCompleted: true,
  });
}

export type ConsultantMicroscopeContent = ReturnType<typeof getConsultantMicroscopeContent>;
