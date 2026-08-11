import { ArrowRightIcon, CalendarBlankIcon } from '@phosphor-icons/react';
import type { ElementType } from 'react';
import { Link } from 'react-router-dom';

import { getSoftwareRoute } from '@/app/routing/navigation';
import { InteractiveCard } from '@/components/interactive-card';
import { Badge } from '@/components/ui/badge';
import type { SoftwareCatalogItem } from '@/content/software/catalog';
import { getSoftwareTags } from '@/content/software/tags';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

type CatalogEntryProps = {
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

export default function CatalogEntry({ software, language, technologiesLabel, viewLabel, headingLevel = 3 }: CatalogEntryProps) {
  const headingId = `software-catalog-${software.id}-title`;
  const Heading = `h${headingLevel}` as ElementType;
  const SoftwareIcon = software.icon;
  const tags = getSoftwareTags(software);

  return (
    <li className="m-0 min-w-0">
      <article className="min-w-0" aria-labelledby={headingId}>
        <Link
          to={getSoftwareRoute(software.id, language)}
          aria-label={`${viewLabel}: ${software.title}`}
          className="group block rounded-lg focus-visible:outline-none"
        >
          <InteractiveCard
            interaction="self"
            className="border-border-strong bg-brand-background shadow-subtle group-focus-visible:border-brand-primary group-focus-visible:bg-action-soft/70 group-focus-visible:shadow-elevated group-focus-visible:ring-brand-primary/30 gap-0 overflow-hidden rounded-lg py-0 group-focus-visible:ring-2"
          >
            <div className="grid min-w-0 sm:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[11rem_minmax(0,1fr)]">
              <div
                className={cn(
                  'relative flex min-h-36 items-center justify-center overflow-hidden sm:min-h-full',
                  software.heroImage
                    ? 'bg-brand-background'
                    : 'bg-action-soft text-brand-primary group-hover:bg-brand-primary group-hover:text-primary-foreground group-focus-within:bg-brand-primary group-focus-within:text-primary-foreground transition-colors duration-200',
                )}
              >
                {software.heroImage ? (
                  <img
                    src={software.heroImage.src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      objectPosition: software.heroImage.objectPosition ?? 'center',
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <SoftwareIcon aria-hidden="true" className="size-12" weight="regular" />
                )}
              </div>

              <div className="min-w-0 p-5 sm:p-6">
                <Heading id={headingId} className="!leading-heading text-brand-ink !m-0 !text-lg !font-bold !tracking-[-0.015em]">
                  {software.title}
                </Heading>

                <p className="leading-body text-muted-foreground !mt-3 !mb-0 text-sm sm:text-base">{software.summary}</p>

                <div data-slot="software-catalog-metadata" className="mt-5 flex min-w-0 items-center gap-3">
                  <time
                    dateTime={String(software.year)}
                    className="text-muted-foreground inline-flex shrink-0 items-center gap-1.5 font-mono text-xs font-semibold"
                  >
                    <CalendarBlankIcon aria-hidden="true" className="size-4" weight="regular" />

                    <span>{software.year}</span>
                  </time>

                  {tags.length > 0 ? (
                    <div className="min-w-0 flex-1 overflow-hidden">
                      {tagDisplays.map(({ limit, className }) => {
                        const visibleTags = tags.slice(0, limit);
                        const hiddenTagCount = tags.length - visibleTags.length;

                        return (
                          <ul
                            key={limit}
                            className={cn('!m-0 min-w-0 list-none flex-nowrap items-center gap-2 overflow-hidden !p-0', className)}
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
                  ) : (
                    <div className="min-w-0 flex-1" />
                  )}

                  <span
                    aria-hidden="true"
                    className="text-brand-primary ml-auto inline-flex min-h-10 shrink-0 items-center justify-end gap-2 rounded-md px-3 text-sm font-semibold transition-all"
                  >
                    <span className="ease-standard max-w-0 -translate-x-1 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover:max-w-40 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none">
                      {viewLabel}
                    </span>

                    <ArrowRightIcon aria-hidden="true" className="size-4" weight="bold" />
                  </span>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </Link>
      </article>
    </li>
  );
}
