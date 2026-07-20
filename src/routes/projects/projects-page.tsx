import {
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import PageHero from "@/shared/components/page-hero";

import ProjectControls, {
  type ProjectSortOption,
} from "./components/project-controls";
import ProjectIndexCard from "./components/project-index-card";
import {
  getProjectById,
  getProjectIndex,
  getProjectPage,
} from "./data/project-content.loader";

function ProjectsPage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getProjectPage(language);
  const index = getProjectIndex(language);

  const [sortBy, setSortBy] =
    useState<ProjectSortOption>("date-descending");

  const [selectedProjects, setSelectedProjects] =
    useState<ReadonlySet<string>>(() => new Set<string>());

  const [selectedLanguages, setSelectedLanguages] =
    useState<ReadonlySet<string>>(() => new Set<string>());

  const projects = useMemo(
    () =>
      index.order.flatMap((projectId, originalIndex) => {
        const project = getProjectById(language, projectId);

        return project
          ? [{ project, projectId, originalIndex }]
          : [];
      }),
    [index.order, language],
  );

  const projectOptions = useMemo(
    () =>
      projects.map(({ project, projectId }) => ({
        value: projectId,
        label: project.title,
      })),
    [projects],
  );

  const languageOptions = useMemo(() => {
    const values = new Set<string>();

    projects.forEach(({ project }) => {
      project.programmingLanguages?.forEach(
        (programmingLanguage) => {
          values.add(programmingLanguage);
        },
      );
    });

    const locale = language === "fr" ? "fr-FR" : "en-GB";

    return [...values]
      .sort((first, second) =>
        first.localeCompare(second, locale, {
          sensitivity: "base",
        }),
      )
      .map((value) => ({
        value,
        label: value,
      }));
  }, [language, projects]);

  const visibleProjects = useMemo(() => {
    const locale = language === "fr" ? "fr-FR" : "en-GB";

    return projects
      .filter(({ project, projectId }) => {
        const matchesProject =
          selectedProjects.size === 0 ||
          selectedProjects.has(projectId);

        const matchesLanguage =
          selectedLanguages.size === 0 ||
          project.programmingLanguages?.some(
            (programmingLanguage) =>
              selectedLanguages.has(programmingLanguage),
          ) === true;

        return matchesProject && matchesLanguage;
      })
      .sort((first, second) => {
        const firstDate = first.project.period?.start ?? "";
        const secondDate = second.project.period?.start ?? "";

        let comparison = 0;

        switch (sortBy) {
          case "date-descending":
            comparison = secondDate.localeCompare(firstDate);
            break;

          case "date-ascending":
            comparison = firstDate.localeCompare(secondDate);
            break;

          case "name-ascending":
            comparison = first.project.title.localeCompare(
              second.project.title,
              locale,
              {
                sensitivity: "base",
              },
            );
            break;

          case "name-descending":
            comparison = second.project.title.localeCompare(
              first.project.title,
              locale,
              {
                sensitivity: "base",
              },
            );
            break;
        }

        return comparison !== 0
          ? comparison
          : first.originalIndex - second.originalIndex;
      });
  }, [
    language,
    projects,
    selectedLanguages,
    selectedProjects,
    sortBy,
  ]);

  function updateSelection(
    setter: Dispatch<
      SetStateAction<ReadonlySet<string>>
    >,
    value: string,
    checked: boolean,
  ) {
    setter((currentValues) => {
      const nextValues = new Set(currentValues);

      if (checked) {
        nextValues.add(value);
      } else {
        nextValues.delete(value);
      }

      return nextValues;
    });
  }

  return (
    <div className="overflow-hidden">
      <PageHero
        breadcrumbs={{
          ariaLabel: t("breadcrumbs.label", {
            lng: language,
          }),
          items: [
            {
              label: t("breadcrumbs.home", {
                lng: language,
              }),
              to: getPageRoute("home", language),
            },
            {
              label: t("breadcrumbs.projects", {
                lng: language,
              }),
            },
          ],
        }}
        eyebrow={t("pages.projects.title", {
          lng: language,
        })}
        title={page.title}
        introduction={page.introduction}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-10 sm:py-12 lg:py-14",
        ].join(" ")}
      >
        <section
          aria-label={t(
            "pages.projects.controls.filters",
            {
              lng: language,
            },
          )}
        >
          <ProjectControls
            sortBy={sortBy}
            projectOptions={projectOptions}
            languageOptions={languageOptions}
            selectedProjects={selectedProjects}
            selectedLanguages={selectedLanguages}
            labels={{
              sortLabel: t(
                "pages.projects.controls.sortLabel",
                { lng: language },
              ),
              sortPlaceholder: t(
                "pages.projects.controls.sortPlaceholder",
                { lng: language },
              ),
              sortByDateDescending: t(
                "pages.projects.controls.sortByDateDescending",
                { lng: language },
              ),
              sortByDateAscending: t(
                "pages.projects.controls.sortByDateAscending",
                { lng: language },
              ),
              sortByNameAscending: t(
                "pages.projects.controls.sortByNameAscending",
                { lng: language },
              ),
              sortByNameDescending: t(
                "pages.projects.controls.sortByNameDescending",
                { lng: language },
              ),
              filters: t(
                "pages.projects.controls.filters",
                { lng: language },
              ),
              filterByProject: t(
                "pages.projects.controls.filterByProject",
                { lng: language },
              ),
              filterByLanguage: t(
                "pages.projects.controls.filterByLanguage",
                { lng: language },
              ),
              clearFilters: t(
                "pages.projects.controls.clearFilters",
                { lng: language },
              ),
            }}
            onSortChange={setSortBy}
            onProjectChange={(value, checked) => {
              updateSelection(
                setSelectedProjects,
                value,
                checked,
              );
            }}
            onLanguageChange={(value, checked) => {
              updateSelection(
                setSelectedLanguages,
                value,
                checked,
              );
            }}
            onClearFilters={() => {
              setSelectedProjects(new Set<string>());
              setSelectedLanguages(new Set<string>());
            }}
          />

          <p
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            {t("pages.projects.controls.results", {
              lng: language,
              count: visibleProjects.length,
            })}
          </p>

          {visibleProjects.length > 0 ? (
            <div className="mt-6 grid gap-3 sm:mt-7">
              {visibleProjects.map(
                ({ project, projectId }) => (
                  <ProjectIndexCard
                    key={projectId}
                    project={project}
                    projectId={projectId}
                    language={language}
                  />
                ),
              )}
            </div>
          ) : (
            <p
              className={[
                "!m-0 mt-7 rounded-lg",
                "border border-border bg-brand-hero",
                "px-5 py-8 text-center",
                "text-muted-foreground",
              ].join(" ")}
            >
              {t("pages.projects.controls.noResults", {
                lng: language,
              })}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProjectsPage;