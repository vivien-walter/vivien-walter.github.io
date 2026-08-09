import RelatedItemsSection, { type RelatedItemsGroup } from '@/components/related-items-section';

export type PublicationRelatedItem = {
  readonly id: string;
  readonly label: string;
  readonly to: string;
};

export type PublicationRelatedGroup = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly PublicationRelatedItem[];
};

type PublicationRelatedItemsSectionProps = {
  readonly groups?: readonly PublicationRelatedGroup[];
  readonly title: string;
  readonly titleId: string;
};

function PublicationRelatedItemsSection({ groups = [], title, titleId }: PublicationRelatedItemsSectionProps) {
  const relatedGroups: readonly RelatedItemsGroup[] = groups;

  return <RelatedItemsSection title={title} titleId={titleId} groups={relatedGroups} variant="button" />;
}

export default PublicationRelatedItemsSection;
