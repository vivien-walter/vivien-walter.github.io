import { ArrowRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { createElement, type ElementType } from 'react';
import { Link } from 'react-router-dom';

import { getExperienceRoute, getProjectRoute } from '@/app/routing/navigation';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { ExperienceId } from '@/content/experience/registry';
import type { ProjectId } from '@/content/projects/registry';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

type TimelineRelatedProject = {
  readonly id: ProjectId;
  readonly title: string;
};

type TimelineExperience = {
  readonly id: ExperienceId;
  readonly role: string;
  readonly organization: string;
  readonly location?: string;
  readonly period: {
    readonly start: string;
    readonly end?: string;
  };
  readonly parallelActivity: boolean;
  readonly summary: string;
  readonly relatedProjects: readonly TimelineRelatedProject[];
};

type TimelineEntryProps = {
  readonly experience: TimelineExperience;
  readonly language: SupportedLanguage;
  readonly viewExperienceLabel: string;
  readonly relatedProjectsLabel: string;
  readonly parallelActivityLabel: string;
  readonly headingLevel?: 2 | 3;
  readonly isFirst?: boolean;
  readonly isLast?: boolean;
};

function formatExperienceYears(start: string, end: string | undefined): string {
  const startYear = /^\d{4}/.exec(start)?.[0] ?? start;

  if (!end) {
    return startYear;
  }

  const endYear = /^\d{4}/.exec(end)?.[0] ?? end;

  return startYear === endYear ? startYear : `${startYear} – ${endYear}`;
}

function TimelineEntry({
  experience,
  language,
  viewExperienceLabel,
  relatedProjectsLabel,
  parallelActivityLabel,
  headingLevel = 3,
  isFirst = false,
  isLast = false,
}: TimelineEntryProps) {
  const headingId = `experience-${experience.id}-title`;

  const Heading = `h${headingLevel}` as ElementType;

  return (
    <article
      className={cn(
        'relative grid min-w-0 gap-4 py-8',
        'first:pt-0 last:pb-0',
        'md:grid-cols-[8.5rem_2.5rem_minmax(0,1fr)]',
        'md:gap-x-5 md:gap-y-0',
      )}
      aria-labelledby={headingId}
    >
      <div className="md:pt-1">
        <p className={cn('!m-0 font-mono text-sm font-semibold', 'leading-heading text-brand-primary')}>
          {formatExperienceYears(experience.period.start, experience.period.end)}
        </p>

        {experience.parallelActivity ? (
          <p className={cn('!mt-1 !mb-0 text-xs font-medium', 'leading-heading text-muted-foreground')}>{parallelActivityLabel}</p>
        ) : null}
      </div>

      <div
        aria-hidden="true"
        className={cn('relative hidden w-px self-stretch', 'justify-self-center md:block', '-my-8', isFirst && 'mt-0', isLast && 'mb-0')}
      >
        <span className={cn('absolute inset-y-0 left-0 w-px', 'bg-brand-primary/35', isFirst && 'top-3.5', isLast && 'bottom-auto h-[2.875rem]')} />

        <span
          className={cn(
            'absolute left-1/2 size-4',
            'z-10 -translate-x-1/2 rounded-full',
            'border-brand-background border-4',
            'bg-brand-primary ring-border-strong ring-1',
            isFirst ? 'top-1.5' : 'top-[2.375rem]',
          )}
        />
      </div>

      <div className={cn('grid min-w-0 gap-6', 'lg:grid-cols-[minmax(0,1fr)_auto]')}>
        <div className="min-w-0">
          <header className="min-w-0">
            {createElement(
              Heading,
              {
                id: headingId,
                className: cn('leading-heading !m-0 text-lg font-bold', 'text-brand-ink tracking-[-0.015em]'),
              },
              <Link
                to={getExperienceRoute(experience.id, language)}
                className={cn(
                  'text-inherit no-underline',
                  'transition-colors duration-150',
                  'hover:text-brand-primary',
                  'focus-visible:rounded-sm',
                  'focus-visible:outline-none',
                  'focus-visible:ring-[3px]',
                  'focus-visible:ring-ring/50',
                )}
              >
                {experience.role}
              </Link>,
            )}

            <p className={cn('!mt-1 !mb-0 font-semibold', 'leading-heading text-brand-primary')}>{experience.organization}</p>

            {experience.location ? <p className="text-muted-foreground !mt-1 !mb-0 text-sm">{experience.location}</p> : null}
          </header>

          <p className={cn('max-w-readable !mt-4 !mb-0', 'text-foreground')}>{experience.summary}</p>
        </div>

        <div className={cn('flex min-w-0 flex-col items-stretch gap-2', 'sm:items-start lg:w-52 lg:items-stretch')}>
          <Button asChild className="min-h-11 w-full justify-between">
            <Link to={getExperienceRoute(experience.id, language)}>
              <span className="min-w-0 text-left whitespace-nowrap">{viewExperienceLabel}</span>

              <ArrowRightIcon aria-hidden="true" className="shrink-0" weight="bold" />
            </Link>
          </Button>

          {experience.relatedProjects.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'min-h-11 w-full cursor-pointer justify-between',
                    'text-brand-primary',
                    'hover:bg-action-soft',
                    'hover:text-action-strong',
                    'data-[state=open]:bg-action-soft',
                    'data-[state=open]:text-action-strong',
                  )}
                >
                  <span className="min-w-0 text-left whitespace-normal">{relatedProjectsLabel}</span>

                  <MagnifyingGlassIcon aria-hidden="true" className="shrink-0" weight="bold" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={6}
                className={cn('min-w-64', 'max-w-[calc(100vw-2rem)]', 'border-border-strong', 'shadow-elevated')}
              >
                {experience.relatedProjects.map((project) => (
                  <DropdownMenuItem
                    asChild
                    key={project.id}
                    className={cn(
                      'min-h-11 cursor-pointer',
                      'px-3 py-2',
                      'text-brand-ink font-medium',
                      'focus:bg-action-soft',
                      'focus:text-action-strong',
                    )}
                  >
                    <Link to={getProjectRoute(project.id, language)} className="no-underline">
                      <span className="min-w-0">{project.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default TimelineEntry;
