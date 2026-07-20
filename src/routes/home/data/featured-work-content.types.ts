import type {
  ContentDateRange,
  ContentId,
  ContentLink,
} from "@/shared/content/content.types";

export type FeaturedWorkImage = {
  readonly assetId: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

type FeaturedWorkBase = {
  readonly contentId: ContentId;
  readonly title: string;
  readonly summary: string;
  readonly image?: FeaturedWorkImage;
};

export type FeaturedProject = FeaturedWorkBase & {
  readonly kind: "project";
  readonly period: ContentDateRange;
};

export type FeaturedSoftware = FeaturedWorkBase & {
  readonly kind: "software";
  readonly primaryLanguage: string;
  readonly projectId: ContentId;
};

export type FeaturedPublication = FeaturedWorkBase & {
  readonly kind: "publication";
  readonly journal: string;
  readonly doi: ContentLink;
};

export type FeaturedWork =
  | FeaturedProject
  | FeaturedSoftware
  | FeaturedPublication;

export type FeaturedWorksContent = {
  readonly title: string;
  readonly description?: string;
  readonly items: readonly FeaturedWork[];
};