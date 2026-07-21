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

export type PublicationJournalLogo = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type PublicationContent = {
  readonly kind: PublicationKind;
  readonly title: string;
  readonly authors: readonly string[];
  readonly publication: string;
  readonly reference?: string;
  readonly year: number;
  readonly summary?: string;
  readonly doi?: string;
  readonly journalLogo?: PublicationJournalLogo;
  readonly themeIds?: readonly ContentId[];
  readonly sections?: readonly ContentSection[];
  readonly links?: readonly ContentLink[];
};

export type PublicationCollection =
  ContentCollection<PublicationContent>;