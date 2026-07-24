import {
  CurrencyEurIcon,
  TargetIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ExperienceId } from "../../registry";
import enImaginexrJson from "./imaginexr.en.json";
import frImaginexrJson from "./imaginexr.fr.json";

export const imaginexrId =
  "imaginexr" as const satisfies ExperienceId;

const localizedImaginexrContent = {
  fr: frImaginexrJson,
  en: enImaginexrJson,
} as const;

const period = {
  start: "2024-01-03",
  end: "2026-07-15",
} as const;

const technologyItems = {
  languages: [
    {
      label: "TypeScript",
    },
  ],
  backendAndData: [
    {
      label: "Node.js",
    },
    {
      label: "Express",
    },
    {
      label: "MongoDB",
    },
    {
      label: "Zod",
    },
  ],
  interfaces: [
    {
      label: "React",
    },
    {
      label: "Tailwind CSS",
    },
  ],
  aiAndXr: [
    {
      label: "Generative AI",
    },
    {
      label: "XR",
    },
  ],
} as const;

export function getImaginexrContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedImaginexrContent,
    language,
  );

  return {
    id: imaginexrId,
    organization: "i-magineXR",
    location: "La Roche-sur-Yon, France",
    period,
    role: localized.role,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights.projectType,
        icon: TargetIcon,
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
    technologyGroups: [
      {
        title:
          localized.technologyGroupTitles
            .languages,
        items: technologyItems.languages,
      },
      {
        title:
          localized.technologyGroupTitles
            .backendAndData,
        items: technologyItems.backendAndData,
      },
      {
        title:
          localized.technologyGroupTitles
            .interfaces,
        items: technologyItems.interfaces,
      },
      {
        title:
          localized.technologyGroupTitles
            .aiAndXr,
        items: technologyItems.aiAndXr,
      },
    ],
    finalState: localized.finalState,
  } as const;
}

export type ImaginexrContent =
  ReturnType<typeof getImaginexrContent>;