import { ApertureIcon, ArticleIcon, CodeIcon, MicroscopeIcon } from '@phosphor-icons/react';

import { createResearchThemeContent } from '@/content/research/research-theme-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ResearchThemeId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'optics-photonics' as const satisfies ResearchThemeId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getOpticsPhotonicsContent(language: SupportedLanguage) {
  return createResearchThemeContent(language, {
    id: itemId,
    icon: ApertureIcon,
    localizedContent,
    highlightIcons: [MicroscopeIcon, CodeIcon, ArticleIcon],
  });
}

export type OpticsPhotonicsContent = ReturnType<typeof getOpticsPhotonicsContent>;
