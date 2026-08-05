import { ArticleIcon, AtomIcon, CodeIcon } from '@phosphor-icons/react';

import { createResearchThemeContent } from '@/content/research/research-theme-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ResearchThemeId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'molecular-interfaces' as const satisfies ResearchThemeId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getMolecularInterfacesContent(language: SupportedLanguage) {
  return createResearchThemeContent(language, {
    id: itemId,
    icon: AtomIcon,
    localizedContent,
    highlightIcons: [AtomIcon, CodeIcon, ArticleIcon],
  });
}

export type MolecularInterfacesContent = ReturnType<typeof getMolecularInterfacesContent>;
