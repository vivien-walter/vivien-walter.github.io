import { useId, useMemo, useState } from 'react';

import { Section } from '@/components/section';
import { getProjectCollection } from '@/content/projects/page';
import type { ProjectId } from '@/content/projects/registry';
import { getSoftwareCollection, type SoftwareCatalogItem } from '@/content/software/catalog';
import type { SoftwarePageContent } from '@/content/software/page';
import type { SupportedLanguage } from '@/types/localization';

import CatalogHeader from './catalog-header';
import SoftwareCatalogEntry from './software-catalog-entry';
import type { SoftwareSortOption } from './software-controls';

type SoftwareKind = SoftwareCatalogItem['kind'];

type SoftwareWithIndex = {
  readonly software: SoftwareCatalogItem;
  readonly originalIndex: number;
};

type SoftwareCatalogSectionContent = Pick<SoftwarePageContent, 'catalog' | 'kindLabels'>;

interface SoftwareCatalogSectionProps {
  readonly language: SupportedLanguage;
  readonly content: SoftwareCatalogSectionContent;
}

function updateSelection(currentValues: ReadonlySet<string>, value: string, checked: boolean): ReadonlySet<string> {
  const nextValues = new Set(currentValues);

  if (checked) {
    nextValues.add(value);
  } else {
    nextValues.delete(value);
  }

  return nextValues;
}

export default function SoftwareCatalogSection({ language, content }: SoftwareCatalogSectionProps) {
  const catalogId = useId();

  const [activeKind, setActiveKind] = useState<SoftwareKind>('software');

  const [sortBy, setSortBy] = useState<SoftwareSortOption>('year-descending');

  const [selectedProjects, setSelectedProjects] = useState<ReadonlySet<string>>(() => new Set<string>());

  const [selectedLanguages, setSelectedLanguages] = useState<ReadonlySet<string>>(() => new Set<string>());

  const softwareItems = useMemo<readonly SoftwareWithIndex[]>(
    () =>
      getSoftwareCollection(language).map((software, originalIndex) => ({
        software,
        originalIndex,
      })),
    [language],
  );

  const availableProjects = useMemo(() => getProjectCollection(language), [language]);

  const projectOptions = useMemo(() => {
    const referencedProjectIds = new Set<ProjectId>();

    softwareItems.forEach(({ software }) => {
      software.projectIds.forEach((projectId) => {
        referencedProjectIds.add(projectId);
      });
    });

    return availableProjects.flatMap((project) =>
      referencedProjectIds.has(project.id)
        ? [
            {
              value: project.id,
              label: project.title,
            },
          ]
        : [],
    );
  }, [availableProjects, softwareItems]);

  const languageOptions = useMemo(() => {
    const values = new Set<string>();

    softwareItems.forEach(({ software }) => {
      software.languages.forEach((programmingLanguage) => {
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
  }, [language, softwareItems]);

  const visibleSoftware = useMemo(() => {
    const locale = language === 'fr' ? 'fr-FR' : 'en-GB';

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
  }, [activeKind, language, selectedLanguages, selectedProjects, softwareItems, sortBy]);

  const titleId = `${catalogId}-title`;
  const panelId = `${catalogId}-panel`;
  const softwareTabId = `${catalogId}-software-tab`;
  const webApplicationsTabId = `${catalogId}-web-applications-tab`;

  const emptyState = activeKind === 'software' ? content.catalog.emptyStates.software : content.catalog.emptyStates.webApplications;

  return (
    <Section contained={false} className="py-12 sm:py-14 lg:py-16" aria-labelledby={titleId}>
      <CatalogHeader
        content={content.catalog}
        titleId={titleId}
        panelId={panelId}
        softwareTabId={softwareTabId}
        webApplicationsTabId={webApplicationsTabId}
        activeKind={activeKind}
        controls={{
          sortBy,
          projectOptions,
          languageOptions,
          selectedProjects,
          selectedLanguages,
          labels: content.catalog.controls,
          onSortChange: setSortBy,
          onProjectChange: (value, checked) => {
            setSelectedProjects((currentValues) => updateSelection(currentValues, value, checked));
          },
          onLanguageChange: (value, checked) => {
            setSelectedLanguages((currentValues) => updateSelection(currentValues, value, checked));
          },
          onClearFilters: () => {
            setSelectedProjects(new Set<string>());
            setSelectedLanguages(new Set<string>());
          },
        }}
        onKindChange={setActiveKind}
      />

      <div id={panelId} role="tabpanel" aria-labelledby={activeKind === 'software' ? softwareTabId : webApplicationsTabId} className="mt-3 sm:mt-4">
        {visibleSoftware.length > 0 ? (
          <ul className="m-0 grid list-none gap-5 p-0" aria-label={content.catalog.listLabel}>
            {visibleSoftware.map(({ software }) => (
              <li key={software.id} className="m-0 min-w-0">
                <SoftwareCatalogEntry
                  software={software}
                  language={language}
                  technologiesLabel={content.catalog.technologiesLabel}
                  viewLabel={content.catalog.actions.viewSoftware}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-border-strong bg-brand-hero text-muted-foreground !m-0 rounded-lg border px-5 py-8 text-center">{emptyState}</p>
        )}
      </div>
    </Section>
  );
}
