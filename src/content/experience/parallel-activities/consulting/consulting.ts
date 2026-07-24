import {
  BriefcaseIcon,
  CodeIcon,
  MicroscopeIcon,
} from "@phosphor-icons/react";

import type { ProjectId } from "@/content/projects/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ParallelActivityId } from "../../registry";
import enConsultingJson from "./consulting.en.json";
import frConsultingJson from "./consulting.fr.json";

export const consultingId =
  "consulting" as const satisfies ParallelActivityId;

const localizedConsultingContent = {
  fr: frConsultingJson,
  en: enConsultingJson,
} as const;

const projectIds = [
  "medical-microscope",
] as const satisfies readonly ProjectId[];

export function getConsultingContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedConsultingContent,
    language,
  );

  return {
    id: consultingId,
    icon: BriefcaseIcon,
    title: localized.title,
    summary: localized.summary,
    highlights: [
      {
        ...localized.highlights.instrumentation,
        icon: MicroscopeIcon,
      },
      {
        ...localized.highlights.development,
        icon: CodeIcon,
      },
      {
        ...localized.highlights
          .otherAssignments,
        icon: BriefcaseIcon,
      },
    ],
    description: localized.description,
    directContributions:
      localized.directContributions,
    technologyGroups:
      localized.technologyGroups,
    projectIds,
  } as const;
}

export type ConsultingContent =
  ReturnType<typeof getConsultingContent>;