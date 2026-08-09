import { createEducationContent } from '@/content/experience/education-content';
import type { SupportedLanguage } from '@/types/localization';

import type { EducationId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'bachelor-2011' as const satisfies EducationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getBachelor2011Content(language: SupportedLanguage) {
  return createEducationContent(language, {
    id: itemId,
    year: '2007-2011',
    localizedContent,
  });
}

export type Bachelor2011Content = ReturnType<typeof getBachelor2011Content>;
