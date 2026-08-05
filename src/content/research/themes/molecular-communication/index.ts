import { ArticleIcon, FlaskIcon, MicroscopeIcon, WavesIcon } from '@phosphor-icons/react';

import { createResearchThemeContent } from '@/content/research/research-theme-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ResearchThemeId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'molecular-communication' as const satisfies ResearchThemeId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getMolecularCommunicationContent(language: SupportedLanguage) {
  return createResearchThemeContent(language, {
    id: itemId,
    icon: WavesIcon,
    localizedContent,
    highlightIcons: [FlaskIcon, MicroscopeIcon, ArticleIcon],
  });
}

export type MolecularCommunicationContent = ReturnType<typeof getMolecularCommunicationContent>;
