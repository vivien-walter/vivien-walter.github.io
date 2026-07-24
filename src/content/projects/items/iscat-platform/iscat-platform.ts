import {
  AtomIcon,
  CodeIcon,
  FlaskIcon,
  MagnifyingGlassIcon,
  MicroscopeIcon,
} from "@phosphor-icons/react";

import type { ExperienceId } from "@/content/experience/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ProjectId } from "../../registry";
import enIscatPlatformJson from "./iscat-platform.en.json";
import frIscatPlatformJson from "./iscat-platform.fr.json";

export const iscatPlatformId =
  "iscat-platform" as const satisfies ProjectId;

const localizedIscatPlatformContent = {
  fr: frIscatPlatformJson,
  en: enIscatPlatformJson,
} as const;

const period = {
  start: "2018-03",
  end: "2021-03",
} as const;

const experienceIds = [
  "kcl-iscat",
] as const satisfies readonly ExperienceId[];

export function getIscatPlatformContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedIscatPlatformContent,
    language,
  );

  return {
    id: iscatPlatformId,
    period,
    title: localized.title,
    summary: localized.summary,
    overview: localized.overview,
    context: localized.context,
    contribution: localized.contribution,
    features: [
      {
        ...localized.features
          .microscopeConstruction,
        icon: MicroscopeIcon,
      },
      {
        ...localized.features
          .instrumentQualification,
        icon: FlaskIcon,
      },
      {
        ...localized.features
          .experimentalWorkflow,
        icon: AtomIcon,
      },
      {
        ...localized.features
          .controlAndAutomation,
        icon: CodeIcon,
      },
      {
        ...localized.features
          .acquisitionAndImageAnalysis,
        icon: MagnifyingGlassIcon,
      },
      {
        ...localized.features
          .scientificSoftwareTools,
        icon: CodeIcon,
      },
    ],
    results: localized.results,
    technologies: localized.technologies,
    programmingLanguages:
      localized.programmingLanguages,
    experienceIds,
  } as const;
}

export type IscatPlatformContent =
  ReturnType<typeof getIscatPlatformContent>;