import { useTranslation } from "react-i18next";
import {
  useLocation,
  useParams,
} from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getResearchPublicationRoute,
  getResearchThemeRoute,
} from "@/app/routing/navigation";
import DetailDescriptionSection from "@/components/detail-description-section";
import DetailHighlightsBand from "@/components/detail-highlights-band";
import DetailNavigation from "@/components/detail-navigation";
import DetailTechnologiesSection from "@/components/detail-technologies-section";
import PageHero from "@/components/page-hero";
import {
  getPublicationsByThemeId,
  getResearchPage,
  getResearchThemeById,
  getResearchThemeCollection,
  getResearchThemeNavigation,
} from "@/content/research/page";
import NotFoundPage from "@/routes/not-found/page";

import type { PublicationEntryItem } from "../_components/publication-entry";
import PublicationList from "../_components/publication-list";

function ResearchThemeDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const page = getResearchPage(language);

  const theme = slug
    ? getResearchThemeById(
        language,
        slug,
      )
    : undefined;

  if (!theme) {
    return <NotFoundPage />;
  }

  const themes =
    getResearchThemeCollection(language);

  const publications:
    readonly PublicationEntryItem[] =
    getPublicationsByThemeId(
      language,
      theme.id,
    ).map((publication) => ({
      id: publication.id,
      kind: publication.kind,
      title: publication.title,
      authors: publication.authors,
      publication:
        publication.publication,
      year: publication.year,
      themeIds: publication.themeIds,
      detailsPath:
        getResearchPublicationRoute(
          publication.id,
          language,
        ),
      doi: publication.doi,
    }));

  const {
    previous: previousTheme,
    next: nextTheme,
  } = getResearchThemeNavigation(
    language,
    theme.id,
  );

  const idPrefix =
    `research-theme-${theme.id}`;

  return (
    <article
      className="overflow-hidden"
      aria-labelledby="page-title"
    >
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
              label: page.title,
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
        eyebrow={
          page.themeDetail.eyebrow
        }
        title={theme.title}
        introduction={
          theme.introduction
        }
      />

      <DetailHighlightsBand
        ariaLabel={
          page.themeDetail
            .highlightsLabel
        }
        items={theme.highlights}
      />

      <div
        className={[
          "mx-auto w-full",
          "max-w-editorial px-page",
          "pt-12 pb-12",
          "sm:pt-14 sm:pb-14",
          "lg:pt-16 lg:pb-16",
        ].join(" ")}
      >
        <DetailDescriptionSection
          idPrefix={idPrefix}
          title={
            page.themeDetail.description
          }
          description={
            theme.description
          }
        />

        <DetailTechnologiesSection
          idPrefix={idPrefix}
          title={
            page.themeDetail.technologies
          }
          externalLinkLabel={
            page.themeDetail
              .externalLinkLabel
          }
          groups={
            theme.technologyGroups
          }
        />

        {publications.length > 0 ? (
          <PublicationList
            title={
              page.sectionTitles
                .publications
            }
            titleId={`${idPrefix}-publications-title`}
            items={publications}
            themes={themes.map(
              (candidate) => ({
                id: candidate.id,
                title: candidate.title,
              }),
            )}
            language={language}
            labels={page.publications}
            showThemeFilter={false}
          />
        ) : null}

        <DetailNavigation
          ariaLabel={
            page.themeDetail
              .navigationLabel
          }
          backLink={{
            label:
              page.themeDetail.backLabel,
            to: getPageRoute(
              "research",
              language,
            ),
          }}
          previousLabel={
            page.themeDetail
              .previousLabel
          }
          nextLabel={
            page.themeDetail.nextLabel
          }
          previousLink={
            previousTheme
              ? {
                  label:
                    previousTheme.title,
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
                  label:
                    nextTheme.title,
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