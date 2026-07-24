import { publicProfile } from '@/content/common/profile';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import enFooterJson from './footer.en.json';
import frFooterJson from './footer.fr.json';
import { siteMetadata } from './site';

export const footerSocialProfileOrder = ['linkedin', 'github', 'orcid'] as const;

export type FooterSocialProfileId = (typeof footerSocialProfileOrder)[number];

const localizedFooterContent = {
  fr: frFooterJson,
  en: enFooterJson,
} as const;

function getPublicExternalLink(id: FooterSocialProfileId) {
  const link = publicProfile.externalLinks.find((candidate) => candidate.id === id);

  if (!link) {
    throw new Error(`Missing public profile link: ${id}`);
  }

  return link;
}

export function getFooterContent(language: SupportedLanguage) {
  const localized = selectLocalizedContent(localizedFooterContent, language);

  const fullName = [publicProfile.person.firstName, publicProfile.person.lastName].join(' ');

  const lastUpdatedDate = new Date(`${siteMetadata.lastUpdated}-01T00:00:00Z`);

  const formattedLastUpdated = new Intl.DateTimeFormat(language, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(lastUpdatedDate);

  return {
    text: `${localized.text} ${fullName}`,
    navigationTitle: localized.navigationTitle,
    socialProfilesTitle: localized.socialProfilesTitle,
    contactLabel: localized.contactLabel,
    copyright: `© ${siteMetadata.copyrightYear} ${fullName}`,
    lastUpdated: `${localized.lastUpdatedLabel}: ${formattedLastUpdated}`,
    socialProfiles: footerSocialProfileOrder.map((id) => {
      const link = getPublicExternalLink(id);

      return {
        id,
        icon: link.icon,
        href: link.href,
        label: localized.socialProfileLabels[id],
      };
    }),
  } as const;
}

export type FooterContent = ReturnType<typeof getFooterContent>;
