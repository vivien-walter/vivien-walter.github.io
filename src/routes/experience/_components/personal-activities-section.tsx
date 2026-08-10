import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { PersonalActivityCatalogItem } from '@/content/experience/catalog';

type PersonalActivitiesSectionProps = {
  readonly title: string;
  readonly description?: string;
  readonly items: readonly PersonalActivityCatalogItem[];
};

function PersonalActivitiesSection({ title, description, items }: PersonalActivitiesSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section contained={false} className="py-12 sm:py-14 lg:py-16" aria-labelledby="personal-activities-title">
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id="personal-activities-title">{title}</SectionTitle>

        {description ? <SectionDescription>{description}</SectionDescription> : null}
      </SectionHeader>

      <Accordion type="single" collapsible className="grid gap-4">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={[
              'border-border-strong bg-card overflow-hidden rounded-lg border',
              'shadow-subtle',
              'transition-all',
              'ease-standard duration-200',
              'last:border-b',
              'has-[[data-slot=accordion-trigger]:hover]:-translate-y-1',
              'has-[[data-slot=accordion-trigger]:hover]:border-brand-primary',
              'has-[[data-slot=accordion-trigger]:hover]:bg-action-soft/70',
              'has-[[data-slot=accordion-trigger]:hover]:shadow-elevated',
              'has-[[data-slot=accordion-trigger]:hover]:ring-2',
              'has-[[data-slot=accordion-trigger]:hover]:ring-brand-primary/30',
              'motion-reduce:has-[[data-slot=accordion-trigger]:hover]:translate-y-0',
              'data-[state=open]:border-brand-primary',
              'data-[state=open]:shadow-elevated',
            ].join(' ')}
          >
            <AccordionTrigger
              className={[
                'min-h-16 cursor-pointer px-5 py-4 sm:px-6',
                'text-brand-ink text-base font-bold',
                'leading-heading no-underline',
                'hover:text-brand-primary hover:no-underline',
                'focus-visible:ring-inset',
              ].join(' ')}
            >
              {item.title}
            </AccordionTrigger>

            <AccordionContent className="flow-root px-5 pb-5 sm:px-6 sm:pb-6">
              {item.image ? (
                <figure className="float-right m-0 mb-4 ml-5 w-1/2 max-w-[50%] sm:mb-5 sm:ml-8">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="border-border-strong block h-auto w-full rounded-lg border object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ) : null}

              <p className="text-foreground !m-0">{item.description}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

export default PersonalActivitiesSection;
