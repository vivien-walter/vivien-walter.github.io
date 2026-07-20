export const supportedLanguages = ["fr", "en"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export type LocalizedContent<TContent> = Readonly<
  Record<SupportedLanguage, TContent>
>;

export function selectLocalizedContent<TContent>(
  content: LocalizedContent<TContent>,
  language: SupportedLanguage,
): TContent {
  return content[language];
}