import PageDivider from '@/components/page-divider';
import RelatedItemsSection from '@/components/related-items-section';
import { getResearchPublicationDetailById, getResearchPublicationPageContent } from '@/content/research/publications/page';
import type { SupportedLanguage } from '@/types/localization';

import { buildResearchPublicationRelatedGroups, hasResearchPublicationRelatedItems } from './helpers';

type ResearchPublication = NonNullable<ReturnType<typeof getResearchPublicationDetailById>>;

type PublicationRelatedItemsSectionProps = {
  readonly language: SupportedLanguage;
  readonly publication: ResearchPublication;
};

export default function PublicationRelatedItemsSection({ language, publication }: PublicationRelatedItemsSectionProps) {
  const detail = getResearchPublicationPageContent(language);

  const groups = buildResearchPublicationRelatedGroups(language, publication, detail);

  if (!hasResearchPublicationRelatedItems(groups)) {
    return null;
  }

  return (
    <>
      <PageDivider />

      <RelatedItemsSection contained title={detail.relatedItems} titleId={`publication-${publication.id}-related-items-title`} groups={groups} />
    </>
  );
}
