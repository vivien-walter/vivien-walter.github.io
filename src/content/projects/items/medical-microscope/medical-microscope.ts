import {
  AtomIcon,
  CodeIcon,
  FlaskIcon,
  TargetIcon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import type { ProjectId } from "../../registry";
import enMedicalMicroscopeJson from "./medical-microscope.en.json";
import frMedicalMicroscopeJson from "./medical-microscope.fr.json";

export const medicalMicroscopeId =
  "medical-microscope" as const satisfies ProjectId;

const localizedMedicalMicroscopeContent = {
  fr: frMedicalMicroscopeJson,
  en: enMedicalMicroscopeJson,
} as const;

const period = {
  start: "2020-04",
  end: "2020-11",
} as const;

export function getMedicalMicroscopeContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedMedicalMicroscopeContent,
    language,
  );

  return {
    id: medicalMicroscopeId,
    experienceIds: [] as const,
    period,
    title: localized.title,
    summary: localized.summary,
    overview: localized.overview,
    context: localized.context,
    contribution: localized.contribution,
    features: [
      {
        ...localized.features
          .automaticFocusing,
        icon: CodeIcon,
      },
      {
        ...localized.features
          .technicalSpecifications,
        icon: TargetIcon,
      },
      {
        ...localized.features
          .labviewControlSoftware,
        icon: CodeIcon,
      },
      {
        ...localized.features
          .integrationAndDeployment,
        icon: FlaskIcon,
      },
      {
        ...localized.features
          .documentationAndTraining,
        icon: AtomIcon,
      },
    ],
    results: localized.results,
    technologies: localized.technologies,
    programmingLanguages:
      localized.programmingLanguages,
  } as const;
}

export type MedicalMicroscopeContent =
  ReturnType<
    typeof getMedicalMicroscopeContent
  >;