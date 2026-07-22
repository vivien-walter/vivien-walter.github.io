import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getResearchPublicationRoute,
  getResearchThemeRoute,
} from "@/app/routing/navigation";
import NotFoundPage from "@/routes/not-found/not-found-page";
import DetailDescriptionSection from "@/shared/components/detail-description-section";
import DetailHighlightsBand from "@/shared/components/detail-highlights-band";
import DetailNavigation from "@/shared/components/detail-navigation";
import DetailTechnologiesSection from "@/shared/components/detail-technologies-section";
import PageHero from "@/shared/components/page-hero";

import PublicationTable from "./components/publication-table";
import {
  getPublicationsByThemeId,
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

  const publications = getPublicationsByThemeId(
    language,
    slug,
  ).map(({ publication, publicationId }) => ({
    publication,
    publicationId,
    detailsPath: getResearchPublicationRoute(
      publicationId,
      language,
    ),
  }));

  const idPrefix = `research-theme-${slug}`;

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
              to: getPageRoute(
                "research",
                language,
              ),
            },
            {
              label: theme.title,
            },
          ],
        }}
        eyebrow={t(
          "researchThemeDetail.eyebrow",
          {
            lng: language,
          },
        )}
        title={theme.title}
        introduction={theme.introduction}
      />

      <DetailHighlightsBand
        ariaLabel={t(
          "researchThemeDetail.highlightsLabel",
          {
            lng: language,
          },
        )}
        items={theme.highlights}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "pt-12 pb-12",
          "sm:pt-14 sm:pb-14",
          "lg:pt-16 lg:pb-16",
        ].join(" ")}
      >
        <DetailDescriptionSection
          description={theme.description}
          idPrefix={idPrefix}
          title={t(
            "researchThemeDetail.description",
            {
              lng: language,
            },
          )}
        />

        <DetailTechnologiesSection
          externalLinkLabel={t(
            "researchThemeDetail.externalLinkLabel",
            {
              lng: language,
            },
          )}
          groups={theme.technologyGroups}
          idPrefix={idPrefix}
          title={t(
            "researchThemeDetail.technologies",
            {
              lng: language,
            },
          )}
        />

        {publications.length > 0 ? (
          <PublicationTable
            items={publications}
            themes={themes}
            language={language}
            showThemeFilter={false}
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
            label: t(
              "actions.backToResearch",
              {
                lng: language,
              },
            ),
            to: getPageRoute(
              "research",
              language,
            ),
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