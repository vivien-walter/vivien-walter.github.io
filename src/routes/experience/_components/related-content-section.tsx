import { ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type RelatedContentItem = {
  readonly id: string;
  readonly title: string;
  readonly to: string;
};

type RelatedContentGroup = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly RelatedContentItem[];
};

type RelatedContentSectionProps = {
  readonly idPrefix: string;
  readonly title: string;
  readonly groups: readonly RelatedContentGroup[];
};

function RelatedContentSection({ idPrefix, title, groups }: RelatedContentSectionProps) {
  const visibleGroups = groups.filter((group) => group.items.length > 0);

  if (visibleGroups.length === 0) {
    return null;
  }

  const titleId = `${idPrefix}-related-items-title`;

  return (
    <Section
      contained={false}
      className={cn('border-border border-t', 'pt-12 pb-6', 'sm:pt-14 sm:pb-8', 'lg:pt-16 lg:pb-10')}
      aria-labelledby={titleId}
    >
      <SectionHeader className="mb-8">
        <SectionTitle id={titleId}>{title}</SectionTitle>
      </SectionHeader>

      <div className="grid gap-10">
        {visibleGroups.map((group) => {
          const groupTitleId = `${idPrefix}-related-${group.id}-title`;

          return (
            <Section contained={false} key={group.id} aria-labelledby={groupTitleId}>
              <SectionHeader className="mb-4">
                <SectionTitle id={groupTitleId} headingLevel={3} showAccent={false}>
                  {group.title}
                </SectionTitle>
              </SectionHeader>

              <ul className={cn('m-0 grid list-none gap-3 p-0', 'sm:grid-cols-2')}>
                {group.items.map((item) => (
                  <li key={item.id} className="m-0 min-w-0">
                    <Button
                      asChild
                      variant="outline"
                      className={cn(
                        'h-auto min-h-11 w-full',
                        'justify-between whitespace-normal',
                        'border-border-strong bg-background',
                        'text-brand-ink px-4 py-3 text-left',
                        'shadow-none',
                        'hover:border-brand-primary',
                        'hover:bg-action-soft',
                        'hover:text-action-strong',
                      )}
                    >
                      <Link to={item.to}>
                        <span className="min-w-0">{item.title}</span>

                        <ArrowRightIcon aria-hidden="true" className="shrink-0" weight="bold" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </Section>
          );
        })}
      </div>
    </Section>
  );
}

export default RelatedContentSection;
