import { CodeIcon, FlaskIcon, GearFineIcon } from '@phosphor-icons/react';

import molecularCommunicationDescriptionImage from '@/assets/images/projects/lipid-membranes/description.png';
import molecularCommunicationHeroImage from '@/assets/images/projects/lipid-membranes/hero.png';
import type { ExperienceId } from '@/content/experience/registry';
import { createProjectContent } from '@/content/projects/project-content';
import type { SupportedLanguage } from '@/types/localization';

import type { ProjectId } from '../../registry';
import enJson from './en.json';
import frJson from './fr.json';

export const itemId = 'lipid-membranes' as const satisfies ProjectId;

const localizedContent = {
  fr: frJson,
  en: enJson,
} as const;

const experienceIds = ['kcl-molecular-communication'] as const satisfies readonly ExperienceId[];

export function getLipidMembranesContent(language: SupportedLanguage) {
  return createProjectContent(language, {
    id: itemId,
    period: {
      start: '2014-10',
      end: '2017-09',
    },
    localizedContent,
    featureIcons: [GearFineIcon, FlaskIcon, CodeIcon],
    heroImageSrc: molecularCommunicationHeroImage,
    overviewImageSrc: molecularCommunicationDescriptionImage,
    experienceIds,
  });
}

export type LipidMembranesContent = ReturnType<typeof getLipidMembranesContent>;
