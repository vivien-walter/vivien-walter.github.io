import { CodeIcon, GithubLogoIcon, MonitorIcon, NetworkIcon, SyringeIcon } from '@phosphor-icons/react';

import molCommDescriptionImageSrc from '@/assets/images/softwares/items/molcomm/description.png';
import molCommHeroImageSrc from '@/assets/images/softwares/items/molcomm/hero.png';
import type { ProjectId } from '@/content/projects/registry';
import { createSoftwareContent, type SoftwareResource } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'molcomm' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const projectIds = ['molecular-communication'] as const satisfies readonly ProjectId[];

export function getMolCommContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'software',
    year: 2023,
    languages: ['Python', 'C++'],
    localizedContent,
    highlightIcons: [SyringeIcon, MonitorIcon, NetworkIcon],
    getResources: (localized): readonly SoftwareResource[] => [
      {
        label: localized.linkLabels.github,
        href: 'https://github.com/kcl-yansha/MolCommUI',
        icon: GithubLogoIcon,
        isExternal: true,
      },
    ],
    projectIds,
    heroImageSrc: molCommHeroImageSrc,
    descriptionImageSrc: molCommDescriptionImageSrc,
  });
}

export type MolCommContent = ReturnType<typeof getMolCommContent>;
