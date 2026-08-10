import { CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn('text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5', className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-1.5', className)} {...props} />;
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        'hover:text-foreground focus-visible:ring-ring/50 transition-colors focus-visible:ring-[3px] focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="breadcrumb-page" aria-current="page" className={cn('text-foreground font-normal', className)} {...props} />;
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('text-border-strong inline-flex items-center [&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <CaretRightIcon weight="bold" />}
    </li>
  );
}

type BreadcrumbEllipsisProps = React.ComponentProps<'span'> & {
  readonly label: string;
};

function BreadcrumbEllipsis({ className, label, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <DotsThreeIcon className="size-4" weight="bold" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
