import {
  ArticleIcon,
  CodeIcon,
  TargetIcon,
} from "@phosphor-icons/react";
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
import DetailNavigation from "@/components/detail-navigation";
import PageHero from "@/components/page-hero";
import { getExperienceById } from "@/content/experience/page";
import {
  getProjectById,
  getProjectNavigation,
  getProjectsPage,
} from "@/content/projects/page";
import { getPublicationsByProjectId } from "@/content/research/page";
import { getSoftwareByProjectId } from "@/content/software/page";
import NotFoundPage from "@/routes/not-found/page";

import ProjectFeaturesSection from "./_components/project-features-section";
import ProjectNarrativeSection from "./_components/project-narrative-section";
import ProjectOverviewCard from "./_components/project-overview-card";
import ProjectRelatedItemsSection from "./_components/project-related-items-section";
import ProjectResourcesSection from "./_components/project-resources-section";

function ProjectDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const page = getProjectsPage(language);

  const project = slug
    ? getProjectById(
        language,
        slug,
      )
    : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  const relatedExperiences =
    project.experienceIds.flatMap(
      (experienceId) => {
        const experience =
          getExperienceById(
            language,
            experienceId,
          );

        return experience
          ? [
              {
                id: experience.id,
                label: experience.role,
                to: getExperienceRoute(
                  experience.id,
                  language,
                ),
              },
            ]
          : [];
      },
    );

  const relatedSoftware =
    getSoftwareByProjectId(
      language,
      project.id,
    ).map((software) => ({
      id: software.id,
      label: software.title,
      to: getSoftwareRoute(
        software.id,
        language,
      ),
    }));

  const relatedPublications =
    getPublicationsByProjectId(
      language,
      project.id,
    ).map((publication) => ({
      id: publication.id,
      label: publication.title,
      to: getResearchPublicationRoute(
        publication.id,
        language,
      ),
    }));

  const {
    previous: previousProject,
    next: nextProject,
  } = getProjectNavigation(
    language,
    project.id,
  );

  const resources =
    "resources" in project
      ? project.resources
      : undefined;

  const idPrefix =
    `project-${project.id}`;

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
              label: page.eyebrow,
              to: getPageRoute(
                "projects",
                language,
              ),
            },
            {
              label: project.title,
            },
          ],
        }}
        eyebrow={page.detail.eyebrow}
        title={project.title}
        introduction={project.summary}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        ].join(" ")}
      >
        <ProjectOverviewCard
          ariaLabel={page.detail.overview}
          language={language}
          overview={project.overview}
          period={project.period}
          periodLabel={page.detail.period}
          programmingLanguages={
            project.programmingLanguages
          }
          tagsLabel={page.detail.tags}
          technologies={
            project.technologies
          }
        />

        <ProjectNarrativeSection
          title={page.detail.context}
          titleId={`${idPrefix}-context-title`}
          icon={TargetIcon}
          paragraphs={
            project.context?.paragraphs
          }
        />

        <ProjectNarrativeSection
          title={page.detail.contribution}
          titleId={`${idPrefix}-contribution-title`}
          icon={CodeIcon}
          paragraphs={
            project.contribution
              ?.paragraphs
          }
        />

        <ProjectFeaturesSection
          title={page.detail.features}
          titleId={`${idPrefix}-features-title`}
          features={project.features}
        />

        <ProjectNarrativeSection
          title={page.detail.results}
          titleId={`${idPrefix}-results-title`}
          icon={ArticleIcon}
          items={project.results}
        />

        <ProjectResourcesSection
          title={page.detail.resources}
          titleId={`${idPrefix}-resources-title`}
          resources={resources}
        />

        <ProjectRelatedItemsSection
          title={page.detail.relatedItems}
          titleId={`${idPrefix}-related-items-title`}
          experiencesTitle={
            page.detail.relatedExperiences
          }
          softwareTitle={
            page.detail.relatedSoftware
          }
          publicationsTitle={
            page.detail
              .relatedPublications
          }
          experiences={
            relatedExperiences
          }
          software={relatedSoftware}
          publications={
            relatedPublications
          }
        />

        <DetailNavigation
          className="mt-0 sm:mt-0"
          ariaLabel={
            page.detail.navigationLabel
          }
          backLink={{
            label: page.detail.backLabel,
            to: getPageRoute(
              "projects",
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
            previousProject
              ? {
                  label:
                    previousProject.title,
                  to: getProjectRoute(
                    previousProject.id,
                    language,
                  ),
                }
              : undefined
          }
          nextLink={
            nextProject
              ? {
                  label:
                    nextProject.title,
                  to: getProjectRoute(
                    nextProject.id,
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

export default ProjectDetailPage;