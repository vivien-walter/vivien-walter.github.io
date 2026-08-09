import { useId, useState } from 'react';

import {
  type CatalogControlOption,
  CatalogFilterContent,
  CatalogFilterGroup,
  CatalogFilterTrigger,
  CatalogSortSelect,
} from '@/components/catalog-controls';
import { Accordion } from '@/components/ui/accordion';
import { Popover } from '@/components/ui/popover';

export type PublicationSortOption =
  | 'year-descending'
  | 'year-ascending'
  | 'title-ascending'
  | 'title-descending'
  | 'journal-ascending'
  | 'journal-descending';

export type PublicationFilterOption = CatalogControlOption;

type PublicationControlsLabels = {
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

type PublicationControlsProps = {
  readonly sortBy: PublicationSortOption;
  readonly themeOptions: readonly PublicationFilterOption[];
  readonly journalOptions: readonly PublicationFilterOption[];
  readonly selectedThemes: ReadonlySet<string>;
  readonly selectedJournals: ReadonlySet<string>;
  readonly labels: PublicationControlsLabels;
  readonly showThemeFilter?: boolean;
  readonly onSortChange: (value: PublicationSortOption) => void;
  readonly onThemeChange: (value: string, checked: boolean) => void;
  readonly onJournalChange: (value: string, checked: boolean) => void;
  readonly onClearFilters: () => void;
};

function PublicationControls({
  sortBy,
  themeOptions,
  journalOptions,
  selectedThemes,
  selectedJournals,
  labels,
  showThemeFilter = true,
  onSortChange,
  onThemeChange,
  onJournalChange,
  onClearFilters,
}: PublicationControlsProps) {
  const themeGroupId = useId();
  const journalGroupId = useId();

  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasThemeFilter = showThemeFilter && themeOptions.length > 0;

  const hasJournalFilter = journalOptions.length > 0;

  const hasAvailableFilters = hasThemeFilter || hasJournalFilter;

  const activeFilterCount = (showThemeFilter ? selectedThemes.size : 0) + selectedJournals.size;

  const sortOptions: readonly CatalogControlOption[] = [
    {
      value: 'year-descending',
      label: labels.sortByYearDescending,
    },
    {
      value: 'year-ascending',
      label: labels.sortByYearAscending,
    },
    {
      value: 'title-ascending',
      label: labels.sortByTitleAscending,
    },
    {
      value: 'title-descending',
      label: labels.sortByTitleDescending,
    },
    {
      value: 'journal-ascending',
      label: labels.sortByJournalAscending,
    },
    {
      value: 'journal-descending',
      label: labels.sortByJournalDescending,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <CatalogSortSelect
        value={sortBy}
        label={labels.sortLabel}
        placeholder={labels.sortPlaceholder}
        options={sortOptions}
        className="min-w-60"
        onValueChange={(value) => {
          onSortChange(value as PublicationSortOption);
        }}
      />

      {hasAvailableFilters ? (
        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CatalogFilterTrigger label={labels.filters} activeFilterCount={activeFilterCount} />

          <CatalogFilterContent
            activeFilterCount={activeFilterCount}
            clearLabel={labels.clearFilters}
            onClearFilters={onClearFilters}
            className="w-[min(22rem,calc(100vw-2rem))]"
          >
            <Accordion type="single" collapsible>
              {hasThemeFilter ? (
                <CatalogFilterGroup
                  value="theme"
                  label={labels.filterByTheme}
                  groupId={themeGroupId}
                  options={themeOptions}
                  selectedValues={selectedThemes}
                  onChange={onThemeChange}
                  scrollable={false}
                />
              ) : null}

              {hasJournalFilter ? (
                <CatalogFilterGroup
                  value="journal"
                  label={labels.filterByJournal}
                  groupId={journalGroupId}
                  options={journalOptions}
                  selectedValues={selectedJournals}
                  onChange={onJournalChange}
                />
              ) : null}
            </Accordion>
          </CatalogFilterContent>
        </Popover>
      ) : null}
    </div>
  );
}

export default PublicationControls;
