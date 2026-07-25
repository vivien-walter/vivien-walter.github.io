import { CalendarCheckIcon, EnvelopeSimpleIcon, type Icon, LaptopIcon, MapPinIcon } from '@phosphor-icons/react';

import { publicProfile } from '@/content/common/profile';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { LocalizedContent, SupportedLanguage } from '@/types/localization';

import enContactJson from './contact.en.json';
import frContactJson from './contact.fr.json';

type LocalizedContactMethod = {
  readonly label: string;
  readonly actionLabel: string;
};

type LocalizedContactContent = {
  readonly title: string;
  readonly introduction: string;
  readonly methodsTitle: string;

  readonly methods: {
    readonly email: LocalizedContactMethod;
    readonly linkedin: LocalizedContactMethod;
    readonly github: LocalizedContactMethod;
    readonly orcid: LocalizedContactMethod;
  };

  readonly jobSearch: {
    readonly message: string;
    readonly downloadCvFr: string;
    readonly downloadCvEn: string;
  };

  readonly availability: {
    readonly title: string;
    readonly items: {
      readonly location: {
        readonly title: string;
        readonly description: string;
      };
      readonly immediateAvailability: {
        readonly title: string;
        readonly description: string;
      };
      readonly workArrangements: {
        readonly title: string;
        readonly description: string;
      };
    };
  };
};

export type ContactMethodId = 'email' | 'linkedin' | 'github' | 'orcid';

export type ContactMethod = {
  readonly id: ContactMethodId;
  readonly icon: Icon;
  readonly label: string;
  readonly href: string;
  readonly value: string;
  readonly actionLabel: string;
};

export type ContactAvailabilityId = 'location' | 'immediate-availability' | 'work-arrangements';

export type ContactAvailabilityCard = {
  readonly id: ContactAvailabilityId;
  readonly icon: Icon;
  readonly title: string;
  readonly description: string;
  readonly highlighted?: boolean;
};

export type ContactAvailabilitySection = {
  readonly title: string;
  readonly items: readonly ContactAvailabilityCard[];
};

export type ContactJobSearchContent = {
  readonly message: string;
  readonly frenchCvLabel: string;
  readonly englishCvLabel: string;
};

export type ContactContent = {
  readonly title: string;
  readonly introduction: string;
  readonly methodsTitle: string;
  readonly links: readonly ContactMethod[];
  readonly jobSearch: ContactJobSearchContent;
  readonly availability: ContactAvailabilitySection;
};

const localizedContactContent = {
  fr: frContactJson,
  en: enContactJson,
} satisfies LocalizedContent<LocalizedContactContent>;

type PublicExternalLinkId = 'linkedin' | 'github' | 'orcid';

function getPublicExternalLink(id: PublicExternalLinkId): (typeof publicProfile.externalLinks)[number] {
  const link = publicProfile.externalLinks.find((candidate) => candidate.id === id);

  if (!link) {
    throw new Error(`Missing public profile link: ${id}`);
  }

  return link;
}

const linkedinProfile = getPublicExternalLink('linkedin');

const githubProfile = getPublicExternalLink('github');

const orcidProfile = getPublicExternalLink('orcid');

function assembleContactContent(localizedContent: LocalizedContactContent): ContactContent {
  return {
    title: localizedContent.title,
    introduction: localizedContent.introduction,
    methodsTitle: localizedContent.methodsTitle,

    links: [
      {
        id: 'email',
        icon: EnvelopeSimpleIcon,
        label: localizedContent.methods.email.label,
        href: `mailto:${publicProfile.email}`,
        value: publicProfile.email,
        actionLabel: localizedContent.methods.email.actionLabel,
      },
      {
        id: 'linkedin',
        icon: linkedinProfile.icon,
        label: localizedContent.methods.linkedin.label,
        href: linkedinProfile.href,
        value: linkedinProfile.displayValue,
        actionLabel: localizedContent.methods.linkedin.actionLabel,
      },
      {
        id: 'github',
        icon: githubProfile.icon,
        label: localizedContent.methods.github.label,
        href: githubProfile.href,
        value: githubProfile.displayValue,
        actionLabel: localizedContent.methods.github.actionLabel,
      },
      {
        id: 'orcid',
        icon: orcidProfile.icon,
        label: localizedContent.methods.orcid.label,
        href: orcidProfile.href,
        value: orcidProfile.displayValue,
        actionLabel: localizedContent.methods.orcid.actionLabel,
      },
    ],

    jobSearch: {
      message: localizedContent.jobSearch.message,
      frenchCvLabel: localizedContent.jobSearch.downloadCvFr,
      englishCvLabel: localizedContent.jobSearch.downloadCvEn,
    },

    availability: {
      title: localizedContent.availability.title,
      items: [
        {
          id: 'location',
          icon: MapPinIcon,
          title: localizedContent.availability.items.location.title,
          description: localizedContent.availability.items.location.description,
        },
        {
          id: 'immediate-availability',
          icon: CalendarCheckIcon,
          title: localizedContent.availability.items.immediateAvailability.title,
          description: localizedContent.availability.items.immediateAvailability.description,
          highlighted: true,
        },
        {
          id: 'work-arrangements',
          icon: LaptopIcon,
          title: localizedContent.availability.items.workArrangements.title,
          description: localizedContent.availability.items.workArrangements.description,
        },
      ],
    },
  };
}

export function getContactContent(language: SupportedLanguage): ContactContent {
  return assembleContactContent(selectLocalizedContent(localizedContactContent, language));
}
