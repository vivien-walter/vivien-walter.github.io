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

export type PublicationSortOption =
  | "year-descending"
  | "year-ascending"
  | "title-ascending"
  | "title-descending"
  | "journal-ascending"
  | "journal-descending";

export type PublicationFilterOption = {
  readonly value: string;
  readonly label: string;
};

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
  readonly onSortChange: (
    value: PublicationSortOption,
  ) => void;
  readonly onThemeChange: (
    value: string,
    checked: boolean,
  ) => void;
  readonly onJournalChange: (
    value: string,
    checked: boolean,
  ) => void;
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
  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const hasThemeFilter =
    showThemeFilter && themeOptions.length > 0;

  const hasJournalFilter =
    journalOptions.length > 0;

  const hasAvailableFilters =
    hasThemeFilter || hasJournalFilter;

  const activeFilterCount =
    (showThemeFilter ? selectedThemes.size : 0) +
    selectedJournals.size;

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Select
        value={sortBy}
        onValueChange={(value) => {
          onSortChange(
            value as PublicationSortOption,
          );
        }}
      >
        <SelectTrigger
          className={cn(
            "min-h-11 min-w-60",
            "border-border-strong bg-brand-background",
            "text-brand-ink shadow-none",
          )}
          aria-label={labels.sortLabel}
        >
          <SelectValue
            placeholder={labels.sortPlaceholder}
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

          <SelectItem value="journal-ascending">
            {labels.sortByJournalAscending}
          </SelectItem>

          <SelectItem value="journal-descending">
            {labels.sortByJournalDescending}
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
                "min-h-11 border-border-strong",
                "bg-brand-background text-brand-ink shadow-none",
                "hover:bg-brand-background hover:text-brand-ink",
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
                    "inline-flex min-w-5 items-center",
                    "justify-center rounded-full",
                    "bg-brand-primary px-1.5 py-0.5",
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
              "border-border-strong p-0",
              "shadow-elevated",
            )}
          >
            <Accordion
              type="single"
              collapsible
            >
              {hasThemeFilter ? (
                <AccordionItem value="theme">
                  <AccordionTrigger
                    className={cn(
                      "rounded-none px-4 py-3",
                      "text-sm font-semibold",
                      "text-brand-ink",
                      "hover:no-underline",
                    )}
                  >
                    {labels.filterByTheme}
                  </AccordionTrigger>

                  <AccordionContent
                    className={cn(
                      "border-t border-border",
                      "bg-brand-hero/50 px-4 py-4",
                    )}
                  >
                    <div
                      className="grid gap-3"
                      role="group"
                      aria-label={
                        labels.filterByTheme
                      }
                    >
                      {themeOptions.map(
                        (option, index) => {
                          const inputId =
                            `${themeGroupId}-${index}`;

                          return (
                            <div
                              className={cn(
                                "flex min-w-0",
                                "items-start gap-3",
                              )}
                              key={option.value}
                            >
                              <Checkbox
                                id={inputId}
                                className="mt-0.5"
                                checked={selectedThemes.has(
                                  option.value,
                                )}
                                onCheckedChange={(
                                  checked,
                                ) => {
                                  onThemeChange(
                                    option.value,
                                    checked === true,
                                  );
                                }}
                              />

                              <label
                                className={cn(
                                  "min-w-0 cursor-pointer",
                                  "text-sm leading-snug",
                                  "text-foreground",
                                )}
                                htmlFor={inputId}
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

              {hasJournalFilter ? (
                <AccordionItem value="journal">
                  <AccordionTrigger
                    className={cn(
                      "rounded-none px-4 py-3",
                      "text-sm font-semibold",
                      "text-brand-ink",
                      "hover:no-underline",
                    )}
                  >
                    {labels.filterByJournal}
                  </AccordionTrigger>

                  <AccordionContent
                    className={cn(
                      "border-t border-border",
                      "bg-brand-hero/50 px-4 py-4",
                    )}
                  >
                    <div
                      className={cn(
                        "grid max-h-64 gap-3",
                        "overflow-y-auto pr-1",
                      )}
                      role="group"
                      aria-label={
                        labels.filterByJournal
                      }
                    >
                      {journalOptions.map(
                        (option, index) => {
                          const inputId =
                            `${journalGroupId}-${index}`;

                          return (
                            <div
                              className={cn(
                                "flex min-w-0",
                                "items-start gap-3",
                              )}
                              key={option.value}
                            >
                              <Checkbox
                                id={inputId}
                                className="mt-0.5"
                                checked={selectedJournals.has(
                                  option.value,
                                )}
                                onCheckedChange={(
                                  checked,
                                ) => {
                                  onJournalChange(
                                    option.value,
                                    checked === true,
                                  );
                                }}
                              />

                              <label
                                className={cn(
                                  "min-w-0 cursor-pointer",
                                  "text-sm leading-snug",
                                  "text-foreground",
                                )}
                                htmlFor={inputId}
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
                      "min-h-10 w-full justify-center",
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

export default PublicationControls;