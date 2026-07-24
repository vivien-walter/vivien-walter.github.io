import { GithubLogoIcon, type Icon, IdentificationBadgeIcon, LinkedinLogoIcon } from '@phosphor-icons/react';

type PublicPersonName = {
  readonly firstName: string;
  readonly lastName: string;
};

type PublicExternalLink = {
  readonly id: string;
  readonly icon: Icon;
  readonly href: string;
  readonly displayValue: string;
};

type PublicProfile = {
  readonly person: PublicPersonName;
  readonly externalLinks: readonly PublicExternalLink[];
};

export const publicProfile = {
  person: {
    firstName: 'Vivien',
    lastName: 'Praud Walter',
  },

  externalLinks: [
    {
      id: 'linkedin',
      icon: LinkedinLogoIcon,
      href: 'https://www.linkedin.com/in/vivien-walter-4b3068129/',
      displayValue: 'linkedin.com/in/vivien-walter-4b3068129',
    },
    {
      id: 'github',
      icon: GithubLogoIcon,
      href: 'https://github.com/vivien-walter',
      displayValue: 'github.com/vivien-walter',
    },
    {
      id: 'orcid',
      icon: IdentificationBadgeIcon,
      href: 'https://orcid.org/0000-0003-3203-9543',
      displayValue: '0000-0003-3203-9543',
    },
  ],
} as const satisfies PublicProfile;
