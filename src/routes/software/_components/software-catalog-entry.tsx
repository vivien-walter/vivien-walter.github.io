import { ArrowRightIcon, CalendarBlankIcon } from '@phosphor-icons/react';
import type { ElementType } from 'react';
import { Link } from 'react-router-dom';

import { getSoftwareRoute } from '@/app/routing/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { SoftwareCatalogItem } from '@/content/software/catalog';
import { getSoftwareTags } from '@/content/software/tags';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

type SoftwareCatalogEntryProps = {
  readonly software: SoftwareCatalogItem;
  readonly language: SupportedLanguage;
  readonly technologiesLabel: string;
  readonly viewLabel: string;
  readonly headingLevel?: 2 | 3;
};

const tagDisplays = [
  {
    limit: 2,
    className: 'flex sm:hidden',
  },
  {
    limit: 3,
    className: 'hidden sm:flex lg:hidden',
  },
  {
    limit: 5,
    className: 'hidden lg:flex',
  },
] as const;

function SoftwareCatalogEntry({ software, language, technologiesLabel, viewLabel, headingLevel = 3 }: SoftwareCatalogEntryProps) {
  const headingId = `software-catalog-${software.id}-title`;

  const Heading = `h${headingLevel}` as ElementType;

  const SoftwareIcon = software.icon;
  const tags = getSoftwareTags(software);

  return (
    <article className="min-w-0" aria-labelledby={headingId}>
      <Card className="group border-border-strong bg-brand-background shadow-subtle ease-standard hover:border-brand-primary hover:bg-action-soft/70 hover:shadow-elevated hover:ring-brand-primary/30 focus-within:border-brand-primary focus-within:bg-action-soft/70 focus-within:shadow-elevated focus-within:ring-brand-primary/30 gap-0 overflow-hidden rounded-lg py-0 transition-[border-color,background-color,box-shadow] duration-200 focus-within:ring-2 hover:ring-2">
        <div className="grid min-w-0 sm:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[11rem_minmax(0,1fr)_13rem]">
          <div className="bg-action-soft text-brand-primary group-hover:bg-brand-primary group-hover:text-primary-foreground group-focus-within:bg-brand-primary group-focus-within:text-primary-foreground flex min-h-36 items-center justify-center transition-colors duration-200 sm:row-span-2 sm:min-h-full lg:row-span-1">
            <SoftwareIcon aria-hidden="true" className="size-12" weight="regular" />
          </div>

          <div className="min-w-0 p-5 sm:p-6">
            <Heading id={headingId} className="!leading-heading text-brand-ink !m-0 !text-lg !font-bold !tracking-[-0.015em]">
              {software.title}
            </Heading>

            <p className="leading-body text-muted-foreground !mt-3 !mb-0 text-sm sm:text-base">{software.summary}</p>

            {tags.length > 0 ? (
              <div className="mt-5 min-w-0 overflow-hidden">
                {tagDisplays.map(({ limit, className }) => {
                  const visibleTags = tags.slice(0, limit);
                  const hiddenTagCount = tags.length - visibleTags.length;

                  return (
                    <ul
                      key={limit}
                      className={cn('!m-0 min-w-0', 'list-none flex-nowrap', 'items-center gap-2 !p-0', 'overflow-hidden', className)}
                      aria-label={technologiesLabel}
                    >
                      {visibleTags.map((tag) => (
                        <li key={tag} className="!m-0 shrink-0">
                          <Badge
                            variant="secondary"
                            className="border-border bg-brand-hero text-muted-foreground border px-3 py-1 font-mono font-medium"
                          >
                            {tag}
                          </Badge>
                        </li>
                      ))}

                      {hiddenTagCount > 0 ? (
                        <li className="!m-0 shrink-0">
                          <Badge
                            variant="outline"
                            className="border-border-strong bg-brand-background text-brand-primary px-3 py-1 font-mono font-semibold"
                            aria-label={`${technologiesLabel}: +${hiddenTagCount}`}
                          >
                            +{hiddenTagCount}
                          </Badge>
                        </li>
                      ) : null}
                    </ul>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="flex min-w-0 flex-col items-stretch gap-4 p-5 sm:col-start-2 sm:px-6 lg:col-start-auto lg:px-5 lg:py-6">
            <Button asChild className="min-h-11 w-full justify-between">
              <Link to={getSoftwareRoute(software.id, language)}>
                {viewLabel}

                <ArrowRightIcon aria-hidden="true" weight="bold" />
              </Link>
            </Button>

            <div data-slot="software-catalog-metadata" className="mt-auto flex min-h-10 items-center justify-end pt-4">
              <time
                dateTime={String(software.year)}
                className="text-muted-foreground inline-flex items-center gap-1.5 font-mono text-xs font-semibold"
              >
                <CalendarBlankIcon aria-hidden="true" className="size-4" weight="regular" />

                <span>{software.year}</span>
              </time>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}

export default SoftwareCatalogEntry;
