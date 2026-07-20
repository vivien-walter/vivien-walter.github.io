import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getParallelActivityRoute,
} from "@/app/routing/navigation";
import NotFoundPage from "@/routes/not-found/not-found-page";
import ContentSections from "@/shared/components/content-sections";
import DetailNavigation from "@/shared/components/detail-navigation";
import PageHero from "@/shared/components/page-hero";

import {
  getAdjacentParallelActivityIds,
  getParallelActivityById,
} from "./data/experience-content.loader";

function ParallelActivityDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);

  const activity = slug
    ? getParallelActivityById(language, slug)
    : undefined;

  if (!activity || !slug) {
    return <NotFoundPage />;
  }

  const { previousId, nextId } =
    getAdjacentParallelActivityIds(language, slug);

  const previousActivity = previousId
    ? getParallelActivityById(language, previousId)
    : undefined;

  const nextActivity = nextId
    ? getParallelActivityById(language, nextId)
    : undefined;

  return (
    <article
      className="overflow-hidden"
      aria-labelledby="page-title"
    >
      <PageHero
        breadcrumbs={{
          ariaLabel: t("breadcrumbs.label", { lng: language }),
          items: [
            {
              label: t("breadcrumbs.home", { lng: language }),
              to: getPageRoute("home", language),
            },
            {
              label: t("breadcrumbs.experience", {
                lng: language,
              }),
              to: getPageRoute("experience", language),
            },
            {
              label: activity.title,
            },
          ],
        }}
        eyebrow={t("parallelActivityDetail.eyebrow", {
          lng: language,
        })}
        title={activity.title}
        introduction={activity.summary}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        ].join(" ")}
      >
        <ContentSections
          idPrefix={`parallel-activity-${slug}`}
          sections={activity.sections}
        />

        <DetailNavigation
          ariaLabel={t(
            "parallelActivityDetail.navigationLabel",
            {
              lng: language,
            },
          )}
          backLink={{
            label: t("actions.backToExperience", {
              lng: language,
            }),
            to: getPageRoute("experience", language),
          }}
          previousLabel={t(
            "actions.previousParallelActivity",
            {
              lng: language,
            },
          )}
          nextLabel={t("actions.nextParallelActivity", {
            lng: language,
          })}
          previousLink={
            previousId && previousActivity
              ? {
                  label: previousActivity.title,
                  to: getParallelActivityRoute(
                    previousId,
                    language,
                  ),
                }
              : undefined
          }
          nextLink={
            nextId && nextActivity
              ? {
                  label: nextActivity.title,
                  to: getParallelActivityRoute(
                    nextId,
                    language,
                  ),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ParallelActivityDetailPage;