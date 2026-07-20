import { createElement, type ElementType } from "react";
import { useTranslation } from "react-i18next";

import type { SupportedLanguage } from "@/app/routing/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ContentLink from "@/shared/components/content-link";

import type { PublicationContent } from "../data/publication-content.types";

type PublicationEntryProps = {
  readonly publication: PublicationContent;
  readonly publicationId: string;
  readonly language: SupportedLanguage;
  readonly headingLevel?: 2 | 3;
  readonly featured?: boolean;
};

function PublicationEntry({
  publication,
  publicationId,
  language,
  headingLevel = 3,
  featured = false,
}: PublicationEntryProps) {
  const { t } = useTranslation();
  const headingId = `publication-${publicationId}-title`;
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
          <Badge
            variant="outline"
            className={cn(
              "border-copper/50 bg-copper-soft",
              "font-mono font-semibold tracking-[0.04em]",
              "text-copper-strong",
            )}
          >
            <time dateTime={String(publication.year)}>
              {publication.year}
            </time>
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
              publication.title,
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 px-5 pb-6 sm:px-6">
          {publication.authors.length > 0 ? (
            <p className="!m-0 font-semibold text-heading">
              {publication.authors.join(", ")}
            </p>
          ) : null}

          <p className="!m-0 italic text-muted-foreground">
            {publication.publication}
          </p>

          {publication.summary ? (
            <div
              className={cn(
                "border-t border-border pt-4",
                "text-sm text-muted-foreground",
              )}
            >
              <p className="!m-0">
                <strong className="font-semibold text-heading">
                  {t("publication.contribution", {
                    lng: language,
                  })}
                  {" : "}
                </strong>

                {publication.summary}
              </p>
            </div>
          ) : null}
        </CardContent>

        {publication.links && publication.links.length > 0 ? (
          <CardFooter
            className={cn(
              "mt-auto flex flex-wrap gap-x-5 gap-y-2",
              "border-t border-border px-5 py-4 sm:px-6",
            )}
          >
            {publication.links.map((link, index) => (
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

export default PublicationEntry;