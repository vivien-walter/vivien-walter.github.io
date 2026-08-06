import { BrainIcon, DropIcon, FlaskIcon, WavesIcon } from '@phosphor-icons/react';

import molecularCommunicationDescriptionImageSrc from '@/assets/images/research/themes/molecular-communication/description.png';
import molecularCommunicationHeroImageSrc from '@/assets/images/research/themes/molecular-communication/hero.png';
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
    highlightIcons: [DropIcon, FlaskIcon, BrainIcon],
    heroImageSrc: molecularCommunicationHeroImageSrc,
    descriptionImageSrc: molecularCommunicationDescriptionImageSrc,
  });
}

export type MolecularCommunicationContent = ReturnType<typeof getMolecularCommunicationContent>;
