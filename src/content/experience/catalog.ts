import type { SupportedLanguage } from '@/types/localization';

import { getConsultantMicroscopeContent } from './experiences/consultant-microscope';
import { getImaginexrContent } from './experiences/imaginexr';
import { getKclIscatContent } from './experiences/kcl-iscat';
import { getKclMolecularCommunicationContent } from './experiences/kcl-molecular-communication';
import { getStrasbourgMllpaContent } from './experiences/strasbourg-mllpa';
import { getStrasbourgThesisContent } from './experiences/strasbourg-thesis';
import { getTeachingAiContent } from './experiences/teaching-ai';
import { getTeachingThermodynamicsContent } from './experiences/teaching-thermodynamics';
import { getBoardgamesContent } from './personal-activities/boardgames';
import { getMusicContent } from './personal-activities/music';
import { type ExperienceId, experienceOrder, type PersonalActivityId, personalActivityOrder } from './registry';

export const publishedExperienceIds = experienceOrder;

export const publishedPersonalActivityIds = personalActivityOrder;

function getExperienceCollectionById(language: SupportedLanguage) {
  return {
    imaginexr: getImaginexrContent(language),
    'kcl-molecular-communication': getKclMolecularCommunicationContent(language),
    'teaching-thermodynamics': getTeachingThermodynamicsContent(language),
    'teaching-ai': getTeachingAiContent(language),
    'consultant-microscope': getConsultantMicroscopeContent(language),
    'kcl-iscat': getKclIscatContent(language),
    'strasbourg-mllpa': getStrasbourgMllpaContent(language),
    'strasbourg-thesis': getStrasbourgThesisContent(language),
  } as const satisfies Readonly<Record<ExperienceId, unknown>>;
}

export function getExperienceCollection(language: SupportedLanguage) {
  const collectionById = getExperienceCollectionById(language);

  return publishedExperienceIds.map((experienceId) => collectionById[experienceId]);
}

export function getExperienceById(language: SupportedLanguage, experienceId: string) {
  return getExperienceCollection(language).find((experience) => experience.id === experienceId);
}

export function getExperiencesByIds(language: SupportedLanguage, experienceIds: readonly ExperienceId[]) {
  const collectionById = getExperienceCollectionById(language);

  return experienceIds.map((experienceId) => collectionById[experienceId]);
}

function getPersonalActivityCollectionById(language: SupportedLanguage) {
  return {
    music: getMusicContent(language),
    boardgames: getBoardgamesContent(language),
  } as const satisfies Readonly<Record<PersonalActivityId, unknown>>;
}

export function getPersonalActivityCollection(language: SupportedLanguage) {
  const collectionById = getPersonalActivityCollectionById(language);

  return publishedPersonalActivityIds.map((activityId) => collectionById[activityId]);
}

export function getPersonalActivityById(language: SupportedLanguage, activityId: string) {
  return getPersonalActivityCollection(language).find((activity) => activity.id === activityId);
}

export function getPersonalActivitiesByIds(language: SupportedLanguage, activityIds: readonly PersonalActivityId[]) {
  const collectionById = getPersonalActivityCollectionById(language);

  return activityIds.map((activityId) => collectionById[activityId]);
}

export type ExperienceCatalogItem = ReturnType<typeof getExperienceCollection>[number];

export type PersonalActivityCatalogItem = ReturnType<typeof getPersonalActivityCollection>[number];
