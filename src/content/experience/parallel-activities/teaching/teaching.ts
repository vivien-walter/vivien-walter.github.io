import {
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ParallelActivityId } from "../../registry";
import enTeachingJson from "./teaching.en.json";
import frTeachingJson from "./teaching.fr.json";

export const teachingId =
  "teaching" as const satisfies ParallelActivityId;

const localizedTeachingContent = {
  fr: frTeachingJson,
  en: enTeachingJson,
} as const;

export function getTeachingContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedTeachingContent,
    language,
  );

  return {
    id: teachingId,
    icon: GraduationCapIcon,
    title: localized.title,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights
          .kingsCollegeLondon,
        icon: UsersThreeIcon,
      },
      {
        ...localized.highlights.ecpm,
        icon: CodeIcon,
      },
      {
        ...localized.highlights
          .secondaryEducation,
        icon: BriefcaseIcon,
      },
    ],
    description: localized.description,
    directContributions:
      localized.directContributions,
    technologyGroups:
      localized.technologyGroups,
  } as const;
}

export type TeachingContent =
  ReturnType<typeof getTeachingContent>;