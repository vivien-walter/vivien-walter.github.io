import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  type Icon,
} from "@phosphor-icons/react";
import {
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getSoftwareRoute,
} from "@/app/routing/navigation";
import PageHero from "@/components/page-hero";
import SectionHeader from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProjectCollection } from "@/content/projects/page";
import type { ProjectId } from "@/content/projects/registry";
import {
  getSoftwareCollection,
  getSoftwarePage,
} from "@/content/software/page";
import type { SoftwareId } from "@/content/software/registry";
import { cn } from "@/lib/utils";

import SoftwareCatalogEntry, {
  type SoftwareCatalogEntryContent,
} from "./_components/software-catalog-entry";
import SoftwareControls, {
  type SoftwareSortOption,
} from "./_components/software-controls";

type SoftwareKind =
  | "software"
  | "web-application";

type SoftwareResource = {
  readonly icon: Icon;
  readonly label: string;
  readonly href: string;
};

type SoftwareCatalogSource = {
  readonly id: SoftwareId;
  readonly icon: Icon;
  readonly kind: SoftwareKind;
  readonly title: string;
  readonly summary: string;
  readonly year?: number;
  readonly languages: readonly string[];
  readonly technologyGroups: readonly {
    readonly title: string;
    readonly items: readonly {
      readonly label: string;
    }[];
  }[];
  readonly resources?: readonly SoftwareResource[];
  readonly projectIds: readonly ProjectId[];
};

type SoftwareWithIndex = {
  readonly software: SoftwareCatalogSource;
  readonly originalIndex: number;
};

function updateSelection(
  currentValues: ReadonlySet<string>,
  value: string,
  checked: boolean,
): ReadonlySet<string> {
  const nextValues = new Set(currentValues);

  if (checked) {
    nextValues.add(value);
  } else {
    nextValues.delete(value);
  }

  return nextValues;
}

function getSoftwareTags(
  software: SoftwareCatalogSource,
): readonly string[] {
  return Array.from(
    new Set([
      ...software.languages,
      ...software.technologyGroups.flatMap(
        (group) =>
          group.items.map(
            (item) => item.label,
          ),
      ),
    ]),
  );
}

function compareOptionalYears(
  firstYear: number | undefined,
  secondYear: number | undefined,
  direction: "ascending" | "descending",
): number {
  if (
    firstYear === undefined &&
    secondYear === undefined
  ) {
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

function SoftwarePage() {
  const location = useLocation();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const page = getSoftwarePage(language);

  const [activeKind, setActiveKind] =
    useState<SoftwareKind>("software");

  const [sortBy, setSortBy] =
    useState<SoftwareSortOption>(
      "year-descending",
    );

  const [
    selectedProjects,
    setSelectedProjects,
  ] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  );

  const [
    selectedLanguages,
    setSelectedLanguages,
  ] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  );

  const softwareItems = useMemo<
    readonly SoftwareWithIndex[]
  >(
    () =>
      getSoftwareCollection(language).map(
        (software, originalIndex) => ({
          software,
          originalIndex,
        }),
      ),
    [language],
  );

  const availableProjects = useMemo(
    () => getProjectCollection(language),
    [language],
  );

  const projectOptions = useMemo(() => {
    const referencedProjectIds =
      new Set<ProjectId>();

    softwareItems.forEach(
      ({ software }) => {
        software.projectIds.forEach(
          (projectId) => {
            referencedProjectIds.add(
              projectId,
            );
          },
        );
      },
    );

    return availableProjects.flatMap(
      (project) =>
        referencedProjectIds.has(
          project.id,
        )
          ? [
              {
                value: project.id,
                label: project.title,
              },
            ]
          : [],
    );
  }, [
    availableProjects,
    softwareItems,
  ]);

  const languageOptions = useMemo(() => {
    const values = new Set<string>();

    softwareItems.forEach(
      ({ software }) => {
        software.languages.forEach(
          (programmingLanguage) => {
            values.add(
              programmingLanguage,
            );
          },
        );
      },
    );

    const locale =
      language === "fr"
        ? "fr-FR"
        : "en-GB";

    return [...values]
      .sort((first, second) =>
        first.localeCompare(
          second,
          locale,
          {
            sensitivity: "base",
          },
        ),
      )
      .map((value) => ({
        value,
        label: value,
      }));
  }, [
    language,
    softwareItems,
  ]);

  const visibleSoftware = useMemo(() => {
    const locale =
      language === "fr"
        ? "fr-FR"
        : "en-GB";

    return softwareItems
      .filter(({ software }) => {
        const matchesKind =
          software.kind === activeKind;

        const matchesProject =
          selectedProjects.size === 0 ||
          software.projectIds.some(
            (projectId) =>
              selectedProjects.has(
                projectId,
              ),
          );

        const matchesLanguage =
          selectedLanguages.size === 0 ||
          software.languages.some(
            (programmingLanguage) =>
              selectedLanguages.has(
                programmingLanguage,
              ),
          );

        return (
          matchesKind &&
          matchesProject &&
          matchesLanguage
        );
      })
      .sort((first, second) => {
        let comparison = 0;

        switch (sortBy) {
          case "year-descending":
            comparison =
              compareOptionalYears(
                first.software.year,
                second.software.year,
                "descending",
              );
            break;

          case "year-ascending":
            comparison =
              compareOptionalYears(
                first.software.year,
                second.software.year,
                "ascending",
              );
            break;

          case "title-ascending":
            comparison =
              first.software.title.localeCompare(
                second.software.title,
                locale,
                {
                  sensitivity: "base",
                },
              );
            break;

          case "title-descending":
            comparison =
              second.software.title.localeCompare(
                first.software.title,
                locale,
                {
                  sensitivity: "base",
                },
              );
            break;
        }

        return comparison !== 0
          ? comparison
          : first.originalIndex -
              second.originalIndex;
      });
  }, [
    activeKind,
    language,
    selectedLanguages,
    selectedProjects,
    softwareItems,
    sortBy,
  ]);

  const featuredSoftware =
    page.featuredSoftwareIds.flatMap(
      (softwareId) => {
        const entry = softwareItems.find(
          ({ software }) =>
            software.id === softwareId,
        );

        return entry
          ? [entry.software]
          : [];
      },
    )[0];

  const GithubIcon =
    page.githubResource.icon;

  const articlesTabId =
    "software-catalog-software-tab";

  const webApplicationsTabId =
    "software-catalog-web-applications-tab";

  const catalogPanelId =
    `software-catalog-${activeKind}-panel`;

  const emptyState =
    activeKind === "software"
      ? page.catalog.emptyStates.software
      : page.catalog.emptyStates
          .webApplications;

  return (
    <div className="overflow-hidden">
      <PageHero
        breadcrumbs={{
          ariaLabel: t(
            "breadcrumbs.label",
            {
              lng: language,
            },
          ),
          items: [
            {
              label: t(
                "breadcrumbs.home",
                {
                  lng: language,
                },
              ),
              to: getPageRoute(
                "home",
                language,
              ),
            },
            {
              label: page.title,
            },
          ],
        }}
        title={page.title}
        introduction={page.introduction}
        actions={
          <Button
            asChild
            size="lg"
            className="min-h-11"
          >
            <a
              href={
                page.githubResource.href
              }
              target="_blank"
              rel="noreferrer"
              data-external="true"
            >
              <GithubIcon
                aria-hidden="true"
                weight="bold"
              />

              {
                page.githubResource
                  .label
              }
            </a>
          </Button>
        }
      />

      {featuredSoftware ? (
        <section
          className="border-b border-border"
          aria-labelledby="featured-software-title"
        >
          <div
            className={cn(
              "mx-auto w-full",
              "max-w-editorial px-page",
              "py-12 sm:py-14 lg:py-16",
            )}
          >
            <SectionHeader
              title={page.featured.title}
              titleId="featured-software-title"
              className="mb-8"
            />

            <Card
              className={cn(
                "gap-0 overflow-hidden",
                "rounded-lg py-0",
                "border-border-strong",
                "bg-brand-background",
                "shadow-subtle",
              )}
            >
              <article
                className={cn(
                  "grid min-w-0",
                  "md:grid-cols-[10rem_minmax(0,1fr)]",
                )}
                aria-labelledby={`featured-software-${featuredSoftware.id}`}
              >
                <div
                  className={cn(
                    "flex min-h-36",
                    "items-center justify-center",
                    "bg-action-soft",
                    "text-brand-primary",
                    "md:min-h-full",
                  )}
                >
                  <featuredSoftware.icon
                    aria-hidden="true"
                    className="size-14"
                    weight="regular"
                  />
                </div>

                <div className="min-w-0 p-5 sm:p-7">
                  <Badge
                    variant="outline"
                    className={cn(
                      "mb-4",
                      "border-brand-primary/35",
                      "bg-brand-background",
                      "font-mono text-xs",
                      "font-semibold",
                      "text-brand-primary",
                    )}
                  >
                    {
                      page.kindLabels[
                        featuredSoftware
                          .kind
                      ]
                    }
                  </Badge>

                  <h3
                    id={`featured-software-${featuredSoftware.id}`}
                    className={cn(
                      "!m-0 text-xl",
                      "font-bold",
                      "leading-heading",
                      "tracking-[-0.025em]",
                      "text-brand-ink",
                    )}
                  >
                    {
                      featuredSoftware.title
                    }
                  </h3>

                  <p
                    className={cn(
                      "!mt-4 !mb-0",
                      "max-w-readable",
                      "text-muted-foreground",
                    )}
                  >
                    {
                      featuredSoftware.summary
                    }
                  </p>

                  <ul
                    className={cn(
                      "!mt-5 !mb-0 flex",
                      "list-none flex-wrap",
                      "gap-2 !p-0",
                    )}
                    aria-label={
                      page.catalog
                        .technologiesLabel
                    }
                  >
                    {getSoftwareTags(
                      featuredSoftware,
                    )
                      .slice(0, 8)
                      .map((tag) => (
                        <li
                          key={tag}
                          className="!m-0"
                        >
                          <Badge
                            variant="secondary"
                            className={cn(
                              "border",
                              "border-border",
                              "bg-brand-hero",
                              "px-3 py-1",
                              "font-mono",
                              "font-medium",
                              "text-muted-foreground",
                            )}
                          >
                            {tag}
                          </Badge>
                        </li>
                      ))}
                  </ul>

                  <div
                    className={cn(
                      "mt-6 flex flex-wrap",
                      "items-center",
                      "gap-x-5 gap-y-3",
                      "border-t",
                      "border-border pt-6",
                    )}
                  >
                    <Button
                      asChild
                      className="min-h-11"
                    >
                      <Link
                        to={getSoftwareRoute(
                          featuredSoftware.id,
                          language,
                        )}
                      >
                        {
                          page.featured
                            .viewAction
                        }

                        <ArrowRightIcon
                          aria-hidden="true"
                          weight="bold"
                        />
                      </Link>
                    </Button>

                    {featuredSoftware.resources?.map(
                      (resource) => (
                        <a
                          key={resource.href}
                          href={resource.href}
                          target="_blank"
                          rel="noreferrer"
                          data-external="true"
                          className={cn(
                            "inline-flex min-h-11",
                            "items-center gap-2",
                            "font-semibold",
                            "text-brand-primary",
                            "underline",
                            "decoration-transparent",
                            "underline-offset-4",
                            "transition-colors",
                            "hover:text-action-strong",
                            "hover:decoration-current",
                          )}
                        >
                          {resource.label}

                          <ArrowUpRightIcon
                            aria-hidden="true"
                            weight="bold"
                          />
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </article>
            </Card>
          </div>
        </section>
      ) : null}

      <div
        className={cn(
          "mx-auto w-full",
          "max-w-editorial px-page",
          "pb-12 sm:pb-14 lg:pb-16",
        )}
      >
        <section
          className="py-12 sm:py-14 lg:py-16"
          aria-labelledby="software-catalog-title"
        >
          <SectionHeader
            title={
              page.catalog.sectionTitle
            }
            titleId="software-catalog-title"
            className="mb-8 sm:mb-10"
          />

          <div
            className={cn(
              "flex flex-col",
              "lg:flex-row",
              "lg:items-end",
              "lg:justify-between",
            )}
          >
            <div
              role="tablist"
              aria-label={
                page.catalog.sectionTitle
              }
              className={cn(
                "order-2 flex min-w-0",
                "items-end gap-7",
                "overflow-x-auto",
                "sm:gap-10",
                "lg:order-1",
              )}
            >
              <Button
                id={articlesTabId}
                type="button"
                role="tab"
                variant="ghost"
                aria-selected={
                  activeKind ===
                  "software"
                }
                aria-controls={
                  catalogPanelId
                }
                tabIndex={
                  activeKind ===
                  "software"
                    ? 0
                    : -1
                }
                className={cn(
                  "relative min-h-12",
                  "shrink-0 rounded-none",
                  "border-0 bg-transparent",
                  "px-1 py-3",
                  "text-sm font-semibold",
                  "text-muted-foreground",
                  "shadow-none",
                  "hover:bg-transparent",
                  "hover:text-brand-primary",
                  "focus-visible:bg-transparent",
                  activeKind ===
                    "software" && [
                    "text-brand-primary",
                    "after:absolute",
                    "after:right-0",
                    "after:bottom-0",
                    "after:left-0",
                    "after:z-10",
                    "after:h-0.5",
                    "after:bg-brand-primary",
                  ],
                )}
                onClick={() => {
                  setActiveKind(
                    "software",
                  );
                }}
              >
                {
                  page.catalog.tabs
                    .software
                }
              </Button>

              <Button
                id={webApplicationsTabId}
                type="button"
                role="tab"
                variant="ghost"
                aria-selected={
                  activeKind ===
                  "web-application"
                }
                aria-controls={
                  catalogPanelId
                }
                tabIndex={
                  activeKind ===
                  "web-application"
                    ? 0
                    : -1
                }
                className={cn(
                  "relative min-h-12",
                  "shrink-0 rounded-none",
                  "border-0 bg-transparent",
                  "px-1 py-3",
                  "text-sm font-semibold",
                  "text-muted-foreground",
                  "shadow-none",
                  "hover:bg-transparent",
                  "hover:text-brand-primary",
                  "focus-visible:bg-transparent",
                  activeKind ===
                    "web-application" && [
                    "text-brand-primary",
                    "after:absolute",
                    "after:right-0",
                    "after:bottom-0",
                    "after:left-0",
                    "after:z-10",
                    "after:h-0.5",
                    "after:bg-brand-primary",
                  ],
                )}
                onClick={() => {
                  setActiveKind(
                    "web-application",
                  );
                }}
              >
                {
                  page.catalog.tabs
                    .webApplications
                }
              </Button>
            </div>

            <div
              className={cn(
                "order-1 mb-4",
                "flex justify-end",
                "lg:order-2 lg:mb-2",
              )}
            >
              <SoftwareControls
                sortBy={sortBy}
                projectOptions={
                  projectOptions
                }
                languageOptions={
                  languageOptions
                }
                selectedProjects={
                  selectedProjects
                }
                selectedLanguages={
                  selectedLanguages
                }
                labels={
                  page.catalog.controls
                }
                onSortChange={setSortBy}
                onProjectChange={(
                  value,
                  checked,
                ) => {
                  setSelectedProjects(
                    (currentValues) =>
                      updateSelection(
                        currentValues,
                        value,
                        checked,
                      ),
                  );
                }}
                onLanguageChange={(
                  value,
                  checked,
                ) => {
                  setSelectedLanguages(
                    (currentValues) =>
                      updateSelection(
                        currentValues,
                        value,
                        checked,
                      ),
                  );
                }}
                onClearFilters={() => {
                  setSelectedProjects(
                    new Set<string>(),
                  );

                  setSelectedLanguages(
                    new Set<string>(),
                  );
                }}
              />
            </div>
          </div>

          <div
            id={catalogPanelId}
            role="tabpanel"
            aria-labelledby={
              activeKind === "software"
                ? articlesTabId
                : webApplicationsTabId
            }
            className="mt-3 sm:mt-4"
          >
            {visibleSoftware.length >
            0 ? (
              <div
                className="grid gap-5"
                aria-label={
                  page.catalog.listLabel
                }
              >
                {visibleSoftware.map(
                  ({ software }) => {
                    const catalogEntry:
                      SoftwareCatalogEntryContent =
                      {
                        id: software.id,
                        icon:
                          software.icon,
                        title:
                          software.title,
                        summary:
                          software.summary,
                        kindLabel:
                          page.kindLabels[
                            software.kind
                          ],
                        tags:
                          getSoftwareTags(
                            software,
                          ),
                      };

                    return (
                      <SoftwareCatalogEntry
                        key={software.id}
                        software={
                          catalogEntry
                        }
                        language={
                          language
                        }
                        technologiesLabel={
                          page.catalog
                            .technologiesLabel
                        }
                        viewLabel={
                          page.catalog
                            .actions
                            .viewSoftware
                        }
                      />
                    );
                  },
                )}
              </div>
            ) : (
              <p
                className={cn(
                  "!m-0 rounded-lg",
                  "border",
                  "border-border-strong",
                  "bg-brand-hero",
                  "px-5 py-8",
                  "text-center",
                  "text-muted-foreground",
                )}
              >
                {emptyState}
              </p>
            )}
          </div>
        </section>

        {page.resources.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="software-activities-title"
          >
            <SectionHeader
              title={
                page.followActivities
                  .title
              }
              titleId="software-activities-title"
              className="mb-8 sm:mb-10"
            />

            <ul
              className={cn(
                "m-0 grid list-none",
                "gap-5 p-0",
                "sm:grid-cols-2",
                "lg:grid-cols-3",
              )}
            >
              {page.resources.map(
                (resource) => {
                  const ResourceIcon =
                    resource.icon;

                  return (
                    <li
                      key={resource.id}
                      className="m-0 min-w-0"
                    >
                      <a
                        href={resource.href}
                        target="_blank"
                        rel="noreferrer"
                        data-external="true"
                        className={cn(
                          "group block h-full",
                          "rounded-lg",
                          "text-brand-ink",
                          "no-underline",
                          "focus-visible:outline-none",
                          "focus-visible:ring-[3px]",
                          "focus-visible:ring-ring/50",
                          "focus-visible:ring-offset-2",
                        )}
                      >
                        <Card
                          className={cn(
                            "h-full min-h-40",
                            "gap-0 rounded-lg",
                            "py-0",
                            "border-border-strong",
                            "bg-brand-background",
                            "shadow-none",
                            "transition-[transform,border-color,background-color,box-shadow]",
                            "duration-200",
                            "ease-standard",
                            "group-hover:-translate-y-1",
                            "group-hover:border-brand-primary",
                            "group-hover:bg-action-soft/70",
                            "group-hover:shadow-elevated",
                            "group-hover:ring-2",
                            "group-hover:ring-brand-primary/30",
                          )}
                        >
                          <span
                            className={cn(
                              "flex flex-1",
                              "items-center",
                              "justify-center",
                              "px-5 pt-7 pb-4",
                              "text-brand-primary",
                              "transition-colors",
                              "duration-200",
                              "group-hover:text-brand-dark",
                            )}
                          >
                            <ResourceIcon
                              aria-hidden="true"
                              className="size-12"
                              weight="regular"
                            />
                          </span>

                          <span
                            className={cn(
                              "flex min-h-14",
                              "items-center",
                              "justify-center",
                              "px-5 py-3",
                              "text-center",
                              "font-semibold",
                              "text-brand-ink",
                              "transition-colors",
                              "duration-200",
                              "group-hover:text-brand-primary",
                            )}
                          >
                            {resource.label}
                          </span>
                        </Card>
                      </a>
                    </li>
                  );
                },
              )}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default SoftwarePage;