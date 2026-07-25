import { selectLocalizedContent } from '@/lib/content/localization';
import enCommonJson from '@/locales/en/common.json';
import frCommonJson from '@/locales/fr/common.json';
import type { LocalizedContent, SupportedLanguage } from '@/types/localization';

type SiteIdentity = {
  readonly name: string;
  readonly shortName: string;
};

export const siteIdentity = {
  name: 'Vivien PRAUD WALTER',
  shortName: 'VPW',
} as const satisfies SiteIdentity;

type SiteMetadata = {
  readonly copyrightYear: number;
  readonly lastUpdated: string;
};

export const siteMetadata = {
  copyrightYear: 2026,
  lastUpdated: '2026-07',
} as const satisfies SiteMetadata;

type LocalizedSiteContent = {
  readonly breadcrumbs: {
    readonly label: string;
    readonly home: string;
  };
};

export type SiteContent = LocalizedSiteContent;

const localizedSiteContent = {
  fr: {
    breadcrumbs: frCommonJson.breadcrumbs,
  },
  en: {
    breadcrumbs: enCommonJson.breadcrumbs,
  },
} satisfies LocalizedContent<LocalizedSiteContent>;

export function getSiteContent(language: SupportedLanguage): SiteContent {
  return selectLocalizedContent(localizedSiteContent, language);
}
