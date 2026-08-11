import { useLocation, useParams } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import DetailHighlightsBand from '@/components/detail-highlights-band';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import PageDivider from '@/components/page-divider';
import { getSoftwareDetailById, getSoftwareDetailContent } from '@/content/software/detail/page';
import NotFoundPage from '@/routes/not-found/page';

import DisclaimerBanner from './_components/disclaimer-banner';
import ResourcesSection from './_components/resources-section';
import SoftwareDetailHero from './_components/software-detail-hero';
import SoftwareDetailNavigation from './_components/software-detail-navigation';

export default function SoftwareDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const language = getLanguageFromPathname(location.pathname);

  const detail = getSoftwareDetailContent(language);

  const software = slug ? getSoftwareDetailById(language, slug) : undefined;

  if (!software) {
    return <NotFoundPage />;
  }

  const idPrefix = `software-${software.id}`;

  const hasTechnologies = software.technologyGroups?.some((group) => group.items.length > 0) ?? false;

  const hasDisclaimer = Boolean(software.disclaimer?.trim());

  const hasVisibleResources = software.resources?.some((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? false;

  const hasNavigationSeparator = !hasDisclaimer || hasVisibleResources;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <SoftwareDetailHero language={language} software={software} />

      <DetailHighlightsBand ariaLabel={detail.highlightsLabel} items={software.highlights} />

      <DetailDescriptionSection contained description={software.description} idPrefix={idPrefix} title={detail.descriptionTitle} />

      {hasTechnologies ? <PageDivider /> : null}

      <DetailTechnologiesSection
        contained
        description={detail.technologiesDescription}
        externalLinkLabel={detail.externalLinkLabel}
        groups={software.technologyGroups}
        idPrefix={idPrefix}
        title={detail.technologiesTitle}
      />

      <DisclaimerBanner text={software.disclaimer} />

      {!hasDisclaimer && hasVisibleResources ? <PageDivider /> : null}

      <ResourcesSection
        description={detail.resourcesDescription}
        resources={software.resources}
        title={detail.resourcesTitle}
        titleId={`${idPrefix}-resources-title`}
      />

      {hasNavigationSeparator ? <PageDivider /> : null}

      <SoftwareDetailNavigation language={language} softwareId={software.id} labels={detail} hasNavigationSeparator={hasNavigationSeparator} />
    </article>
  );
}
