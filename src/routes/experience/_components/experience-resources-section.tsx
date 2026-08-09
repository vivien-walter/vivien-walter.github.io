import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionHeader, SectionTitle } from '@/components/section';
import type { ExperienceCatalogItem, ParallelActivityCatalogItem } from '@/content/experience/catalog';
import { cn } from '@/lib/utils';

type ExperienceResourcesSectionProps = {
  readonly resources?: ExperienceCatalogItem['resources'] | ParallelActivityCatalogItem['resources'];
  readonly title: string;
  readonly titleId: string;
};

function ExperienceResourcesSection({ resources, title, titleId }: ExperienceResourcesSectionProps) {
  const visibleResources = resources?.filter((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? [];

  if (visibleResources.length === 0) {
    return null;
  }

  const linkClassName = cn(
    'group block h-full rounded-lg',
    'text-brand-ink no-underline',
    'focus-visible:outline-none',
    'focus-visible:ring-[3px]',
    'focus-visible:ring-ring/50',
    'focus-visible:ring-offset-2',
  );

  return (
    <Section contained={false} className="border-border border-t py-12 sm:py-14 lg:py-16" aria-labelledby={titleId}>
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id={titleId}>{title}</SectionTitle>
      </SectionHeader>

      <ul className={cn('m-0 grid list-none gap-5 p-0', 'sm:grid-cols-2 lg:grid-cols-3')}>
        {visibleResources.map((resource) => {
          const ResourceIcon = resource.icon;

          const LinkIndicatorIcon = resource.isExternal ? ArrowUpRightIcon : ArrowRightIcon;

          const card = (
            <InteractiveCard className={cn('h-full min-h-40 gap-0', 'rounded-lg py-0', 'border-border-strong', 'bg-brand-background shadow-none')}>
              <span
                className={cn(
                  'text-brand-primary',
                  'group-hover:text-brand-dark',
                  'flex flex-1 items-center justify-center',
                  'px-5 pt-7 pb-4',
                  'transition-colors duration-200',
                )}
              >
                <ResourceIcon aria-hidden="true" className="size-12" weight="regular" />
              </span>

              <span
                className={cn(
                  'flex min-h-14 items-center justify-center',
                  'gap-2 px-5 py-3 text-center',
                  'leading-heading font-semibold',
                  'text-brand-ink',
                  'transition-colors duration-200',
                  'group-hover:text-brand-primary',
                )}
              >
                <span>{resource.label}</span>

                <LinkIndicatorIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
              </span>
            </InteractiveCard>
          );

          return (
            <li key={resource.href} className="m-0 min-w-0">
              {resource.isExternal ? (
                <a href={resource.href} target="_blank" rel="noopener noreferrer" data-external="true" className={linkClassName}>
                  {card}
                </a>
              ) : (
                <Link to={resource.href} className={linkClassName}>
                  {card}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export default ExperienceResourcesSection;
