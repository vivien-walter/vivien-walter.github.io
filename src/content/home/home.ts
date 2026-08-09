import { BriefcaseIcon, CodeIcon, GithubLogoIcon, LinkedinLogoIcon, MapPinIcon, MicroscopeIcon } from '@phosphor-icons/react';

import heroImageSrc from '@/assets/images/home/hero.jpg';
import { OrcidIcon } from '@/components/icons/orcid';
import { publicProfile } from '@/content/common/profile';
import { getExperienceById } from '@/content/experience/catalog';
import { getProjectCollection } from '@/content/projects/catalog';
import type { ProjectId } from '@/content/projects/registry';
import { getPublicationCollection } from '@/content/research/publications/catalog';
import type { PublicationId } from '@/content/research/publications/registry';
import type { ResearchThemeId } from '@/content/research/registry';
import { getResearchThemeCollection } from '@/content/research/themes/catalog';
import { getSoftwareCollection } from '@/content/software/catalog';
import type { SoftwareId } from '@/content/software/registry';
import { getSoftwareTags } from '@/content/software/tags';
import { selectLocalizedContent } from '@/lib/content/localization';
import type { LocalizedContent, SupportedLanguage } from '@/types/localization';

import enHomeJson from './home.en.json';
import frHomeJson from './home.fr.json';

type LocalizedProfileDimension = {
  readonly title: string;
  readonly description: string;
};

type LocalizedHomeContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction: string;

  readonly heroActions: {
    readonly projects: string;
    readonly experience: string;
  };
  readonly heroImage: {
    readonly alt: string;
  };
  readonly heroHighlights: {
    readonly projectManagement: string;
    readonly softwareAndAi: string;
    readonly instrumentation: string;
    readonly location: string;
  };

  readonly profileDimensions: {
    readonly title: string;
    readonly projectManagement: LocalizedProfileDimension;
    readonly softwareAndAi: LocalizedProfileDimension;
    readonly instrumentation: LocalizedProfileDimension;
  };

  readonly practicalInformation: {
    readonly title: string;
    readonly location: string;
    readonly employment: string;
    readonly workMode: string;
    readonly travel: string;
    readonly languages: string;
  };

  readonly featuredWorks: {
    readonly title: string;
    readonly description: string;
    readonly kindLabels: {
      readonly project: string;
      readonly software: string;
      readonly publication: string;
    };
    readonly projectActionLabel: string;
    readonly softwareActionLabel: string;
    readonly publicationActionLabel: string;
  };

  readonly statement: {
    readonly text: string;
    readonly actionLabel: string;
  };

  readonly researchAxes: {
    readonly title: string;
    readonly description: string;
    readonly actionLabel: string;
    readonly opticsAndPhotonics: LocalizedProfileDimension;
    readonly scientificAi: LocalizedProfileDimension;
    readonly scientificSoftware: LocalizedProfileDimension;
    readonly collaborativeSystems: LocalizedProfileDimension;
  };

  readonly follow: {
    readonly title: string;
    readonly description: string;
  };
};

export type HomeIcon = typeof BriefcaseIcon;

export type HomeHeroActionsContent = {
  readonly projects: string;
  readonly experience: string;
};

export type HomeHeroImage = {
  readonly src: string;
  readonly alt: string;
};

export type HomeHeroHighlight = {
  readonly id: 'project-management' | 'software-and-ai' | 'instrumentation' | 'location';
  readonly label: string;
  readonly icon: HomeIcon;
};

export type HomeProfileDimension = {
  readonly id: 'project-management' | 'software-and-ai' | 'instrumentation';
  readonly title: string;
  readonly description: string;
  readonly icon: HomeIcon;
};

export type HomeProfileDimensionsContent = {
  readonly title: string;
  readonly items: readonly HomeProfileDimension[];
};

export type HomePracticalInformationContent = {
  readonly title: string;
  readonly location: string;
  readonly employment: string;
  readonly workMode: string;
  readonly travel: string;
  readonly languages: string;
};

export type HomeFeaturedWorkImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

type HomeFeaturedWorkBase<ContentId extends string> = {
  readonly contentId: ContentId;
  readonly kindLabel: string;
  readonly title: string;
  readonly image?: HomeFeaturedWorkImage;
};

export type HomeFeaturedProject = HomeFeaturedWorkBase<ProjectId> & {
  readonly kind: 'project';
  readonly actionLabel: string;
  readonly employer: string;
  readonly role: string;
  readonly period: {
    readonly start: string;
    readonly end?: string;
  };
};

export type HomeFeaturedSoftware = HomeFeaturedWorkBase<SoftwareId> & {
  readonly kind: 'software';
  readonly actionLabel: string;
  readonly primaryLanguage: string;
  readonly technologies: readonly string[];
};

export type HomeFeaturedPublication = HomeFeaturedWorkBase<PublicationId> & {
  readonly kind: 'publication';
  readonly actionLabel: string;
  readonly journal: string;
  readonly year: number;
  readonly authors: readonly string[];
  readonly href: string;
};

export type HomeFeaturedWork = HomeFeaturedProject | HomeFeaturedSoftware | HomeFeaturedPublication;

export type HomeFeaturedWorksContent = {
  readonly title: string;
  readonly description: string;
  readonly items: readonly HomeFeaturedWork[];
};

export type HomeStatementPageId = 'experience' | 'projects' | 'research' | 'software' | 'contact';

export type HomeStatementContent = {
  readonly text: string;
  readonly action: {
    readonly label: string;
    readonly pageId: HomeStatementPageId;
  };
};

export type HomeResearchAxis = {
  readonly id: ResearchThemeId;
  readonly title: string;
  readonly description: string;
  readonly icon: HomeIcon;
};

export type HomeResearchAxesContent = {
  readonly title: string;
  readonly description: string;
  readonly actionLabel: string;
  readonly items: readonly HomeResearchAxis[];
};

export type HomeFollowLink = {
  readonly id: 'linkedin' | 'github' | 'orcid';
  readonly label: string;
  readonly href: string;
  readonly icon: HomeIcon;
};

export type HomeFollowContent = {
  readonly title: string;
  readonly description: string;
  readonly location: {
    readonly label: string;
    readonly icon: HomeIcon;
  };
  readonly links: readonly HomeFollowLink[];
};

export type HomeContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction: string;
  readonly heroActions: HomeHeroActionsContent;
  readonly heroImage: HomeHeroImage;
  readonly heroHighlights: HomeHeroHighlight[];
  readonly profileDimensions: HomeProfileDimensionsContent;
  readonly practicalInformation: HomePracticalInformationContent;
  readonly featuredWorks: HomeFeaturedWorksContent;
  readonly statement: HomeStatementContent;
  readonly researchAxes: HomeResearchAxesContent;
  readonly follow: HomeFollowContent;
};

const localizedHomeContent = {
  fr: frHomeJson,
  en: enHomeJson,
} satisfies LocalizedContent<LocalizedHomeContent>;

function getPublicProfileLink(id: HomeFollowLink['id']): (typeof publicProfile.externalLinks)[number] {
  const link = publicProfile.externalLinks.find((candidate) => candidate.id === id);

  if (!link) {
    throw new Error(`Missing public profile link: ${id}`);
  }

  return link;
}

function assembleHomeContent(localizedContent: LocalizedHomeContent, language: SupportedLanguage): HomeContent {
  const linkedinProfile = getPublicProfileLink('linkedin');

  const githubProfile = getPublicProfileLink('github');

  const orcidProfile = getPublicProfileLink('orcid');

  const [featuredProject] = getProjectCollection(language);

  const [featuredSoftware] = getSoftwareCollection(language);

  const [featuredPublication] = getPublicationCollection(language);

  const researchThemes = getResearchThemeCollection(language);

  if (!featuredProject) {
    throw new Error('Missing featured project.');
  }

  if (!featuredSoftware) {
    throw new Error('Missing featured software.');
  }

  if (!featuredPublication) {
    throw new Error('Missing featured publication.');
  }

  const [featuredProjectExperienceId] = featuredProject.experienceIds;

  if (!featuredProjectExperienceId) {
    throw new Error(`Missing experience relation for featured project: ${featuredProject.id}`);
  }

  const featuredProjectExperience = getExperienceById(language, featuredProjectExperienceId);

  if (!featuredProjectExperience) {
    throw new Error(`Missing associated experience for featured project: ${featuredProject.id}`);
  }

  const [featuredSoftwarePrimaryLanguage] = featuredSoftware.languages;

  if (!featuredSoftwarePrimaryLanguage) {
    throw new Error(`Missing primary language for featured software: ${featuredSoftware.id}`);
  }

  const featuredPublicationJournal = featuredPublication.publication;

  if (!featuredPublicationJournal) {
    throw new Error(`Missing journal for featured publication: ${featuredPublication.id}`);
  }

  const featuredPublicationHref = featuredPublication.doi?.href ?? featuredPublication.website?.href ?? featuredPublication.pdf?.href;

  if (!featuredPublicationHref) {
    throw new Error(`Missing public resource for featured publication: ${featuredPublication.id}`);
  }

  const profileDimensions = [
    {
      id: 'project-management',
      title: localizedContent.profileDimensions.projectManagement.title,
      description: localizedContent.profileDimensions.projectManagement.description,
      icon: BriefcaseIcon,
    },
    {
      id: 'software-and-ai',
      title: localizedContent.profileDimensions.softwareAndAi.title,
      description: localizedContent.profileDimensions.softwareAndAi.description,
      icon: CodeIcon,
    },
    {
      id: 'instrumentation',
      title: localizedContent.profileDimensions.instrumentation.title,
      description: localizedContent.profileDimensions.instrumentation.description,
      icon: MicroscopeIcon,
    },
  ] satisfies readonly HomeProfileDimension[];

  return {
    eyebrow: localizedContent.eyebrow,
    title: localizedContent.title,
    introduction: localizedContent.introduction,

    heroActions: localizedContent.heroActions,
    heroImage: {
      src: heroImageSrc,
      alt: localizedContent.heroImage.alt,
    },
    heroHighlights: [
      {
        id: 'project-management',
        label: localizedContent.heroHighlights.projectManagement,
        icon: BriefcaseIcon,
      },
      {
        id: 'software-and-ai',
        label: localizedContent.heroHighlights.softwareAndAi,
        icon: CodeIcon,
      },
      {
        id: 'instrumentation',
        label: localizedContent.heroHighlights.instrumentation,
        icon: MicroscopeIcon,
      },
      {
        id: 'location',
        label: localizedContent.heroHighlights.location,
        icon: MapPinIcon,
      },
    ],

    profileDimensions: {
      title: localizedContent.profileDimensions.title,
      items: profileDimensions,
    },

    practicalInformation: {
      title: localizedContent.practicalInformation.title,
      location: localizedContent.practicalInformation.location,
      employment: localizedContent.practicalInformation.employment,
      workMode: localizedContent.practicalInformation.workMode,
      travel: localizedContent.practicalInformation.travel,
      languages: localizedContent.practicalInformation.languages,
    },

    featuredWorks: {
      title: localizedContent.featuredWorks.title,

      description: localizedContent.featuredWorks.description,

      items: [
        {
          kind: 'project',
          kindLabel: localizedContent.featuredWorks.kindLabels.project,
          contentId: featuredProject.id,
          title: featuredProject.title,
          actionLabel: localizedContent.featuredWorks.projectActionLabel,
          employer: featuredProjectExperience.organization,
          role: featuredProjectExperience.role,
          period: featuredProject.period,
        },
        {
          kind: 'software',
          kindLabel: localizedContent.featuredWorks.kindLabels.software,
          contentId: featuredSoftware.id,
          title: featuredSoftware.title,
          actionLabel: localizedContent.featuredWorks.softwareActionLabel,
          primaryLanguage: featuredSoftwarePrimaryLanguage,
          technologies: getSoftwareTags(featuredSoftware),
        },
        {
          kind: 'publication',
          kindLabel: localizedContent.featuredWorks.kindLabels.publication,
          contentId: featuredPublication.id,
          title: featuredPublication.title,
          actionLabel: localizedContent.featuredWorks.publicationActionLabel,
          journal: featuredPublicationJournal,
          year: featuredPublication.year,
          authors: featuredPublication.authors.map((author) => author.name),
          href: featuredPublicationHref,
        },
      ],
    },

    statement: {
      text: localizedContent.statement.text,
      action: {
        label: localizedContent.statement.actionLabel,
        pageId: 'experience',
      },
    },

    researchAxes: {
      title: localizedContent.researchAxes.title,

      description: localizedContent.researchAxes.description,

      actionLabel: localizedContent.researchAxes.actionLabel,

      items: researchThemes.map((theme) => ({
        id: theme.id,
        title: theme.title,
        description: theme.introduction,
        icon: theme.icon,
      })),
    },

    follow: {
      title: localizedContent.follow.title,

      description: localizedContent.follow.description,

      location: {
        label: localizedContent.practicalInformation.location,
        icon: MapPinIcon,
      },

      links: [
        {
          id: 'linkedin',
          label: 'LinkedIn',
          href: linkedinProfile.href,
          icon: LinkedinLogoIcon,
        },
        {
          id: 'github',
          label: 'GitHub',
          href: githubProfile.href,
          icon: GithubLogoIcon,
        },
        {
          id: 'orcid',
          label: 'ORCID',
          href: orcidProfile.href,
          icon: OrcidIcon,
        },
      ],
    },
  };
}

export function getHomeContent(language: SupportedLanguage): HomeContent {
  const localizedContent = selectLocalizedContent(localizedHomeContent, language);

  return assembleHomeContent(localizedContent, language);
}
