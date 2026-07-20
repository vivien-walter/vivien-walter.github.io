import type {
  ContentLink,
  ContentPage,
} from "../../../shared/content/content.types";

export type ContactContent = ContentPage & {
  readonly links: readonly ContentLink[];
};
