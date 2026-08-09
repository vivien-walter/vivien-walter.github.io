import { createEducationContent } from '@/content/experience/education-content';
import type { SupportedLanguage } from '@/types/localization';

import type { EducationId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'master-2014' as const satisfies EducationId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getMaster2014Content(language: SupportedLanguage) {
  return createEducationContent(language, {
    id: itemId,
    year: '2013-2014',
    localizedContent,
  });
}

export type Master2014Content = ReturnType<typeof getMaster2014Content>;
