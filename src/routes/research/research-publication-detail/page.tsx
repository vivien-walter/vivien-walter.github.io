import type { Icon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import {
  getExperienceRoute,
  getLanguageFromPathname,
  getPageRoute,
  getProjectRoute,
  getResearchPublicationRoute,
  getResearchThemeRoute,
  getSoftwareRoute,
} from '@/app/routing/navigation';
import DetailDescriptionSection from '@/components/detail-description-section';
import DetailNavigation from '@/components/detail-navigation';
import PageHero from '@/components/page-hero';
import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getExperienceById } from '@/content/experience/page';
import { getProjectById } from '@/content/projects/page';
import { getPublicationById, getPublicationNavigation, getResearchPage, getResearchThemeById } from '@/content/research/page';
import { getSoftwareById } from '@/content/software/catalog';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/routes/not-found/page';

import PublicationRelatedItemsSection, { type PublicationRelatedGroup } from './_components/publication-related-items-section';
import PublicationResourcesSection from './_components/publication-resources-section';

type PublicationAuthor = {
  readonly name: string;
  readonly href?: string;
};

type PublicationResource = {
  readonly icon: Icon;
  readonly label: string;
  readonly description: string;
  readonly href: string;
};

type PublicationMetadataRowProps = {
  readonly label: string;
  readonly children: ReactNode;
};

const metadataRowClassName = cn('grid min-w-0 gap-2 px-5 py-5', 'sm:grid-cols-[10rem_minmax(0,1fr)]', 'sm:gap-6 sm:px-6');

const metadataTermClassName = cn('font-mono text-xs font-semibold uppercase', 'text-muted-foreground tracking-[0.06em]');

function PublicationMetadataRow({ label, children }: PublicationMetadataRowProps) {
  return (
    <div className={metadataRowClassName}>
      <dt className={metadataTermClassName}>{label}</dt>

      <dd className="text-foreground m-0 min-w-0">{children}</dd>
    </div>
  );
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function getPublicationReference(publication: object): string | undefined {
  if (!('reference' in publication) || typeof publication.reference !== 'string') {
    return undefined;
  }

  return publication.reference;
}

function getPublicationResources(publication: object): readonly PublicationResource[] | undefined {
  if (!('resources' in publication) || !Array.isArray(publication.resources)) {
    return undefined;
  }

  return publication.resources as readonly PublicationResource[];
}

function getPublicationSoftwareIds(publication: object): readonly string[] {
  if (!('softwareIds' in publication) || !Array.isArray(publication.softwareIds)) {
    return [];
  }

  return publication.softwareIds.filter((softwareId): softwareId is string => typeof softwareId === 'string');
}

function ResearchPublicationDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getResearchPage(language);

  const publication = slug ? getPublicationById(language, slug) : undefined;

  if (!publication) {
    return <NotFoundPage />;
  }

  const authors = publication.authors as readonly PublicationAuthor[];

  const reference = getPublicationReference(publication);

  const resources = getPublicationResources(publication);

  const softwareIds = getPublicationSoftwareIds(publication);

  const relatedThemes = publication.themeIds.flatMap((themeId) => {
    const theme = getResearchThemeById(language, themeId);

    return theme
      ? [
          {
            id: theme.id,
            label: theme.title,
            to: getResearchThemeRoute(theme.id, language),
          },
        ]
      : [];
  });

  const relatedProjects = publication.projectIds.flatMap((projectId) => {
    const project = getProjectById(language, projectId);

    return project
      ? [
          {
            id: project.id,
            label: project.title,
            to: getProjectRoute(project.id, language),
          },
        ]
      : [];
  });

  const relatedSoftware = softwareIds.flatMap((softwareId) => {
    const software = getSoftwareById(language, softwareId);

    return software
      ? [
          {
            id: software.id,
            label: software.title,
            to: getSoftwareRoute(software.id, language),
          },
        ]
      : [];
  });

  const relatedExperiences = publication.experienceIds.flatMap((experienceId) => {
    const experience = getExperienceById(language, experienceId);

    return experience
      ? [
          {
            id: experience.id,
            label: `${experience.role} — ${experience.organization}`,
            to: getExperienceRoute(experience.id, language),
          },
        ]
      : [];
  });

  const relatedGroups: readonly PublicationRelatedGroup[] = [
    {
      id: 'themes',
      title: page.publicationDetail.relatedThemes,
      items: relatedThemes,
    },
    {
      id: 'projects',
      title: page.publicationDetail.relatedProjects,
      items: relatedProjects,
    },
    {
      id: 'software',
      title: page.publicationDetail.relatedSoftware,
      items: relatedSoftware,
    },
    {
      id: 'experiences',
      title: page.publicationDetail.relatedExperiences,
      items: relatedExperiences,
    },
  ];

  const { previous: previousPublication, next: nextPublication } = getPublicationNavigation(language, publication.id);

  const eyebrow = publication.kind === 'article' ? page.publicationDetail.articleEyebrow : page.publicationDetail.thesisEyebrow;

  const idPrefix = `publication-${publication.id}`;

  const hasDescription = publication.description !== undefined && publication.description.paragraphs.length > 0;

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <PageHero
        breadcrumbs={{
          ariaLabel: t('breadcrumbs.label', {
            lng: language,
          }),
          items: [
            {
              label: t('breadcrumbs.home', {
                lng: language,
              }),
              to: getPageRoute('home', language),
            },
            {
              label: page.title,
              to: getPageRoute('research', language),
            },
            {
              label: publication.title,
            },
          ],
        }}
        eyebrow={eyebrow}
        title={publication.title}
        introduction={publication.publication}
      />

      <div className={cn('mx-auto w-full', 'max-w-editorial px-page', 'pb-12 sm:pb-14 lg:pb-16')}>
        <Section contained={false} className="border-border border-t py-12 sm:py-14 lg:py-16" aria-labelledby={`${idPrefix}-metadata-title`}>
          <SectionHeader className="mb-8">
            <SectionTitle id={`${idPrefix}-metadata-title`}>{page.publicationDetail.metadata}</SectionTitle>
          </SectionHeader>

          <Card className={cn('gap-0 overflow-hidden py-0', 'border-border-strong', 'bg-brand-background', 'shadow-subtle')}>
            <CardContent className="p-0">
              <dl className="divide-border m-0 divide-y">
                <PublicationMetadataRow label={page.publicationDetail.title}>
                  <strong className="text-brand-ink font-bold">{publication.title}</strong>
                </PublicationMetadataRow>

                <PublicationMetadataRow label={page.publicationDetail.journal}>
                  <span className="italic">{publication.publication}</span>
                </PublicationMetadataRow>

                <PublicationMetadataRow label={page.publicationDetail.authors}>
                  {authors.length > 0 ? (
                    <span>
                      {authors.map((author, index) => (
                        <span key={`${author.name}-${index}`}>
                          {index > 0 ? ', ' : null}

                          {author.href ? (
                            <a
                              href={author.href}
                              target={isExternalHref(author.href) ? '_blank' : undefined}
                              rel={isExternalHref(author.href) ? 'noreferrer' : undefined}
                              className={cn(
                                'font-medium',
                                'text-brand-primary',
                                'underline',
                                'decoration-transparent',
                                'underline-offset-4',
                                'transition-colors',
                                'hover:text-action-strong',
                                'hover:decoration-current',
                              )}
                            >
                              {author.name}
                            </a>
                          ) : (
                            author.name
                          )}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span aria-hidden="true" className="text-muted-foreground">
                      —
                    </span>
                  )}
                </PublicationMetadataRow>

                <PublicationMetadataRow label={page.publicationDetail.year}>
                  <Badge
                    variant="outline"
                    className={cn('border-brand-accent/50', 'bg-copper-soft px-3 py-1', 'font-mono font-semibold', 'text-copper-strong')}
                  >
                    <time dateTime={String(publication.year)}>{publication.year}</time>
                  </Badge>
                </PublicationMetadataRow>

                <PublicationMetadataRow label={page.publicationDetail.reference}>
                  {reference ? (
                    <span className="italic">{reference}</span>
                  ) : (
                    <span aria-hidden="true" className="text-muted-foreground">
                      —
                    </span>
                  )}
                </PublicationMetadataRow>

                <PublicationMetadataRow label={page.publicationDetail.contribution}>{publication.contribution}</PublicationMetadataRow>
              </dl>
            </CardContent>
          </Card>
        </Section>

        {hasDescription ? (
          <div className={cn('border-border border-t', 'pt-12 sm:pt-14 lg:pt-16')}>
            <DetailDescriptionSection description={publication.description} idPrefix={idPrefix} title={page.publicationDetail.description} />
          </div>
        ) : null}

        <PublicationResourcesSection resources={resources} title={page.publicationDetail.resources} titleId={`${idPrefix}-resources-title`} />

        <PublicationRelatedItemsSection
          groups={relatedGroups}
          title={page.publicationDetail.relatedItems}
          titleId={`${idPrefix}-related-items-title`}
        />

        <DetailNavigation
          ariaLabel={page.publicationDetail.navigationLabel}
          backLink={{
            label: page.publicationDetail.backLabel,
            to: getPageRoute('research', language),
          }}
          previousLabel={page.publicationDetail.previousLabel}
          nextLabel={page.publicationDetail.nextLabel}
          previousLink={
            previousPublication
              ? {
                  label: previousPublication.title,
                  secondaryLabel: previousPublication.publication,
                  to: getResearchPublicationRoute(previousPublication.id, language),
                }
              : undefined
          }
          nextLink={
            nextPublication
              ? {
                  label: nextPublication.title,
                  secondaryLabel: nextPublication.publication,
                  to: getResearchPublicationRoute(nextPublication.id, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ResearchPublicationDetailPage;
