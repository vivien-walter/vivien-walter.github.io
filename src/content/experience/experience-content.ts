import type { Icon } from '@phosphor-icons/react';

import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { ExperienceId } from './registry';

export type ExperiencePeriod = {
  readonly start: string;
  readonly end?: string;
};

export type ExperienceLocalizedHighlight = {
  readonly label: string;
  readonly value: string;
};

export type ExperienceLocalizedDescription = {
  readonly paragraphs: readonly string[];
  readonly image?: {
    readonly alt: string;
  };
};

export type ExperienceDirectContribution = {
  readonly label: string;
  readonly text: string;
};

export type ExperienceTechnologyItem = {
  readonly label: string;
  readonly href?: string;
  readonly description?: string;
};

export type ExperienceTechnologyGroup = {
  readonly title: string;
  readonly items: readonly ExperienceTechnologyItem[];
};

export type ExperienceFinalState = {
  readonly title: string;
  readonly text: string;
  readonly completed: boolean;
};

export type ExperienceLocalizedContent = {
  readonly role: string;
  readonly breadcrumbLabel?: string;
  readonly eyebrow?: string;
  readonly summary: string;
  readonly highlights: readonly ExperienceLocalizedHighlight[];
  readonly heroImage?: {
    readonly alt: string;
  };
  readonly description: ExperienceLocalizedDescription;
  readonly directContributions: readonly ExperienceDirectContribution[];
  readonly technologyGroups: readonly ExperienceTechnologyGroup[];
  readonly finalState?: {
    readonly title: string;
    readonly text: string;
  };
  readonly linkLabels?: Readonly<Record<string, string>>;
};

export type ExperienceImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type ExperienceHighlight = ExperienceLocalizedHighlight & {
  readonly icon: Icon;
};

export type ExperienceResource = {
  readonly label: string;
  readonly href: string;
  readonly icon: Icon;
  readonly isExternal: boolean;
};

export type ExperienceContent<TId extends ExperienceId = ExperienceId> = {
  readonly id: TId;
  readonly organization: string;
  readonly location?: string;
  readonly period: ExperiencePeriod;
  readonly parallelActivity: boolean;
  readonly role: string;
  readonly breadcrumbLabel: string;
  readonly eyebrow?: string;
  readonly summary: string;
  readonly heroImage?: ExperienceImage;
  readonly highlights: readonly ExperienceHighlight[];
  readonly description: {
    readonly paragraphs: readonly string[];
    readonly image?: ExperienceImage;
  };
  readonly directContributions: readonly ExperienceDirectContribution[];
  readonly technologyGroups: readonly ExperienceTechnologyGroup[];
  readonly resources: readonly ExperienceResource[];
  readonly finalState?: ExperienceFinalState;
};

type ExperienceContentDefinition<TId extends ExperienceId, TLocalizedContent extends ExperienceLocalizedContent> = {
  readonly id: TId;
  readonly organization: string;
  readonly location?: string;
  readonly period: ExperiencePeriod;
  readonly parallelActivity?: boolean;
  readonly localizedContent: Readonly<Record<SupportedLanguage, TLocalizedContent>>;
  readonly highlightIcons: readonly Icon[];
  readonly heroImageSrc?: string;
  readonly heroImageObjectPosition?: string;
  readonly descriptionImageSrc?: string;
  readonly descriptionImageObjectPosition?: string;
  readonly finalStateCompleted?: boolean;
  readonly getResources?: (localized: TLocalizedContent) => readonly ExperienceResource[];
};

function getHighlightIcon(icons: readonly Icon[], index: number, experienceId: ExperienceId): Icon {
  const icon = icons[index];

  if (!icon) {
    throw new Error(`Icône manquante pour le highlight ${index + 1} de l’expérience "${experienceId}".`);
  }

  return icon;
}

export function createExperienceContent<const TId extends ExperienceId, const TLocalizedContent extends ExperienceLocalizedContent>(
  language: SupportedLanguage,
  definition: ExperienceContentDefinition<TId, TLocalizedContent>,
): ExperienceContent<TId> {
  const localized = selectLocalizedContent(definition.localizedContent, language);

  if (localized.highlights.length !== definition.highlightIcons.length) {
    throw new Error(`L’expérience "${definition.id}" doit fournir une icône pour chaque highlight.`);
  }

  const breadcrumbLabel = localized.breadcrumbLabel?.trim() ? localized.breadcrumbLabel : localized.role;

  const heroImage = definition.heroImageSrc
    ? {
        src: definition.heroImageSrc,
        alt:
          localized.heroImage?.alt ??
          (() => {
            throw new Error(`Texte alternatif du Hero manquant pour l’expérience "${definition.id}".`);
          })(),
        objectPosition: definition.heroImageObjectPosition,
      }
    : undefined;

  const descriptionImage = definition.descriptionImageSrc
    ? {
        src: definition.descriptionImageSrc,
        alt:
          localized.description.image?.alt ??
          (() => {
            throw new Error(`Texte alternatif de la description manquant pour l’expérience "${definition.id}".`);
          })(),
        objectPosition: definition.descriptionImageObjectPosition,
      }
    : undefined;

  return {
    id: definition.id,
    organization: definition.organization,
    ...(definition.location?.trim()
      ? {
          location: definition.location,
        }
      : {}),
    period: definition.period,
    parallelActivity: definition.parallelActivity ?? false,
    role: localized.role,
    breadcrumbLabel,
    ...(localized.eyebrow?.trim()
      ? {
          eyebrow: localized.eyebrow,
        }
      : {}),
    summary: localized.summary,
    ...(heroImage
      ? {
          heroImage,
        }
      : {}),
    highlights: localized.highlights.map((highlight, index) => ({
      ...highlight,
      icon: getHighlightIcon(definition.highlightIcons, index, definition.id),
    })),
    description: {
      paragraphs: localized.description.paragraphs,
      ...(descriptionImage
        ? {
            image: descriptionImage,
          }
        : {}),
    },
    directContributions: localized.directContributions,
    technologyGroups: localized.technologyGroups,
    resources: definition.getResources?.(localized) ?? [],
    ...(localized.finalState
      ? {
          finalState: {
            ...localized.finalState,
            completed:
              definition.finalStateCompleted ??
              (() => {
                throw new Error(`Statut final manquant pour l’expérience "${definition.id}".`);
              })(),
          },
        }
      : {}),
  };
}
