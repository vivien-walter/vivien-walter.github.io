import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import { showJobSearchContent } from '@/config/feature-flags';
import { getSiteContent } from '@/content/common/site';
import { getContactContent } from '@/content/contact/contact';

import AvailabilitySection from './_components/availability-section';
import ContactHero from './_components/contact-hero';
import ContactMethodsSection from './_components/contact-methods-section';
import JobSearchBanner from './_components/job-search-banner';

export default function ContactPage() {
  /* Fetch all data for the translation */
  const location = useLocation();
  const language = getLanguageFromPathname(location.pathname);
  const content = getContactContent(language);
  const siteContent = getSiteContent(language);

  return (
    <>
      <ContactHero content={content} language={language} breadcrumbs={siteContent.breadcrumbs} />

      <ContactMethodsSection title={content.methodsTitle} methods={content.links} externalLinkLabel={siteContent.accessibility.externalLinkNewTab} />

      {showJobSearchContent ? (
        <>
          <JobSearchBanner content={content.jobSearch} />

          <AvailabilitySection content={content.availability} />
        </>
      ) : null}
    </>
  );
}
