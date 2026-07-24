import {
  ArrowUpRightIcon,
  type Icon,
} from "@phosphor-icons/react";

import SectionHeader from "@/components/section-header";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PublicationResource = {
  readonly icon: Icon;
  readonly label: string;
  readonly description: string;
  readonly href: string;
};

type PublicationResourcesSectionProps = {
  readonly resources?:
    readonly PublicationResource[];
  readonly title: string;
  readonly titleId: string;
};

function PublicationResourcesSection({
  resources,
  title,
  titleId,
}: PublicationResourcesSectionProps) {
  const visibleResources =
    resources?.filter(
      (resource) =>
        resource.label.trim().length > 0 &&
        resource.description.trim().length > 0 &&
        resource.href.trim().length > 0,
    ) ?? [];

  if (visibleResources.length === 0) {
    return null;
  }

  return (
    <section
      className={[
        "border-t border-border",
        "py-12 sm:py-14 lg:py-16",
      ].join(" ")}
      aria-labelledby={titleId}
    >
      <SectionHeader
        title={title}
        titleId={titleId}
        className="mb-8 sm:mb-10"
      />

      <ul
        className={cn(
          "m-0 grid list-none gap-4 p-0",
          "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {visibleResources.map(
          (resource, index) => {
            const ResourceIcon =
              resource.icon;

            return (
              <li
                key={`${resource.href}-${index}`}
                className="m-0 min-w-0"
              >
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  data-external="true"
                  className={cn(
                    "group block h-full rounded-lg",
                    "text-brand-ink no-underline",
                    "focus-visible:outline-none",
                    "focus-visible:ring-[3px]",
                    "focus-visible:ring-ring/50",
                    "focus-visible:ring-offset-2",
                  )}
                >
                  <Card
                    className={cn(
                      "h-full min-h-40 gap-0",
                      "rounded-lg py-0",
                      "border-border-strong",
                      "bg-brand-background shadow-none",
                      "transition-[transform,border-color,background-color,box-shadow]",
                      "duration-200 ease-standard",
                      "group-hover:-translate-y-1",
                      "group-hover:border-brand-primary",
                      "group-hover:bg-action-soft/70",
                      "group-hover:shadow-elevated",
                      "group-hover:ring-2",
                      "group-hover:ring-brand-primary/30",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-full min-w-0",
                        "grid-cols-[auto_minmax(0,1fr)_auto]",
                        "items-start gap-4",
                        "p-5 sm:p-6",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-11 shrink-0",
                          "items-center justify-center",
                          "rounded-md bg-action-soft",
                          "text-brand-primary",
                          "transition-colors",
                          "duration-200",
                          "group-hover:bg-brand-primary",
                          "group-hover:text-white",
                        )}
                      >
                        <ResourceIcon
                          className="size-6"
                          weight="regular"
                        />
                      </span>

                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block font-bold",
                            "leading-heading",
                            "text-brand-ink",
                            "transition-colors",
                            "duration-200",
                            "group-hover:text-brand-primary",
                          )}
                        >
                          {resource.label}
                        </span>

                        <span
                          className={cn(
                            "mt-3 block",
                            "text-sm leading-body",
                            "text-muted-foreground",
                          )}
                        >
                          {resource.description}
                        </span>
                      </span>

                      <ArrowUpRightIcon
                        aria-hidden="true"
                        className={cn(
                          "mt-1 size-4 shrink-0",
                          "text-brand-ink",
                          "transition-[color,transform]",
                          "duration-200",
                          "group-hover:-translate-y-0.5",
                          "group-hover:translate-x-0.5",
                          "group-hover:text-brand-primary",
                        )}
                        weight="bold"
                      />
                    </span>
                  </Card>
                </a>
              </li>
            );
          },
        )}
      </ul>
    </section>
  );
}

export default PublicationResourcesSection;