import { FunnelIcon } from '@phosphor-icons/react';
import { useId } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export type SoftwareSortOption = 'year-descending' | 'year-ascending' | 'title-ascending' | 'title-descending';

export type SoftwareFilterOption = {
  readonly value: string;
  readonly label: string;
};

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

type SoftwareFilterGroupProps = {
  readonly value: string;
  readonly label: string;
  readonly groupId: string;
  readonly options: readonly SoftwareFilterOption[];
  readonly selectedValues: ReadonlySet<string>;
  readonly onChange: (value: string, checked: boolean) => void;
};

function SoftwareFilterGroup({ value, label, groupId, options, selectedValues, onChange }: SoftwareFilterGroupProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-brand-ink rounded-none px-4 py-3 text-sm font-semibold hover:no-underline">{label}</AccordionTrigger>

      <AccordionContent className="border-border bg-brand-hero/50 border-t px-4 py-4">
        <div className="grid max-h-64 gap-3 overflow-y-auto pr-1" role="group" aria-label={label}>
          {options.map((option, index) => {
            const inputId = `${groupId}-${index}`;

            return (
              <div key={option.value} className="flex min-w-0 items-start gap-3">
                <Checkbox
                  id={inputId}
                  className="mt-0.5"
                  checked={selectedValues.has(option.value)}
                  onCheckedChange={(checked) => {
                    onChange(option.value, checked === true);
                  }}
                />

                <label htmlFor={inputId} className="text-foreground min-w-0 cursor-pointer text-sm leading-snug">
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

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

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Select
        value={sortBy}
        onValueChange={(value) => {
          onSortChange(value as SoftwareSortOption);
        }}
      >
        <SelectTrigger
          className="border-border-strong bg-brand-background text-brand-ink min-h-11 min-w-60 shadow-none"
          aria-label={labels.sortLabel}
        >
          <SelectValue placeholder={labels.sortPlaceholder} />
        </SelectTrigger>

        <SelectContent align="end" position="popper">
          <SelectItem value="year-descending">{labels.sortByYearDescending}</SelectItem>

          <SelectItem value="year-ascending">{labels.sortByYearAscending}</SelectItem>

          <SelectItem value="title-ascending">{labels.sortByTitleAscending}</SelectItem>

          <SelectItem value="title-descending">{labels.sortByTitleDescending}</SelectItem>
        </SelectContent>
      </Select>

      {hasAvailableFilters ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="border-border-strong bg-brand-background text-brand-ink hover:bg-brand-background hover:text-brand-ink dark:bg-brand-background dark:hover:bg-brand-background dark:hover:text-brand-ink min-h-11 shadow-none"
            >
              <FunnelIcon aria-hidden="true" className="size-4" weight="regular" />

              {labels.filters}

              {activeFilterCount > 0 ? (
                <span className="bg-brand-primary text-primary-foreground inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold">
                  {activeFilterCount}
                </span>
              ) : null}
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" sideOffset={8} className="border-border-strong shadow-elevated w-[min(22rem,calc(100vw-2rem))] p-0">
            <Accordion type="single" collapsible>
              {hasProjectFilters ? (
                <SoftwareFilterGroup
                  value="project"
                  label={labels.filterByProject}
                  groupId={projectGroupId}
                  options={projectOptions}
                  selectedValues={selectedProjects}
                  onChange={onProjectChange}
                />
              ) : null}

              {hasLanguageFilters ? (
                <SoftwareFilterGroup
                  value="language"
                  label={labels.filterByLanguage}
                  groupId={languageGroupId}
                  options={languageOptions}
                  selectedValues={selectedLanguages}
                  onChange={onLanguageChange}
                />
              ) : null}
            </Accordion>

            {activeFilterCount > 0 ? (
              <>
                <Separator />

                <div className="p-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-brand-primary hover:bg-action-soft hover:text-brand-dark min-h-10 w-full justify-center"
                    onClick={onClearFilters}
                  >
                    {labels.clearFilters}
                  </Button>
                </div>
              </>
            ) : null}
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
}

export default SoftwareControls;
