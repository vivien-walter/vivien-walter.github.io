import type {
  ContentCollection,
  ContentLink,
  ContentSection,
} from "@/shared/content/content.types";

export type SoftwareContent = {
  readonly title: string;
  readonly summary: string;
  readonly sections: readonly ContentSection[];
  readonly technologies?: readonly string[];
  readonly links?: readonly ContentLink[];
};

export type SoftwareCollection = ContentCollection<SoftwareContent>;