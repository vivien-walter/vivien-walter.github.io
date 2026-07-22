import type {
  ContentId,
  ContentPage,
} from "@/shared/content/content.types";

export type ResearchThemeIcon =
  | "molecular-interfaces"
  | "optics-photonics"
  | "molecular-communication";

export type ResearchThemeHighlightIcon =
  | "project"
  | "funding"
  | "team"
  | "laboratory"
  | "instrumentation"
  | "software"
  | "research"
  | "publication";

export type ResearchImageContent = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type ResearchThemeHighlightContent = {
  readonly icon: ResearchThemeHighlightIcon;
  readonly label: string;
  readonly value: string;
};

export type ResearchThemeDescriptionContent = {
  readonly paragraphs: readonly string[];
  readonly image?: ResearchImageContent;
};

export type ResearchThemeTechnologyItem = {
  readonly label: string;
  readonly href?: string;
  readonly description?: string;
};

export type ResearchThemeTechnologyGroup = {
  readonly title: string;
  readonly items: readonly ResearchThemeTechnologyItem[];
};

export type ResearchThemeContent = ContentPage & {
  readonly id: ContentId;
  readonly icon: ResearchThemeIcon;
  readonly image: ResearchImageContent;
  readonly highlights?: readonly ResearchThemeHighlightContent[];
  readonly description?: ResearchThemeDescriptionContent;
  readonly technologyGroups?: readonly ResearchThemeTechnologyGroup[];
};

export type ResearchContent = ContentPage & {
  readonly heroImage?: ResearchImageContent;
  readonly themes?: readonly ResearchThemeContent[];
};