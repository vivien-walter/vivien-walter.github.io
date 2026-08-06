import { ArrowRightIcon, type Icon } from '@phosphor-icons/react';
import { createElement, type ElementType, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import { Button } from '@/components/ui/button';
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

const selectorClassName = cn(
  'flex size-16 shrink-0',
  'items-center justify-center',
  'rounded-lg border',
  'border-brand-primary',
  'bg-brand-primary text-white',
  'shadow-subtle',
  'transition-[transform,background-color,box-shadow]',
  'ease-standard duration-150',
  'hover:-translate-y-1',
  'hover:bg-brand-dark',
  'hover:shadow-elevated',
  'focus-visible:outline-none',
  'focus-visible:ring-[3px]',
  'focus-visible:ring-ring/50',
  'focus-visible:ring-offset-2',
  'motion-reduce:hover:translate-y-0',
  'motion-reduce:transition-none',
);

function ResearchThemeCard({ theme, to, isSelected, viewMoreLabel, onSelect, headingLevel = 2 }: ResearchThemeCardProps) {
  const headingId = `research-theme-${theme.id}-title`;

  const Heading = `h${headingLevel}` as ElementType;

  const ThemeIcon = theme.icon;

  const [showContent, setShowContent] = useState(isSelected);

  useEffect(() => {
    if (!isSelected) {
      setShowContent(false);

      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowContent(true);
    }, 180);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSelected]);

  if (!isSelected) {
    return (
      <button type="button" aria-label={theme.title} aria-pressed={false} title={theme.title} onClick={onSelect} className={selectorClassName}>
        <ThemeIcon aria-hidden="true" className="size-8" weight="regular" />
      </button>
    );
  }

  return (
    <article className="min-w-0 flex-1" aria-labelledby={headingId}>
      <InteractiveCard
        interaction="self"
        className={cn(
          'group relative isolate',
          'min-h-64 gap-0 overflow-hidden py-0',
          'border-border-strong rounded-lg',
          'shadow-subtle bg-transparent',
          'hover:bg-transparent',
        )}
      >
        {theme.heroImage ? (
          <>
            <img
              src={theme.heroImage.src}
              alt=""
              aria-hidden="true"
              className={cn('pointer-events-none absolute inset-0 z-0', 'h-full w-full object-cover')}
              style={{
                objectPosition: theme.heroImage.objectPosition ?? 'center',
              }}
            />

            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0 z-[1]',
                'bg-brand-background/90',
                'transition-colors duration-150',
                'group-hover:bg-action-soft/90',
              )}
            />
          </>
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 z-[1]',
              'bg-brand-background',
              'transition-colors duration-150',
              'group-hover:bg-action-soft/70',
            )}
          />
        )}

        {showContent ? (
          <div
            className={cn(
              'relative z-10 flex min-h-64',
              'min-w-0 flex-col',
              'p-5 sm:p-6',
              'animate-in fade-in',
              'duration-150',
              'motion-reduce:animate-none',
            )}
          >
            <div className="flex min-w-0 items-start gap-4">
              <span
                aria-hidden="true"
                className={cn(
                  'flex size-16 shrink-0',
                  'items-center justify-center',
                  'rounded-lg',
                  'bg-brand-primary text-white',
                  'shadow-subtle',
                  'transition-colors duration-150',
                  'group-hover:bg-brand-dark',
                )}
              >
                <ThemeIcon className="size-8" weight="regular" />
              </span>

              {createElement(
                Heading,
                {
                  id: headingId,
                  className: cn(
                    '!m-0 min-w-0',
                    '!text-lg !font-bold',
                    '!leading-heading',
                    '!tracking-[-0.0125em]',
                    'text-brand-ink',
                    'transition-colors duration-150',
                    'group-hover:text-brand-primary',
                    'sm:!text-xl',
                  ),
                },
                theme.title,
              )}
            </div>

            <p className={cn('!mt-6 !mb-0 w-full', 'leading-body text-base', 'text-muted-foreground')}>{theme.introduction}</p>

            <div className="mt-auto flex justify-end pt-6">
              <Button
                asChild
                variant="ghost"
                className={cn('min-h-11 px-3', 'text-brand-primary', 'hover:bg-action-soft', 'hover:text-action-strong')}
              >
                <Link to={to}>
                  <span>{viewMoreLabel}</span>

                  <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div aria-hidden="true" className={cn('relative z-10 flex min-h-64', 'items-start justify-start', 'p-5 sm:p-6')}>
            <span
              className={cn('flex size-16 shrink-0', 'items-center justify-center', 'rounded-lg', 'bg-brand-primary text-white', 'shadow-subtle')}
            >
              <ThemeIcon className="size-8" weight="regular" />
            </span>
          </div>
        )}
      </InteractiveCard>
    </article>
  );
}

export default ResearchThemeCard;
