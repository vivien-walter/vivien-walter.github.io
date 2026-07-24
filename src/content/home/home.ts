import {
  AtomIcon,
  BrainIcon,
  BriefcaseIcon,
  CodeIcon,
  GithubLogoIcon,
  IdentificationBadgeIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  MicroscopeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

import { publicProfile } from "@/content/common/profile";
import { getProjectById } from "@/content/projects/page";
import type { ProjectId } from "@/content/projects/registry";
import { getPublicationById } from "@/content/research/page";
import type { PublicationId } from "@/content/research/publications/registry";
import { getSoftwareById } from "@/content/software/page";
import type { SoftwareId } from "@/content/software/registry";
import { selectLocalizedContent } from "@/lib/content/localization";
import type {
  LocalizedContent,
  SupportedLanguage,
} from "@/types/localization";

import enHomeJson from "./home.en.json";
import frHomeJson from "./home.fr.json";

type LocalizedProfileDimension = {
  readonly title: string;
  readonly description: string;
};

type LocalizedHomeContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction: string;

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
    readonly kindLabels: {
      readonly project: string;
      readonly software: string;
      readonly publication: string;
    };
    readonly projectActionLabel: string;
    readonly molecularCommunicationPublication: {
      readonly actionLabel: string;
    };
  };

  readonly statement: {
    readonly text: string;
    readonly actionLabel: string;
  };

  readonly researchAxes: {
    readonly title: string;
    readonly actionLabel: string;
    readonly opticsAndPhotonics: LocalizedProfileDimension;
    readonly scientificAi: LocalizedProfileDimension;
    readonly scientificSoftware: LocalizedProfileDimension;
    readonly collaborativeSystems: LocalizedProfileDimension;
  };

  readonly follow: {
    readonly title: string;
  };
};

export type HomeIcon = typeof BriefcaseIcon;

export type HomeHeroHighlight = {
  readonly id:
    | "project-management"
    | "software-and-ai"
    | "instrumentation"
    | "location";
  readonly label: string;
  readonly icon: HomeIcon;
};

export type HomeProfileDimension = {
  readonly id:
    | "project-management"
    | "software-and-ai"
    | "instrumentation";
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

type HomeFeaturedWorkBase<
  ContentId extends string,
> = {
  readonly contentId: ContentId;
  readonly kindLabel: string;
  readonly title: string;
  readonly summary: string;
  readonly image?: HomeFeaturedWorkImage;
};

export type HomeFeaturedProject =
  HomeFeaturedWorkBase<ProjectId> & {
    readonly kind: "project";
    readonly actionLabel: string;
    readonly period: {
      readonly start: string;
      readonly end?: string;
    };
  };

export type HomeFeaturedSoftware =
  HomeFeaturedWorkBase<SoftwareId> & {
    readonly kind: "software";
    readonly actionLabel: string;
    readonly projectId: ProjectId;
    readonly primaryLanguage: string;
  };

export type HomeFeaturedPublication =
  HomeFeaturedWorkBase<PublicationId> & {
    readonly kind: "publication";
    readonly journal: string;
    readonly doi: {
      readonly label: string;
      readonly href: string;
    };
  };

export type HomeFeaturedWork =
  | HomeFeaturedProject
  | HomeFeaturedSoftware
  | HomeFeaturedPublication;

export type HomeFeaturedWorksContent = {
  readonly title: string;
  readonly items: readonly HomeFeaturedWork[];
};

export type HomeStatementPageId =
  | "experience"
  | "projects"
  | "research"
  | "software"
  | "contact";

export type HomeStatementContent = {
  readonly text: string;
  readonly action: {
    readonly label: string;
    readonly pageId: HomeStatementPageId;
  };
};

export type HomeResearchAxis = {
  readonly id:
    | "optics-photonics"
    | "scientific-ai"
    | "scientific-software"
    | "collaborative-systems";
  readonly title: string;
  readonly description: string;
  readonly icon: HomeIcon;
};

export type HomeResearchAxesContent = {
  readonly title: string;
  readonly actionLabel: string;
  readonly items: readonly HomeResearchAxis[];
};

export type HomeFollowLink = {
  readonly id:
    | "linkedin"
    | "github"
    | "orcid";
  readonly label: string;
  readonly href: string;
  readonly icon: HomeIcon;
};

export type HomeFollowContent = {
  readonly title: string;
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
  readonly heroHighlights:
    readonly HomeHeroHighlight[];
  readonly profileDimensions:
    HomeProfileDimensionsContent;
  readonly practicalInformation:
    HomePracticalInformationContent;
  readonly featuredWorks:
    HomeFeaturedWorksContent;
  readonly statement: HomeStatementContent;
  readonly researchAxes:
    HomeResearchAxesContent;
  readonly follow: HomeFollowContent;
};

const localizedHomeContent = {
  fr: frHomeJson,
  en: enHomeJson,
} satisfies LocalizedContent<LocalizedHomeContent>;

function getPublicProfileLink(
  id: HomeFollowLink["id"],
): (typeof publicProfile.externalLinks)[number] {
  const link =
    publicProfile.externalLinks.find(
      (candidate) =>
        candidate.id === id,
    );

  if (!link) {
    throw new Error(
      `Missing public profile link: ${id}`,
    );
  }

  return link;
}

function getRequiredProject(
  language: SupportedLanguage,
  projectId: ProjectId,
) {
  const project = getProjectById(
    language,
    projectId,
  );

  if (!project) {
    throw new Error(
      `Missing canonical project: ${projectId}`,
    );
  }

  return project;
}

function getRequiredSoftware(
  language: SupportedLanguage,
  softwareId: SoftwareId,
) {
  const software = getSoftwareById(
    language,
    softwareId,
  );

  if (!software) {
    throw new Error(
      `Missing canonical software: ${softwareId}`,
    );
  }

  return software;
}

function getRequiredPublication(
  language: SupportedLanguage,
  publicationId: PublicationId,
) {
  const publication =
    getPublicationById(
      language,
      publicationId,
    );

  if (!publication) {
    throw new Error(
      `Missing canonical publication: ${publicationId}`,
    );
  }

  return publication;
}

function assembleHomeContent(
  localizedContent: LocalizedHomeContent,
  language: SupportedLanguage,
): HomeContent {
  const linkedinProfile =
    getPublicProfileLink("linkedin");

  const githubProfile =
    getPublicProfileLink("github");

  const orcidProfile =
    getPublicProfileLink("orcid");

  const lxpCampus = getRequiredProject(
    language,
    "lxp-campus",
  );

  const mllpa = getRequiredSoftware(
    language,
    "mllpa",
  );

  const molecularCommunicationPublication =
    getRequiredPublication(
      language,
      "nature-molecular-communication-2023",
    );

  const [
    mllpaProjectId,
  ] = mllpa.projectIds;

  const [
    mllpaPrimaryLanguage,
  ] = mllpa.languages;

  const publicationSummary =
    molecularCommunicationPublication
      .description.paragraphs[0];

  if (!mllpaProjectId) {
    throw new Error(
      "Missing canonical project relation for software: mllpa",
    );
  }

  if (!mllpaPrimaryLanguage) {
    throw new Error(
      "Missing canonical language for software: mllpa",
    );
  }

  if (!publicationSummary) {
    throw new Error(
      "Missing canonical description for publication: nature-molecular-communication-2023",
    );
  }

  const profileDimensions = [
    {
      id: "project-management",
      title:
        localizedContent
          .profileDimensions
          .projectManagement
          .title,
      description:
        localizedContent
          .profileDimensions
          .projectManagement
          .description,
      icon: BriefcaseIcon,
    },
    {
      id: "software-and-ai",
      title:
        localizedContent
          .profileDimensions
          .softwareAndAi
          .title,
      description:
        localizedContent
          .profileDimensions
          .softwareAndAi
          .description,
      icon: CodeIcon,
    },
    {
      id: "instrumentation",
      title:
        localizedContent
          .profileDimensions
          .instrumentation
          .title,
      description:
        localizedContent
          .profileDimensions
          .instrumentation
          .description,
      icon: MicroscopeIcon,
    },
  ] satisfies readonly HomeProfileDimension[];

  return {
    eyebrow: localizedContent.eyebrow,
    title: localizedContent.title,
    introduction:
      localizedContent.introduction,

    heroHighlights: [
      {
        id: "project-management",
        label:
          localizedContent
            .profileDimensions
            .projectManagement
            .title,
        icon: BriefcaseIcon,
      },
      {
        id: "software-and-ai",
        label:
          localizedContent
            .profileDimensions
            .softwareAndAi
            .title,
        icon: CodeIcon,
      },
      {
        id: "instrumentation",
        label:
          localizedContent
            .profileDimensions
            .instrumentation
            .title,
        icon: MicroscopeIcon,
      },
      {
        id: "location",
        label:
          localizedContent
            .practicalInformation
            .location,
        icon: MapPinIcon,
      },
    ],

    profileDimensions: {
      title:
        localizedContent
          .profileDimensions
          .title,
      items: profileDimensions,
    },

    practicalInformation: {
      title:
        localizedContent
          .practicalInformation
          .title,
      location:
        localizedContent
          .practicalInformation
          .location,
      employment:
        localizedContent
          .practicalInformation
          .employment,
      workMode:
        localizedContent
          .practicalInformation
          .workMode,
      travel:
        localizedContent
          .practicalInformation
          .travel,
      languages:
        localizedContent
          .practicalInformation
          .languages,
    },

    featuredWorks: {
      title:
        localizedContent
          .featuredWorks
          .title,

      items: [
        {
          kind: "project",
          kindLabel:
            localizedContent
              .featuredWorks
              .kindLabels
              .project,
          contentId: lxpCampus.id,
          title: lxpCampus.title,
          summary: lxpCampus.summary,
          actionLabel:
            localizedContent
              .featuredWorks
              .projectActionLabel,
          period: lxpCampus.period,
        },
        {
          kind: "software",
          kindLabel:
            localizedContent
              .featuredWorks
              .kindLabels
              .software,
          contentId: mllpa.id,
          projectId: mllpaProjectId,
          title: mllpa.title,
          summary: mllpa.summary,
          actionLabel:
            localizedContent
              .featuredWorks
              .projectActionLabel,
          primaryLanguage:
            mllpaPrimaryLanguage,
        },
        {
          kind: "publication",
          kindLabel:
            localizedContent
              .featuredWorks
              .kindLabels
              .publication,
          contentId:
            molecularCommunicationPublication.id,
          title:
            molecularCommunicationPublication.title,
          summary: publicationSummary,
          journal:
            molecularCommunicationPublication
              .publication,
          doi: {
            label:
              localizedContent
                .featuredWorks
                .molecularCommunicationPublication
                .actionLabel,
            href:
              molecularCommunicationPublication
                .doi.href,
          },
        },
      ],
    },

    statement: {
      text:
        localizedContent
          .statement
          .text,
      action: {
        label:
          localizedContent
            .statement
            .actionLabel,
        pageId: "experience",
      },
    },

    researchAxes: {
      title:
        localizedContent
          .researchAxes
          .title,
      actionLabel:
        localizedContent
          .researchAxes
          .actionLabel,

      items: [
        {
          id: "optics-photonics",
          title:
            localizedContent
              .researchAxes
              .opticsAndPhotonics
              .title,
          description:
            localizedContent
              .researchAxes
              .opticsAndPhotonics
              .description,
          icon: AtomIcon,
        },
        {
          id: "scientific-ai",
          title:
            localizedContent
              .researchAxes
              .scientificAi
              .title,
          description:
            localizedContent
              .researchAxes
              .scientificAi
              .description,
          icon: BrainIcon,
        },
        {
          id: "scientific-software",
          title:
            localizedContent
              .researchAxes
              .scientificSoftware
              .title,
          description:
            localizedContent
              .researchAxes
              .scientificSoftware
              .description,
          icon: CodeIcon,
        },
        {
          id: "collaborative-systems",
          title:
            localizedContent
              .researchAxes
              .collaborativeSystems
              .title,
          description:
            localizedContent
              .researchAxes
              .collaborativeSystems
              .description,
          icon: UsersThreeIcon,
        },
      ],
    },

    follow: {
      title:
        localizedContent
          .follow
          .title,

      location: {
        label:
          localizedContent
            .practicalInformation
            .location,
        icon: MapPinIcon,
      },

      links: [
        {
          id: "linkedin",
          label: "LinkedIn",
          href: linkedinProfile.href,
          icon: LinkedinLogoIcon,
        },
        {
          id: "github",
          label: "GitHub",
          href: githubProfile.href,
          icon: GithubLogoIcon,
        },
        {
          id: "orcid",
          label: "ORCID",
          href: orcidProfile.href,
          icon: IdentificationBadgeIcon,
        },
      ],
    },
  };
}

export function getHomeContent(
  language: SupportedLanguage,
): HomeContent {
  const localizedContent =
    selectLocalizedContent(
      localizedHomeContent,
      language,
    );

  return assembleHomeContent(
    localizedContent,
    language,
  );
}