import {
  AtomIcon,
  CodeIcon,
  FlaskIcon,
  MagnifyingGlassIcon,
  TargetIcon,
} from "@phosphor-icons/react";

import type { ExperienceId } from "@/content/experience/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ProjectId } from "../../registry";
import enMolecularCommunicationJson from "./molecular-communication.en.json";
import frMolecularCommunicationJson from "./molecular-communication.fr.json";

export const molecularCommunicationId =
  "molecular-communication" as const satisfies ProjectId;

const localizedMolecularCommunicationContent = {
  fr: frMolecularCommunicationJson,
  en: enMolecularCommunicationJson,
} as const;

const period = {
  start: "2021-03",
  end: "2023-08",
} as const;

const experienceIds = [
  "kcl-molecular-communication",
] as const satisfies readonly ExperienceId[];

export function getMolecularCommunicationContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedMolecularCommunicationContent,
    language,
  );

  return {
    id: molecularCommunicationId,
    period,
    title: localized.title,
    summary: localized.summary,
    overview: localized.overview,
    context: localized.context,
    contribution: localized.contribution,
    features: [
      {
        ...localized.features
          .laboratoryCreation,
        icon: FlaskIcon,
      },
      {
        ...localized.features
          .experimentalTestbed,
        icon: AtomIcon,
      },
      {
        ...localized.features
          .chemicalSignalProcessing,
        icon: MagnifyingGlassIcon,
      },
      {
        ...localized.features
          .oneDimensionalCnnAnalysis,
        icon: AtomIcon,
      },
      {
        ...localized.features
          .openSourceSyringePumps,
        icon: CodeIcon,
      },
      {
        ...localized.features
          .leadershipAndFunding,
        icon: TargetIcon,
      },
    ],
    results: localized.results,
    technologies: localized.technologies,
    programmingLanguages:
      localized.programmingLanguages,
    experienceIds,
  } as const;
}

export type MolecularCommunicationContent =
  ReturnType<
    typeof getMolecularCommunicationContent
  >;