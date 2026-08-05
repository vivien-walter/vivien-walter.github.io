import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import type { SupportedLanguage } from '@/types/localization';

import { getFormaoContent } from './items/formao';
import { getHPyMonContent } from './items/hpymon';
import { getIscanContent } from './items/iscan';
import { getMd2StlContent } from './items/md2stl';
import { getMicroImageContent } from './items/micro-image';
import { getMllpaContent } from './items/mllpa';
import { getMolCommContent } from './items/molcomm';
import { getQrGeneratorContent } from './items/qr-generator';
import { getSentryContent } from './items/sentry';
import { type SoftwareId, softwareOrder } from './registry';

export const publishedSoftwareIds = softwareOrder;

function getSoftwareCollectionById(language: SupportedLanguage) {
  return {
    mllpa: getMllpaContent(language),
    hpymon: getHPyMonContent(language),
    formao: getFormaoContent(language),
    iscan: getIscanContent(language),
    'micro-image': getMicroImageContent(language),
    md2stl: getMd2StlContent(language),
    'qr-generator': getQrGeneratorContent(language),
    sentry: getSentryContent(language),
    molcomm: getMolCommContent(language),
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
