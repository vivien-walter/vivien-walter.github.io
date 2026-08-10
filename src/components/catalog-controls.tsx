import { FunnelIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export type CatalogControlOption = {
  readonly value: string;
  readonly label: string;
};

type CatalogSortSelectProps = {
  readonly value: string;
  readonly label: string;
  readonly placeholder: string;
  readonly options: readonly CatalogControlOption[];
  readonly onValueChange: (value: string) => void;
  readonly className?: string;
};

function CatalogSortSelect({ value, label, placeholder, options, onValueChange, className }: CatalogSortSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn('border-border-strong bg-brand-background text-brand-ink min-h-11 shadow-none', className)} aria-label={label}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent align="end" position="popper">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type CatalogFilterGroupProps = {
  readonly value: string;
  readonly label: string;
  readonly groupId: string;
  readonly options: readonly CatalogControlOption[];
  readonly selectedValues: ReadonlySet<string>;
  readonly onChange: (value: string, checked: boolean) => void;
  readonly scrollable?: boolean;
};

function CatalogFilterGroup({ value, label, groupId, options, selectedValues, onChange, scrollable = true }: CatalogFilterGroupProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-brand-ink rounded-none px-4 py-3 text-sm font-semibold hover:no-underline">{label}</AccordionTrigger>

      <AccordionContent className="border-border bg-brand-hero/50 border-t px-4 py-4">
        <div className={cn('grid gap-3', scrollable && 'max-h-64 overflow-y-auto pr-1')} role="group" aria-label={label}>
          {options.map((option, index) => {
            const inputId = `${groupId}-${index}`;

            return (
              <div key={option.value} className="flex min-w-0 items-start gap-3">
                <Checkbox
                  id={inputId}
                  className="mt-0.5"
                  checked={selectedValues.has(option.value)}
                  onCheckedChange={(checked) => {
                    onChange(option.value, checked === true);
                  }}
                />

                <label htmlFor={inputId} className="text-foreground min-w-0 cursor-pointer text-sm leading-snug">
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

type CatalogFilterTriggerProps = {
  readonly label: string;
  readonly activeFilterCount: number;
};

function CatalogFilterTrigger({ label, activeFilterCount }: CatalogFilterTriggerProps) {
  return (
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant="outline"
        className="border-border-strong bg-brand-background text-brand-ink hover:bg-brand-background hover:text-brand-ink dark:bg-brand-background dark:hover:bg-brand-background dark:hover:text-brand-ink min-h-11 shadow-none"
      >
        <FunnelIcon aria-hidden="true" className="size-4" weight="regular" />

        {label}

        {activeFilterCount > 0 ? (
          <span className="bg-brand-primary text-primary-foreground inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold">
            {activeFilterCount}
          </span>
        ) : null}
      </Button>
    </PopoverTrigger>
  );
}

type CatalogFilterContentProps = {
  readonly activeFilterCount: number;
  readonly clearLabel: string;
  readonly onClearFilters: () => void;
  readonly children: ReactNode;
  readonly className?: string;
};

function CatalogFilterContent({ activeFilterCount, clearLabel, onClearFilters, children, className }: CatalogFilterContentProps) {
  return (
    <PopoverContent align="end" sideOffset={8} className={cn('border-border-strong shadow-elevated p-0', className)}>
      {children}

      {activeFilterCount > 0 ? (
        <>
          <Separator />

          <div className="p-3">
            <Button
              type="button"
              variant="ghost"
              className="text-brand-primary hover:bg-action-soft hover:text-brand-dark min-h-10 w-full justify-center"
              onClick={onClearFilters}
            >
              {clearLabel}
            </Button>
          </div>
        </>
      ) : null}
    </PopoverContent>
  );
}

export { CatalogFilterContent, CatalogFilterGroup, CatalogFilterTrigger, CatalogSortSelect };
