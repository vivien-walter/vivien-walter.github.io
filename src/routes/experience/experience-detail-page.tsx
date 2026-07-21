import { ArrowRightIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  getExperienceRoute,
  getLanguageFromPathname,
  getPageRoute,
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

  const relatedSoftware = (experience.relatedSoftware ?? []).flatMap(
    ({ softwareId }) => {
      const software = getSoftwareById(language, softwareId);

      return software ? [{ software, softwareId }] : [];
    },
  );

  const relatedPublications = (
    experience.relatedPublications ?? []
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

      <ExperienceHighlightsBand items={experience.highlights} />

      <div
        className={cn(
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        )}
      >
        <ExperienceDescriptionSection
          description={experience.description}
          idPrefix={`experience-${slug}`}
          title="Description"
        />

        <ExperienceDirectContributionsSection
          idPrefix={`experience-${slug}`}
          items={experience.directContributions}
          title={directContributionsTitle}
        />

        <ExperienceTechnologiesSection
          externalLinkLabel={externalLinkLabel}
          groups={experience.technologyGroups}
          idPrefix={`experience-${slug}`}
          title={technologiesTitle}
        />

        {experience.sections.length > 0 ? (
          <ContentSections
            idPrefix={`experience-${slug}`}
            sections={experience.sections}
          />
        ) : null}

        {experience.finalState ? (
          <section
            className={cn(
              "relative left-1/2 w-screen",
              "-translate-x-1/2 bg-brand-dark",
            )}
            aria-labelledby={`experience-${slug}-final-state-title`}
          >
            <div
              className={cn(
                "mx-auto w-full max-w-editorial px-page",
                "py-12 sm:py-14 lg:py-16",
              )}
            >
              <SectionHeader
                title={experience.finalState.title}
                titleId={`experience-${slug}-final-state-title`}
                description={experience.finalState.text}
                variant="inverse"
                showAccent={false}
              />
            </div>
          </section>
        ) : null}

        {hasRelatedItems ? (
          <section
            className={cn(
              "border-t border-border",
              "pt-12 pb-6",
              "sm:pt-14 sm:pb-8",
              "lg:pt-16 lg:pb-10",
            )}
            aria-labelledby={`experience-${slug}-related-items`}
          >
            <SectionHeader
              title={t("content.relatedItems", {
                lng: language,
              })}
              titleId={`experience-${slug}-related-items`}
              className="mb-8"
            />

            <div className="grid gap-10">
              {relatedProjects.length > 0 ? (
                <section
                  aria-labelledby={`experience-${slug}-related-projects`}
                >
                  <SectionHeader
                    title={t("content.relatedProjects", {
                      lng: language,
                    })}
                    titleId={`experience-${slug}-related-projects`}
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
                  aria-labelledby={`experience-${slug}-related-software`}
                >
                  <SectionHeader
                    title={t("content.relatedSoftware", {
                      lng: language,
                    })}
                    titleId={`experience-${slug}-related-software`}
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
                  aria-labelledby={`experience-${slug}-related-publications`}
                >
                  <SectionHeader
                    title={t("content.relatedPublications", {
                      lng: language,
                    })}
                    titleId={`experience-${slug}-related-publications`}
                    headingLevel={3}
                    showAccent={false}
                    className="mb-4"
                  />

                  <ul className={relatedListClassName}>
                    {relatedPublications.map(
                      ({ publication, publicationId }) => (
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

        {experience.links && experience.links.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="experience-resources"
          >
            <SectionHeader
              title={t("content.resources", {
                lng: language,
              })}
              titleId="experience-resources"
              className="mb-6"
            />

            <div className="flex flex-wrap gap-x-6 gap-y-2">
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
          className="mt-0 sm:mt-0"
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
                  secondaryLabel: previousExperience.organization,
                  to: getExperienceRoute(previousId, language),
                }
              : undefined
          }
          nextLink={
            nextId && nextExperience
              ? {
                  label: nextExperience.role,
                  secondaryLabel: nextExperience.organization,
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