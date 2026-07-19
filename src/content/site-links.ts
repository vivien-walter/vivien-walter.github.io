export type SiteLinkDefinition = {
  readonly href: string;
  readonly labelKey: string;
  readonly isExternal: boolean;
};

export const siteLinks = {
  email: {
    href: "mailto:vivien.walter@proton.me",
    labelKey: "links.email",
    isExternal: false,
  },
  linkedin: {
    href: "https://www.linkedin.com/in/vivien-walter-4b3068129/",
    labelKey: "links.linkedin",
    isExternal: true,
  },
  github: {
    href: "https://github.com/vivien-walter",
    labelKey: "links.github",
    isExternal: true,
  },
  orcid: {
    href: "https://orcid.org/0000-0003-3203-9543",
    labelKey: "links.orcid",
    isExternal: true,
  },
  mllpa: {
    href: "https://vivien-walter.github.io/mllpa/",
    labelKey: "links.mllpa",
    isExternal: true,
  },
} as const satisfies Record<string, SiteLinkDefinition>;

export type SiteLinkId = keyof typeof siteLinks;

export function getSiteLink(linkId: SiteLinkId): SiteLinkDefinition {
  return siteLinks[linkId];
}
