import { ArrowRightIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getPageRoute, getResearchThemeRoute } from '@/app/routing/navigation';
import { Section, SectionAction, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Button } from '@/components/ui/button';
import type { HomeResearchAxesContent } from '@/content/home/home';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

type ResearchAxesSectionProps = {
  readonly content: HomeResearchAxesContent;
  readonly language: SupportedLanguage;
};

const automaticRotationDelay = 8000;

export default function ResearchAxesSection({ content, language }: ResearchAxesSectionProps) {
  const { t } = useTranslation();

  const viewportRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLLIElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const maximumStartIndex = useMemo(() => Math.max(0, content.items.length - visibleCount), [content.items.length, visibleCount]);

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
  }, [content.items.length]);

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
    if (content.items.length <= visibleCount || maximumStartIndex === 0 || isPaused || prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index >= maximumStartIndex ? 0 : index + 1));
    }, automaticRotationDelay);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [content.items.length, isPaused, maximumStartIndex, prefersReducedMotion, visibleCount]);

  const goToPrevious = () => {
    setCurrentIndex((index) => (index <= 0 ? maximumStartIndex : index - 1));
  };

  const goToNext = () => {
    setCurrentIndex((index) => (index >= maximumStartIndex ? 0 : index + 1));
  };

  const translatePercentage = currentIndex * (100 / visibleCount);
  const hasNavigation = maximumStartIndex > 0;

  if (content.items.length === 0) {
    return null;
  }

  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="home-research-axes-title">
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id="home-research-axes-title">{content.title}</SectionTitle>

        <SectionAction className="hidden sm:flex">
          <Button asChild variant="ghost" className="text-brand-primary hover:bg-action-soft hover:text-brand-primary min-h-11 px-2">
            <Link to={getPageRoute('research', language)}>
              {t('pages.research.title', {
                lng: language,
              })}

              <ArrowRightIcon aria-hidden="true" weight="bold" />
            </Link>
          </Button>
        </SectionAction>

        <SectionDescription>{content.description}</SectionDescription>
      </SectionHeader>

      <div
        className={cn('group/carousel relative min-w-0', hasNavigation && 'px-8 sm:px-14 lg:px-0')}
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
              className="border-border-strong bg-brand-background/95 text-brand-primary shadow-subtle hover:border-brand-primary hover:bg-action-soft hover:text-brand-primary absolute top-1/2 left-0 z-10 size-11 -translate-y-1/2 cursor-pointer rounded-full p-0 opacity-100 backdrop-blur-sm transition-[opacity,border-color,background-color] duration-150 ease-out lg:-left-5 lg:opacity-0 lg:group-hover/carousel:opacity-100 lg:hover:opacity-100 lg:focus-visible:opacity-100"
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
              className="border-border-strong bg-brand-background/95 text-brand-primary shadow-subtle hover:border-brand-primary hover:bg-action-soft hover:text-brand-primary absolute top-1/2 right-0 z-10 size-11 -translate-y-1/2 cursor-pointer rounded-full p-0 opacity-100 backdrop-blur-sm transition-[opacity,border-color,background-color] duration-150 ease-out lg:-right-5 lg:opacity-0 lg:group-hover/carousel:opacity-100 lg:hover:opacity-100 lg:focus-visible:opacity-100"
            >
              <CaretRightIcon aria-hidden="true" className="size-5" weight="bold" />
            </Button>
          </>
        ) : null}

        <div ref={viewportRef} className="overflow-hidden" aria-labelledby="home-research-axes-title">
          <ul
            className="m-0 flex list-none p-0 transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{
              transform: `translateX(-${translatePercentage}%)`,
            }}
          >
            {content.items.map((axis, index) => {
              const Icon = axis.icon;
              const titleId = `home-research-axis-${axis.id}`;
              const themeRoute = getResearchThemeRoute(axis.id, language);

              return (
                <li
                  key={axis.id}
                  ref={index === 0 ? firstItemRef : undefined}
                  className={cn('border-border m-0 shrink-0 basis-full px-4 sm:px-6 md:basis-1/2 lg:basis-1/3', index > 0 && 'md:border-l')}
                >
                  <article className="flex h-full min-w-0 flex-col items-start" aria-labelledby={titleId}>
                    <Icon aria-hidden="true" className="text-brand-primary size-8 self-center" weight="regular" />

                    <h3 id={titleId} className="text-md leading-heading text-brand-ink !mx-0 !mt-4 !mb-0 font-bold tracking-[-0.015em]">
                      {axis.title}
                    </h3>

                    <p className="text-muted-foreground !mx-0 !mt-4 !mb-0 text-sm leading-relaxed">{axis.description}</p>

                    <div className="mt-auto pt-6">
                      <Button
                        asChild
                        variant="ghost"
                        className="group text-brand-primary hover:bg-action-soft hover:text-brand-primary min-h-10 w-fit gap-0 px-2 lg:-ml-2"
                      >
                        <Link to={themeRoute}>
                          <span className="mr-2 max-w-40 translate-x-0 overflow-hidden opacity-100 transition-[max-width,margin,opacity,transform] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none lg:mr-0 lg:max-w-0 lg:-translate-x-2 lg:opacity-0 lg:group-hover:mr-2 lg:group-hover:max-w-40 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 lg:group-focus-visible:mr-2 lg:group-focus-visible:max-w-40 lg:group-focus-visible:translate-x-0 lg:group-focus-visible:opacity-100">
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

      <SectionAction className="mt-6 w-full sm:hidden">
        <Button asChild className="min-h-11 w-full px-5">
          <Link to={getPageRoute('research', language)}>
            {t('pages.research.title', {
              lng: language,
            })}
          </Link>
        </Button>
      </SectionAction>
    </Section>
  );
}
