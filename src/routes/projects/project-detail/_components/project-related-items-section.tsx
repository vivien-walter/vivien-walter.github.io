import { ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type ProjectRelatedItem = {
  readonly id: string;
  readonly label: string;
  readonly to: string;
  readonly secondaryText?: string;
  readonly badges?: readonly string[];
};

type ProjectRelatedItemsSectionProps = {
  readonly title: string;
  readonly titleId: string;
  readonly experiencesTitle: string;
  readonly softwareTitle: string;
  readonly publicationsTitle: string;
  readonly experiences?: readonly ProjectRelatedItem[];
  readonly software?: readonly ProjectRelatedItem[];
  readonly publications?: readonly ProjectRelatedItem[];
};

const relatedListClassName = cn('m-0 grid list-none gap-3 p-0', 'sm:grid-cols-2');

type RelatedItemsGroupProps = {
  readonly items: readonly ProjectRelatedItem[];
  readonly title: string;
  readonly titleId: string;
};

function RelatedItemsGroup({ items, title, titleId }: RelatedItemsGroupProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section contained={false} aria-labelledby={titleId}>
      <SectionHeader className="mb-4">
        <SectionTitle id={titleId} headingLevel={3} showAccent={false}>
          {title}
        </SectionTitle>
      </SectionHeader>

      <ul className={relatedListClassName}>
        {items.map((item) => (
          <li key={item.id} className="m-0 min-w-0">
            <Link
              to={item.to}
              className={cn(
                'group block h-full rounded-lg',
                'text-brand-ink no-underline',
                'focus-visible:outline-none',
                'focus-visible:ring-[3px]',
                'focus-visible:ring-ring/50',
                'focus-visible:ring-offset-2',
              )}
            >
              <InteractiveCard className={cn('h-full gap-0 rounded-lg py-0', 'border-border-strong bg-brand-background', 'shadow-subtle')}>
                <div className={cn('grid min-h-20 min-w-0', 'grid-cols-[minmax(0,1fr)_auto]', 'items-center gap-4 p-5', 'sm:p-6')}>
                  <div className="min-w-0">
                    <p className="leading-heading text-brand-ink !m-0 font-semibold">{item.label}</p>

                    {item.secondaryText?.trim() ? <p className="text-muted-foreground !mt-2 !mb-0 text-sm">{item.secondaryText}</p> : null}

                    {item.badges && item.badges.length > 0 ? (
                      <ul className="!mt-3 !mb-0 flex list-none flex-wrap gap-2 !p-0">
                        {item.badges.map((badge) => (
                          <li key={badge} className="!m-0">
                            <Badge
                              variant="secondary"
                              className={cn(
                                'border-border rounded-full border',
                                'bg-brand-hero px-3 py-1',
                                'font-mono font-medium',
                                'text-muted-foreground',
                              )}
                            >
                              {badge}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <ArrowRightIcon
                    aria-hidden="true"
                    className={cn(
                      'text-brand-primary size-5 shrink-0',
                      'ease-standard transition-transform duration-150',
                      'group-hover:translate-x-1',
                    )}
                    weight="bold"
                  />
                </div>
              </InteractiveCard>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ProjectRelatedItemsSection({
  title,
  titleId,
  experiencesTitle,
  softwareTitle,
  publicationsTitle,
  experiences = [],
  software = [],
  publications = [],
}: ProjectRelatedItemsSectionProps) {
  const hasRelatedItems = experiences.length > 0 || software.length > 0 || publications.length > 0;

  if (!hasRelatedItems) {
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
        <RelatedItemsGroup title={experiencesTitle} titleId={`${titleId}-experiences`} items={experiences} />

        <RelatedItemsGroup title={softwareTitle} titleId={`${titleId}-software`} items={software} />

        <RelatedItemsGroup title={publicationsTitle} titleId={`${titleId}-publications`} items={publications} />
      </div>
    </Section>
  );
}

export default ProjectRelatedItemsSection;
