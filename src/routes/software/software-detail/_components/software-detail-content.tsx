import DetailDescriptionSection from '@/components/detail-description-section';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import { Separator } from '@/components/ui/separator';
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

  const hasTechnologies = software.technologyGroups?.some((group) => group.items.length > 0) ?? false;

  const hasVisibleResources = software.resources?.some((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? false;

  return (
    <>
      <DetailDescriptionSection description={software.description} idPrefix={idPrefix} title={labels.descriptionTitle} />

      {hasTechnologies ? <Separator /> : null}

      <DetailTechnologiesSection
        description={labels.technologiesDescription}
        externalLinkLabel={labels.externalLinkLabel}
        groups={software.technologyGroups}
        idPrefix={idPrefix}
        title={labels.technologiesTitle}
      />

      <SoftwareDisclaimerBanner text={software.disclaimer} />

      {!hasDisclaimer && hasVisibleResources ? <Separator /> : null}

      <SoftwareResourcesSection
        description={labels.resourcesDescription}
        resources={software.resources}
        title={labels.resourcesTitle}
        titleId={`${idPrefix}-resources-title`}
      />
    </>
  );
}

export default SoftwareDetailContent;
