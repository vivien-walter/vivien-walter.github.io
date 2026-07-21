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

export type ExperienceHighlightIconId =
  | "project"
  | "funding"
  | "team"
  | "laboratory"
  | "instrumentation"
  | "software"
  | "research"
  | "publication";

export type ExperienceHighlightContent = {
  readonly icon: ExperienceHighlightIconId;
  readonly label: string;
  readonly value: string;
};

export type ExperienceHighlights =
  readonly ExperienceHighlightContent[];

export type ExperienceDescriptionImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type ExperienceDescriptionContent = {
  readonly paragraphs: readonly string[];
  readonly image?: ExperienceDescriptionImage;
};

export type ExperienceDirectContribution = {
  readonly label: string;
  readonly text: string;
};

export type ExperienceFinalStateContent = {
  readonly title: string;
  readonly text: string;
};

export type ExperienceTechnologyItem = {
  readonly label: string;
  readonly href?: string;
  readonly description?: string;
};

export type ExperienceTechnologyGroup = {
  readonly title: string;
  readonly items: readonly ExperienceTechnologyItem[];
};

export type ExperienceRelatedProject = {
  readonly projectId: ContentId;
};

export type ExperienceRelatedSoftware = {
  readonly softwareId: ContentId;
};

export type ExperienceRelatedPublication = {
  readonly publicationId: ContentId;
};

export type ExperienceContent = {
  readonly role: string;
  readonly organization: string;
  readonly location?: string;
  readonly period: ContentDateRange;
  readonly summary: string;
  readonly highlights?: ExperienceHighlights;
  readonly description?: ExperienceDescriptionContent;
  readonly directContributions?: readonly ExperienceDirectContribution[];
  readonly technologyGroups?: readonly ExperienceTechnologyGroup[];
  readonly finalState?: ExperienceFinalStateContent;
  readonly sections: readonly ContentSection[];
  readonly relatedProjects?: readonly ExperienceRelatedProject[];
  readonly relatedSoftware?: readonly ExperienceRelatedSoftware[];
  readonly relatedPublications?: readonly ExperienceRelatedPublication[];
  readonly links?: readonly ContentLink[];
};

export type ExperienceCollection =
  ContentCollection<ExperienceContent>;

export type ExperienceParallelActivityId =
  | "consulting"
  | "scientific-research"
  | "teaching";

export type ExperienceParallelActivityContent = Omit<
  ExperienceContent,
  "role" | "organization" | "period" | "finalState"
> & {
  readonly title: string;
  readonly organization?: string;
  readonly period?: ContentDateRange;
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