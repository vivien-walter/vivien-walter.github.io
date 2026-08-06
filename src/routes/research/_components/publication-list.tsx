import { type KeyboardEvent, useMemo, useState } from 'react';

import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Button } from '@/components/ui/button';
import type { ResearchThemeId } from '@/content/research/registry';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

import PublicationControls, { type PublicationFilterOption, type PublicationSortOption } from './publication-controls';
import PublicationEntry, { type PublicationEntryItem } from './publication-entry';

type PublicationKind = 'article' | 'thesis';

type PublicationThemeOption = {
  readonly id: ResearchThemeId;
  readonly title: string;
};

type PublicationListLabels = {
  readonly tabs: {
    readonly articles: string;
    readonly theses: string;
  };
  readonly tableLabel: string;
  readonly actions: {
    readonly viewMore: string;
    readonly showMore: string;
    readonly doi: string;
  };
  readonly emptyStates: {
    readonly articles: string;
    readonly theses: string;
  };
  readonly controls: {
    readonly sortLabel: string;
    readonly sortPlaceholder: string;
    readonly sortByYearDescending: string;
    readonly sortByYearAscending: string;
    readonly sortByTitleAscending: string;
    readonly sortByTitleDescending: string;
    readonly sortByJournalAscending: string;
    readonly sortByJournalDescending: string;
    readonly filters: string;
    readonly filterByTheme: string;
    readonly filterByJournal: string;
    readonly clearFilters: string;
  };
};

type PublicationListProps = {
  readonly title: string;
  readonly description?: string;
  readonly titleId: string;
  readonly items: readonly PublicationEntryItem[];
  readonly themes: readonly PublicationThemeOption[];
  readonly language: SupportedLanguage;
  readonly labels: PublicationListLabels;
  readonly showThemeFilter?: boolean;
};

const defaultVisiblePublicationCount = 5;

function updateSelection(currentSelection: ReadonlySet<string>, value: string, checked: boolean): ReadonlySet<string> {
  const nextSelection = new Set(currentSelection);

  if (checked) {
    nextSelection.add(value);
  } else {
    nextSelection.delete(value);
  }

  return nextSelection;
}

function PublicationList({ title, description, titleId, items, themes, language, labels, showThemeFilter = true }: PublicationListProps) {
  const [activeTab, setActiveTab] = useState<PublicationKind>('article');

  const [sortBy, setSortBy] = useState<PublicationSortOption>('year-descending');

  const [selectedThemes, setSelectedThemes] = useState<ReadonlySet<string>>(() => new Set<string>());

  const [selectedJournals, setSelectedJournals] = useState<ReadonlySet<string>>(() => new Set<string>());

  const [showAllPublications, setShowAllPublications] = useState(false);

  const [hasChangedSort, setHasChangedSort] = useState(false);

  const locale = language === 'fr' ? 'fr-FR' : 'en-GB';

  const collator = useMemo(
    () =>
      new Intl.Collator(locale, {
        sensitivity: 'base',
        numeric: true,
      }),
    [locale],
  );

  const themeOptions = useMemo<readonly PublicationFilterOption[]>(() => {
    if (!showThemeFilter) {
      return [];
    }

    return themes
      .filter((theme) => items.some((item) => item.themeIds.includes(theme.id)))
      .map((theme) => ({
        value: theme.id,
        label: theme.title,
      }));
  }, [items, showThemeFilter, themes]);

  const journalOptions = useMemo<readonly PublicationFilterOption[]>(() => {
    const journals = new Set<string>();

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
  }, [collator, items]);

  const filteredItems = useMemo(() => {
    return items
      .map((item, originalIndex) => ({
        item,
        originalIndex,
      }))
      .filter(({ item }) => {
        if (item.kind !== activeTab) {
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
  }, [activeTab, collator, items, selectedJournals, selectedThemes, showThemeFilter, sortBy]);

  const hasActiveFilters = (showThemeFilter && selectedThemes.size > 0) || selectedJournals.size > 0;

  const shouldShowAllPublications = showAllPublications || hasChangedSort || hasActiveFilters;

  const displayedItems = shouldShowAllPublications ? filteredItems : filteredItems.slice(0, defaultVisiblePublicationCount);

  const canShowAllPublications = !shouldShowAllPublications && filteredItems.length > defaultVisiblePublicationCount;

  const hasVisiblePublications = filteredItems.length > 0;

  const articlesTabId = `${titleId}-articles-tab`;

  const thesesTabId = `${titleId}-theses-tab`;

  const panelId = `${titleId}-panel`;

  function changeTab(nextTab: PublicationKind) {
    setActiveTab(nextTab);

    setSelectedJournals(new Set<string>());

    setShowAllPublications(false);
  }

  function focusTab(tabId: string) {
    window.requestAnimationFrame(() => {
      document.getElementById(tabId)?.focus();
    });
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        event.preventDefault();

        const nextTab = activeTab === 'article' ? 'thesis' : 'article';

        changeTab(nextTab);

        focusTab(nextTab === 'article' ? articlesTabId : thesesTabId);

        break;
      }

      case 'Home':
        event.preventDefault();

        changeTab('article');
        focusTab(articlesTabId);
        break;

      case 'End':
        event.preventDefault();

        changeTab('thesis');
        focusTab(thesesTabId);
        break;
    }
  }

  return (
    <Section contained={false} className="border-border border-t py-12 sm:py-14 lg:py-16" aria-labelledby={titleId}>
      <SectionHeader className="mb-7 sm:mb-8">
        <SectionTitle id={titleId}>{title}</SectionTitle>
        {description ? <SectionDescription>{description}</SectionDescription> : null}
      </SectionHeader>

      <div className={cn('flex flex-col', 'lg:flex-row', 'lg:items-end', 'lg:justify-between')}>
        <div
          role="tablist"
          aria-label={title}
          onKeyDown={handleTabKeyDown}
          className={cn('order-2 flex min-w-0', 'items-end gap-7', 'overflow-x-auto', 'sm:gap-10', 'lg:order-1')}
        >
          <Button
            id={articlesTabId}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={activeTab === 'article'}
            aria-controls={panelId}
            tabIndex={activeTab === 'article' ? 0 : -1}
            className={cn(
              'relative min-h-12',
              'shrink-0 rounded-none',
              'border-0 bg-transparent',
              'px-1 py-3',
              'text-sm font-semibold',
              'text-muted-foreground',
              'shadow-none',
              'hover:bg-transparent',
              'hover:text-brand-primary',
              'focus-visible:bg-transparent',
              activeTab === 'article' && [
                'text-brand-primary',
                'after:absolute',
                'after:right-0',
                'after:bottom-0',
                'after:left-0',
                'after:z-10',
                'after:h-0.5',
                'after:bg-brand-primary',
              ],
            )}
            onClick={() => {
              changeTab('article');
            }}
          >
            {labels.tabs.articles}
          </Button>

          <Button
            id={thesesTabId}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={activeTab === 'thesis'}
            aria-controls={panelId}
            tabIndex={activeTab === 'thesis' ? 0 : -1}
            className={cn(
              'relative min-h-12',
              'shrink-0 rounded-none',
              'border-0 bg-transparent',
              'px-1 py-3',
              'text-sm font-semibold',
              'text-muted-foreground',
              'shadow-none',
              'hover:bg-transparent',
              'hover:text-brand-primary',
              'focus-visible:bg-transparent',
              activeTab === 'thesis' && [
                'text-brand-primary',
                'after:absolute',
                'after:right-0',
                'after:bottom-0',
                'after:left-0',
                'after:z-10',
                'after:h-0.5',
                'after:bg-brand-primary',
              ],
            )}
            onClick={() => {
              changeTab('thesis');
            }}
          >
            {labels.tabs.theses}
          </Button>
        </div>

        <div className={cn('order-1 mb-4', 'flex justify-end', 'lg:order-2 lg:mb-2')}>
          <PublicationControls
            sortBy={sortBy}
            themeOptions={themeOptions}
            journalOptions={activeTab === 'article' ? journalOptions : []}
            selectedThemes={selectedThemes}
            selectedJournals={selectedJournals}
            labels={labels.controls}
            showThemeFilter={showThemeFilter}
            onSortChange={(value) => {
              setSortBy(value);
              setHasChangedSort(true);
            }}
            onThemeChange={(value, checked) => {
              setSelectedThemes((currentSelection) => updateSelection(currentSelection, value, checked));
            }}
            onJournalChange={(value, checked) => {
              setSelectedJournals((currentSelection) => updateSelection(currentSelection, value, checked));
            }}
            onClearFilters={() => {
              setSelectedThemes(new Set<string>());

              setSelectedJournals(new Set<string>());
            }}
          />
        </div>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={activeTab === 'article' ? articlesTabId : thesesTabId}
        tabIndex={0}
        className={cn(
          'rounded-lg',
          hasVisiblePublications ? 'mt-3 sm:mt-4' : 'mt-4',
          'focus-visible:outline-none',
          'focus-visible:ring-[3px]',
          'focus-visible:ring-ring/50',
        )}
      >
        {hasVisiblePublications ? (
          <>
            <ul aria-label={labels.tableLabel} className={cn('m-0 grid list-none', 'gap-3 p-0')}>
              {displayedItems.map((publication) => (
                <li key={publication.id} className="m-0 min-w-0">
                  <PublicationEntry publication={publication} viewMoreLabel={labels.actions.viewMore} doiLabel={labels.actions.doi} />
                </li>
              ))}
            </ul>

            {canShowAllPublications ? (
              <div className="mt-6 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    'min-h-11',
                    'border-brand-primary',
                    'bg-brand-background',
                    'px-6',
                    'text-brand-primary',
                    'shadow-none',
                    'hover:bg-action-soft',
                    'hover:text-action-strong',
                  )}
                  onClick={() => {
                    setShowAllPublications(true);
                  }}
                >
                  {labels.actions.showMore}
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <p className={cn('!m-0 rounded-lg', 'bg-brand-hero', 'px-5 py-8', 'text-center', 'text-muted-foreground')}>
            {activeTab === 'article' ? labels.emptyStates.articles : labels.emptyStates.theses}
          </p>
        )}
      </div>
    </Section>
  );
}

export default PublicationList;
