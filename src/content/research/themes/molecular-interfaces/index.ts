import { AtomIcon, DesktopTowerIcon, FlaskIcon, MicroscopeIcon } from '@phosphor-icons/react';

import molecularInterfacesDescriptionImageSrc from '@/assets/images/research/themes/molecular-interfaces/description.png';
import molecularInterfacesHeroImageSrc from '@/assets/images/research/themes/molecular-interfaces/hero.png';
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
    highlightIcons: [FlaskIcon, MicroscopeIcon, DesktopTowerIcon],
    heroImageSrc: molecularInterfacesHeroImageSrc,
    descriptionImageSrc: molecularInterfacesDescriptionImageSrc,
  });
}

export type MolecularInterfacesContent = ReturnType<typeof getMolecularInterfacesContent>;
