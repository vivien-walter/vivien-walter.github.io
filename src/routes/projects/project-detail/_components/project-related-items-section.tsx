import { ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ProjectRelatedItem = {
  readonly id: string;
  readonly label: string;
  readonly to: string;
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

const relatedButtonClassName = cn(
  'h-auto min-h-11 w-full justify-between',
  'px-4 py-3 text-left whitespace-normal',
  'border-border-strong bg-brand-background',
  'text-brand-ink shadow-none',
  'hover:border-brand-primary',
  'hover:bg-action-soft hover:text-action-strong',
);

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
