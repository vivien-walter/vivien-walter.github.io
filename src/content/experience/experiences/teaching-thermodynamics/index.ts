import { AtomIcon, CodeIcon, GraduationCapIcon } from '@phosphor-icons/react';

import { createExperienceContent } from '@/content/experience/experience-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ExperienceId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'teaching-thermodynamics' as const satisfies ExperienceId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getTeachingThermodynamicsContent(language: SupportedLanguage) {
  return createExperienceContent(language, {
    id: itemId,
    organization: "King's College London (Department of Chemistry)",
    location: 'London, United Kingdom',
    period: {
      start: '2023-01',
      end: '2023-06',
    },
    parallelActivity: true,
    localizedContent,
    highlightIcons: [GraduationCapIcon, AtomIcon, CodeIcon],
    finalStateCompleted: true,
  });
}

export type TeachingThermodynamicsContent = ReturnType<typeof getTeachingThermodynamicsContent>;
