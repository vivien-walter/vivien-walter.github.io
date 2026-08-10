import { ArrowUpRightIcon, type Icon } from '@phosphor-icons/react';

import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionHeader, SectionTitle } from '@/components/section';

type ProjectResource = {
  readonly icon: Icon;
  readonly label: string;
  readonly href: string;
};

type ProjectResourcesSectionProps = {
  readonly resources?: readonly ProjectResource[];
  readonly title: string;
  readonly titleId: string;
};

function isExternalResource(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function ProjectResourcesSection({ resources, title, titleId }: ProjectResourcesSectionProps) {
  const visibleResources = resources?.filter((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? [];

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

          const isExternal = isExternalResource(resource.href);

          return (
            <li key={`${resource.href}-${index}`} className="m-0 min-w-0">
              <a
                href={resource.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                data-external={isExternal ? 'true' : undefined}
                className="group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <InteractiveCard interaction="group" className="border-border-strong bg-brand-background h-full shadow-none">
                  <div className="grid min-h-20 min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-5 sm:p-6">
                    <span aria-hidden="true" className="bg-brand-primary flex size-10 shrink-0 items-center justify-center rounded-md text-white">
                      <ResourceIcon className="size-5" weight="regular" />
                    </span>

                    <span className="leading-heading text-brand-ink group-hover:text-action-strong min-w-0 font-semibold transition-colors">
                      {resource.label}
                    </span>

                    {isExternal ? (
                      <ArrowUpRightIcon
                        aria-hidden="true"
                        className="text-brand-primary ease-standard size-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        weight="bold"
                      />
                    ) : null}
                  </div>
                </InteractiveCard>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export default ProjectResourcesSection;
