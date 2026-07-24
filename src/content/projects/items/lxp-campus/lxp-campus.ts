import {
  AtomIcon,
  CodeIcon,
  ImageIcon,
  LinkSimpleIcon,
  TargetIcon,
} from "@phosphor-icons/react";

import type { ExperienceId } from "@/content/experience/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ProjectId } from "../../registry";
import enLxpCampusJson from "./lxp-campus.en.json";
import frLxpCampusJson from "./lxp-campus.fr.json";

export const lxpCampusId =
  "lxp-campus" as const satisfies ProjectId;

const localizedLxpCampusContent = {
  fr: frLxpCampusJson,
  en: enLxpCampusJson,
} as const;

const period = {
  start: "2024-01-03",
  end: "2026-07-15",
} as const;

const experienceIds = [
  "imaginexr",
] as const satisfies readonly ExperienceId[];

export function getLxpCampusContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedLxpCampusContent,
    language,
  );

  return {
    id: lxpCampusId,
    period,
    title: localized.title,
    summary: localized.summary,
    overview: localized.overview,
    context: localized.context,
    contribution: localized.contribution,
    features: [
      {
        ...localized.features.productLeadership,
        icon: TargetIcon,
      },
      {
        ...localized.features.typescriptBackend,
        icon: CodeIcon,
      },
      {
        ...localized.features
          .architectureAndSecurity,
        icon: CodeIcon,
      },
      {
        ...localized.features
          .generativeAiEcosystem,
        icon: AtomIcon,
      },
      {
        ...localized.features
          .processingAndAdministration,
        icon: LinkSimpleIcon,
      },
      {
        ...localized.features.xrApplications,
        icon: ImageIcon,
      },
    ],
    results: localized.results,
    technologies: localized.technologies,
    programmingLanguages:
      localized.programmingLanguages,
    experienceIds,
  } as const;
}

export type LxpCampusContent =
  ReturnType<typeof getLxpCampusContent>;