import {
  CodeIcon,
  MicroscopeIcon,
  TargetIcon,
  UsersThreeIcon,
  type Icon,
} from "@phosphor-icons/react";

import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import { getImaginexrContent } from "./experiences/imaginexr/imaginexr";
import { getKclIscatContent } from "./experiences/kcl-iscat/kcl-iscat";
import { getKclMolecularCommunicationContent } from "./experiences/kcl-molecular-communication/kcl-molecular-communication";
import { getStrasbourgMllpaContent } from "./experiences/strasbourg-mllpa/strasbourg-mllpa";
import enExperiencePageJson from "./page.en.json";
import frExperiencePageJson from "./page.fr.json";
import { getConsultingContent } from "./parallel-activities/consulting/consulting";
import { getScientificResearchContent } from "./parallel-activities/scientific-research/scientific-research";
import { getTeachingContent } from "./parallel-activities/teaching/teaching";
import {
  experienceOrder,
  parallelActivityOrder,
  type ExperienceId,
  type ParallelActivityId,
} from "./registry";

export const experienceExpertiseOrder = [
  "project-leadership",
  "software-ai",
  "instrumentation",
  "collaboration",
] as const;

export type ExperienceExpertiseId =
  (typeof experienceExpertiseOrder)[number];

export type ExperienceExpertise = {
  readonly id: ExperienceExpertiseId;
  readonly icon: Icon;
  readonly title: string;
  readonly description: string;
};

export const personalActivityOrder = [
  "music",
  "visual-arts",
  "short-films",
] as const;

export type PersonalActivityId =
  (typeof personalActivityOrder)[number];

export type PersonalActivity = {
  readonly id: PersonalActivityId;
  readonly title: string;
  readonly description: string;
};

const localizedExperiencePageContent = {
  fr: frExperiencePageJson,
  en: enExperiencePageJson,
} as const;

export function getExperiencePage(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedExperiencePageContent,
    language,
  );

  return {
    ...localized,
    expertise: [
      {
        id: "project-leadership",
        icon: TargetIcon,
        ...localized.expertise.projectLeadership,
      },
      {
        id: "software-ai",
        icon: CodeIcon,
        ...localized.expertise.softwareAi,
      },
      {
        id: "instrumentation",
        icon: MicroscopeIcon,
        ...localized.expertise.instrumentation,
      },
      {
        id: "collaboration",
        icon: UsersThreeIcon,
        ...localized.expertise.collaboration,
      },
    ] satisfies readonly ExperienceExpertise[],
    experienceIds: experienceOrder,
    parallelActivityIds: parallelActivityOrder,
    personalActivities: [
      {
        id: "music",
        ...localized.personalActivities.music,
      },
      {
        id: "visual-arts",
        ...localized.personalActivities.visualArts,
      },
      {
        id: "short-films",
        ...localized.personalActivities.shortFilms,
      },
    ] satisfies readonly PersonalActivity[],
  } as const;
}

function getExperienceCollectionById(
  language: SupportedLanguage,
) {
  return {
    imaginexr: getImaginexrContent(language),
    "kcl-molecular-communication":
      getKclMolecularCommunicationContent(language),
    "kcl-iscat": getKclIscatContent(language),
    "strasbourg-mllpa":
      getStrasbourgMllpaContent(language),
  } as const satisfies Readonly<
    Record<ExperienceId, unknown>
  >;
}

export function getExperienceCollection(
  language: SupportedLanguage,
) {
  const collectionById =
    getExperienceCollectionById(language);

  return experienceOrder.map(
    (experienceId) =>
      collectionById[experienceId],
  );
}

export function getExperienceById(
  language: SupportedLanguage,
  experienceId: string,
) {
  return getExperienceCollection(language).find(
    (experience) =>
      experience.id === experienceId,
  );
}

export function getExperienceNavigation(
  language: SupportedLanguage,
  experienceId: string,
) {
  const experiences =
    getExperienceCollection(language);

  const currentIndex = experiences.findIndex(
    (experience) =>
      experience.id === experienceId,
  );

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    } as const;
  }

  return {
    previous:
      currentIndex > 0
        ? experiences[currentIndex - 1]
        : undefined,
    next:
      currentIndex < experiences.length - 1
        ? experiences[currentIndex + 1]
        : undefined,
  } as const;
}

function getParallelActivityCollectionById(
  language: SupportedLanguage,
) {
  return {
    consulting: getConsultingContent(language),
    "scientific-research":
      getScientificResearchContent(language),
    teaching: getTeachingContent(language),
  } as const satisfies Readonly<
    Record<ParallelActivityId, unknown>
  >;
}

export function getParallelActivityCollection(
  language: SupportedLanguage,
) {
  const collectionById =
    getParallelActivityCollectionById(language);

  return parallelActivityOrder.map(
    (activityId) =>
      collectionById[activityId],
  );
}

export function getParallelActivityById(
  language: SupportedLanguage,
  activityId: string,
) {
  return getParallelActivityCollection(
    language,
  ).find(
    (activity) =>
      activity.id === activityId,
  );
}

export function getParallelActivityNavigation(
  language: SupportedLanguage,
  activityId: string,
) {
  const activities =
    getParallelActivityCollection(language);

  const currentIndex = activities.findIndex(
    (activity) =>
      activity.id === activityId,
  );

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    } as const;
  }

  return {
    previous:
      currentIndex > 0
        ? activities[currentIndex - 1]
        : undefined,
    next:
      currentIndex < activities.length - 1
        ? activities[currentIndex + 1]
        : undefined,
  } as const;
}

export type ExperiencePageContent =
  ReturnType<typeof getExperiencePage>;