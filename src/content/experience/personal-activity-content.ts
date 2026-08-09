import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { PersonalActivityId } from './registry';

export type PersonalActivityLocalizedContent = {
  readonly title: string;
  readonly description: string;
  readonly image?: {
    readonly alt: string;
  };
};

export type PersonalActivityContent<TId extends PersonalActivityId = PersonalActivityId> = {
  readonly id: TId;
  readonly title: string;
  readonly description: string;
  readonly image?: {
    readonly src: string;
    readonly alt: string;
  };
};

type PersonalActivityContentDefinition<TId extends PersonalActivityId, TLocalizedContent extends PersonalActivityLocalizedContent> = {
  readonly id: TId;
  readonly localizedContent: Readonly<Record<SupportedLanguage, TLocalizedContent>>;
  readonly imageSrc?: string;
};

export function createPersonalActivityContent<const TId extends PersonalActivityId, const TLocalizedContent extends PersonalActivityLocalizedContent>(
  language: SupportedLanguage,
  definition: PersonalActivityContentDefinition<TId, TLocalizedContent>,
): PersonalActivityContent<TId> {
  const localized = selectLocalizedContent(definition.localizedContent, language);

  return {
    id: definition.id,
    title: localized.title,
    description: localized.description,
    ...(definition.imageSrc
      ? {
          image: {
            src: definition.imageSrc,
            alt:
              localized.image?.alt ??
              (() => {
                throw new Error(`Texte alternatif de l’image manquant pour l’activité personnelle "${definition.id}".`);
              })(),
          },
        }
      : {}),
  };
}
