import type { SupportedLanguage } from "../../navigation";

export type LocalizedContent<TContent> = Readonly<
  Record<SupportedLanguage, TContent>
>;

export function selectLocalizedContent<TContent>(
  content: LocalizedContent<TContent>,
  language: SupportedLanguage,
): TContent {
  return content[language];
}
