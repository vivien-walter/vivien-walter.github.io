import { publicProfile } from '@/content/common/profile';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import enSoftwarePageJson from './page.en.json';
import frSoftwarePageJson from './page.fr.json';

const localizedSoftwarePageContent = {
  fr: frSoftwarePageJson,
  en: enSoftwarePageJson,
} as const;

function getGithubProfile() {
  const githubProfile = publicProfile.externalLinks.find((link) => link.id === 'github');

  if (!githubProfile) {
    throw new Error('Missing GitHub public profile link.');
  }

  return githubProfile;
}

export function getSoftwareContent(language: SupportedLanguage) {
  const localized = selectLocalizedContent(localizedSoftwarePageContent, language);

  const githubProfile = getGithubProfile();

  const breadcrumbLabel =
    'breadcrumbLabel' in localized && typeof localized.breadcrumbLabel === 'string' && localized.breadcrumbLabel.trim().length > 0
      ? localized.breadcrumbLabel
      : localized.title;

  const githubResource = {
    id: 'github',
    icon: githubProfile.icon,
    label: localized.heroActions.github,
    href: githubProfile.href,
  } as const;

  return {
    ...localized,
    breadcrumbLabel,
    githubResource,
    resources: [githubResource],
  } as const;
}

export type SoftwarePageContent = ReturnType<typeof getSoftwareContent>;
