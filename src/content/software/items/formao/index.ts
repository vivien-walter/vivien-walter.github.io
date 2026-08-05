import { BooksIcon, CodeIcon, RobotIcon, UserIcon } from '@phosphor-icons/react';

import formaoDescriptionImageSrc from '@/assets/images/softwares/items/formao/description.png';
import formaoHeroImageSrc from '@/assets/images/softwares/items/formao/hero.svg';
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

export function getFormaoContent(language: SupportedLanguage) {
  return createSoftwareContent(language, {
    id: itemId,
    icon: CodeIcon,
    kind: 'web-application',
    year: 2026,
    languages: ['TypeScript'],
    localizedContent,
    highlightIcons: [BooksIcon, UserIcon, RobotIcon],
    heroImageSrc: formaoHeroImageSrc,
    descriptionImageSrc: formaoDescriptionImageSrc,
  });
}

export type FormaoContent = ReturnType<typeof getFormaoContent>;
