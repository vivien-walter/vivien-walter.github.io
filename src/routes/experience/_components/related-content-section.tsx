import RelatedItemsSection, { type RelatedItem, type RelatedItemsGroup } from '@/components/related-items-section';

export type RelatedContentItem = {
  readonly id: string;
  readonly title: string;
  readonly to: string;
  readonly secondaryText?: string;
  readonly badges?: readonly string[];
};

export type RelatedContentGroup = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly RelatedContentItem[];
};

type RelatedContentSectionProps = {
  readonly idPrefix: string;
  readonly title: string;
  readonly groups: readonly RelatedContentGroup[];
};

function RelatedContentSection({ idPrefix, title, groups }: RelatedContentSectionProps) {
  const relatedGroups: readonly RelatedItemsGroup[] = groups.map((group) => ({
    id: group.id,
    title: group.title,
    items: group.items.map(
      (item): RelatedItem => ({
        id: item.id,
        label: item.title,
        to: item.to,
        ...(item.secondaryText
          ? {
              secondaryText: item.secondaryText,
            }
          : {}),
        ...(item.badges
          ? {
              badges: item.badges,
            }
          : {}),
      }),
    ),
  }));

  return <RelatedItemsSection title={title} titleId={`${idPrefix}-related-items-title`} groups={relatedGroups} />;
}

export default RelatedContentSection;
