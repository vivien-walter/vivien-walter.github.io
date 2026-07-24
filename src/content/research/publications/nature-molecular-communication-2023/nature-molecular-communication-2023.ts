import type { ExperienceId } from "@/content/experience/registry";
import type { ProjectId } from "@/content/projects/registry";
import type { ResearchThemeId } from "@/content/research/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { PublicationId } from "../registry";
import enNatureMolecularCommunicationJson from "./nature-molecular-communication-2023.en.json";
import frNatureMolecularCommunicationJson from "./nature-molecular-communication-2023.fr.json";

export const natureMolecularCommunication2023Id =
  "nature-molecular-communication-2023" as const satisfies PublicationId;

const localizedNatureMolecularCommunication2023Content = {
  fr: frNatureMolecularCommunicationJson,
  en: enNatureMolecularCommunicationJson,
} as const;

const authors = [] as const;

const doi = {
  value: "10.1038/s41467-023-42885-0",
  href: "https://doi.org/10.1038/s41467-023-42885-0",
} as const;

const themeIds = [
  "molecular-communication",
] as const satisfies readonly ResearchThemeId[];

const projectIds = [
  "molecular-communication",
] as const satisfies readonly ProjectId[];

const experienceIds = [
  "kcl-molecular-communication",
] as const satisfies readonly ExperienceId[];

export function getNatureMolecularCommunication2023Content(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedNatureMolecularCommunication2023Content,
    language,
  );

  return {
    id: natureMolecularCommunication2023Id,
    kind: "article",
    title:
      "Real-time signal processing via chemical reactions for a microfluidic molecular communication system",
    authors,
    publication: "Nature Communications",
    year: 2023,
    doi,
    contribution: localized.contribution,
    description: localized.description,
    themeIds,
    projectIds,
    experienceIds,
  } as const;
}

export type NatureMolecularCommunication2023Content =
  ReturnType<
    typeof getNatureMolecularCommunication2023Content
  >;