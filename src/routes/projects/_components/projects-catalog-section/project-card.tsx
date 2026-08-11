import { CalendarBlankIcon, CodeIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { getProjectRoute } from '@/app/routing/navigation';
import { InteractiveCard } from '@/components/interactive-card';
import { Badge } from '@/components/ui/badge';
import type { ProjectId } from '@/content/projects/registry';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

type ProjectCardContent = {
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

type ProjectCardLabels = {
  readonly period: string;
  readonly ongoing: string;
  readonly languages: string;
  readonly technologies: string;
};

type ProjectCardProps = {
  readonly project: ProjectCardContent;
  readonly language: SupportedLanguage;
  readonly labels: ProjectCardLabels;
};

const maximumVisibleTechnologies = 3;

function formatProjectYears(period: ProjectCardContent['period'], ongoingLabel: string): string | undefined {
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

export default function ProjectCard({ project, language, labels }: ProjectCardProps) {
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
        className="group focus-visible:ring-ring/50 block rounded-lg text-inherit no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <InteractiveCard
          interaction="group"
          className={cn(
            'border-border-strong bg-brand-background grid gap-0 overflow-hidden rounded-lg py-0 shadow-none',
            hasMetadata && 'md:grid-cols-[minmax(0,1fr)_13rem]',
          )}
        >
          <div className="min-w-0 p-5 sm:p-6">
            <h2
              id={headingId}
              className="leading-heading text-brand-ink ease-standard group-hover:text-brand-primary !m-0 text-xl font-bold tracking-[-0.025em] transition-colors duration-150"
            >
              {project.title}
            </h2>

            <p className="max-w-readable text-foreground !mt-4 !mb-0">{project.summary}</p>

            {visibleTechnologies.length > 0 ? (
              <ul className="!mt-5 !mb-0 flex list-none flex-wrap gap-2 !p-0" aria-label={labels.technologies}>
                {visibleTechnologies.map((technology) => (
                  <li key={technology} className="!m-0">
                    <Badge variant="secondary" className="border-border bg-muted text-muted-foreground border px-3 py-1 font-mono font-medium">
                      {technology}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {hasMetadata ? (
            <dl className="border-border bg-brand-hero/45 !m-0 grid content-start gap-6 border-t p-5 md:border-t-0 md:border-l">
              {period ? (
                <div className="m-0 grid gap-2">
                  <dt className="text-muted-foreground flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.04em] uppercase">
                    <CalendarBlankIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />

                    {labels.period}
                  </dt>

                  <dd className="leading-heading text-brand-ink m-0 text-sm font-semibold">{period}</dd>
                </div>
              ) : null}

              {programmingLanguages.length > 0 ? (
                <div className="m-0 grid gap-3">
                  <dt className="text-muted-foreground flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.04em] uppercase">
                    <CodeIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />

                    {labels.languages}
                  </dt>

                  <dd className="m-0">
                    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                      {programmingLanguages.map((programmingLanguage) => (
                        <li key={programmingLanguage} className="m-0">
                          <Badge
                            variant="outline"
                            className="border-brand-primary/35 bg-background text-brand-primary font-mono text-xs font-semibold"
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
        </InteractiveCard>
      </Link>
    </article>
  );
}
