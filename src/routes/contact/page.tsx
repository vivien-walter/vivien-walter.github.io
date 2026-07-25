import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname, getPageRoute } from '@/app/routing/navigation';
import PageHero from '@/components/page-hero';
import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { getContactContent } from '@/content/contact/contact';
import { cn } from '@/lib/utils';

import ContactAvailabilitySection from './_components/contact-availability-section';
import ContactMethodCard from './_components/contact-method-card';
import JobSearchBanner from './_components/job-search-banner';

function ContactPage() {
  const location = useLocation();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getContactContent(language);

  return (
    <div className="overflow-hidden">
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
            },
          ],
        }}
        eyebrow={page.title}
        title={page.title}
        introduction={page.introduction}
      />

      <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="contact-methods-title">
        <SectionHeader className="mb-8 sm:mb-10">
          <SectionTitle id="contact-methods-title">{page.methodsTitle}</SectionTitle>
        </SectionHeader>

        <ul className={cn('m-0 grid list-none gap-5 p-0', 'sm:grid-cols-2 lg:grid-cols-4')}>
          {page.links.map((method) => (
            <li key={method.id} className="m-0 min-w-0">
              <ContactMethodCard method={method} />
            </li>
          ))}
        </ul>
      </Section>

      <JobSearchBanner content={page.jobSearch} />

      <div className="max-w-editorial px-page mx-auto w-full">
        <ContactAvailabilitySection content={page.availability} />
      </div>
    </div>
  );
}

export default ContactPage;
