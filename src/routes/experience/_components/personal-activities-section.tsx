import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PersonalActivity } from "@/content/experience/page";

type PersonalActivitiesSectionProps = {
  readonly title: string;
  readonly items: readonly PersonalActivity[];
};

function PersonalActivitiesSection({
  title,
  items,
}: PersonalActivitiesSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-border py-12 sm:py-14 lg:py-16"
      aria-labelledby="personal-activities-title"
    >
      <h2
        id="personal-activities-title"
        className={[
          "mb-8 text-2xl font-bold leading-heading",
          "tracking-[-0.02em] text-brand-ink",
          "sm:mb-10 sm:text-3xl",
        ].join(" ")}
      >
        {title}
      </h2>

      <Accordion
        type="single"
        collapsible
        className="grid gap-4"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={[
              "overflow-hidden rounded-lg border",
              "border-border-strong bg-card shadow-subtle",
              "transition-[border-color,box-shadow]",
              "duration-150 ease-standard",
              "last:border-b",
              "data-[state=open]:border-brand-primary",
              "data-[state=open]:shadow-elevated",
            ].join(" ")}
          >
            <AccordionTrigger
              className={[
                "min-h-16 px-5 py-4",
                "text-base font-bold leading-heading",
                "text-brand-ink no-underline",
                "hover:text-brand-primary hover:no-underline",
                "sm:px-6",
              ].join(" ")}
            >
              {item.title}
            </AccordionTrigger>

            <AccordionContent className="px-5 pb-5 sm:px-6 sm:pb-6">
              <p className="!m-0 text-foreground">
                {item.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default PersonalActivitiesSection;