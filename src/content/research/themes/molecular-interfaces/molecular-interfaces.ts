import {
  ArticleIcon,
  AtomIcon,
  CodeIcon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ResearchThemeId } from "../../registry";
import enMolecularInterfacesJson from "./molecular-interfaces.en.json";
import frMolecularInterfacesJson from "./molecular-interfaces.fr.json";

export const molecularInterfacesId =
  "molecular-interfaces" as const satisfies ResearchThemeId;

const localizedMolecularInterfacesContent = {
  fr: frMolecularInterfacesJson,
  en: enMolecularInterfacesJson,
} as const;

export function getMolecularInterfacesContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedMolecularInterfacesContent,
    language,
  );

  return {
    id: molecularInterfacesId,
    icon: AtomIcon,
    title: localized.title,
    introduction: localized.introduction,
    highlights: [
      {
        ...localized.highlights.researchFocus,
        icon: AtomIcon,
      },
      {
        ...localized.highlights
          .computationalApproaches,
        icon: CodeIcon,
      },
      {
        ...localized.highlights.publications,
        icon: ArticleIcon,
      },
    ],
    description: localized.description,
    technologyGroups:
      localized.technologyGroups,
  } as const;
}

export type MolecularInterfacesContent =
  ReturnType<
    typeof getMolecularInterfacesContent
  >;