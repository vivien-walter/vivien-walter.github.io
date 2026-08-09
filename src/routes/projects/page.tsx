import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname, getPageRoute } from '@/app/routing/navigation';
import heroImageSrc from '@/assets/images/projects/hero.png';
import { Hero, HeroBreadcrumbs, HeroContainer, HeroContent, HeroDescription, HeroHeader, HeroImage, HeroMedia, HeroTitle } from '@/components/hero';
import { Section } from '@/components/section';
import { getProjectCollection } from '@/content/projects/catalog';
import { getProjectsPage } from '@/content/projects/page';

import ProjectControls, { type ProjectSortOption } from './_components/project-controls';
import ProjectIndexCard from './_components/project-index-card';

function updateSelection(currentValues: ReadonlySet<string>, value: string, checked: boolean): ReadonlySet<string> {
  const nextValues = new Set(currentValues);

  if (checked) {
    nextValues.add(value);
  } else {
    nextValues.delete(value);
  }

  return nextValues;
}

function formatResultCount(count: number, singularTemplate: string, pluralTemplate: string): string {
  const template = count === 1 ? singularTemplate : pluralTemplate;

  return template.replace('{{count}}', String(count));
}

function ProjectsPage() {
  const location = useLocation();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getProjectsPage(language);

  const [sortBy, setSortBy] = useState<ProjectSortOption>('date-descending');

  const [selectedProjects, setSelectedProjects] = useState<ReadonlySet<string>>(() => new Set<string>());

  const [selectedLanguages, setSelectedLanguages] = useState<ReadonlySet<string>>(() => new Set<string>());

  const projects = useMemo(
    () =>
      getProjectCollection(language).map((project, originalIndex) => ({
        project,
        projectId: project.id,
        originalIndex,
      })),
    [language],
  );

  const projectOptions = useMemo(
    () =>
      projects.map(({ project, projectId }) => ({
        value: projectId,
        label: project.title,
      })),
    [projects],
  );

  const languageOptions = useMemo(() => {
    const values = new Set<string>();

    projects.forEach(({ project }) => {
      project.programmingLanguages.forEach((programmingLanguage) => {
        values.add(programmingLanguage);
      });
    });

    const locale = language === 'fr' ? 'fr-FR' : 'en-GB';

    return [...values]
      .sort((first, second) =>
        first.localeCompare(second, locale, {
          sensitivity: 'base',
        }),
      )
      .map((value) => ({
        value,
        label: value,
      }));
  }, [language, projects]);

  const visibleProjects = useMemo(() => {
    const locale = language === 'fr' ? 'fr-FR' : 'en-GB';

    return projects
      .filter(({ project, projectId }) => {
        const matchesProject = selectedProjects.size === 0 || selectedProjects.has(projectId);

        const matchesLanguage =
          selectedLanguages.size === 0 || project.programmingLanguages.some((programmingLanguage) => selectedLanguages.has(programmingLanguage));

        return matchesProject && matchesLanguage;
      })
      .sort((first, second) => {
        const firstDate = first.project.period.start;

        const secondDate = second.project.period.start;

        let comparison = 0;

        switch (sortBy) {
          case 'date-descending':
            comparison = secondDate.localeCompare(firstDate);
            break;

          case 'date-ascending':
            comparison = firstDate.localeCompare(secondDate);
            break;

          case 'name-ascending':
            comparison = first.project.title.localeCompare(second.project.title, locale, {
              sensitivity: 'base',
            });
            break;

          case 'name-descending':
            comparison = second.project.title.localeCompare(first.project.title, locale, {
              sensitivity: 'base',
            });
            break;
        }

        return comparison !== 0 ? comparison : first.originalIndex - second.originalIndex;
      });
  }, [language, projects, selectedLanguages, selectedProjects, sortBy]);

  const controls = page.catalog.controls;

  const resultCountLabel = formatResultCount(visibleProjects.length, controls.resultsOne, controls.resultsOther);

  return (
    <div className="overflow-hidden">
      <Hero aria-labelledby="page-title">
        <HeroContainer>
          <HeroContent>
            <HeroBreadcrumbs
              ariaLabel={t('breadcrumbs.label', {
                lng: language,
              })}
              items={[
                {
                  label: t('breadcrumbs.home', {
                    lng: language,
                  }),
                  to: getPageRoute('home', language),
                },
                {
                  label: page.breadcrumbLabel,
                },
              ]}
            />

            <HeroHeader className="mt-4 sm:mt-5">
              <HeroTitle id="page-title">{page.title}</HeroTitle>

              <HeroDescription>
                <p className="!m-0">{page.introduction}</p>
              </HeroDescription>
            </HeroHeader>
          </HeroContent>

          <HeroMedia>
            <HeroImage src={heroImageSrc} alt="" />
          </HeroMedia>
        </HeroContainer>
      </Hero>

      <div className={['max-w-editorial px-page mx-auto w-full', 'py-10 sm:py-12 lg:py-14'].join(' ')}>
        <Section contained={false} aria-label={page.catalog.listLabel}>
          <ProjectControls
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
                <ProjectIndexCard
                  key={project.id}
                  project={project}
                  language={language}
                  labels={{
                    period: page.catalog.periodLabel,
                    ongoing: page.catalog.ongoingLabel,
                    languages: page.catalog.languagesLabel,
                    technologies: page.catalog.technologiesLabel,
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
    </div>
  );
}

export default ProjectsPage;
