import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import { getLanguageFromPathname, getPageRoute, getSoftwareRoute } from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import DetailHighlightsBand from '@/components/detail-highlights-band';
import DetailNavigation from '@/components/detail-navigation';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import PageHero from '@/components/page-hero';
import { getSoftwareById, getSoftwareContent, getSoftwareNavigation } from '@/content/software/page';
import NotFoundPage from '@/routes/not-found/page';

import SoftwareResourcesSection from './_components/software-resources-section';

function SoftwareDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getSoftwareContent(language);

  const software = slug ? getSoftwareById(language, slug) : undefined;

  if (!software) {
    return <NotFoundPage />;
  }

  const { previous: previousSoftware, next: nextSoftware } = getSoftwareNavigation(language, software.id);

  const idPrefix = `software-${software.id}`;

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
              to: getPageRoute('software', language),
            },
            {
              label: software.title,
            },
          ],
        }}
        eyebrow={page.detail.eyebrow}
        title={software.title}
        introduction={software.summary}
      />

      <DetailHighlightsBand ariaLabel={page.detail.highlightsLabel} items={software.highlights} />

      <div className={['mx-auto w-full', 'max-w-editorial px-page', 'pt-12 pb-12', 'sm:pt-14 sm:pb-14', 'lg:pt-16 lg:pb-16'].join(' ')}>
        <DetailDescriptionSection description={software.description} idPrefix={idPrefix} title={page.detail.descriptionTitle} />

        <DetailTechnologiesSection
          externalLinkLabel={page.detail.externalLinkLabel}
          groups={software.technologyGroups}
          idPrefix={idPrefix}
          title={page.detail.technologiesTitle}
        />

        <SoftwareResourcesSection resources={software.resources} title={page.detail.resourcesTitle} titleId={`${idPrefix}-resources-title`} />

        <DetailNavigation
          ariaLabel={page.detail.navigationLabel}
          backLink={{
            label: page.detail.backLabel,
            to: getPageRoute('software', language),
          }}
          previousLabel={page.detail.previousLabel}
          nextLabel={page.detail.nextLabel}
          previousLink={
            previousSoftware
              ? {
                  label: previousSoftware.title,
                  to: getSoftwareRoute(previousSoftware.id, language),
                }
              : undefined
          }
          nextLink={
            nextSoftware
              ? {
                  label: nextSoftware.title,
                  to: getSoftwareRoute(nextSoftware.id, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default SoftwareDetailPage;
