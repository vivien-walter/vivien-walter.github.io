import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Card } from '@/components/ui/card';
import type { ContactAvailabilityCard, ContactAvailabilitySection as ContactAvailabilitySectionContent } from '@/content/contact/contact';
import { cn } from '@/lib/utils';

type ContactAvailabilitySectionProps = {
  readonly content: ContactAvailabilitySectionContent;
};

type AvailabilityCardProps = {
  readonly item: ContactAvailabilityCard;
};

function AvailabilityCard({ item }: AvailabilityCardProps) {
  const Icon = item.icon;
  const titleId = `contact-availability-${item.id}-title`;

  return (
    <article className="h-full min-w-0" aria-labelledby={titleId}>
      <Card
        className={cn(
          'h-full gap-0 rounded-lg p-5 shadow-none',
          item.highlighted ? 'border-brand-primary bg-brand-primary text-white' : 'border-border-strong bg-brand-background text-brand-ink',
        )}
      >
        <div className="grid h-full min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-center gap-4">
          <span
            aria-hidden="true"
            className={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-md',
              item.highlighted ? 'bg-white/15 text-white' : 'bg-action-soft text-brand-primary',
            )}
          >
            <Icon className="size-6" weight="regular" />
          </span>

          <div className="min-w-0">
            <h3
              id={titleId}
              className={cn(
                '!leading-heading !m-0 !text-base !font-bold !tracking-[-0.0125em]',
                item.highlighted ? '!text-white' : '!text-brand-ink',
              )}
            >
              {item.title}
            </h3>

            <p className={cn('!mt-1.5 !mb-0 text-sm leading-relaxed', item.highlighted ? '!text-white/90' : 'text-muted-foreground')}>
              {item.description}
            </p>
          </div>
        </div>
      </Card>
    </article>
  );
}

function ContactAvailabilitySection({ content }: ContactAvailabilitySectionProps) {
  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="contact-availability-title">
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id="contact-availability-title">{content.title}</SectionTitle>
      </SectionHeader>

      <ul className={cn('m-0 grid list-none items-stretch gap-5 p-0', 'lg:grid-cols-3')}>
        {content.items.map((item) => (
          <li key={item.id} className="m-0 h-full min-w-0">
            <AvailabilityCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default ContactAvailabilitySection;
