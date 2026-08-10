import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname, getPageRoute } from '@/app/routing/navigation';
import heroImageSrc from '@/assets/images/experiences/hero.jpg';
import {
  Hero,
  HeroBreadcrumbs,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroHeader,
  HeroImage,
  HeroMedia,
  HeroTitle,
} from '@/components/hero';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { getEducationCollection, getExperienceCollection, getPersonalActivityCollection } from '@/content/experience/catalog';
import { getExperiencePage } from '@/content/experience/page';
import { getProjectsByExperienceId } from '@/content/projects/catalog';

import EducationSection from './_components/education-section';
import ExperienceContactBanner from './_components/experience-contact-banner';
import ExperienceExpertiseBand from './_components/experience-expertise-band';
import PersonalActivitiesSection from './_components/personal-activities-section';
import TimelineEntry from './_components/timeline-entry';

function ExperiencePage() {
  const location = useLocation();
  const { t } = useTranslation();

  const [showParallelActivities, setShowParallelActivities] = useState(true);

  const language = getLanguageFromPathname(location.pathname);

  const page = getExperiencePage(language);

  const experiences = getExperienceCollection(language);

  const education = getEducationCollection(language);

  const personalActivities = getPersonalActivityCollection(language);

  const timelineExperiences = experiences.map((experience) => ({
    ...experience,
    relatedProjects: getProjectsByExperienceId(language, experience.id).map((project) => ({
      id: project.id,
      title: project.title,
    })),
  }));

  const hasParallelActivities = timelineExperiences.some((experience) => experience.parallelActivity);

  const visibleTimelineExperiences = showParallelActivities
    ? timelineExperiences
    : timelineExperiences.filter((experience) => !experience.parallelActivity);

  return (
    <div className="overflow-hidden">
      <Hero aria-labelledby="page-title">
        <HeroContainer>
          <HeroContent>
            <HeroBreadcrumbs
              ariaLabel={t('breadcrumbs.label', {
                lng: language,
              })}
              items={[
                {
                  label: t('breadcrumbs.home', {
                    lng: language,
                  }),
                  to: getPageRoute('home', language),
                },
                {
                  label: t('pages.experience.title', {
                    lng: language,
                  }),
                },
              ]}
            />

            <HeroHeader className="mt-4 sm:mt-5">
              <HeroEyebrow>{page.eyebrow}</HeroEyebrow>

              <HeroTitle id="page-title">{page.title}</HeroTitle>

              <HeroDescription>
                <p className="!m-0">{page.introduction}</p>
              </HeroDescription>
            </HeroHeader>
          </HeroContent>
          <HeroMedia>
            <HeroImage src={heroImageSrc} alt="" />
          </HeroMedia>
        </HeroContainer>
      </Hero>

      {page.expertise.length > 0 ? <ExperienceExpertiseBand items={page.expertise} /> : null}

      <div className="max-w-editorial px-page mx-auto w-full">
        {timelineExperiences.length > 0 ? (
          <Section contained={false} className="py-12 sm:py-14 lg:py-16" aria-labelledby="experience-list-title">
            <SectionHeader className="mb-10 sm:mb-12">
              <SectionTitle id="experience-list-title">{page.sectionTitles.timeline}</SectionTitle>

              <SectionDescription>{page.sectionDescriptions.timeline}</SectionDescription>
            </SectionHeader>

            {hasParallelActivities ? (
              <div className="mb-8 flex items-center justify-end gap-3 sm:mb-10">
                <label htmlFor="show-parallel-activities" className="text-muted-foreground cursor-pointer text-sm font-medium">
                  {page.timelineControls.showParallelActivities}
                </label>

                <Switch
                  id="show-parallel-activities"
                  checked={showParallelActivities}
                  onCheckedChange={setShowParallelActivities}
                  aria-label={page.timelineControls.showParallelActivities}
                />
              </div>
            ) : null}

            <div>
              {visibleTimelineExperiences.map((experience, index) => (
                <TimelineEntry
                  key={experience.id}
                  experience={experience}
                  language={language}
                  viewExperienceLabel={page.actions.viewExperience}
                  relatedProjectsLabel={page.actions.relatedProjects}
                  parallelActivityLabel={page.timelineControls.parallelActivityLabel}
                  isFirst={index === 0}
                  isLast={index === visibleTimelineExperiences.length - 1}
                />
              ))}
            </div>
          </Section>
        ) : null}

        {education.length > 0 ? <Separator className="bg-brand-primary/15" /> : null}

        <EducationSection title={page.sectionTitles.education} description={page.sectionDescriptions.education} items={education} />
      </div>

      <ExperienceContactBanner content={page.contactBanner} language={language} />

      <div className="max-w-editorial px-page mx-auto w-full">
        {personalActivities.length > 0 ? <Separator /> : null}

        <PersonalActivitiesSection
          title={page.sectionTitles.personalActivities}
          description={page.sectionDescriptions.personalActivities}
          items={personalActivities}
        />
      </div>
    </div>
  );
}

export default ExperiencePage;
