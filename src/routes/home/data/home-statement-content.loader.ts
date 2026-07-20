import enHomeStatementJson from "@/locales/en/home/statement.json";
import frHomeStatementJson from "@/locales/fr/home/statement.json";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type { HomeStatementContent } from "./home-statement-content.types";

const frHomeStatement =
  frHomeStatementJson as HomeStatementContent;

const enHomeStatement =
  enHomeStatementJson as HomeStatementContent;

const localizedHomeStatements: LocalizedContent<HomeStatementContent> = {
  fr: frHomeStatement,
  en: enHomeStatement,
};

export function getHomeStatementContent(
  language: SupportedLanguage,
): HomeStatementContent {
  return selectLocalizedContent(localizedHomeStatements, language);
}