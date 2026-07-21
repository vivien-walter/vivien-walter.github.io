import {
  type KeyboardEvent,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import type { SupportedLanguage } from "@/app/routing/navigation";
import { cn } from "@/lib/utils";
import SectionHeader from "@/shared/components/section-header";

import type {
  SoftwareContent,
  SoftwareKind,
} from "../data/software-content.types";
import SoftwareCatalogEntry from "./software-catalog-entry";
import SoftwareControls, {
  type SoftwareFilterOption,
  type SoftwareSortOption,
} from "./software-controls";

export type SoftwareCatalogItem = {
  readonly softwareId: string;
  readonly software: SoftwareContent;
};

type SoftwareCatalogProps = {
  readonly items: readonly SoftwareCatalogItem[];
  readonly language: SupportedLanguage;
};

type SoftwareCatalogTab = SoftwareKind;

function updateSelection(
  currentSelection: ReadonlySet<string>,
  value: string,
  checked: boolean,
): Set<string> {
  const nextSelection = new Set(currentSelection);

  if (checked) {
    nextSelection.add(value);
  } else {
    nextSelection.delete(value);
  }

  return nextSelection;
}

function compareOptionalYears(
  firstYear: number | undefined,
  secondYear: number | undefined,
  direction: "ascending" | "descending",
): number {
  if (firstYear === undefined && secondYear === undefined) {
    return 0;
  }

  if (firstYear === undefined) {
    return 1;
  }

  if (secondYear === undefined) {
    return -1;
  }

  return direction === "ascending"
    ? firstYear - secondYear
    : secondYear - firstYear;
}

function SoftwareCatalog({
  items,
  language,
}: SoftwareCatalogProps) {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] =
    useState<SoftwareCatalogTab>("software");

  const [sortBy, setSortBy] =
    useState<SoftwareSortOption>("year-descending");

  const [selectedProjects, setSelectedProjects] =
    useState<ReadonlySet<string>>(new Set());

  const [selectedLanguages, setSelectedLanguages] =
    useState<ReadonlySet<string>>(new Set());

  const labels = {
    sectionTitle: t(
      "pages.software.catalog.sectionTitle",
      {
        lng: language,
      },
    ),
    listLabel: t(
      "pages.software.catalog.listLabel",
      {
        lng: language,
      },
    ),
    softwareTab: t(
      "pages.software.catalog.tabs.software",
      {
        lng: language,
      },
    ),
    webApplicationsTab: t(
      "pages.software.catalog.tabs.webApplications",
      {
        lng: language,
      },
    ),
    viewSoftware: t(
      "pages.software.catalog.actions.viewSoftware",
      {
        lng: language,
      },
    ),
    repository: t(
      "pages.software.catalog.actions.repository",
      {
        lng: language,
      },
    ),
    emptySoftware: t(
      "pages.software.catalog.emptyStates.software",
      {
        lng: language,
      },
    ),
    emptyWebApplications: t(
      "pages.software.catalog.emptyStates.webApplications",
      {
        lng: language,
      },
    ),
    controls: {
      sortLabel: t(
        "pages.software.catalog.controls.sortLabel",
        {
          lng: language,
        },
      ),
      sortPlaceholder: t(
        "pages.software.catalog.controls.sortPlaceholder",
        {
          lng: language,
        },
      ),
      sortByYearDescending: t(
        "pages.software.catalog.controls.sortByYearDescending",
        {
          lng: language,
        },
      ),
      sortByYearAscending: t(
        "pages.software.catalog.controls.sortByYearAscending",
        {
          lng: language,
        },
      ),
      sortByTitleAscending: t(
        "pages.software.catalog.controls.sortByTitleAscending",
        {
          lng: language,
        },
      ),
      sortByTitleDescending: t(
        "pages.software.catalog.controls.sortByTitleDescending",
        {
          lng: language,
        },
      ),
      filters: t(
        "pages.software.catalog.controls.filters",
        {
          lng: language,
        },
      ),
      filterByProject: t(
        "pages.software.catalog.controls.filterByProject",
        {
          lng: language,
        },
      ),
      filterByLanguage: t(
        "pages.software.catalog.controls.filterByLanguage",
        {
          lng: language,
        },
      ),
      clearFilters: t(
        "pages.software.catalog.controls.clearFilters",
        {
          lng: language,
        },
      ),
    },
  };

  const locale =
    language === "fr" ? "fr-FR" : "en-GB";

  const collator = useMemo(
    () =>
      new Intl.Collator(locale, {
        sensitivity: "base",
        numeric: true,
      }),
    [locale],
  );

  const projectOptions = useMemo<
    readonly SoftwareFilterOption[]
  >(() => {
    const projectIds = Array.from(
      new Set(
        items.flatMap(
          ({ software }) =>
            software.projectIds ?? [],
        ),
      ),
    );

    return projectIds
      .sort((first, second) =>
        collator.compare(first, second),
      )
      .map((projectId) => ({
        value: projectId,
        label: projectId,
      }));
  }, [collator, items]);

  const languageOptions = useMemo<
    readonly SoftwareFilterOption[]
  >(() => {
    const languages = Array.from(
      new Set(
        items.flatMap(
          ({ software }) =>
            software.languages ?? [],
        ),
      ),
    );

    return languages
      .sort((first, second) =>
        collator.compare(first, second),
      )
      .map((softwareLanguage) => ({
        value: softwareLanguage,
        label: softwareLanguage,
      }));
  }, [collator, items]);

  const visibleItems = useMemo(() => {
    return items
      .filter(({ software }) => {
        if (software.kind !== activeTab) {
          return false;
        }

        const matchesProjects =
          selectedProjects.size === 0 ||
          software.projectIds?.some((projectId) =>
            selectedProjects.has(projectId),
          ) === true;

        const matchesLanguages =
          selectedLanguages.size === 0 ||
          software.languages?.some((softwareLanguage) =>
            selectedLanguages.has(softwareLanguage),
          ) === true;

        return matchesProjects && matchesLanguages;
      })
      .map((item, originalIndex) => ({
        item,
        originalIndex,
      }))
      .sort((first, second) => {
        const firstSoftware = first.item.software;
        const secondSoftware = second.item.software;

        let comparison = 0;

        switch (sortBy) {
          case "year-descending":
            comparison = compareOptionalYears(
              firstSoftware.year,
              secondSoftware.year,
              "descending",
            );
            break;

          case "year-ascending":
            comparison = compareOptionalYears(
              firstSoftware.year,
              secondSoftware.year,
              "ascending",
            );
            break;

          case "title-ascending":
            comparison = collator.compare(
              firstSoftware.title,
              secondSoftware.title,
            );
            break;

          case "title-descending":
            comparison = collator.compare(
              secondSoftware.title,
              firstSoftware.title,
            );
            break;
        }

        return (
          comparison ||
          collator.compare(
            firstSoftware.title,
            secondSoftware.title,
          ) ||
          first.originalIndex - second.originalIndex
        );
      })
      .map(({ item }) => item);
  }, [
    activeTab,
    collator,
    items,
    selectedLanguages,
    selectedProjects,
    sortBy,
  ]);

  const tabs = [
    {
      id: "software" as const,
      label: labels.softwareTab,
    },
    {
      id: "web-application" as const,
      label: labels.webApplicationsTab,
    },
  ];

  function selectTab(tab: SoftwareCatalogTab) {
    setActiveTab(tab);
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    let nextIndex: number | undefined;

    switch (event.key) {
      case "ArrowRight":
        nextIndex =
          (currentIndex + 1) % tabs.length;
        break;

      case "ArrowLeft":
        nextIndex =
          (currentIndex - 1 + tabs.length) %
          tabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = tabs.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    const nextTab = tabs[nextIndex];

    selectTab(nextTab.id);

    requestAnimationFrame(() => {
      document
        .getElementById(
          `software-catalog-tab-${nextTab.id}`,
        )
        ?.focus();
    });
  }

  const activePanelId =
    `software-catalog-panel-${activeTab}`;

  const activeTabId =
    `software-catalog-tab-${activeTab}`;

  return (
    <section
      className="border-t border-border py-12 sm:py-14 lg:py-16"
      aria-labelledby="software-catalog-title"
    >
      <SectionHeader
        title={labels.sectionTitle}
        titleId="software-catalog-title"
        className="mb-8 sm:mb-10"
      />

      <div
        className={cn(
          "flex flex-col gap-5",
          "border-b border-border",
          "lg:flex-row lg:items-end",
          "lg:justify-between",
        )}
      >
        <div
          role="tablist"
          aria-label={labels.sectionTitle}
          className="flex min-w-0 gap-7"
        >
          {tabs.map((tab, tabIndex) => {
            const isActive =
              activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`software-catalog-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={
                  `software-catalog-panel-${tab.id}`
                }
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "relative min-h-11 border-0",
                  "bg-transparent px-0 pt-2 pb-3",
                  "text-sm font-semibold",
                  "transition-colors",
                  "duration-150 ease-standard",
                  "focus-visible:outline-none",
                  "focus-visible:ring-[3px]",
                  "focus-visible:ring-ring/50",
                  isActive
                    ? "text-brand-primary"
                    : [
                        "text-muted-foreground",
                        "hover:text-brand-ink",
                      ],
                )}
                onClick={() => {
                  selectTab(tab.id);
                }}
                onKeyDown={(event) => {
                  handleTabKeyDown(
                    event,
                    tabIndex,
                  );
                }}
              >
                {tab.label}

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5",
                    isActive
                      ? "bg-brand-primary"
                      : "bg-transparent",
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="pb-4 lg:pb-3">
          <SoftwareControls
            sortBy={sortBy}
            projectOptions={projectOptions}
            languageOptions={languageOptions}
            selectedProjects={selectedProjects}
            selectedLanguages={selectedLanguages}
            labels={labels.controls}
            onSortChange={setSortBy}
            onProjectChange={(value, checked) => {
              setSelectedProjects(
                (currentSelection) =>
                  updateSelection(
                    currentSelection,
                    value,
                    checked,
                  ),
              );
            }}
            onLanguageChange={(value, checked) => {
              setSelectedLanguages(
                (currentSelection) =>
                  updateSelection(
                    currentSelection,
                    value,
                    checked,
                  ),
              );
            }}
            onClearFilters={() => {
              setSelectedProjects(new Set());
              setSelectedLanguages(new Set());
            }}
          />
        </div>
      </div>

      <div
        id={activePanelId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        tabIndex={0}
        className={cn(
          "mt-6 rounded-lg",
          "focus-visible:outline-none",
          "focus-visible:ring-[3px]",
          "focus-visible:ring-ring/50",
        )}
      >
        {visibleItems.length > 0 ? (
          <div
            role="list"
            aria-label={labels.listLabel}
            className="grid gap-4"
          >
            {visibleItems.map(
              ({ software, softwareId }) => (
                <div
                  role="listitem"
                  key={softwareId}
                >
                  <SoftwareCatalogEntry
                    software={software}
                    softwareId={softwareId}
                    language={language}
                    viewLabel={labels.viewSoftware}
                    repositoryLabel={labels.repository}
                  />
                </div>
              ),
            )}
          </div>
        ) : (
          <p
            className={cn(
              "!m-0 rounded-lg border",
              "border-border-strong",
              "bg-brand-hero px-5 py-8",
              "text-center text-muted-foreground",
            )}
          >
            {activeTab === "software"
              ? labels.emptySoftware
              : labels.emptyWebApplications}
          </p>
        )}
      </div>
    </section>
  );
}

export default SoftwareCatalog;