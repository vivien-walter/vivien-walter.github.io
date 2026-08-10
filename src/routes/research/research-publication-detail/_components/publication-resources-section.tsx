import { ArrowUpRightIcon, type Icon } from '@phosphor-icons/react';

import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionHeader, SectionTitle } from '@/components/section';

type PublicationResource = {
  readonly icon: Icon;
  readonly label: string;
  readonly description: string;
  readonly href: string;
};

type PublicationResourcesSectionProps = {
  readonly resources?: readonly PublicationResource[];
  readonly title: string;
  readonly titleId: string;
};

function PublicationResourcesSection({ resources, title, titleId }: PublicationResourcesSectionProps) {
  const visibleResources =
    resources?.filter((resource) => resource.label.trim().length > 0 && resource.description.trim().length > 0 && resource.href.trim().length > 0) ??
    [];

  if (visibleResources.length === 0) {
    return null;
  }

  return (
    <Section contained={false} className="py-12 sm:py-14 lg:py-16" aria-labelledby={titleId}>
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id={titleId}>{title}</SectionTitle>
      </SectionHeader>

      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {visibleResources.map((resource, index) => {
          const ResourceIcon = resource.icon;

          return (
            <li key={`${resource.href}-${index}`} className="m-0 min-w-0">
              <a
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                data-external="true"
                className="group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <InteractiveCard interaction="group" className="border-border-strong bg-brand-background h-full shadow-none">
                  <span className="grid h-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 p-5 sm:p-6">
                    <span
                      aria-hidden="true"
                      className="bg-action-soft text-brand-primary group-hover:bg-brand-primary flex size-11 shrink-0 items-center justify-center rounded-md transition-colors duration-200 group-hover:text-white"
                    >
                      <ResourceIcon className="size-6" weight="regular" />
                    </span>

                    <span className="min-w-0">
                      <span className="leading-heading text-brand-ink group-hover:text-brand-primary block font-bold transition-colors duration-200">
                        {resource.label}
                      </span>

                      <span className="leading-body text-muted-foreground mt-3 block text-sm">{resource.description}</span>
                    </span>

                    <ArrowUpRightIcon
                      aria-hidden="true"
                      className="text-brand-ink group-hover:text-brand-primary mt-1 size-4 shrink-0 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      weight="bold"
                    />
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

export default PublicationResourcesSection;
