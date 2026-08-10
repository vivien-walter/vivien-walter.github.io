import type { Icon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';

export type DetailHighlightItem = {
  readonly icon: Icon;
  readonly label: string;
  readonly value: string;
};

type DetailHighlightsBandProps = {
  readonly ariaLabel: string;
  readonly items?: readonly DetailHighlightItem[];
};

function DetailHighlightsBand({ ariaLabel, items }: DetailHighlightsBandProps) {
  const visibleItems = items?.filter((item) => item.label.trim().length > 0 && item.value.trim().length > 0).slice(0, 3) ?? [];

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <aside className="bg-brand-primary text-white" aria-label={ariaLabel}>
      <dl
        className={cn(
          'max-w-editorial px-page mx-auto grid w-full grid-cols-1 gap-x-10 gap-y-10 py-9 sm:py-10 lg:py-12',
          visibleItems.length === 1 ? 'md:grid-cols-1' : visibleItems.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3',
        )}
      >
        {visibleItems.map((item, index) => {
          const HighlightIcon = item.icon;

          return (
            <div key={`${item.label}-${index}`} className="m-0 grid min-w-0 content-start gap-4">
              <HighlightIcon aria-hidden="true" className="size-12 justify-self-center text-white" weight="regular" />

              <div className="min-w-0">
                <dt className="leading-heading text-center font-bold tracking-[-0.01em] text-white">{item.label}</dt>

                <dd className="leading-body m-0 mt-2 text-sm text-white/85">{item.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}

export default DetailHighlightsBand;
