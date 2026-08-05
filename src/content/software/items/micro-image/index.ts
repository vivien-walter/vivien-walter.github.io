import { BooksIcon, CodeIcon, GithubLogoIcon, MicroscopeIcon, MonitorIcon } from '@phosphor-icons/react';

import { createSoftwareContent, type SoftwareResource } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'micro-image' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

export function getMicroImageContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'library',
    year: 2020,
    languages: ['Python'],
    localizedContent,
    highlightIcons: [BooksIcon, MonitorIcon, MicroscopeIcon],
    getResources: (localized): readonly SoftwareResource[] => [
      {
        label: localized.linkLabels.github,
        href: 'https://github.com/vivien-walter/microImage',
        icon: GithubLogoIcon,
        isExternal: true,
      },
    ],
  });
}

export type MicroImageContent = ReturnType<typeof getMicroImageContent>;
