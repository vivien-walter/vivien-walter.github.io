import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { EducationId } from './registry';

export type EducationLocalizedContent = {
  readonly level: string;
  readonly subject: string;
  readonly place: string;
};

export type EducationContent<TId extends EducationId = EducationId> = {
  readonly id: TId;
  readonly year: string;
  readonly level: string;
  readonly subject: string;
  readonly place: string;
};

type EducationContentDefinition<TId extends EducationId, TLocalizedContent extends EducationLocalizedContent> = {
  readonly id: TId;
  readonly year: string;
  readonly localizedContent: Readonly<Record<SupportedLanguage, TLocalizedContent>>;
};

export function createEducationContent<const TId extends EducationId, const TLocalizedContent extends EducationLocalizedContent>(
  language: SupportedLanguage,
  definition: EducationContentDefinition<TId, TLocalizedContent>,
): EducationContent<TId> {
  const localized = selectLocalizedContent(definition.localizedContent, language);

  return {
    id: definition.id,
    year: definition.year,
    level: localized.level,
    subject: localized.subject,
    place: localized.place,
  };
}
