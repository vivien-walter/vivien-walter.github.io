import { publicProfile } from "@/content/common/profile";
import type { ExperienceId } from "@/content/experience/registry";
import type { ProjectId } from "@/content/projects/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import { getMllpaContent } from "./items/mllpa/mllpa";
import enSoftwarePageJson from "./page.en.json";
import frSoftwarePageJson from "./page.fr.json";
import {
  featuredSoftwareIds,
  softwareOrder,
  type SoftwareId,
} from "./registry";

const localizedSoftwarePageContent = {
  fr: frSoftwarePageJson,
  en: enSoftwarePageJson,
} as const;

function getGithubProfile() {
  const githubProfile =
    publicProfile.externalLinks.find(
      (link) => link.id === "github",
    );

  if (!githubProfile) {
    throw new Error(
      "Missing GitHub public profile link.",
    );
  }

  return githubProfile;
}

export function getSoftwarePage(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedSoftwarePageContent,
    language,
  );

  const githubProfile = getGithubProfile();
  const mllpa = getMllpaContent(language);
  const [mllpaWebsite] = mllpa.resources;

  const githubResource = {
    id: "github",
    icon: githubProfile.icon,
    label: localized.hero.githubAction,
    href: githubProfile.href,
  } as const;

  return {
    ...localized,
    softwareIds: softwareOrder,
    featuredSoftwareIds,
    githubResource,
    resources: [
      githubResource,
      {
        id: "mllpa-website",
        ...mllpaWebsite,
      },
    ],
  } as const;
}

function getSoftwareCollectionById(
  language: SupportedLanguage,
) {
  return {
    mllpa: getMllpaContent(language),
  } as const satisfies Readonly<
    Record<SoftwareId, unknown>
  >;
}

export function getSoftwareCollection(
  language: SupportedLanguage,
) {
  const collectionById =
    getSoftwareCollectionById(language);

  return softwareOrder.map(
    (softwareId) =>
      collectionById[softwareId],
  );
}

export function getSoftwareById(
  language: SupportedLanguage,
  softwareId: string,
) {
  return getSoftwareCollection(language).find(
    (software) =>
      software.id === softwareId,
  );
}

export function getSoftwareByIds(
  language: SupportedLanguage,
  softwareIds: readonly SoftwareId[],
) {
  const collectionById =
    getSoftwareCollectionById(language);

  return softwareIds.map(
    (softwareId) =>
      collectionById[softwareId],
  );
}

export function getSoftwareByProjectId(
  language: SupportedLanguage,
  projectId: ProjectId,
) {
  return getSoftwareCollection(
    language,
  ).filter((software) =>
    software.projectIds.some(
      (candidateProjectId) =>
        candidateProjectId === projectId,
    ),
  );
}

export function getSoftwareByExperienceId(
  language: SupportedLanguage,
  experienceId: ExperienceId,
) {
  return getSoftwareCollection(
    language,
  ).filter((software) =>
    software.experienceIds.some(
      (candidateExperienceId) =>
        candidateExperienceId ===
        experienceId,
    ),
  );
}

export function getSoftwareNavigation(
  language: SupportedLanguage,
  softwareId: string,
) {
  const softwareCollection =
    getSoftwareCollection(language);

  const currentIndex =
    softwareCollection.findIndex(
      (software) =>
        software.id === softwareId,
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
        ? softwareCollection[
            currentIndex - 1
          ]
        : undefined,
    next:
      currentIndex <
      softwareCollection.length - 1
        ? softwareCollection[
            currentIndex + 1
          ]
        : undefined,
  } as const;
}

export type SoftwarePageContent =
  ReturnType<typeof getSoftwarePage>;