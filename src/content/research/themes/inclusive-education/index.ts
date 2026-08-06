import { BrainIcon, GraduationCapIcon, VirtualRealityIcon, WheelchairMotionIcon } from '@phosphor-icons/react';

import molecularCommunicationDescriptionImageSrc from '@/assets/images/research/themes/inclusive-education/description.png';
import molecularCommunicationHeroImageSrc from '@/assets/images/research/themes/inclusive-education/hero.jpg';
import { createResearchThemeContent } from '@/content/research/research-theme-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ResearchThemeId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'inclusive-education' as const satisfies ResearchThemeId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getInclusiveEducationContent(language: SupportedLanguage) {
  return createResearchThemeContent(language, {
    id: itemId,
    icon: GraduationCapIcon,
    localizedContent,
    highlightIcons: [WheelchairMotionIcon, VirtualRealityIcon, BrainIcon],
    heroImageSrc: molecularCommunicationHeroImageSrc,
    descriptionImageSrc: molecularCommunicationDescriptionImageSrc,
  });
}

export type InclusiveEducationContent = ReturnType<typeof getInclusiveEducationContent>;
