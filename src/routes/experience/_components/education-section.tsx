import { GraduationCapIcon } from '@phosphor-icons/react';

import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import type { EducationCatalogItem } from '@/content/experience/catalog';

type EducationSectionProps = {
  readonly title: string;
  readonly description: string;
  readonly items: readonly EducationCatalogItem[];
};

function EducationSection({ title, description, items }: EducationSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="education-section-title">
      <SectionHeader className="mb-10 sm:mb-12">
        <SectionTitle id="education-section-title">{title}</SectionTitle>

        <SectionDescription>{description}</SectionDescription>
      </SectionHeader>

      <div className="overflow-x-auto">
        <ul className="grid min-w-max list-none auto-cols-[minmax(12rem,1fr)] grid-flow-col">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <li key={item.id} className="relative m-0 grid min-w-0 justify-items-center px-4 text-center">
                {!isFirst ? <span aria-hidden="true" className="bg-brand-primary/35 absolute top-6 right-1/2 left-0 h-px" /> : null}

                {!isLast ? <span aria-hidden="true" className="bg-brand-primary/35 absolute top-6 right-0 left-1/2 h-px" /> : null}

                <div className="bg-brand-background relative z-10 flex size-12 items-center justify-center">
                  <GraduationCapIcon aria-hidden="true" className="text-brand-primary size-10" weight="regular" />
                </div>

                <div className="mt-5 min-w-0">
                  <h3 className="leading-heading text-brand-ink !m-0 text-base font-bold">{item.level}</h3>

                  <p className="text-foreground !mt-2 !mb-0">{item.subject}</p>

                  <p className="leading-heading text-brand-primary !mt-3 !mb-0 font-mono text-sm font-semibold">{item.year}</p>

                  <p className="text-muted-foreground !mt-1 !mb-0 text-sm">{item.place}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

export default EducationSection;
