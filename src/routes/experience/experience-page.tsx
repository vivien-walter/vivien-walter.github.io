import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import ContentSections from "@/shared/components/content-sections";
import PageHero from "@/shared/components/page-hero";

import TimelineEntry from "./components/timeline-entry";
import {
  getExperienceById,
  getExperienceIndex,
  getExperiencePage,
} from "./data/experience-content.loader";

function ExperiencePage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getExperiencePage(language);
  const index = getExperienceIndex(language);

  const experiences = index.order.flatMap((experienceId) => {
    const experience = getExperienceById(language, experienceId);

    return experience ? [{ experience, experienceId }] : [];
  });

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
        eyebrow={t("pages.experience.title", { lng: language })}
        title={page.title}
        introduction={page.introduction}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        ].join(" ")}
      >
        <ContentSections
          idPrefix="experience-page"
          sections={page.sections ?? []}
        />

        {experiences.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="experience-list-title"
          >
            <header className="mb-8 max-w-readable">
              <h2
                id="experience-list-title"
                className={[
                  "!m-0 text-xl font-bold leading-heading",
                  "tracking-[-0.025em] text-heading",
                ].join(" ")}
              >
                {t("pages.experience.title", { lng: language })}
              </h2>
            </header>

            <div className="grid gap-6">
              {experiences.map(({ experience, experienceId }) => (
                <TimelineEntry
                  key={experienceId}
                  experience={experience}
                  experienceId={experienceId}
                  language={language}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default ExperiencePage;