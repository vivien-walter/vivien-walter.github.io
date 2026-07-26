import type { SoftwareCatalogItem } from './catalog';

export function getSoftwareTags(software: SoftwareCatalogItem): readonly string[] {
  const tags = [...software.languages, ...software.technologyGroups.flatMap((group) => group.items.map((item) => item.label))];

  return Array.from(new Set(tags.filter((tag) => tag.trim().length > 0)));
}
