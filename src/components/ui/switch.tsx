import { Switch as SwitchPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Switch({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch ease-standard border-border-strong data-[state=unchecked]:bg-muted data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary focus-visible:border-brand-primary focus-visible:ring-brand-primary/25 inline-flex shrink-0 cursor-pointer items-center rounded-full border px-0.5 shadow-xs transition-colors duration-150 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-6 data-[size=default]:w-11 data-[size=sm]:h-5 data-[size=sm]:w-9 motion-reduce:transition-none',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="ease-standard pointer-events-none block shrink-0 rounded-full bg-white shadow-sm transition-transform duration-150 group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-4 data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0 motion-reduce:transition-none"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
