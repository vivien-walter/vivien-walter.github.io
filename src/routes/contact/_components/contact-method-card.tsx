import { ArrowRightIcon } from '@phosphor-icons/react';

import { InteractiveCard } from '@/components/interactive-card';
import type { ContactMethod } from '@/content/contact/contact';
import { cn } from '@/lib/utils';

type ContactMethodCardProps = {
  readonly method: ContactMethod;
};

function ContactMethodCard({ method }: ContactMethodCardProps) {
  const Icon = method.icon;
  const opensInNewTab = method.href.startsWith('https://');

  return (
    <a
      href={method.href}
      target={opensInNewTab ? '_blank' : undefined}
      rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      className={cn(
        'group block h-full rounded-lg',
        'text-brand-ink no-underline',
        'focus-visible:outline-none',
        'focus-visible:ring-[3px]',
        'focus-visible:ring-ring/50',
        'focus-visible:ring-offset-2',
      )}
    >
      <InteractiveCard interaction="group" className={cn('h-full gap-0 rounded-lg p-5', 'border-border bg-brand-background shadow-none')}>
        <div className="flex min-w-0 flex-col items-start">
          <span
            aria-hidden="true"
            className={cn('text-brand-primary', 'ease-standard transition-colors duration-200', 'group-hover:text-brand-dark')}
          >
            <Icon className="size-9" weight="regular" />
          </span>

          <h3 className={cn('!mt-3 !mb-0', '!leading-heading !text-base !font-bold', 'text-brand-ink !tracking-[-0.0125em]')}>{method.label}</h3>

          <p className={cn('!mt-1.5 !mb-0 min-h-12 max-w-full', 'text-muted-foreground text-sm leading-relaxed', '[overflow-wrap:anywhere]')}>
            {method.value}
          </p>

          <span
            className={cn(
              'mt-5 flex min-h-10 items-center gap-2.5',
              'text-brand-primary text-sm font-semibold',
              'ease-standard transition-colors duration-200',
              'group-hover:text-brand-dark',
            )}
          >
            <span>{method.actionLabel}</span>

            <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
          </span>
        </div>
      </InteractiveCard>
    </a>
  );
}

export default ContactMethodCard;
