import type { ComponentProps } from 'react';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function PageDivider({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('max-w-editorial px-page mx-auto w-full', className)} {...props}>
      <Separator />
    </div>
  );
}

export default PageDivider;
