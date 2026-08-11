import { getResearchPublicationRoute } from '@/app/routing/navigation';
import { getResearchPageContent } from '@/content/research/page';
import { getPublicationCollection } from '@/content/research/publications/catalog';
import { getResearchThemeCollection } from '@/content/research/themes/catalog';
import type { SupportedLanguage } from '@/types/localization';

import PublicationList from './publication-list';
import type { PublicationEntryItem } from './publication-list/publication-entry';

type ResearchPublication = ReturnType<typeof getPublicationCollection>[number];
type ResearchTheme = ReturnType<typeof getResearchThemeCollection>[number];

type ResearchPublicationsSectionProps = {
  readonly language: SupportedLanguage;
  readonly publications: readonly ResearchPublication[];
  readonly themes: readonly ResearchTheme[];
};

export default function ResearchPublicationsSection({ language, publications, themes }: ResearchPublicationsSectionProps) {
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
      description={page.sectionTitles.publications.description}
      titleId="research-publications-title"
      items={publicationItems}
      themes={themes.map((theme) => ({
        id: theme.id,
        title: theme.title,
      }))}
      language={language}
      labels={page.publications}
    />
  );
}
