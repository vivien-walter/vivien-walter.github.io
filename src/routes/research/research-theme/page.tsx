import { useLocation, useParams } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import DetailHighlightsBand from '@/components/detail-highlights-band';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import PageDivider from '@/components/page-divider';
import { getPublicationsByThemeId } from '@/content/research/publications/catalog';
import { getResearchThemeDetailById, getResearchThemePageContent } from '@/content/research/themes/page';
import NotFoundPage from '@/routes/not-found/page';

import ResearchThemeHero from './_components/research-theme-hero';
import ResearchThemeDetailNavigation from './_components/research-theme-navigation';
import ResearchThemePublicationsSection from './_components/research-theme-publications-section';

export default function ResearchThemePage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const language = getLanguageFromPathname(location.pathname);

  const detail = getResearchThemePageContent(language);
  const theme = slug ? getResearchThemeDetailById(language, slug) : undefined;

  if (!theme) {
    return <NotFoundPage />;
  }

  const publications = getPublicationsByThemeId(language, theme.id);

  const idPrefix = `research-theme-${theme.id}`;

  const hasTechnologies = theme.technologyGroups?.some((group) => group.items.length > 0) ?? false;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <ResearchThemeHero language={language} theme={theme} />

      <DetailHighlightsBand ariaLabel={detail.highlightsLabel} items={theme.highlights} />

      <DetailDescriptionSection contained idPrefix={idPrefix} title={detail.description} description={theme.description} />

      {hasTechnologies ? <PageDivider /> : null}

      <DetailTechnologiesSection
        contained
        idPrefix={idPrefix}
        title={detail.technologies}
        externalLinkLabel={detail.externalLinkLabel}
        groups={theme.technologyGroups}
      />

      {publications.length > 0 ? <PageDivider /> : null}

      <ResearchThemePublicationsSection language={language} publications={publications} themeId={theme.id} />

      <PageDivider className="mt-4 sm:mt-6" />

      <ResearchThemeDetailNavigation language={language} themeId={theme.id} labels={detail} />
    </article>
  );
}
