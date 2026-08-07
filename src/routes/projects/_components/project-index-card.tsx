import { CalendarBlankIcon, CodeIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { getProjectRoute } from '@/app/routing/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { ProjectId } from '@/content/projects/registry';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

type ProjectIndexCardContent = {
  readonly id: ProjectId;
  readonly title: string;
  readonly summary: string;
  readonly period?: {
    readonly start: string;
    readonly end?: string;
  };
  readonly programmingLanguages?: readonly string[];
  readonly technologies?: readonly string[];
};

type ProjectIndexCardLabels = {
  readonly period: string;
  readonly ongoing: string;
  readonly languages: string;
  readonly technologies: string;
};

type ProjectIndexCardProps = {
  readonly project: ProjectIndexCardContent;
  readonly language: SupportedLanguage;
  readonly labels: ProjectIndexCardLabels;
};

const maximumVisibleTechnologies = 3;

function formatProjectYears(period: ProjectIndexCardContent['period'], ongoingLabel: string): string | undefined {
  if (!period) {
    return undefined;
  }

  const startYear = /^\d{4}/.exec(period.start)?.[0] ?? period.start;

  if (!period.end) {
    return `${startYear} - ${ongoingLabel}`;
  }

  const endYear = /^\d{4}/.exec(period.end)?.[0] ?? period.end;

  return startYear === endYear ? startYear : `${startYear} – ${endYear}`;
}

function ProjectIndexCard({ project, language, labels }: ProjectIndexCardProps) {
  const headingId = `project-index-${project.id}-title`;

  const period = formatProjectYears(project.period, labels.ongoing);

  const programmingLanguages = project.programmingLanguages ?? [];

  const programmingLanguageSet = new Set(programmingLanguages);

  const visibleTechnologies = (project.technologies ?? [])
    .filter((technology) => !programmingLanguageSet.has(technology))
    .slice(0, maximumVisibleTechnologies);

  const hasMetadata = period !== undefined || programmingLanguages.length > 0;

  return (
    <article className="min-w-0" aria-labelledby={headingId}>
      <Link
        to={getProjectRoute(project.id, language)}
        className={cn(
          'group block rounded-lg',
          'text-inherit no-underline',
          'focus-visible:outline-none',
          'focus-visible:ring-[3px]',
          'focus-visible:ring-ring/50',
          'focus-visible:ring-offset-2',
        )}
      >
        <Card
          className={cn(
            'grid gap-0 overflow-hidden',
            'rounded-lg py-0',
            'border-border-strong',
            'bg-brand-background shadow-none',
            'transition-[transform,border-color,background-color,box-shadow]',
            'ease-standard duration-200',
            'group-hover:-translate-y-1',
            'group-hover:border-brand-primary',
            'group-hover:bg-action-soft/70',
            'group-hover:shadow-elevated',
            'group-hover:ring-2',
            'group-hover:ring-brand-primary/30',
            hasMetadata && 'md:grid-cols-[minmax(0,1fr)_13rem]',
          )}
        >
          <div className="min-w-0 p-5 sm:p-6">
            <h2
              id={headingId}
              className={cn(
                '!m-0 text-xl font-bold',
                'leading-heading',
                'tracking-[-0.025em]',
                'text-brand-ink',
                'transition-colors',
                'ease-standard duration-150',
                'group-hover:text-brand-primary',
              )}
            >
              {project.title}
            </h2>

            <p className={cn('!mt-4 !mb-0', 'max-w-readable', 'text-foreground')}>{project.summary}</p>

            {visibleTechnologies.length > 0 ? (
              <ul className={cn('!mt-5 !mb-0 flex', 'list-none flex-wrap gap-2 !p-0')} aria-label={labels.technologies}>
                {visibleTechnologies.map((technology) => (
                  <li key={technology} className="!m-0">
                    <Badge
                      variant="secondary"
                      className={cn('border-border border', 'bg-muted px-3 py-1', 'font-mono font-medium', 'text-muted-foreground')}
                    >
                      {technology}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {hasMetadata ? (
            <dl className={cn('!m-0 grid content-start gap-6', 'border-border border-t', 'bg-brand-hero/45 p-5', 'md:border-t-0 md:border-l')}>
              {period ? (
                <div className="m-0 grid gap-2">
                  <dt
                    className={cn(
                      'flex items-center gap-2',
                      'font-mono text-xs',
                      'font-semibold uppercase',
                      'tracking-[0.04em]',
                      'text-muted-foreground',
                    )}
                  >
                    <CalendarBlankIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />

                    {labels.period}
                  </dt>

                  <dd className={cn('m-0 text-sm font-semibold', 'leading-heading', 'text-brand-ink')}>{period}</dd>
                </div>
              ) : null}

              {programmingLanguages.length > 0 ? (
                <div className="m-0 grid gap-3">
                  <dt
                    className={cn(
                      'flex items-center gap-2',
                      'font-mono text-xs',
                      'font-semibold uppercase',
                      'tracking-[0.04em]',
                      'text-muted-foreground',
                    )}
                  >
                    <CodeIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />

                    {labels.languages}
                  </dt>

                  <dd className="m-0">
                    <ul className={cn('m-0 flex list-none', 'flex-wrap gap-2 p-0')}>
                      {programmingLanguages.map((programmingLanguage) => (
                        <li key={programmingLanguage} className="m-0">
                          <Badge
                            variant="outline"
                            className={cn('border-brand-primary/35', 'bg-background', 'font-mono text-xs', 'font-semibold', 'text-brand-primary')}
                          >
                            {programmingLanguage}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </Card>
      </Link>
    </article>
  );
}

export default ProjectIndexCard;
