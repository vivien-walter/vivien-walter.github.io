import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import { getProjectsPage } from '@/content/projects/page';

import ProjectsCatalogSection from './_components/projects-catalog-section';
import ProjectsHero from './_components/projects-hero';

export default function ProjectsPage() {
  const location = useLocation();

  const language = getLanguageFromPathname(location.pathname);
  const page = getProjectsPage(language);

  return (
    <div className="overflow-hidden">
      <ProjectsHero language={language} page={page} />

      <ProjectsCatalogSection language={language} catalog={page.catalog} />
    </div>
  );
}
