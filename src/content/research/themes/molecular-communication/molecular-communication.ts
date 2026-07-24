import {
  ArticleIcon,
  FlaskIcon,
  MicroscopeIcon,
  WavesIcon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ResearchThemeId } from "../../registry";
import enMolecularCommunicationJson from "./molecular-communication.en.json";
import frMolecularCommunicationJson from "./molecular-communication.fr.json";

export const molecularCommunicationId =
  "molecular-communication" as const satisfies ResearchThemeId;

const localizedMolecularCommunicationContent = {
  fr: frMolecularCommunicationJson,
  en: enMolecularCommunicationJson,
} as const;

export function getMolecularCommunicationContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedMolecularCommunicationContent,
    language,
  );

  return {
    id: molecularCommunicationId,
    icon: WavesIcon,
    title: localized.title,
    introduction: localized.introduction,
    highlights: [
      {
        ...localized.highlights
          .experimentalInfrastructure,
        icon: FlaskIcon,
      },
      {
        ...localized.highlights
          .interdisciplinarySystem,
        icon: MicroscopeIcon,
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

export type MolecularCommunicationContent =
  ReturnType<
    typeof getMolecularCommunicationContent
  >;