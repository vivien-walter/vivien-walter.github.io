import { ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type PublicationRelatedItem = {
  readonly id: string;
  readonly label: string;
  readonly to: string;
};

export type PublicationRelatedGroup = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly PublicationRelatedItem[];
};

type PublicationRelatedItemsSectionProps = {
  readonly groups?: readonly PublicationRelatedGroup[];
  readonly title: string;
  readonly titleId: string;
};

const relatedButtonClassName = cn(
  'h-auto min-h-11 w-full justify-between',
  'px-4 py-3 text-left whitespace-normal',
  'border-border-strong bg-brand-background',
  'text-brand-ink shadow-none',
  'hover:border-brand-primary',
  'hover:bg-action-soft hover:text-action-strong',
);

const relatedListClassName = cn('m-0 grid list-none gap-3 p-0', 'sm:grid-cols-2');

function PublicationRelatedItemsSection({ groups, title, titleId }: PublicationRelatedItemsSectionProps) {
  const visibleGroups =
    groups
      ?.map((group) => ({
        ...group,
        items: group.items.filter((item) => item.id.trim().length > 0 && item.label.trim().length > 0 && item.to.trim().length > 0),
      }))
      .filter((group) => group.title.trim().length > 0 && group.items.length > 0) ?? [];

  if (visibleGroups.length === 0) {
    return null;
  }

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
          const groupTitleId = `${titleId}-${group.id}`;

          return (
            <Section contained={false} key={group.id} aria-labelledby={groupTitleId}>
              <SectionHeader className="mb-4">
                <SectionTitle id={groupTitleId} headingLevel={3} showAccent={false}>
                  {group.title}
                </SectionTitle>
              </SectionHeader>

              <ul className={relatedListClassName}>
                {group.items.map((item) => (
                  <li key={item.id} className="m-0 min-w-0">
                    <Button asChild variant="outline" className={relatedButtonClassName}>
                      <Link to={item.to}>
                        <span className="min-w-0">{item.label}</span>

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

export default PublicationRelatedItemsSection;
