import { ArrowRightIcon, CaretRightIcon, type Icon } from '@phosphor-icons/react';
import { createElement, type ElementType } from 'react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import type { ResearchThemeId } from '@/content/research/registry';
import { cn } from '@/lib/utils';

type ResearchThemeCardImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

type ResearchThemeCardContent = {
  readonly id: ResearchThemeId;
  readonly icon: Icon;
  readonly title: string;
  readonly introduction: string;
  readonly heroImage?: ResearchThemeCardImage;
};

type ResearchThemeCardProps = {
  readonly theme: ResearchThemeCardContent;
  readonly to: string;
  readonly isSelected: boolean;
  readonly viewMoreLabel: string;
  readonly onSelect: () => void;
  readonly headingLevel?: 2 | 3;
};

export default function ResearchThemeCard({ theme, to, isSelected, viewMoreLabel, onSelect, headingLevel = 2 }: ResearchThemeCardProps) {
  const headingId = `research-theme-${theme.id}-title`;

  const Heading = `h${headingLevel}` as ElementType;

  const ThemeIcon = theme.icon;

  return (
    <li
      className={cn(
        'ease-standard m-0 w-full min-w-0 transition-[flex-grow,flex-basis] duration-200 motion-reduce:transition-none lg:flex lg:min-h-64 lg:w-auto lg:items-center',
        isSelected ? 'lg:flex-[1_1_0%]' : 'lg:flex-[0_0_4rem]',
      )}
    >
      {!isSelected ? (
        <button
          type="button"
          aria-label={theme.title}
          aria-pressed={false}
          title={theme.title}
          onClick={onSelect}
          className="border-brand-primary bg-brand-primary shadow-subtle ease-standard hover:bg-brand-dark hover:shadow-elevated focus-visible:ring-ring/50 flex min-h-16 w-full cursor-pointer items-center gap-4 rounded-lg border px-4 text-left text-white transition-[transform,background-color,box-shadow] duration-150 focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:size-16 lg:shrink-0 lg:justify-center lg:px-0 lg:hover:-translate-y-1"
        >
          <ThemeIcon aria-hidden="true" className="size-8 shrink-0" weight="regular" />

          <span className="min-w-0 flex-1 font-semibold lg:hidden">{theme.title}</span>

          <CaretRightIcon aria-hidden="true" className="size-5 shrink-0 lg:!hidden" weight="bold" />
        </button>
      ) : (
        <article className="w-full min-w-0 lg:flex-1" aria-labelledby={headingId}>
          <Link to={to} aria-label={`${viewMoreLabel}: ${theme.title}`} className="group block rounded-lg focus-visible:outline-none">
            <InteractiveCard
              interaction="self"
              className="border-border-strong shadow-subtle group-focus-visible:border-brand-primary group-focus-visible:ring-brand-primary/30 relative isolate min-h-0 gap-0 overflow-hidden rounded-lg bg-transparent py-0 group-focus-visible:ring-2 hover:bg-transparent lg:min-h-64"
            >
              {theme.heroImage ? (
                <>
                  <img
                    src={theme.heroImage.src}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
                    style={{
                      objectPosition: theme.heroImage.objectPosition ?? 'center',
                    }}
                  />

                  <span
                    aria-hidden="true"
                    className="bg-brand-background/90 group-hover:bg-action-soft/90 pointer-events-none absolute inset-0 z-[1] transition-colors duration-150"
                  />
                </>
              ) : (
                <span
                  aria-hidden="true"
                  className="bg-brand-background group-hover:bg-action-soft/70 pointer-events-none absolute inset-0 z-[1] transition-colors duration-150"
                />
              )}

              <div className="animate-in fade-in relative z-10 flex min-w-0 flex-col p-5 duration-200 motion-reduce:animate-none sm:p-6 lg:min-h-64">
                <div className="flex min-w-0 items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="bg-brand-primary shadow-subtle group-hover:bg-brand-dark flex size-16 shrink-0 items-center justify-center rounded-lg text-white transition-colors duration-150"
                  >
                    <ThemeIcon className="size-8" weight="regular" />
                  </span>

                  {createElement(
                    Heading,
                    {
                      id: headingId,
                      className:
                        '!m-0 min-w-0 !text-lg !font-bold !leading-heading !tracking-[-0.0125em] text-brand-ink transition-colors duration-150 group-hover:text-brand-primary sm:!text-xl',
                    },
                    theme.title,
                  )}
                </div>

                <p className="leading-body text-muted-foreground !mt-6 !mb-0 w-full text-base">{theme.introduction}</p>

                <div className="mt-auto flex justify-end pt-6">
                  <span aria-hidden="true" className="text-brand-primary inline-flex min-h-11 items-center justify-end gap-2 px-3 font-semibold">
                    <span className="ease-standard max-w-0 -translate-x-1 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover:max-w-40 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none">
                      {viewMoreLabel}
                    </span>

                    <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
                  </span>
                </div>
              </div>
            </InteractiveCard>
          </Link>
        </article>
      )}
    </li>
  );
}
