import { ArticleIcon, CodeIcon, MonitorIcon, QrCodeIcon } from '@phosphor-icons/react';

import iscanDescriptionImageSrc from '@/assets/images/softwares/items/qr-generator/description.png';
import iscanHeroImageSrc from '@/assets/images/softwares/items/qr-generator/hero.png';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createSoftwareContent, type SoftwareResource } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'qr-generator' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const projectIds = ['lxp-campus'] as const satisfies readonly ProjectId[];

const experienceIds = ['imaginexr'] as const satisfies readonly ExperienceId[];

export function getQrGeneratorContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'software',
    year: 2025,
    languages: ['Python'],
    localizedContent,
    highlightIcons: [QrCodeIcon, MonitorIcon, ArticleIcon],
    getResources: (): readonly SoftwareResource[] => [],
    projectIds,
    experienceIds,
    heroImageSrc: iscanHeroImageSrc,
    descriptionImageSrc: iscanDescriptionImageSrc,
  });
}

export type QrGeneratorContent = ReturnType<typeof getQrGeneratorContent>;
