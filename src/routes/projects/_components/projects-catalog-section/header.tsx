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

import type { ProjectSortOption } from './helpers';

type HeaderLabels = {
  readonly sortLabel: string;
  readonly sortPlaceholder: string;
  readonly sortByDateDescending: string;
  readonly sortByDateAscending: string;
  readonly sortByNameAscending: string;
  readonly sortByNameDescending: string;
  readonly filters: string;
  readonly filterByProject: string;
  readonly filterByLanguage: string;
  readonly clearFilters: string;
};

type HeaderProps = {
  readonly sortBy: ProjectSortOption;
  readonly projectOptions: readonly CatalogControlOption[];
  readonly languageOptions: readonly CatalogControlOption[];
  readonly selectedProjects: ReadonlySet<string>;
  readonly selectedLanguages: ReadonlySet<string>;
  readonly labels: HeaderLabels;
  readonly onSortChange: (value: ProjectSortOption) => void;
  readonly onProjectChange: (value: string, checked: boolean) => void;
  readonly onLanguageChange: (value: string, checked: boolean) => void;
  readonly onClearFilters: () => void;
};

export default function Header({
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
}: HeaderProps) {
  const projectGroupId = useId();
  const languageGroupId = useId();

  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = selectedProjects.size + selectedLanguages.size;

  const sortOptions: readonly CatalogControlOption[] = [
    {
      value: 'date-descending',
      label: labels.sortByDateDescending,
    },
    {
      value: 'date-ascending',
      label: labels.sortByDateAscending,
    },
    {
      value: 'name-ascending',
      label: labels.sortByNameAscending,
    },
    {
      value: 'name-descending',
      label: labels.sortByNameDescending,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <CatalogSortSelect
        value={sortBy}
        label={labels.sortLabel}
        placeholder={labels.sortPlaceholder}
        options={sortOptions}
        className="min-w-56"
        onValueChange={(value) => {
          onSortChange(value as ProjectSortOption);
        }}
      />

      <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
        <CatalogFilterTrigger label={labels.filters} activeFilterCount={activeFilterCount} />

        <CatalogFilterContent
          activeFilterCount={activeFilterCount}
          clearLabel={labels.clearFilters}
          onClearFilters={onClearFilters}
          className="w-[min(20rem,calc(100vw-2rem))]"
        >
          <Accordion type="single" collapsible>
            <CatalogFilterGroup
              value="project"
              label={labels.filterByProject}
              groupId={projectGroupId}
              options={projectOptions}
              selectedValues={selectedProjects}
              onChange={onProjectChange}
            />

            <CatalogFilterGroup
              value="language"
              label={labels.filterByLanguage}
              groupId={languageGroupId}
              options={languageOptions}
              selectedValues={selectedLanguages}
              onChange={onLanguageChange}
              scrollable={false}
            />
          </Accordion>
        </CatalogFilterContent>
      </Popover>
    </div>
  );
}
