import {
  CurrencyEurIcon,
  FlaskIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ExperienceId } from "../../registry";
import enKclMolecularCommunicationJson from "./kcl-molecular-communication.en.json";
import frKclMolecularCommunicationJson from "./kcl-molecular-communication.fr.json";

export const kclMolecularCommunicationId =
  "kcl-molecular-communication" as const satisfies ExperienceId;

const localizedKclMolecularCommunicationContent = {
  fr: frKclMolecularCommunicationJson,
  en: enKclMolecularCommunicationJson,
} as const;

const period = {
  start: "2021-03",
  end: "2023-08",
} as const;

export function getKclMolecularCommunicationContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedKclMolecularCommunicationContent,
    language,
  );

  return {
    id: kclMolecularCommunicationId,
    organization: "King’s College London",
    location: "London, United Kingdom",
    period,
    role: localized.role,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights.projectType,
        icon: FlaskIcon,
      },
      {
        ...localized.highlights.funding,
        icon: CurrencyEurIcon,
      },
      {
        ...localized.highlights.team,
        icon: UsersThreeIcon,
      },
    ],
    description: localized.description,
    directContributions:
      localized.directContributions,
    technologyGroups:
      localized.technologyGroups,
    finalState: localized.finalState,
  } as const;
}

export type KclMolecularCommunicationContent =
  ReturnType<
    typeof getKclMolecularCommunicationContent
  >;