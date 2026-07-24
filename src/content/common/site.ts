type SiteIdentity = {
  name: string;
  shortName: string;
};

export const siteIdentity = {
  name: 'Vivien PRAUD WALTER',
  shortName: 'VPW',
} as const satisfies SiteIdentity;

type SiteMetadata = {
  copyrightYear: number;
  lastUpdated: string;
};

export const siteMetadata = {
  copyrightYear: 2026,
  lastUpdated: '2026-07',
} as const satisfies SiteMetadata;
