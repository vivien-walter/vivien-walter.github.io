import type {
  ContentCollection,
  ContentId,
  ContentLink,
  ContentSection,
} from "@/shared/content/content.types";

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
  readonly sections: readonly ContentSection[];
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