import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import type { SupportedLanguage } from '@/types/localization';

import { getFormaoContent } from './items/formao/formao';
import { getHPyMonContent } from './items/hpymon/hpymon';
import { getMllpaContent } from './items/mllpa/mllpa';
import { type SoftwareId, softwareOrder } from './registry';

export const publishedSoftwareIds = softwareOrder;

function getSoftwareCollectionById(language: SupportedLanguage) {
  return {
    mllpa: getMllpaContent(language),
    hpymon: getHPyMonContent(language),
    formao: getFormaoContent(language),
  } as const satisfies Readonly<Record<SoftwareId, unknown>>;
}

export function getSoftwareCollection(language: SupportedLanguage) {
  const collectionById = getSoftwareCollectionById(language);

  return publishedSoftwareIds.map((softwareId) => collectionById[softwareId]);
}

export function getSoftwareById(language: SupportedLanguage, softwareId: string) {
  return getSoftwareCollection(language).find((software) => software.id === softwareId);
}

export function getSoftwareByIds(language: SupportedLanguage, softwareIds: readonly SoftwareId[]) {
  const collectionById = getSoftwareCollectionById(language);

  return softwareIds.map((softwareId) => collectionById[softwareId]);
}

export function getSoftwareByProjectId(language: SupportedLanguage, projectId: ProjectId) {
  return getSoftwareCollection(language).filter((software) => software.projectIds.some((candidateProjectId) => candidateProjectId === projectId));
}

export function getSoftwareByExperienceId(language: SupportedLanguage, experienceId: ExperienceId) {
  return getSoftwareCollection(language).filter((software) =>
    software.experienceIds.some((candidateExperienceId) => candidateExperienceId === experienceId),
  );
}

export type SoftwareCatalogItem = ReturnType<typeof getSoftwareCollection>[number];
