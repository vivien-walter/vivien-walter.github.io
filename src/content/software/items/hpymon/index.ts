import { CodeIcon, FlaskIcon, GithubLogoIcon, MonitorIcon, NetworkIcon } from '@phosphor-icons/react';

import hpymonDescriptionImageSrc from '@/assets/images/softwares/items/hpymon/description.png';
import hpymonHeroImageSrc from '@/assets/images/softwares/items/hpymon/hero.png';
import { createSoftwareContent, type SoftwareResource } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'hpymon' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getHPyMonContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'software',
    year: 2020,
    languages: ['Python'],
    localizedContent,
    highlightIcons: [NetworkIcon, MonitorIcon, FlaskIcon],
    getResources: (localized): readonly SoftwareResource[] => [
      {
        label: localized.linkLabels.github,
        href: 'https://github.com/vivien-walter/mllpa',
        icon: GithubLogoIcon,
        isExternal: true,
      },
    ],
    heroImageSrc: hpymonHeroImageSrc,
    descriptionImageSrc: hpymonDescriptionImageSrc,
  });
}

export type HPyMonContent = ReturnType<typeof getHPyMonContent>;
