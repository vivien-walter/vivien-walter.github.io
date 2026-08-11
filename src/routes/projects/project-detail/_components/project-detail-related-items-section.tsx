import { getExperienceRoute, getResearchPublicationRoute, getSoftwareRoute } from '@/app/routing/navigation';
import PageDivider from '@/components/page-divider';
import RelatedItemsSection, { type RelatedItem, type RelatedItemsGroup } from '@/components/related-items-section';
import { getExperienceById } from '@/content/experience/catalog';
import { getProjectDetailById, getProjectDetailContent } from '@/content/projects/detail/page';
import { getPublicationsByProjectId } from '@/content/research/publications/catalog';
import { getSoftwareByProjectId } from '@/content/software/catalog';
import type { SupportedLanguage } from '@/types/localization';

type ProjectDetail = NonNullable<ReturnType<typeof getProjectDetailById>>;

export type ProjectRelatedItem = RelatedItem;

type ProjectDetailRelatedItemsSectionProps = {
  readonly language: SupportedLanguage;
  readonly project: ProjectDetail;
};

export default function ProjectDetailRelatedItemsSection({ language, project }: ProjectDetailRelatedItemsSectionProps) {
  const detail = getProjectDetailContent(language);

  const relatedExperiences: readonly RelatedItem[] = project.experienceIds.flatMap((experienceId) => {
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

  const relatedSoftware: readonly RelatedItem[] = getSoftwareByProjectId(language, project.id).map((software) => ({
    id: software.id,
    label: software.title,
    badges: software.languages,
    to: getSoftwareRoute(software.id, language),
  }));

  const relatedPublications: readonly RelatedItem[] = getPublicationsByProjectId(language, project.id).map((publication) => ({
    id: publication.id,
    label: publication.title,
    secondaryText: `${publication.publication} (${publication.year})`,
    to: getResearchPublicationRoute(publication.id, language),
  }));

  const groups: readonly RelatedItemsGroup[] = [
    {
      id: 'experiences',
      title: detail.relatedExperiences,
      items: relatedExperiences,
    },
    {
      id: 'software',
      title: detail.relatedSoftware,
      items: relatedSoftware,
    },
    {
      id: 'publications',
      title: detail.relatedPublications,
      items: relatedPublications,
    },
  ];

  const hasRelatedItems = groups.some(
    (group) =>
      group.title.trim().length > 0 &&
      group.items.some((item) => item.id.trim().length > 0 && item.label.trim().length > 0 && item.to.trim().length > 0),
  );

  if (!hasRelatedItems) {
    return null;
  }

  return (
    <>
      <PageDivider />

      <RelatedItemsSection contained title={detail.relatedItems} titleId={`project-${project.id}-related-items-title`} groups={groups} />
    </>
  );
}
