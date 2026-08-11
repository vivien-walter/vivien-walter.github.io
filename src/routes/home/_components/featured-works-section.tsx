import { ArrowRightIcon } from '@phosphor-icons/react';
import { createElement, type ElementType } from 'react';
import { Link } from 'react-router-dom';

import { getProjectRoute, getResearchPublicationRoute, getSoftwareRoute } from '@/app/routing/navigation';
import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { HomeFeaturedWork, HomeFeaturedWorksContent } from '@/content/home/home';
import type { SupportedLanguage } from '@/types/localization';

type FeaturedWorksSectionProps = {
  readonly content: HomeFeaturedWorksContent;
  readonly language: SupportedLanguage;
};

type FeaturedWorkCardProps = {
  readonly work: HomeFeaturedWork;
  readonly language: SupportedLanguage;
  readonly headingLevel?: 2 | 3;
};

type FeaturedProjectPeriod = Extract<HomeFeaturedWork, { readonly kind: 'project' }>['period'];

const maximumVisibleTechnologies = 3;

const localeByLanguage = {
  fr: 'fr-FR',
  en: 'en-GB',
} satisfies Readonly<Record<SupportedLanguage, string>>;

function formatDate(value: string, language: SupportedLanguage): string {
  const yearMatch = /^(\d{4})$/.exec(value);

  if (yearMatch) {
    return value;
  }

  const monthMatch = /^(\d{4})-(\d{2})$/.exec(value);

  if (monthMatch) {
    const [, year, month] = monthMatch;
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));

    return new Intl.DateTimeFormat(localeByLanguage[language], {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  }

  const dayMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (dayMatch) {
    const [, year, month, day] = dayMatch;
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

    return new Intl.DateTimeFormat(localeByLanguage[language], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  }

  return value;
}

function formatDateRange(period: FeaturedProjectPeriod, language: SupportedLanguage): string {
  const start = formatDate(period.start, language);

  if (!period.end) {
    return start;
  }

  return `${start} – ${formatDate(period.end, language)}`;
}

function FeaturedWorkCard({ work, language, headingLevel = 3 }: FeaturedWorkCardProps) {
  const Heading = `h${headingLevel}` as ElementType;
  const headingId = `featured-${work.kind}-${work.contentId}-title`;

  const route =
    work.kind === 'project'
      ? getProjectRoute(work.contentId, language)
      : work.kind === 'software'
        ? getSoftwareRoute(work.contentId, language)
        : getResearchPublicationRoute(work.contentId, language);

  const cardContent =
    work.kind === 'project' ? (
      <div className="grid gap-2">
        <p className="text-brand-ink !m-0 text-sm font-semibold">{work.employer}</p>

        <p className="text-muted-foreground !m-0 text-sm">{work.role}</p>

        <p className="text-muted-foreground !m-0 font-mono text-sm">{formatDateRange(work.period, language)}</p>
      </div>
    ) : work.kind === 'software' ? (
      <div className="grid gap-4">
        <p className="text-muted-foreground !m-0 font-mono text-sm font-medium">{work.primaryLanguage}</p>

        {work.technologies.length > 0 ? (
          <ul className="!m-0 flex list-none flex-wrap gap-2 !p-0">
            {work.technologies.slice(0, maximumVisibleTechnologies).map((technology) => (
              <li key={technology} className="!m-0">
                <Badge variant="secondary" className="border-border bg-brand-hero text-muted-foreground border px-3 py-1 font-mono font-medium">
                  {technology}
                </Badge>
              </li>
            ))}

            {work.technologies.length > maximumVisibleTechnologies ? (
              <li className="!m-0">
                <Badge variant="outline" className="border-border-strong bg-brand-background text-brand-primary px-3 py-1 font-mono font-semibold">
                  +{work.technologies.length - maximumVisibleTechnologies}
                </Badge>
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>
    ) : (
      <p className="!m-0 text-sm">
        <span className="text-brand-ink font-semibold">{work.journal}</span>

        <span className="text-muted-foreground"> · </span>

        <time className="text-muted-foreground" dateTime={String(work.year)}>
          {work.year}
        </time>
      </p>
    );

  return (
    <article className="h-full min-w-0" aria-labelledby={headingId}>
      <Link to={route} aria-label={`${work.actionLabel}: ${work.title}`} className="group block h-full rounded-sm focus-visible:outline-none">
        <InteractiveCard
          interaction="self"
          className="border-border-strong bg-brand-background shadow-subtle group-focus-visible:border-brand-primary group-focus-visible:bg-action-soft/70 group-focus-visible:shadow-elevated group-focus-visible:ring-brand-primary/30 h-full gap-0 overflow-hidden rounded-sm py-0 group-focus-visible:ring-2"
        >
          {work.image ? (
            <div className="bg-muted aspect-[16/9] overflow-hidden">
              <img
                src={work.image.src}
                alt={work.image.alt}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: work.image.objectPosition ?? 'center',
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}

          <CardHeader className="gap-4 px-5 py-5 sm:px-6 sm:py-6">
            <Badge
              variant="outline"
              className="border-brand-primary/35 bg-brand-background text-brand-primary w-fit shrink-0 font-mono text-xs font-semibold"
            >
              {work.kindLabel}
            </Badge>

            <CardTitle>
              {createElement(
                Heading,
                {
                  id: headingId,
                  className: 'leading-heading !m-0 text-lg font-bold text-brand-ink tracking-[-0.015em] sm:text-xl',
                },
                work.title,
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-5 pb-6 sm:px-6">{cardContent}</CardContent>

          <CardFooter className="mt-auto flex min-h-16 items-center justify-end px-5 py-3 sm:px-6">
            <span aria-hidden="true" className="text-brand-primary inline-flex items-center justify-end gap-2 font-semibold">
              <span className="ease-standard max-w-0 -translate-x-1 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover:max-w-48 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:max-w-48 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none">
                {work.actionLabel}
              </span>

              <ArrowRightIcon aria-hidden="true" weight="bold" />
            </span>
          </CardFooter>
        </InteractiveCard>
      </Link>
    </article>
  );
}

export default function FeaturedWorksSection({ content, language }: FeaturedWorksSectionProps) {
  if (content.items.length === 0) {
    return null;
  }

  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="home-featured-works-title">
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id="home-featured-works-title">{content.title}</SectionTitle>

        <SectionDescription>{content.description}</SectionDescription>
      </SectionHeader>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {content.items.map((work, index) => (
          <FeaturedWorkCard key={`featured-work-${index}`} work={work} language={language} />
        ))}
      </div>
    </Section>
  );
}
