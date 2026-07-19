import enSiteContent from "../locales/en/site-content.json";
import frSiteContent from "../locales/fr/site-content.json";
import {
  navigationPageIds,
  type NavigationPageId,
  type SupportedLanguage,
} from "../navigation";
import { siteLinks, type SiteLinkId } from "./site-links";

export const missingContentPlaceholder = "[CONTENU À FOURNIR — NE PAS PUBLIER]";

export type ProjectId = string;
export type SoftwareId = string;
export type PublicationId = string;

export type InternalContentLink = {
  readonly label: string;
  readonly pageId: NavigationPageId;
  readonly siteLinkId?: never;
};

export type ExternalContentLink = {
  readonly label: string;
  readonly siteLinkId: SiteLinkId;
  readonly pageId?: never;
};

export type ContentLink = InternalContentLink | ExternalContentLink;

export type ProfileContent = {
  readonly name: string;
  readonly role: string;
  readonly domains: string;
  readonly introduction: string;
};

export type PageIntroductionContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction: string | readonly string[];
};

export type ProfileDimension = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
};

export type HomePageContent = PageIntroductionContent & {
  readonly primaryLinks: readonly ContentLink[];
  readonly dimensionsTitle: string;
  readonly dimensions: readonly ProfileDimension[];
  readonly selectedContentTitle: string;
  readonly selectedProjectIds: readonly ProjectId[];
  readonly selectedSoftwareIds: readonly SoftwareId[];
  readonly practicalTitle: string;
  readonly practicalItems: readonly string[];
  readonly contactLink: ContentLink;
};

export type JourneyStep = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
};

export type ExperienceEntry = {
  readonly id: string;
  readonly period: string;
  readonly organisation: string;
  readonly location: string;
  readonly publicTitle?: string;
  readonly contractualTitle: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly projectIds?: readonly ProjectId[];
};

export type ParallelActivityEntry = {
  readonly id: string;
  readonly period: string;
  readonly title: string;
  readonly summary: string;
  readonly highlights: readonly string[];
};

export type TeachingEntry = {
  readonly id: string;
  readonly period: string;
  readonly title: string;
  readonly organisation: string;
  readonly summary: string;
};

export type EducationEntry = {
  readonly id: string;
  readonly period: string;
  readonly qualification: string;
  readonly institution: string;
  readonly detail?: string;
};

export type ExperiencePageContent = PageIntroductionContent & {
  readonly journeyTitle: string;
  readonly journey: readonly JourneyStep[];
  readonly mainExperienceTitle: string;
  readonly mainExperiences: readonly ExperienceEntry[];
  readonly parallelTitle: string;
  readonly parallelIntroduction: string;
  readonly parallelActivities: readonly ParallelActivityEntry[];
  readonly teachingTitle: string;
  readonly teaching: readonly TeachingEntry[];
  readonly educationTitle: string;
  readonly education: readonly EducationEntry[];
  readonly personalTitle: string;
  readonly personalIntroduction: string;
  readonly personalActivities: readonly string[];
};

export type ProjectEntry = {
  readonly id: ProjectId;
  readonly title: string;
  readonly period: string;
  readonly status: string;
  readonly summary: string;
  readonly context: string;
  readonly role: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly links: readonly ContentLink[];
  readonly confidentiality?: string;
  readonly relatedSoftwareIds: readonly SoftwareId[];
  readonly relatedPublicationIds: readonly PublicationId[];
};

export type Project = ProjectEntry;
export type ProjectContent = ProjectEntry;

export type ProjectsPageContent = PageIntroductionContent & {
  readonly featuredProjectId: ProjectId;
  readonly otherProjectsTitle: string;
  readonly otherProjectIds: readonly ProjectId[];
  readonly continuationTitle: string;
  readonly continuationText: string;
  readonly continuationLinks: readonly ContentLink[];
};

export type ResearchAxis = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
};

export type ResearchPageContent = PageIntroductionContent & {
  readonly axesTitle: string;
  readonly axes: readonly ResearchAxis[];
  readonly currentWorkTitle: string;
  readonly currentWork: readonly string[];
  readonly selectedPublicationsTitle: string;
  readonly selectedPublicationIds: readonly PublicationId[];
  readonly publicationsTitle: string;
  readonly publicationIds: readonly PublicationId[];
  readonly resourcesTitle: string;
  readonly softwareIds: readonly SoftwareId[];
  readonly externalLinksTitle: string;
  readonly externalLinkIds: readonly SiteLinkId[];
};

export type SoftwareEntry = {
  readonly id: SoftwareId;
  readonly title: string;
  readonly status: string;
  readonly summary: string;
  readonly context: string;
  readonly contribution: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly links: readonly ContentLink[];
  readonly resources: readonly ContentLink[];
  readonly siteLinkIds: readonly SiteLinkId[];
  readonly relatedProjectIds: readonly ProjectId[];
  readonly relatedPublicationIds: readonly PublicationId[];
};

export type Software = SoftwareEntry;
export type SoftwareContent = SoftwareEntry;

export type SoftwarePageContent = PageIntroductionContent & {
  readonly featuredSoftwareId: SoftwareId;
  readonly primaryTitle: string;
  readonly primarySoftwareIds: readonly SoftwareId[];
  readonly secondaryTitle: string;
  readonly secondarySoftwareIds: readonly SoftwareId[];
  readonly continuationTitle: string;
  readonly continuationLinks: readonly ContentLink[];
};

export type PublicationEntry = {
  readonly id: PublicationId;
  readonly title: string;
  readonly authors: string;
  readonly year: string;
  readonly venue: string;
  readonly reference: string;
  readonly contribution: string;
  readonly links: readonly ContentLink[];
  readonly relatedProjectIds: readonly ProjectId[];
  readonly relatedSoftwareIds: readonly SoftwareId[];
};

export type Publication = PublicationEntry;
export type PublicationContent = PublicationEntry;

export type ContactPageContent = PageIntroductionContent & {
  readonly channelsTitle: string;
  readonly channelLinkIds: readonly SiteLinkId[];
  readonly availabilityTitle: string;
  readonly availabilityItems: readonly string[];
  readonly cvTitle: string;
  readonly cvNotice: string;
};

export type SiteContent = {
  readonly profile: ProfileContent;
  readonly home: HomePageContent;
  readonly experiencePage: ExperiencePageContent;
  readonly projectsPage: ProjectsPageContent;
  readonly researchPage: ResearchPageContent;
  readonly softwarePage: SoftwarePageContent;
  readonly contactPage: ContactPageContent;
  readonly projects: Readonly<Record<ProjectId, ProjectEntry>>;
  readonly software: Readonly<Record<SoftwareId, SoftwareEntry>>;
  readonly publications: Readonly<Record<PublicationId, PublicationEntry>>;
};

export type ContentIssue = {
  readonly language: SupportedLanguage;
  readonly path: string;
  readonly message: string;
};

export type SiteContentState = {
  readonly content: SiteContent;
  readonly issues: readonly ContentIssue[];
};

export type AdjacentContentIds = {
  readonly previousId?: string;
  readonly nextId?: string;
};

type RawContentLink = {
  readonly label: string;
  readonly pageId?: string;
  readonly siteLinkId?: string;
};

type RawProjectEntry = {
  readonly id: string;
  readonly title: string;
  readonly period: string;
  readonly status: string;
  readonly summary: string;
  readonly context: string;
  readonly role: string;
  readonly highlights: readonly string[];
  readonly confidentiality?: string;
};

type RawSoftwareEntry = {
  readonly id: string;
  readonly name: string;
  readonly purpose: string;
  readonly context: string;
  readonly contribution: string;
  readonly status: string;
  readonly technologies?: readonly string[];
  readonly linkIds?: readonly string[];
  readonly relatedProjectIds?: readonly string[];
  readonly relatedPublicationIds?: readonly string[];
};

type RawPublicationEntry = {
  readonly id: string;
  readonly title: string;
  readonly journal: string;
  readonly year: string;
  readonly contribution: string;
  readonly relatedProjectIds?: readonly string[];
  readonly relatedSoftwareIds?: readonly string[];
};

type RawHomePageContent = Omit<
  HomePageContent,
  "primaryLinks" | "selectedProjectIds" | "selectedSoftwareIds" | "contactLink"
> & {
  readonly primaryLinks: readonly RawContentLink[];
  readonly selectedProjectIds: readonly string[];
  readonly selectedSoftwareIds: readonly string[];
  readonly contactLink: RawContentLink;
};

type RawProjectsPageContent = Omit<
  ProjectsPageContent,
  "featuredProjectId" | "otherProjectIds" | "continuationLinks"
> & {
  readonly featuredProjectId: string;
  readonly otherProjectIds: readonly string[];
  readonly continuationLinks: readonly RawContentLink[];
};

type RawResearchPageContent = Omit<
  ResearchPageContent,
  | "selectedPublicationIds"
  | "publicationIds"
  | "softwareIds"
  | "externalLinkIds"
> & {
  readonly selectedPublicationIds: readonly string[];
  readonly publicationIds: readonly string[];
  readonly softwareIds: readonly string[];
  readonly externalLinkIds: readonly string[];
};

type RawSoftwarePageContent = Omit<
  SoftwarePageContent,
  | "featuredSoftwareId"
  | "primarySoftwareIds"
  | "secondarySoftwareIds"
  | "continuationLinks"
> & {
  readonly featuredSoftwareId: string;
  readonly primarySoftwareIds: readonly string[];
  readonly secondarySoftwareIds: readonly string[];
  readonly continuationLinks: readonly RawContentLink[];
};

type RawContactPageContent = Omit<ContactPageContent, "channelLinkIds"> & {
  readonly channelLinkIds: readonly string[];
};

type RawSiteContent = {
  readonly profile: ProfileContent;
  readonly home: RawHomePageContent;
  readonly experiencePage: ExperiencePageContent;
  readonly projectsPage: RawProjectsPageContent;
  readonly researchPage: RawResearchPageContent;
  readonly softwarePage: RawSoftwarePageContent;
  readonly contactPage: RawContactPageContent;
  readonly projects: Readonly<Record<string, RawProjectEntry>>;
  readonly software: Readonly<Record<string, RawSoftwareEntry>>;
  readonly publications: Readonly<Record<string, RawPublicationEntry>>;
};

const rawContentByLanguage: Readonly<
  Record<SupportedLanguage, RawSiteContent>
> = {
  fr: frSiteContent as RawSiteContent,
  en: enSiteContent as RawSiteContent,
};

const siteLinkLabels: Readonly<Record<SiteLinkId, string>> = {
  email: "Email",
  linkedin: "LinkedIn",
  github: "GitHub",
  orcid: "ORCID",
  mllpa: "MLLPA",
};

function addIssue(
  issues: ContentIssue[],
  language: SupportedLanguage,
  path: string,
  message: string,
): void {
  issues.push({
    language,
    path,
    message,
  });
}

function readRequiredText(
  value: unknown,
  language: SupportedLanguage,
  path: string,
  issues: ContentIssue[],
): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  addIssue(
    issues,
    language,
    path,
    "Une chaîne de caractères non vide est requise.",
  );

  return missingContentPlaceholder;
}

function readOptionalText(
  value: unknown,
  language: SupportedLanguage,
  path: string,
  issues: ContentIssue[],
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  addIssue(
    issues,
    language,
    path,
    "La valeur facultative doit être une chaîne non vide.",
  );

  return undefined;
}

function readStringArray(
  value: unknown,
  language: SupportedLanguage,
  path: string,
  issues: ContentIssue[],
): readonly string[] {
  if (!Array.isArray(value)) {
    addIssue(issues, language, path, "Un tableau est requis.");

    return [];
  }

  const result: string[] = [];

  value.forEach((item, index) => {
    if (typeof item === "string" && item.trim().length > 0) {
      result.push(item);
      return;
    }

    addIssue(
      issues,
      language,
      `${path}[${index}]`,
      "Une chaîne de caractères non vide est requise.",
    );
  });

  return result;
}

function isNavigationPageId(value: string): value is NavigationPageId {
  return navigationPageIds.some((pageId) => pageId === value);
}

function isSiteLinkId(value: string): value is SiteLinkId {
  return Object.prototype.hasOwnProperty.call(siteLinks, value);
}

function normalizeContentLink(
  rawLink: RawContentLink,
  language: SupportedLanguage,
  path: string,
  issues: ContentIssue[],
): ContentLink | undefined {
  const label = readRequiredText(
    rawLink.label,
    language,
    `${path}.label`,
    issues,
  );

  const hasPageId =
    typeof rawLink.pageId === "string" && rawLink.pageId.length > 0;

  const hasSiteLinkId =
    typeof rawLink.siteLinkId === "string" && rawLink.siteLinkId.length > 0;

  if (hasPageId === hasSiteLinkId) {
    addIssue(
      issues,
      language,
      path,
      "Un lien doit définir exactement une destination.",
    );

    return undefined;
  }

  if (hasPageId) {
    if (!isNavigationPageId(rawLink.pageId as string)) {
      addIssue(
        issues,
        language,
        `${path}.pageId`,
        `La page "${rawLink.pageId}" est inconnue.`,
      );

      return undefined;
    }

    return {
      label,
      pageId: rawLink.pageId as NavigationPageId,
    };
  }

  if (!isSiteLinkId(rawLink.siteLinkId as string)) {
    addIssue(
      issues,
      language,
      `${path}.siteLinkId`,
      `Le lien externe "${rawLink.siteLinkId}" est inconnu.`,
    );

    return undefined;
  }

  return {
    label,
    siteLinkId: rawLink.siteLinkId as SiteLinkId,
  };
}

function normalizeContentLinks(
  rawLinks: readonly RawContentLink[],
  language: SupportedLanguage,
  path: string,
  issues: ContentIssue[],
): readonly ContentLink[] {
  return rawLinks.flatMap((rawLink, index) => {
    const normalizedLink = normalizeContentLink(
      rawLink,
      language,
      `${path}[${index}]`,
      issues,
    );

    return normalizedLink ? [normalizedLink] : [];
  });
}

function normalizeRequiredContentLink(
  rawLink: RawContentLink,
  language: SupportedLanguage,
  path: string,
  issues: ContentIssue[],
  fallbackPageId: NavigationPageId,
): ContentLink {
  return (
    normalizeContentLink(rawLink, language, path, issues) ?? {
      label: missingContentPlaceholder,
      pageId: fallbackPageId,
    }
  );
}

function normalizeReferencedIds(
  rawIds: readonly string[] | undefined,
  availableRecord: Readonly<Record<string, unknown>>,
  language: SupportedLanguage,
  path: string,
  issues: ContentIssue[],
): readonly string[] {
  const identifiers = readStringArray(rawIds ?? [], language, path, issues);

  return identifiers.filter((identifier) => {
    const exists = Object.prototype.hasOwnProperty.call(
      availableRecord,
      identifier,
    );

    if (!exists) {
      addIssue(
        issues,
        language,
        path,
        `L’identifiant "${identifier}" ne correspond à aucune entrée.`,
      );
    }

    return exists;
  });
}

function normalizeSiteLinkIds(
  rawIds: readonly string[] | undefined,
  language: SupportedLanguage,
  path: string,
  issues: ContentIssue[],
): readonly SiteLinkId[] {
  return readStringArray(rawIds ?? [], language, path, issues).filter(
    (identifier): identifier is SiteLinkId => {
      const valid = isSiteLinkId(identifier);

      if (!valid) {
        addIssue(
          issues,
          language,
          path,
          `Le lien externe "${identifier}" est inconnu.`,
        );
      }

      return valid;
    },
  );
}

function normalizeFeaturedId(
  rawId: string,
  availableRecord: Readonly<Record<string, unknown>>,
  language: SupportedLanguage,
  path: string,
  issues: ContentIssue[],
): string {
  if (Object.prototype.hasOwnProperty.call(availableRecord, rawId)) {
    return rawId;
  }

  addIssue(
    issues,
    language,
    path,
    `L’identifiant "${rawId}" ne correspond à aucune entrée.`,
  );

  return Object.keys(availableRecord)[0] ?? "content-unavailable";
}

function normalizeProjects(
  rawProjects: Readonly<Record<string, RawProjectEntry>>,
  language: SupportedLanguage,
  issues: ContentIssue[],
): Readonly<Record<ProjectId, ProjectEntry>> {
  const projects: Record<ProjectId, ProjectEntry> = {};

  Object.entries(rawProjects).forEach(([recordKey, rawProject]) => {
    if (recordKey !== rawProject.id) {
      addIssue(
        issues,
        language,
        `projects.${recordKey}.id`,
        `La clé "${recordKey}" diffère de l’identifiant "${rawProject.id}".`,
      );
    }

    projects[recordKey] = {
      id: recordKey,
      title: readRequiredText(
        rawProject.title,
        language,
        `projects.${recordKey}.title`,
        issues,
      ),
      period: readRequiredText(
        rawProject.period,
        language,
        `projects.${recordKey}.period`,
        issues,
      ),
      status: readRequiredText(
        rawProject.status,
        language,
        `projects.${recordKey}.status`,
        issues,
      ),
      summary: readRequiredText(
        rawProject.summary,
        language,
        `projects.${recordKey}.summary`,
        issues,
      ),
      context: readRequiredText(
        rawProject.context,
        language,
        `projects.${recordKey}.context`,
        issues,
      ),
      role: readRequiredText(
        rawProject.role,
        language,
        `projects.${recordKey}.role`,
        issues,
      ),
      description: "",
      highlights: readStringArray(
        rawProject.highlights,
        language,
        `projects.${recordKey}.highlights`,
        issues,
      ),
      technologies: [],
      links: [],
      confidentiality: readOptionalText(
        rawProject.confidentiality,
        language,
        `projects.${recordKey}.confidentiality`,
        issues,
      ),
      relatedSoftwareIds: [],
      relatedPublicationIds: [],
    };
  });

  if (Object.keys(projects).length === 0) {
    projects["content-unavailable"] = {
      id: "content-unavailable",
      title: missingContentPlaceholder,
      period: missingContentPlaceholder,
      status: missingContentPlaceholder,
      summary: missingContentPlaceholder,
      context: missingContentPlaceholder,
      role: missingContentPlaceholder,
      description: "",
      highlights: [],
      technologies: [],
      links: [],
      relatedSoftwareIds: [],
      relatedPublicationIds: [],
    };

    addIssue(
      issues,
      language,
      "projects",
      "Aucun projet valide n’est disponible.",
    );
  }

  return projects;
}

function normalizeSoftware(
  rawSoftware: Readonly<Record<string, RawSoftwareEntry>>,
  projects: Readonly<Record<ProjectId, ProjectEntry>>,
  rawPublications: Readonly<Record<string, RawPublicationEntry>>,
  language: SupportedLanguage,
  issues: ContentIssue[],
): Readonly<Record<SoftwareId, SoftwareEntry>> {
  const softwareRecord: Record<SoftwareId, SoftwareEntry> = {};

  Object.entries(rawSoftware).forEach(([recordKey, rawSoftwareEntry]) => {
    if (recordKey !== rawSoftwareEntry.id) {
      addIssue(
        issues,
        language,
        `software.${recordKey}.id`,
        `La clé "${recordKey}" diffère de l’identifiant "${rawSoftwareEntry.id}".`,
      );
    }

    const siteLinkIds = normalizeSiteLinkIds(
      rawSoftwareEntry.linkIds,
      language,
      `software.${recordKey}.linkIds`,
      issues,
    );

    softwareRecord[recordKey] = {
      id: recordKey,
      title: readRequiredText(
        rawSoftwareEntry.name,
        language,
        `software.${recordKey}.name`,
        issues,
      ),
      status: readRequiredText(
        rawSoftwareEntry.status,
        language,
        `software.${recordKey}.status`,
        issues,
      ),
      summary: readRequiredText(
        rawSoftwareEntry.purpose,
        language,
        `software.${recordKey}.purpose`,
        issues,
      ),
      context: readRequiredText(
        rawSoftwareEntry.context,
        language,
        `software.${recordKey}.context`,
        issues,
      ),
      contribution: readRequiredText(
        rawSoftwareEntry.contribution,
        language,
        `software.${recordKey}.contribution`,
        issues,
      ),
      description: "",
      highlights: [],
      technologies: readStringArray(
        rawSoftwareEntry.technologies ?? [],
        language,
        `software.${recordKey}.technologies`,
        issues,
      ),
      links: siteLinkIds.map((siteLinkId) => ({
        label: siteLinkLabels[siteLinkId],
        siteLinkId,
      })),
      resources: [],
      siteLinkIds,
      relatedProjectIds: normalizeReferencedIds(
        rawSoftwareEntry.relatedProjectIds,
        projects,
        language,
        `software.${recordKey}.relatedProjectIds`,
        issues,
      ),
      relatedPublicationIds: normalizeReferencedIds(
        rawSoftwareEntry.relatedPublicationIds,
        rawPublications,
        language,
        `software.${recordKey}.relatedPublicationIds`,
        issues,
      ),
    };
  });

  if (Object.keys(softwareRecord).length === 0) {
    softwareRecord["content-unavailable"] = {
      id: "content-unavailable",
      title: missingContentPlaceholder,
      status: missingContentPlaceholder,
      summary: missingContentPlaceholder,
      context: missingContentPlaceholder,
      contribution: missingContentPlaceholder,
      description: "",
      highlights: [],
      technologies: [],
      links: [],
      resources: [],
      siteLinkIds: [],
      relatedProjectIds: [],
      relatedPublicationIds: [],
    };

    addIssue(
      issues,
      language,
      "software",
      "Aucun logiciel valide n’est disponible.",
    );
  }

  return softwareRecord;
}

function normalizePublications(
  rawPublications: Readonly<Record<string, RawPublicationEntry>>,
  projects: Readonly<Record<ProjectId, ProjectEntry>>,
  software: Readonly<Record<SoftwareId, SoftwareEntry>>,
  language: SupportedLanguage,
  issues: ContentIssue[],
): Readonly<Record<PublicationId, PublicationEntry>> {
  const publications: Record<PublicationId, PublicationEntry> = {};

  Object.entries(rawPublications).forEach(([recordKey, rawPublication]) => {
    if (recordKey !== rawPublication.id) {
      addIssue(
        issues,
        language,
        `publications.${recordKey}.id`,
        `La clé "${recordKey}" diffère de l’identifiant "${rawPublication.id}".`,
      );
    }

    publications[recordKey] = {
      id: recordKey,
      title: readRequiredText(
        rawPublication.title,
        language,
        `publications.${recordKey}.title`,
        issues,
      ),
      authors: "",
      year: readRequiredText(
        rawPublication.year,
        language,
        `publications.${recordKey}.year`,
        issues,
      ),
      venue: readRequiredText(
        rawPublication.journal,
        language,
        `publications.${recordKey}.journal`,
        issues,
      ),
      reference: "",
      contribution: readRequiredText(
        rawPublication.contribution,
        language,
        `publications.${recordKey}.contribution`,
        issues,
      ),
      links: [],
      relatedProjectIds: normalizeReferencedIds(
        rawPublication.relatedProjectIds,
        projects,
        language,
        `publications.${recordKey}.relatedProjectIds`,
        issues,
      ),
      relatedSoftwareIds: normalizeReferencedIds(
        rawPublication.relatedSoftwareIds,
        software,
        language,
        `publications.${recordKey}.relatedSoftwareIds`,
        issues,
      ),
    };
  });

  if (Object.keys(publications).length === 0) {
    publications["content-unavailable"] = {
      id: "content-unavailable",
      title: missingContentPlaceholder,
      authors: "",
      year: missingContentPlaceholder,
      venue: missingContentPlaceholder,
      reference: "",
      contribution: missingContentPlaceholder,
      links: [],
      relatedProjectIds: [],
      relatedSoftwareIds: [],
    };

    addIssue(
      issues,
      language,
      "publications",
      "Aucune publication valide n’est disponible.",
    );
  }

  return publications;
}

function addInverseProjectRelations(
  projects: Readonly<Record<ProjectId, ProjectEntry>>,
  software: Readonly<Record<SoftwareId, SoftwareEntry>>,
  publications: Readonly<Record<PublicationId, PublicationEntry>>,
): Readonly<Record<ProjectId, ProjectEntry>> {
  return Object.fromEntries(
    Object.values(projects).map((project) => {
      const relatedSoftwareIds = Object.values(software)
        .filter((softwareEntry) =>
          softwareEntry.relatedProjectIds.includes(project.id),
        )
        .map((softwareEntry) => softwareEntry.id);

      const relatedPublicationIds = Object.values(publications)
        .filter((publication) =>
          publication.relatedProjectIds.includes(project.id),
        )
        .map((publication) => publication.id);

      return [
        project.id,
        {
          ...project,
          relatedSoftwareIds,
          relatedPublicationIds,
        },
      ];
    }),
  );
}

function compareLanguageRecordKeys(
  recordName: string,
  firstRecord: Readonly<Record<string, unknown>>,
  secondRecord: Readonly<Record<string, unknown>>,
  issuesByLanguage: Record<SupportedLanguage, ContentIssue[]>,
): void {
  const firstKeys = Object.keys(firstRecord).sort();
  const secondKeys = Object.keys(secondRecord).sort();

  if (
    firstKeys.length === secondKeys.length &&
    firstKeys.every((key, index) => key === secondKeys[index])
  ) {
    return;
  }

  addIssue(
    issuesByLanguage.fr,
    "fr",
    recordName,
    "Les versions française et anglaise ne contiennent pas les mêmes identifiants.",
  );

  addIssue(
    issuesByLanguage.en,
    "en",
    recordName,
    "Les versions française et anglaise ne contiennent pas les mêmes identifiants.",
  );
}

function normalizeSiteContent(
  language: SupportedLanguage,
  rawContent: RawSiteContent,
  issues: ContentIssue[],
): SiteContent {
  const normalizedProjects = normalizeProjects(
    rawContent.projects,
    language,
    issues,
  );

  const normalizedSoftware = normalizeSoftware(
    rawContent.software,
    normalizedProjects,
    rawContent.publications,
    language,
    issues,
  );

  const normalizedPublications = normalizePublications(
    rawContent.publications,
    normalizedProjects,
    normalizedSoftware,
    language,
    issues,
  );

  const projects = addInverseProjectRelations(
    normalizedProjects,
    normalizedSoftware,
    normalizedPublications,
  );

  return {
    profile: rawContent.profile,
    home: {
      ...rawContent.home,
      primaryLinks: normalizeContentLinks(
        rawContent.home.primaryLinks,
        language,
        "home.primaryLinks",
        issues,
      ),
      selectedProjectIds: normalizeReferencedIds(
        rawContent.home.selectedProjectIds,
        projects,
        language,
        "home.selectedProjectIds",
        issues,
      ),
      selectedSoftwareIds: normalizeReferencedIds(
        rawContent.home.selectedSoftwareIds,
        normalizedSoftware,
        language,
        "home.selectedSoftwareIds",
        issues,
      ),
      contactLink: normalizeRequiredContentLink(
        rawContent.home.contactLink,
        language,
        "home.contactLink",
        issues,
        "contact",
      ),
    },
    experiencePage: {
      ...rawContent.experiencePage,
      mainExperiences: rawContent.experiencePage.mainExperiences.map(
        (experience, index) => ({
          ...experience,
          projectIds:
            experience.projectIds === undefined
              ? undefined
              : normalizeReferencedIds(
                  experience.projectIds,
                  projects,
                  language,
                  `experiencePage.mainExperiences[${index}].projectIds`,
                  issues,
                ),
        }),
      ),
    },
    projectsPage: {
      ...rawContent.projectsPage,
      featuredProjectId: normalizeFeaturedId(
        rawContent.projectsPage.featuredProjectId,
        projects,
        language,
        "projectsPage.featuredProjectId",
        issues,
      ),
      otherProjectIds: normalizeReferencedIds(
        rawContent.projectsPage.otherProjectIds,
        projects,
        language,
        "projectsPage.otherProjectIds",
        issues,
      ),
      continuationLinks: normalizeContentLinks(
        rawContent.projectsPage.continuationLinks,
        language,
        "projectsPage.continuationLinks",
        issues,
      ),
    },
    researchPage: {
      ...rawContent.researchPage,
      selectedPublicationIds: normalizeReferencedIds(
        rawContent.researchPage.selectedPublicationIds,
        normalizedPublications,
        language,
        "researchPage.selectedPublicationIds",
        issues,
      ),
      publicationIds: normalizeReferencedIds(
        rawContent.researchPage.publicationIds,
        normalizedPublications,
        language,
        "researchPage.publicationIds",
        issues,
      ),
      softwareIds: normalizeReferencedIds(
        rawContent.researchPage.softwareIds,
        normalizedSoftware,
        language,
        "researchPage.softwareIds",
        issues,
      ),
      externalLinkIds: normalizeSiteLinkIds(
        rawContent.researchPage.externalLinkIds,
        language,
        "researchPage.externalLinkIds",
        issues,
      ),
    },
    softwarePage: {
      ...rawContent.softwarePage,
      featuredSoftwareId: normalizeFeaturedId(
        rawContent.softwarePage.featuredSoftwareId,
        normalizedSoftware,
        language,
        "softwarePage.featuredSoftwareId",
        issues,
      ),
      primarySoftwareIds: normalizeReferencedIds(
        rawContent.softwarePage.primarySoftwareIds,
        normalizedSoftware,
        language,
        "softwarePage.primarySoftwareIds",
        issues,
      ),
      secondarySoftwareIds: normalizeReferencedIds(
        rawContent.softwarePage.secondarySoftwareIds,
        normalizedSoftware,
        language,
        "softwarePage.secondarySoftwareIds",
        issues,
      ),
      continuationLinks: normalizeContentLinks(
        rawContent.softwarePage.continuationLinks,
        language,
        "softwarePage.continuationLinks",
        issues,
      ),
    },
    contactPage: {
      ...rawContent.contactPage,
      channelLinkIds: normalizeSiteLinkIds(
        rawContent.contactPage.channelLinkIds,
        language,
        "contactPage.channelLinkIds",
        issues,
      ),
    },
    projects,
    software: normalizedSoftware,
    publications: normalizedPublications,
  };
}

const issuesByLanguage: Record<SupportedLanguage, ContentIssue[]> = {
  fr: [],
  en: [],
};

compareLanguageRecordKeys(
  "projects",
  rawContentByLanguage.fr.projects,
  rawContentByLanguage.en.projects,
  issuesByLanguage,
);

compareLanguageRecordKeys(
  "software",
  rawContentByLanguage.fr.software,
  rawContentByLanguage.en.software,
  issuesByLanguage,
);

compareLanguageRecordKeys(
  "publications",
  rawContentByLanguage.fr.publications,
  rawContentByLanguage.en.publications,
  issuesByLanguage,
);

const siteContentByLanguage: Readonly<Record<SupportedLanguage, SiteContent>> =
  {
    fr: normalizeSiteContent(
      "fr",
      rawContentByLanguage.fr,
      issuesByLanguage.fr,
    ),
    en: normalizeSiteContent(
      "en",
      rawContentByLanguage.en,
      issuesByLanguage.en,
    ),
  };

function uniqueIds(ids: readonly string[]): readonly string[] {
  return [...new Set(ids)];
}

function getAdjacentIds(
  orderedIds: readonly string[],
  currentId: string,
): AdjacentContentIds {
  const currentIndex = orderedIds.indexOf(currentId);

  if (currentIndex < 0) {
    return {};
  }

  return {
    previousId: currentIndex > 0 ? orderedIds[currentIndex - 1] : undefined,
    nextId:
      currentIndex < orderedIds.length - 1
        ? orderedIds[currentIndex + 1]
        : undefined,
  };
}

export function getSiteContent(language: SupportedLanguage): SiteContent {
  return siteContentByLanguage[language];
}

export function getSiteContentState(
  language: SupportedLanguage,
): SiteContentState {
  return {
    content: siteContentByLanguage[language],
    issues: issuesByLanguage[language],
  };
}

export function getContentIssues(
  language: SupportedLanguage,
): readonly ContentIssue[] {
  return issuesByLanguage[language];
}

export function getProject(
  language: SupportedLanguage,
  projectId: string,
): ProjectEntry | undefined {
  return siteContentByLanguage[language].projects[projectId];
}

export function getSoftware(
  language: SupportedLanguage,
  softwareId: string,
): SoftwareEntry | undefined {
  return siteContentByLanguage[language].software[softwareId];
}

export function getPublication(
  language: SupportedLanguage,
  publicationId: string,
): PublicationEntry | undefined {
  return siteContentByLanguage[language].publications[publicationId];
}

export function getOrderedProjectIds(
  language: SupportedLanguage,
): readonly ProjectId[] {
  const content = siteContentByLanguage[language];

  return uniqueIds([
    content.projectsPage.featuredProjectId,
    ...content.projectsPage.otherProjectIds,
    ...Object.keys(content.projects),
  ]);
}

export function getOrderedSoftwareIds(
  language: SupportedLanguage,
): readonly SoftwareId[] {
  const content = siteContentByLanguage[language];

  return uniqueIds([
    content.softwarePage.featuredSoftwareId,
    ...content.softwarePage.primarySoftwareIds,
    ...content.softwarePage.secondarySoftwareIds,
    ...Object.keys(content.software),
  ]);
}

export function getAdjacentProjectIds(
  language: SupportedLanguage,
  projectId: string,
): AdjacentContentIds {
  return getAdjacentIds(getOrderedProjectIds(language), projectId);
}

export function getAdjacentSoftwareIds(
  language: SupportedLanguage,
  softwareId: string,
): AdjacentContentIds {
  return getAdjacentIds(getOrderedSoftwareIds(language), softwareId);
}
