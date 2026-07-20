import { ArrowRightIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  getExperienceRoute,
  getLanguageFromPathname,
  getPageRoute,
  getProjectRoute,
} from "@/app/routing/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NotFoundPage from "@/routes/not-found/not-found-page";
import { getProjectById } from "@/routes/projects/data/project-content.loader";
import ContentLink from "@/shared/components/content-link";
import ContentSections from "@/shared/components/content-sections";
import DetailNavigation from "@/shared/components/detail-navigation";
import PageHero from "@/shared/components/page-hero";
import { formatContentDateRange } from "@/shared/content/content-formatters";

import {
  getAdjacentExperienceIds,
  getExperienceById,
} from "./data/experience-content.loader";

function ExperienceDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const experience = slug
    ? getExperienceById(language, slug)
    : undefined;

  if (!experience || !slug) {
    return <NotFoundPage />;
  }

  const relatedProjects = (experience.relatedProjects ?? []).flatMap(
    ({ projectId }) => {
      const project = getProjectById(language, projectId);

      return project ? [{ project, projectId }] : [];
    },
  );

  const { previousId, nextId } = getAdjacentExperienceIds(
    language,
    slug,
  );

  const previousExperience = previousId
    ? getExperienceById(language, previousId)
    : undefined;

  const nextExperience = nextId
    ? getExperienceById(language, nextId)
    : undefined;

  return (
    <article
      className="overflow-hidden"
      aria-labelledby="page-title"
    >
      <PageHero
        breadcrumbs={{
          ariaLabel: t("breadcrumbs.label", { lng: language }),
          items: [
            {
              label: t("breadcrumbs.home", { lng: language }),
              to: getPageRoute("home", language),
            },
            {
              label: t("breadcrumbs.experience", { lng: language }),
              to: getPageRoute("experience", language),
            },
            {
              label: experience.role,
            },
          ],
        }}
        eyebrow={t("experienceDetail.eyebrow", {
          lng: language,
        })}
        title={experience.role}
        introduction={experience.summary}
        footer={
          <dl
            className={cn(
              "m-0 grid gap-x-8 gap-y-5",
              "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            <div className="min-w-0">
              <dt
                className={cn(
                  "font-mono text-xs font-semibold uppercase",
                  "tracking-[0.08em] text-muted-foreground",
                )}
              >
                {t("content.organisation", { lng: language })}
              </dt>

              <dd className="m-0 mt-1 font-semibold text-brand-ink">
                {experience.organization}
              </dd>
            </div>

            <div className="min-w-0">
              <dt
                className={cn(
                  "font-mono text-xs font-semibold uppercase",
                  "tracking-[0.08em] text-muted-foreground",
                )}
              >
                {t("content.period", { lng: language })}
              </dt>

              <dd className="m-0 mt-1 font-semibold text-brand-ink">
                {formatContentDateRange(
                  experience.period,
                  language,
                )}
              </dd>
            </div>

            {experience.location ? (
              <div className="min-w-0">
                <dt
                  className={cn(
                    "font-mono text-xs font-semibold uppercase",
                    "tracking-[0.08em] text-muted-foreground",
                  )}
                >
                  {t("content.location", { lng: language })}
                </dt>

                <dd className="m-0 mt-1 font-semibold text-brand-ink">
                  {experience.location}
                </dd>
              </div>
            ) : null}
          </dl>
        }
      />

      <div
        className={cn(
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        )}
      >
        <ContentSections
          idPrefix={`experience-${slug}`}
          sections={experience.sections}
        />

        {relatedProjects.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="experience-related-projects"
          >
            <h2
              id="experience-related-projects"
              className={cn(
                "!m-0 text-xl font-bold leading-heading",
                "tracking-[-0.025em] text-brand-ink",
              )}
            >
              {t("content.relatedProjects", { lng: language })}
            </h2>

            <span
              aria-hidden="true"
              className="mt-3 block h-0.5 w-12 bg-brand-accent"
            />

            <ul
              className={cn(
                "m-0 mt-8 grid list-none gap-3 p-0",
                "sm:grid-cols-2",
              )}
            >
              {relatedProjects.map(({ project, projectId }) => (
                <li className="m-0 min-w-0" key={projectId}>
                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      "h-auto min-h-11 w-full justify-between",
                      "whitespace-normal px-4 py-3 text-left",
                      "border-border-strong bg-background",
                      "text-brand-ink shadow-none",
                      "hover:border-brand-primary",
                      "hover:bg-action-soft hover:text-action-strong",
                    )}
                  >
                    <Link to={getProjectRoute(projectId, language)}>
                      <span className="min-w-0">
                        {project.title}
                      </span>

                      <ArrowRightIcon
                        aria-hidden="true"
                        className="shrink-0"
                        weight="bold"
                      />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {experience.links && experience.links.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="experience-resources"
          >
            <h2
              id="experience-resources"
              className={cn(
                "!m-0 text-xl font-bold leading-heading",
                "tracking-[-0.025em] text-brand-ink",
              )}
            >
              {t("content.resources", { lng: language })}
            </h2>

            <span
              aria-hidden="true"
              className="mt-3 block h-0.5 w-12 bg-brand-accent"
            />

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {experience.links.map((link, index) => (
                <ContentLink
                  key={`${link.href}-${index}`}
                  link={link}
                  variant="inline"
                />
              ))}
            </div>
          </section>
        ) : null}

        <DetailNavigation
          ariaLabel={t("experienceDetail.navigationLabel", {
            lng: language,
          })}
          backLink={{
            label: t("actions.backToExperience", {
              lng: language,
            }),
            to: getPageRoute("experience", language),
          }}
          previousLabel={t("actions.previousExperience", {
            lng: language,
          })}
          nextLabel={t("actions.nextExperience", {
            lng: language,
          })}
          previousLink={
            previousId && previousExperience
              ? {
                  label: previousExperience.role,
                  to: getExperienceRoute(previousId, language),
                }
              : undefined
          }
          nextLink={
            nextId && nextExperience
              ? {
                  label: nextExperience.role,
                  to: getExperienceRoute(nextId, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ExperienceDetailPage;