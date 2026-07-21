import {
  ArrowRightIcon,
  BrowserIcon,
  CodeIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react";
import {
  createElement,
  type ElementType,
} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  getSoftwareRoute,
  type SupportedLanguage,
} from "@/app/routing/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { SoftwareContent } from "../data/software-content.types";

type SoftwareCatalogEntryProps = {
  readonly software: SoftwareContent;
  readonly softwareId: string;
  readonly language: SupportedLanguage;
  readonly viewLabel: string;
  readonly repositoryLabel: string;
  readonly headingLevel?: 2 | 3;
};

function SoftwareCatalogEntry({
  software,
  softwareId,
  language,
  viewLabel,
  repositoryLabel,
  headingLevel = 3,
}: SoftwareCatalogEntryProps) {
  const { t } = useTranslation();
  const headingId = `software-catalog-${softwareId}-title`;
  const Heading = `h${headingLevel}` as ElementType;

  const tags = Array.from(
    new Set([
      ...(software.languages ?? []),
      ...(software.technologies ?? []),
    ]),
  );

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
              "relative min-h-36 overflow-hidden",
              "bg-action-soft",
              "sm:row-span-2 sm:min-h-0",
              "lg:row-span-1",
            )}
          >
            {software.image ? (
              <img
                src={software.image.src}
                alt={software.image.alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  objectPosition:
                    software.image.objectPosition ?? "center",
                }}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-full min-h-36 items-center",
                  "justify-center text-brand-primary",
                )}
              >
                {software.kind === "web-application" ? (
                  <BrowserIcon
                    className="size-12"
                    weight="regular"
                  />
                ) : (
                  <CodeIcon
                    className="size-12"
                    weight="regular"
                  />
                )}
              </span>
            )}
          </div>

          <div className="min-w-0 p-5 sm:p-6">
            {createElement(
              Heading,
              {
                id: headingId,
                className: cn(
                  "!m-0 !text-lg !font-bold",
                  "!leading-heading !tracking-[-0.015em]",
                  "text-brand-ink",
                ),
              },
              software.title,
            )}

            <p
              className={cn(
                "!mt-3 !mb-0",
                "text-sm leading-body text-muted-foreground",
                "sm:text-base",
              )}
            >
              {software.summary}
            </p>

            {tags.length > 0 ? (
  <div className="mt-5 min-w-0 overflow-hidden">
    {tagDisplays.map(({ limit, className }) => {
      const visibleTags = tags.slice(0, limit);
      const hiddenTagCount =
        tags.length - visibleTags.length;

      return (
        <ul
          key={limit}
          className={cn(
            "!m-0 min-w-0 list-none",
            "flex-nowrap items-center gap-2 !p-0",
            "overflow-hidden",
            className,
          )}
          aria-label={t("content.technologies", {
            lng: language,
          })}
        >
          {visibleTags.map((tag) => (
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
          ))}

          {hiddenTagCount > 0 ? (
            <li className="!m-0 shrink-0">
              <Badge
                variant="outline"
                className={cn(
                  "border-border-strong",
                  "bg-brand-background px-3 py-1",
                  "font-mono font-semibold",
                  "text-brand-primary",
                )}
                aria-label={`${t("content.technologies", {
                  lng: language,
                })}: +${hiddenTagCount}`}
              >
                +{hiddenTagCount}
              </Badge>
            </li>
          ) : null}
        </ul>
      );
    })}
  </div>
) : null}
          </div>

     <div
  className={cn(
    "flex min-w-0 flex-col",
    "items-stretch justify-start gap-2",
    "p-5",
    "sm:col-start-2 sm:px-6",
    "lg:col-start-auto lg:px-5 lg:py-6",
  )}
>
            <Button
              asChild
              className="min-h-11 w-full justify-between"
            >
              <Link
                to={getSoftwareRoute(
                  softwareId,
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

            {software.repository ? (
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "min-h-11 w-full justify-start",
                  "px-2 text-brand-primary",
                  "hover:bg-action-soft",
                  "hover:text-brand-dark",
                )}
              >
                <a
                  href={software.repository.href}
                  aria-label={`${repositoryLabel} — ${software.title}`}
                >
                  <GithubLogoIcon
                    aria-hidden="true"
                    weight="bold"
                  />

                  {repositoryLabel}
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </Card>
    </article>
  );
}

export default SoftwareCatalogEntry;