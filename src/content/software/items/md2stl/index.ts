import { AtomIcon, BooksIcon, CodeIcon, GithubLogoIcon, PrinterIcon } from '@phosphor-icons/react';

import iscanDescriptionImageSrc from '@/assets/images/softwares/items/md2stl/description.jpeg';
import iscanHeroImageSrc from '@/assets/images/softwares/items/md2stl/hero.png';
import { createSoftwareContent, type SoftwareResource } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'md2stl' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getMd2StlContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'software',
    year: 2021,
    languages: ['Python'],
    localizedContent,
    highlightIcons: [BooksIcon, PrinterIcon, AtomIcon],
    getResources: (localized): readonly SoftwareResource[] => [
      {
        label: localized.linkLabels.github,
        href: 'https://github.com/vivien-walter/md2stl',
        icon: GithubLogoIcon,
        isExternal: true,
      },
    ],
    heroImageSrc: iscanHeroImageSrc,
    descriptionImageSrc: iscanDescriptionImageSrc,
  });
}

export type Md2StlContent = ReturnType<typeof getMd2StlContent>;
