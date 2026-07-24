import { useTranslation } from "react-i18next";
import {
  useLocation,
  useParams,
} from "react-router-dom";

import {
  getExperienceRoute,
  getLanguageFromPathname,
  getPageRoute,
  getProjectRoute,
  getResearchPublicationRoute,
  getSoftwareRoute,
} from "@/app/routing/navigation";
import DetailDescriptionSection from "@/components/detail-description-section";
import DetailHighlightsBand from "@/components/detail-highlights-band";
import DetailNavigation from "@/components/detail-navigation";
import DetailTechnologiesSection from "@/components/detail-technologies-section";
import PageHero from "@/components/page-hero";
import SectionHeader from "@/components/section-header";
import { Card } from "@/components/ui/card";
import {
  getExperienceById,
  getExperienceNavigation,
  getExperiencePage,
} from "@/content/experience/page";
import { getProjectsByExperienceId } from "@/content/projects/page";
import { getPublicationsByExperienceId } from "@/content/research/page";
import { getSoftwareByExperienceId } from "@/content/software/page";
import { formatContentDateRange } from "@/lib/content/formatters";
import { cn } from "@/lib/utils";
import NotFoundPage from "@/routes/not-found/page";

import ExperienceDirectContributionsSection from "../_components/experience-direct-contributions-section";
import RelatedContentSection from "../_components/related-content-section";

function ExperienceDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const page = getExperiencePage(language);

  const experience = slug
    ? getExperienceById(
        language,
        slug,
      )
    : undefined;

  if (!experience) {
    return <NotFoundPage />;
  }

  const relatedProjects =
    getProjectsByExperienceId(
      language,
      experience.id,
    ).map((project) => ({
      id: project.id,
      title: project.title,
      to: getProjectRoute(
        project.id,
        language,
      ),
    }));

  const relatedSoftware =
    getSoftwareByExperienceId(
      language,
      experience.id,
    ).map((software) => ({
      id: software.id,
      title: software.title,
      to: getSoftwareRoute(
        software.id,
        language,
      ),
    }));

  const relatedPublications =
    getPublicationsByExperienceId(
      language,
      experience.id,
    ).map((publication) => ({
      id: publication.id,
      title: publication.title,
      to: getResearchPublicationRoute(
        publication.id,
        language,
      ),
    }));

  const {
    previous: previousExperience,
    next: nextExperience,
  } = getExperienceNavigation(
    language,
    experience.id,
  );

  const idPrefix =
    `experience-${experience.id}`;

  return (
    <article
      className="overflow-hidden"
      aria-labelledby="page-title"
    >
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
              to: getPageRoute(
                "experience",
                language,
              ),
            },
            {
              label: experience.role,
            },
          ],
        }}
        eyebrow={page.detail.eyebrow}
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
                  "font-mono text-xs",
                  "font-semibold uppercase",
                  "tracking-[0.08em]",
                  "text-muted-foreground",
                )}
              >
                {page.detail.organization}
              </dt>

              <dd
                className={cn(
                  "m-0 mt-1",
                  "font-semibold",
                  "text-brand-ink",
                )}
              >
                {experience.organization}
              </dd>
            </div>

            <div className="min-w-0">
              <dt
                className={cn(
                  "font-mono text-xs",
                  "font-semibold uppercase",
                  "tracking-[0.08em]",
                  "text-muted-foreground",
                )}
              >
                {page.detail.period}
              </dt>

              <dd
                className={cn(
                  "m-0 mt-1",
                  "font-semibold",
                  "text-brand-ink",
                )}
              >
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
                    "font-mono text-xs",
                    "font-semibold uppercase",
                    "tracking-[0.08em]",
                    "text-muted-foreground",
                  )}
                >
                  {page.detail.location}
                </dt>

                <dd
                  className={cn(
                    "m-0 mt-1",
                    "font-semibold",
                    "text-brand-ink",
                  )}
                >
                  {experience.location}
                </dd>
              </div>
            ) : null}
          </dl>
        }
      />

      {experience.highlights.length > 0 ? (
        <DetailHighlightsBand
          ariaLabel={
            page.detail.highlightsLabel
          }
          items={experience.highlights}
        />
      ) : null}

      <div
className={cn(
  "mx-auto w-full",
  "max-w-editorial px-page",
  "pt-12 pb-12",
  "sm:pt-14 sm:pb-14",
  "lg:pt-16 lg:pb-16",
)}
      >
        <DetailDescriptionSection
          description={
            experience.description
          }
          idPrefix={idPrefix}
          title={page.detail.description}
        />

        <ExperienceDirectContributionsSection
          idPrefix={idPrefix}
          items={
            experience.directContributions
          }
          title={
            page.detail.directContributions
          }
        />

        <DetailTechnologiesSection
          externalLinkLabel={
            page.detail.externalLinkLabel
          }
          groups={
            experience.technologyGroups
          }
          idPrefix={idPrefix}
          title={page.detail.technologies}
        />

        {experience.finalState ? (
          <section
            className={cn(
              "border-t border-border",
              "py-12 sm:py-14 lg:py-16",
            )}
            aria-labelledby={`${idPrefix}-final-state-title`}
          >
            <SectionHeader
              title={
                experience.finalState.title
              }
              titleId={`${idPrefix}-final-state-title`}
              className="mb-8"
            />

            <Card
              className={cn(
                "gap-0 rounded-lg py-0",
                "border-border-strong",
                "bg-brand-hero",
                "shadow-subtle",
              )}
            >
              <p
                className={cn(
                  "!m-0 max-w-readable",
                  "px-5 py-6",
                  "text-foreground",
                  "sm:px-6 sm:py-7",
                )}
              >
                {experience.finalState.text}
              </p>
            </Card>
          </section>
        ) : null}

        <RelatedContentSection
          idPrefix={idPrefix}
          title={page.detail.relatedItems}
          groups={[
            {
              id: "projects",
              title:
                page.detail.relatedProjects,
              items: relatedProjects,
            },
            {
              id: "software",
              title:
                page.detail.relatedSoftware,
              items: relatedSoftware,
            },
            {
              id: "publications",
              title:
                page.detail
                  .relatedPublications,
              items: relatedPublications,
            },
          ]}
        />

        <DetailNavigation
          ariaLabel={
            page.detail.navigationLabel
          }
          backLink={{
            label: page.detail.backLabel,
            to: getPageRoute(
              "experience",
              language,
            ),
          }}
          previousLabel={
            page.detail.previousLabel
          }
          nextLabel={
            page.detail.nextLabel
          }
          previousLink={
            previousExperience
              ? {
                  label:
                    previousExperience.role,
                  secondaryLabel:
                    previousExperience.organization,
                  to: getExperienceRoute(
                    previousExperience.id,
                    language,
                  ),
                }
              : undefined
          }
          nextLink={
            nextExperience
              ? {
                  label:
                    nextExperience.role,
                  secondaryLabel:
                    nextExperience.organization,
                  to: getExperienceRoute(
                    nextExperience.id,
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

export default ExperienceDetailPage;