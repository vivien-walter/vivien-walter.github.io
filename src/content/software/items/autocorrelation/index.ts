import { CodeIcon, CursorClickIcon, GithubLogoIcon, MicroscopeIcon, RulerIcon } from '@phosphor-icons/react';

import autoCorrelationDescriptionImageSrc from '@/assets/images/softwares/items/autocorrelation/description.png';
import autoCorrelationHeroImageSrc from '@/assets/images/softwares/items/autocorrelation/hero.png';
import type { ProjectId } from '@/content/projects/registry';
import { createSoftwareContent, type SoftwareResource } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'autocorrelation' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const projectIds = ['lipid-membranes'] as const satisfies readonly ProjectId[];

export function getAutoCorrelationContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'software',
    year: 2017,
    languages: ['Java'],
    localizedContent,
    highlightIcons: [CursorClickIcon, RulerIcon, MicroscopeIcon],
    getResources: (localized): readonly SoftwareResource[] => [
      {
        label: localized.linkLabels.github,
        href: 'https://github.com/vivien-walter/autocorrelation',
        icon: GithubLogoIcon,
        isExternal: true,
      },
    ],
    projectIds,
    heroImageSrc: autoCorrelationHeroImageSrc,
    descriptionImageSrc: autoCorrelationDescriptionImageSrc,
  });
}

export type AutoCorrelationContent = ReturnType<typeof getAutoCorrelationContent>;
