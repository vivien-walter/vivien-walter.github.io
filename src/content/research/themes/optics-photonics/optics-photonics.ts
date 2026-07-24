import {
  ApertureIcon,
  ArticleIcon,
  CodeIcon,
  MicroscopeIcon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ResearchThemeId } from "../../registry";
import enOpticsPhotonicsJson from "./optics-photonics.en.json";
import frOpticsPhotonicsJson from "./optics-photonics.fr.json";

export const opticsPhotonicsId =
  "optics-photonics" as const satisfies ResearchThemeId;

const localizedOpticsPhotonicsContent = {
  fr: frOpticsPhotonicsJson,
  en: enOpticsPhotonicsJson,
} as const;

export function getOpticsPhotonicsContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedOpticsPhotonicsContent,
    language,
  );

  return {
    id: opticsPhotonicsId,
    icon: ApertureIcon,
    title: localized.title,
    introduction: localized.introduction,
    highlights: [
      {
        ...localized.highlights.microscopy,
        icon: MicroscopeIcon,
      },
      {
        ...localized.highlights.automation,
        icon: CodeIcon,
      },
      {
        ...localized.highlights.mainPublication,
        icon: ArticleIcon,
      },
    ],
    description: localized.description,
    technologyGroups:
      localized.technologyGroups,
  } as const;
}

export type OpticsPhotonicsContent =
  ReturnType<
    typeof getOpticsPhotonicsContent
  >;