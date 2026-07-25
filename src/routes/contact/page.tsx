import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { getContactContent } from '@/content/contact/contact';
import { cn } from '@/lib/utils';

import ContactAvailabilitySection from './_components/availability-section';
import ContactHero from './_components/contact-hero';
import ContactMethodCard from './_components/contact-method-card';
import JobSearchBanner from './_components/job-search-banner';

export default function ContactPage() {
  /* Fetch all data for the translation */
  const location = useLocation();
  const language = getLanguageFromPathname(location.pathname);
  const content = getContactContent(language);

  return (
    <div className="overflow-hidden">
      <ContactHero language={language} />

      <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="contact-methods-title">
        <SectionHeader className="mb-8 sm:mb-10">
          <SectionTitle id="contact-methods-title">{content.methodsTitle}</SectionTitle>
        </SectionHeader>

        <ul className={cn('m-0 grid list-none gap-5 p-0', 'sm:grid-cols-2 lg:grid-cols-4')}>
          {content.links.map((method) => (
            <li key={method.id} className="m-0 min-w-0">
              <ContactMethodCard method={method} />
            </li>
          ))}
        </ul>
      </Section>

      <JobSearchBanner content={content.jobSearch} />

      <div className="max-w-editorial px-page mx-auto w-full">
        <ContactAvailabilitySection content={content.availability} />
      </div>
    </div>
  );
}
