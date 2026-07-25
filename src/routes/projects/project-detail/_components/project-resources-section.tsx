import { ArrowUpRightIcon, type Icon } from '@phosphor-icons/react';

import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ProjectResource = {
  readonly icon: Icon;
  readonly label: string;
  readonly href: string;
};

type ProjectResourcesSectionProps = {
  readonly resources?: readonly ProjectResource[];
  readonly title: string;
  readonly titleId: string;
};

function isExternalResource(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function ProjectResourcesSection({ resources, title, titleId }: ProjectResourcesSectionProps) {
  const visibleResources = resources?.filter((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? [];

  if (visibleResources.length === 0) {
    return null;
  }

  return (
    <Section contained={false} className={cn('border-border border-t', 'py-12 sm:py-14 lg:py-16')} aria-labelledby={titleId}>
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id={titleId}>{title}</SectionTitle>
      </SectionHeader>

      <ul className={cn('m-0 grid list-none gap-4 p-0', 'sm:grid-cols-2 lg:grid-cols-3')}>
        {visibleResources.map((resource, index) => {
          const ResourceIcon = resource.icon;

          const isExternal = isExternalResource(resource.href);

          return (
            <li key={`${resource.href}-${index}`} className="m-0 min-w-0">
              <a
                href={resource.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                data-external={isExternal ? 'true' : undefined}
                className={cn(
                  'group block h-full rounded-lg',
                  'text-brand-ink no-underline',
                  'focus-visible:outline-none',
                  'focus-visible:ring-[3px]',
                  'focus-visible:ring-ring/50',
                  'focus-visible:ring-offset-2',
                )}
              >
                <Card
                  className={cn(
                    'h-full gap-0 rounded-lg py-0',
                    'border-border-strong',
                    'bg-brand-background',
                    'shadow-subtle',
                    'transition-[transform,border-color,background-color,box-shadow]',
                    'ease-standard duration-200',
                    'group-hover:-translate-y-1',
                    'group-hover:border-brand-primary',
                    'group-hover:bg-action-soft',
                    'group-hover:shadow-elevated',
                  )}
                >
                  <div className={cn('grid min-h-20 min-w-0', 'grid-cols-[auto_minmax(0,1fr)_auto]', 'items-center gap-4 p-5', 'sm:p-6')}>
                    <span
                      aria-hidden="true"
                      className={cn('flex size-10 shrink-0', 'items-center justify-center', 'rounded-md', 'bg-brand-primary', 'text-white')}
                    >
                      <ResourceIcon className="size-5" weight="regular" />
                    </span>

                    <span
                      className={cn(
                        'min-w-0 font-semibold',
                        'leading-heading',
                        'text-brand-ink',
                        'transition-colors',
                        'group-hover:text-action-strong',
                      )}
                    >
                      {resource.label}
                    </span>

                    {isExternal ? (
                      <ArrowUpRightIcon
                        aria-hidden="true"
                        className={cn(
                          'size-5 shrink-0',
                          'text-brand-primary',
                          'transition-transform',
                          'ease-standard duration-150',
                          'group-hover:-translate-y-0.5',
                          'group-hover:translate-x-0.5',
                        )}
                        weight="bold"
                      />
                    ) : null}
                  </div>
                </Card>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export default ProjectResourcesSection;
