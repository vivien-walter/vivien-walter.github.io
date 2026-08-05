import type { Icon } from '@phosphor-icons/react';

import { publicProfile } from '@/content/common/profile';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import enResearchPageJson from './page.en.json';
import frResearchPageJson from './page.fr.json';

export const researchResourceOrder = ['github', 'orcid', 'linkedin'] as const;

export type ResearchResourceId = (typeof researchResourceOrder)[number];

export type ResearchResource = {
  readonly id: ResearchResourceId;
  readonly icon: Icon;
  readonly label: string;
  readonly href: string;
};

const localizedResearchPageContent = {
  fr: frResearchPageJson,
  en: enResearchPageJson,
} as const;

function getPublicProfileLink(id: ResearchResourceId): (typeof publicProfile.externalLinks)[number] {
  const link = publicProfile.externalLinks.find((candidate) => candidate.id === id);

  if (!link) {
    throw new Error(`Missing public profile link: ${id}`);
  }

  return link;
}

export function getResearchPageContent(language: SupportedLanguage) {
  const localized = selectLocalizedContent(localizedResearchPageContent, language);

  const breadcrumbLabel =
    'breadcrumbLabel' in localized && typeof localized.breadcrumbLabel === 'string' && localized.breadcrumbLabel.trim().length > 0
      ? localized.breadcrumbLabel
      : localized.title;

  const resources: readonly ResearchResource[] = researchResourceOrder.map((id) => {
    const profileLink = getPublicProfileLink(id);

    return {
      id,
      icon: profileLink.icon,
      label: localized.resourceLabels[id],
      href: profileLink.href,
    };
  });

  return {
    ...localized,
    breadcrumbLabel,
    resources,
  } as const;
}

export type ResearchPageContent = ReturnType<typeof getResearchPageContent>;
