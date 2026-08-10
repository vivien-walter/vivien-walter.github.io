import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import type { SoftwareCatalogItem } from '@/content/software/catalog';

type ResourcesSectionProps = {
  readonly description: string;
  readonly resources?: SoftwareCatalogItem['resources'];
  readonly title: string;
  readonly titleId: string;
};

export default function ResourcesSection({ description, resources, title, titleId }: ResourcesSectionProps) {
  const resourceLinkClassName =
    'group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none';

  const visibleResources = resources?.filter((resource) => resource.label.trim().length > 0 && resource.href.trim().length > 0) ?? [];

  if (visibleResources.length === 0) {
    return null;
  }

  return (
    <Section className="pt-12 sm:py-14 lg:py-16" aria-labelledby={titleId}>
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id={titleId}>{title}</SectionTitle>

        <SectionDescription>{description}</SectionDescription>
      </SectionHeader>

      <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {visibleResources.map((resource) => {
          const ResourceIcon = resource.icon;
          const LinkIndicatorIcon = resource.isExternal ? ArrowUpRightIcon : ArrowRightIcon;

          const resourceCard = (
            <InteractiveCard
              interaction="group"
              className="border-border-strong bg-brand-background h-full min-h-40 gap-0 rounded-lg py-0 shadow-none"
            >
              <span className="text-brand-primary group-hover:text-brand-dark flex flex-1 items-center justify-center px-5 pt-7 pb-4 transition-colors duration-200">
                <ResourceIcon aria-hidden="true" className="size-12" weight="regular" />
              </span>

              <span className="leading-heading text-brand-ink group-hover:text-brand-primary flex min-h-14 items-center justify-center gap-2 px-5 py-3 text-center font-semibold transition-colors duration-200">
                <span>{resource.label}</span>

                <LinkIndicatorIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
              </span>
            </InteractiveCard>
          );

          return (
            <li key={resource.href} className="m-0 min-w-0">
              {resource.isExternal ? (
                <a href={resource.href} target="_blank" rel="noopener noreferrer" data-external="true" className={resourceLinkClassName}>
                  {resourceCard}
                </a>
              ) : (
                <Link to={resource.href} className={resourceLinkClassName}>
                  {resourceCard}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
