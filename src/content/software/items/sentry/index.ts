import { CodeIcon, GearIcon, MicroscopeIcon, NetworkIcon } from '@phosphor-icons/react';

import sentryDescriptionImageSrc from '@/assets/images/softwares/items/sentry/description.png';
import sentryHeroImageSrc from '@/assets/images/softwares/items/sentry/hero.png';
import type { ProjectId } from '@/content/projects/registry';
import { createSoftwareContent } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'sentry' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const projectIds = ['iscat-platform'] as const satisfies readonly ProjectId[];

export function getSentryContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'software',
    year: 2020,
    languages: ['LabVIEW'],
    localizedContent,
    highlightIcons: [MicroscopeIcon, NetworkIcon, GearIcon],
    projectIds,
    heroImageSrc: sentryHeroImageSrc,
    descriptionImageSrc: sentryDescriptionImageSrc,
  });
}

export type SentryContent = ReturnType<typeof getSentryContent>;
