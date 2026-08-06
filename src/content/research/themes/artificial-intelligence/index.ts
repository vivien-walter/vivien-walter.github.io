import { BrainIcon, ChartScatterIcon, RobotIcon } from '@phosphor-icons/react';

import artificialIntelligenceDescriptionImageSrc from '@/assets/images/research/themes/artificial-intelligence/description.png';
import artificialIntelligenceHeroImageSrc from '@/assets/images/research/themes/artificial-intelligence/hero.png';
import { createResearchThemeContent } from '@/content/research/research-theme-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ResearchThemeId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'artificial-intelligence' as const satisfies ResearchThemeId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getArtificialIntelligenceContent(language: SupportedLanguage) {
  return createResearchThemeContent(language, {
    id: itemId,
    icon: BrainIcon,
    localizedContent,
    highlightIcons: [ChartScatterIcon, BrainIcon, RobotIcon],
    heroImageSrc: artificialIntelligenceHeroImageSrc,
    descriptionImageSrc: artificialIntelligenceDescriptionImageSrc,
  });
}

export type ArtificialIntelligenceContent = ReturnType<typeof getArtificialIntelligenceContent>;
