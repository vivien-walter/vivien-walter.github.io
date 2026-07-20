import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export type BreadcrumbItemData = {
  readonly label: string;
  readonly to?: string;
};

type BreadcrumbsProps = {
  readonly ariaLabel: string;
  readonly items: readonly BreadcrumbItemData[];
};

function Breadcrumbs({ ariaLabel, items }: BreadcrumbsProps) {
  return (
    <Breadcrumb
      aria-label={ariaLabel}
      className="mb-8 max-w-readable sm:mb-10"
    >
      <BreadcrumbList className="m-0 list-none p-0">
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? <BreadcrumbSeparator /> : null}

              <BreadcrumbItem className="m-0 min-w-0">
                {item.to && !isCurrentPage ? (
                  <BreadcrumbLink
                    asChild
                    className={[
                      "min-h-11 rounded-sm px-1 py-2",
                      "font-medium text-muted-foreground no-underline",
                      "hover:text-heading",
                    ].join(" ")}
                  >
                    <Link to={item.to}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="min-w-0 py-2 text-heading">
                    <span className="line-clamp-2">{item.label}</span>
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