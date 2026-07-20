import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getProjectRoute,
} from "@/app/routing/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NotFoundPage from "@/routes/not-found/not-found-page";
import ContentLink from "@/shared/components/content-link";
import ContentSections from "@/shared/components/content-sections";
import DetailNavigation from "@/shared/components/detail-navigation";
import PageHero from "@/shared/components/page-hero";
import { formatContentDateRange } from "@/shared/content/content-formatters";

import {
  getAdjacentProjectIds,
  getProjectById,
} from "./data/project-content.loader";

function ProjectDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const project = slug ? getProjectById(language, slug) : undefined;

  if (!project || !slug) {
    return <NotFoundPage />;
  }

  const { previousId, nextId } = getAdjacentProjectIds(language, slug);

  const previousProject = previousId
    ? getProjectById(language, previousId)
    : undefined;

  const nextProject = nextId
    ? getProjectById(language, nextId)
    : undefined;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
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
              to: getPageRoute("projects", language),
            },
            {
              label: project.title,
            },
          ],
        }}
        eyebrow={t("projectDetail.eyebrow", { lng: language })}
        title={project.title}
        introduction={project.summary}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        ].join(" ")}
      >
        {project.period ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="project-period"
          >
            <h2
              id="project-period"
              className={cn(
                "!m-0 mb-5 text-xl font-bold leading-heading",
                "tracking-[-0.025em] text-heading",
              )}
            >
              {t("content.period", { lng: language })}
            </h2>

            <Badge
              variant="outline"
              className={cn(
                "border-copper/50 bg-copper-soft px-3 py-1",
                "font-mono font-semibold tracking-[0.04em]",
                "text-copper-strong uppercase",
              )}
            >
              {formatContentDateRange(project.period, language)}
            </Badge>
          </section>
        ) : null}

        <ContentSections
          idPrefix={`project-${slug}`}
          sections={project.sections}
        />

        {project.technologies && project.technologies.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="project-technologies"
          >
            <h2
              id="project-technologies"
              className={cn(
                "!m-0 mb-6 text-xl font-bold leading-heading",
                "tracking-[-0.025em] text-heading",
              )}
            >
              {t("projectDetail.technologiesAndMethods", {
                lng: language,
              })}
            </h2>

            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {project.technologies.map((technology) => (
                <li className="m-0" key={technology}>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "border border-border bg-muted px-3 py-1",
                      "font-mono font-medium text-muted-foreground",
                    )}
                  >
                    {technology}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.links && project.links.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="project-resources"
          >
            <h2
              id="project-resources"
              className={cn(
                "!m-0 mb-6 text-xl font-bold leading-heading",
                "tracking-[-0.025em] text-heading",
              )}
            >
              {t("projectDetail.evidenceAndResources", {
                lng: language,
              })}
            </h2>

            <Card className="gap-0 border-border-strong py-0 shadow-subtle">
              <CardContent className="grid gap-1 p-3 sm:p-4">
                {project.links.map((link, index) => (
                  <ContentLink
                    key={`${link.href}-${index}`}
                    link={link}
                    variant="resource"
                  />
                ))}
              </CardContent>
            </Card>
          </section>
        ) : null}

        <DetailNavigation
          ariaLabel={t("projectDetail.navigationLabel", {
            lng: language,
          })}
          backLink={{
            label: t("actions.backToProjects", { lng: language }),
            to: getPageRoute("projects", language),
          }}
          previousLabel={t("actions.previousProject", {
            lng: language,
          })}
          nextLabel={t("actions.nextProject", {
            lng: language,
          })}
          previousLink={
            previousId && previousProject
              ? {
                  label: previousProject.title,
                  to: getProjectRoute(previousId, language),
                }
              : undefined
          }
          nextLink={
            nextId && nextProject
              ? {
                  label: nextProject.title,
                  to: getProjectRoute(nextId, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ProjectDetailPage;