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

export type ProjectSortOption =
  | "date-descending"
  | "date-ascending"
  | "name-ascending"
  | "name-descending";

export type ProjectFilterOption = {
  readonly value: string;
  readonly label: string;
};

type ProjectControlsLabels = {
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

type ProjectControlsProps = {
  readonly sortBy: ProjectSortOption;
  readonly projectOptions: readonly ProjectFilterOption[];
  readonly languageOptions: readonly ProjectFilterOption[];
  readonly selectedProjects: ReadonlySet<string>;
  readonly selectedLanguages: ReadonlySet<string>;
  readonly labels: ProjectControlsLabels;
  readonly onSortChange: (value: ProjectSortOption) => void;
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

function ProjectControls({
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
}: ProjectControlsProps) {
  const projectGroupId = useId();
  const languageGroupId = useId();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount =
    selectedProjects.size + selectedLanguages.size;

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Select
        value={sortBy}
        onValueChange={(value) => {
          onSortChange(value as ProjectSortOption);
        }}
      >
        <SelectTrigger
          className={cn(
            "min-h-11 min-w-56",
            "border-border-strong bg-brand-background",
            "text-brand-ink shadow-none",
          )}
          aria-label={labels.sortLabel}
        >
          <SelectValue placeholder={labels.sortPlaceholder} />
        </SelectTrigger>

        <SelectContent
          align="end"
          position="popper"
        >
          <SelectItem value="date-descending">
            {labels.sortByDateDescending}
          </SelectItem>

          <SelectItem value="date-ascending">
            {labels.sortByDateAscending}
          </SelectItem>

          <SelectItem value="name-ascending">
            {labels.sortByNameAscending}
          </SelectItem>

          <SelectItem value="name-descending">
            {labels.sortByNameDescending}
          </SelectItem>
        </SelectContent>
      </Select>

      <Popover
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
      >
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
className={cn(
  "min-h-11 border-border-strong bg-brand-background",
  "text-brand-ink shadow-none",
  "hover:bg-brand-background hover:text-brand-ink",
  "dark:bg-brand-background",
  "dark:hover:bg-brand-background dark:hover:text-brand-ink",
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
                  "inline-flex min-w-5 items-center justify-center",
                  "rounded-full bg-brand-primary",
                  "px-1.5 py-0.5 text-xs font-semibold",
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
            "w-[min(20rem,calc(100vw-2rem))]",
            "border-border-strong p-0 shadow-elevated",
          )}
        >
          <Accordion
            type="single"
            collapsible
          >
            <AccordionItem value="project">
              <AccordionTrigger
                className={cn(
                  "rounded-none px-4 py-3",
                  "text-sm font-semibold text-brand-ink",
                  "hover:no-underline",
                )}
              >
                {labels.filterByProject}
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
                  aria-label={labels.filterByProject}
                >
                  {projectOptions.map((option, index) => {
                    const inputId = `${projectGroupId}-${index}`;

                    return (
                      <div
                        className="flex min-w-0 items-start gap-3"
                        key={option.value}
                      >
                        <Checkbox
                          id={inputId}
                          className="mt-0.5"
                          checked={selectedProjects.has(
                            option.value,
                          )}
                          onCheckedChange={(checked) => {
                            onProjectChange(
                              option.value,
                              checked === true,
                            );
                          }}
                        />

                        <label
                          className={cn(
                            "min-w-0 cursor-pointer",
                            "text-sm leading-snug text-foreground",
                          )}
                          htmlFor={inputId}
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="language">
              <AccordionTrigger
                className={cn(
                  "rounded-none px-4 py-3",
                  "text-sm font-semibold text-brand-ink",
                  "hover:no-underline",
                )}
              >
                {labels.filterByLanguage}
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
                  aria-label={labels.filterByLanguage}
                >
                  {languageOptions.map((option, index) => {
                    const inputId = `${languageGroupId}-${index}`;

                    return (
                      <div
                        className="flex min-w-0 items-start gap-3"
                        key={option.value}
                      >
                        <Checkbox
                          id={inputId}
                          className="mt-0.5"
                          checked={selectedLanguages.has(
                            option.value,
                          )}
                          onCheckedChange={(checked) => {
                            onLanguageChange(
                              option.value,
                              checked === true,
                            );
                          }}
                        />

                        <label
                          className={cn(
                            "min-w-0 cursor-pointer",
                            "text-sm leading-snug text-foreground",
                          )}
                          htmlFor={inputId}
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
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
    </div>
  );
}

export default ProjectControls;