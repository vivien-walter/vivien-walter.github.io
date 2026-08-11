import { useMemo, useState } from 'react';

import { Section } from '@/components/section';
import { getProjectCollection } from '@/content/projects/catalog';
import type { ProjectsPageContent } from '@/content/projects/page';
import type { SupportedLanguage } from '@/types/localization';

import Header from './header';
import {
  buildLanguageOptions,
  buildProjectItems,
  buildProjectOptions,
  filterAndSortProjects,
  formatResultCount,
  type ProjectSortOption,
  updateSelection,
} from './helpers';
import ProjectCard from './project-card';

type ProjectsCatalogSectionProps = {
  readonly language: SupportedLanguage;
  readonly catalog: ProjectsPageContent['catalog'];
};

export default function ProjectsCatalogSection({ language, catalog }: ProjectsCatalogSectionProps) {
  const [sortBy, setSortBy] = useState<ProjectSortOption>('date-descending');

  const [selectedProjects, setSelectedProjects] = useState<ReadonlySet<string>>(() => new Set<string>());

  const [selectedLanguages, setSelectedLanguages] = useState<ReadonlySet<string>>(() => new Set<string>());

  const projects = useMemo(() => buildProjectItems(getProjectCollection(language)), [language]);

  const projectOptions = useMemo(() => buildProjectOptions(projects), [projects]);

  const languageOptions = useMemo(() => buildLanguageOptions(projects, language), [language, projects]);

  const visibleProjects = useMemo(
    () =>
      filterAndSortProjects({
        language,
        projects,
        selectedProjects,
        selectedLanguages,
        sortBy,
      }),
    [language, projects, selectedLanguages, selectedProjects, sortBy],
  );

  const controls = catalog.controls;

  const resultCountLabel = formatResultCount(visibleProjects.length, controls.resultsOne, controls.resultsOther);

  return (
    <div className={['max-w-editorial px-page mx-auto w-full', 'py-10 sm:py-12 lg:py-14'].join(' ')}>
      <Section contained={false} aria-label={catalog.listLabel}>
        <Header
          sortBy={sortBy}
          projectOptions={projectOptions}
          languageOptions={languageOptions}
          selectedProjects={selectedProjects}
          selectedLanguages={selectedLanguages}
          labels={{
            sortLabel: controls.sortLabel,
            sortPlaceholder: controls.sortPlaceholder,
            sortByDateDescending: controls.sortByDateDescending,
            sortByDateAscending: controls.sortByDateAscending,
            sortByNameAscending: controls.sortByNameAscending,
            sortByNameDescending: controls.sortByNameDescending,
            filters: controls.filters,
            filterByProject: controls.filterByProject,
            filterByLanguage: controls.filterByLanguage,
            clearFilters: controls.clearFilters,
          }}
          onSortChange={setSortBy}
          onProjectChange={(value, checked) => {
            setSelectedProjects((currentValues) => updateSelection(currentValues, value, checked));
          }}
          onLanguageChange={(value, checked) => {
            setSelectedLanguages((currentValues) => updateSelection(currentValues, value, checked));
          }}
          onClearFilters={() => {
            setSelectedProjects(new Set<string>());
            setSelectedLanguages(new Set<string>());
          }}
        />

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {resultCountLabel}
        </p>

        {visibleProjects.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:mt-7">
            {visibleProjects.map(({ project }) => (
              <ProjectCard
                key={project.id}
                project={project}
                language={language}
                labels={{
                  period: catalog.periodLabel,
                  ongoing: catalog.ongoingLabel,
                  languages: catalog.languagesLabel,
                  technologies: catalog.technologiesLabel,
                }}
              />
            ))}
          </div>
        ) : (
          <p className={['!m-0 mt-7 rounded-lg', 'border-border bg-brand-hero border', 'px-5 py-8 text-center', 'text-muted-foreground'].join(' ')}>
            {controls.noResults}
          </p>
        )}
      </Section>
    </div>
  );
}
