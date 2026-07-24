import {
  CurrencyEurIcon,
  MicroscopeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ExperienceId } from "../../registry";
import enKclIscatJson from "./kcl-iscat.en.json";
import frKclIscatJson from "./kcl-iscat.fr.json";

export const kclIscatId =
  "kcl-iscat" as const satisfies ExperienceId;

const localizedKclIscatContent = {
  fr: frKclIscatJson,
  en: enKclIscatJson,
} as const;

const period = {
  start: "2018-03",
  end: "2021-03",
} as const;

export function getKclIscatContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedKclIscatContent,
    language,
  );

  return {
    id: kclIscatId,
    organization: "King’s College London",
    location: "London, United Kingdom",
    period,
    role: localized.role,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights.projectType,
        icon: MicroscopeIcon,
      },
      {
        ...localized.highlights.budget,
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

export type KclIscatContent =
  ReturnType<typeof getKclIscatContent>;