import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import { Button } from '@/components/ui/button';
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
  readonly className?: string;
};

function DetailNavigation({ ariaLabel, backLink, previousLink, nextLink, previousLabel, nextLabel, className }: DetailNavigationProps) {
  return (
    <nav className={cn('mt-16 grid gap-6 sm:mt-20', className)} aria-label={ariaLabel}>
      <Button asChild variant="link" className="text-primary hover:text-action-strong h-auto min-h-11 w-fit justify-start px-0 py-2 font-semibold">
        <Link to={backLink.to}>
          <ArrowLeftIcon aria-hidden="true" weight="bold" />
          {backLink.label}
        </Link>
      </Button>

      {previousLink || nextLink ? (
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {previousLink ? (
            <li className="m-0 min-w-0">
              <InteractiveCard interaction="self" className="border-border-strong shadow-subtle h-full gap-0 overflow-hidden py-0">
                <Link
                  className="group text-foreground focus-visible:ring-ring/50 grid h-full min-h-28 content-start gap-3 p-5 text-left no-underline focus-visible:ring-[3px] focus-visible:outline-none focus-visible:ring-inset"
                  rel="prev"
                  to={previousLink.to}
                >
                  <span className="text-muted-foreground flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.04em] uppercase">
                    <ArrowLeftIcon
                      aria-hidden="true"
                      className="ease-standard size-4 shrink-0 transition-transform duration-150 group-hover:-translate-x-1"
                      weight="bold"
                    />

                    {previousLabel}
                  </span>

                  <span className="grid gap-1">
                    <span className="leading-heading text-heading group-hover:text-action-strong text-base font-semibold">{previousLink.label}</span>

                    {previousLink.secondaryLabel ? (
                      <span className="leading-heading text-muted-foreground text-sm font-normal">{previousLink.secondaryLabel}</span>
                    ) : null}
                  </span>
                </Link>
              </InteractiveCard>
            </li>
          ) : null}

          {nextLink ? (
            <li className={cn('m-0 min-w-0', !previousLink && 'sm:col-start-2')}>
              <InteractiveCard interaction="self" className="border-border-strong shadow-subtle h-full gap-0 overflow-hidden py-0">
                <Link
                  className="group text-foreground focus-visible:ring-ring/50 grid h-full min-h-28 content-start gap-3 p-5 text-right no-underline focus-visible:ring-[3px] focus-visible:outline-none focus-visible:ring-inset"
                  rel="next"
                  to={nextLink.to}
                >
                  <span className="text-muted-foreground flex items-center justify-end gap-2 font-mono text-xs font-semibold tracking-[0.04em] uppercase">
                    {nextLabel}

                    <ArrowRightIcon
                      aria-hidden="true"
                      className="ease-standard size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
                      weight="bold"
                    />
                  </span>

                  <span className="grid gap-1">
                    <span className="leading-heading text-heading group-hover:text-action-strong text-base font-semibold">{nextLink.label}</span>

                    {nextLink.secondaryLabel ? (
                      <span className="leading-heading text-muted-foreground text-sm font-normal">{nextLink.secondaryLabel}</span>
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
