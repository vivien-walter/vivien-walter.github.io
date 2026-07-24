import type { Icon } from "@phosphor-icons/react";

export type ContentId = string;

export type ContentCollection<TContent> = Readonly<
  Record<ContentId, TContent>
>;

export type ContentDateRange = {
  readonly start: string;
  readonly end?: string;
};

export type ContentImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type ContentSection = {
  readonly title?: string;
  readonly paragraphs: readonly string[];
  readonly items?: readonly string[];
};

export type ContentLink = {
  readonly label: string;
  readonly href: string;
};

export type ContentPage = {
  readonly title: string;
  readonly introduction: string;
  readonly sections?: readonly ContentSection[];
  readonly links?: readonly ContentLink[];
};

export type ContentIndex = {
  readonly order: readonly ContentId[];
  readonly featured?: readonly ContentId[];
};

export type ContentDescription = {
  readonly paragraphs: readonly string[];
  readonly image?: ContentImage;
};

export type ContentHighlight = {
  readonly icon: Icon;
  readonly label: string;
  readonly value: string;
};

export type ContentTechnologyItem = {
  readonly label: string;
  readonly href?: string;
  readonly description?: string;
};

export type ContentTechnologyGroup = {
  readonly title: string;
  readonly items: readonly ContentTechnologyItem[];
};