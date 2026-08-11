import type { CatalogControlOption } from '@/components/catalog-controls';
import type { getProjectCollection } from '@/content/projects/catalog';
import type { SupportedLanguage } from '@/types/localization';

export type ProjectSortOption = 'date-descending' | 'date-ascending' | 'name-ascending' | 'name-descending';

type Project = ReturnType<typeof getProjectCollection>[number];

export type ProjectCatalogItem = {
  readonly project: Project;
  readonly projectId: Project['id'];
  readonly originalIndex: number;
};

type FilterAndSortProjectsOptions = {
  readonly language: SupportedLanguage;
  readonly projects: readonly ProjectCatalogItem[];
  readonly selectedProjects: ReadonlySet<string>;
  readonly selectedLanguages: ReadonlySet<string>;
  readonly sortBy: ProjectSortOption;
};

export function updateSelection(currentValues: ReadonlySet<string>, value: string, checked: boolean): ReadonlySet<string> {
  const nextValues = new Set(currentValues);

  if (checked) {
    nextValues.add(value);
  } else {
    nextValues.delete(value);
  }

  return nextValues;
}

export function formatResultCount(count: number, singularTemplate: string, pluralTemplate: string): string {
  const template = count === 1 ? singularTemplate : pluralTemplate;

  return template.replace('{{count}}', String(count));
}

export function buildProjectItems(projects: readonly Project[]): readonly ProjectCatalogItem[] {
  return projects.map((project, originalIndex) => ({
    project,
    projectId: project.id,
    originalIndex,
  }));
}

export function buildProjectOptions(projects: readonly ProjectCatalogItem[]): readonly CatalogControlOption[] {
  return projects.map(({ project, projectId }) => ({
    value: projectId,
    label: project.title,
  }));
}

export function buildLanguageOptions(projects: readonly ProjectCatalogItem[], language: SupportedLanguage): readonly CatalogControlOption[] {
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
}

export function filterAndSortProjects({
  language,
  projects,
  selectedProjects,
  selectedLanguages,
  sortBy,
}: FilterAndSortProjectsOptions): readonly ProjectCatalogItem[] {
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
}
