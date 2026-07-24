import {
  ArrowRightIcon,
  type Icon,
} from "@phosphor-icons/react";
import {
  createElement,
  type ElementType,
} from "react";
import { Link } from "react-router-dom";

import { getSoftwareRoute } from "@/app/routing/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SoftwareId } from "@/content/software/registry";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/types/localization";

export type SoftwareCatalogEntryContent = {
  readonly id: SoftwareId;
  readonly icon: Icon;
  readonly title: string;
  readonly summary: string;
  readonly kindLabel: string;
  readonly tags: readonly string[];
};

type SoftwareCatalogEntryProps = {
  readonly software: SoftwareCatalogEntryContent;
  readonly language: SupportedLanguage;
  readonly technologiesLabel: string;
  readonly viewLabel: string;
  readonly headingLevel?: 2 | 3;
};

const tagDisplays = [
  {
    limit: 2,
    className: "flex sm:hidden",
  },
  {
    limit: 3,
    className: "hidden sm:flex lg:hidden",
  },
  {
    limit: 5,
    className: "hidden lg:flex",
  },
] as const;

function SoftwareCatalogEntry({
  software,
  language,
  technologiesLabel,
  viewLabel,
  headingLevel = 3,
}: SoftwareCatalogEntryProps) {
  const headingId =
    `software-catalog-${software.id}-title`;

  const Heading =
    `h${headingLevel}` as ElementType;

  const SoftwareIcon = software.icon;

  const tags = Array.from(
    new Set(
      software.tags.filter(
        (tag) => tag.trim().length > 0,
      ),
    ),
  );

  return (
    <article
      className="min-w-0"
      aria-labelledby={headingId}
    >
      <Card
        className={cn(
          "gap-0 overflow-hidden rounded-lg py-0",
          "border-border-strong bg-brand-background",
          "shadow-subtle",
          "transition-[border-color,box-shadow]",
          "duration-200 ease-standard",
          "hover:border-brand-primary",
          "hover:shadow-elevated",
        )}
      >
        <div
          className={cn(
            "grid min-w-0",
            "sm:grid-cols-[9rem_minmax(0,1fr)]",
            "lg:grid-cols-[11rem_minmax(0,1fr)_13rem]",
          )}
        >
          <div
            className={cn(
              "flex min-h-36 items-center justify-center",
              "bg-action-soft text-brand-primary",
              "sm:row-span-2 sm:min-h-full",
              "lg:row-span-1",
            )}
          >
            <SoftwareIcon
              aria-hidden="true"
              className="size-12"
              weight="regular"
            />
          </div>

          <div className="min-w-0 p-5 sm:p-6">
            <Badge
              variant="outline"
              className={cn(
                "mb-4 border-brand-primary/35",
                "bg-brand-background",
                "font-mono text-xs font-semibold",
                "text-brand-primary",
              )}
            >
              {software.kindLabel}
            </Badge>

            {createElement(
              Heading,
              {
                id: headingId,
                className: cn(
                  "!m-0 !text-lg !font-bold",
                  "!leading-heading",
                  "!tracking-[-0.015em]",
                  "text-brand-ink",
                ),
              },
              software.title,
            )}

            <p
              className={cn(
                "!mt-3 !mb-0",
                "text-sm leading-body",
                "text-muted-foreground",
                "sm:text-base",
              )}
            >
              {software.summary}
            </p>

            {tags.length > 0 ? (
              <div className="mt-5 min-w-0 overflow-hidden">
                {tagDisplays.map(
                  ({
                    limit,
                    className,
                  }) => {
                    const visibleTags =
                      tags.slice(0, limit);

                    const hiddenTagCount =
                      tags.length -
                      visibleTags.length;

                    return (
                      <ul
                        key={limit}
                        className={cn(
                          "!m-0 min-w-0",
                          "list-none flex-nowrap",
                          "items-center gap-2 !p-0",
                          "overflow-hidden",
                          className,
                        )}
                        aria-label={
                          technologiesLabel
                        }
                      >
                        {visibleTags.map(
                          (tag) => (
                            <li
                              key={tag}
                              className="!m-0 shrink-0"
                            >
                              <Badge
                                variant="secondary"
                                className={cn(
                                  "border border-border",
                                  "bg-brand-hero px-3 py-1",
                                  "font-mono font-medium",
                                  "text-muted-foreground",
                                )}
                              >
                                {tag}
                              </Badge>
                            </li>
                          ),
                        )}

                        {hiddenTagCount > 0 ? (
                          <li className="!m-0 shrink-0">
                            <Badge
                              variant="outline"
                              className={cn(
                                "border-border-strong",
                                "bg-brand-background",
                                "px-3 py-1",
                                "font-mono font-semibold",
                                "text-brand-primary",
                              )}
                              aria-label={`${technologiesLabel}: +${hiddenTagCount}`}
                            >
                              +{hiddenTagCount}
                            </Badge>
                          </li>
                        ) : null}
                      </ul>
                    );
                  },
                )}
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              "flex min-w-0 flex-col",
              "items-stretch justify-start",
              "gap-2 p-5",
              "sm:col-start-2 sm:px-6",
              "lg:col-start-auto",
              "lg:px-5 lg:py-6",
            )}
          >
            <Button
              asChild
              className="min-h-11 w-full justify-between"
            >
              <Link
                to={getSoftwareRoute(
                  software.id,
                  language,
                )}
              >
                {viewLabel}

                <ArrowRightIcon
                  aria-hidden="true"
                  weight="bold"
                />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </article>
  );
}

export default SoftwareCatalogEntry;