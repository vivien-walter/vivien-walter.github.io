import { ArrowRightIcon } from "@phosphor-icons/react";
import { createElement, type ElementType } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { cn } from "../lib/utils";
import { getSoftwareRoute, type SupportedLanguage } from "../navigation";
import type { SoftwareContent } from "../routes/software/data/software-content.types";
import ContentLink from "./content-link";
import ContentSections from "./content-sections";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type SoftwareEntryProps = {
  readonly software: SoftwareContent;
  readonly softwareId: string;
  readonly language: SupportedLanguage;
  readonly variant?: "summary" | "detailed";
  readonly headingLevel?: 2 | 3;
  readonly featured?: boolean;
};

function SoftwareEntry({
  software,
  softwareId,
  language,
  variant = "detailed",
  headingLevel = 3,
  featured = false,
}: SoftwareEntryProps) {
  const { t } = useTranslation();
  const headingId = `software-${softwareId}-title`;
  const Heading = `h${headingLevel}` as ElementType;

  return (
    <article className="h-full min-w-0" aria-labelledby={headingId}>
      <Card
        className={cn(
          "h-full gap-0 overflow-hidden py-0",
          "border-border-strong shadow-subtle",
          "transition-[border-color,box-shadow,transform]",
          "duration-150 ease-standard",
          "hover:border-primary hover:shadow-elevated",
          featured && [
            "border-l-4 border-l-copper",
            "bg-linear-to-br from-card to-action-soft",
            "shadow-elevated",
          ],
        )}
      >
        <CardHeader className="gap-4 px-5 py-5 sm:px-6 sm:py-6">
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
              software.title,
            )}
          </CardTitle>

          <p className="!m-0 text-base text-muted-foreground">
            {software.summary}
          </p>
        </CardHeader>

        {variant === "detailed" ? (
          <CardContent className="grid gap-6 px-5 pb-6 sm:px-6">
            {software.sections.length > 0 ? (
              <div className="grid gap-6">
                <ContentSections
                  className="max-w-none"
                  headingLevel={4}
                  idPrefix={`software-${softwareId}`}
                  sections={software.sections}
                  variant="compact"
                />
              </div>
            ) : null}

            {software.technologies && software.technologies.length > 0 ? (
              <ul
                className="!m-0 flex list-none flex-wrap gap-2 !p-0"
                aria-label={t("content.technologies", {
                  lng: language,
                })}
              >
                {software.technologies.map((technology) => (
                  <li className="!m-0" key={technology}>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "border border-border",
                        "bg-muted px-3 py-1",
                        "font-mono font-medium text-muted-foreground",
                      )}
                    >
                      {technology}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}

            {software.links && software.links.length > 0 ? (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {software.links.map((link, index) => (
                  <ContentLink
                    key={`${link.href}-${index}`}
                    link={link}
                    variant="inline"
                  />
                ))}
              </div>
            ) : null}
          </CardContent>
        ) : null}

        <CardFooter
          className={cn(
            "mt-auto border-t border-border",
            "px-5 py-4 sm:px-6",
          )}
        >
          <Button
            asChild
            variant={featured ? "default" : "outline"}
            className={cn(
              "min-h-11",
              !featured && [
                "border-border-strong bg-card",
                "text-heading shadow-none",
                "hover:border-primary hover:bg-action-soft",
                "hover:text-action-strong",
              ],
            )}
          >
            <Link to={getSoftwareRoute(softwareId, language)}>
              {t("actions.viewSoftware", { lng: language })}
              <ArrowRightIcon aria-hidden="true" weight="bold" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}

export default SoftwareEntry;