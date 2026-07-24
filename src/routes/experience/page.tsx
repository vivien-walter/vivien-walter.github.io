import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import PageHero from "@/components/page-hero";
import SectionHeader from "@/components/section-header";
import {
  getExperienceCollection,
  getExperiencePage,
  getParallelActivityCollection,
} from "@/content/experience/page";
import { getProjectsByExperienceId } from "@/content/projects/page";

import ExperienceExpertiseBand from "./_components/experience-expertise-band";
import ParallelActivitiesSection from "./_components/parallel-activities-section";
import PersonalActivitiesSection from "./_components/personal-activities-section";
import TimelineEntry from "./_components/timeline-entry";

function ExperiencePage() {
  const location = useLocation();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const page = getExperiencePage(language);

  const experiences =
    getExperienceCollection(language);

  const parallelActivities =
    getParallelActivityCollection(language);

  const timelineExperiences = experiences.map(
    (experience) => ({
      ...experience,
      relatedProjects:
        getProjectsByExperienceId(
          language,
          experience.id,
        ).map((project) => ({
          id: project.id,
          title: project.title,
        })),
    }),
  );

  return (
    <div className="overflow-hidden">
      <PageHero
        breadcrumbs={{
          ariaLabel: t(
            "breadcrumbs.label",
            {
              lng: language,
            },
          ),
          items: [
            {
              label: t(
                "breadcrumbs.home",
                {
                  lng: language,
                },
              ),
              to: getPageRoute(
                "home",
                language,
              ),
            },
            {
              label: t(
                "pages.experience.title",
                {
                  lng: language,
                },
              ),
            },
          ],
        }}
        eyebrow={page.eyebrow}
        title={page.title}
        introduction={page.introduction}
      />

      {page.expertise.length > 0 ? (
        <ExperienceExpertiseBand
          items={page.expertise}
        />
      ) : null}

      <div className="mx-auto w-full max-w-editorial px-page">
        {timelineExperiences.length > 0 ? (
          <section
            className="py-12 sm:py-14 lg:py-16"
            aria-labelledby="experience-list-title"
          >
            <SectionHeader
              title={
                page.sectionTitles.timeline
              }
              titleId="experience-list-title"
              className="mb-10 sm:mb-12"
            />

            <div>
              {timelineExperiences.map(
                (experience, index) => (
                  <TimelineEntry
                    key={experience.id}
                    experience={experience}
                    language={language}
                    viewExperienceLabel={
                      page.actions
                        .viewExperience
                    }
                    relatedProjectsLabel={
                      page.actions
                        .relatedProjects
                    }
                    isFirst={index === 0}
                    isLast={
                      index ===
                      timelineExperiences.length -
                        1
                    }
                  />
                ),
              )}
            </div>
          </section>
        ) : null}

        <ParallelActivitiesSection
          title={
            page.sectionTitles
              .parallelActivities
          }
          items={parallelActivities}
          language={language}
          actionLabel={
            page.actions.learnMore
          }
        />

        <PersonalActivitiesSection
          title={
            page.sectionTitles
              .personalActivities
          }
          items={page.personalActivities}
        />
      </div>
    </div>
  );
}

export default ExperiencePage;