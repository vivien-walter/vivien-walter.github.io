import { ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type RelatedItem = {
  readonly id: string;
  readonly label: string;
  readonly to: string;
  readonly secondaryText?: string;
  readonly badges?: readonly string[];
};

export type RelatedItemsGroup = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly RelatedItem[];
};

type RelatedItemsSectionProps = {
  readonly title: string;
  readonly titleId: string;
  readonly groups: readonly RelatedItemsGroup[];
  readonly variant?: 'card' | 'button';
};

function RelatedCardItem({ item }: { readonly item: RelatedItem }) {
  return (
    <Link
      to={item.to}
      className="group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <InteractiveCard className="border-border-strong bg-brand-background shadow-subtle h-full gap-0 rounded-lg py-0">
        <div className="grid min-h-20 min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="leading-heading text-brand-ink !m-0 font-semibold">{item.label}</p>

            {item.secondaryText?.trim() ? <p className="text-muted-foreground !mt-2 !mb-0 text-sm">{item.secondaryText}</p> : null}

            {item.badges && item.badges.length > 0 ? (
              <ul className="!mt-3 !mb-0 flex list-none flex-wrap gap-2 !p-0">
                {item.badges.map((badge) => (
                  <li key={badge} className="!m-0">
                    <Badge
                      variant="secondary"
                      className="border-border bg-brand-hero text-muted-foreground rounded-full border px-3 py-1 font-mono font-medium"
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
            className="text-brand-primary ease-standard size-5 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
            weight="bold"
          />
        </div>
      </InteractiveCard>
    </Link>
  );
}

function RelatedButtonItem({ item }: { readonly item: RelatedItem }) {
  return (
    <Button
      asChild
      variant="outline"
      className="border-border-strong bg-brand-background text-brand-ink hover:border-brand-primary hover:bg-action-soft hover:text-action-strong h-auto min-h-11 w-full justify-between px-4 py-3 text-left whitespace-normal shadow-none"
    >
      <Link to={item.to}>
        <span className="min-w-0">{item.label}</span>

        <ArrowRightIcon aria-hidden="true" className="shrink-0" weight="bold" />
      </Link>
    </Button>
  );
}

function RelatedItemsSection({ title, titleId, groups, variant = 'card' }: RelatedItemsSectionProps) {
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.id.trim().length > 0 && item.label.trim().length > 0 && item.to.trim().length > 0),
    }))
    .filter((group) => group.title.trim().length > 0 && group.items.length > 0);

  if (visibleGroups.length === 0) {
    return null;
  }

  return (
    <Section contained={false} className="pt-12 pb-6 sm:pt-14 sm:pb-8 lg:pt-16 lg:pb-10" aria-labelledby={titleId}>
      <SectionHeader className="mb-8 sm:mb-10">
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

              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item.id} className="m-0 min-w-0">
                    {variant === 'button' ? <RelatedButtonItem item={item} /> : <RelatedCardItem item={item} />}
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

export default RelatedItemsSection;
