import {
  ArrowRightIcon,
  LinkSimpleIcon,
} from "@phosphor-icons/react";
import {
  type KeyboardEvent,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import type { SupportedLanguage } from "@/app/routing/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SectionHeader from "@/shared/components/section-header";

import type { PublicationContent } from "../data/publication-content.types";
import type { ResearchThemeContent } from "../data/research-content.types";
import PublicationControls, {
  type PublicationFilterOption,
  type PublicationSortOption,
} from "./publication-controls";

export type PublicationTableItem = {
  readonly publicationId: string;
  readonly publication: PublicationContent;
  readonly detailsPath: string;
};

type PublicationTableProps = {
  readonly items: readonly PublicationTableItem[];
  readonly themes: readonly ResearchThemeContent[];
  readonly language: SupportedLanguage;
};

type PublicationTab = "article" | "thesis";

const defaultVisiblePublicationCount = 5;

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

function PublicationTable({
  items,
  themes,
  language,
}: PublicationTableProps) {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] =
    useState<PublicationTab>("article");

  const [sortBy, setSortBy] =
    useState<PublicationSortOption>("year-descending");

  const [selectedThemes, setSelectedThemes] =
    useState<ReadonlySet<string>>(new Set());

  const [selectedJournals, setSelectedJournals] =
    useState<ReadonlySet<string>>(new Set());

  const [showAllPublications, setShowAllPublications] =
    useState(false);

  const [hasChangedSort, setHasChangedSort] =
    useState(false);

  const labels = {
    sectionTitle: t(
      "pages.research.publications.sectionTitle",
      {
        lng: language,
      },
    ),
    articles: t(
      "pages.research.publications.tabs.articles",
      {
        lng: language,
      },
    ),
    theses: t(
      "pages.research.publications.tabs.theses",
      {
        lng: language,
      },
    ),
    table: t(
      "pages.research.publications.tableLabel",
      {
        lng: language,
      },
    ),
    year: t(
      "pages.research.publications.columns.year",
      {
        lng: language,
      },
    ),
    publication: t(
      "pages.research.publications.columns.publication",
      {
        lng: language,
      },
    ),
    authors: t(
      "pages.research.publications.columns.authors",
      {
        lng: language,
      },
    ),
    reference: t(
      "pages.research.publications.columns.reference",
      {
        lng: language,
      },
    ),
    actions: t(
      "pages.research.publications.columns.actions",
      {
        lng: language,
      },
    ),
    viewMore: t(
      "pages.research.publications.actions.viewMore",
      {
        lng: language,
      },
    ),
    showMore: t(
      "pages.research.publications.actions.showMore",
      {
        lng: language,
      },
    ),
    doi: t(
      "pages.research.publications.actions.doi",
      {
        lng: language,
      },
    ),
    emptyArticles: t(
      "pages.research.publications.emptyStates.articles",
      {
        lng: language,
      },
    ),
    emptyTheses: t(
      "pages.research.publications.emptyStates.theses",
      {
        lng: language,
      },
    ),
    controls: {
      sortLabel: t(
        "pages.research.publications.controls.sortLabel",
        {
          lng: language,
        },
      ),
      sortPlaceholder: t(
        "pages.research.publications.controls.sortPlaceholder",
        {
          lng: language,
        },
      ),
      sortByYearDescending: t(
        "pages.research.publications.controls.sortByYearDescending",
        {
          lng: language,
        },
      ),
      sortByYearAscending: t(
        "pages.research.publications.controls.sortByYearAscending",
        {
          lng: language,
        },
      ),
      sortByTitleAscending: t(
        "pages.research.publications.controls.sortByTitleAscending",
        {
          lng: language,
        },
      ),
      sortByTitleDescending: t(
        "pages.research.publications.controls.sortByTitleDescending",
        {
          lng: language,
        },
      ),
      sortByJournalAscending: t(
        "pages.research.publications.controls.sortByJournalAscending",
        {
          lng: language,
        },
      ),
      sortByJournalDescending: t(
        "pages.research.publications.controls.sortByJournalDescending",
        {
          lng: language,
        },
      ),
      filters: t(
        "pages.research.publications.controls.filters",
        {
          lng: language,
        },
      ),
      filterByTheme: t(
        "pages.research.publications.controls.filterByTheme",
        {
          lng: language,
        },
      ),
      filterByJournal: t(
        "pages.research.publications.controls.filterByJournal",
        {
          lng: language,
        },
      ),
      clearFilters: t(
        "pages.research.publications.controls.clearFilters",
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

  const themeOptions = useMemo<
    readonly PublicationFilterOption[]
  >(
    () =>
      themes
        .filter((theme) =>
          items.some((item) =>
            item.publication.themeIds?.includes(
              theme.id,
            ),
          ),
        )
        .map((theme) => ({
          value: theme.id,
          label: theme.title,
        })),
    [items, themes],
  );

  const journalOptions = useMemo<
    readonly PublicationFilterOption[]
  >(() => {
    const journals = Array.from(
      new Set(
        items
          .filter(
            ({ publication }) =>
              publication.kind === "article" &&
              publication.publication.trim().length > 0,
          )
          .map(
            ({ publication }) =>
              publication.publication,
          ),
      ),
    );

    return journals
      .sort((first, second) =>
        collator.compare(first, second),
      )
      .map((journal) => ({
        value: journal,
        label: journal,
      }));
  }, [collator, items]);

  const visibleItems = useMemo(() => {
    const filteredItems = items.filter(
      ({ publication }) => {
        if (publication.kind !== activeTab) {
          return false;
        }

        const matchesThemes =
          selectedThemes.size === 0 ||
          publication.themeIds?.some((themeId) =>
            selectedThemes.has(themeId),
          ) === true;

        const matchesJournals =
          activeTab === "thesis" ||
          selectedJournals.size === 0 ||
          selectedJournals.has(
            publication.publication,
          );

        return matchesThemes && matchesJournals;
      },
    );

    return filteredItems
      .map((item, originalIndex) => ({
        item,
        originalIndex,
      }))
      .sort((first, second) => {
        const firstPublication =
          first.item.publication;

        const secondPublication =
          second.item.publication;

        let comparison = 0;

        switch (sortBy) {
          case "year-descending":
            comparison =
              secondPublication.year -
              firstPublication.year;
            break;

          case "year-ascending":
            comparison =
              firstPublication.year -
              secondPublication.year;
            break;

          case "title-ascending":
            comparison = collator.compare(
              firstPublication.title,
              secondPublication.title,
            );
            break;

          case "title-descending":
            comparison = collator.compare(
              secondPublication.title,
              firstPublication.title,
            );
            break;

          case "journal-ascending":
            comparison = collator.compare(
              firstPublication.publication,
              secondPublication.publication,
            );
            break;

          case "journal-descending":
            comparison = collator.compare(
              secondPublication.publication,
              firstPublication.publication,
            );
            break;
        }

        return (
          comparison ||
          first.originalIndex - second.originalIndex
        );
      })
      .map(({ item }) => item);
  }, [
    activeTab,
    collator,
    items,
    selectedJournals,
    selectedThemes,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedThemes.size > 0 ||
    selectedJournals.size > 0;

  const shouldShowAllPublications =
    showAllPublications ||
    hasChangedSort ||
    hasActiveFilters;

  const displayedItems = shouldShowAllPublications
    ? visibleItems
    : visibleItems.slice(
        0,
        defaultVisiblePublicationCount,
      );

  const canShowMorePublications =
    !shouldShowAllPublications &&
    visibleItems.length >
      defaultVisiblePublicationCount;

  const tabs = [
    {
      id: "article" as const,
      label: labels.articles,
    },
    {
      id: "thesis" as const,
      label: labels.theses,
    },
  ];

  function selectTab(tab: PublicationTab) {
    setActiveTab(tab);
    setSelectedJournals(new Set());
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
          `publication-tab-${nextTab.id}`,
        )
        ?.focus();
    });
  }

  const activePanelId =
    `publication-panel-${activeTab}`;

  const activeTabId =
    `publication-tab-${activeTab}`;

  return (
    <section
      className="border-t border-border py-12 sm:py-14 lg:py-16"
      aria-labelledby="publications-title"
    >
      <SectionHeader
        title={labels.sectionTitle}
        titleId="publications-title"
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
                id={`publication-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={
                  `publication-panel-${tab.id}`
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
                    "absolute inset-x-0",
                    "bottom-0 h-0.5",
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
          <PublicationControls
            sortBy={sortBy}
            themeOptions={themeOptions}
            journalOptions={
              activeTab === "article"
                ? journalOptions
                : []
            }
            selectedThemes={selectedThemes}
            selectedJournals={selectedJournals}
            labels={labels.controls}
            onSortChange={(value) => {
              setSortBy(value);
              setHasChangedSort(true);
            }}
            onThemeChange={(value, checked) => {
              setSelectedThemes(
                (currentSelection) =>
                  updateSelection(
                    currentSelection,
                    value,
                    checked,
                  ),
              );
            }}
            onJournalChange={(value, checked) => {
              setSelectedJournals(
                (currentSelection) =>
                  updateSelection(
                    currentSelection,
                    value,
                    checked,
                  ),
              );
            }}
            onClearFilters={() => {
              setSelectedThemes(new Set());
              setSelectedJournals(new Set());
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
          <>
            <div
              role="table"
              aria-label={labels.table}
              className={cn(
                "overflow-hidden rounded-lg",
                "border border-border-strong",
                "bg-brand-background",
              )}
            >
              <div
                role="row"
                className="sr-only"
              >
                <div role="columnheader">
                  {labels.year}
                </div>

                <div role="columnheader">
                  {labels.publication}
                </div>

                <div role="columnheader">
                  {labels.actions}
                </div>
              </div>

              <div
                role="rowgroup"
                className="divide-y divide-border"
              >
                {displayedItems.map(
                  ({
                    publication,
                    publicationId,
                    detailsPath,
                  }) => {
                    const reference =
                      publication.reference ??
                      publication.publication;

                    return (
                      <div
                        key={publicationId}
                        role="row"
                        className={cn(
                          "grid min-w-0 gap-5",
                          "px-5 py-6 sm:px-6",
                          "transition-colors",
                          "duration-150 ease-standard",
                          "hover:bg-action-soft/45",
                          "lg:grid-cols-[6rem_minmax(0,1fr)_13rem]",
                          "lg:items-start lg:gap-7",
                        )}
                      >
                        <div
                          role="cell"
                          className="min-w-0"
                        >
                          <time
                            dateTime={String(
                              publication.year,
                            )}
                            className={cn(
                              "flex min-h-16 w-fit",
                              "min-w-16 items-center",
                              "justify-center rounded-md",
                              "bg-action-soft px-3 py-3",
                              "font-mono text-base",
                              "font-semibold",
                              "text-brand-primary",
                              "lg:w-full",
                            )}
                          >
                            {publication.year}
                          </time>
                        </div>

                        <div
                          role="rowheader"
                          className="min-w-0"
                        >
                          <h3
                            className={cn(
                              "!m-0 !text-base",
                              "!font-bold !leading-heading",
                              "!tracking-[-0.0125em]",
                              "text-brand-ink",
                            )}
                          >
                            {publication.title}
                          </h3>

                          {publication.authors.length >
                          0 ? (
                            <p
                              className={cn(
                                "!mt-2 !mb-0",
                                "text-sm text-foreground",
                              )}
                            >
                              <span className="sr-only">
                                {labels.authors}
                                {": "}
                              </span>

                              {publication.authors.join(
                                ", ",
                              )}
                            </p>
                          ) : null}

                          <div
                            className={cn(
                              "mt-2 flex min-w-0",
                              "items-center gap-3",
                            )}
                          >
                            {publication.journalLogo ? (
                              <img
                                src={
                                  publication
                                    .journalLogo.src
                                }
                                alt={
                                  publication
                                    .journalLogo.alt
                                }
                                className={cn(
                                  "max-h-8 w-auto",
                                  "max-w-24 shrink-0",
                                  "object-contain",
                                )}
                                style={{
                                  objectPosition:
                                    publication
                                      .journalLogo
                                      .objectPosition ??
                                    "center",
                                }}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : null}

                            <p
                              className={cn(
                                "!m-0 min-w-0",
                                "text-sm italic",
                                "text-muted-foreground",
                              )}
                            >
                              <span className="sr-only">
                                {labels.reference}
                                {": "}
                              </span>

                              {reference}
                            </p>
                          </div>
                        </div>

                        <div
                          role="cell"
                          className={cn(
                            "flex min-w-0",
                            "flex-col items-stretch",
                            "gap-2 lg:w-52",
                            "lg:justify-self-end",
                          )}
                        >
                          <Button
                            asChild
                            className={cn(
                              "min-h-10 w-full",
                              "justify-between",
                            )}
                          >
                            <Link to={detailsPath}>
                              {labels.viewMore}

                              <ArrowRightIcon
                                aria-hidden="true"
                                weight="bold"
                              />
                            </Link>
                          </Button>

                          {publication.kind ===
                            "article" &&
                          publication.doi ? (
                            <Button
                              asChild
                              variant="ghost"
                              className={cn(
                                "h-auto min-h-10",
                                "w-full justify-start",
                                "overflow-hidden px-2 py-2",
                                "text-left text-brand-primary",
                                "hover:bg-action-soft",
                                "hover:text-brand-dark",
                              )}
                            >
                              <a
                                href={`https://doi.org/${publication.doi}`}
                                target="_blank"
                                rel="noreferrer"
                                title={`${labels.doi} : ${publication.doi}`}
                                aria-label={`${labels.doi} ${publication.doi}`}
                              >
                                <LinkSimpleIcon
                                  aria-hidden="true"
                                  className="shrink-0"
                                  weight="bold"
                                />

                                <span className="shrink-0 font-semibold">
                                  {labels.doi}
                                  {" :"}
                                </span>

                                <span
                                  className={cn(
                                    "min-w-0 flex-1 truncate",
                                    "text-xs",
                                  )}
                                >
                                  {publication.doi}
                                </span>
                              </a>
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            {canShowMorePublications ? (
              <div className="mt-6 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "min-h-11 border-border-strong",
                    "bg-brand-background",
                    "text-brand-primary shadow-none",
                    "hover:border-brand-primary",
                    "hover:bg-action-soft",
                    "hover:text-brand-dark",
                  )}
                  onClick={() => {
                    setShowAllPublications(true);
                  }}
                >
                  {labels.showMore}
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <p
            className={cn(
              "!m-0 rounded-lg border",
              "border-border-strong",
              "bg-brand-hero px-5 py-8",
              "text-center",
              "text-muted-foreground",
            )}
          >
            {activeTab === "article"
              ? labels.emptyArticles
              : labels.emptyTheses}
          </p>
        )}
      </div>
    </section>
  );
}

export default PublicationTable;