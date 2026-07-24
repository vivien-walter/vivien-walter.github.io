import type {
  ContentCollection,
  ContentId,
} from "@/types/content";

import { getContentById } from "./collection";

export type RelatedContentEntry<TContent> = {
  readonly id: ContentId;
  readonly content: TContent;
};

export type ContentRelationIndex = Readonly<
  Record<ContentId, readonly ContentId[]>
>;

export function resolveRelatedContent<TContent>(
  ids: readonly ContentId[],
  collection: ContentCollection<TContent>,
): readonly RelatedContentEntry<TContent>[] {
  return ids.flatMap((id) => {
    const content = getContentById(collection, id);

    return content
      ? [
          {
            id,
            content,
          },
        ]
      : [];
  });
}

export function createReverseRelationIndex<TSourceContent>(
  sourceCollection: ContentCollection<TSourceContent>,
  getTargetIds: (
    sourceContent: TSourceContent,
  ) => readonly ContentId[],
): ContentRelationIndex {
  const mutableIndex: Record<ContentId, ContentId[]> = {};

  for (const [sourceId, sourceContent] of Object.entries(
    sourceCollection,
  )) {
    const targetIds = getTargetIds(sourceContent);

    for (const targetId of targetIds) {
      const relatedSourceIds =
        mutableIndex[targetId] ?? [];

      if (!relatedSourceIds.includes(sourceId)) {
        relatedSourceIds.push(sourceId);
      }

      mutableIndex[targetId] = relatedSourceIds;
    }
  }

  return Object.fromEntries(
    Object.entries(mutableIndex).map(
      ([targetId, sourceIds]) => [
        targetId,
        [...sourceIds],
      ],
    ),
  );
}

export function getRelatedIds(
  index: ContentRelationIndex,
  id: ContentId,
): readonly ContentId[] {
  return index[id] ?? [];
}