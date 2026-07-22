import type {
  ContentCollection,
  ContentDateRange,
  ContentId,
  ContentLink,
  ContentSection,
} from "@/shared/content/content.types";

export const projectFeatureIconIds = [
  "analysis",
  "automation",
  "code",
  "instrumentation",
  "machine-learning",
  "microscopy",
  "project",
  "research",
  "simulation",
  "visualization",
  "web",
] as const;

export type ProjectFeatureIconId =
  (typeof projectFeatureIconIds)[number];

export type ProjectImageContent = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type ProjectOverviewFact = {
  readonly label: string;
  readonly value: string;
};

export type ProjectOverviewContent = {
  readonly image?: ProjectImageContent;
  readonly facts?: readonly ProjectOverviewFact[];
};

export type ProjectNarrativeContent = {
  readonly paragraphs: readonly string[];
};

export type ProjectFeatureContent = {
  readonly icon: ProjectFeatureIconId;
  readonly title: string;
  readonly description: string;
};

export type ProjectRelatedExperience = {
  readonly experienceId: ContentId;
};

export type ProjectRelatedSoftware = {
  readonly softwareId: ContentId;
};

export type ProjectRelatedPublication = {
  readonly publicationId: ContentId;
};

export type ProjectContent = {
  readonly title: string;
  readonly summary: string;
  readonly period?: ContentDateRange;
  readonly overview?: ProjectOverviewContent;
  readonly context?: ProjectNarrativeContent;
  readonly contribution?: ProjectNarrativeContent;
  readonly features?: readonly ProjectFeatureContent[];
  readonly results?: readonly string[];
  readonly sections: readonly ContentSection[];
  readonly technologies?: readonly string[];
  readonly programmingLanguages?: readonly string[];
  readonly relatedExperiences?: readonly ProjectRelatedExperience[];
  readonly relatedSoftware?: readonly ProjectRelatedSoftware[];
  readonly relatedPublications?: readonly ProjectRelatedPublication[];
  readonly links?: readonly ContentLink[];
};

export type ProjectCollection =
  ContentCollection<ProjectContent>;