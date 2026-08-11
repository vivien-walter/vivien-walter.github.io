import { getPageRoute, getResearchPublicationRoute } from '@/app/routing/navigation';
import DetailNavigation from '@/components/detail-navigation';
import {
  getResearchPublicationDetailById,
  getResearchPublicationNavigation,
  getResearchPublicationPageContent,
} from '@/content/research/publications/page';
import type { SupportedLanguage } from '@/types/localization';

type ResearchPublication = NonNullable<ReturnType<typeof getResearchPublicationDetailById>>;
type ResearchPublicationDetailPageContent = ReturnType<typeof getResearchPublicationPageContent>;

type PublicationNavigationProps = {
  readonly language: SupportedLanguage;
  readonly publicationId: ResearchPublication['id'];
  readonly labels: ResearchPublicationDetailPageContent;
};

export default function PublicationNavigation({ language, publicationId, labels }: PublicationNavigationProps) {
  const { previous: previousPublication, next: nextPublication } = getResearchPublicationNavigation(language, publicationId);

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
        previousPublication
          ? {
              label: previousPublication.title,
              ...(previousPublication.publication
                ? {
                    secondaryLabel: previousPublication.publication,
                  }
                : {}),
              to: getResearchPublicationRoute(previousPublication.id, language),
            }
          : undefined
      }
      nextLink={
        nextPublication
          ? {
              label: nextPublication.title,
              ...(nextPublication.publication
                ? {
                    secondaryLabel: nextPublication.publication,
                  }
                : {}),
              to: getResearchPublicationRoute(nextPublication.id, language),
            }
          : undefined
      }
    />
  );
}
