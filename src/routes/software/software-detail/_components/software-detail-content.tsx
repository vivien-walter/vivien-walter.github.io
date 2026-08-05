import DetailDescriptionSection from '@/components/detail-description-section';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import type { SoftwareCatalogItem } from '@/content/software/catalog';
import type { SoftwareDetailPageContent } from '@/content/software/detail/page';

import SoftwareDisclaimerBanner from './software-detail-disclaimer-banner';
import SoftwareResourcesSection from './software-resources-section';

interface SoftwareDetailContentProps {
  readonly software: SoftwareCatalogItem;
  readonly labels: SoftwareDetailPageContent;
}

function SoftwareDetailContent({ software, labels }: SoftwareDetailContentProps) {
  const idPrefix = `software-${software.id}`;
  const hasDisclaimer = Boolean(software.disclaimer?.trim());

  return (
    <>
      <DetailDescriptionSection description={software.description} idPrefix={idPrefix} title={labels.descriptionTitle} />

      <DetailTechnologiesSection
        description={labels.technologiesDescription}
        externalLinkLabel={labels.externalLinkLabel}
        groups={software.technologyGroups}
        idPrefix={idPrefix}
        title={labels.technologiesTitle}
      />

      <SoftwareDisclaimerBanner text={software.disclaimer} />

      <SoftwareResourcesSection
        description={labels.resourcesDescription}
        resources={software.resources}
        showTopSeparator={!hasDisclaimer}
        title={labels.resourcesTitle}
        titleId={`${idPrefix}-resources-title`}
      />
    </>
  );
}

export default SoftwareDetailContent;
