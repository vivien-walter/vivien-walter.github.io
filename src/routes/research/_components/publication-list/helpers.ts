import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import type { PublicationEntryItem } from './publication-entry';

export type PublicationKind = 'article' | 'thesis';

export type PublicationSortOption =
  | 'year-descending'
  | 'year-ascending'
  | 'title-ascending'
  | 'title-descending'
  | 'journal-ascending'
  | 'journal-descending';

export type PublicationFilterOption = {
  readonly value: string;
  readonly label: string;
};

export type PublicationThemeOption = {
  readonly id: ResearchThemeId;
  readonly title: string;
};

type FilterAndSortPublicationsOptions = {
  readonly items: readonly PublicationEntryItem[];
  readonly activeKind: PublicationKind;
  readonly selectedThemes: ReadonlySet<string>;
  readonly selectedJournals: ReadonlySet<string>;
  readonly showThemeFilter: boolean;
  readonly sortBy: PublicationSortOption;
  readonly language: SupportedLanguage;
};

function getLocale(language: SupportedLanguage): string {
  return language === 'fr' ? 'fr-FR' : 'en-GB';
}

function getCollator(language: SupportedLanguage): Intl.Collator {
  return new Intl.Collator(getLocale(language), {
    sensitivity: 'base',
    numeric: true,
  });
}

export function updateSelection(currentSelection: ReadonlySet<string>, value: string, checked: boolean): ReadonlySet<string> {
  const nextSelection = new Set(currentSelection);

  if (checked) {
    nextSelection.add(value);
  } else {
    nextSelection.delete(value);
  }

  return nextSelection;
}

export function buildThemeOptions(
  items: readonly PublicationEntryItem[],
  themes: readonly PublicationThemeOption[],
  showThemeFilter: boolean,
): readonly PublicationFilterOption[] {
  if (!showThemeFilter) {
    return [];
  }

  return themes
    .filter((theme) => items.some((item) => item.themeIds.includes(theme.id)))
    .map((theme) => ({
      value: theme.id,
      label: theme.title,
    }));
}

export function buildJournalOptions(items: readonly PublicationEntryItem[], language: SupportedLanguage): readonly PublicationFilterOption[] {
  const journals = new Set<string>();
  const collator = getCollator(language);

  items.forEach((item) => {
    const journal = item.publication?.trim();

    if (item.kind === 'article' && journal) {
      journals.add(journal);
    }
  });

  return [...journals]
    .sort((first, second) => collator.compare(first, second))
    .map((journal) => ({
      value: journal,
      label: journal,
    }));
}

export function filterAndSortPublications({
  items,
  activeKind,
  selectedThemes,
  selectedJournals,
  showThemeFilter,
  sortBy,
  language,
}: FilterAndSortPublicationsOptions): readonly PublicationEntryItem[] {
  const collator = getCollator(language);

  return items
    .map((item, originalIndex) => ({
      item,
      originalIndex,
    }))
    .filter(({ item }) => {
      if (item.kind !== activeKind) {
        return false;
      }

      const matchesTheme = !showThemeFilter || selectedThemes.size === 0 || item.themeIds.some((themeId) => selectedThemes.has(themeId));

      const matchesJournal =
        item.kind === 'thesis' || selectedJournals.size === 0 || (item.publication !== undefined && selectedJournals.has(item.publication));

      return matchesTheme && matchesJournal;
    })
    .sort((first, second) => {
      let comparison = 0;

      switch (sortBy) {
        case 'year-descending':
          comparison = second.item.year - first.item.year;
          break;

        case 'year-ascending':
          comparison = first.item.year - second.item.year;
          break;

        case 'title-ascending':
          comparison = collator.compare(first.item.title, second.item.title);
          break;

        case 'title-descending':
          comparison = collator.compare(second.item.title, first.item.title);
          break;

        case 'journal-ascending':
          comparison = collator.compare(first.item.publication ?? '', second.item.publication ?? '');
          break;

        case 'journal-descending':
          comparison = collator.compare(second.item.publication ?? '', first.item.publication ?? '');
          break;
      }

      return comparison !== 0 ? comparison : first.originalIndex - second.originalIndex;
    })
    .map(({ item }) => item);
}
