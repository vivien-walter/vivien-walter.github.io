import type { ExperienceId } from '@/content/experience/registry';
import type { SupportedLanguage } from '@/types/localization';

import { getIscatPlatformContent } from './items/iscat-platform';
import { getLipidMembranesContent } from './items/lipid-membranes';
import { getLxpCampusContent } from './items/lxp-campus';
import { getMolecularCommunicationContent } from './items/molecular-communication';
import { getMolecularDynamicsContent } from './items/molecular-dynamics';
import { type ProjectId, projectOrder } from './registry';

export const publishedProjectIds = projectOrder;

function getProjectCollectionById(language: SupportedLanguage) {
  return {
    'lxp-campus': getLxpCampusContent(language),
    'molecular-communication': getMolecularCommunicationContent(language),
    'iscat-platform': getIscatPlatformContent(language),
    'molecular-dynamics': getMolecularDynamicsContent(language),
    'lipid-membranes': getLipidMembranesContent(language),
  } as const satisfies Readonly<Record<ProjectId, unknown>>;
}

export function getProjectCollection(language: SupportedLanguage) {
  const collectionById = getProjectCollectionById(language);

  return publishedProjectIds.map((projectId) => collectionById[projectId]);
}

export function getProjectById(language: SupportedLanguage, projectId: string) {
  return getProjectCollection(language).find((project) => project.id === projectId);
}

export function getProjectsByIds(language: SupportedLanguage, projectIds: readonly ProjectId[]) {
  const collectionById = getProjectCollectionById(language);

  return projectIds.map((projectId) => collectionById[projectId]);
}

export function getProjectsByExperienceId(language: SupportedLanguage, experienceId: ExperienceId) {
  return getProjectCollection(language).filter((project) =>
    project.experienceIds.some((candidateExperienceId) => candidateExperienceId === experienceId),
  );
}

export type ProjectCatalogItem = ReturnType<typeof getProjectCollection>[number];
