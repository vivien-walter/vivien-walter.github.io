import { ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { getParallelActivityRoute } from '@/app/routing/navigation';
import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import type { ParallelActivityCatalogItem } from '@/content/experience/catalog';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

type ParallelActivitiesSectionProps = {
  readonly title: string;
  readonly description?: string;
  readonly items: readonly ParallelActivityCatalogItem[];
  readonly language: SupportedLanguage;
  readonly actionLabel: string;
};

function ParallelActivitiesSection({ title, description, items, language, actionLabel }: ParallelActivitiesSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section contained={false} className="border-border border-t py-12 sm:py-14 lg:py-16" aria-labelledby="parallel-activities-title">
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id="parallel-activities-title">{title}</SectionTitle>

        {description ? <SectionDescription>{description}</SectionDescription> : null}
      </SectionHeader>

      <ul className={cn('m-0 grid list-none gap-5 p-0', 'md:grid-cols-3')}>
        {items.map((item) => {
          const ActivityIcon = item.icon;
          const titleId = `parallel-activity-${item.id}-title`;

          return (
            <li key={item.id} className="m-0 min-w-0">
              <Link
                to={getParallelActivityRoute(item.id, language)}
                className={cn(
                  'group block h-full rounded-lg',
                  'text-inherit no-underline',
                  'focus-visible:outline-none',
                  'focus-visible:ring-[3px]',
                  'focus-visible:ring-ring/50',
                  'focus-visible:ring-offset-2',
                )}
                aria-labelledby={titleId}
              >
                <InteractiveCard className={cn('h-full gap-0 overflow-hidden py-0', 'border-border-strong', 'bg-brand-background shadow-subtle')}>
                  <div className={cn('flex h-full min-w-0 flex-col', 'p-6 sm:p-7')}>
                    <ActivityIcon
                      aria-hidden="true"
                      className={cn('text-brand-primary size-11', 'transition-colors duration-150', 'group-hover:text-action-strong')}
                      weight="regular"
                    />

                    <h3
                      id={titleId}
                      className={cn(
                        '!mt-5 !mb-0 text-lg font-bold',
                        'leading-heading tracking-[-0.015em]',
                        'text-brand-ink',
                        'transition-colors duration-150',
                        'group-hover:text-brand-primary',
                      )}
                    >
                      {item.title}
                    </h3>

                    <p className={cn('!mt-4 !mb-0', 'text-foreground')}>{item.summary}</p>

                    <span
                      className={cn(
                        'text-brand-primary mt-auto',
                        'flex items-center gap-2 pt-6',
                        'font-semibold',
                        'transition-colors duration-150',
                        'group-hover:text-action-strong',
                      )}
                    >
                      <span>{actionLabel}</span>

                      <ArrowRightIcon
                        aria-hidden="true"
                        className={cn('size-4 shrink-0', 'transition-transform', 'ease-standard duration-150', 'group-hover:translate-x-1')}
                        weight="bold"
                      />
                    </span>
                  </div>
                </InteractiveCard>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export default ParallelActivitiesSection;
