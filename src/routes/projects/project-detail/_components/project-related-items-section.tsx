import RelatedItemsSection, { type RelatedItem, type RelatedItemsGroup } from '@/components/related-items-section';

export type ProjectRelatedItem = RelatedItem;

type ProjectRelatedItemsSectionProps = {
  readonly title: string;
  readonly titleId: string;
  readonly experiencesTitle: string;
  readonly softwareTitle: string;
  readonly publicationsTitle: string;
  readonly experiences?: readonly ProjectRelatedItem[];
  readonly software?: readonly ProjectRelatedItem[];
  readonly publications?: readonly ProjectRelatedItem[];
};

function ProjectRelatedItemsSection({
  title,
  titleId,
  experiencesTitle,
  softwareTitle,
  publicationsTitle,
  experiences = [],
  software = [],
  publications = [],
}: ProjectRelatedItemsSectionProps) {
  const groups: readonly RelatedItemsGroup[] = [
    {
      id: 'experiences',
      title: experiencesTitle,
      items: experiences,
    },
    {
      id: 'software',
      title: softwareTitle,
      items: software,
    },
    {
      id: 'publications',
      title: publicationsTitle,
      items: publications,
    },
  ];

  return <RelatedItemsSection title={title} titleId={titleId} groups={groups} />;
}

export default ProjectRelatedItemsSection;
