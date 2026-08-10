import { ArrowRightIcon, type Icon } from '@phosphor-icons/react';
import { createElement, type ElementType, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import { Button } from '@/components/ui/button';
import type { ResearchThemeId } from '@/content/research/registry';

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
      <button
        type="button"
        aria-label={theme.title}
        aria-pressed={false}
        title={theme.title}
        onClick={onSelect}
        className="border-brand-primary bg-brand-primary shadow-subtle ease-standard hover:bg-brand-dark hover:shadow-elevated focus-visible:ring-ring/50 flex size-16 shrink-0 items-center justify-center rounded-lg border text-white transition-[transform,background-color,box-shadow] duration-150 hover:-translate-y-1 focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <ThemeIcon aria-hidden="true" className="size-8" weight="regular" />
      </button>
    );
  }

  return (
    <article className="min-w-0 flex-1" aria-labelledby={headingId}>
      <InteractiveCard
        interaction="self"
        className="group border-border-strong shadow-subtle relative isolate min-h-64 gap-0 overflow-hidden rounded-lg bg-transparent py-0 hover:bg-transparent"
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

        {showContent ? (
          <div className="animate-in fade-in relative z-10 flex min-h-64 min-w-0 flex-col p-5 duration-150 motion-reduce:animate-none sm:p-6">
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
              <Button asChild variant="ghost" className="text-brand-primary hover:bg-action-soft hover:text-action-strong min-h-11 px-3">
                <Link to={to}>
                  <span>{viewMoreLabel}</span>

                  <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div aria-hidden="true" className="relative z-10 flex min-h-64 items-start justify-start p-5 sm:p-6">
            <span className="bg-brand-primary shadow-subtle flex size-16 shrink-0 items-center justify-center rounded-lg text-white">
              <ThemeIcon className="size-8" weight="regular" />
            </span>
          </div>
        )}
      </InteractiveCard>
    </article>
  );
}

export default ResearchThemeCard;
