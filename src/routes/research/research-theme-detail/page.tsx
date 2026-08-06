import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import { getLanguageFromPathname, getPageRoute, getResearchPublicationRoute, getResearchThemeRoute } from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import DetailHighlightsBand from '@/components/detail-highlights-band';
import DetailNavigation from '@/components/detail-navigation';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import PageHero from '@/components/page-hero';
import { getResearchPageContent } from '@/content/research/page';
import { getPublicationsByThemeId } from '@/content/research/publications/catalog';
import { getResearchThemeCollection } from '@/content/research/themes/catalog';
import { getResearchThemeDetailById, getResearchThemeNavigation, getResearchThemePageContent } from '@/content/research/themes/page';
import NotFoundPage from '@/routes/not-found/page';

import type { PublicationEntryItem } from '../_components/publication-entry';
import PublicationList from '../_components/publication-list';

function ResearchThemeDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getResearchPageContent(language);

  const detail = getResearchThemePageContent(language);

  const theme = slug ? getResearchThemeDetailById(language, slug) : undefined;

  if (!theme) {
    return <NotFoundPage />;
  }

  const themes = getResearchThemeCollection(language);

  const publications: readonly PublicationEntryItem[] = getPublicationsByThemeId(language, theme.id).map((publication) => ({
    id: publication.id,
    kind: publication.kind,
    title: publication.title,
    authors: publication.authors,
    ...(publication.publication
      ? {
          publication: publication.publication,
        }
      : {}),
    year: publication.year,
    themeIds: publication.themeIds,
    detailsPath: getResearchPublicationRoute(publication.id, language),
    doi: publication.doi,
  }));

  const { previous: previousTheme, next: nextTheme } = getResearchThemeNavigation(language, theme.id);

  const idPrefix = `research-theme-${theme.id}`;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <PageHero
        breadcrumbs={{
          ariaLabel: t('breadcrumbs.label', {
            lng: language,
          }),
          items: [
            {
              label: t('breadcrumbs.home', {
                lng: language,
              }),
              to: getPageRoute('home', language),
            },
            {
              label: page.breadcrumbLabel,
              to: getPageRoute('research', language),
            },
            {
              label: theme.breadcrumbLabel,
            },
          ],
        }}
        eyebrow={theme.eyebrow ?? detail.eyebrow}
        title={theme.title}
        introduction={theme.introduction}
        image={theme.heroImage}
      />

      <DetailHighlightsBand ariaLabel={detail.highlightsLabel} items={theme.highlights} />

      <div className={['mx-auto w-full', 'max-w-editorial px-page', 'pt-12 pb-12', 'sm:pt-14 sm:pb-14', 'lg:pt-16 lg:pb-16'].join(' ')}>
        <DetailDescriptionSection idPrefix={idPrefix} title={detail.description} description={theme.description} />

        <DetailTechnologiesSection
          idPrefix={idPrefix}
          title={detail.technologies}
          externalLinkLabel={detail.externalLinkLabel}
          groups={theme.technologyGroups}
        />

        {publications.length > 0 ? (
          <PublicationList
            title={page.sectionTitles.publications}
            titleId={`${idPrefix}-publications-title`}
            items={publications}
            themes={themes.map((candidate) => ({
              id: candidate.id,
              title: candidate.title,
            }))}
            language={language}
            labels={page.publications}
            showThemeFilter={false}
          />
        ) : null}

        <DetailNavigation
          className="mt-4 sm:mt-6"
          ariaLabel={detail.navigationLabel}
          backLink={{
            label: detail.backLabel,
            to: getPageRoute('research', language),
          }}
          previousLabel={detail.previousLabel}
          nextLabel={detail.nextLabel}
          previousLink={
            previousTheme
              ? {
                  label: previousTheme.title,
                  to: getResearchThemeRoute(previousTheme.id, language),
                }
              : undefined
          }
          nextLink={
            nextTheme
              ? {
                  label: nextTheme.title,
                  to: getResearchThemeRoute(nextTheme.id, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ResearchThemeDetailPage;
