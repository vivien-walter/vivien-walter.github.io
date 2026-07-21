import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getResearchThemeRoute,
} from "@/app/routing/navigation";
import NotFoundPage from "@/routes/not-found/not-found-page";
import ContentSections from "@/shared/components/content-sections";
import DetailNavigation from "@/shared/components/detail-navigation";
import PageHero from "@/shared/components/page-hero";

import {
  getResearchPage,
  getResearchThemeById,
} from "./data/research-content.loader";

function ResearchThemeDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(
    location.pathname,
  );

  const page = getResearchPage(language);
  const theme = slug
    ? getResearchThemeById(language, slug)
    : undefined;

  if (!theme || !slug) {
    return <NotFoundPage />;
  }

  const themes = page.themes ?? [];
  const currentThemeIndex = themes.findIndex(
    (candidate) => candidate.id === slug,
  );

  const previousTheme =
    currentThemeIndex > 0
      ? themes[currentThemeIndex - 1]
      : undefined;

  const nextTheme =
    currentThemeIndex >= 0 &&
    currentThemeIndex < themes.length - 1
      ? themes[currentThemeIndex + 1]
      : undefined;

  return (
    <article
      className="overflow-hidden"
      aria-labelledby="page-title"
    >
      <PageHero
        breadcrumbs={{
          ariaLabel: t("breadcrumbs.label", {
            lng: language,
          }),
          items: [
            {
              label: t("breadcrumbs.home", {
                lng: language,
              }),
              to: getPageRoute("home", language),
            },
            {
              label: t("breadcrumbs.research", {
                lng: language,
              }),
              to: getPageRoute("research", language),
            },
            {
              label: theme.title,
            },
          ],
        }}
        eyebrow={t("researchThemeDetail.eyebrow", {
          lng: language,
        })}
        title={theme.title}
        introduction={theme.introduction}
        image={theme.image}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        ].join(" ")}
      >
        {theme.sections && theme.sections.length > 0 ? (
          <ContentSections
            idPrefix={`research-theme-${slug}`}
            sections={theme.sections}
          />
        ) : null}

        <DetailNavigation
          ariaLabel={t(
            "researchThemeDetail.navigationLabel",
            {
              lng: language,
            },
          )}
          backLink={{
            label: t("actions.backToResearch", {
              lng: language,
            }),
            to: getPageRoute("research", language),
          }}
          previousLabel={t(
            "actions.previousResearchTheme",
            {
              lng: language,
            },
          )}
          nextLabel={t(
            "actions.nextResearchTheme",
            {
              lng: language,
            },
          )}
          previousLink={
            previousTheme
              ? {
                  label: previousTheme.title,
                  to: getResearchThemeRoute(
                    previousTheme.id,
                    language,
                  ),
                }
              : undefined
          }
          nextLink={
            nextTheme
              ? {
                  label: nextTheme.title,
                  to: getResearchThemeRoute(
                    nextTheme.id,
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

export default ResearchThemeDetailPage;