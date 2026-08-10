import { getPageRoute, getSoftwareRoute } from '@/app/routing/navigation';
import DetailNavigation from '@/components/detail-navigation';
import { getSoftwareDetailNavigation, type SoftwareDetailPageContent } from '@/content/software/detail/page';
import type { SoftwareId } from '@/content/software/registry';
import type { SupportedLanguage } from '@/types/localization';

interface SoftwareDetailNavigationProps {
  readonly language: SupportedLanguage;
  readonly softwareId: SoftwareId;
  readonly labels: SoftwareDetailPageContent;
  readonly hasNavigationSeparator: boolean;
}

export default function SoftwareDetailNavigation({ language, softwareId, labels, hasNavigationSeparator }: SoftwareDetailNavigationProps) {
  const { previous: previousSoftware, next: nextSoftware } = getSoftwareDetailNavigation(language, softwareId);

  return (
    <DetailNavigation
      className={`max-w-editorial px-page mx-auto w-full pb-12 sm:pb-14 lg:pb-16 ${hasNavigationSeparator ? 'mt-6 sm:mt-6' : 'mt-2 sm:mt-2'}`}
      ariaLabel={labels.navigationLabel}
      backLink={{
        label: labels.backLabel,
        to: getPageRoute('software', language),
      }}
      previousLabel={labels.previousLabel}
      nextLabel={labels.nextLabel}
      previousLink={
        previousSoftware
          ? {
              label: previousSoftware.title,
              to: getSoftwareRoute(previousSoftware.id, language),
            }
          : undefined
      }
      nextLink={
        nextSoftware
          ? {
              label: nextSoftware.title,
              to: getSoftwareRoute(nextSoftware.id, language),
            }
          : undefined
      }
    />
  );
}
