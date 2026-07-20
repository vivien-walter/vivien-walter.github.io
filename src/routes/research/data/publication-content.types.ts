import type {
  ContentCollection,
  ContentLink,
} from "../../../shared/content/content.types";

export type PublicationContent = {
  readonly title: string;
  readonly authors: readonly string[];
  readonly publication: string;
  readonly year: number;
  readonly summary?: string;
  readonly links?: readonly ContentLink[];
};

export type PublicationCollection = ContentCollection<PublicationContent>;
