import {
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import {
  createElement,
  type ElementType,
} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  getProjectRoute,
  type SupportedLanguage,
} from "@/app/routing/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatContentDateRange } from "@/shared/content/content-formatters";

import type { FeaturedWork } from "../data/featured-work-content.types";

type FeaturedWorkCardProps = {
  readonly work: FeaturedWork;
  readonly language: SupportedLanguage;
  readonly headingLevel?: 2 | 3;
  readonly imageSrc?: string;
};

function FeaturedWorkCard({
  work,
  language,
  headingLevel = 3,
  imageSrc,
}: FeaturedWorkCardProps) {
  const { t } = useTranslation();
  const Heading = `h${headingLevel}` as ElementType;
  const headingId = `featured-${work.kind}-${work.contentId}-title`;

  const footer =
    work.kind === "project" ? (
      <>
        <span className="text-sm text-muted-foreground">
          {formatContentDateRange(work.period, language)}
        </span>

        <Button
          asChild
          variant="ghost"
          className={cn(
            "min-h-10 px-2 text-brand-primary",
            "hover:bg-action-soft hover:text-brand-primary",
          )}
        >
          <Link to={getProjectRoute(work.contentId, language)}>
            {t("actions.viewProject", { lng: language })}

            <ArrowRightIcon
              aria-hidden="true"
              weight="bold"
            />
          </Link>
        </Button>
      </>
    ) : work.kind === "software" ? (
      <>
        <span
          className={cn(
            "font-mono text-sm font-medium",
            "text-muted-foreground",
          )}
        >
          {work.primaryLanguage}
        </span>

        <Button
          asChild
          variant="ghost"
          className={cn(
            "min-h-10 px-2 text-brand-primary",
            "hover:bg-action-soft hover:text-brand-primary",
          )}
        >
          <Link to={getProjectRoute(work.projectId, language)}>
            {t("actions.viewProject", { lng: language })}

            <ArrowRightIcon
              aria-hidden="true"
              weight="bold"
            />
          </Link>
        </Button>
      </>
    ) : (
      <>
        <span className="text-sm text-muted-foreground">
          {work.journal}
        </span>

        <Button
          asChild
          variant="ghost"
          className={cn(
            "min-h-10 px-2 text-brand-primary",
            "hover:bg-action-soft hover:text-brand-primary",
          )}
        >
          <a
            href={work.doi.href}
            target="_blank"
            rel="noreferrer"
          >
            {work.doi.label}

            <ArrowUpRightIcon
              aria-hidden="true"
              weight="bold"
            />
          </a>
        </Button>
      </>
    );

  return (
    <article
      className="h-full min-w-0"
      aria-labelledby={headingId}
    >
      <Card
        className={cn(
          "h-full gap-0 overflow-hidden rounded-sm py-0",
          "border-border-strong shadow-subtle",
          "transition-[border-color,box-shadow,transform]",
          "duration-150 ease-standard",
          "hover:-translate-y-0.5",
          "hover:border-brand-primary hover:shadow-elevated",
        )}
      >
        {imageSrc && work.image ? (
          <div className="aspect-[16/9] overflow-hidden bg-muted">
            <img
              src={imageSrc}
              alt={work.image.alt}
              className="h-full w-full object-cover"
              style={{
                objectPosition:
                  work.image.objectPosition ?? "center",
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}

        <CardHeader className="gap-4 px-5 py-5 sm:px-6 sm:py-6">
          <Badge
            variant="secondary"
            className={cn(
              "w-fit rounded-sm border border-border",
              "bg-brand-hero px-2.5 py-1",
              "font-mono text-xs font-semibold",
              "tracking-[0.06em] text-brand-primary uppercase",
            )}
          >
            {t(`contentKinds.${work.kind}`, {
              lng: language,
            })}
          </Badge>

          <CardTitle>
            {createElement(
              Heading,
              {
                id: headingId,
                className: cn(
                  "!m-0 text-lg font-bold leading-heading",
                  "tracking-[-0.015em] text-brand-ink",
                  "sm:text-xl",
                ),
              },
              work.title,
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-6 sm:px-6">
          <p className="!m-0 text-base text-muted-foreground">
            {work.summary}
          </p>
        </CardContent>

        <CardFooter
          className={cn(
            "mt-auto flex min-h-16 flex-wrap",
            "items-center justify-between gap-3",
            "border-t border-border px-5 py-3 sm:px-6",
          )}
        >
          {footer}
        </CardFooter>
      </Card>
    </article>
  );
}

export default FeaturedWorkCard;