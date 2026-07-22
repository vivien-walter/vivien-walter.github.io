import type {
  ContentCollection,
  ContentId,
  ContentLink,
} from "@/shared/content/content.types";
import type { DetailDescriptionContent } from "@/shared/components/detail-description-section";
import type { DetailHighlightItem } from "@/shared/components/detail-highlights-band";
import type { DetailTechnologyGroup } from "@/shared/components/detail-technologies-section";

export const softwareKinds = [
  "software",
  "web-application",
] as const;

export type SoftwareKind =
  (typeof softwareKinds)[number];

export type SoftwareImageContent = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type SoftwareContent = {
  readonly kind: SoftwareKind;
  readonly title: string;
  readonly summary: string;

  readonly description: DetailDescriptionContent;
  readonly highlights?: readonly DetailHighlightItem[];
  readonly technologyGroups: readonly DetailTechnologyGroup[];

  readonly year?: number;
  readonly projectIds?: readonly ContentId[];
  readonly languages?: readonly string[];
  readonly technologies?: readonly string[];
  readonly image?: SoftwareImageContent;
  readonly repository?: ContentLink;
  readonly links?: readonly ContentLink[];
  readonly pinned?: boolean;
};

export type SoftwareCollection =
  ContentCollection<SoftwareContent>;