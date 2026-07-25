import { GithubLogoIcon, type Icon, LinkedinLogoIcon } from '@phosphor-icons/react';

import { OrcidIcon } from '@/components/icons/orcid';

type PublicPersonName = {
  firstName: string;
  lastName: string;
};

type PublicExternalLink = {
  id: string;
  icon: Icon;
  href: string;
  displayValue: string;
};

type PublicProfile = {
  person: PublicPersonName;
  email: string;
  externalLinks: PublicExternalLink[];
};

export const publicProfile = {
  person: {
    firstName: 'Vivien',
    lastName: 'Praud Walter',
  },

  email: 'vivien.walter@proton.me',

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
      icon: OrcidIcon,
      href: 'https://orcid.org/0000-0003-3203-9543',
      displayValue: '0000-0003-3203-9543',
    },
  ],
} as const satisfies PublicProfile;
