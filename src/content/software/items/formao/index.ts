import { BooksIcon, CodeIcon, RobotIcon, UserIcon } from '@phosphor-icons/react';

import formaoDescriptionImageSrc from '@/assets/images/softwares/items/formao/description.png';
import formaoHeroImageSrc from '@/assets/images/softwares/items/formao/hero.svg';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { createSoftwareContent } from '@/content/software/software-content';
import type { SupportedLanguage } from '@/types/localization';

import type { SoftwareId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'formao' as const satisfies SoftwareId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const projectIds = ['lxp-campus'] as const satisfies readonly ProjectId[];

const experienceIds = ['imaginexr'] as const satisfies readonly ExperienceId[];

export function getFormaoContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'web-application',
    year: 2026,
    languages: ['TypeScript'],
    localizedContent,
    highlightIcons: [BooksIcon, UserIcon, RobotIcon],
    projectIds,
    experienceIds,
    heroImageSrc: formaoHeroImageSrc,
    descriptionImageSrc: formaoDescriptionImageSrc,
  });
}

export type FormaoContent = ReturnType<typeof getFormaoContent>;
