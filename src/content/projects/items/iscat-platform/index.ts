import { AtomIcon, CodeIcon, FlaskIcon, MagnifyingGlassIcon, MicroscopeIcon } from '@phosphor-icons/react';

import descriptionImage from '@/assets/images/projects/iscat-platform/description.jpg';
import heroImage from '@/assets/images/projects/iscat-platform/hero.jpg';
import type { ExperienceId } from '@/content/experience/registry';
import { createProjectContent } from '@/content/projects/project-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ProjectId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'iscat-platform' as const satisfies ProjectId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const experienceIds = ['kcl-iscat'] as const satisfies readonly ExperienceId[];

export function getIscatPlatformContent(language: SupportedLanguage) {
  return createProjectContent(language, {
    id: itemId,
    period: {
      start: '2018-03',
      end: '2021-03',
    },
    localizedContent,
    featureIcons: [MicroscopeIcon, FlaskIcon, AtomIcon, CodeIcon, MagnifyingGlassIcon, CodeIcon],
    heroImageSrc: heroImage,
    overviewImageSrc: descriptionImage,
    experienceIds,
  });
}

export type IscatPlatformContent = ReturnType<typeof getIscatPlatformContent>;
