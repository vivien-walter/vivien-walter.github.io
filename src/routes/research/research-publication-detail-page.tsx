import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import {
  getExperienceRoute,
  getLanguageFromPathname,
  getPageRoute,
  getProjectRoute,
  getResearchPublicationRoute,
  getResearchThemeRoute,
  getSoftwareRoute,
} from "@/app/routing/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getExperienceById,
} from "@/routes/experience/data/experience-content.loader";
import NotFoundPage from "@/routes/not-found/not-found-page";
import {
  getProjectById,
} from "@/routes/projects/data/project-content.loader";
import {
  getSoftwareById,
} from "@/routes/software/data/software-content.loader";
import DetailDescriptionSection from "@/shared/components/detail-description-section";
import DetailNavigation from "@/shared/components/detail-navigation";
import PageHero from "@/shared/components/page-hero";
import SectionHeader from "@/shared/components/section-header";

import PublicationRelatedItemsSection, {
  type PublicationRelatedGroup,
} from "./components/publication-related-items-section";
import PublicationResourcesSection from "./components/publication-resources-section";
import {
  getAdjacentPublicationIds,
  getPublicationById,
  getResearchThemeById,
} from "./data/research-content.loader";

const metadataRowClassName = cn(
  "grid min-w-0 gap-2 px-5 py-5",
  "sm:grid-cols-[10rem_minmax(0,1fr)]",
  "sm:gap-6 sm:px-6",
);

const metadataTermClassName = cn(
  "font-mono text-xs font-semibold uppercase",
  "tracking-[0.06em] text-muted-foreground",
);

function ResearchPublicationDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const publication = slug
    ? getPublicationById(language, slug)
    : undefined;

  if (!publication || !slug) {
    return <NotFoundPage />;
  }

  const { previousId, nextId } =
    getAdjacentPublicationIds(language, slug);

  const previousPublication = previousId
    ? getPublicationById(language, previousId)
    : undefined;

  const nextPublication = nextId
    ? getPublicationById(language, nextId)
    : undefined;

  const eyebrow =
    publication.kind === "article"
      ? t(
          "researchPublicationDetail.articleEyebrow",
          {
            lng: language,
          },
        )
      : t(
          "researchPublicationDetail.thesisEyebrow",
          {
            lng: language,
          },
        );

  const relatedThemes = (
    publication.themeIds ?? []
  ).flatMap((themeId) => {
    const theme = getResearchThemeById(
      language,
      themeId,
    );

    return theme
      ? [
          {
            id: themeId,
            label: theme.title,
            to: getResearchThemeRoute(
              themeId,
              language,
            ),
          },
        ]
      : [];
  });

  const relatedProjects = (
    publication.projectIds ?? []
  ).flatMap((projectId) => {
    const project = getProjectById(
      language,
      projectId,
    );

    return project
      ? [
          {
            id: projectId,
            label: project.title,
            to: getProjectRoute(
              projectId,
              language,
            ),
          },
        ]
      : [];
  });

  const relatedSoftware = (
    publication.softwareIds ?? []
  ).flatMap((softwareId) => {
    const software = getSoftwareById(
      language,
      softwareId,
    );

    return software
      ? [
          {
            id: softwareId,
            label: software.title,
            to: getSoftwareRoute(
              softwareId,
              language,
            ),
          },
        ]
      : [];
  });

  const relatedExperiences = (
    publication.experienceIds ?? []
  ).flatMap((experienceId) => {
    const experience = getExperienceById(
      language,
      experienceId,
    );

    return experience
      ? [
          {
            id: experienceId,
            label: `${experience.role} — ${experience.organization}`,
            to: getExperienceRoute(
              experienceId,
              language,
            ),
          },
        ]
      : [];
  });

  const relatedGroups: readonly PublicationRelatedGroup[] =
    [
      {
        id: "themes",
        title: t(
          "researchPublicationDetail.relatedThemes",
          {
            lng: language,
          },
        ),
        items: relatedThemes,
      },
      {
        id: "projects",
        title: t(
          "researchPublicationDetail.relatedProjects",
          {
            lng: language,
          },
        ),
        items: relatedProjects,
      },
      {
        id: "software",
        title: t(
          "researchPublicationDetail.relatedSoftware",
          {
            lng: language,
          },
        ),
        items: relatedSoftware,
      },
      {
        id: "experiences",
        title: t(
          "researchPublicationDetail.relatedExperiences",
          {
            lng: language,
          },
        ),
        items: relatedExperiences,
      },
    ];

  const hasDescription =
    publication.description !== undefined &&
    publication.description.paragraphs.length > 0;

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
              label: t("breadcrumbs.research", {
                lng: language,
              }),
              to: getPageRoute(
                "research",
                language,
              ),
            },
            {
              label: publication.title,
            },
          ],
        }}
        eyebrow={eyebrow}
        title={publication.title}
        introduction={publication.publication}
      />

      <div
        className={cn(
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        )}
      >
        <section
          aria-labelledby="publication-metadata-title"
          className="border-t border-border py-12 sm:py-14 lg:py-16"
        >
          <SectionHeader
            title={t(
              "researchPublicationDetail.metadata",
              {
                lng: language,
              },
            )}
            titleId="publication-metadata-title"
            className="mb-8"
          />

          <Card
            className={cn(
              "gap-0 overflow-hidden py-0",
              "border-border-strong shadow-subtle",
            )}
          >
            <CardContent className="p-0">
              <dl className="m-0 divide-y divide-border">
                <div className={metadataRowClassName}>
                  <dt className={metadataTermClassName}>
                    {t(
                      "researchPublicationDetail.title",
                      {
                        lng: language,
                      },
                    )}
                  </dt>

                  <dd
                    className={cn(
                      "m-0 min-w-0 font-semibold",
                      "leading-heading text-brand-ink",
                    )}
                  >
                    {publication.title}
                  </dd>
                </div>

                <div className={metadataRowClassName}>
                  <dt className={metadataTermClassName}>
                    {t(
                      "researchPublicationDetail.journal",
                      {
                        lng: language,
                      },
                    )}
                  </dt>

                  <dd className="m-0 min-w-0 italic text-foreground">
                    {publication.publication}
                  </dd>
                </div>

                <div className={metadataRowClassName}>
                  <dt className={metadataTermClassName}>
                    {t(
                      "researchPublicationDetail.authors",
                      {
                        lng: language,
                      },
                    )}
                  </dt>

                  <dd className="m-0 min-w-0 text-foreground">
                    {publication.authors.length > 0 ? (
                      <ul
                        className={cn(
                          "m-0 flex list-none flex-wrap",
                          "gap-x-1 p-0",
                        )}
                      >
                        {publication.authors.map(
                          (author, index) => {
                            const isExternal =
                              author.href !== undefined &&
                              /^https?:\/\//.test(
                                author.href,
                              );

                            return (
                              <li
                                key={`${author.name}-${index}`}
                                className="m-0"
                              >
                                {author.href ? (
                                  <a
                                    href={author.href}
                                    target={
                                      isExternal
                                        ? "_blank"
                                        : undefined
                                    }
                                    rel={
                                      isExternal
                                        ? "noreferrer"
                                        : undefined
                                    }
                                    className={cn(
                                      "rounded-sm font-medium",
                                      "text-brand-primary underline",
                                      "decoration-brand-primary/40",
                                      "underline-offset-4",
                                      "hover:text-brand-dark",
                                      "focus-visible:outline-none",
                                      "focus-visible:ring-[3px]",
                                      "focus-visible:ring-ring/50",
                                    )}
                                  >
                                    {author.name}
                                  </a>
                                ) : (
                                  author.name
                                )}

                                {index <
                                publication.authors.length -
                                  1 ? (
                                  <span aria-hidden="true">
                                    {", "}
                                  </span>
                                ) : null}
                              </li>
                            );
                          },
                        )}
                      </ul>
                    ) : (
                      <span aria-hidden="true">—</span>
                    )}
                  </dd>
                </div>

                <div className={metadataRowClassName}>
                  <dt className={metadataTermClassName}>
                    {t(
                      "researchPublicationDetail.year",
                      {
                        lng: language,
                      },
                    )}
                  </dt>

                  <dd className="m-0">
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-brand-accent/50",
                        "bg-copper-soft px-3 py-1",
                        "font-mono font-semibold",
                        "text-copper-strong",
                      )}
                    >
                      <time
                        dateTime={String(
                          publication.year,
                        )}
                      >
                        {publication.year}
                      </time>
                    </Badge>
                  </dd>
                </div>

                <div className={metadataRowClassName}>
                  <dt className={metadataTermClassName}>
                    {t(
                      "researchPublicationDetail.reference",
                      {
                        lng: language,
                      },
                    )}
                  </dt>

                  <dd className="m-0 min-w-0 italic text-foreground">
                    {publication.reference ?? (
                      <span aria-hidden="true">—</span>
                    )}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </section>

        {hasDescription ? (
          <div
            className={cn(
              "border-t border-border",
              "pt-12 sm:pt-14 lg:pt-16",
            )}
          >
            <DetailDescriptionSection
              description={publication.description}
              idPrefix={`publication-${slug}`}
              title={t(
                "researchPublicationDetail.description",
                {
                  lng: language,
                },
              )}
            />
          </div>
        ) : null}

        <PublicationResourcesSection
          resources={publication.resources}
          title={t(
            "researchPublicationDetail.resources",
            {
              lng: language,
            },
          )}
          titleId={`publication-${slug}-resources-title`}
        />

        <PublicationRelatedItemsSection
          groups={relatedGroups}
          title={t(
            "researchPublicationDetail.relatedItems",
            {
              lng: language,
            },
          )}
          titleId={`publication-${slug}-related-items-title`}
        />

        <DetailNavigation
          ariaLabel={t(
            "researchPublicationDetail.navigationLabel",
            {
              lng: language,
            },
          )}
          backLink={{
            label: t(
              "actions.backToResearch",
              {
                lng: language,
              },
            ),
            to: getPageRoute(
              "research",
              language,
            ),
          }}
          previousLabel={t(
            "actions.previousPublication",
            {
              lng: language,
            },
          )}
          nextLabel={t(
            "actions.nextPublication",
            {
              lng: language,
            },
          )}
          previousLink={
            previousId && previousPublication
              ? {
                  label:
                    previousPublication.title,
                  secondaryLabel:
                    previousPublication.publication,
                  to: getResearchPublicationRoute(
                    previousId,
                    language,
                  ),
                }
              : undefined
          }
          nextLink={
            nextId && nextPublication
              ? {
                  label: nextPublication.title,
                  secondaryLabel:
                    nextPublication.publication,
                  to: getResearchPublicationRoute(
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

export default ResearchPublicationDetailPage;