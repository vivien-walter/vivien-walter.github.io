import { useId } from 'react';

import {
  type CatalogControlOption,
  CatalogFilterContent,
  CatalogFilterGroup,
  CatalogFilterTrigger,
  CatalogSortSelect,
} from '@/components/catalog-controls';
import { Accordion } from '@/components/ui/accordion';
import { Popover } from '@/components/ui/popover';

import type { SoftwareFilterOption, SoftwareSortOption } from './helpers';

type SoftwareControlsLabels = {
  readonly sortLabel: string;
  readonly sortPlaceholder: string;
  readonly sortByYearDescending: string;
  readonly sortByYearAscending: string;
  readonly sortByTitleAscending: string;
  readonly sortByTitleDescending: string;
  readonly filters: string;
  readonly filterByProject: string;
  readonly filterByLanguage: string;
  readonly clearFilters: string;
};

type SoftwareControlsProps = {
  readonly sortBy: SoftwareSortOption;
  readonly projectOptions: readonly SoftwareFilterOption[];
  readonly languageOptions: readonly SoftwareFilterOption[];
  readonly selectedProjects: ReadonlySet<string>;
  readonly selectedLanguages: ReadonlySet<string>;
  readonly labels: SoftwareControlsLabels;
  readonly onSortChange: (value: SoftwareSortOption) => void;
  readonly onProjectChange: (value: string, checked: boolean) => void;
  readonly onLanguageChange: (value: string, checked: boolean) => void;
  readonly onClearFilters: () => void;
};

function SoftwareControls({
  sortBy,
  projectOptions,
  languageOptions,
  selectedProjects,
  selectedLanguages,
  labels,
  onSortChange,
  onProjectChange,
  onLanguageChange,
  onClearFilters,
}: SoftwareControlsProps) {
  const projectGroupId = useId();
  const languageGroupId = useId();

  const hasProjectFilters = projectOptions.length > 0;
  const hasLanguageFilters = languageOptions.length > 0;
  const hasAvailableFilters = hasProjectFilters || hasLanguageFilters;
  const activeFilterCount = selectedProjects.size + selectedLanguages.size;

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
          onSortChange(value as SoftwareSortOption);
        }}
      />

      {hasAvailableFilters ? (
        <Popover>
          <CatalogFilterTrigger label={labels.filters} activeFilterCount={activeFilterCount} />

          <CatalogFilterContent
            activeFilterCount={activeFilterCount}
            clearLabel={labels.clearFilters}
            onClearFilters={onClearFilters}
            className="w-[min(22rem,calc(100vw-2rem))]"
          >
            <Accordion type="single" collapsible>
              {hasProjectFilters ? (
                <CatalogFilterGroup
                  value="project"
                  label={labels.filterByProject}
                  groupId={projectGroupId}
                  options={projectOptions}
                  selectedValues={selectedProjects}
                  onChange={onProjectChange}
                />
              ) : null}

              {hasLanguageFilters ? (
                <CatalogFilterGroup
                  value="language"
                  label={labels.filterByLanguage}
                  groupId={languageGroupId}
                  options={languageOptions}
                  selectedValues={selectedLanguages}
                  onChange={onLanguageChange}
                />
              ) : null}
            </Accordion>
          </CatalogFilterContent>
        </Popover>
      ) : null}
    </div>
  );
}

export default SoftwareControls;
