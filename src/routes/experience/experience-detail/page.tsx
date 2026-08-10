import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import {
  getExperienceRoute,
  getLanguageFromPathname,
  getPageRoute,
  getProjectRoute,
  getResearchPublicationRoute,
  getSoftwareRoute,
} from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import DetailHighlightsBand from '@/components/detail-highlights-band';
import DetailNavigation from '@/components/detail-navigation';
import DetailTechnologiesSection from '@/components/detail-technologies-section';
import {
  Hero,
  HeroBreadcrumbs,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroFooter,
  HeroHeader,
  HeroImage,
  HeroMedia,
  HeroTitle,
} from '@/components/hero';
import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getExperienceDetailById, getExperienceDetailContent, getExperienceNavigation } from '@/content/experience/experiences/page';
import { getProjectsByExperienceId } from '@/content/projects/catalog';
import { getPublicationsByExperienceId } from '@/content/research/publications/catalog';
import { getSoftwareByExperienceId } from '@/content/software/catalog';
import { formatContentDateRange } from '@/lib/content/formatters';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/routes/not-found/page';

import ExperienceDirectContributionsSection from '../_components/experience-direct-contributions-section';
import ExperienceResourcesSection from '../_components/experience-resources-section';
import RelatedContentSection from '../_components/related-content-section';

function ExperienceDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const detail = getExperienceDetailContent(language);

  const experience = slug ? getExperienceDetailById(language, slug) : undefined;

  if (!experience) {
    return <NotFoundPage />;
  }

  const relatedProjects = getProjectsByExperienceId(language, experience.id).map((project) => ({
    id: project.id,
    title: project.title,
    to: getProjectRoute(project.id, language),
  }));

  const relatedSoftware = getSoftwareByExperienceId(language, experience.id).map((software) => ({
    id: software.id,
    title: software.title,
    badges: software.languages,
    to: getSoftwareRoute(software.id, language),
  }));

  const relatedPublications = getPublicationsByExperienceId(language, experience.id).map((publication) => ({
    id: publication.id,
    title: publication.title,
    secondaryText: publication.publication ? `${publication.publication} (${publication.year})` : String(publication.year),
    to: getResearchPublicationRoute(publication.id, language),
  }));

  const { previous: previousExperience, next: nextExperience } = getExperienceNavigation(language, experience.id);

  const idPrefix = `experience-${experience.id}`;

  const hasTechnologies = experience.technologyGroups?.some((group) => group.items.length > 0) ?? false;

  const hasVisibleResources = experience.resources?.some((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? false;

  const hasRelatedContent =
    (detail.relatedProjects.trim().length > 0 &&
      relatedProjects.some((item) => item.id.trim().length > 0 && item.title.trim().length > 0 && item.to.trim().length > 0)) ||
    (detail.relatedSoftware.trim().length > 0 &&
      relatedSoftware.some((item) => item.id.trim().length > 0 && item.title.trim().length > 0 && item.to.trim().length > 0)) ||
    (detail.relatedPublications.trim().length > 0 &&
      relatedPublications.some((item) => item.id.trim().length > 0 && item.title.trim().length > 0 && item.to.trim().length > 0));

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <Hero aria-labelledby="page-title">
        <HeroContainer className={experience.heroImage ? undefined : 'lg:grid-cols-1'}>
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
                  label: t('pages.experience.title', {
                    lng: language,
                  }),
                  to: getPageRoute('experience', language),
                },
                {
                  label: experience.breadcrumbLabel,
                },
              ]}
            />

            <HeroHeader className="mt-4 sm:mt-5">
              <HeroEyebrow>{experience.eyebrow ?? detail.eyebrow}</HeroEyebrow>

              <HeroTitle id="page-title">{experience.role}</HeroTitle>

              <HeroDescription>
                <p className="!m-0">{experience.summary}</p>
              </HeroDescription>
            </HeroHeader>

            <HeroFooter>
              <dl className="m-0 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="min-w-0">
                  <dt className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.08em] uppercase">{detail.organization}</dt>

                  <dd className="text-brand-ink m-0 mt-1 font-semibold">{experience.organization}</dd>
                </div>

                <div className="min-w-0">
                  <dt className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.08em] uppercase">{detail.period}</dt>

                  <dd className="text-brand-ink m-0 mt-1 font-semibold">{formatContentDateRange(experience.period, language)}</dd>
                </div>

                {experience.location ? (
                  <div className="min-w-0">
                    <dt className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.08em] uppercase">{detail.location}</dt>

                    <dd className="text-brand-ink m-0 mt-1 font-semibold">{experience.location}</dd>
                  </div>
                ) : null}
              </dl>
            </HeroFooter>
          </HeroContent>

          {experience.heroImage ? (
            <HeroMedia>
              <HeroImage src={experience.heroImage.src} alt={experience.heroImage.alt} objectPosition={experience.heroImage.objectPosition} />
            </HeroMedia>
          ) : null}
        </HeroContainer>
      </Hero>

      <DetailHighlightsBand ariaLabel={detail.highlightsLabel} items={experience.highlights} />

      <div className="max-w-editorial px-page mx-auto w-full pt-12 pb-12 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16">
        <DetailDescriptionSection description={experience.description} idPrefix={idPrefix} title={detail.description} />

        <Separator />

        <ExperienceDirectContributionsSection idPrefix={idPrefix} items={experience.directContributions} title={detail.directContributions} />

        {hasTechnologies ? <Separator /> : null}

        <DetailTechnologiesSection
          externalLinkLabel={detail.externalLinkLabel}
          groups={experience.technologyGroups}
          idPrefix={idPrefix}
          title={detail.technologies}
        />

        {experience.finalState ? (
          <>
            <Separator />

            <Section contained={false} className="py-12 sm:py-14 lg:py-16" aria-labelledby={`${idPrefix}-final-state-title`}>
              <SectionHeader className="mb-8">
                <SectionTitle id={`${idPrefix}-final-state-title`}>{experience.finalState.title}</SectionTitle>
              </SectionHeader>

              <Card
                className={cn(
                  'shadow-subtle gap-0 rounded-lg py-0',
                  experience.finalState.completed ? 'border-brand-primary/30 bg-action-soft' : 'border-brand-accent/30 bg-copper-soft',
                )}
              >
                <p className="max-w-readable text-brand-ink !m-0 px-5 py-6 sm:px-6 sm:py-7">{experience.finalState.text}</p>
              </Card>
            </Section>
          </>
        ) : null}

        {hasVisibleResources ? <Separator /> : null}

        <ExperienceResourcesSection resources={experience.resources} title={detail.resources} titleId={`${idPrefix}-resources-title`} />

        {hasRelatedContent ? <Separator /> : null}

        <RelatedContentSection
          idPrefix={idPrefix}
          title={detail.relatedItems}
          groups={[
            {
              id: 'projects',
              title: detail.relatedProjects,
              items: relatedProjects,
            },
            {
              id: 'software',
              title: detail.relatedSoftware,
              items: relatedSoftware,
            },
            {
              id: 'publications',
              title: detail.relatedPublications,
              items: relatedPublications,
            },
          ]}
        />

        <div className="mt-4 sm:mt-6">
          <Separator />
        </div>

        <DetailNavigation
          className="!mt-6 sm:!mt-6"
          ariaLabel={detail.navigationLabel}
          backLink={{
            label: detail.backLabel,
            to: getPageRoute('experience', language),
          }}
          previousLabel={detail.previousLabel}
          nextLabel={detail.nextLabel}
          previousLink={
            previousExperience
              ? {
                  label: previousExperience.role,
                  secondaryLabel: previousExperience.organization,
                  to: getExperienceRoute(previousExperience.id, language),
                }
              : undefined
          }
          nextLink={
            nextExperience
              ? {
                  label: nextExperience.role,
                  secondaryLabel: nextExperience.organization,
                  to: getExperienceRoute(nextExperience.id, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ExperienceDetailPage;
