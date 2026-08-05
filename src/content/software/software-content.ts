import type { Icon } from '@phosphor-icons/react';

import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from './registry';

export type SoftwareKind = 'software' | 'web-application';

export type SoftwareLocalizedHighlight = {
  readonly label: string;
  readonly value: string;
};

export type SoftwareLocalizedTechnologyItem = {
  readonly label: string;
  readonly href?: string;
  readonly description?: string;
};

export type SoftwareLocalizedTechnologyGroup = {
  readonly title: string;
  readonly items: readonly SoftwareLocalizedTechnologyItem[];
};

export type SoftwareLocalizedContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly highlights: readonly SoftwareLocalizedHighlight[];
  readonly heroImage?: {
    readonly alt: string;
  };
  readonly description: {
    readonly paragraphs: readonly string[];
    readonly image?: {
      readonly alt: string;
    };
  };
  readonly technologyGroups: readonly SoftwareLocalizedTechnologyGroup[];
  readonly disclaimer?: string;
  readonly linkLabels?: Readonly<Record<string, string>>;
};

export type SoftwareImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type SoftwareHighlight = SoftwareLocalizedHighlight & {
  readonly icon: Icon;
};

export type SoftwareResource = {
  readonly label: string;
  readonly href: string;
  readonly icon: Icon;
  readonly isExternal: boolean;
};

export type SoftwareContent<TId extends SoftwareId = SoftwareId, TKind extends SoftwareKind = SoftwareKind> = {
  readonly id: TId;
  readonly icon: Icon;
  readonly kind: TKind;
  readonly year: number;
  readonly languages: readonly string[];
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly heroImage?: SoftwareImage;
  readonly highlights: readonly SoftwareHighlight[];
  readonly description: {
    readonly paragraphs: readonly string[];
    readonly image?: SoftwareImage;
  };
  readonly disclaimer?: string;
  readonly technologyGroups: readonly SoftwareLocalizedTechnologyGroup[];
  readonly resources: readonly SoftwareResource[];
  readonly projectIds: readonly ProjectId[];
  readonly experienceIds: readonly ExperienceId[];
};

type SoftwareContentDefinition<TId extends SoftwareId, TKind extends SoftwareKind, TLocalizedContent extends SoftwareLocalizedContent> = {
  readonly id: TId;
  readonly icon: Icon;
  readonly kind: TKind;
  readonly year: number;
  readonly languages: readonly string[];
  readonly localizedContent: Readonly<Record<SupportedLanguage, TLocalizedContent>>;
  readonly highlightIcons: readonly Icon[];
  readonly heroImageSrc?: string;
  readonly descriptionImageSrc?: string;
  readonly descriptionImageObjectPosition?: string;
  readonly getResources?: (localized: TLocalizedContent) => readonly SoftwareResource[];
  readonly projectIds?: readonly ProjectId[];
  readonly experienceIds?: readonly ExperienceId[];
};

function getHighlightIcon(icons: readonly Icon[], index: number, softwareId: SoftwareId) {
  const icon = icons[index];

  if (!icon) {
    throw new Error(`Icône manquante pour le highlight ${index + 1} du logiciel "${softwareId}".`);
  }

  return icon;
}

export function createSoftwareContent<
  const TId extends SoftwareId,
  const TKind extends SoftwareKind,
  const TLocalizedContent extends SoftwareLocalizedContent,
>(language: SupportedLanguage, definition: SoftwareContentDefinition<TId, TKind, TLocalizedContent>): SoftwareContent<TId, TKind> {
  const localized = selectLocalizedContent(definition.localizedContent, language);

  if (localized.highlights.length !== definition.highlightIcons.length) {
    throw new Error(`Le logiciel "${definition.id}" doit fournir une icône pour chaque highlight.`);
  }

  const heroImage = definition.heroImageSrc
    ? {
        src: definition.heroImageSrc,
        alt:
          localized.heroImage?.alt ??
          (() => {
            throw new Error(`Texte alternatif du Hero manquant pour le logiciel "${definition.id}".`);
          })(),
      }
    : undefined;

  const descriptionImage = definition.descriptionImageSrc
    ? {
        src: definition.descriptionImageSrc,
        alt:
          localized.description.image?.alt ??
          (() => {
            throw new Error(`Texte alternatif de la Description manquant pour le logiciel "${definition.id}".`);
          })(),
        objectPosition: definition.descriptionImageObjectPosition,
      }
    : undefined;

  const disclaimer = localized.disclaimer?.trim() ? localized.disclaimer : undefined;

  return {
    id: definition.id,
    icon: definition.icon,
    kind: definition.kind,
    year: definition.year,
    languages: definition.languages,
    eyebrow: localized.eyebrow,
    title: localized.title,
    summary: localized.summary,
    ...(heroImage ? { heroImage } : {}),
    highlights: localized.highlights.map((highlight, index) => ({
      ...highlight,
      icon: getHighlightIcon(definition.highlightIcons, index, definition.id),
    })),
    description: {
      paragraphs: localized.description.paragraphs,
      ...(descriptionImage ? { image: descriptionImage } : {}),
    },
    ...(disclaimer ? { disclaimer } : {}),
    technologyGroups: localized.technologyGroups,
    resources: definition.getResources?.(localized) ?? [],
    projectIds: definition.projectIds ?? [],
    experienceIds: definition.experienceIds ?? [],
  };
}
