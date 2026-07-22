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
import NotFoundPage from "@/routes/not-found/not-found-page";
import { getExperienceById } from "@/routes/experience/data/experience-content.loader";
import { getPublicationById } from "@/routes/research/data/research-content.loader";
import { getSoftwareById } from "@/routes/software/data/software-content.loader";
import DetailNavigation from "@/shared/components/detail-navigation";
import PageHero from "@/shared/components/page-hero";

import ProjectFeaturesSection from "./components/project-features-section";
import ProjectNarrativeSection from "./components/project-narrative-section";
import ProjectOverviewCard from "./components/project-overview-card";
import ProjectRelatedItemsSection from "./components/project-related-items-section";
import ProjectResourcesSection from "./components/project-resources-section";
import {
  getAdjacentProjectIds,
  getProjectById,
} from "./data/project-content.loader";

function ProjectDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const project = slug
    ? getProjectById(language, slug)
    : undefined;

  if (!project || !slug) {
    return <NotFoundPage />;
  }

  const relatedExperiences = (
    project.relatedExperiences ?? []
  ).flatMap(({ experienceId }) => {
    const experience = getExperienceById(
      language,
      experienceId,
    );

    return experience
      ? [
          {
            id: experienceId,
            label: experience.role,
            to: getExperienceRoute(
              experienceId,
              language,
            ),
          },
        ]
      : [];
  });

  const relatedSoftware = (
    project.relatedSoftware ?? []
  ).flatMap(({ softwareId }) => {
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

  const relatedPublications = (
    project.relatedPublications ?? []
  ).flatMap(({ publicationId }) => {
    const publication = getPublicationById(
      language,
      publicationId,
    );

    return publication
      ? [
          {
            id: publicationId,
            label: publication.title,
            to: getResearchPublicationRoute(
              publicationId,
              language,
            ),
          },
        ]
      : [];
  });

  const { previousId, nextId } =
    getAdjacentProjectIds(language, slug);

  const previousProject = previousId
    ? getProjectById(language, previousId)
    : undefined;

  const nextProject = nextId
    ? getProjectById(language, nextId)
    : undefined;

  const labels =
    language === "fr"
      ? {
          overview: "Résumé du projet",
          context: "Contexte et objectifs",
          contribution: "Ma contribution",
          features: "Fonctionnalités clés",
          results: "Résultats et impact",
          resources: "Ressources",
          tags: "Technologies et langages",
        }
      : {
          overview: "Project overview",
          context: "Context and objectives",
          contribution: "My contribution",
          features: "Key features",
          results: "Results and impact",
          resources: "Resources",
          tags: "Technologies and languages",
        };

  const idPrefix = `project-${slug}`;

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
              label: t("breadcrumbs.projects", {
                lng: language,
              }),
              to: getPageRoute("projects", language),
            },
            {
              label: project.title,
            },
          ],
        }}
        eyebrow={t("projectDetail.eyebrow", {
          lng: language,
        })}
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
          ariaLabel={labels.overview}
          language={language}
          overview={project.overview}
          period={project.period}
          periodLabel={t("content.period", {
            lng: language,
          })}
          programmingLanguages={
            project.programmingLanguages
          }
          tagsLabel={labels.tags}
          technologies={project.technologies}
        />

        <ProjectNarrativeSection
          title={labels.context}
          titleId={`${idPrefix}-context-title`}
          icon={TargetIcon}
          paragraphs={project.context?.paragraphs}
        />

        <ProjectNarrativeSection
          title={labels.contribution}
          titleId={`${idPrefix}-contribution-title`}
          icon={CodeIcon}
          paragraphs={project.contribution?.paragraphs}
        />

        <ProjectFeaturesSection
          title={labels.features}
          titleId={`${idPrefix}-features-title`}
          features={project.features}
        />

        <ProjectNarrativeSection
          title={labels.results}
          titleId={`${idPrefix}-results-title`}
          icon={ArticleIcon}
          items={project.results}
        />

        <ProjectResourcesSection
          title={labels.resources}
          titleId={`${idPrefix}-resources-title`}
          links={project.links}
        />

        <ProjectRelatedItemsSection
          title={t("content.relatedItems", {
            lng: language,
          })}
          titleId={`${idPrefix}-related-items-title`}
          experiencesTitle={t(
            "pages.experience.title",
            {
              lng: language,
            },
          )}
          softwareTitle={t("pages.software.title", {
            lng: language,
          })}
          publicationsTitle={t(
            "pages.research.publications.sectionTitle",
            {
              lng: language,
            },
          )}
          experiences={relatedExperiences}
          software={relatedSoftware}
          publications={relatedPublications}
        />

        <DetailNavigation
          className="mt-0 sm:mt-0"
          ariaLabel={t(
            "projectDetail.navigationLabel",
            {
              lng: language,
            },
          )}
          backLink={{
            label: t("actions.backToProjects", {
              lng: language,
            }),
            to: getPageRoute("projects", language),
          }}
          previousLabel={t(
            "actions.previousProject",
            {
              lng: language,
            },
          )}
          nextLabel={t("actions.nextProject", {
            lng: language,
          })}
          previousLink={
            previousId && previousProject
              ? {
                  label: previousProject.title,
                  to: getProjectRoute(
                    previousId,
                    language,
                  ),
                }
              : undefined
          }
          nextLink={
            nextId && nextProject
              ? {
                  label: nextProject.title,
                  to: getProjectRoute(
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

export default ProjectDetailPage;