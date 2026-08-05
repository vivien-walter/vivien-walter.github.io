import type { Icon } from '@phosphor-icons/react';

import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SoftwareId } from '@/content/software/registry';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationId } from './publications/registry';

export type PublicationKind = 'article' | 'thesis';

export type PublicationAuthor = {
  readonly name: string;
  readonly href?: string;
};

export type PublicationDoi = {
  readonly value: string;
  readonly href: string;
};

export type PublicationWebsite = {
  readonly href: string;
  readonly iconSrc?: string;
};

export type PublicationPdf = {
  readonly href: string;
  readonly downloadName: string;
};

export type PublicationResource = {
  readonly icon: Icon;
  readonly label: string;
  readonly description: string;
  readonly href: string;
};

export type PublicationLocalizedDescription = {
  readonly paragraphs: readonly string[];
  readonly image?: {
    readonly alt: string;
  };
};

export type PublicationDescriptionImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type PublicationDescription = {
  readonly paragraphs: readonly string[];
  readonly image?: PublicationDescriptionImage;
};

export type PublicationLocalizedContent = {
  readonly breadcrumbLabel?: string;
  readonly eyebrow?: string;
  readonly description?: PublicationLocalizedDescription;
  readonly linkLabels?: Readonly<Record<string, string>>;
};

export type PublicationContent<TId extends PublicationId = PublicationId, TKind extends PublicationKind = PublicationKind> = {
  readonly id: TId;
  readonly kind: TKind;
  readonly title: string;
  readonly breadcrumbLabel: string;
  readonly eyebrow?: string;
  readonly authors: readonly PublicationAuthor[];
  readonly publication?: string;
  readonly year: number;
  readonly doi?: PublicationDoi;
  readonly reference?: string;
  readonly website?: PublicationWebsite;
  readonly pdf?: PublicationPdf;
  readonly description?: PublicationDescription;
  readonly resources: readonly PublicationResource[];
  readonly themeIds: readonly ResearchThemeId[];
  readonly projectIds: readonly ProjectId[];
  readonly softwareIds: readonly SoftwareId[];
  readonly experienceIds: readonly ExperienceId[];
};

type PublicationContentDefinition<TId extends PublicationId, TKind extends PublicationKind, TLocalizedContent extends PublicationLocalizedContent> = {
  readonly id: TId;
  readonly kind: TKind;
  readonly title: string;
  readonly authors?: readonly PublicationAuthor[];
  readonly publication?: string;
  readonly year: number;
  readonly doi?: PublicationDoi;
  readonly reference?: string;
  readonly website?: PublicationWebsite;
  readonly pdf?: PublicationPdf;
  readonly localizedContent: Readonly<Record<SupportedLanguage, TLocalizedContent>>;
  readonly descriptionImageSrc?: string;
  readonly descriptionImageObjectPosition?: string;
  readonly getResources?: (localized: TLocalizedContent) => readonly PublicationResource[];
  readonly themeIds?: readonly ResearchThemeId[];
  readonly projectIds?: readonly ProjectId[];
  readonly softwareIds?: readonly SoftwareId[];
  readonly experienceIds?: readonly ExperienceId[];
};

export function createPublicationContent<
  const TId extends PublicationId,
  const TKind extends PublicationKind,
  const TLocalizedContent extends PublicationLocalizedContent,
>(language: SupportedLanguage, definition: PublicationContentDefinition<TId, TKind, TLocalizedContent>): PublicationContent<TId, TKind> {
  const localized = selectLocalizedContent(definition.localizedContent, language);

  const breadcrumbLabel = localized.breadcrumbLabel?.trim() ? localized.breadcrumbLabel : definition.title;

  const descriptionImage = definition.descriptionImageSrc
    ? {
        src: definition.descriptionImageSrc,
        alt:
          localized.description?.image?.alt ??
          (() => {
            throw new Error(`Texte alternatif de la description manquant pour la publication "${definition.id}".`);
          })(),
        objectPosition: definition.descriptionImageObjectPosition,
      }
    : undefined;

  return {
    id: definition.id,
    kind: definition.kind,
    title: definition.title,
    breadcrumbLabel,
    ...(localized.eyebrow?.trim()
      ? {
          eyebrow: localized.eyebrow,
        }
      : {}),
    authors: definition.authors ?? [],
    ...(definition.publication?.trim()
      ? {
          publication: definition.publication,
        }
      : {}),
    year: definition.year,
    ...(definition.doi
      ? {
          doi: definition.doi,
        }
      : {}),
    ...(definition.reference?.trim()
      ? {
          reference: definition.reference,
        }
      : {}),
    ...(definition.website?.href.trim()
      ? {
          website: definition.website,
        }
      : {}),
    ...(definition.pdf?.href.trim() && definition.pdf.downloadName.trim()
      ? {
          pdf: definition.pdf,
        }
      : {}),
    ...(localized.description
      ? {
          description: {
            paragraphs: localized.description.paragraphs,
            ...(descriptionImage
              ? {
                  image: descriptionImage,
                }
              : {}),
          },
        }
      : {}),
    resources: definition.getResources?.(localized) ?? [],
    themeIds: definition.themeIds ?? [],
    projectIds: definition.projectIds ?? [],
    softwareIds: definition.softwareIds ?? [],
    experienceIds: definition.experienceIds ?? [],
  };
}
