import { useState } from 'react';

import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Switch } from '@/components/ui/switch';
import { getExperienceCollection } from '@/content/experience/catalog';
import type { ExperiencePageContent } from '@/content/experience/page';
import { getProjectsByExperienceId } from '@/content/projects/catalog';
import type { SupportedLanguage } from '@/types/localization';

import TimelineEntry from './timeline-entry';

type ExperienceTimelineSectionProps = {
  readonly language: SupportedLanguage;
  readonly page: ExperiencePageContent;
};

export default function ExperienceTimelineSection({ language, page }: ExperienceTimelineSectionProps) {
  const [showParallelActivities, setShowParallelActivities] = useState(true);

  const experiences = getExperienceCollection(language);

  const timelineExperiences = experiences.map((experience) => ({
    ...experience,
    relatedProjects: getProjectsByExperienceId(language, experience.id).map((project) => ({
      id: project.id,
      title: project.title,
    })),
  }));

  if (timelineExperiences.length === 0) {
    return null;
  }

  const hasParallelActivities = timelineExperiences.some((experience) => experience.parallelActivity);

  const visibleTimelineExperiences = showParallelActivities
    ? timelineExperiences
    : timelineExperiences.filter((experience) => !experience.parallelActivity);

  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="experience-list-title">
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
  );
}
