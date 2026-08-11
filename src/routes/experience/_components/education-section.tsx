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

      <div>
        <ul className="grid list-none gap-y-8 lg:auto-cols-fr lg:grid-flow-col lg:gap-y-0">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <li
                key={item.id}
                className="relative m-0 grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-start gap-x-4 text-left lg:grid-cols-1 lg:justify-items-center lg:px-4 lg:text-center"
              >
                {!isFirst ? (
                  <span aria-hidden="true" className="bg-brand-primary/35 absolute hidden lg:top-6 lg:right-1/2 lg:left-0 lg:block lg:h-px" />
                ) : null}

                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="bg-brand-primary/35 absolute top-9 bottom-[-2rem] left-6 w-px lg:top-6 lg:right-0 lg:bottom-auto lg:left-1/2 lg:h-px lg:w-auto"
                  />
                ) : null}

                <div className="bg-brand-background relative z-10 flex size-12 -translate-y-3 items-center justify-center lg:translate-y-0">
                  <GraduationCapIcon aria-hidden="true" className="text-brand-primary size-10" weight="regular" />
                </div>

                <div className="min-w-0 lg:mt-5">
                  <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 lg:block">
                    <h3 className="leading-heading text-brand-ink !m-0 min-w-0 text-base font-bold">{item.level}</h3>

                    <p className="leading-heading text-brand-primary !m-0 shrink-0 font-mono text-sm font-semibold lg:hidden">{item.year}</p>
                  </div>

                  <p className="text-foreground !mt-2 !mb-0">{item.subject}</p>

                  <p className="leading-heading text-brand-primary !mt-3 !mb-0 hidden font-mono text-sm font-semibold lg:block">{item.year}</p>

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
