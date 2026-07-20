import enSoftwareIndexJson from "../../../locales/en/software/index.json";
import enMllpaJson from "../../../locales/en/software/items/mllpa.json";
import enSoftwarePageJson from "../../../locales/en/software/page.json";
import frSoftwareIndexJson from "../../../locales/fr/software/index.json";
import frMllpaJson from "../../../locales/fr/software/items/mllpa.json";
import frSoftwarePageJson from "../../../locales/fr/software/page.json";
import type { SupportedLanguage } from "../../../navigation";
import type {
  ContentId,
  ContentIndex,
  ContentPage,
} from "../../../shared/content/content.types";
import {
  selectLocalizedContent,
  type LocalizedContent,
} from "../../../shared/content/localized-content";
import type {
  SoftwareCollection,
  SoftwareContent,
} from "./software-content.types";

const frSoftwarePage = frSoftwarePageJson satisfies ContentPage;
const enSoftwarePage = enSoftwarePageJson satisfies ContentPage;

const frSoftwareIndex = frSoftwareIndexJson satisfies ContentIndex;
const enSoftwareIndex = enSoftwareIndexJson satisfies ContentIndex;

const frSoftware = {
  mllpa: frMllpaJson,
} satisfies SoftwareCollection;

const enSoftware = {
  mllpa: enMllpaJson,
} satisfies SoftwareCollection;

const localizedSoftwarePages: LocalizedContent<ContentPage> = {
  fr: frSoftwarePage,
  en: enSoftwarePage,
};

const localizedSoftwareIndexes: LocalizedContent<ContentIndex> = {
  fr: frSoftwareIndex,
  en: enSoftwareIndex,
};

const localizedSoftwareCollections: LocalizedContent<SoftwareCollection> = {
  fr: frSoftware,
  en: enSoftware,
};

function getSoftwareCollection(
  language: SupportedLanguage,
): SoftwareCollection {
  return selectLocalizedContent(localizedSoftwareCollections, language);
}

function hasOwnSoftware(
  software: SoftwareCollection,
  id: ContentId | undefined,
): id is ContentId {
  return id !== undefined && Object.prototype.hasOwnProperty.call(software, id);
}

export function getSoftwarePage(language: SupportedLanguage): ContentPage {
  return selectLocalizedContent(localizedSoftwarePages, language);
}

export function getSoftwareIndex(language: SupportedLanguage): ContentIndex {
  return selectLocalizedContent(localizedSoftwareIndexes, language);
}

export function getSoftwareById(
  language: SupportedLanguage,
  id: ContentId,
): SoftwareContent | undefined {
  const software = getSoftwareCollection(language);

  return hasOwnSoftware(software, id) ? software[id] : undefined;
}

export function getAdjacentSoftwareIds(
  language: SupportedLanguage,
  id: ContentId,
): {
  readonly previousId?: ContentId;
  readonly nextId?: ContentId;
} {
  const index = getSoftwareIndex(language);
  const software = getSoftwareCollection(language);
  const position = index.order.indexOf(id);

  if (position === -1 || !hasOwnSoftware(software, id)) {
    return {};
  }

  const previousId = index.order[position - 1];
  const nextId = index.order[position + 1];

  return {
    ...(hasOwnSoftware(software, previousId) ? { previousId } : {}),
    ...(hasOwnSoftware(software, nextId) ? { nextId } : {}),
  };
}
