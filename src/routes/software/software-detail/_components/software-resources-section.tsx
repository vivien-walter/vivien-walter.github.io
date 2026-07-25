import type { Icon } from '@phosphor-icons/react';

import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type SoftwareResource = {
  readonly icon: Icon;
  readonly label: string;
  readonly href: string;
};

type SoftwareResourcesSectionProps = {
  readonly resources?: readonly SoftwareResource[];
  readonly title: string;
  readonly titleId: string;
};

function isExternalResource(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function SoftwareResourcesSection({ resources, title, titleId }: SoftwareResourcesSectionProps) {
  const visibleResources = resources?.filter((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? [];

  if (visibleResources.length === 0) {
    return null;
  }

  return (
    <Section contained={false} className={cn('border-border border-t', 'py-12 sm:py-14 lg:py-16')} aria-labelledby={titleId}>
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id={titleId}>{title}</SectionTitle>
      </SectionHeader>

      <ul className={cn('m-0 grid list-none gap-5 p-0', 'sm:grid-cols-2 lg:grid-cols-3')}>
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
                    'h-full min-h-40 gap-0',
                    'rounded-lg py-0',
                    'border-border-strong',
                    'bg-brand-background',
                    'shadow-none',
                    'transition-[transform,border-color,background-color,box-shadow]',
                    'ease-standard duration-200',
                    'group-hover:-translate-y-1',
                    'group-hover:border-brand-primary',
                    'group-hover:bg-action-soft/70',
                    'group-hover:shadow-elevated',
                    'group-hover:ring-2',
                    'group-hover:ring-brand-primary/30',
                  )}
                >
                  <span
                    className={cn(
                      'flex flex-1 items-center',
                      'justify-center',
                      'px-5 pt-7 pb-4',
                      'text-brand-primary',
                      'transition-colors',
                      'duration-200',
                      'group-hover:text-brand-dark',
                    )}
                  >
                    <ResourceIcon aria-hidden="true" className="size-12" weight="regular" />
                  </span>

                  <span
                    className={cn(
                      'flex min-h-14',
                      'items-center justify-center',
                      'px-5 py-3',
                      'text-center font-semibold',
                      'leading-heading',
                      'text-brand-ink',
                      'transition-colors',
                      'duration-200',
                      'group-hover:text-brand-primary',
                    )}
                  >
                    {resource.label}
                  </span>
                </Card>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export default SoftwareResourcesSection;
