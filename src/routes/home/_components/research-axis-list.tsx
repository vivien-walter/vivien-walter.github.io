import { ArrowRightIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getResearchThemeRoute } from '@/app/routing/navigation';
import { Button } from '@/components/ui/button';
import type { HomeResearchAxis } from '@/content/home/home';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

type ResearchAxisListProps = {
  readonly items: readonly HomeResearchAxis[];
  readonly language: SupportedLanguage;
};

const automaticRotationDelay = 8000;

function ResearchAxisList({ items, language }: ResearchAxisListProps) {
  const { t } = useTranslation();

  const viewportRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLLIElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const maximumStartIndex = useMemo(() => Math.max(0, items.length - visibleCount), [items.length, visibleCount]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstItem = firstItemRef.current;

    if (!viewport || !firstItem) {
      return;
    }

    const updateVisibleCount = () => {
      const viewportWidth = viewport.getBoundingClientRect().width;
      const itemWidth = firstItem.getBoundingClientRect().width;

      if (viewportWidth <= 0 || itemWidth <= 0) {
        return;
      }

      const nextVisibleCount = Math.max(1, Math.min(3, Math.round(viewportWidth / itemWidth)));

      setVisibleCount(nextVisibleCount);
    };

    updateVisibleCount();

    const resizeObserver = new ResizeObserver(updateVisibleCount);

    resizeObserver.observe(viewport);
    resizeObserver.observe(firstItem);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateReducedMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateReducedMotionPreference();

    mediaQuery.addEventListener('change', updateReducedMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', updateReducedMotionPreference);
    };
  }, []);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, maximumStartIndex));
  }, [maximumStartIndex]);

  useEffect(() => {
    if (items.length <= visibleCount || maximumStartIndex === 0 || isPaused || prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index >= maximumStartIndex ? 0 : index + 1));
    }, automaticRotationDelay);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPaused, items.length, maximumStartIndex, prefersReducedMotion, visibleCount]);

  const goToPrevious = () => {
    setCurrentIndex((index) => (index <= 0 ? maximumStartIndex : index - 1));
  };

  const goToNext = () => {
    setCurrentIndex((index) => (index >= maximumStartIndex ? 0 : index + 1));
  };

  const translatePercentage = currentIndex * (100 / visibleCount);

  const hasNavigation = maximumStartIndex > 0;

  return (
    <div
      className={cn('group/carousel relative min-w-0', hasNavigation && 'px-12 sm:px-14 lg:px-0')}
      onMouseEnter={() => {
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
      }}
      onFocusCapture={() => {
        setIsPaused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      {hasNavigation ? (
        <>
          <Button
            type="button"
            variant="outline"
            onClick={goToPrevious}
            aria-label={t('accessibility.previousResearchAxis', {
              lng: language,
            })}
            className={cn(
              'absolute top-1/2 left-0 z-10',
              'size-11 -translate-y-1/2 cursor-pointer rounded-full p-0',
              'border-border-strong',
              'bg-brand-background/95',
              'text-brand-primary shadow-subtle',
              'backdrop-blur-sm',
              'opacity-0',
              'transition-[opacity,border-color,background-color]',
              'duration-150 ease-out',
              'group-hover/carousel:opacity-100',
              'hover:border-brand-primary',
              'hover:bg-action-soft',
              'hover:text-brand-primary',
              'hover:opacity-100',
              'focus-visible:opacity-100',
              'lg:-left-5',
            )}
          >
            <CaretLeftIcon aria-hidden="true" className="size-5" weight="bold" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={goToNext}
            aria-label={t('accessibility.nextResearchAxis', {
              lng: language,
            })}
            className={cn(
              'absolute top-1/2 right-0 z-10',
              'size-11 -translate-y-1/2 cursor-pointer rounded-full p-0',
              'border-border-strong',
              'bg-brand-background/95',
              'text-brand-primary shadow-subtle',
              'backdrop-blur-sm',
              'opacity-0',
              'transition-[opacity,border-color,background-color]',
              'duration-150 ease-out',
              'group-hover/carousel:opacity-100',
              'hover:border-brand-primary',
              'hover:bg-action-soft',
              'hover:text-brand-primary',
              'hover:opacity-100',
              'focus-visible:opacity-100',
              'lg:-right-5',
            )}
          >
            <CaretRightIcon aria-hidden="true" className="size-5" weight="bold" />
          </Button>
        </>
      ) : null}

      <div ref={viewportRef} className="overflow-hidden" aria-labelledby="home-research-axes-title">
        <ul
          className={cn('m-0 flex list-none p-0', 'transition-transform duration-300 ease-out', 'motion-reduce:transition-none')}
          style={{
            transform: `translateX(-${translatePercentage}%)`,
          }}
        >
          {items.map((axis, index) => {
            const Icon = axis.icon;
            const titleId = `home-research-axis-${axis.id}`;
            const themeRoute = getResearchThemeRoute(axis.id, language);

            return (
              <li
                key={axis.id}
                ref={index === 0 ? firstItemRef : undefined}
                className={cn('border-border m-0 shrink-0 basis-full', 'px-6', 'md:basis-1/2', 'lg:basis-1/3', index > 0 && 'border-l')}
              >
                <article className="flex h-full min-w-0 flex-col items-start" aria-labelledby={titleId}>
                  <Icon aria-hidden="true" className="text-brand-primary size-8 self-center" weight="regular" />

                  <h3 id={titleId} className={cn('!mx-0 !mt-4 !mb-0', 'text-md leading-heading font-bold', 'text-brand-ink tracking-[-0.015em]')}>
                    {axis.title}
                  </h3>

                  <p className={cn('!mx-0 !mt-4 !mb-0', 'text-sm leading-relaxed', 'text-muted-foreground')}>{axis.description}</p>

                  <div className="mt-auto pt-6">
                    <Button
                      asChild
                      variant="ghost"
                      className={cn(
                        'group -ml-2 min-h-10 w-fit gap-0 px-2',
                        'text-brand-primary',
                        'hover:bg-action-soft',
                        'hover:text-brand-primary',
                      )}
                    >
                      <Link to={themeRoute}>
                        <span
                          className={cn(
                            'max-w-0 -translate-x-2 overflow-hidden',
                            'opacity-0',
                            'transition-[max-width,margin,opacity,transform]',
                            'duration-500 ease-out',
                            'group-hover:mr-2 group-hover:max-w-40',
                            'group-hover:translate-x-0',
                            'group-hover:opacity-100',
                            'group-focus-visible:mr-2',
                            'group-focus-visible:max-w-40',
                            'group-focus-visible:translate-x-0',
                            'group-focus-visible:opacity-100',
                            'motion-reduce:transition-none',
                            'motion-reduce:transform-none',
                          )}
                        >
                          {t('actions.learnMore', {
                            lng: language,
                          })}
                        </span>

                        <ArrowRightIcon aria-hidden="true" weight="bold" />
                      </Link>
                    </Button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ResearchAxisList;
