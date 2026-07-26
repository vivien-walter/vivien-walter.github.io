import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import { getLanguageFromPathname, getPageRoute, getSoftwareRoute } from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import DetailHighlightsBand from '@/components/detail-highlights-band';
import DetailNavigation from '@/components/detail-navigation';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import { Hero, HeroBreadcrumbs, HeroContainer, HeroContent, HeroDescription, HeroEyebrow, HeroHeader, HeroMedia, HeroTitle } from '@/components/hero';
import { getSoftwareDetailById, getSoftwareDetailContent, getSoftwareDetailNavigation } from '@/content/software/detail/page';
import { getSoftwareContent } from '@/content/software/page';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/routes/not-found/page';

import SoftwareResourcesSection from './_components/software-resources-section';

function SoftwareDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const softwarePage = getSoftwareContent(language);
  const detail = getSoftwareDetailContent(language);

  const software = slug ? getSoftwareDetailById(language, slug) : undefined;

  if (!software) {
    return <NotFoundPage />;
  }

  const { previous: previousSoftware, next: nextSoftware } = getSoftwareDetailNavigation(language, software.id);

  const SoftwareIcon = software.icon;
  const idPrefix = `software-${software.id}`;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <Hero aria-labelledby="page-title">
        <HeroContainer>
          <HeroContent>
            <HeroBreadcrumbs
              ariaLabel={t('breadcrumbs.label', {
                lng: language,
              })}
              items={[
                {
                  label: t('breadcrumbs.home', {
                    lng: language,
                  }),
                  to: getPageRoute('home', language),
                },
                {
                  label: softwarePage.title,
                  to: getPageRoute('software', language),
                },
                {
                  label: software.title,
                },
              ]}
            />

            <HeroHeader className="mt-4 sm:mt-5">
              <HeroEyebrow>{software.eyebrow}</HeroEyebrow>

              <HeroTitle id="page-title">{software.title}</HeroTitle>

              <HeroDescription>
                <p className="!m-0">{software.summary}</p>
              </HeroDescription>
            </HeroHeader>
          </HeroContent>

          <HeroMedia className={cn('flex items-center justify-center', 'bg-action-soft text-brand-primary', 'p-8 sm:p-10 lg:p-12')}>
            <SoftwareIcon aria-hidden="true" className="size-24 sm:size-28 lg:size-32" weight="regular" />
          </HeroMedia>
        </HeroContainer>
      </Hero>

      <DetailHighlightsBand ariaLabel={detail.highlightsLabel} items={software.highlights} />

      <div className={cn('max-w-editorial px-page mx-auto w-full', 'pt-12 pb-12', 'sm:pt-14 sm:pb-14', 'lg:pt-16 lg:pb-16')}>
        <DetailDescriptionSection description={software.description} idPrefix={idPrefix} title={detail.descriptionTitle} />

        <DetailTechnologiesSection
          externalLinkLabel={detail.externalLinkLabel}
          groups={software.technologyGroups}
          idPrefix={idPrefix}
          title={detail.technologiesTitle}
        />

        <SoftwareResourcesSection resources={software.resources} title={detail.resourcesTitle} titleId={`${idPrefix}-resources-title`} />

        <DetailNavigation
          ariaLabel={detail.navigationLabel}
          backLink={{
            label: detail.backLabel,
            to: getPageRoute('software', language),
          }}
          previousLabel={detail.previousLabel}
          nextLabel={detail.nextLabel}
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
      </div>
    </article>
  );
}

export default SoftwareDetailPage;
