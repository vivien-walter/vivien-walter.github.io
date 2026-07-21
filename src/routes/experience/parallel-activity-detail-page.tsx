import { ArrowRightIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getParallelActivityRoute,
  getProjectRoute,
  getResearchPublicationRoute,
  getSoftwareRoute,
} from "@/app/routing/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NotFoundPage from "@/routes/not-found/not-found-page";
import { getProjectById } from "@/routes/projects/data/project-content.loader";
import { getPublicationById } from "@/routes/research/data/research-content.loader";
import { getSoftwareById } from "@/routes/software/data/software-content.loader";
import ContentLink from "@/shared/components/content-link";
import ContentSections from "@/shared/components/content-sections";
import DetailNavigation from "@/shared/components/detail-navigation";
import PageHero from "@/shared/components/page-hero";
import SectionHeader from "@/shared/components/section-header";
import { formatContentDateRange } from "@/shared/content/content-formatters";

import ExperienceDescriptionSection from "./components/experience-description-section";
import ExperienceDirectContributionsSection from "./components/experience-direct-contributions-section";
import ExperienceHighlightsBand from "./components/experience-highlights-band";
import ExperienceTechnologiesSection from "./components/experience-technologies-section";
import {
  getAdjacentParallelActivityIds,
  getParallelActivityById,
} from "./data/experience-content.loader";

function ParallelActivityDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);

  const activity = slug
    ? getParallelActivityById(language, slug)
    : undefined;

  if (!activity || !slug) {
    return <NotFoundPage />;
  }

  const relatedProjects = (
    activity.relatedProjects ?? []
  ).flatMap(({ projectId }) => {
    const project = getProjectById(language, projectId);

    return project ? [{ project, projectId }] : [];
  });

  const relatedSoftware = (
    activity.relatedSoftware ?? []
  ).flatMap(({ softwareId }) => {
    const software = getSoftwareById(language, softwareId);

    return software ? [{ software, softwareId }] : [];
  });

  const relatedPublications = (
    activity.relatedPublications ?? []
  ).flatMap(({ publicationId }) => {
    const publication = getPublicationById(
      language,
      publicationId,
    );

    return publication
      ? [{ publication, publicationId }]
      : [];
  });

  const hasRelatedItems =
    relatedProjects.length > 0 ||
    relatedSoftware.length > 0 ||
    relatedPublications.length > 0;

  const hasHeroMetadata =
    activity.organization !== undefined ||
    activity.period !== undefined ||
    activity.location !== undefined;

  const { previousId, nextId } =
    getAdjacentParallelActivityIds(language, slug);

  const previousActivity = previousId
    ? getParallelActivityById(language, previousId)
    : undefined;

  const nextActivity = nextId
    ? getParallelActivityById(language, nextId)
    : undefined;

  const directContributionsTitle =
    language === "fr"
      ? "Contributions directes"
      : "Direct contributions";

  const technologiesTitle =
    language === "fr"
      ? "Technologies utilisées"
      : "Technologies used";

  const externalLinkLabel =
    language === "fr"
      ? "ouvre dans un nouvel onglet"
      : "opens in a new tab";

  const relatedButtonClassName = cn(
    "h-auto min-h-11 w-full justify-between",
    "whitespace-normal px-4 py-3 text-left",
    "border-border-strong bg-background",
    "text-brand-ink shadow-none",
    "hover:border-brand-primary",
    "hover:bg-action-soft hover:text-action-strong",
  );

  const relatedListClassName = cn(
    "m-0 grid list-none gap-3 p-0",
    "sm:grid-cols-2",
  );

  return (
    <article
      className="overflow-hidden"
      aria-labelledby="page-title"
    >
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
              label: t("breadcrumbs.experience", {
                lng: language,
              }),
              to: getPageRoute("experience", language),
            },
            {
              label: activity.title,
            },
          ],
        }}
        eyebrow={t("parallelActivityDetail.eyebrow", {
          lng: language,
        })}
        title={activity.title}
        introduction={activity.summary}
        footer={
          hasHeroMetadata ? (
            <dl
              className={cn(
                "m-0 grid gap-x-8 gap-y-5",
                "sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {activity.organization ? (
                <div className="min-w-0">
                  <dt
                    className={cn(
                      "font-mono text-xs font-semibold uppercase",
                      "tracking-[0.08em] text-muted-foreground",
                    )}
                  >
                    {t("content.organisation", {
                      lng: language,
                    })}
                  </dt>

                  <dd className="m-0 mt-1 font-semibold text-brand-ink">
                    {activity.organization}
                  </dd>
                </div>
              ) : null}

              {activity.period ? (
                <div className="min-w-0">
                  <dt
                    className={cn(
                      "font-mono text-xs font-semibold uppercase",
                      "tracking-[0.08em] text-muted-foreground",
                    )}
                  >
                    {t("content.period", {
                      lng: language,
                    })}
                  </dt>

                  <dd className="m-0 mt-1 font-semibold text-brand-ink">
                    {formatContentDateRange(
                      activity.period,
                      language,
                    )}
                  </dd>
                </div>
              ) : null}

              {activity.location ? (
                <div className="min-w-0">
                  <dt
                    className={cn(
                      "font-mono text-xs font-semibold uppercase",
                      "tracking-[0.08em] text-muted-foreground",
                    )}
                  >
                    {t("content.location", {
                      lng: language,
                    })}
                  </dt>

                  <dd className="m-0 mt-1 font-semibold text-brand-ink">
                    {activity.location}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : undefined
        }
      />

      <ExperienceHighlightsBand
        items={activity.highlights}
      />

      <div
        className={cn(
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        )}
      >
        <ExperienceDescriptionSection
          description={activity.description}
          idPrefix={`parallel-activity-${slug}`}
          title="Description"
        />

        <ExperienceDirectContributionsSection
          idPrefix={`parallel-activity-${slug}`}
          items={activity.directContributions}
          title={directContributionsTitle}
        />

        <ExperienceTechnologiesSection
          externalLinkLabel={externalLinkLabel}
          groups={activity.technologyGroups}
          idPrefix={`parallel-activity-${slug}`}
          title={technologiesTitle}
        />

        {activity.sections.length > 0 ? (
          <ContentSections
            idPrefix={`parallel-activity-${slug}`}
            sections={activity.sections}
          />
        ) : null}

        {hasRelatedItems ? (
          <section
            className={cn(
              "border-t border-border",
              "pt-12 pb-6",
              "sm:pt-14 sm:pb-8",
              "lg:pt-16 lg:pb-10",
            )}
            aria-labelledby={`parallel-activity-${slug}-related-items`}
          >
            <SectionHeader
              title={t("content.relatedItems", {
                lng: language,
              })}
              titleId={`parallel-activity-${slug}-related-items`}
              className="mb-8"
            />

            <div className="grid gap-10">
              {relatedProjects.length > 0 ? (
                <section
                  aria-labelledby={`parallel-activity-${slug}-related-projects`}
                >
                  <SectionHeader
                    title={t("content.relatedProjects", {
                      lng: language,
                    })}
                    titleId={`parallel-activity-${slug}-related-projects`}
                    headingLevel={3}
                    showAccent={false}
                    className="mb-4"
                  />

                  <ul className={relatedListClassName}>
                    {relatedProjects.map(
                      ({ project, projectId }) => (
                        <li
                          className="m-0 min-w-0"
                          key={projectId}
                        >
                          <Button
                            asChild
                            variant="outline"
                            className={relatedButtonClassName}
                          >
                            <Link
                              to={getProjectRoute(
                                projectId,
                                language,
                              )}
                            >
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
                      ),
                    )}
                  </ul>
                </section>
              ) : null}

              {relatedSoftware.length > 0 ? (
                <section
                  aria-labelledby={`parallel-activity-${slug}-related-software`}
                >
                  <SectionHeader
                    title={t("content.relatedSoftware", {
                      lng: language,
                    })}
                    titleId={`parallel-activity-${slug}-related-software`}
                    headingLevel={3}
                    showAccent={false}
                    className="mb-4"
                  />

                  <ul className={relatedListClassName}>
                    {relatedSoftware.map(
                      ({ software, softwareId }) => (
                        <li
                          className="m-0 min-w-0"
                          key={softwareId}
                        >
                          <Button
                            asChild
                            variant="outline"
                            className={relatedButtonClassName}
                          >
                            <Link
                              to={getSoftwareRoute(
                                softwareId,
                                language,
                              )}
                            >
                              <span className="min-w-0">
                                {software.title}
                              </span>

                              <ArrowRightIcon
                                aria-hidden="true"
                                className="shrink-0"
                                weight="bold"
                              />
                            </Link>
                          </Button>
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              ) : null}

              {relatedPublications.length > 0 ? (
                <section
                  aria-labelledby={`parallel-activity-${slug}-related-publications`}
                >
                  <SectionHeader
                    title={t(
                      "content.relatedPublications",
                      {
                        lng: language,
                      },
                    )}
                    titleId={`parallel-activity-${slug}-related-publications`}
                    headingLevel={3}
                    showAccent={false}
                    className="mb-4"
                  />

                  <ul className={relatedListClassName}>
                    {relatedPublications.map(
                      ({
                        publication,
                        publicationId,
                      }) => (
                        <li
                          className="m-0 min-w-0"
                          key={publicationId}
                        >
                          <Button
                            asChild
                            variant="outline"
                            className={relatedButtonClassName}
                          >
                            <Link
                              to={getResearchPublicationRoute(
                                publicationId,
                                language,
                              )}
                            >
                              <span className="min-w-0">
                                {publication.title}
                              </span>

                              <ArrowRightIcon
                                aria-hidden="true"
                                className="shrink-0"
                                weight="bold"
                              />
                            </Link>
                          </Button>
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              ) : null}
            </div>
          </section>
        ) : null}

        {activity.links &&
        activity.links.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby={`parallel-activity-${slug}-resources`}
          >
            <SectionHeader
              title={t("content.resources", {
                lng: language,
              })}
              titleId={`parallel-activity-${slug}-resources`}
              className="mb-6"
            />

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {activity.links.map((link, index) => (
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
          className="mt-0 sm:mt-0"
          ariaLabel={t(
            "parallelActivityDetail.navigationLabel",
            {
              lng: language,
            },
          )}
          backLink={{
            label: t("actions.backToExperience", {
              lng: language,
            }),
            to: getPageRoute("experience", language),
          }}
          previousLabel={t(
            "actions.previousParallelActivity",
            {
              lng: language,
            },
          )}
          nextLabel={t(
            "actions.nextParallelActivity",
            {
              lng: language,
            },
          )}
          previousLink={
            previousId && previousActivity
              ? {
                  label: previousActivity.title,
                  secondaryLabel:
                    previousActivity.organization,
                  to: getParallelActivityRoute(
                    previousId,
                    language,
                  ),
                }
              : undefined
          }
          nextLink={
            nextId && nextActivity
              ? {
                  label: nextActivity.title,
                  secondaryLabel:
                    nextActivity.organization,
                  to: getParallelActivityRoute(
                    nextId,
                    language,
                  ),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ParallelActivityDetailPage;