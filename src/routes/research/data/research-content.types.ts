import type {
  ContentId,
  ContentPage,
} from "@/shared/content/content.types";

export type ResearchThemeIcon =
  | "molecular-interfaces"
  | "optics-photonics"
  | "molecular-communication";

export type ResearchImageContent = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type ResearchThemeContent = ContentPage & {
  readonly id: ContentId;
  readonly icon: ResearchThemeIcon;
  readonly image: ResearchImageContent;
};

export type ResearchContent = ContentPage & {
  readonly heroImage?: ResearchImageContent;
  readonly themes?: readonly ResearchThemeContent[];
};