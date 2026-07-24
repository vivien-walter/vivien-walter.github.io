import {
  AtomIcon,
  CodeIcon,
  GlobeHemisphereWestIcon,
  LinkSimpleIcon,
  MagnifyingGlassIcon,
  WavesIcon,
} from "@phosphor-icons/react";

import type { ExperienceId } from "@/content/experience/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ProjectId } from "../../registry";
import enMllpaProjectJson from "./mllpa-project.en.json";
import frMllpaProjectJson from "./mllpa-project.fr.json";

export const mllpaProjectId =
  "mllpa-project" as const satisfies ProjectId;

const localizedMllpaProjectContent = {
  fr: frMllpaProjectJson,
  en: enMllpaProjectJson,
} as const;

const period = {
  start: "2017-10",
} as const;

const experienceIds = [
  "strasbourg-mllpa",
] as const satisfies readonly ExperienceId[];

const mllpaWebsiteUrl =
  "https://vivien-walter.github.io/mllpa/";

export function getMllpaProjectContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedMllpaProjectContent,
    language,
  );

  return {
    id: mllpaProjectId,
    period,
    title: localized.title,
    summary: localized.summary,
    overview: localized.overview,
    context: localized.context,
    contribution: localized.contribution,
    features: [
      {
        ...localized.features
          .molecularSimulationAnalysis,
        icon: WavesIcon,
      },
      {
        ...localized.features
          .membranePhaseAnalysis,
        icon: MagnifyingGlassIcon,
      },
      {
        ...localized.features
          .machineLearning,
        icon: AtomIcon,
      },
      {
        ...localized.features
          .reusablePythonModule,
        icon: CodeIcon,
      },
      {
        ...localized.features
          .websiteAndDocumentation,
        icon: LinkSimpleIcon,
      },
    ],
    results: localized.results,
    technologies: localized.technologies,
    programmingLanguages:
      localized.programmingLanguages,
    resources: [
      {
        label:
          localized.linkLabels.mllpaWebsite,
        href: mllpaWebsiteUrl,
        icon: GlobeHemisphereWestIcon,
      },
    ],
    experienceIds,
  } as const;
}

export type MllpaProjectContent =
  ReturnType<
    typeof getMllpaProjectContent
  >;