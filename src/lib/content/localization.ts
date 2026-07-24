import type {
  LocalizedContent,
  SupportedLanguage,
} from "@/types/localization";

export const supportedLanguages = [
  "fr",
  "en",
] as const satisfies readonly SupportedLanguage[];

export const defaultLanguage =
  "fr" satisfies SupportedLanguage;

export function isSupportedLanguage(
  value: string,
): value is SupportedLanguage {
  return supportedLanguages.some(
    (language) => language === value,
  );
}

export function selectLocalizedContent<TContent>(
  content: LocalizedContent<TContent>,
  language: SupportedLanguage,
): TContent {
  return content[language];
}