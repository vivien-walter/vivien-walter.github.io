import type { Icon } from "@phosphor-icons/react";

import { publicProfile } from "@/content/common/profile";
import type { ExperienceId } from "@/content/experience/registry";
import type { ProjectId } from "@/content/projects/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import enResearchPageJson from "./page.en.json";
import frResearchPageJson from "./page.fr.json";
import { getNatureMolecularCommunication2023Content } from "./publications/nature-molecular-communication-2023/nature-molecular-communication-2023";
import {
  publicationOrder,
  type PublicationId,
} from "./publications/registry";
import {
  researchThemeOrder,
  type ResearchThemeId,
} from "./registry";
import { getMolecularCommunicationContent } from "./themes/molecular-communication/molecular-communication";
import { getMolecularInterfacesContent } from "./themes/molecular-interfaces/molecular-interfaces";
import { getOpticsPhotonicsContent } from "./themes/optics-photonics/optics-photonics";

export const researchResourceOrder = [
  "github",
  "orcid",
  "linkedin",
] as const;

export type ResearchResourceId =
  (typeof researchResourceOrder)[number];

export type ResearchResource = {
  readonly id: ResearchResourceId;
  readonly icon: Icon;
  readonly label: string;
  readonly href: string;
};

const localizedResearchPageContent = {
  fr: frResearchPageJson,
  en: enResearchPageJson,
} as const;

function getPublicProfileLink(
  id: ResearchResourceId,
): (typeof publicProfile.externalLinks)[number] {
  const link = publicProfile.externalLinks.find(
    (candidate) => candidate.id === id,
  );

  if (!link) {
    throw new Error(
      `Missing public profile link: ${id}`,
    );
  }

  return link;
}

export function getResearchPage(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedResearchPageContent,
    language,
  );

  const resources: readonly ResearchResource[] =
    researchResourceOrder.map((id) => {
      const profileLink =
        getPublicProfileLink(id);

      return {
        id,
        icon: profileLink.icon,
        label: localized.resourceLabels[id],
        href: profileLink.href,
      };
    });

  return {
    ...localized,
    themeIds: researchThemeOrder,
    publicationIds: publicationOrder,
    resources,
  } as const;
}

function getResearchThemeCollectionById(
  language: SupportedLanguage,
) {
  return {
    "molecular-interfaces":
      getMolecularInterfacesContent(language),
    "optics-photonics":
      getOpticsPhotonicsContent(language),
    "molecular-communication":
      getMolecularCommunicationContent(
        language,
      ),
  } as const satisfies Readonly<
    Record<ResearchThemeId, unknown>
  >;
}

export function getResearchThemeCollection(
  language: SupportedLanguage,
) {
  const collectionById =
    getResearchThemeCollectionById(language);

  return researchThemeOrder.map(
    (themeId) => collectionById[themeId],
  );
}

export function getResearchThemeById(
  language: SupportedLanguage,
  themeId: string,
) {
  return getResearchThemeCollection(
    language,
  ).find(
    (theme) => theme.id === themeId,
  );
}

export function getResearchThemesByIds(
  language: SupportedLanguage,
  themeIds: readonly ResearchThemeId[],
) {
  const collectionById =
    getResearchThemeCollectionById(language);

  return themeIds.map(
    (themeId) => collectionById[themeId],
  );
}

export function getResearchThemeNavigation(
  language: SupportedLanguage,
  themeId: string,
) {
  const themes =
    getResearchThemeCollection(language);

  const currentIndex = themes.findIndex(
    (theme) => theme.id === themeId,
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
        ? themes[currentIndex - 1]
        : undefined,
    next:
      currentIndex <
      themes.length - 1
        ? themes[currentIndex + 1]
        : undefined,
  } as const;
}

function getPublicationCollectionById(
  language: SupportedLanguage,
) {
  return {
    "nature-molecular-communication-2023":
      getNatureMolecularCommunication2023Content(
        language,
      ),
  } as const satisfies Readonly<
    Record<PublicationId, unknown>
  >;
}

export function getPublicationCollection(
  language: SupportedLanguage,
) {
  const collectionById =
    getPublicationCollectionById(language);

  return publicationOrder.map(
    (publicationId) =>
      collectionById[publicationId],
  );
}

export function getPublicationById(
  language: SupportedLanguage,
  publicationId: string,
) {
  return getPublicationCollection(
    language,
  ).find(
    (publication) =>
      publication.id === publicationId,
  );
}

export function getPublicationsByIds(
  language: SupportedLanguage,
  publicationIds: readonly PublicationId[],
) {
  const collectionById =
    getPublicationCollectionById(language);

  return publicationIds.map(
    (publicationId) =>
      collectionById[publicationId],
  );
}

export function getPublicationsByThemeId(
  language: SupportedLanguage,
  themeId: ResearchThemeId,
) {
  return getPublicationCollection(
    language,
  ).filter((publication) =>
    publication.themeIds.some(
      (candidateThemeId) =>
        candidateThemeId === themeId,
    ),
  );
}

export function getPublicationsByProjectId(
  language: SupportedLanguage,
  projectId: ProjectId,
) {
  return getPublicationCollection(
    language,
  ).filter((publication) =>
    publication.projectIds.some(
      (candidateProjectId) =>
        candidateProjectId === projectId,
    ),
  );
}

export function getPublicationsByExperienceId(
  language: SupportedLanguage,
  experienceId: ExperienceId,
) {
  return getPublicationCollection(
    language,
  ).filter((publication) =>
    publication.experienceIds.some(
      (candidateExperienceId) =>
        candidateExperienceId ===
        experienceId,
    ),
  );
}

export function getPublicationNavigation(
  language: SupportedLanguage,
  publicationId: string,
) {
  const publications =
    getPublicationCollection(language);

  const currentIndex =
    publications.findIndex(
      (publication) =>
        publication.id === publicationId,
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
        ? publications[currentIndex - 1]
        : undefined,
    next:
      currentIndex <
      publications.length - 1
        ? publications[currentIndex + 1]
        : undefined,
  } as const;
}

export type ResearchPageContent =
  ReturnType<typeof getResearchPage>;