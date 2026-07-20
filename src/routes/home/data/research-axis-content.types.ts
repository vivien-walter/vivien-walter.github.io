import type { ContentId } from "@/shared/content/content.types";

export const researchAxisIconIds = [
  "optics",
  "scientific-ai",
  "scientific-software",
  "collaborative-systems",
] as const;

export type ResearchAxisIconId =
  (typeof researchAxisIconIds)[number];

export type ResearchAxisContent = {
  readonly id: ContentId;
  readonly icon: ResearchAxisIconId;
  readonly title: string;
  readonly description: string;
};

export type ResearchAxesContent = {
  readonly title: string;
  readonly description?: string;
  readonly items: readonly ResearchAxisContent[];
};