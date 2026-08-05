import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SoftwareId } from '@/content/software/registry';
import type { SupportedLanguage } from '@/types/localization';

import { getBbaRipplePhase2021Content } from './bba-ripple-phase-2021';
import { getBiophysJCppelp2024Content } from './biophysj-cppelp-2024';
import { getIeeeMolecularCommunication2026Content } from './ieee-molecular-communication-2026';
import { getjacsIScat2023Content } from './jacs-iscat-2023';
import { getJCompChemMllpa2021Content } from './jcompchem-mllpa-2021';
import { getJMicroscopyIScat2025Content } from './jmicroscopy-iscat-2025';
import { getLangmuirDragonfly2019Content } from './langmuir-dragonfly-2019';
import { getNatureCppelp2017Content } from './nature-cppelp-2017';
import { getNatureIScat2025Content } from './nature-iscat-2025';
import { getNatureMolecularCommunication2023Content } from './nature-molecular-communication-2023';
import { getPccpMllpa2020Content } from './pccp-mllpa-2020';
import { type PublicationId, publicationOrder } from './registry';
import { getThesis2017Content } from './thesis-2017';

export const publishedPublicationIds = publicationOrder;

function getPublicationCollectionById(language: SupportedLanguage) {
  return {
    'nature-molecular-communication-2023': getNatureMolecularCommunication2023Content(language),
    'bba-ripple-phase-2021': getBbaRipplePhase2021Content(language),
    'jacs-iscat-2023': getjacsIScat2023Content(language),
    'nature-iscat-2025': getNatureIScat2025Content(language),
    'ieee-molecular-communication-2026': getIeeeMolecularCommunication2026Content(language),
    'jmicroscopy-iscat-2025': getJMicroscopyIScat2025Content(language),
    'biophysj-cppelp-2024': getBiophysJCppelp2024Content(language),
    'jcompchem-mllpa-2021': getJCompChemMllpa2021Content(language),
    'pccp-mllpa-2020': getPccpMllpa2020Content(language),
    'langmuir-dragonfly-2019': getLangmuirDragonfly2019Content(language),
    'nature-cppelp-2017': getNatureCppelp2017Content(language),
    'thesis-2017': getThesis2017Content(language),
  } as const satisfies Readonly<Record<PublicationId, unknown>>;
}

export function getPublicationCollection(language: SupportedLanguage) {
  const collectionById = getPublicationCollectionById(language);

  return publishedPublicationIds.map((publicationId) => collectionById[publicationId]);
}

export function getPublicationById(language: SupportedLanguage, publicationId: string) {
  return getPublicationCollection(language).find((publication) => publication.id === publicationId);
}

export function getPublicationsByIds(language: SupportedLanguage, publicationIds: readonly PublicationId[]) {
  const collectionById = getPublicationCollectionById(language);

  return publicationIds.map((publicationId) => collectionById[publicationId]);
}

export function getPublicationsByThemeId(language: SupportedLanguage, themeId: ResearchThemeId) {
  return getPublicationCollection(language).filter((publication) => publication.themeIds.some((candidateThemeId) => candidateThemeId === themeId));
}

export function getPublicationsByProjectId(language: SupportedLanguage, projectId: ProjectId) {
  return getPublicationCollection(language).filter((publication) =>
    publication.projectIds.some((candidateProjectId) => candidateProjectId === projectId),
  );
}

export function getPublicationsBySoftwareId(language: SupportedLanguage, softwareId: SoftwareId) {
  return getPublicationCollection(language).filter((publication) =>
    publication.softwareIds.some((candidateSoftwareId) => candidateSoftwareId === softwareId),
  );
}

export function getPublicationsByExperienceId(language: SupportedLanguage, experienceId: ExperienceId) {
  return getPublicationCollection(language).filter((publication) =>
    publication.experienceIds.some((candidateExperienceId) => candidateExperienceId === experienceId),
  );
}

export type PublicationCatalogItem = ReturnType<typeof getPublicationCollection>[number];
