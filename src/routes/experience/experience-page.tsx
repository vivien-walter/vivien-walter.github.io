import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import PageHero from "@/shared/components/page-hero";
import SectionHeader from "@/shared/components/section-header";

import ExperienceExpertiseBand from "./components/experience-expertise-band";
import ParallelActivitiesSection from "./components/parallel-activities-section";
import PersonalActivitiesSection from "./components/personal-activities-section";
import TimelineEntry from "./components/timeline-entry";
import {
  getExperienceById,
  getExperienceIndex,
  getExperiencePage,
  getParallelActivities,
  getPersonalActivities,
} from "./data/experience-content.loader";

function ExperiencePage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getExperiencePage(language);
  const index = getExperienceIndex(language);
  const parallelActivitiesContent = getParallelActivities(language);
  const personalActivitiesContent = getPersonalActivities(language);

  const experiences = index.order.flatMap((experienceId) => {
    const experience = getExperienceById(language, experienceId);

    return experience ? [{ experience, experienceId }] : [];
  });

  const parallelActivities = parallelActivitiesContent.order.map(
    (activityId) => ({
      activityId,
      activity: parallelActivitiesContent.entries[activityId],
    }),
  );

  const personalActivities = personalActivitiesContent.order.map(
    (activityId) => ({
      activityId,
      activity: personalActivitiesContent.entries[activityId],
    }),
  );

  return (
    <div className="overflow-hidden">
      <PageHero
        breadcrumbs={{
          ariaLabel: t("breadcrumbs.label", { lng: language }),
          items: [
            {
              label: t("breadcrumbs.home", { lng: language }),
              to: getPageRoute("home", language),
            },
            {
              label: t("pages.experience.title", { lng: language }),
            },
          ],
        }}
        eyebrow={page.eyebrow}
        title={page.title}
        introduction={page.introduction}
      />

      {page.expertise.length > 0 ? (
        <ExperienceExpertiseBand items={page.expertise} />
      ) : null}

      <div className="mx-auto w-full max-w-editorial px-page">
        {experiences.length > 0 ? (
          <section
            className="py-12 sm:py-14 lg:py-16"
            aria-labelledby="experience-list-title"
          >
            <SectionHeader
              title={page.timelineTitle}
              titleId="experience-list-title"
              className="mb-10 sm:mb-12"
            />

            <div>
              {experiences.map(
                ({ experience, experienceId }, index) => (
                  <TimelineEntry
                    key={experienceId}
                    experience={experience}
                    experienceId={experienceId}
                    language={language}
                    isFirst={index === 0}
                    isLast={index === experiences.length - 1}
                  />
                ),
              )}
            </div>
          </section>
        ) : null}

        <ParallelActivitiesSection
          title={page.parallelActivitiesTitle}
          items={parallelActivities}
          language={language}
          actionLabel={t("actions.learnMore", { lng: language })}
        />

        <PersonalActivitiesSection
          title={page.personalActivitiesTitle}
          items={personalActivities}
        />
      </div>
    </div>
  );
}

export default ExperiencePage;