import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { getResearchPageContent } from '@/content/research/page';

type ResearchResource = ReturnType<typeof getResearchPageContent>['resources'][number];

type ResearchActivitiesSectionProps = {
  readonly resources: readonly ResearchResource[];
  readonly title: string;
};

export default function ResearchActivitiesSection({ resources, title }: ResearchActivitiesSectionProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="research-activities-title">
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id="research-activities-title">{title}</SectionTitle>
      </SectionHeader>

      <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => {
          const ResourceIcon = resource.icon;

          return (
            <li key={resource.id} className="m-0 min-w-0">
              <a
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                data-external="true"
                className="group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <InteractiveCard
                  interaction="group"
                  className="border-border-strong bg-brand-background h-full min-h-40 gap-0 rounded-lg py-0 shadow-none"
                >
                  <span className="text-brand-primary group-hover:text-brand-dark flex flex-1 items-center justify-center px-5 pt-7 pb-4 transition-colors duration-200">
                    <ResourceIcon aria-hidden="true" className="size-12" weight="regular" />
                  </span>

                  <span className="text-brand-ink group-hover:text-brand-primary flex min-h-14 items-center justify-center px-5 py-3 text-center font-semibold transition-colors duration-200">
                    {resource.label}
                  </span>
                </InteractiveCard>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
