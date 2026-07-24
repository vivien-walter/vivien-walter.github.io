import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadcrumbItemData = {
  readonly label: string;
  readonly to?: string;
};

type BreadcrumbsProps = {
  readonly ariaLabel: string;
  readonly items: readonly BreadcrumbItemData[];
};

function Breadcrumbs({
  ariaLabel,
  items,
}: BreadcrumbsProps) {
  return (
    <Breadcrumb
      aria-label={ariaLabel}
      className="max-w-readable"
    >
      <BreadcrumbList
        className={[
          "m-0 flex list-none flex-nowrap items-center",
          "gap-2 p-0 text-sm leading-none",
        ].join(" ")}
      >
        {items.map((item, index) => {
          const isCurrentPage =
            index === items.length - 1;

          return (
            <Fragment
              key={`${item.label}-${index}`}
            >
              {index > 0 ? (
                <BreadcrumbSeparator
                  className={[
                    "m-0 flex shrink-0 items-center",
                    "text-muted-foreground",
                  ].join(" ")}
                >
                  /
                </BreadcrumbSeparator>
              ) : null}

              <BreadcrumbItem className="m-0 flex min-w-0 items-center">
                {item.to && !isCurrentPage ? (
                  <BreadcrumbLink
                    asChild
                    className={[
                      "inline-flex min-h-6 items-center rounded-sm",
                      "font-medium leading-none text-brand-primary",
                      "no-underline hover:text-brand-primary/80",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-ring",
                      "focus-visible:ring-offset-2",
                    ].join(" ")}
                  >
                    <Link to={item.to}>
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage
                    className={[
                      "inline-flex min-h-6 min-w-0 items-center",
                      "font-normal leading-none text-brand-primary",
                    ].join(" ")}
                  >
                    <span className="truncate whitespace-nowrap">
                      {item.label}
                    </span>
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;