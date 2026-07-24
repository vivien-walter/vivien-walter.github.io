import {
  ArticleIcon,
  AtomIcon,
  CodeIcon,
  GlobeHemisphereWestIcon,
} from "@phosphor-icons/react";

import type { ExperienceId } from "@/content/experience/registry";
import type { ProjectId } from "@/content/projects/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { SoftwareId } from "../../registry";
import enMllpaJson from "./mllpa.en.json";
import frMllpaJson from "./mllpa.fr.json";

export const mllpaId =
  "mllpa" as const satisfies SoftwareId;

const localizedMllpaContent = {
  fr: frMllpaJson,
  en: enMllpaJson,
} as const;

const languages = [
  "Python",
] as const;

const projectIds = [
  "mllpa-project",
] as const satisfies readonly ProjectId[];

const experienceIds = [
  "strasbourg-mllpa",
] as const satisfies readonly ExperienceId[];

const mllpaWebsiteUrl =
  "https://vivien-walter.github.io/mllpa/";

export function getMllpaContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedMllpaContent,
    language,
  );

  return {
    id: mllpaId,
    icon: CodeIcon,
    kind: "software",
    languages,
    title: localized.title,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights.researchTopic,
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
    resources: [
      {
        label: localized.linkLabels.website,
        href: mllpaWebsiteUrl,
        icon: GlobeHemisphereWestIcon,
      },
    ],
    projectIds,
    experienceIds,
  } as const;
}

export type MllpaContent =
  ReturnType<typeof getMllpaContent>;