import type { Icon } from '@phosphor-icons/react';

import type { ExperienceId } from '@/content/experience/registry';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { ProjectId } from './registry';

export type ProjectPeriod = {
  readonly start: string;
  readonly end?: string;
};

export type ProjectLocalizedFact = {
  readonly label: string;
  readonly value: string;
};

export type ProjectLocalizedFeature = {
  readonly title: string;
  readonly description: string;
};

export type ProjectLocalizedContent = {
  readonly title: string;
  readonly breadcrumbLabel?: string;
  readonly eyebrow?: string;
  readonly summary: string;
  readonly heroImage?: {
    readonly alt: string;
  };
  readonly overview: {
    readonly facts: readonly ProjectLocalizedFact[];
    readonly image?: {
      readonly alt: string;
    };
  };
  readonly context: {
    readonly paragraphs: readonly string[];
  };
  readonly contribution: {
    readonly paragraphs: readonly string[];
  };
  readonly features: readonly ProjectLocalizedFeature[];
  readonly resultsDescription?: string;
  readonly results: readonly string[];
  readonly technologies: readonly string[];
  readonly programmingLanguages: readonly string[];
  readonly linkLabels?: Readonly<Record<string, string>>;
};

export type ProjectImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type ProjectFeature = ProjectLocalizedFeature & {
  readonly icon: Icon;
};

export type ProjectResource = {
  readonly label: string;
  readonly href: string;
  readonly icon: Icon;
};

export type ProjectContent<TId extends ProjectId = ProjectId> = {
  readonly id: TId;
  readonly period: ProjectPeriod;
  readonly title: string;
  readonly breadcrumbLabel: string;
  readonly eyebrow?: string;
  readonly summary: string;
  readonly heroImage?: ProjectImage;
  readonly overview: {
    readonly facts: readonly ProjectLocalizedFact[];
    readonly image?: ProjectImage;
  };
  readonly context: {
    readonly paragraphs: readonly string[];
  };
  readonly contribution: {
    readonly paragraphs: readonly string[];
  };
  readonly features: readonly ProjectFeature[];
  readonly resultsDescription?: string;
  readonly results: readonly string[];
  readonly technologies: readonly string[];
  readonly programmingLanguages: readonly string[];
  readonly resources: readonly ProjectResource[];
  readonly experienceIds: readonly ExperienceId[];
};

type ProjectContentDefinition<TId extends ProjectId, TLocalizedContent extends ProjectLocalizedContent> = {
  readonly id: TId;
  readonly period: ProjectPeriod;
  readonly localizedContent: Readonly<Record<SupportedLanguage, TLocalizedContent>>;
  readonly featureIcons: readonly Icon[];
  readonly heroImageSrc?: string;
  readonly heroImageObjectPosition?: string;
  readonly overviewImageSrc?: string;
  readonly overviewImageObjectPosition?: string;
  readonly getResources?: (localized: TLocalizedContent) => readonly ProjectResource[];
  readonly experienceIds?: readonly ExperienceId[];
};

function getFeatureIcon(icons: readonly Icon[], index: number, projectId: ProjectId): Icon {
  const icon = icons[index];

  if (!icon) {
    throw new Error(`Icône manquante pour la fonctionnalité ${index + 1} du projet "${projectId}".`);
  }

  return icon;
}

export function createProjectContent<const TId extends ProjectId, const TLocalizedContent extends ProjectLocalizedContent>(
  language: SupportedLanguage,
  definition: ProjectContentDefinition<TId, TLocalizedContent>,
): ProjectContent<TId> {
  const localized = selectLocalizedContent(definition.localizedContent, language);

  if (localized.features.length !== definition.featureIcons.length) {
    throw new Error(`Le projet "${definition.id}" doit fournir une icône pour chaque fonctionnalité.`);
  }

  const breadcrumbLabel = localized.breadcrumbLabel?.trim() ? localized.breadcrumbLabel : localized.title;

  const heroImage = definition.heroImageSrc
    ? {
        src: definition.heroImageSrc,
        alt:
          localized.heroImage?.alt ??
          (() => {
            throw new Error(`Texte alternatif de l’image du Hero manquant pour le projet "${definition.id}".`);
          })(),
        objectPosition: definition.heroImageObjectPosition,
      }
    : undefined;

  const overviewImage = definition.overviewImageSrc
    ? {
        src: definition.overviewImageSrc,
        alt:
          localized.overview.image?.alt ??
          (() => {
            throw new Error(`Texte alternatif de l’image de présentation manquant pour le projet "${definition.id}".`);
          })(),
        objectPosition: definition.overviewImageObjectPosition,
      }
    : undefined;

  return {
    id: definition.id,
    period: definition.period,
    title: localized.title,
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
    overview: {
      facts: localized.overview.facts,
      ...(overviewImage
        ? {
            image: overviewImage,
          }
        : {}),
    },
    context: localized.context,
    contribution: localized.contribution,
    features: localized.features.map((feature, index) => ({
      ...feature,
      icon: getFeatureIcon(definition.featureIcons, index, definition.id),
    })),
    ...(localized.resultsDescription?.trim()
      ? {
          resultsDescription: localized.resultsDescription,
        }
      : {}),
    results: localized.results,
    technologies: localized.technologies,
    programmingLanguages: localized.programmingLanguages,
    resources: definition.getResources?.(localized) ?? [],
    experienceIds: definition.experienceIds ?? [],
  };
}
