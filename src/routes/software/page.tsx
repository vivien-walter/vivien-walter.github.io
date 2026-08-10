import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import PageDivider from '@/components/page-divider';
import { getSoftwareContent } from '@/content/software/page';

import FeaturedSection from './_components/featured-section';
import FollowActivitiesSection from './_components/follow-activities-section';
import SoftwareCatalogSection from './_components/software-catalog-section';
import SoftwareHero from './_components/software-hero';

function SoftwarePage() {
  /* Fetch all data for the translation */
  const location = useLocation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getSoftwareContent(language);

  return (
    <div className="overflow-hidden">
      <SoftwareHero language={language} />

      <FeaturedSection language={language} />

      <PageDivider />

      <SoftwareCatalogSection
        language={language}
        content={{
          catalog: page.catalog,
        }}
      />

      {page.resources.length > 0 ? <PageDivider /> : null}

      <FollowActivitiesSection
        content={{
          followActivities: page.followActivities,
          resources: page.resources,
        }}
      />
    </div>
  );
}

export default SoftwarePage;
