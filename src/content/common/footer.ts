import { publicProfile } from "@/content/common/profile";
import { selectLocalizedContent } from "@/lib/content/localization";
import type { SupportedLanguage } from "@/types/localization";

import enFooterJson from "./footer.en.json";
import frFooterJson from "./footer.fr.json";

export const footerSocialProfileOrder = [
  "linkedin",
  "github",
  "orcid",
] as const;

export type FooterSocialProfileId =
  (typeof footerSocialProfileOrder)[number];

const localizedFooterContent = {
  fr: frFooterJson,
  en: enFooterJson,
} as const;

function getPublicExternalLink(
  id: FooterSocialProfileId,
) {
  const link = publicProfile.externalLinks.find(
    (candidate) => candidate.id === id,
  );

  if (!link) {
    throw new Error(
      `Missing public profile link: ${id}`,
    );
  }

  return link;
}

export function getFooterContent(
  language: SupportedLanguage,
) {
  const localized = selectLocalizedContent(
    localizedFooterContent,
    language,
  );

  const fullName = [
    publicProfile.person.firstName,
    publicProfile.person.lastName,
  ].join(" ");

  return {
    text: localized.text,
    navigationTitle:
      localized.navigationTitle,
    socialProfilesTitle:
      localized.socialProfilesTitle,
    contactLabel:
      localized.contactLabel,
    copyright: `© 2026 ${fullName}`,
    lastUpdated:
      localized.lastUpdated,
    email: {
      icon: publicProfile.email.icon,
      href: `mailto:${publicProfile.email.address}`,
    },
    socialProfiles:
      footerSocialProfileOrder.map(
        (id) => {
          const link =
            getPublicExternalLink(id);

          return {
            id,
            icon: link.icon,
            href: link.href,
            label:
              localized
                .socialProfileLabels[id],
          };
        },
      ),
  } as const;
}

export type FooterContent =
  ReturnType<typeof getFooterContent>;