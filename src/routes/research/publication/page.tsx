import { useLocation, useParams } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import PageDivider from '@/components/page-divider';
import { getResearchPublicationDetailById, getResearchPublicationPageContent } from '@/content/research/publications/page';
import NotFoundPage from '@/routes/not-found/page';

import Actions from './_components/actions';
import MetadataSection from './_components/metadata-section';
import PublicationHero from './_components/publication-hero';
import PublicationNavigation from './_components/publication-navigation';
import PublicationRelatedItemsSection from './_components/publication-related-items-section';
import ResourcesSection from './_components/resources-section';

export default function PublicationPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const language = getLanguageFromPathname(location.pathname);

  const detail = getResearchPublicationPageContent(language);
  const publication = slug ? getResearchPublicationDetailById(language, slug) : undefined;

  if (!publication) {
    return <NotFoundPage />;
  }

  const idPrefix = `publication-${publication.id}`;

  const hasDescription = publication.description !== undefined && publication.description.paragraphs.length > 0;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <PublicationHero language={language} publication={publication} />

      <MetadataSection idPrefix={idPrefix} language={language} publication={publication} />

      {hasDescription && publication.description ? (
        <>
          <PageDivider />

          <DetailDescriptionSection contained description={publication.description} idPrefix={idPrefix} title={detail.description} />
        </>
      ) : null}

      <Actions website={publication.website} pdf={publication.pdf} websiteLabel={detail.publicationWebsite} pdfLabel={detail.downloadPdf} />

      <ResourcesSection resources={publication.resources} title={detail.resources} titleId={`${idPrefix}-resources-title`} />

      <PublicationRelatedItemsSection language={language} publication={publication} />

      <PageDivider className="mt-4 sm:mt-6" />

      <PublicationNavigation language={language} publicationId={publication.id} labels={detail} />
    </article>
  );
}
