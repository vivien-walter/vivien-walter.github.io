import type { Icon } from '@phosphor-icons/react';

import { selectLocalizedContent } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

import type { ResearchThemeId } from './registry';

export type ResearchThemeLocalizedHighlight = {
  readonly label: string;
  readonly value: string;
};

export type ResearchThemeLocalizedTechnologyItem = {
  readonly label: string;
  readonly href?: string;
  readonly description?: string;
};

export type ResearchThemeLocalizedTechnologyGroup = {
  readonly title: string;
  readonly items: readonly ResearchThemeLocalizedTechnologyItem[];
};

export type ResearchThemeLocalizedContent = {
  readonly title: string;
  readonly breadcrumbLabel?: string;
  readonly introduction: string;
  readonly highlights: readonly ResearchThemeLocalizedHighlight[];
  readonly description: {
    readonly paragraphs: readonly string[];
  };
  readonly technologyGroups: readonly ResearchThemeLocalizedTechnologyGroup[];
};

export type ResearchThemeHighlight = ResearchThemeLocalizedHighlight & {
  readonly icon: Icon;
};

export type ResearchThemeContent<TId extends ResearchThemeId = ResearchThemeId> = {
  readonly id: TId;
  readonly icon: Icon;
  readonly title: string;
  readonly breadcrumbLabel: string;
  readonly introduction: string;
  readonly highlights: readonly ResearchThemeHighlight[];
  readonly description: {
    readonly paragraphs: readonly string[];
  };
  readonly technologyGroups: readonly ResearchThemeLocalizedTechnologyGroup[];
};

type ResearchThemeContentDefinition<TId extends ResearchThemeId, TLocalizedContent extends ResearchThemeLocalizedContent> = {
  readonly id: TId;
  readonly icon: Icon;
  readonly localizedContent: Readonly<Record<SupportedLanguage, TLocalizedContent>>;
  readonly highlightIcons: readonly Icon[];
};

function getHighlightIcon(icons: readonly Icon[], index: number, themeId: ResearchThemeId): Icon {
  const icon = icons[index];

  if (!icon) {
    throw new Error(`Icône manquante pour le highlight ${index + 1} de la thématique "${themeId}".`);
  }

  return icon;
}

export function createResearchThemeContent<const TId extends ResearchThemeId, const TLocalizedContent extends ResearchThemeLocalizedContent>(
  language: SupportedLanguage,
  definition: ResearchThemeContentDefinition<TId, TLocalizedContent>,
): ResearchThemeContent<TId> {
  const localized = selectLocalizedContent(definition.localizedContent, language);

  if (localized.highlights.length !== definition.highlightIcons.length) {
    throw new Error(`La thématique "${definition.id}" doit fournir une icône pour chaque highlight.`);
  }

  const breadcrumbLabel = localized.breadcrumbLabel?.trim() ? localized.breadcrumbLabel : localized.title;

  return {
    id: definition.id,
    icon: definition.icon,
    title: localized.title,
    breadcrumbLabel,
    introduction: localized.introduction,
    highlights: localized.highlights.map((highlight, index) => ({
      ...highlight,
      icon: getHighlightIcon(definition.highlightIcons, index, definition.id),
    })),
    description: localized.description,
    technologyGroups: localized.technologyGroups,
  };
}
