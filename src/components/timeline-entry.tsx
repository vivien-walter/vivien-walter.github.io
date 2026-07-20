import { createElement, type ElementType } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "../lib/utils";
import type { SupportedLanguage } from "../navigation";
import type { ExperienceContent } from "../routes/experience/data/experience-content.types";
import { formatContentDateRange } from "../shared/content/content-formatters";
import ContentLink from "./content-link";
import ContentSections from "./content-sections";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type TimelineEntryProps = {
  readonly experience: ExperienceContent;
  readonly experienceId: string;
  readonly language: SupportedLanguage;
  readonly headingLevel?: 2 | 3;
};

function TimelineEntry({
  experience,
  experienceId,
  language,
  headingLevel = 3,
}: TimelineEntryProps) {
  const { t } = useTranslation();
  const headingId = `experience-${experienceId}-title`;
  const Heading = `h${headingLevel}` as ElementType;

  return (
    <article className="min-w-0" aria-labelledby={headingId}>
      <Card
        className={cn(
          "gap-0 overflow-hidden border-border-strong py-0",
          "border-l-4 border-l-primary shadow-subtle",
          "transition-[border-color,box-shadow]",
          "duration-150 ease-standard",
          "hover:border-primary hover:shadow-elevated",
        )}
      >
        <CardHeader className="gap-4 px-5 py-5 sm:px-6 sm:py-6">
          <Badge
            variant="outline"
            className={cn(
              "border-copper/50 bg-copper-soft",
              "font-mono font-semibold tracking-[0.04em]",
              "text-copper-strong uppercase",
            )}
          >
            {formatContentDateRange(experience.period, language)}
          </Badge>

          <CardTitle>
            {createElement(
              Heading,
              {
                id: headingId,
                className: cn(
                  "!m-0 text-lg font-bold leading-heading",
                  "tracking-[-0.015em] text-heading",
                  "sm:text-xl",
                ),
              },
              experience.organization,
            )}
          </CardTitle>

          {experience.location ? (
            <p className="!m-0 text-sm text-muted-foreground">
              {experience.location}
            </p>
          ) : null}
        </CardHeader>

        <CardContent className="grid gap-6 px-5 pb-6 sm:px-6">
          <dl className="!m-0 grid gap-2 border-t border-border pt-4">
            <div>
              <dt
                className={cn(
                  "mb-1 font-mono text-xs font-semibold",
                  "tracking-[0.04em] text-muted-foreground uppercase",
                )}
              >
                {t("content.role", { lng: language })}
              </dt>

              <dd className="m-0 font-semibold text-heading">
                {experience.role}
              </dd>
            </div>
          </dl>

          <p className="!m-0 text-muted-foreground">
            {experience.summary}
          </p>

          {experience.sections.length > 0 ? (
            <div className="grid gap-6">
              <ContentSections
                className="max-w-none"
                headingLevel={4}
                idPrefix={`experience-${experienceId}`}
                sections={experience.sections}
                variant="compact"
              />
            </div>
          ) : null}
        </CardContent>

        {experience.links && experience.links.length > 0 ? (
          <CardFooter
            className={cn(
              "flex flex-wrap gap-x-5 gap-y-2",
              "border-t border-border px-5 py-4 sm:px-6",
            )}
          >
            {experience.links.map((link, index) => (
              <ContentLink
                key={`${link.href}-${index}`}
                link={link}
                variant="inline"
              />
            ))}
          </CardFooter>
        ) : null}
      </Card>
    </article>
  );
}

export default TimelineEntry;