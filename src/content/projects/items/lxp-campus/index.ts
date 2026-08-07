import { AtomIcon, CodeIcon, ImageIcon, LinkSimpleIcon, TargetIcon } from '@phosphor-icons/react';

import lxpCampusDescriptionImage from '@/assets/images/projects/lxp-campus/description.png';
import lxpCampusHeroImage from '@/assets/images/projects/lxp-campus/hero.png';
import type { ExperienceId } from '@/content/experience/registry';
import { createProjectContent } from '@/content/projects/project-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ProjectId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'lxp-campus' as const satisfies ProjectId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const experienceIds = ['imaginexr'] as const satisfies readonly ExperienceId[];

export function getLxpCampusContent(language: SupportedLanguage) {
  return createProjectContent(language, {
    id: itemId,
    period: {
      start: '2024-01-03',
      end: '2026-07-15',
    },
    localizedContent,
    featureIcons: [TargetIcon, CodeIcon, CodeIcon, AtomIcon, LinkSimpleIcon, ImageIcon],
    heroImageSrc: lxpCampusHeroImage,
    overviewImageSrc: lxpCampusDescriptionImage,
    experienceIds,
  });
}

export type LxpCampusContent = ReturnType<typeof getLxpCampusContent>;
