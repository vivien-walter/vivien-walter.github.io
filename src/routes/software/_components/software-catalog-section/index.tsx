import { useId, useMemo, useState } from 'react';

import { Section } from '@/components/section';
import { getProjectCollection } from '@/content/projects/catalog';
import { getSoftwareCollection } from '@/content/software/catalog';
import type { SoftwarePageContent } from '@/content/software/page';
import type { SupportedLanguage } from '@/types/localization';

import CatalogEntry from './catalog-entry';
import Header from './header';
import {
  buildLanguageOptions,
  buildProjectOptions,
  buildSoftwareItems,
  filterAndSortSoftware,
  type SoftwareKind,
  type SoftwareSortOption,
  updateSelection,
} from './helpers';

type SoftwareCatalogSectionContent = Pick<SoftwarePageContent, 'catalog'>;

interface SoftwareCatalogSectionProps {
  readonly language: SupportedLanguage;
  readonly content: SoftwareCatalogSectionContent;
}

export default function SoftwareCatalogSection({ language, content }: SoftwareCatalogSectionProps) {
  const catalogId = useId();

  const [activeKind, setActiveKind] = useState<SoftwareKind>('software');
  const [sortBy, setSortBy] = useState<SoftwareSortOption>('year-descending');
  const [selectedProjects, setSelectedProjects] = useState<ReadonlySet<string>>(() => new Set<string>());
  const [selectedLanguages, setSelectedLanguages] = useState<ReadonlySet<string>>(() => new Set<string>());

  const softwareItems = useMemo(() => buildSoftwareItems(getSoftwareCollection(language)), [language]);

  const projectOptions = useMemo(() => buildProjectOptions(getProjectCollection(language), softwareItems), [language, softwareItems]);

  const languageOptions = useMemo(() => buildLanguageOptions(language, softwareItems), [language, softwareItems]);

  const visibleSoftware = useMemo(
    () =>
      filterAndSortSoftware({
        softwareItems,
        activeKind,
        selectedProjects,
        selectedLanguages,
        sortBy,
        language,
      }),
    [activeKind, language, selectedLanguages, selectedProjects, softwareItems, sortBy],
  );

  const titleId = `${catalogId}-title`;
  const panelId = `${catalogId}-panel`;
  const softwareTabId = `${catalogId}-software-tab`;
  const webApplicationsTabId = `${catalogId}-web-applications-tab`;
  const librariesTabId = `${catalogId}-libraries-tab`;

  const activeTabId = activeKind === 'software' ? softwareTabId : activeKind === 'web-application' ? webApplicationsTabId : librariesTabId;

  const emptyState =
    activeKind === 'software'
      ? content.catalog.emptyStates.software
      : activeKind === 'web-application'
        ? content.catalog.emptyStates.webApplications
        : content.catalog.emptyStates.libraries;

  return (
    <Section containerClassName="py-12 sm:py-14 lg:py-16" aria-labelledby={titleId}>
      <Header
        content={content.catalog}
        titleId={titleId}
        panelId={panelId}
        softwareTabId={softwareTabId}
        webApplicationsTabId={webApplicationsTabId}
        librariesTabId={librariesTabId}
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

      <div id={panelId} role="tabpanel" aria-labelledby={activeTabId} className="mt-3 sm:mt-4">
        {visibleSoftware.length > 0 ? (
          <ul className="m-0 grid list-none gap-5 p-0" aria-label={content.catalog.listLabel}>
            {visibleSoftware.map(({ software }) => (
              <CatalogEntry
                key={software.id}
                software={software}
                language={language}
                technologiesLabel={content.catalog.technologiesLabel}
                viewLabel={content.catalog.actions.viewSoftware}
              />
            ))}
          </ul>
        ) : (
          <p className="border-border-strong bg-brand-hero text-muted-foreground !m-0 rounded-lg border px-5 py-8 text-center">{emptyState}</p>
        )}
      </div>
    </Section>
  );
}
