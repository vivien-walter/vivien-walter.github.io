import enProjectIndexJson from "@/locales/en/projects/index.json";
import enIscatPlatformJson from "@/locales/en/projects/items/iscat-platform.json";
import enLxpCampusJson from "@/locales/en/projects/items/lxp-campus.json";
import enMedicalMicroscopeJson from "@/locales/en/projects/items/medical-microscope.json";
import enMllpaProjectJson from "@/locales/en/projects/items/mllpa-project.json";
import enMolecularCommunicationJson from "@/locales/en/projects/items/molecular-communication.json";
import enProjectPageJson from "@/locales/en/projects/page.json";
import frProjectIndexJson from "@/locales/fr/projects/index.json";
import frIscatPlatformJson from "@/locales/fr/projects/items/iscat-platform.json";
import frLxpCampusJson from "@/locales/fr/projects/items/lxp-campus.json";
import frMedicalMicroscopeJson from "@/locales/fr/projects/items/medical-microscope.json";
import frMllpaProjectJson from "@/locales/fr/projects/items/mllpa-project.json";
import frMolecularCommunicationJson from "@/locales/fr/projects/items/molecular-communication.json";
import frProjectPageJson from "@/locales/fr/projects/page.json";
import type {
  ContentId,
  ContentIndex,
  ContentPage,
} from "@/shared/content/content.types";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type {
  ProjectCollection,
  ProjectContent,
} from "./project-content.types";

const frProjectPage = frProjectPageJson satisfies ContentPage;
const enProjectPage = enProjectPageJson satisfies ContentPage;

const frProjectIndex = frProjectIndexJson satisfies ContentIndex;
const enProjectIndex = enProjectIndexJson satisfies ContentIndex;

const frProjects = {
  "lxp-campus": frLxpCampusJson,
  "molecular-communication": frMolecularCommunicationJson,
  "iscat-platform": frIscatPlatformJson,
  "mllpa-project": frMllpaProjectJson,
  "medical-microscope": frMedicalMicroscopeJson,
} satisfies ProjectCollection;

const enProjects = {
  "lxp-campus": enLxpCampusJson,
  "molecular-communication": enMolecularCommunicationJson,
  "iscat-platform": enIscatPlatformJson,
  "mllpa-project": enMllpaProjectJson,
  "medical-microscope": enMedicalMicroscopeJson,
} satisfies ProjectCollection;

const localizedProjectPages: LocalizedContent<ContentPage> = {
  fr: frProjectPage,
  en: enProjectPage,
};

const localizedProjectIndexes: LocalizedContent<ContentIndex> = {
  fr: frProjectIndex,
  en: enProjectIndex,
};

const localizedProjectCollections: LocalizedContent<ProjectCollection> = {
  fr: frProjects,
  en: enProjects,
};

function getProjectCollection(language: SupportedLanguage): ProjectCollection {
  return selectLocalizedContent(localizedProjectCollections, language);
}

function hasOwnProject(
  projects: ProjectCollection,
  id: ContentId | undefined,
): id is ContentId {
  return id !== undefined && Object.prototype.hasOwnProperty.call(projects, id);
}

export function getProjectPage(language: SupportedLanguage): ContentPage {
  return selectLocalizedContent(localizedProjectPages, language);
}

export function getProjectIndex(language: SupportedLanguage): ContentIndex {
  return selectLocalizedContent(localizedProjectIndexes, language);
}

export function getProjectById(
  language: SupportedLanguage,
  id: ContentId,
): ProjectContent | undefined {
  const projects = getProjectCollection(language);

  return hasOwnProject(projects, id) ? projects[id] : undefined;
}

export function getAdjacentProjectIds(
  language: SupportedLanguage,
  id: ContentId,
): {
  readonly previousId?: ContentId;
  readonly nextId?: ContentId;
} {
  const index = getProjectIndex(language);
  const projects = getProjectCollection(language);
  const position = index.order.indexOf(id);

  if (position === -1 || !hasOwnProject(projects, id)) {
    return {};
  }

  const previousId = index.order[position - 1];
  const nextId = index.order[position + 1];

  return {
    ...(hasOwnProject(projects, previousId) ? { previousId } : {}),
    ...(hasOwnProject(projects, nextId) ? { nextId } : {}),
  };
}