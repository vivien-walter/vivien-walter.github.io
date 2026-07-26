import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
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

      <div className="max-w-editorial px-page mx-auto w-full">
        <SoftwareCatalogSection
          language={language}
          content={{
            catalog: page.catalog,
            kindLabels: page.kindLabels,
          }}
        />

        <FollowActivitiesSection
          content={{
            followActivities: page.followActivities,
            resources: page.resources,
          }}
        />
      </div>
    </div>
  );
}

export default SoftwarePage;
