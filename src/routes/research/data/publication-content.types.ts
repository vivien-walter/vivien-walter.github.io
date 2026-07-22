import type {
  ContentCollection,
  ContentId,
  ContentLink,
  ContentSection,
} from "@/shared/content/content.types";

export const publicationKinds = [
  "article",
  "thesis",
] as const;

export type PublicationKind =
  (typeof publicationKinds)[number];

export type PublicationAuthor = {
  readonly name: string;
  readonly href?: string;
};

export type PublicationImageContent = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type PublicationDescriptionContent = {
  readonly paragraphs: readonly string[];
  readonly image?: PublicationImageContent;
};

export type PublicationResourceContent = {
  readonly label: string;
  readonly description: string;
  readonly href: string;
};

export type PublicationContent = {
  readonly kind: PublicationKind;
  readonly title: string;
  readonly authors: readonly PublicationAuthor[];
  readonly publication: string;
  readonly reference?: string;
  readonly year: number;
  readonly description?: PublicationDescriptionContent;
  readonly resources?: readonly PublicationResourceContent[];
  readonly themeIds?: readonly ContentId[];
  readonly projectIds?: readonly ContentId[];
  readonly softwareIds?: readonly ContentId[];
  readonly experienceIds?: readonly ContentId[];

  /*
   * Champs historiques conservés temporairement pour les composants
   * et contenus qui n’ont pas encore été migrés.
   */
  readonly summary?: string;
  readonly doi?: string;
  readonly journalLogo?: PublicationImageContent;
  readonly sections?: readonly ContentSection[];
  readonly links?: readonly ContentLink[];
};

export type PublicationCollection =
  ContentCollection<PublicationContent>;