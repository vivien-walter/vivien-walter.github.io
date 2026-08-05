import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export type DetailNavigationLink = {
  readonly label: string;
  readonly secondaryLabel?: string;
  readonly to: string;
};

type DetailNavigationProps = {
  readonly ariaLabel: string;
  readonly backLink: DetailNavigationLink;
  readonly previousLink?: DetailNavigationLink;
  readonly nextLink?: DetailNavigationLink;
  readonly previousLabel: string;
  readonly nextLabel: string;
  readonly showTopSeparator?: boolean;
  readonly className?: string;
};

function DetailNavigation({
  ariaLabel,
  backLink,
  previousLink,
  nextLink,
  previousLabel,
  nextLabel,
  showTopSeparator = true,
  className,
}: DetailNavigationProps) {
  return (
    <nav className={cn('mt-16 grid gap-6 sm:mt-20', className)} aria-label={ariaLabel}>
      {showTopSeparator ? <Separator /> : null}

      <Button
        asChild
        variant="link"
        className={cn('h-auto min-h-11 w-fit justify-start px-0 py-2', 'text-primary font-semibold', 'hover:text-action-strong')}
      >
        <Link to={backLink.to}>
          <ArrowLeftIcon aria-hidden="true" weight="bold" />
          {backLink.label}
        </Link>
      </Button>

      {previousLink || nextLink ? (
        <ul className={cn('m-0 grid list-none gap-4 p-0', 'sm:grid-cols-2')}>
          {previousLink ? (
            <li className="m-0 min-w-0">
              <InteractiveCard interaction="self" className={cn('h-full gap-0 overflow-hidden py-0', 'border-border-strong shadow-subtle')}>
                <Link
                  className={cn(
                    'group grid h-full min-h-28 content-start',
                    'gap-3 p-5',
                    'text-foreground text-left no-underline',
                    'focus-visible:outline-none',
                    'focus-visible:ring-[3px]',
                    'focus-visible:ring-inset',
                    'focus-visible:ring-ring/50',
                  )}
                  rel="prev"
                  to={previousLink.to}
                >
                  <span
                    className={cn(
                      'flex items-center gap-2',
                      'font-mono text-xs font-semibold',
                      'text-muted-foreground tracking-[0.04em]',
                      'uppercase',
                    )}
                  >
                    <ArrowLeftIcon
                      aria-hidden="true"
                      className={cn('size-4 shrink-0', 'transition-transform', 'ease-standard duration-150', 'group-hover:-translate-x-1')}
                      weight="bold"
                    />

                    {previousLabel}
                  </span>

                  <span className="grid gap-1">
                    <span className={cn('text-base font-semibold', 'leading-heading text-heading', 'group-hover:text-action-strong')}>
                      {previousLink.label}
                    </span>

                    {previousLink.secondaryLabel ? (
                      <span className={cn('text-sm font-normal', 'leading-heading text-muted-foreground')}>{previousLink.secondaryLabel}</span>
                    ) : null}
                  </span>
                </Link>
              </InteractiveCard>
            </li>
          ) : null}

          {nextLink ? (
            <li className={cn('m-0 min-w-0', !previousLink && 'sm:col-start-2')}>
              <InteractiveCard interaction="self" className={cn('h-full gap-0 overflow-hidden py-0', 'border-border-strong shadow-subtle')}>
                <Link
                  className={cn(
                    'group grid h-full min-h-28 content-start',
                    'gap-3 p-5',
                    'text-foreground text-right no-underline',
                    'focus-visible:outline-none',
                    'focus-visible:ring-[3px]',
                    'focus-visible:ring-inset',
                    'focus-visible:ring-ring/50',
                  )}
                  rel="next"
                  to={nextLink.to}
                >
                  <span
                    className={cn(
                      'flex items-center justify-end gap-2',
                      'font-mono text-xs font-semibold',
                      'text-muted-foreground tracking-[0.04em]',
                      'uppercase',
                    )}
                  >
                    {nextLabel}

                    <ArrowRightIcon
                      aria-hidden="true"
                      className={cn('size-4 shrink-0', 'transition-transform', 'ease-standard duration-150', 'group-hover:translate-x-1')}
                      weight="bold"
                    />
                  </span>

                  <span className="grid gap-1">
                    <span className={cn('text-base font-semibold', 'leading-heading text-heading', 'group-hover:text-action-strong')}>
                      {nextLink.label}
                    </span>

                    {nextLink.secondaryLabel ? (
                      <span className={cn('text-sm font-normal', 'leading-heading text-muted-foreground')}>{nextLink.secondaryLabel}</span>
                    ) : null}
                  </span>
                </Link>
              </InteractiveCard>
            </li>
          ) : null}
        </ul>
      ) : null}
    </nav>
  );
}

export default DetailNavigation;
