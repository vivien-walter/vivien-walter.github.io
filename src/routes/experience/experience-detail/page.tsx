import { useLocation, useParams } from 'react-router-dom';

import { getLanguageFromPathname, getProjectRoute, getResearchPublicationRoute, getSoftwareRoute } from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import DetailHighlightsBand from '@/components/detail-highlights-band';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import PageDivider from '@/components/page-divider';
import { getExperienceDetailById, getExperienceDetailContent } from '@/content/experience/experiences/page';
import { getProjectsByExperienceId } from '@/content/projects/catalog';
import { getPublicationsByExperienceId } from '@/content/research/publications/catalog';
import { getSoftwareByExperienceId } from '@/content/software/catalog';
import NotFoundPage from '@/routes/not-found/page';

import DirectContributionsSection from './_components/direct-contributions-section';
import ExperienceDetailHero from './_components/experience-detail-hero';
import ExperienceDetailNavigation from './_components/experience-detail-navigation';
import FinalStateSection from './_components/final-state-section';
import RelatedContentSection from './_components/related-content-section';
import ResourcesSection from './_components/resources-section';

export default function ExperienceDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const language = getLanguageFromPathname(location.pathname);

  const detail = getExperienceDetailContent(language);
  const experience = slug ? getExperienceDetailById(language, slug) : undefined;

  if (!experience) {
    return <NotFoundPage />;
  }

  const relatedProjects = getProjectsByExperienceId(language, experience.id).map((project) => ({
    id: project.id,
    title: project.title,
    to: getProjectRoute(project.id, language),
  }));

  const relatedSoftware = getSoftwareByExperienceId(language, experience.id).map((software) => ({
    id: software.id,
    title: software.title,
    badges: software.languages,
    to: getSoftwareRoute(software.id, language),
  }));

  const relatedPublications = getPublicationsByExperienceId(language, experience.id).map((publication) => ({
    id: publication.id,
    title: publication.title,
    secondaryText: publication.publication ? `${publication.publication} (${publication.year})` : String(publication.year),
    to: getResearchPublicationRoute(publication.id, language),
  }));

  const idPrefix = `experience-${experience.id}`;

  const hasDescription = experience.description?.paragraphs.some((paragraph) => paragraph.trim().length > 0) ?? false;
  const hasDirectContributions = (experience.directContributions?.length ?? 0) > 0;
  const hasTechnologies = experience.technologyGroups?.some((group) => group.items.length > 0) ?? false;
  const hasFinalState = experience.finalState !== undefined;
  const hasVisibleResources = experience.resources?.some((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? false;

  const hasRelatedContent =
    (detail.relatedProjects.trim().length > 0 &&
      relatedProjects.some((item) => item.id.trim().length > 0 && item.title.trim().length > 0 && item.to.trim().length > 0)) ||
    (detail.relatedSoftware.trim().length > 0 &&
      relatedSoftware.some((item) => item.id.trim().length > 0 && item.title.trim().length > 0 && item.to.trim().length > 0)) ||
    (detail.relatedPublications.trim().length > 0 &&
      relatedPublications.some((item) => item.id.trim().length > 0 && item.title.trim().length > 0 && item.to.trim().length > 0));

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <ExperienceDetailHero detail={detail} experience={experience} language={language} />

      <DetailHighlightsBand ariaLabel={detail.highlightsLabel} items={experience.highlights} />

      <DetailDescriptionSection contained description={experience.description} idPrefix={idPrefix} title={detail.description} />

      {hasDescription && hasDirectContributions ? <PageDivider /> : null}

      <DirectContributionsSection idPrefix={idPrefix} items={experience.directContributions} title={detail.directContributions} />

      {hasTechnologies && (hasDescription || hasDirectContributions) ? <PageDivider /> : null}

      <DetailTechnologiesSection
        contained
        externalLinkLabel={detail.externalLinkLabel}
        groups={experience.technologyGroups}
        idPrefix={idPrefix}
        title={detail.technologies}
      />

      {hasFinalState && (hasDescription || hasDirectContributions || hasTechnologies) ? <PageDivider /> : null}

      {experience.finalState ? <FinalStateSection finalState={experience.finalState} idPrefix={idPrefix} /> : null}

      {hasVisibleResources && (hasDescription || hasDirectContributions || hasTechnologies || hasFinalState) ? <PageDivider /> : null}

      <ResourcesSection resources={experience.resources} title={detail.resources} titleId={`${idPrefix}-resources-title`} />

      {hasRelatedContent && (hasDescription || hasDirectContributions || hasTechnologies || hasFinalState || hasVisibleResources) ? (
        <PageDivider />
      ) : null}

      <RelatedContentSection
        idPrefix={idPrefix}
        title={detail.relatedItems}
        groups={[
          {
            id: 'projects',
            title: detail.relatedProjects,
            items: relatedProjects,
          },
          {
            id: 'software',
            title: detail.relatedSoftware,
            items: relatedSoftware,
          },
          {
            id: 'publications',
            title: detail.relatedPublications,
            items: relatedPublications,
          },
        ]}
      />

      <PageDivider className={hasRelatedContent ? 'mt-4 sm:mt-6' : undefined} />

      <ExperienceDetailNavigation detail={detail} experienceId={experience.id} language={language} />
    </article>
  );
}
