import type {
  ContentCollection,
  ContentId,
  ContentIndex,
} from "@/types/content";

export type OrderedContentEntry<TContent> = {
  readonly id: ContentId;
  readonly content: TContent;
};

export type AdjacentContentIds = {
  readonly previousId?: ContentId;
  readonly nextId?: ContentId;
};

function hasContentId<TContent>(
  collection: ContentCollection<TContent>,
  id: ContentId,
): boolean {
  return Object.prototype.hasOwnProperty.call(collection, id);
}

export function getContentById<TContent>(
  collection: ContentCollection<TContent>,
  id: ContentId,
): TContent | undefined {
  if (!hasContentId(collection, id)) {
    return undefined;
  }

  return collection[id];
}

export function getOrderedContentEntries<TContent>(
  collection: ContentCollection<TContent>,
  index: ContentIndex,
): readonly OrderedContentEntry<TContent>[] {
  return index.order.flatMap((id) => {
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

export function getAdjacentContentIds(
  index: ContentIndex,
  currentId: ContentId,
): AdjacentContentIds {
  const currentIndex = index.order.indexOf(currentId);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previousId:
      currentIndex > 0
        ? index.order[currentIndex - 1]
        : undefined,
    nextId:
      currentIndex < index.order.length - 1
        ? index.order[currentIndex + 1]
        : undefined,
  };
}