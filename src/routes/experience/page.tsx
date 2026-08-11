import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import PageDivider from '@/components/page-divider';
import { showJobSearchContent } from '@/config/feature-flags';
import { getEducationCollection, getPersonalActivityCollection } from '@/content/experience/catalog';
import { getExperiencePage } from '@/content/experience/page';

import ContactBanner from './_components/contact-banner';
import EducationSection from './_components/education-section';
import ExperienceHero from './_components/experience-hero';
import ExpertiseBanner from './_components/expertise-banner';
import PersonalActivitiesSection from './_components/personal-activities-section';
import TimelineSection from './_components/timeline-section';

export default function ExperiencePage() {
  const location = useLocation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getExperiencePage(language);
  const education = getEducationCollection(language);
  const personalActivities = getPersonalActivityCollection(language);

  return (
    <div className="overflow-hidden">
      <ExperienceHero language={language} page={page} />

      {page.expertise.length > 0 ? <ExpertiseBanner items={page.expertise} /> : null}

      <TimelineSection language={language} page={page} />

      {education.length > 0 ? <PageDivider className="bg-brand-primary/15" /> : null}

      <EducationSection title={page.sectionTitles.education} description={page.sectionDescriptions.education} items={education} />

      {showJobSearchContent ? <ContactBanner content={page.contactBanner} language={language} /> : null}

      {personalActivities.length > 0 ? <PageDivider /> : null}

      <PersonalActivitiesSection
        title={page.sectionTitles.personalActivities}
        description={page.sectionDescriptions.personalActivities}
        items={personalActivities}
      />
    </div>
  );
}
