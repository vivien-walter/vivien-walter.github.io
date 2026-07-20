import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import { Card, CardContent } from "@/components/ui/card";
import ContentLink from "@/shared/components/content-link";
import ContentSections from "@/shared/components/content-sections";
import PageHero from "@/shared/components/page-hero";

import ProjectEntry from "./components/project-entry";
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
  const featuredIds = new Set(index.featured ?? []);

  const projects = index.order.flatMap((projectId) => {
    const project = getProjectById(language, projectId);

    return project ? [{ project, projectId }] : [];
  });

  return (
    <div className="overflow-hidden">
      <PageHero
        breadcrumbs={{
          ariaLabel: t("breadcrumbs.label", { lng: language }),
          items: [
            {
              label: t("breadcrumbs.home", { lng: language }),
              to: getPageRoute("home", language),
            },
            {
              label: t("breadcrumbs.projects", { lng: language }),
            },
          ],
        }}
        eyebrow={t("pages.projects.title", { lng: language })}
        title={page.title}
        introduction={page.introduction}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        ].join(" ")}
      >
        <ContentSections
          idPrefix="projects-page"
          sections={page.sections ?? []}
        />

        {projects.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="projects-list-title"
          >
            <header className="mb-8 max-w-readable">
              <h2
                id="projects-list-title"
                className={[
                  "!m-0 text-xl font-bold leading-heading",
                  "tracking-[-0.025em] text-heading",
                ].join(" ")}
              >
                {t("pages.projects.title", { lng: language })}
              </h2>
            </header>

            <div className="grid gap-6">
              {projects.map(({ project, projectId }) => (
                <ProjectEntry
                  key={projectId}
                  featured={featuredIds.has(projectId)}
                  project={project}
                  projectId={projectId}
                  language={language}
                />
              ))}
            </div>
          </section>
        ) : null}

        {page.links && page.links.length > 0 ? (
          <nav
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-label={t("content.resources", { lng: language })}
          >
            <Card className="gap-0 border-border-strong py-0 shadow-subtle">
              <CardContent className="grid gap-1 p-3 sm:p-4">
                {page.links.map((link, indexValue) => (
                  <ContentLink
                    key={`${link.href}-${indexValue}`}
                    link={link}
                    variant="resource"
                  />
                ))}
              </CardContent>
            </Card>
          </nav>
        ) : null}
      </div>
    </div>
  );
}

export default ProjectsPage;