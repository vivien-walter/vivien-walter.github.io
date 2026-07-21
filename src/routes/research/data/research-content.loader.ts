import enPublicationIndexJson from "@/locales/en/research/index.json";
import enPublicationsJson from "@/locales/en/research/publications.json";
import enResearchPageJson from "@/locales/en/research/page.json";
import frPublicationIndexJson from "@/locales/fr/research/index.json";
import frPublicationsJson from "@/locales/fr/research/publications.json";
import frResearchPageJson from "@/locales/fr/research/page.json";
import type {
  ContentId,
  ContentIndex,
} from "@/shared/content/content.types";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type {
  PublicationCollection,
  PublicationContent,
  PublicationKind,
} from "./publication-content.types";
import type {
  ResearchContent,
  ResearchThemeIcon,
} from "./research-content.types";

export type AdjacentPublicationIds = {
  readonly previousId?: ContentId;
  readonly nextId?: ContentId;
};

function parseResearchThemeIcon(
  icon: string,
): ResearchThemeIcon {
  switch (icon) {
    case "molecular-interfaces":
    case "optics-photonics":
    case "molecular-communication":
      return icon;

    default:
      throw new Error(
        `Icône de thématique de recherche inconnue : ${icon}`,
      );
  }
}

function parsePublicationKind(
  kind: string,
): PublicationKind {
  switch (kind) {
    case "article":
    case "thesis":
      return kind;

    default:
      throw new Error(
        `Type de publication inconnu : ${kind}`,
      );
  }
}

function parseResearchContent(
  source:
    | typeof frResearchPageJson
    | typeof enResearchPageJson,
): ResearchContent {
  return {
    ...source,
    themes: source.themes.map((theme) => ({
      ...theme,
      icon: parseResearchThemeIcon(theme.icon),
    })),
  };
}

function parsePublicationCollection(
  source:
    | typeof frPublicationsJson
    | typeof enPublicationsJson,
): PublicationCollection {
  const publications: Record<
    ContentId,
    PublicationContent
  > = {};

  for (const [publicationId, publication] of Object.entries(
    source,
  )) {
    publications[publicationId] = {
      ...publication,
      kind: parsePublicationKind(publication.kind),
    };
  }

  return publications;
}

const frResearchPage = parseResearchContent(
  frResearchPageJson,
);

const enResearchPage = parseResearchContent(
  enResearchPageJson,
);

const frPublicationIndex =
  frPublicationIndexJson satisfies ContentIndex;

const enPublicationIndex =
  enPublicationIndexJson satisfies ContentIndex;

const frPublications = parsePublicationCollection(
  frPublicationsJson,
);

const enPublications = parsePublicationCollection(
  enPublicationsJson,
);

const localizedResearchPages: LocalizedContent<ResearchContent> =
  {
    fr: frResearchPage,
    en: enResearchPage,
  };

const localizedPublicationIndexes: LocalizedContent<ContentIndex> =
  {
    fr: frPublicationIndex,
    en: enPublicationIndex,
  };

const localizedPublicationCollections: LocalizedContent<PublicationCollection> =
  {
    fr: frPublications,
    en: enPublications,
  };

function getPublicationCollection(
  language: SupportedLanguage,
): PublicationCollection {
  return selectLocalizedContent(
    localizedPublicationCollections,
    language,
  );
}

function hasOwnPublication(
  publications: PublicationCollection,
  id: ContentId | undefined,
): id is ContentId {
  return (
    id !== undefined &&
    Object.prototype.hasOwnProperty.call(
      publications,
      id,
    )
  );
}

export function getResearchPage(
  language: SupportedLanguage,
): ResearchContent {
  return selectLocalizedContent(
    localizedResearchPages,
    language,
  );
}

export function getResearchThemeById(
  language: SupportedLanguage,
  id: ContentId,
): NonNullable<
  ResearchContent["themes"]
>[number] | undefined {
  const themes =
    getResearchPage(language).themes ?? [];

  return themes.find((theme) => theme.id === id);
}

export function getPublicationIndex(
  language: SupportedLanguage,
): ContentIndex {
  return selectLocalizedContent(
    localizedPublicationIndexes,
    language,
  );
}

export function getPublicationById(
  language: SupportedLanguage,
  id: ContentId,
): PublicationContent | undefined {
  const publications =
    getPublicationCollection(language);

  return hasOwnPublication(publications, id)
    ? publications[id]
    : undefined;
}

export function getAdjacentPublicationIds(
  language: SupportedLanguage,
  publicationId: ContentId,
): AdjacentPublicationIds {
  const publicationOrder =
    getPublicationIndex(language).order;

  const currentIndex =
    publicationOrder.indexOf(publicationId);

  if (currentIndex < 0) {
    return {};
  }

  return {
    previousId:
      currentIndex > 0
        ? publicationOrder[currentIndex - 1]
        : undefined,
    nextId:
      currentIndex <
      publicationOrder.length - 1
        ? publicationOrder[currentIndex + 1]
        : undefined,
  };
}