import { ArrowUpRightIcon, InfoIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { Section, SectionHeader, SectionTitle } from './section';

export type DetailTechnologyItem = {
  readonly label: string;
  readonly href?: string;
  readonly description?: string;
};

export type DetailTechnologyGroup = {
  readonly title: string;
  readonly items: readonly DetailTechnologyItem[];
};

type DetailTechnologiesSectionProps = {
  readonly externalLinkLabel: string;
  readonly groups?: readonly DetailTechnologyGroup[];
  readonly idPrefix: string;
  readonly title: string;
};

type TechnologyDescriptionBadgeProps = {
  readonly item: DetailTechnologyItem;
  readonly popoverId: string;
};

const badgeClassName = cn(
  'inline-flex min-h-9 max-w-full items-center gap-2',
  'border-border-strong rounded-full border',
  'bg-brand-hero px-3 py-1.5',
  'leading-heading font-mono text-sm font-medium',
  'text-brand-ink no-underline',
);

function TechnologyDescriptionBadge({ item, popoverId }: TechnologyDescriptionBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.description) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div
        className="inline-flex max-w-full"
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
        onFocus={() => {
          setIsOpen(true);
        }}
        onBlur={() => {
          setIsOpen(false);
        }}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              badgeClassName,
              'cursor-help outline-none',
              'transition-[border-color,background-color,color]',
              'ease-standard duration-150',
              'hover:border-brand-primary hover:bg-action-soft',
              'hover:text-action-strong',
              'focus-visible:border-brand-primary',
              'focus-visible:ring-[3px]',
              'focus-visible:ring-ring/50',
            )}
            aria-describedby={isOpen ? popoverId : undefined}
          >
            <span className="min-w-0 break-words">{item.label}</span>

            <InfoIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          id={popoverId}
          role="tooltip"
          align="start"
          side="top"
          sideOffset={8}
          className={cn(
            'w-80 max-w-[calc(100vw-2rem)]',
            'border-border-strong',
            'bg-brand-background',
            'leading-body text-brand-ink text-sm',
            'shadow-elevated',
          )}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <p className="!m-0">{item.description}</p>
        </PopoverContent>
      </div>
    </Popover>
  );
}

function DetailTechnologiesSection({ externalLinkLabel, groups, idPrefix, title }: DetailTechnologiesSectionProps) {
  const populatedGroups = groups?.filter((group) => group.items.length > 0) ?? [];

  if (populatedGroups.length === 0) {
    return null;
  }

  const titleId = `${idPrefix}-technologies-title`;

  return (
    <Section contained={false} className={cn('border-border border-t', 'py-12 sm:py-14 lg:py-16')} aria-labelledby={titleId}>
      <SectionHeader className="mb-8">
        <SectionTitle id={titleId}>{title}</SectionTitle>
      </SectionHeader>

      <div className="grid gap-8">
        {populatedGroups.map((group, groupIndex) => {
          const groupTitleId = `${idPrefix}-technology-group-` + `${groupIndex + 1}`;

          return (
            <Section contained={false} key={`${group.title}-${groupIndex}`} className="grid gap-4" aria-labelledby={groupTitleId}>
              <SectionHeader>
                <SectionTitle id={groupTitleId} headingLevel={3} showAccent={false} className="text-lg tracking-[-0.0125em]">
                  {group.title}
                </SectionTitle>
              </SectionHeader>

              <ul className={cn('m-0 flex list-none flex-wrap', 'items-center gap-2 p-0')}>
                {group.items.map((item, itemIndex) => {
                  const itemKey = `${groupIndex}-` + `${itemIndex}-` + item.label;

                  return (
                    <li key={itemKey} className="m-0 max-w-full">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            badgeClassName,
                            'transition-[border-color,background-color,color]',
                            'ease-standard duration-150',
                            'hover:border-brand-primary',
                            'hover:bg-action-soft',
                            'hover:text-action-strong',
                            'focus-visible:outline-none',
                            'focus-visible:ring-[3px]',
                            'focus-visible:ring-ring/50',
                          )}
                          aria-label={`${item.label} — ` + externalLinkLabel}
                        >
                          <span className="min-w-0 break-words">{item.label}</span>

                          <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
                        </a>
                      ) : item.description ? (
                        <TechnologyDescriptionBadge
                          item={item}
                          popoverId={`${idPrefix}-technology-description-` + `${groupIndex + 1}-` + `${itemIndex + 1}`}
                        />
                      ) : (
                        <span className={badgeClassName}>
                          <span className="min-w-0 break-words">{item.label}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Section>
          );
        })}
      </div>
    </Section>
  );
}

export default DetailTechnologiesSection;
