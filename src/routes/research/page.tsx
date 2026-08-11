import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import PageDivider from '@/components/page-divider';
import { getResearchPageContent } from '@/content/research/page';
import { getPublicationCollection } from '@/content/research/publications/catalog';
import { getResearchThemeCollection } from '@/content/research/themes/catalog';

import ResearchActivitiesSection from './_components/research-activities-section';
import ResearchHero from './_components/research-hero';
import ResearchPublicationsSection from './_components/research-publications-section';
import ResearchThemesSection from './_components/research-themes-section';

export default function ResearchPage() {
  const location = useLocation();
  const language = getLanguageFromPathname(location.pathname);

  const page = getResearchPageContent(language);
  const themes = getResearchThemeCollection(language);
  const publications = getPublicationCollection(language);

  return (
    <div className="overflow-hidden">
      <ResearchHero language={language} />

      <ResearchThemesSection
        title={page.sectionTitles.themes.title}
        description={page.sectionTitles.themes.description}
        themes={themes}
        language={language}
        viewMoreLabel={page.publications.actions.viewMore}
      />

      {publications.length > 0 ? <PageDivider /> : null}

      <ResearchPublicationsSection language={language} publications={publications} themes={themes} />

      {page.resources.length > 0 ? <PageDivider /> : null}

      <ResearchActivitiesSection title={page.sectionTitles.activities} resources={page.resources} />
    </div>
  );
}
