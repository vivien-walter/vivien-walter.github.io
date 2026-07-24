import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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

function DetailNavigation({
  ariaLabel,
  backLink,
  previousLink,
  nextLink,
  previousLabel,
  nextLabel,
  className,
}: DetailNavigationProps) {
  return (
    <nav
      className={cn(
        "mt-16 grid gap-6 sm:mt-20",
        className,
      )}
      aria-label={ariaLabel}
    >
      <Separator />

      <Button
        asChild
        variant="link"
        className={cn(
          "h-auto min-h-11 w-fit justify-start px-0 py-2",
          "font-semibold text-primary",
          "hover:text-action-strong",
        )}
      >
        <Link to={backLink.to}>
          <ArrowLeftIcon aria-hidden="true" weight="bold" />
          {backLink.label}
        </Link>
      </Button>

      {previousLink || nextLink ? (
        <ul
          className={cn(
            "m-0 grid list-none gap-4 p-0",
            "sm:grid-cols-2",
          )}
        >
          {previousLink ? (
            <li className="m-0 min-w-0">
              <Card
                className={cn(
                  "h-full gap-0 overflow-hidden py-0",
                  "border-border-strong shadow-subtle",
                  "transition-[border-color,box-shadow]",
                  "duration-150 ease-standard",
                  "hover:border-primary hover:shadow-elevated",
                )}
              >
                <Link
                  className={cn(
                    "group grid h-full min-h-28 content-start",
                    "gap-3 p-5",
                    "text-left text-foreground no-underline",
                    "focus-visible:outline-none",
                    "focus-visible:ring-[3px]",
                    "focus-visible:ring-inset",
                    "focus-visible:ring-ring/50",
                  )}
                  rel="prev"
                  to={previousLink.to}
                >
                  <span
                    className={cn(
                      "flex items-center gap-2",
                      "font-mono text-xs font-semibold",
                      "tracking-[0.04em] text-muted-foreground",
                      "uppercase",
                    )}
                  >
                    <ArrowLeftIcon
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0",
                        "transition-transform",
                        "duration-150 ease-standard",
                        "group-hover:-translate-x-1",
                      )}
                      weight="bold"
                    />

                    {previousLabel}
                  </span>

                  <span className="grid gap-1">
                    <span
                      className={cn(
                        "text-base font-semibold",
                        "leading-heading text-heading",
                        "group-hover:text-action-strong",
                      )}
                    >
                      {previousLink.label}
                    </span>

                    {previousLink.secondaryLabel ? (
                      <span
                        className={cn(
                          "text-sm font-normal",
                          "leading-heading text-muted-foreground",
                        )}
                      >
                        {previousLink.secondaryLabel}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </Card>
            </li>
          ) : null}

          {nextLink ? (
            <li
              className={cn(
                "m-0 min-w-0",
                !previousLink && "sm:col-start-2",
              )}
            >
              <Card
                className={cn(
                  "h-full gap-0 overflow-hidden py-0",
                  "border-border-strong shadow-subtle",
                  "transition-[border-color,box-shadow]",
                  "duration-150 ease-standard",
                  "hover:border-primary hover:shadow-elevated",
                )}
              >
                <Link
                  className={cn(
                    "group grid h-full min-h-28 content-start",
                    "gap-3 p-5",
                    "text-right text-foreground no-underline",
                    "focus-visible:outline-none",
                    "focus-visible:ring-[3px]",
                    "focus-visible:ring-inset",
                    "focus-visible:ring-ring/50",
                  )}
                  rel="next"
                  to={nextLink.to}
                >
                  <span
                    className={cn(
                      "flex items-center justify-end gap-2",
                      "font-mono text-xs font-semibold",
                      "tracking-[0.04em] text-muted-foreground",
                      "uppercase",
                    )}
                  >
                    {nextLabel}

                    <ArrowRightIcon
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0",
                        "transition-transform",
                        "duration-150 ease-standard",
                        "group-hover:translate-x-1",
                      )}
                      weight="bold"
                    />
                  </span>

                  <span className="grid gap-1">
                    <span
                      className={cn(
                        "text-base font-semibold",
                        "leading-heading text-heading",
                        "group-hover:text-action-strong",
                      )}
                    >
                      {nextLink.label}
                    </span>

                    {nextLink.secondaryLabel ? (
                      <span
                        className={cn(
                          "text-sm font-normal",
                          "leading-heading text-muted-foreground",
                        )}
                      >
                        {nextLink.secondaryLabel}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </Card>
            </li>
          ) : null}
        </ul>
      ) : null}
    </nav>
  );
}

export default DetailNavigation;