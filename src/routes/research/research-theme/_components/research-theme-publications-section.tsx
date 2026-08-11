import { getResearchPublicationRoute } from '@/app/routing/navigation';
import { getResearchPageContent } from '@/content/research/page';
import { getPublicationsByThemeId } from '@/content/research/publications/catalog';
import type { ResearchThemeId } from '@/content/research/registry';
import type { SupportedLanguage } from '@/types/localization';

import PublicationList from '../../_components/publication-list';
import type { PublicationEntryItem } from '../../_components/publication-list/publication-entry';

type ResearchPublication = ReturnType<typeof getPublicationsByThemeId>[number];

type ResearchThemePublicationsSectionProps = {
  readonly language: SupportedLanguage;
  readonly publications: readonly ResearchPublication[];
  readonly themeId: ResearchThemeId;
};

export default function ResearchThemePublicationsSection({ language, publications, themeId }: ResearchThemePublicationsSectionProps) {
  const page = getResearchPageContent(language);

  const publicationItems: readonly PublicationEntryItem[] = publications.map((publication) => ({
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

  if (publicationItems.length === 0) {
    return null;
  }

  return (
    <PublicationList
      contained
      title={page.sectionTitles.publications.title}
      titleId={`research-theme-${themeId}-publications-title`}
      items={publicationItems}
      language={language}
      labels={page.publications}
      showThemeFilter={false}
    />
  );
}
