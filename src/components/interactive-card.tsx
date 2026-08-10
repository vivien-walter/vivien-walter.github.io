import type { ComponentProps } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type InteractiveCardInteraction = 'group' | 'self';

type InteractiveCardProps = ComponentProps<typeof Card> & {
  readonly interaction?: InteractiveCardInteraction;
};

const interactionClassNames = {
  group:
    'transition-all ease-standard duration-200 group-hover:-translate-y-1 group-hover:border-brand-primary group-hover:bg-action-soft/70 group-hover:shadow-elevated group-hover:ring-2 group-hover:ring-brand-primary/30 motion-reduce:group-hover:translate-y-0',

  self: 'transition-all ease-standard duration-200 hover:-translate-y-1 hover:border-brand-primary hover:bg-action-soft/70 hover:shadow-elevated hover:ring-2 hover:ring-brand-primary/30 motion-reduce:hover:translate-y-0',
} satisfies Readonly<Record<InteractiveCardInteraction, string>>;

function InteractiveCard({ className, interaction = 'group', ...props }: InteractiveCardProps) {
  return <Card data-interaction={interaction} className={cn(interactionClassNames[interaction], className)} {...props} />;
}

export { InteractiveCard, type InteractiveCardInteraction, type InteractiveCardProps };
