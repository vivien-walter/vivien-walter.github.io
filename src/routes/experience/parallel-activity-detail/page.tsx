import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import {
  getLanguageFromPathname,
  getPageRoute,
  getParallelActivityRoute,
  getProjectRoute,
  getResearchPublicationRoute,
  getSoftwareRoute,
} from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import DetailHighlightsBand from '@/components/detail-highlights-band';
import DetailNavigation from '@/components/detail-navigation';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import PageHero from '@/components/page-hero';
import { getExperiencePage, getParallelActivityById, getParallelActivityNavigation } from '@/content/experience/page';
import { getProjectById } from '@/content/projects/page';
import { getPublicationById } from '@/content/research/page';
import { getSoftwareById } from '@/content/software/catalog';
import NotFoundPage from '@/routes/not-found/page';

import ExperienceDirectContributionsSection from '../_components/experience-direct-contributions-section';
import RelatedContentSection from '../_components/related-content-section';

function ParallelActivityDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getExperiencePage(language);

  const activity = slug ? getParallelActivityById(language, slug) : undefined;

  if (!activity) {
    return <NotFoundPage />;
  }

  const projectIds = 'projectIds' in activity ? activity.projectIds : [];

  const softwareIds = 'softwareIds' in activity ? activity.softwareIds : [];

  const publicationIds = 'publicationIds' in activity ? activity.publicationIds : [];

  const relatedProjects = projectIds.flatMap((projectId) => {
    const project = getProjectById(language, projectId);

    return project
      ? [
          {
            id: project.id,
            title: project.title,
            to: getProjectRoute(project.id, language),
          },
        ]
      : [];
  });

  const relatedSoftware = softwareIds.flatMap((softwareId) => {
    const software = getSoftwareById(language, softwareId);

    return software
      ? [
          {
            id: software.id,
            title: software.title,
            to: getSoftwareRoute(software.id, language),
          },
        ]
      : [];
  });

  const relatedPublications = publicationIds.flatMap((publicationId) => {
    const publication = getPublicationById(language, publicationId);

    return publication
      ? [
          {
            id: publication.id,
            title: publication.title,
            to: getResearchPublicationRoute(publication.id, language),
          },
        ]
      : [];
  });

  const { previous: previousActivity, next: nextActivity } = getParallelActivityNavigation(language, activity.id);

  const idPrefix = `parallel-activity-${activity.id}`;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <PageHero
        breadcrumbs={{
          ariaLabel: t('breadcrumbs.label', {
            lng: language,
          }),
          items: [
            {
              label: t('breadcrumbs.home', {
                lng: language,
              }),
              to: getPageRoute('home', language),
            },
            {
              label: page.title,
              to: getPageRoute('experience', language),
            },
            {
              label: activity.title,
            },
          ],
        }}
        eyebrow={page.parallelActivityDetail.eyebrow}
        title={activity.title}
        introduction={activity.summary}
      />

      {'highlights' in activity && activity.highlights.length > 0 ? (
        <DetailHighlightsBand ariaLabel={page.parallelActivityDetail.highlightsLabel} items={activity.highlights} />
      ) : null}

      <div className={['mx-auto w-full', 'max-w-editorial px-page', 'pt-12 pb-12', 'sm:pt-14 sm:pb-14', 'lg:pt-16 lg:pb-16'].join(' ')}>
        <DetailDescriptionSection
          description={'description' in activity ? activity.description : undefined}
          idPrefix={idPrefix}
          title={page.parallelActivityDetail.description}
        />

        <ExperienceDirectContributionsSection
          idPrefix={idPrefix}
          items={'directContributions' in activity ? activity.directContributions : undefined}
          title={page.parallelActivityDetail.directContributions}
        />

        <DetailTechnologiesSection
          externalLinkLabel={page.parallelActivityDetail.externalLinkLabel}
          groups={'technologyGroups' in activity ? activity.technologyGroups : undefined}
          idPrefix={idPrefix}
          title={page.parallelActivityDetail.technologies}
        />

        <RelatedContentSection
          idPrefix={idPrefix}
          title={page.parallelActivityDetail.relatedItems}
          groups={[
            {
              id: 'projects',
              title: page.parallelActivityDetail.relatedProjects,
              items: relatedProjects,
            },
            {
              id: 'software',
              title: page.parallelActivityDetail.relatedSoftware,
              items: relatedSoftware,
            },
            {
              id: 'publications',
              title: page.parallelActivityDetail.relatedPublications,
              items: relatedPublications,
            },
          ]}
        />

        <DetailNavigation
          ariaLabel={page.parallelActivityDetail.navigationLabel}
          backLink={{
            label: page.parallelActivityDetail.backLabel,
            to: getPageRoute('experience', language),
          }}
          previousLabel={page.parallelActivityDetail.previousLabel}
          nextLabel={page.parallelActivityDetail.nextLabel}
          previousLink={
            previousActivity
              ? {
                  label: previousActivity.title,
                  to: getParallelActivityRoute(previousActivity.id, language),
                }
              : undefined
          }
          nextLink={
            nextActivity
              ? {
                  label: nextActivity.title,
                  to: getParallelActivityRoute(nextActivity.id, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ParallelActivityDetailPage;
