import { CodeIcon, CursorClickIcon, GithubLogoIcon, MicroscopeIcon, MonitorIcon } from '@phosphor-icons/react';

import iscanDescriptionImageSrc from '@/assets/images/softwares/items/iscan/description.png';
import iscanHeroImageSrc from '@/assets/images/softwares/items/iscan/hero.png';
import { createSoftwareContent, type SoftwareResource } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'iscan' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getIscanContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'software',
    year: 2019,
    languages: ['Python'],
    localizedContent,
    highlightIcons: [CursorClickIcon, MonitorIcon, MicroscopeIcon],
    getResources: (localized): readonly SoftwareResource[] => [
      {
        label: localized.linkLabels.github,
        href: 'https://github.com/vivien-walter/iscan',
        icon: GithubLogoIcon,
        isExternal: true,
      },
    ],
    heroImageSrc: iscanHeroImageSrc,
    descriptionImageSrc: iscanDescriptionImageSrc,
  });
}

export type IscanContent = ReturnType<typeof getIscanContent>;
