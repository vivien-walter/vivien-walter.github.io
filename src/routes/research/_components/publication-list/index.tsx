import { useMemo, useState } from 'react';

import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

import Header from './header';
import {
  buildJournalOptions,
  buildThemeOptions,
  filterAndSortPublications,
  type PublicationKind,
  type PublicationSortOption,
  type PublicationThemeOption,
  updateSelection,
} from './helpers';
import PublicationEntry, { type PublicationEntryItem } from './publication-entry';

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
  readonly themes?: readonly PublicationThemeOption[];
  readonly language: SupportedLanguage;
  readonly contained?: boolean;
  readonly labels: PublicationListLabels;
  readonly showThemeFilter?: boolean;
};

const defaultVisiblePublicationCount = 5;

export default function PublicationList({
  title,
  description,
  titleId,
  items,
  themes = [],
  language,
  contained = false,
  labels,
  showThemeFilter = true,
}: PublicationListProps) {
  const [activeKind, setActiveKind] = useState<PublicationKind>('article');
  const [sortBy, setSortBy] = useState<PublicationSortOption>('year-descending');
  const [selectedThemes, setSelectedThemes] = useState<ReadonlySet<string>>(() => new Set<string>());
  const [selectedJournals, setSelectedJournals] = useState<ReadonlySet<string>>(() => new Set<string>());
  const [showAllPublications, setShowAllPublications] = useState(false);
  const [hasChangedSort, setHasChangedSort] = useState(false);

  const themeOptions = useMemo(() => buildThemeOptions(items, themes, showThemeFilter), [items, showThemeFilter, themes]);

  const journalOptions = useMemo(() => buildJournalOptions(items, language), [items, language]);

  const filteredItems = useMemo(
    () =>
      filterAndSortPublications({
        items,
        activeKind,
        selectedThemes,
        selectedJournals,
        showThemeFilter,
        sortBy,
        language,
      }),
    [activeKind, items, language, selectedJournals, selectedThemes, showThemeFilter, sortBy],
  );

  const hasActiveFilters = (showThemeFilter && selectedThemes.size > 0) || selectedJournals.size > 0;

  const shouldShowAllPublications = showAllPublications || hasChangedSort || hasActiveFilters;

  const displayedItems = shouldShowAllPublications ? filteredItems : filteredItems.slice(0, defaultVisiblePublicationCount);

  const canShowAllPublications = !shouldShowAllPublications && filteredItems.length > defaultVisiblePublicationCount;

  const hasVisiblePublications = filteredItems.length > 0;

  const articlesTabId = `${titleId}-articles-tab`;
  const thesesTabId = `${titleId}-theses-tab`;
  const panelId = `${titleId}-panel`;

  function changeKind(nextKind: PublicationKind) {
    setActiveKind(nextKind);
    setSelectedJournals(new Set<string>());
    setShowAllPublications(false);
  }

  return (
    <Section contained={contained} className="py-12 sm:py-14 lg:py-16" aria-labelledby={titleId}>
      <Header
        activeKind={activeKind}
        articlesTabId={articlesTabId}
        controls={{
          sortBy,
          themeOptions,
          journalOptions: activeKind === 'article' ? journalOptions : [],
          selectedThemes,
          selectedJournals,
          labels: labels.controls,
          showThemeFilter,
          onSortChange: (value) => {
            setSortBy(value);
            setHasChangedSort(true);
          },
          onThemeChange: (value, checked) => {
            setSelectedThemes((currentSelection) => updateSelection(currentSelection, value, checked));
          },
          onJournalChange: (value, checked) => {
            setSelectedJournals((currentSelection) => updateSelection(currentSelection, value, checked));
          },
          onClearFilters: () => {
            setSelectedThemes(new Set<string>());
            setSelectedJournals(new Set<string>());
          },
        }}
        description={description}
        onKindChange={changeKind}
        panelId={panelId}
        tabs={labels.tabs}
        thesesTabId={thesesTabId}
        title={title}
        titleId={titleId}
      />

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={activeKind === 'article' ? articlesTabId : thesesTabId}
        tabIndex={0}
        className={cn(
          'rounded-lg',
          hasVisiblePublications ? 'mt-3 sm:mt-4' : 'mt-4',
          'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
        )}
      >
        {hasVisiblePublications ? (
          <>
            <ul aria-label={labels.tableLabel} className="m-0 grid list-none gap-3 p-0">
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
                  className="border-brand-primary bg-brand-background text-brand-primary hover:bg-action-soft hover:text-action-strong min-h-11 px-6 shadow-none"
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
          <p className="bg-brand-hero text-muted-foreground !m-0 rounded-lg px-5 py-8 text-center">
            {activeKind === 'article' ? labels.emptyStates.articles : labels.emptyStates.theses}
          </p>
        )}
      </div>
    </Section>
  );
}
