import { getPageRoute, getSoftwareRoute } from '@/app/routing/navigation';
import DetailNavigation from '@/components/detail-navigation';
import { getSoftwareDetailNavigation, type SoftwareDetailPageContent } from '@/content/software/detail/page';
import type { SoftwareId } from '@/content/software/registry';
import type { SupportedLanguage } from '@/types/localization';

interface SoftwareDetailNavigationProps {
  readonly language: SupportedLanguage;
  readonly softwareId: SoftwareId;
  readonly labels: SoftwareDetailPageContent;
  readonly showTopSeparator?: boolean;
}

function SoftwareDetailNavigation({ language, softwareId, labels, showTopSeparator = true }: SoftwareDetailNavigationProps) {
  const { previous: previousSoftware, next: nextSoftware } = getSoftwareDetailNavigation(language, softwareId);

  return (
    <DetailNavigation
      className="mt-2 sm:mt-2"
      showTopSeparator={showTopSeparator}
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

export default SoftwareDetailNavigation;
