export type ContentId = string;

export type ContentCollection<TContent> = Readonly<Record<ContentId, TContent>>;

export type ContentDateRange = {
  readonly start: string;
  readonly end?: string;
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
