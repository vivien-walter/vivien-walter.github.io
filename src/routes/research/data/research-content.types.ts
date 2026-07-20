import type {
  ContentId,
  ContentPage,
} from "@/shared/content/content.types";

export type ResearchContent = ContentPage & {
  readonly softwareIds?: readonly ContentId[];
};