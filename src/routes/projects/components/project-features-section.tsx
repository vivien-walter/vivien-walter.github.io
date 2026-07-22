import {
  AtomIcon,
  CodeIcon,
  FlaskIcon,
  ImageIcon,
  LinkSimpleIcon,
  MagnifyingGlassIcon,
  MicroscopeIcon,
  TargetIcon,
  WavesIcon,
  type Icon,
} from "@phosphor-icons/react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SectionHeader from "@/shared/components/section-header";

import type {
  ProjectFeatureContent,
  ProjectFeatureIconId,
} from "../data/project-content.types";

type ProjectFeaturesSectionProps = {
  readonly features?: readonly ProjectFeatureContent[];
  readonly title: string;
  readonly titleId: string;
};

const iconByFeatureId: Readonly<
  Record<ProjectFeatureIconId, Icon>
> = {
  analysis: MagnifyingGlassIcon,
  automation: CodeIcon,
  code: CodeIcon,
  instrumentation: FlaskIcon,
  "machine-learning": AtomIcon,
  microscopy: MicroscopeIcon,
  project: TargetIcon,
  research: AtomIcon,
  simulation: WavesIcon,
  visualization: ImageIcon,
  web: LinkSimpleIcon,
};

function ProjectFeaturesSection({
  features,
  title,
  titleId,
}: ProjectFeaturesSectionProps) {
  const visibleFeatures =
    features?.filter(
      (feature) =>
        feature.title.trim().length > 0 &&
        feature.description.trim().length > 0,
    ) ?? [];

  if (visibleFeatures.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-border py-12 sm:py-14 lg:py-16"
      aria-labelledby={titleId}
    >
      <SectionHeader
        title={title}
        titleId={titleId}
        className="mb-8 sm:mb-10"
      />

      <ul
        className={cn(
          "m-0 grid list-none gap-5 p-0",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
        )}
      >
        {visibleFeatures.map((feature, index) => {
          const FeatureIcon = iconByFeatureId[feature.icon];
          const featureTitleId = `${titleId}-item-${index + 1}`;

          return (
            <li
              key={`${feature.icon}-${feature.title}-${index}`}
              className="m-0 min-w-0"
            >
              <Card
                className={cn(
                  "h-full gap-0 rounded-lg py-0",
                  "border-border-strong bg-brand-background",
                  "shadow-subtle",
                )}
              >
                <article
                  className="grid h-full content-start gap-5 p-5 sm:p-6"
                  aria-labelledby={featureTitleId}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-14 items-center justify-center",
                      "rounded-md bg-brand-primary text-white",
                      "shadow-subtle",
                    )}
                  >
                    <FeatureIcon
                      className="size-7"
                      weight="regular"
                    />
                  </span>

                  <div className="min-w-0">
                    <h3
                      id={featureTitleId}
                      className={cn(
                        "!m-0 text-lg font-bold",
                        "leading-heading tracking-[-0.0125em]",
                        "text-brand-ink",
                      )}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className={cn(
                        "!mt-3 !mb-0",
                        "text-sm leading-body text-muted-foreground",
                        "sm:text-base",
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                </article>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ProjectFeaturesSection;