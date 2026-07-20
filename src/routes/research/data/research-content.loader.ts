import enPublicationIndexJson from "../../../locales/en/research/index.json";
import enPublicationsJson from "../../../locales/en/research/publications.json";
import enResearchPageJson from "../../../locales/en/research/page.json";
import frPublicationIndexJson from "../../../locales/fr/research/index.json";
import frPublicationsJson from "../../../locales/fr/research/publications.json";
import frResearchPageJson from "../../../locales/fr/research/page.json";
import type { SupportedLanguage } from "../../../navigation";
import type {
  ContentId,
  ContentIndex,
} from "../../../shared/content/content.types";
import {
  selectLocalizedContent,
  type LocalizedContent,
} from "../../../shared/content/localized-content";
import type {
  PublicationCollection,
  PublicationContent,
} from "./publication-content.types";
import type { ResearchContent } from "./research-content.types";

const frResearchPage = frResearchPageJson satisfies ResearchContent;
const enResearchPage = enResearchPageJson satisfies ResearchContent;

const frPublicationIndex = frPublicationIndexJson satisfies ContentIndex;
const enPublicationIndex = enPublicationIndexJson satisfies ContentIndex;

const frPublications = frPublicationsJson satisfies PublicationCollection;
const enPublications = enPublicationsJson satisfies PublicationCollection;

const localizedResearchPages: LocalizedContent<ResearchContent> = {
  fr: frResearchPage,
  en: enResearchPage,
};

const localizedPublicationIndexes: LocalizedContent<ContentIndex> = {
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
  return selectLocalizedContent(localizedPublicationCollections, language);
}

function hasOwnPublication(
  publications: PublicationCollection,
  id: ContentId | undefined,
): id is ContentId {
  return (
    id !== undefined && Object.prototype.hasOwnProperty.call(publications, id)
  );
}

export function getResearchPage(language: SupportedLanguage): ResearchContent {
  return selectLocalizedContent(localizedResearchPages, language);
}

export function getPublicationIndex(language: SupportedLanguage): ContentIndex {
  return selectLocalizedContent(localizedPublicationIndexes, language);
}

export function getPublicationById(
  language: SupportedLanguage,
  id: ContentId,
): PublicationContent | undefined {
  const publications = getPublicationCollection(language);

  return hasOwnPublication(publications, id) ? publications[id] : undefined;
}
