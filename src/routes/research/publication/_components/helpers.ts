import { getExperienceRoute, getProjectRoute, getResearchThemeRoute, getSoftwareRoute } from '@/app/routing/navigation';
import type { RelatedItemsGroup } from '@/components/related-items-section';
import { getExperienceById } from '@/content/experience/catalog';
import { getProjectById } from '@/content/projects/catalog';
import { getResearchPublicationDetailById, getResearchPublicationPageContent } from '@/content/research/publications/page';
import { getResearchThemeById } from '@/content/research/themes/catalog';
import { getSoftwareById } from '@/content/software/catalog';
import type { SupportedLanguage } from '@/types/localization';

type ResearchPublication = NonNullable<ReturnType<typeof getResearchPublicationDetailById>>;
type ResearchPublicationDetailPageContent = ReturnType<typeof getResearchPublicationPageContent>;

export function buildResearchPublicationRelatedGroups(
  language: SupportedLanguage,
  publication: ResearchPublication,
  detail: ResearchPublicationDetailPageContent,
): readonly RelatedItemsGroup[] {
  const relatedThemes = publication.themeIds.flatMap((themeId) => {
    const theme = getResearchThemeById(language, themeId);

    return theme
      ? [
          {
            id: theme.id,
            label: theme.title,
            to: getResearchThemeRoute(theme.id, language),
          },
        ]
      : [];
  });

  const relatedProjects = publication.projectIds.flatMap((projectId) => {
    const project = getProjectById(language, projectId);

    return project
      ? [
          {
            id: project.id,
            label: project.title,
            to: getProjectRoute(project.id, language),
          },
        ]
      : [];
  });

  const relatedSoftware = publication.softwareIds.flatMap((softwareId) => {
    const software = getSoftwareById(language, softwareId);

    return software
      ? [
          {
            id: software.id,
            label: software.title,
            to: getSoftwareRoute(software.id, language),
          },
        ]
      : [];
  });

  const relatedExperiences = publication.experienceIds.flatMap((experienceId) => {
    const experience = getExperienceById(language, experienceId);

    return experience
      ? [
          {
            id: experience.id,
            label: experience.role,
            secondaryText: experience.organization,
            to: getExperienceRoute(experience.id, language),
          },
        ]
      : [];
  });

  return [
    {
      id: 'themes',
      title: detail.relatedThemes,
      items: relatedThemes,
    },
    {
      id: 'projects',
      title: detail.relatedProjects,
      items: relatedProjects,
    },
    {
      id: 'software',
      title: detail.relatedSoftware,
      items: relatedSoftware,
    },
    {
      id: 'experiences',
      title: detail.relatedExperiences,
      items: relatedExperiences,
    },
  ];
}

export function hasResearchPublicationRelatedItems(groups: readonly RelatedItemsGroup[]): boolean {
  return groups.some(
    (group) =>
      group.title.trim().length > 0 &&
      group.items.some((item) => item.id.trim().length > 0 && item.label.trim().length > 0 && item.to.trim().length > 0),
  );
}
