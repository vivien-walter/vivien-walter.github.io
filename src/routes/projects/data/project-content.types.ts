import type {
  ContentCollection,
  ContentDateRange,
  ContentLink,
  ContentSection,
} from "../../../shared/content/content.types";

export type ProjectContent = {
  readonly title: string;
  readonly summary: string;
  readonly period?: ContentDateRange;
  readonly sections: readonly ContentSection[];
  readonly technologies?: readonly string[];
  readonly links?: readonly ContentLink[];
};

export type ProjectCollection = ContentCollection<ProjectContent>;
