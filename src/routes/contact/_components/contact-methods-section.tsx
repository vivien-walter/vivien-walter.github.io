import { ArrowRightIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';

import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionHeader, SectionTitle } from '@/components/section';
import type { ContactMethod } from '@/content/contact/contact';

type ContactMethodsSectionProps = {
  readonly externalLinkLabel: string;
  readonly methods: readonly ContactMethod[];
  readonly title: string;
};

type ContactMethodCardProps = {
  readonly externalLinkLabel: string;
  readonly method: ContactMethod;
};

function ContactMethodCard({ externalLinkLabel, method }: ContactMethodCardProps) {
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

export default function ContactMethodsSection({ externalLinkLabel, methods, title }: ContactMethodsSectionProps) {
  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="contact-methods-title">
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id="contact-methods-title">{title}</SectionTitle>
      </SectionHeader>

      <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {methods.map((method) => (
          <li key={method.id} className="m-0 min-w-0">
            <ContactMethodCard method={method} externalLinkLabel={externalLinkLabel} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
