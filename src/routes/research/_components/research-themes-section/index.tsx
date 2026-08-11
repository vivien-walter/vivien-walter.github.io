import { useState } from 'react';

import { getResearchThemeRoute } from '@/app/routing/navigation';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import type { ResearchThemeId } from '@/content/research/registry';
import { getResearchThemeCollection } from '@/content/research/themes/catalog';
import type { SupportedLanguage } from '@/types/localization';

import ResearchThemeCard from './research-theme-card';

type ResearchTheme = ReturnType<typeof getResearchThemeCollection>[number];

type ResearchThemesSectionProps = {
  readonly description: string;
  readonly language: SupportedLanguage;
  readonly themes: readonly ResearchTheme[];
  readonly title: string;
  readonly viewMoreLabel: string;
};

export default function ResearchThemesSection({ description, language, themes, title, viewMoreLabel }: ResearchThemesSectionProps) {
  const defaultThemeIndex = themes.length > 0 ? Math.floor((themes.length - 1) / 2) : -1;
  const defaultThemeId = defaultThemeIndex >= 0 ? themes[defaultThemeIndex]?.id : undefined;

  const [selectedThemeId, setSelectedThemeId] = useState<ResearchThemeId | undefined>(() => defaultThemeId);

  const activeThemeId = selectedThemeId && themes.some((theme) => theme.id === selectedThemeId) ? selectedThemeId : defaultThemeId;

  if (themes.length === 0) {
    return null;
  }

  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="research-themes-title">
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id="research-themes-title">{title}</SectionTitle>
        <SectionDescription>{description}</SectionDescription>
      </SectionHeader>

      <ul className="m-0 flex list-none flex-col items-stretch gap-3 p-0 pt-2 sm:gap-4 lg:flex-row lg:items-center">
        {themes.map((theme) => (
          <ResearchThemeCard
            key={theme.id}
            theme={theme}
            to={getResearchThemeRoute(theme.id, language)}
            headingLevel={3}
            isSelected={theme.id === activeThemeId}
            viewMoreLabel={viewMoreLabel}
            onSelect={() => {
              setSelectedThemeId(theme.id);
            }}
          />
        ))}
      </ul>
    </Section>
  );
}
