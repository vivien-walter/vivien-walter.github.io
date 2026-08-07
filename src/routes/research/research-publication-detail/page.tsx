import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { type ReactNode, useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getExperienceById } from '@/content/experience/page';
import { getProjectById } from '@/content/projects/catalog';
import { getResearchPageContent } from '@/content/research/page';
import {
  getResearchPublicationDetailById,
  getResearchPublicationNavigation,
  getResearchPublicationPageContent,
} from '@/content/research/publications/page';
import { getResearchThemeById } from '@/content/research/themes/catalog';
import { getSoftwareById } from '@/content/software/catalog';
import { cn } from '@/lib/utils';
import NotFoundPage from '@/routes/not-found/page';

import PublicationActions from './_components/publication-actions';
import PublicationRelatedItemsSection, { type PublicationRelatedGroup } from './_components/publication-related-items-section';
import PublicationResourcesSection from './_components/publication-resources-section';

type PublicationMetadataRowProps = {
  readonly label: string;
  readonly children: ReactNode;
};

type ReferenceCopyState = 'idle' | 'copied' | 'error';

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

function ResearchPublicationDetailPage() {
  const location = useLocation();

  const { slug } = useParams<{
    slug: string;
  }>();

  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getResearchPageContent(language);

  const detail = getResearchPublicationPageContent(language);

  const publication = slug ? getResearchPublicationDetailById(language, slug) : undefined;

  const [referenceCopyState, setReferenceCopyState] = useState<ReferenceCopyState>('idle');

  useEffect(() => {
    setReferenceCopyState('idle');
  }, [publication?.id]);

  if (!publication) {
    return <NotFoundPage />;
  }

  const reference = publication.reference;

  async function handleCopyReference(reference: string) {
    try {
      await navigator.clipboard.writeText(reference);
      setReferenceCopyState('copied');
    } catch {
      setReferenceCopyState('error');
    }
  }

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

  const relatedSoftware = publication.softwareIds.flatMap((softwareId) => {
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
      title: detail.relatedThemes,
      items: relatedThemes,
    },
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
      id: 'experiences',
      title: detail.relatedExperiences,
      items: relatedExperiences,
    },
  ];

  const { previous: previousPublication, next: nextPublication } = getResearchPublicationNavigation(language, publication.id);

  const defaultEyebrow = publication.kind === 'article' ? detail.articleEyebrow : detail.thesisEyebrow;

  const eyebrow = publication.eyebrow ?? defaultEyebrow;

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
              label: page.breadcrumbLabel,
              to: getPageRoute('research', language),
            },
            {
              label: publication.breadcrumbLabel,
            },
          ],
        }}
        eyebrow={eyebrow}
        title={publication.title}
      />

      <div className={cn('mx-auto w-full', 'max-w-editorial px-page', 'pb-12 sm:pb-14 lg:pb-16')}>
        <Section contained={false} className="border-border border-t py-12 sm:py-14 lg:py-16" aria-labelledby={`${idPrefix}-metadata-title`}>
          <SectionHeader className="mb-8">
            <SectionTitle id={`${idPrefix}-metadata-title`}>{detail.metadata}</SectionTitle>
          </SectionHeader>

          <Card className={cn('gap-0 overflow-hidden py-0', 'border-border-strong', 'bg-brand-background', 'shadow-subtle')}>
            <CardContent className="p-0">
              <dl className="divide-border m-0 divide-y">
                <PublicationMetadataRow label={detail.title}>
                  <strong className="text-brand-ink font-bold">{publication.title}</strong>
                </PublicationMetadataRow>

                {publication.publication ? (
                  <PublicationMetadataRow label={detail.journal}>
                    <span className="italic">{publication.publication}</span>
                  </PublicationMetadataRow>
                ) : null}

                <PublicationMetadataRow label={detail.authors}>
                  {publication.authors.length > 0 ? (
                    <span>
                      {publication.authors.map((author, index) => (
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

                <PublicationMetadataRow label={detail.year}>
                  <Badge
                    variant="outline"
                    className={cn('border-brand-accent/50', 'bg-copper-soft px-3 py-1', 'font-mono font-semibold', 'text-copper-strong')}
                  >
                    <time dateTime={String(publication.year)}>{publication.year}</time>
                  </Badge>
                </PublicationMetadataRow>

                <PublicationMetadataRow label={detail.reference}>
                  {reference ? (
                    <div className="flex min-w-0 items-start gap-2">
                      <span className="min-w-0 flex-1 italic">{reference}</span>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          void handleCopyReference(reference);
                        }}
                        aria-label={detail.copyReference}
                        title={detail.copyReference}
                        className="text-muted-foreground hover:text-brand-primary"
                      >
                        {referenceCopyState === 'copied' ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
                      </Button>

                      <span className="sr-only" aria-live="polite">
                        {referenceCopyState === 'copied' ? detail.referenceCopied : referenceCopyState === 'error' ? detail.referenceCopyError : ''}
                      </span>
                    </div>
                  ) : (
                    <span aria-hidden="true" className="text-muted-foreground">
                      —
                    </span>
                  )}
                </PublicationMetadataRow>
              </dl>
            </CardContent>
          </Card>
        </Section>

        {hasDescription && publication.description ? (
          <div className={cn('border-border border-t', 'pt-12 sm:pt-14 lg:pt-16')}>
            <DetailDescriptionSection description={publication.description} idPrefix={idPrefix} title={detail.description} />
          </div>
        ) : null}

        <PublicationActions
          website={publication.website}
          pdf={publication.pdf}
          websiteLabel={detail.publicationWebsite}
          pdfLabel={detail.downloadPdf}
        />

        <PublicationResourcesSection resources={publication.resources} title={detail.resources} titleId={`${idPrefix}-resources-title`} />

        <PublicationRelatedItemsSection groups={relatedGroups} title={detail.relatedItems} titleId={`${idPrefix}-related-items-title`} />

        <DetailNavigation
          className="mt-8 sm:mt-10"
          ariaLabel={detail.navigationLabel}
          backLink={{
            label: detail.backLabel,
            to: getPageRoute('research', language),
          }}
          previousLabel={detail.previousLabel}
          nextLabel={detail.nextLabel}
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
      </div>
    </article>
  );
}

export default ResearchPublicationDetailPage;
