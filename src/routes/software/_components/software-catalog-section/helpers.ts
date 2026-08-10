import type { ProjectId } from '@/content/projects/registry';
import type { SoftwareCatalogItem } from '@/content/software/catalog';
import type { SupportedLanguage } from '@/types/localization';

export type SoftwareKind = SoftwareCatalogItem['kind'];

export type SoftwareSortOption = 'year-descending' | 'year-ascending' | 'title-ascending' | 'title-descending';

export type SoftwareFilterOption = {
  readonly value: string;
  readonly label: string;
};

export type SoftwareWithIndex = {
  readonly software: SoftwareCatalogItem;
  readonly originalIndex: number;
};

type ProjectOptionSource = {
  readonly id: ProjectId;
  readonly title: string;
};

type FilterAndSortSoftwareOptions = {
  readonly softwareItems: readonly SoftwareWithIndex[];
  readonly activeKind: SoftwareKind;
  readonly selectedProjects: ReadonlySet<string>;
  readonly selectedLanguages: ReadonlySet<string>;
  readonly sortBy: SoftwareSortOption;
  readonly language: SupportedLanguage;
};

function getLocale(language: SupportedLanguage): string {
  return language === 'fr' ? 'fr-FR' : 'en-GB';
}

export function updateSelection(currentValues: ReadonlySet<string>, value: string, checked: boolean): ReadonlySet<string> {
  const nextValues = new Set(currentValues);

  if (checked) {
    nextValues.add(value);
  } else {
    nextValues.delete(value);
  }

  return nextValues;
}

export function buildSoftwareItems(softwareCollection: readonly SoftwareCatalogItem[]): readonly SoftwareWithIndex[] {
  return softwareCollection.map((software, originalIndex) => ({
    software,
    originalIndex,
  }));
}

export function buildProjectOptions(
  projects: readonly ProjectOptionSource[],
  softwareItems: readonly SoftwareWithIndex[],
): readonly SoftwareFilterOption[] {
  const referencedProjectIds = new Set<ProjectId>();

  softwareItems.forEach(({ software }) => {
    software.projectIds.forEach((projectId) => {
      referencedProjectIds.add(projectId);
    });
  });

  return projects.flatMap((project) =>
    referencedProjectIds.has(project.id)
      ? [
          {
            value: project.id,
            label: project.title,
          },
        ]
      : [],
  );
}

export function buildLanguageOptions(language: SupportedLanguage, softwareItems: readonly SoftwareWithIndex[]): readonly SoftwareFilterOption[] {
  const values = new Set<string>();

  softwareItems.forEach(({ software }) => {
    software.languages.forEach((programmingLanguage) => {
      values.add(programmingLanguage);
    });
  });

  return [...values]
    .sort((first, second) =>
      first.localeCompare(second, getLocale(language), {
        sensitivity: 'base',
      }),
    )
    .map((value) => ({
      value,
      label: value,
    }));
}

export function filterAndSortSoftware({
  softwareItems,
  activeKind,
  selectedProjects,
  selectedLanguages,
  sortBy,
  language,
}: FilterAndSortSoftwareOptions): readonly SoftwareWithIndex[] {
  const locale = getLocale(language);

  return softwareItems
    .filter(({ software }) => {
      const matchesKind = software.kind === activeKind;

      const matchesProject = selectedProjects.size === 0 || software.projectIds.some((projectId) => selectedProjects.has(projectId));

      const matchesLanguage =
        selectedLanguages.size === 0 || software.languages.some((programmingLanguage) => selectedLanguages.has(programmingLanguage));

      return matchesKind && matchesProject && matchesLanguage;
    })
    .sort((first, second) => {
      let comparison = 0;

      switch (sortBy) {
        case 'year-descending':
          comparison = second.software.year - first.software.year;
          break;

        case 'year-ascending':
          comparison = first.software.year - second.software.year;
          break;

        case 'title-ascending':
          comparison = first.software.title.localeCompare(second.software.title, locale, {
            sensitivity: 'base',
          });
          break;

        case 'title-descending':
          comparison = second.software.title.localeCompare(first.software.title, locale, {
            sensitivity: 'base',
          });
          break;
      }

      return comparison !== 0 ? comparison : first.originalIndex - second.originalIndex;
    });
}
