import { createEducationContent } from '@/content/experience/education-content';
import type { SupportedLanguage } from '@/types/localization';

import type { EducationId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'phd-2017' as const satisfies EducationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getPhd2017Content(language: SupportedLanguage) {
  return createEducationContent(language, {
    id: itemId,
    year: '2014-2017',
    localizedContent,
  });
}

export type Phd2017Content = ReturnType<typeof getPhd2017Content>;
