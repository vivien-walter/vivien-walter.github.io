import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export type BreadcrumbItemData = {
  readonly label: string;
  readonly to?: string;
};

type BreadcrumbsProps = {
  readonly ariaLabel: string;
  readonly items: readonly BreadcrumbItemData[];
};

export default function Breadcrumbs({ ariaLabel, items }: BreadcrumbsProps) {
  return (
    <Breadcrumb aria-label={ariaLabel} className="max-w-readable">
      <BreadcrumbList className="m-0 flex list-none flex-nowrap items-center gap-2 p-0 text-sm leading-normal">
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? <BreadcrumbSeparator className="text-muted-foreground m-0 flex shrink-0 items-center">/</BreadcrumbSeparator> : null}

              <BreadcrumbItem className="m-0 flex min-w-0 items-center">
                {item.to && !isCurrentPage ? (
                  <BreadcrumbLink
                    asChild
                    className="text-brand-primary hover:text-brand-primary/80 focus-visible:ring-ring inline-flex min-h-6 items-center rounded-sm leading-normal font-medium no-underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Link to={item.to}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-brand-primary inline-flex min-h-6 min-w-0 items-center leading-normal font-normal">
                    <span className="truncate whitespace-nowrap">{item.label}</span>
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
