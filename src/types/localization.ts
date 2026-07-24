export type SupportedLanguage = "fr" | "en";

export type LocalizedContent<TContent> = Readonly<
  Record<SupportedLanguage, TContent>
>;