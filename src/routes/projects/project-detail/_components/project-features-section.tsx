import type { Icon } from '@phosphor-icons/react';

import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Card } from '@/components/ui/card';

type ProjectFeature = {
  readonly icon: Icon;
  readonly title: string;
  readonly description: string;
};

type ProjectFeaturesSectionProps = {
  readonly features?: readonly ProjectFeature[];
  readonly title: string;
  readonly titleId: string;
  readonly description?: string;
};

function ProjectFeaturesSection({ description, features, title, titleId }: ProjectFeaturesSectionProps) {
  const visibleFeatures = features?.filter((feature) => feature.title.trim().length > 0 && feature.description.trim().length > 0) ?? [];

  if (visibleFeatures.length === 0) {
    return null;
  }

  return (
    <Section contained={false} className="py-12 sm:py-14 lg:py-16" aria-labelledby={titleId}>
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id={titleId}>{title}</SectionTitle>

        {description?.trim() ? <SectionDescription>{description}</SectionDescription> : null}
      </SectionHeader>

      <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {visibleFeatures.map((feature, index) => {
          const FeatureIcon = feature.icon;

          const featureTitleId = `${titleId}-item-${index + 1}`;

          return (
            <li key={`${feature.title}-${index}`} className="m-0 min-w-0">
              <Card className="border-border-strong bg-brand-background shadow-subtle h-full gap-0 rounded-lg py-0">
                <article className="grid h-full content-start gap-5 p-5 sm:p-6" aria-labelledby={featureTitleId}>
                  <span aria-hidden="true" className="bg-brand-primary shadow-subtle flex size-14 items-center justify-center rounded-md text-white">
                    <FeatureIcon className="size-7" weight="regular" />
                  </span>

                  <div className="min-w-0">
                    <h3 id={featureTitleId} className="leading-heading text-brand-ink !m-0 text-lg font-bold tracking-[-0.0125em]">
                      {feature.title}
                    </h3>

                    <p className="leading-body text-muted-foreground !mt-3 !mb-0 text-sm sm:text-base">{feature.description}</p>
                  </div>
                </article>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export default ProjectFeaturesSection;
