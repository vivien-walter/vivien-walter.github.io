import { ApertureIcon, CodeIcon, GearIcon, MicroscopeIcon } from '@phosphor-icons/react';

import opticsPhotonicsDescriptionImageSrc from '@/assets/images/research/themes/optics-photonics/description.jpg';
import opticsPhotonicsHeroImageSrc from '@/assets/images/research/themes/optics-photonics/hero.png';
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
    highlightIcons: [MicroscopeIcon, CodeIcon, GearIcon],
    heroImageSrc: opticsPhotonicsHeroImageSrc,
    descriptionImageSrc: opticsPhotonicsDescriptionImageSrc,
  });
}

export type OpticsPhotonicsContent = ReturnType<typeof getOpticsPhotonicsContent>;
