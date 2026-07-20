import type {
  ContentCollection,
  ContentDateRange,
  ContentLink,
  ContentSection,
} from "../../../shared/content/content.types";

export type ExperienceContent = {
  readonly role: string;
  readonly organization: string;
  readonly location?: string;
  readonly period: ContentDateRange;
  readonly summary: string;
  readonly sections: readonly ContentSection[];
  readonly links?: readonly ContentLink[];
};

export type ExperienceCollection = ContentCollection<ExperienceContent>;
