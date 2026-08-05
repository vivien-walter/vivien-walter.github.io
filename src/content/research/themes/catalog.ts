import type { SupportedLanguage } from '@/types/localization';

import { type ResearchThemeId, researchThemeOrder } from '../registry';
import { getMolecularCommunicationContent } from './molecular-communication';
import { getMolecularInterfacesContent } from './molecular-interfaces';
import { getOpticsPhotonicsContent } from './optics-photonics';

export const publishedResearchThemeIds = researchThemeOrder;

function getResearchThemeCollectionById(language: SupportedLanguage) {
  return {
    'molecular-interfaces': getMolecularInterfacesContent(language),
    'optics-photonics': getOpticsPhotonicsContent(language),
    'molecular-communication': getMolecularCommunicationContent(language),
  } as const satisfies Readonly<Record<ResearchThemeId, unknown>>;
}

export function getResearchThemeCollection(language: SupportedLanguage) {
  const collectionById = getResearchThemeCollectionById(language);

  return publishedResearchThemeIds.map((themeId) => collectionById[themeId]);
}

export function getResearchThemeById(language: SupportedLanguage, themeId: string) {
  return getResearchThemeCollection(language).find((theme) => theme.id === themeId);
}

export function getResearchThemesByIds(language: SupportedLanguage, themeIds: readonly ResearchThemeId[]) {
  const collectionById = getResearchThemeCollectionById(language);

  return themeIds.map((themeId) => collectionById[themeId]);
}

export type ResearchThemeCatalogItem = ReturnType<typeof getResearchThemeCollection>[number];
