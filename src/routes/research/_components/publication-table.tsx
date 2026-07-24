import {
  ArrowSquareOutIcon,
} from "@phosphor-icons/react";
import {
  Fragment,
  type KeyboardEvent,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";

import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import type { PublicationId } from "@/content/research/publications/registry";
import type { ResearchThemeId } from "@/content/research/registry";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/types/localization";

import PublicationControls, {
  type PublicationFilterOption,
  type PublicationSortOption,
} from "./publication-controls";

type PublicationKind =
  | "article"
  | "thesis";

type PublicationAuthor = {
  readonly name: string;
  readonly href?: string;
};

type PublicationDoi = {
  readonly value: string;
  readonly href: string;
};

export type PublicationTableItem = {
  readonly id: PublicationId;
  readonly kind: PublicationKind;
  readonly title: string;
  readonly authors: readonly PublicationAuthor[];
  readonly publication: string;
  readonly reference?: string;
  readonly year: number;
  readonly themeIds: readonly ResearchThemeId[];
  readonly detailsPath: string;
  readonly doi?: PublicationDoi;
};

type PublicationThemeOption = {
  readonly id: ResearchThemeId;
  readonly title: string;
};

type PublicationTableLabels = {
  readonly tabs: {
    readonly articles: string;
    readonly theses: string;
  };
  readonly tableLabel: string;
  readonly columns: {
    readonly year: string;
    readonly publication: string;
    readonly authors: string;
    readonly reference: string;
    readonly actions: string;
  };
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

type PublicationTableProps = {
  readonly title: string;
  readonly titleId: string;
  readonly items: readonly PublicationTableItem[];
  readonly themes: readonly PublicationThemeOption[];
  readonly language: SupportedLanguage;
  readonly labels: PublicationTableLabels;
  readonly showThemeFilter?: boolean;
};

const defaultVisiblePublicationCount = 4;

function updateSelection(
  currentSelection: ReadonlySet<string>,
  value: string,
  checked: boolean,
): ReadonlySet<string> {
  const nextSelection =
    new Set(currentSelection);

  if (checked) {
    nextSelection.add(value);
  } else {
    nextSelection.delete(value);
  }

  return nextSelection;
}

function isExternalHref(
  href: string,
): boolean {
  return /^https?:\/\//i.test(href);
}

function PublicationTable({
  title,
  titleId,
  items,
  themes,
  language,
  labels,
  showThemeFilter = true,
}: PublicationTableProps) {
  const [activeTab, setActiveTab] =
    useState<PublicationKind>("article");

  const [sortBy, setSortBy] =
    useState<PublicationSortOption>(
      "year-descending",
    );

  const [
    selectedThemes,
    setSelectedThemes,
  ] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  );

  const [
    selectedJournals,
    setSelectedJournals,
  ] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  );

  const [
    showAllPublications,
    setShowAllPublications,
  ] = useState(false);

  const locale =
    language === "fr"
      ? "fr-FR"
      : "en-GB";

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
  >(() => {
    if (!showThemeFilter) {
      return [];
    }

    return themes
      .filter((theme) =>
        items.some((item) =>
          item.themeIds.includes(theme.id),
        ),
      )
      .map((theme) => ({
        value: theme.id,
        label: theme.title,
      }));
  }, [
    items,
    showThemeFilter,
    themes,
  ]);

  const journalOptions = useMemo<
    readonly PublicationFilterOption[]
  >(() => {
    const journals = new Set<string>();

    items.forEach((item) => {
      if (
        item.kind === "article" &&
        item.publication.trim().length > 0
      ) {
        journals.add(item.publication);
      }
    });

    return [...journals]
      .sort((first, second) =>
        collator.compare(first, second),
      )
      .map((journal) => ({
        value: journal,
        label: journal,
      }));
  }, [
    collator,
    items,
  ]);

  const filteredItems = useMemo(() => {
    return items
      .map((item, originalIndex) => ({
        item,
        originalIndex,
      }))
      .filter(({ item }) => {
        if (item.kind !== activeTab) {
          return false;
        }

        const matchesTheme =
          !showThemeFilter ||
          selectedThemes.size === 0 ||
          item.themeIds.some((themeId) =>
            selectedThemes.has(themeId),
          );

        const matchesJournal =
          item.kind === "thesis" ||
          selectedJournals.size === 0 ||
          selectedJournals.has(
            item.publication,
          );

        return (
          matchesTheme &&
          matchesJournal
        );
      })
      .sort((first, second) => {
        let comparison = 0;

        switch (sortBy) {
          case "year-descending":
            comparison =
              second.item.year -
              first.item.year;
            break;

          case "year-ascending":
            comparison =
              first.item.year -
              second.item.year;
            break;

          case "title-ascending":
            comparison = collator.compare(
              first.item.title,
              second.item.title,
            );
            break;

          case "title-descending":
            comparison = collator.compare(
              second.item.title,
              first.item.title,
            );
            break;

          case "journal-ascending":
            comparison = collator.compare(
              first.item.publication,
              second.item.publication,
            );
            break;

          case "journal-descending":
            comparison = collator.compare(
              second.item.publication,
              first.item.publication,
            );
            break;
        }

        return comparison !== 0
          ? comparison
          : first.originalIndex -
              second.originalIndex;
      })
      .map(({ item }) => item);
  }, [
    activeTab,
    collator,
    items,
    selectedJournals,
    selectedThemes,
    showThemeFilter,
    sortBy,
  ]);

  const displayedItems =
    showAllPublications
      ? filteredItems
      : filteredItems.slice(
          0,
          defaultVisiblePublicationCount,
        );

  const canShowMorePublications =
    !showAllPublications &&
    filteredItems.length >
      defaultVisiblePublicationCount;

  const articlesTabId =
    `${titleId}-articles-tab`;

  const thesesTabId =
    `${titleId}-theses-tab`;

  const panelId =
    `${titleId}-${activeTab}-panel`;

  function changeTab(
    nextTab: PublicationKind,
  ) {
    setActiveTab(nextTab);
    setShowAllPublications(false);
  }

  function focusTab(
    tabId: string,
  ) {
    window.requestAnimationFrame(() => {
      document
        .getElementById(tabId)
        ?.focus();
    });
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight": {
        event.preventDefault();

        const nextTab =
          activeTab === "article"
            ? "thesis"
            : "article";

        changeTab(nextTab);

        focusTab(
          nextTab === "article"
            ? articlesTabId
            : thesesTabId,
        );

        break;
      }

      case "Home":
        event.preventDefault();
        changeTab("article");
        focusTab(articlesTabId);
        break;

      case "End":
        event.preventDefault();
        changeTab("thesis");
        focusTab(thesesTabId);
        break;
    }
  }

  return (
    <section
      className="border-t border-border py-12 sm:py-14 lg:py-16"
      aria-labelledby={titleId}
    >
      <SectionHeader
        title={title}
        titleId={titleId}
        className="mb-7 sm:mb-8"
      />

      <div
        className={cn(
          "flex flex-col gap-5",
          "lg:flex-row",
          "lg:items-end",
          "lg:justify-between",
        )}
      >
        <div
          role="tablist"
          aria-label={title}
          onKeyDown={handleTabKeyDown}
          className={cn(
            "flex min-w-0",
            "items-end gap-7",
            "overflow-x-auto",
            "border-b border-border",
            "sm:gap-10",
          )}
        >
          <Button
            id={articlesTabId}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={
              activeTab === "article"
            }
            aria-controls={panelId}
            tabIndex={
              activeTab === "article"
                ? 0
                : -1
            }
            className={cn(
              "relative min-h-12",
              "shrink-0 rounded-none",
              "bg-transparent px-1 py-3",
              "text-sm font-semibold",
              "text-muted-foreground",
              "shadow-none",
              "hover:bg-transparent",
              "hover:text-brand-primary",
              "focus-visible:bg-transparent",
              activeTab === "article" && [
                "text-brand-primary",
                "after:absolute",
                "after:right-0",
                "after:bottom-[-1px]",
                "after:left-0",
                "after:h-0.5",
                "after:bg-brand-primary",
              ],
            )}
            onClick={() => {
              changeTab("article");
            }}
          >
            {labels.tabs.articles}
          </Button>

          <Button
            id={thesesTabId}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={
              activeTab === "thesis"
            }
            aria-controls={panelId}
            tabIndex={
              activeTab === "thesis"
                ? 0
                : -1
            }
            className={cn(
              "relative min-h-12",
              "shrink-0 rounded-none",
              "bg-transparent px-1 py-3",
              "text-sm font-semibold",
              "text-muted-foreground",
              "shadow-none",
              "hover:bg-transparent",
              "hover:text-brand-primary",
              "focus-visible:bg-transparent",
              activeTab === "thesis" && [
                "text-brand-primary",
                "after:absolute",
                "after:right-0",
                "after:bottom-[-1px]",
                "after:left-0",
                "after:h-0.5",
                "after:bg-brand-primary",
              ],
            )}
            onClick={() => {
              changeTab("thesis");
            }}
          >
            {labels.tabs.theses}
          </Button>
        </div>

        <PublicationControls
          sortBy={sortBy}
          themeOptions={themeOptions}
          journalOptions={journalOptions}
          selectedThemes={selectedThemes}
          selectedJournals={
            selectedJournals
          }
          labels={labels.controls}
          showThemeFilter={
            showThemeFilter
          }
          onSortChange={(value) => {
            setSortBy(value);
            setShowAllPublications(false);
          }}
          onThemeChange={(
            value,
            checked,
          ) => {
            setSelectedThemes(
              (currentSelection) =>
                updateSelection(
                  currentSelection,
                  value,
                  checked,
                ),
            );

            setShowAllPublications(false);
          }}
          onJournalChange={(
            value,
            checked,
          ) => {
            setSelectedJournals(
              (currentSelection) =>
                updateSelection(
                  currentSelection,
                  value,
                  checked,
                ),
            );

            setShowAllPublications(false);
          }}
          onClearFilters={() => {
            setSelectedThemes(
              new Set<string>(),
            );

            setSelectedJournals(
              new Set<string>(),
            );

            setShowAllPublications(false);
          }}
        />
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={
          activeTab === "article"
            ? articlesTabId
            : thesesTabId
        }
        className="mt-5 sm:mt-6"
      >
        {displayedItems.length > 0 ? (
          <>
            <ul
              aria-label={
                labels.tableLabel
              }
              className={cn(
                "m-0 list-none",
                "overflow-hidden rounded-lg",
                "border border-border-strong",
                "bg-brand-background p-0",
              )}
            >
              {displayedItems.map(
                (publication) => {
                  const rowTitleId =
                    `${titleId}-${publication.id}-title`;

                  const citation =
                    publication.reference
                      ?.trim() ||
                    publication.publication
                      .trim();

                  return (
                    <li
                      key={publication.id}
                      className={cn(
                        "m-0 border-b",
                        "border-border",
                        "last:border-b-0",
                      )}
                    >
                      <article
                        aria-labelledby={
                          rowTitleId
                        }
                        className={cn(
                          "grid min-w-0",
                          "grid-cols-[4.5rem_minmax(0,1fr)]",
                          "gap-x-5 gap-y-3",
                          "px-4 py-4",
                          "sm:px-5 sm:py-4",
                          "lg:grid-cols-[4.5rem_minmax(0,1fr)_auto]",
                          "lg:items-center",
                          "lg:gap-x-7",
                        )}
                      >
                        <time
                          dateTime={String(
                            publication.year,
                          )}
                          className={cn(
                            "flex min-h-16",
                            "items-center",
                            "justify-center",
                            "self-center rounded-md",
                            "bg-action-soft",
                            "px-3 py-3",
                            "font-mono text-base",
                            "font-semibold",
                            "text-brand-primary",
                          )}
                        >
                          {publication.year}
                        </time>

                        <div className="min-w-0">
                          <h3
                            id={rowTitleId}
                            className={cn(
                              "!m-0 text-sm",
                              "font-bold",
                              "leading-heading",
                              "tracking-[-0.005em]",
                              "text-brand-ink",
                              "sm:text-base",
                            )}
                          >
                            <Link
                              to={
                                publication.detailsPath
                              }
                              className={cn(
                                "text-inherit",
                                "no-underline",
                                "transition-colors",
                                "duration-150",
                                "ease-standard",
                                "hover:text-brand-primary",
                              )}
                            >
                              {publication.title}
                            </Link>
                          </h3>

                          {publication.authors
                            .length > 0 ? (
                            <p
                              className={cn(
                                "!mt-1.5 !mb-0",
                                "text-sm",
                                "leading-normal",
                                "text-foreground",
                              )}
                            >
                              {publication.authors.map(
                                (
                                  author,
                                  index,
                                ) => (
                                  <Fragment
                                    key={`${author.name}-${index}`}
                                  >
                                    {index > 0
                                      ? ", "
                                      : null}

                                    {author.href ? (
                                      <a
                                        href={
                                          author.href
                                        }
                                        target={
                                          isExternalHref(
                                            author.href,
                                          )
                                            ? "_blank"
                                            : undefined
                                        }
                                        rel={
                                          isExternalHref(
                                            author.href,
                                          )
                                            ? "noreferrer"
                                            : undefined
                                        }
                                        className={cn(
                                          "font-medium",
                                          "text-brand-primary",
                                          "underline",
                                          "decoration-transparent",
                                          "underline-offset-4",
                                          "transition-colors",
                                          "duration-150",
                                          "hover:text-action-strong",
                                          "hover:decoration-current",
                                        )}
                                      >
                                        {
                                          author.name
                                        }
                                      </a>
                                    ) : (
                                      author.name
                                    )}
                                  </Fragment>
                                ),
                              )}
                            </p>
                          ) : null}

                          {citation.length > 0 ? (
                            <p
                              className={cn(
                                "!mt-1.5 !mb-0",
                                "text-sm",
                                "leading-normal",
                                "text-muted-foreground",
                              )}
                            >
                              {citation}
                            </p>
                          ) : null}
                        </div>

                        {publication.doi ? (
                          <a
                            href={
                              publication.doi.href
                            }
                            target="_blank"
                            rel="noreferrer"
                            title={`${labels.actions.doi} : ${publication.doi.value}`}
                            aria-label={`${labels.actions.doi} ${publication.doi.value}`}
                            className={cn(
                              "col-span-2",
                              "inline-flex min-h-10",
                              "min-w-0 items-center",
                              "gap-2",
                              "justify-self-start",
                              "font-medium",
                              "text-brand-primary",
                              "no-underline",
                              "transition-colors",
                              "duration-150",
                              "ease-standard",
                              "hover:text-action-strong",
                              "lg:col-span-1",
                              "lg:max-w-72",
                              "lg:justify-self-end",
                            )}
                          >
                            <span className="shrink-0 text-sm">
                              {
                                labels.actions
                                  .doi
                              }
                              {": "}
                            </span>

                            <span
                              className={cn(
                                "min-w-0 truncate",
                                "text-sm",
                              )}
                            >
                              {
                                publication.doi
                                  .value
                              }
                            </span>

                            <ArrowSquareOutIcon
                              aria-hidden="true"
                              className="size-4 shrink-0"
                              weight="bold"
                            />
                          </a>
                        ) : null}
                      </article>
                    </li>
                  );
                },
              )}
            </ul>

            {canShowMorePublications ? (
              <div className="mt-6 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "min-h-11",
                    "border-brand-primary",
                    "bg-brand-background",
                    "px-6",
                    "text-brand-primary",
                    "shadow-none",
                    "hover:bg-action-soft",
                    "hover:text-action-strong",
                  )}
                  onClick={() => {
                    setShowAllPublications(
                      true,
                    );
                  }}
                >
                  {
                    labels.actions
                      .showMore
                  }
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <p
            className={cn(
              "!m-0 rounded-lg",
              "border border-border-strong",
              "bg-brand-hero",
              "px-5 py-8",
              "text-center",
              "text-muted-foreground",
            )}
          >
            {activeTab === "article"
              ? labels.emptyStates.articles
              : labels.emptyStates.theses}
          </p>
        )}
      </div>
    </section>
  );
}

export default PublicationTable;