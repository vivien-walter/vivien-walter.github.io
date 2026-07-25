import { ArrowRightIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';

import { InteractiveCard } from '@/components/interactive-card';
import type { ContactMethod } from '@/content/contact/contact';

type ContactMethodCardProps = {
  readonly externalLinkLabel: string;
  readonly method: ContactMethod;
};

export default function ContactMethodCard({ externalLinkLabel, method }: ContactMethodCardProps) {
  const { opensInNewTab, icon: Icon } = method;

  return (
    <a
      href={method.href}
      target={opensInNewTab ? '_blank' : undefined}
      rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      className="group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <InteractiveCard interaction="group" className="border-border bg-brand-background h-full gap-0 rounded-lg p-5 shadow-none">
        <div className="flex min-w-0 flex-col items-start">
          <div className="flex min-w-0 items-center gap-3">
            <span aria-hidden="true" className="text-brand-primary ease-standard group-hover:text-brand-dark shrink-0 transition-colors duration-200">
              <Icon className="size-9" weight="regular" />
            </span>

            <h3 className="!leading-heading text-brand-ink !m-0 min-w-0 !text-base !font-bold !tracking-[-0.0125em]">{method.label}</h3>
          </div>

          <p className="text-muted-foreground sr-only max-w-full text-sm leading-relaxed [overflow-wrap:anywhere] sm:not-sr-only sm:!mt-1.5 sm:!mb-0 sm:block sm:min-h-12">
            {method.value}
          </p>

          <span className="text-brand-primary ease-standard group-hover:text-brand-dark mt-5 flex min-h-10 items-center gap-2.5 text-sm font-semibold transition-colors duration-200">
            <span>{method.actionLabel}</span>

            {opensInNewTab ? <span className="sr-only"> — {externalLinkLabel}</span> : null}

            {opensInNewTab ? (
              <ArrowSquareOutIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
            ) : (
              <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
            )}
          </span>
        </div>
      </InteractiveCard>
    </a>
  );
}
