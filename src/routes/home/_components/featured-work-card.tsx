import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import { createElement, type ElementType } from 'react';
import { Link } from 'react-router-dom';

import { getProjectRoute, getSoftwareRoute } from '@/app/routing/navigation';
import { InteractiveCard } from '@/components/interactive-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { HomeFeaturedWork } from '@/content/home/home';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

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

  const content =
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
      <div className="grid gap-2">
        <p className="!m-0 text-sm">
          <span className="text-brand-ink font-semibold">{work.journal}</span>

          <span className="text-muted-foreground"> · </span>

          <time className="text-muted-foreground" dateTime={String(work.year)}>
            {work.year}
          </time>
        </p>

        <p className="text-muted-foreground !m-0 text-sm">{work.authors.join(', ')}</p>
      </div>
    );

  const footer =
    work.kind === 'project' ? (
      <Button asChild variant="ghost" className={cn('text-brand-primary min-h-10 px-2', 'hover:bg-action-soft hover:text-brand-primary')}>
        <Link to={getProjectRoute(work.contentId, language)}>
          {work.actionLabel}

          <ArrowRightIcon aria-hidden="true" weight="bold" />
        </Link>
      </Button>
    ) : work.kind === 'software' ? (
      <Button asChild variant="ghost" className={cn('text-brand-primary min-h-10 px-2', 'hover:bg-action-soft hover:text-brand-primary')}>
        <Link to={getSoftwareRoute(work.contentId, language)}>
          {work.actionLabel}

          <ArrowRightIcon aria-hidden="true" weight="bold" />
        </Link>
      </Button>
    ) : (
      <Button asChild variant="ghost" className={cn('text-brand-primary min-h-10 px-2', 'hover:bg-action-soft hover:text-brand-primary')}>
        <a href={work.href} target="_blank" rel="noreferrer">
          {work.actionLabel}

          <ArrowUpRightIcon aria-hidden="true" weight="bold" />
        </a>
      </Button>
    );

  return (
    <article className="h-full min-w-0" aria-labelledby={headingId}>
      <InteractiveCard
        interaction="self"
        className={cn('h-full gap-0 overflow-hidden rounded-sm py-0', 'border-border-strong bg-brand-background', 'shadow-subtle')}
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
                className: cn('leading-heading !m-0 text-lg font-bold', 'text-brand-ink tracking-[-0.015em]', 'sm:text-xl'),
              },
              work.title,
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-6 sm:px-6">{content}</CardContent>

        <CardFooter className={cn('mt-auto flex min-h-16', 'items-center justify-end', 'border-border border-t px-5 py-3 sm:px-6')}>
          {footer}
        </CardFooter>
      </InteractiveCard>
    </article>
  );
}

export default FeaturedWorkCard;
