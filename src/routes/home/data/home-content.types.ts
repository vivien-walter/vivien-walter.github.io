import type {
  ContentId,
  ContentPage,
  ContentSection,
} from "../../../shared/content/content.types";

export type HomeContent = ContentPage & {
  readonly sections: readonly ContentSection[];
  readonly featuredProjects?: readonly ContentId[];
  readonly featuredSoftware?: readonly ContentId[];
  readonly featuredPublications?: readonly ContentId[];
};
