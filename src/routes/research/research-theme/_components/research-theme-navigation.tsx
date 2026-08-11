import { getPageRoute, getResearchThemeRoute } from '@/app/routing/navigation';
import DetailNavigation from '@/components/detail-navigation';
import type { ResearchThemeId } from '@/content/research/registry';
import { getResearchThemeNavigation, getResearchThemePageContent } from '@/content/research/themes/page';
import type { SupportedLanguage } from '@/types/localization';

type ResearchThemeDetailPageContent = ReturnType<typeof getResearchThemePageContent>;

type ResearchThemeNavigationProps = {
  readonly language: SupportedLanguage;
  readonly themeId: ResearchThemeId;
  readonly labels: ResearchThemeDetailPageContent;
};

export default function ResearchThemeNavigation({ language, themeId, labels }: ResearchThemeNavigationProps) {
  const { previous: previousTheme, next: nextTheme } = getResearchThemeNavigation(language, themeId);

  return (
    <DetailNavigation
      className="max-w-editorial px-page mx-auto mt-6 w-full pb-12 sm:mt-6 sm:pb-14 lg:pb-16"
      ariaLabel={labels.navigationLabel}
      backLink={{
        label: labels.backLabel,
        to: getPageRoute('research', language),
      }}
      previousLabel={labels.previousLabel}
      nextLabel={labels.nextLabel}
      previousLink={
        previousTheme
          ? {
              label: previousTheme.title,
              to: getResearchThemeRoute(previousTheme.id, language),
            }
          : undefined
      }
      nextLink={
        nextTheme
          ? {
              label: nextTheme.title,
              to: getResearchThemeRoute(nextTheme.id, language),
            }
          : undefined
      }
    />
  );
}
