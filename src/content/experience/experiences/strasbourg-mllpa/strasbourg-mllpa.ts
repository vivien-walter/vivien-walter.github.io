import {
  CodeIcon,
  FlaskIcon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ExperienceId } from "../../registry";
import enStrasbourgMllpaJson from "./strasbourg-mllpa.en.json";
import frStrasbourgMllpaJson from "./strasbourg-mllpa.fr.json";

export const strasbourgMllpaId =
  "strasbourg-mllpa" as const satisfies ExperienceId;

const localizedStrasbourgMllpaContent = {
  fr: frStrasbourgMllpaJson,
  en: enStrasbourgMllpaJson,
} as const;

const period = {
  start: "2017-10",
  end: "2018-03",
} as const;

const mllpaWebsiteUrl =
  "https://vivien-walter.github.io/mllpa/";

export function getStrasbourgMllpaContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedStrasbourgMllpaContent,
    language,
  );

  return {
    id: strasbourgMllpaId,
    organization: "Université de Strasbourg",
    location: "Strasbourg, France",
    period,
    role: localized.role,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights.projectType,
        icon: FlaskIcon,
      },
      {
        ...localized.highlights
          .softwareDevelopment,
        icon: CodeIcon,
      },
    ],
    description: localized.description,
    directContributions:
      localized.directContributions,
    technologyGroups:
      localized.technologyGroups,
    links: [
      {
        label:
          localized.linkLabels.mllpaWebsite,
        href: mllpaWebsiteUrl,
      },
    ],
    finalState: localized.finalState,
  } as const;
}

export type StrasbourgMllpaContent =
  ReturnType<
    typeof getStrasbourgMllpaContent
  >;