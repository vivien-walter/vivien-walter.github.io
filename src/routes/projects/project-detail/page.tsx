import { ArticleIcon, CodeIcon, TargetIcon } from '@phosphor-icons/react';
import { useLocation, useParams } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import PageDivider from '@/components/page-divider';
import { getProjectDetailById, getProjectDetailContent } from '@/content/projects/detail/page';
import { getProjectsPage } from '@/content/projects/page';
import NotFoundPage from '@/routes/not-found/page';

import FeaturesSection from './_components/features-section';
import NarrativeSection from './_components/narrative-section';
import OverviewCard from './_components/overview-card';
import ProjectDetailHero from './_components/project-detail-hero';
import ProjectDetailNavigation from './_components/project-detail-navigation';
import ProjectDetailRelatedItemsSection from './_components/project-detail-related-items-section';
import ResourcesSection from './_components/resources-section';

export default function ProjectDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const language = getLanguageFromPathname(location.pathname);

  const page = getProjectsPage(language);
  const detail = getProjectDetailContent(language);
  const project = slug ? getProjectDetailById(language, slug) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  const idPrefix = `project-${project.id}`;

  const hasContext = project.context.paragraphs.some((paragraph) => paragraph.trim().length > 0);
  const hasContribution = project.contribution.paragraphs.some((paragraph) => paragraph.trim().length > 0);
  const hasFeatures = project.features?.some((feature) => feature.title.trim().length > 0 && feature.description.trim().length > 0) ?? false;
  const hasResults = project.results?.some((item) => item.trim().length > 0) ?? false;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <ProjectDetailHero language={language} project={project} projectsBreadcrumbLabel={page.breadcrumbLabel} defaultEyebrow={detail.eyebrow} />

      <OverviewCard
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

      {hasContext ? <PageDivider /> : null}

      <NarrativeSection title={detail.context} titleId={`${idPrefix}-context-title`} icon={TargetIcon} paragraphs={project.context.paragraphs} />

      {hasContribution ? <PageDivider /> : null}

      <NarrativeSection
        title={detail.contribution}
        titleId={`${idPrefix}-contribution-title`}
        icon={CodeIcon}
        paragraphs={project.contribution.paragraphs}
      />

      {hasFeatures ? <PageDivider /> : null}

      <FeaturesSection
        title={detail.features}
        titleId={`${idPrefix}-features-title`}
        description={detail.featuresDescription}
        features={project.features}
      />

      {hasResults ? <PageDivider /> : null}

      <NarrativeSection
        title={detail.results}
        titleId={`${idPrefix}-results-title`}
        icon={ArticleIcon}
        description={project.resultsDescription}
        items={project.results}
      />

      <ResourcesSection title={detail.resources} titleId={`${idPrefix}-resources-title`} resources={project.resources} />

      <ProjectDetailRelatedItemsSection language={language} project={project} />

      <PageDivider />

      <ProjectDetailNavigation language={language} projectId={project.id} labels={detail} />
    </article>
  );
}
