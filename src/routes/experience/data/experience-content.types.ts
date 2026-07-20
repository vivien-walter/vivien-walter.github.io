import type {
  ContentCollection,
  ContentDateRange,
  ContentId,
  ContentLink,
  ContentPage,
  ContentSection,
} from "@/shared/content/content.types";

export type ExperienceExpertiseId =
  | "project-leadership"
  | "software-ai"
  | "instrumentation"
  | "collaboration";

export type ExperienceExpertiseContent = {
  readonly id: ExperienceExpertiseId;
  readonly title: string;
  readonly description: string;
};

export type ExperienceParallelActivityId =
  | "consulting"
  | "scientific-research"
  | "teaching";

export type ExperienceParallelActivityContent = {
  readonly title: string;
  readonly summary: string;
  readonly sections: readonly ContentSection[];
};

export type ExperienceParallelActivitiesContent = {
  readonly order: readonly ExperienceParallelActivityId[];
  readonly entries: Readonly<
    Record<
      ExperienceParallelActivityId,
      ExperienceParallelActivityContent
    >
  >;
};

export type ExperiencePersonalActivityId =
  | "music"
  | "illustrations"
  | "science-communication";

export type ExperiencePersonalActivityImage = {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly objectPosition?: string;
};

export type ExperiencePersonalActivityContent = {
  readonly title: string;
  readonly summary: string;
  readonly thumbnail?: ExperiencePersonalActivityImage;
  readonly sections: readonly ContentSection[];
  readonly images?: readonly ExperiencePersonalActivityImage[];
};

export type ExperiencePersonalActivitiesContent = {
  readonly order: readonly ExperiencePersonalActivityId[];
  readonly entries: Readonly<
    Record<
      ExperiencePersonalActivityId,
      ExperiencePersonalActivityContent
    >
  >;
};

export type ExperiencePageContent = ContentPage & {
  readonly eyebrow: string;
  readonly timelineTitle: string;
  readonly parallelActivitiesTitle: string;
  readonly personalActivitiesTitle: string;
  readonly expertise: readonly ExperienceExpertiseContent[];
};

export type ExperienceRelatedProject = {
  readonly projectId: ContentId;
};

export type ExperienceContent = {
  readonly role: string;
  readonly organization: string;
  readonly location?: string;
  readonly period: ContentDateRange;
  readonly summary: string;
  readonly sections: readonly ContentSection[];
  readonly relatedProjects?: readonly ExperienceRelatedProject[];
  readonly links?: readonly ContentLink[];
};

export type ExperienceCollection = ContentCollection<ExperienceContent>;