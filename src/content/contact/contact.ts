import { CalendarCheckIcon, EnvelopeSimpleIcon, type Icon, LaptopIcon, MapPinIcon } from '@phosphor-icons/react';

import englishCvUrl from '@/assets/documents/cv/vivien-praud-walter-cv-en.pdf';
import frenchCvUrl from '@/assets/documents/cv/vivien-praud-walter-cv-fr.pdf';
import heroImageSrc from '@/assets/images/contact/hero.jpg';
import { publicProfile } from '@/content/common/profile';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { LocalizedContent, SupportedLanguage } from '@/types/localization';

import enContactJson from './contact.en.json';
import frContactJson from './contact.fr.json';

type LocalizedContactMethod = {
  readonly label: string;
  readonly actionLabel: string;
};

type LocalizedAvailabilityItem = {
  readonly title: string;
  readonly description: string;
};

type LocalizedContactContent = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly introduction: string;
    readonly image: {
      readonly alt: string;
    };
  };

  readonly methods: {
    readonly title: string;
    readonly items: {
      readonly email: LocalizedContactMethod;
      readonly linkedin: LocalizedContactMethod;
      readonly github: LocalizedContactMethod;
      readonly orcid: LocalizedContactMethod;
    };
  };

  readonly jobSearch: {
    readonly message: string;
    readonly downloadCvFr: string;
    readonly downloadCvEn: string;
  };

  readonly availability: {
    readonly title: string;
    readonly items: {
      readonly location: LocalizedAvailabilityItem;
      readonly immediateAvailability: LocalizedAvailabilityItem;
      readonly workArrangements: LocalizedAvailabilityItem;
    };
  };
};

export type ContactHeroImage = {
  readonly src: string;
  readonly alt: string;
};

export type ContactMethodId = 'email' | 'linkedin' | 'github' | 'orcid';

export type ContactMethod = {
  readonly id: ContactMethodId;
  readonly icon: Icon;
  readonly label: string;
  readonly href: string;
  readonly value: string;
  readonly actionLabel: string;
  readonly opensInNewTab: boolean;
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
  readonly frenchCvHref: string;
  readonly englishCvLabel: string;
  readonly englishCvHref: string;
};

export type ContactContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction: string;
  readonly heroImage: ContactHeroImage;
  readonly methodsTitle: string;
  readonly links: readonly ContactMethod[];
  readonly jobSearch: ContactJobSearchContent;
  readonly availability: ContactAvailabilitySection;
};

const localizedContactContent = {
  fr: frContactJson,
  en: enContactJson,
} satisfies LocalizedContent<LocalizedContactContent>;

type PublicExternalLinkId = Exclude<ContactMethodId, 'email'>;

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
  const { availability, hero, jobSearch, methods } = localizedContent;

  const { email, github, linkedin, orcid } = methods.items;

  const { immediateAvailability, location, workArrangements } = availability.items;

  return {
    eyebrow: hero.eyebrow,
    title: hero.title,
    introduction: hero.introduction,

    heroImage: {
      src: heroImageSrc,
      alt: hero.image.alt,
    },

    methodsTitle: methods.title,

    links: [
      {
        id: 'email',
        icon: EnvelopeSimpleIcon,
        label: email.label,
        href: `mailto:${publicProfile.email}`,
        value: publicProfile.email,
        actionLabel: email.actionLabel,
        opensInNewTab: false,
      },
      {
        id: 'linkedin',
        icon: linkedinProfile.icon,
        label: linkedin.label,
        href: linkedinProfile.href,
        value: linkedinProfile.displayValue,
        actionLabel: linkedin.actionLabel,
        opensInNewTab: true,
      },
      {
        id: 'github',
        icon: githubProfile.icon,
        label: github.label,
        href: githubProfile.href,
        value: githubProfile.displayValue,
        actionLabel: github.actionLabel,
        opensInNewTab: true,
      },
      {
        id: 'orcid',
        icon: orcidProfile.icon,
        label: orcid.label,
        href: orcidProfile.href,
        value: orcidProfile.displayValue,
        actionLabel: orcid.actionLabel,
        opensInNewTab: true,
      },
    ],

    jobSearch: {
      message: jobSearch.message,
      frenchCvLabel: jobSearch.downloadCvFr,
      frenchCvHref: frenchCvUrl,
      englishCvLabel: jobSearch.downloadCvEn,
      englishCvHref: englishCvUrl,
    },

    availability: {
      title: availability.title,
      items: [
        {
          id: 'location',
          icon: MapPinIcon,
          title: location.title,
          description: location.description,
        },
        {
          id: 'immediate-availability',
          icon: CalendarCheckIcon,
          title: immediateAvailability.title,
          description: immediateAvailability.description,
          highlighted: true,
        },
        {
          id: 'work-arrangements',
          icon: LaptopIcon,
          title: workArrangements.title,
          description: workArrangements.description,
        },
      ],
    },
  };
}

export function getContactContent(language: SupportedLanguage): ContactContent {
  return assembleContactContent(selectLocalizedContent(localizedContactContent, language));
}
