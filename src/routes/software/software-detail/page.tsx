import { useLocation, useParams } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import DetailHighlightsBand from '@/components/detail-highlights-band';
import { getSoftwareDetailById, getSoftwareDetailContent } from '@/content/software/detail/page';
import NotFoundPage from '@/routes/not-found/page';

import SoftwareDetailContent from './_components/software-detail-content';
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

  const hasDisclaimer = Boolean(software.disclaimer?.trim());
  const hasVisibleResources = software.resources?.some((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? false;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <SoftwareDetailHero language={language} software={software} />

      <DetailHighlightsBand ariaLabel={detail.highlightsLabel} items={software.highlights} />

      <div className="max-w-editorial px-page mx-auto w-full pt-12 pb-12 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16">
        <SoftwareDetailContent software={software} labels={detail} />

        <SoftwareDetailNavigation
          language={language}
          softwareId={software.id}
          labels={detail}
          showTopSeparator={!hasDisclaimer || hasVisibleResources}
        />
      </div>
    </article>
  );
}
