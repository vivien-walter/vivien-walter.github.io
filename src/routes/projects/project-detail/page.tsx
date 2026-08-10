import { ArticleIcon, CodeIcon, TargetIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import {
  getExperienceRoute,
  getLanguageFromPathname,
  getPageRoute,
  getProjectRoute,
  getResearchPublicationRoute,
  getSoftwareRoute,
} from '@/app/routing/navigation';
import DetailNavigation from '@/components/detail-navigation';
import {
  Hero,
  HeroBreadcrumbs,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroHeader,
  HeroImage,
  HeroMedia,
  HeroTitle,
} from '@/components/hero';
import { Separator } from '@/components/ui/separator';
import { getExperienceById } from '@/content/experience/catalog';
import { getProjectDetailById, getProjectDetailContent, getProjectDetailNavigation } from '@/content/projects/detail/page';
import { getProjectsPage } from '@/content/projects/page';
import { getPublicationsByProjectId } from '@/content/research/publications/catalog';
import { getSoftwareByProjectId } from '@/content/software/catalog';
import NotFoundPage from '@/routes/not-found/page';

import ProjectFeaturesSection from './_components/project-features-section';
import ProjectNarrativeSection from './_components/project-narrative-section';
import ProjectOverviewCard from './_components/project-overview-card';
import ProjectRelatedItemsSection from './_components/project-related-items-section';
import ProjectResourcesSection from './_components/project-resources-section';

function ProjectDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getProjectsPage(language);

  const detail = getProjectDetailContent(language);

  const project = slug ? getProjectDetailById(language, slug) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  const relatedExperiences = project.experienceIds.flatMap((experienceId) => {
    const experience = getExperienceById(language, experienceId);

    return experience
      ? [
          {
            id: experience.id,
            label: experience.role,
            secondaryText: experience.organization,
            to: getExperienceRoute(experience.id, language),
          },
        ]
      : [];
  });

  const relatedSoftware = getSoftwareByProjectId(language, project.id).map((software) => ({
    id: software.id,
    label: software.title,
    badges: software.languages,
    to: getSoftwareRoute(software.id, language),
  }));

  const relatedPublications = getPublicationsByProjectId(language, project.id).map((publication) => ({
    id: publication.id,
    label: publication.title,
    secondaryText: `${publication.publication} (${publication.year})`,
    to: getResearchPublicationRoute(publication.id, language),
  }));

  const hasRelatedItems =
    (detail.relatedExperiences.trim().length > 0 &&
      relatedExperiences.some((item) => item.id.trim().length > 0 && item.label.trim().length > 0 && item.to.trim().length > 0)) ||
    (detail.relatedSoftware.trim().length > 0 &&
      relatedSoftware.some((item) => item.id.trim().length > 0 && item.label.trim().length > 0 && item.to.trim().length > 0)) ||
    (detail.relatedPublications.trim().length > 0 &&
      relatedPublications.some((item) => item.id.trim().length > 0 && item.label.trim().length > 0 && item.to.trim().length > 0));

  const { previous: previousProject, next: nextProject } = getProjectDetailNavigation(language, project.id);

  const idPrefix = `project-${project.id}`;

  const hasContext = project.context.paragraphs.some((paragraph) => paragraph.trim().length > 0);

  const hasContribution = project.contribution.paragraphs.some((paragraph) => paragraph.trim().length > 0);

  const hasFeatures = project.features?.some((feature) => feature.title.trim().length > 0 && feature.description.trim().length > 0) ?? false;

  const hasResults = project.results?.some((item) => item.trim().length > 0) ?? false;

  const hasVisibleResources = project.resources?.some((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? false;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <Hero aria-labelledby="page-title">
        <HeroContainer className={project.heroImage ? undefined : 'lg:grid-cols-1'}>
          <HeroContent>
            <HeroBreadcrumbs
              ariaLabel={t('breadcrumbs.label', {
                lng: language,
              })}
              items={[
                {
                  label: t('breadcrumbs.home', {
                    lng: language,
                  }),
                  to: getPageRoute('home', language),
                },
                {
                  label: page.breadcrumbLabel,
                  to: getPageRoute('projects', language),
                },
                {
                  label: project.breadcrumbLabel,
                },
              ]}
            />

            <HeroHeader className="mt-4 sm:mt-5">
              <HeroEyebrow>{project.eyebrow ?? detail.eyebrow}</HeroEyebrow>

              <HeroTitle id="page-title">{project.title}</HeroTitle>

              <HeroDescription>
                <p className="!m-0">{project.summary}</p>
              </HeroDescription>
            </HeroHeader>
          </HeroContent>

          {project.heroImage ? (
            <HeroMedia>
              <HeroImage src={project.heroImage.src} alt={project.heroImage.alt} objectPosition={project.heroImage.objectPosition} />
            </HeroMedia>
          ) : null}
        </HeroContainer>
      </Hero>

      <div className={['max-w-editorial px-page mx-auto w-full', 'py-12 sm:py-14 lg:py-16'].join(' ')}>
        <ProjectOverviewCard
          ariaLabel={detail.overview}
          language={language}
          ongoingLabel={detail.ongoing}
          overview={project.overview}
          period={project.period}
          periodLabel={detail.period}
          programmingLanguages={project.programmingLanguages}
          tagsLabel={detail.tags}
          technologies={project.technologies}
        />

        {hasContext ? <Separator /> : null}

        <ProjectNarrativeSection
          title={detail.context}
          titleId={`${idPrefix}-context-title`}
          icon={TargetIcon}
          paragraphs={project.context.paragraphs}
        />

        {hasContribution ? <Separator /> : null}

        <ProjectNarrativeSection
          title={detail.contribution}
          titleId={`${idPrefix}-contribution-title`}
          icon={CodeIcon}
          paragraphs={project.contribution.paragraphs}
        />

        {hasFeatures ? <Separator /> : null}

        <ProjectFeaturesSection
          title={detail.features}
          titleId={`${idPrefix}-features-title`}
          description={detail.featuresDescription}
          features={project.features}
        />

        {hasResults ? <Separator /> : null}

        <ProjectNarrativeSection
          title={detail.results}
          titleId={`${idPrefix}-results-title`}
          icon={ArticleIcon}
          description={project.resultsDescription}
          items={project.results}
        />

        {hasVisibleResources ? <Separator /> : null}

        <ProjectResourcesSection title={detail.resources} titleId={`${idPrefix}-resources-title`} resources={project.resources} />

        {hasRelatedItems ? <Separator /> : null}

        <ProjectRelatedItemsSection
          title={detail.relatedItems}
          titleId={`${idPrefix}-related-items-title`}
          experiencesTitle={detail.relatedExperiences}
          softwareTitle={detail.relatedSoftware}
          publicationsTitle={detail.relatedPublications}
          experiences={relatedExperiences}
          software={relatedSoftware}
          publications={relatedPublications}
        />

        <Separator />

        <DetailNavigation
          className="mt-0 sm:mt-0"
          ariaLabel={detail.navigationLabel}
          backLink={{
            label: detail.backLabel,
            to: getPageRoute('projects', language),
          }}
          previousLabel={detail.previousLabel}
          nextLabel={detail.nextLabel}
          previousLink={
            previousProject
              ? {
                  label: previousProject.title,
                  to: getProjectRoute(previousProject.id, language),
                }
              : undefined
          }
          nextLink={
            nextProject
              ? {
                  label: nextProject.title,
                  to: getProjectRoute(nextProject.id, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ProjectDetailPage;
