import type { ExperienceId } from "@/content/experience/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import { getIscatPlatformContent } from "./items/iscat-platform/iscat-platform";
import { getLxpCampusContent } from "./items/lxp-campus/lxp-campus";
import { getMedicalMicroscopeContent } from "./items/medical-microscope/medical-microscope";
import { getMllpaProjectContent } from "./items/mllpa-project/mllpa-project";
import { getMolecularCommunicationContent } from "./items/molecular-communication/molecular-communication";
import enProjectsPageJson from "./page.en.json";
import frProjectsPageJson from "./page.fr.json";
import {
  projectOrder,
  type ProjectId,
} from "./registry";

const localizedProjectsPageContent = {
  fr: frProjectsPageJson,
  en: enProjectsPageJson,
} as const;

export function getProjectsPage(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedProjectsPageContent,
    language,
  );

  return {
    ...localized,
    projectIds: projectOrder,
  } as const;
}

function getProjectCollectionById(
  language: SupportedLanguage,
) {
  return {
    "lxp-campus":
      getLxpCampusContent(language),
    "molecular-communication":
      getMolecularCommunicationContent(
        language,
      ),
    "iscat-platform":
      getIscatPlatformContent(language),
    "mllpa-project":
      getMllpaProjectContent(language),
    "medical-microscope":
      getMedicalMicroscopeContent(language),
  } as const satisfies Readonly<
    Record<ProjectId, unknown>
  >;
}

export function getProjectCollection(
  language: SupportedLanguage,
) {
  const collectionById =
    getProjectCollectionById(language);

  return projectOrder.map(
    (projectId) =>
      collectionById[projectId],
  );
}

export function getProjectById(
  language: SupportedLanguage,
  projectId: string,
) {
  return getProjectCollection(language).find(
    (project) =>
      project.id === projectId,
  );
}

export function getProjectsByIds(
  language: SupportedLanguage,
  projectIds: readonly ProjectId[],
) {
  const collectionById =
    getProjectCollectionById(language);

  return projectIds.map(
    (projectId) =>
      collectionById[projectId],
  );
}

export function getProjectsByExperienceId(
  language: SupportedLanguage,
  experienceId: ExperienceId,
) {
  return getProjectCollection(language).filter(
    (project) =>
      project.experienceIds.some(
        (candidateExperienceId) =>
          candidateExperienceId ===
          experienceId,
      ),
  );
}

export function getProjectNavigation(
  language: SupportedLanguage,
  projectId: string,
) {
  const projects =
    getProjectCollection(language);

  const currentIndex = projects.findIndex(
    (project) =>
      project.id === projectId,
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
        ? projects[currentIndex - 1]
        : undefined,
    next:
      currentIndex <
      projects.length - 1
        ? projects[currentIndex + 1]
        : undefined,
  } as const;
}

export type ProjectsPageContent =
  ReturnType<typeof getProjectsPage>;