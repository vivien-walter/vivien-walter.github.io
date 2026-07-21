import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getResearchPublicationRoute,
} from "@/app/routing/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NotFoundPage from "@/routes/not-found/not-found-page";
import ContentLink from "@/shared/components/content-link";
import ContentSections from "@/shared/components/content-sections";
import DetailNavigation from "@/shared/components/detail-navigation";
import PageHero from "@/shared/components/page-hero";

import {
  getAdjacentPublicationIds,
  getPublicationById,
} from "./data/research-content.loader";

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

  const reference =
    publication.reference ??
    publication.publication;

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
          <h2
            id="publication-metadata-title"
            className={cn(
              "!m-0 text-xl font-bold leading-heading",
              "tracking-[-0.025em] text-brand-ink",
            )}
          >
            {t(
              "researchPublicationDetail.metadata",
              {
                lng: language,
              },
            )}
          </h2>

          <span
            aria-hidden="true"
            className="mt-3 block h-0.5 w-12 bg-brand-accent"
          />

          <Card
            className={cn(
              "mt-8 gap-0 overflow-hidden py-0",
              "border-border-strong shadow-subtle",
            )}
          >
            <CardContent className="p-0">
              <dl className="m-0 divide-y divide-border">
                <div
                  className={cn(
                    "grid gap-2 px-5 py-5",
                    "sm:grid-cols-[10rem_minmax(0,1fr)]",
                    "sm:gap-6 sm:px-6",
                  )}
                >
                  <dt
                    className={cn(
                      "font-mono text-xs font-semibold uppercase",
                      "tracking-[0.06em] text-muted-foreground",
                    )}
                  >
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
                        "border-brand-accent/50 bg-copper-soft",
                        "px-3 py-1 font-mono font-semibold",
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

                <div
                  className={cn(
                    "grid gap-2 px-5 py-5",
                    "sm:grid-cols-[10rem_minmax(0,1fr)]",
                    "sm:gap-6 sm:px-6",
                  )}
                >
                  <dt
                    className={cn(
                      "font-mono text-xs font-semibold uppercase",
                      "tracking-[0.06em] text-muted-foreground",
                    )}
                  >
                    {t(
                      "researchPublicationDetail.reference",
                      {
                        lng: language,
                      },
                    )}
                  </dt>

                  <dd className="m-0 italic text-foreground">
                    {reference}
                  </dd>
                </div>

                {publication.authors.length > 0 ? (
                  <div
                    className={cn(
                      "grid gap-2 px-5 py-5",
                      "sm:grid-cols-[10rem_minmax(0,1fr)]",
                      "sm:gap-6 sm:px-6",
                    )}
                  >
                    <dt
                      className={cn(
                        "font-mono text-xs font-semibold uppercase",
                        "tracking-[0.06em] text-muted-foreground",
                      )}
                    >
                      {t(
                        "researchPublicationDetail.authors",
                        {
                          lng: language,
                        },
                      )}
                    </dt>

                    <dd className="m-0 text-foreground">
                      {publication.authors.join(
                        ", ",
                      )}
                    </dd>
                  </div>
                ) : null}

                {publication.summary ? (
                  <div
                    className={cn(
                      "grid gap-2 px-5 py-5",
                      "sm:grid-cols-[10rem_minmax(0,1fr)]",
                      "sm:gap-6 sm:px-6",
                    )}
                  >
                    <dt
                      className={cn(
                        "font-mono text-xs font-semibold uppercase",
                        "tracking-[0.06em] text-muted-foreground",
                      )}
                    >
                      {t(
                        "researchPublicationDetail.contribution",
                        {
                          lng: language,
                        },
                      )}
                    </dt>

                    <dd className="m-0 text-foreground">
                      {publication.summary}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </CardContent>
          </Card>
        </section>

        {publication.sections &&
        publication.sections.length > 0 ? (
          <ContentSections
            idPrefix={`publication-${slug}`}
            sections={publication.sections}
          />
        ) : null}

        {publication.doi ||
        (publication.links &&
          publication.links.length > 0) ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="publication-resources-title"
          >
            <h2
              id="publication-resources-title"
              className={cn(
                "!m-0 text-xl font-bold leading-heading",
                "tracking-[-0.025em] text-brand-ink",
              )}
            >
              {t(
                "researchPublicationDetail.resources",
                {
                  lng: language,
                },
              )}
            </h2>

            <span
              aria-hidden="true"
              className="mt-3 block h-0.5 w-12 bg-brand-accent"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {publication.doi ? (
                <Button asChild>
                  <a
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t(
                      "researchPublicationDetail.openDoi",
                      {
                        lng: language,
                      },
                    )}

                    <ArrowUpRightIcon
                      aria-hidden="true"
                      weight="bold"
                    />
                  </a>
                </Button>
              ) : null}

              {publication.links?.map(
                (link, index) => (
                  <ContentLink
                    key={`${link.href}-${index}`}
                    link={link}
                    variant="inline"
                  />
                ),
              )}
            </div>
          </section>
        ) : null}

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