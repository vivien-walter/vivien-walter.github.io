import { FunnelIcon } from "@phosphor-icons/react";
import { useId, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type SoftwareSortOption =
  | "year-descending"
  | "year-ascending"
  | "title-ascending"
  | "title-descending";

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
  readonly projectOptions:
    readonly SoftwareFilterOption[];
  readonly languageOptions:
    readonly SoftwareFilterOption[];
  readonly selectedProjects:
    ReadonlySet<string>;
  readonly selectedLanguages:
    ReadonlySet<string>;
  readonly labels: SoftwareControlsLabels;
  readonly onSortChange: (
    value: SoftwareSortOption,
  ) => void;
  readonly onProjectChange: (
    value: string,
    checked: boolean,
  ) => void;
  readonly onLanguageChange: (
    value: string,
    checked: boolean,
  ) => void;
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

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const hasProjectFilters =
    projectOptions.length > 0;

  const hasLanguageFilters =
    languageOptions.length > 0;

  const hasAvailableFilters =
    hasProjectFilters ||
    hasLanguageFilters;

  const activeFilterCount =
    selectedProjects.size +
    selectedLanguages.size;

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Select
        value={sortBy}
        onValueChange={(value) => {
          onSortChange(
            value as SoftwareSortOption,
          );
        }}
      >
        <SelectTrigger
          className={cn(
            "min-h-11 min-w-60",
            "border-border-strong",
            "bg-brand-background",
            "text-brand-ink shadow-none",
          )}
          aria-label={labels.sortLabel}
        >
          <SelectValue
            placeholder={
              labels.sortPlaceholder
            }
          />
        </SelectTrigger>

        <SelectContent
          align="end"
          position="popper"
        >
          <SelectItem value="year-descending">
            {labels.sortByYearDescending}
          </SelectItem>

          <SelectItem value="year-ascending">
            {labels.sortByYearAscending}
          </SelectItem>

          <SelectItem value="title-ascending">
            {labels.sortByTitleAscending}
          </SelectItem>

          <SelectItem value="title-descending">
            {labels.sortByTitleDescending}
          </SelectItem>
        </SelectContent>
      </Select>

      {hasAvailableFilters ? (
        <Popover
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
        >
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                "min-h-11",
                "border-border-strong",
                "bg-brand-background",
                "text-brand-ink shadow-none",
                "hover:bg-brand-background",
                "hover:text-brand-ink",
                "dark:bg-brand-background",
                "dark:hover:bg-brand-background",
                "dark:hover:text-brand-ink",
              )}
            >
              <FunnelIcon
                aria-hidden="true"
                className="size-4"
                weight="regular"
              />

              {labels.filters}

              {activeFilterCount > 0 ? (
                <span
                  className={cn(
                    "inline-flex min-w-5",
                    "items-center justify-center",
                    "rounded-full",
                    "bg-brand-primary",
                    "px-1.5 py-0.5",
                    "text-xs font-semibold",
                    "text-primary-foreground",
                  )}
                >
                  {activeFilterCount}
                </span>
              ) : null}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={8}
            className={cn(
              "w-[min(22rem,calc(100vw-2rem))]",
              "border-border-strong",
              "p-0 shadow-elevated",
            )}
          >
            <Accordion
              type="single"
              collapsible
            >
              {hasProjectFilters ? (
                <AccordionItem value="project">
                  <AccordionTrigger
                    className={cn(
                      "rounded-none",
                      "px-4 py-3",
                      "text-sm font-semibold",
                      "text-brand-ink",
                      "hover:no-underline",
                    )}
                  >
                    {labels.filterByProject}
                  </AccordionTrigger>

                  <AccordionContent
                    className={cn(
                      "border-t border-border",
                      "bg-brand-hero/50",
                      "px-4 py-4",
                    )}
                  >
                    <div
                      className={cn(
                        "grid max-h-64 gap-3",
                        "overflow-y-auto pr-1",
                      )}
                      role="group"
                      aria-label={
                        labels.filterByProject
                      }
                    >
                      {projectOptions.map(
                        (option, index) => {
                          const inputId =
                            `${projectGroupId}-${index}`;

                          return (
                            <div
                              key={option.value}
                              className={cn(
                                "flex min-w-0",
                                "items-start gap-3",
                              )}
                            >
                              <Checkbox
                                id={inputId}
                                className="mt-0.5"
                                checked={selectedProjects.has(
                                  option.value,
                                )}
                                onCheckedChange={(
                                  checked,
                                ) => {
                                  onProjectChange(
                                    option.value,
                                    checked === true,
                                  );
                                }}
                              />

                              <label
                                htmlFor={inputId}
                                className={cn(
                                  "min-w-0",
                                  "cursor-pointer",
                                  "text-sm leading-snug",
                                  "text-foreground",
                                )}
                              >
                                {option.label}
                              </label>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : null}

              {hasLanguageFilters ? (
                <AccordionItem value="language">
                  <AccordionTrigger
                    className={cn(
                      "rounded-none",
                      "px-4 py-3",
                      "text-sm font-semibold",
                      "text-brand-ink",
                      "hover:no-underline",
                    )}
                  >
                    {labels.filterByLanguage}
                  </AccordionTrigger>

                  <AccordionContent
                    className={cn(
                      "border-t border-border",
                      "bg-brand-hero/50",
                      "px-4 py-4",
                    )}
                  >
                    <div
                      className={cn(
                        "grid max-h-64 gap-3",
                        "overflow-y-auto pr-1",
                      )}
                      role="group"
                      aria-label={
                        labels.filterByLanguage
                      }
                    >
                      {languageOptions.map(
                        (option, index) => {
                          const inputId =
                            `${languageGroupId}-${index}`;

                          return (
                            <div
                              key={option.value}
                              className={cn(
                                "flex min-w-0",
                                "items-start gap-3",
                              )}
                            >
                              <Checkbox
                                id={inputId}
                                className="mt-0.5"
                                checked={selectedLanguages.has(
                                  option.value,
                                )}
                                onCheckedChange={(
                                  checked,
                                ) => {
                                  onLanguageChange(
                                    option.value,
                                    checked === true,
                                  );
                                }}
                              />

                              <label
                                htmlFor={inputId}
                                className={cn(
                                  "min-w-0",
                                  "cursor-pointer",
                                  "text-sm leading-snug",
                                  "text-foreground",
                                )}
                              >
                                {option.label}
                              </label>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : null}
            </Accordion>

            {activeFilterCount > 0 ? (
              <>
                <Separator />

                <div className="p-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className={cn(
                      "min-h-10 w-full",
                      "justify-center",
                      "text-brand-primary",
                      "hover:bg-action-soft",
                      "hover:text-brand-dark",
                    )}
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