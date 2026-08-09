import descriptionImage from '@/assets/images/personal-activities/music.jpeg';
import { createPersonalActivityContent } from '@/content/experience/personal-activity-content';
import type { SupportedLanguage } from '@/types/localization';

import type { PersonalActivityId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'music' as const satisfies PersonalActivityId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getMusicContent(language: SupportedLanguage) {
  return createPersonalActivityContent(language, {
    id: itemId,
    localizedContent,
    imageSrc: descriptionImage,
  });
}

export type MusicContent = ReturnType<typeof getMusicContent>;
