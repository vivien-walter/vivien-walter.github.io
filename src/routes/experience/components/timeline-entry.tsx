import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { createElement, type ElementType } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import {
  getExperienceRoute,
  getProjectRoute,
  type SupportedLanguage,
} from "@/app/routing/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProjectById } from "@/routes/projects/data/project-content.loader";

import type { ExperienceContent } from "../data/experience-content.types";

type TimelineEntryProps = {
  readonly experience: ExperienceContent;
  readonly experienceId: string;
  readonly language: SupportedLanguage;
  readonly headingLevel?: 2 | 3;
  readonly isFirst?: boolean;
  readonly isLast?: boolean;
};

function formatExperienceYears(
  start: string,
  end: string | undefined,
): string {
  const startYear = /^\d{4}/.exec(start)?.[0] ?? start;

  if (!end) {
    return startYear;
  }

  const endYear = /^\d{4}/.exec(end)?.[0] ?? end;

  return startYear === endYear
    ? startYear
    : `${startYear} – ${endYear}`;
}

function TimelineEntry({
  experience,
  experienceId,
  language,
  headingLevel = 3,
  isFirst = false,
  isLast = false,
}: TimelineEntryProps) {
  const { t } = useTranslation();
  const headingId = `experience-${experienceId}-title`;
  const Heading = `h${headingLevel}` as ElementType;

  const relatedProjects = (experience.relatedProjects ?? []).flatMap(
    ({ projectId }) => {
      const project = getProjectById(language, projectId);

      return project ? [{ project, projectId }] : [];
    },
  );

  return (
    <article
      className={cn(
        "relative grid min-w-0 gap-4 py-8",
        "first:pt-0 last:pb-0",
        "md:grid-cols-[8.5rem_2.5rem_minmax(0,1fr)]",
        "md:gap-x-5 md:gap-y-0",
      )}
      aria-labelledby={headingId}
    >
      <p
        className={cn(
          "!m-0 font-mono text-sm font-semibold",
          "leading-heading text-brand-primary",
          "md:pt-1",
        )}
      >
        {formatExperienceYears(
          experience.period.start,
          experience.period.end,
        )}
      </p>

      <div
        aria-hidden="true"
        className={cn(
          "relative hidden w-px self-stretch",
          "justify-self-center md:block",
          "-my-8",
          isFirst && "mt-0",
          isLast && "mb-0",
        )}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 w-px",
            "bg-brand-primary/35",
            isFirst && "top-3.5",
            isLast && "bottom-auto h-[2.875rem]",
          )}
        />

        <span
          className={cn(
            "absolute left-1/2 size-4",
            "z-10 -translate-x-1/2 rounded-full",
            "border-4 border-brand-background",
            "bg-brand-primary ring-1 ring-border-strong",
            isFirst ? "top-1.5" : "top-[2.375rem]",
          )}
        />
      </div>

      <div
        className={cn(
          "grid min-w-0 gap-6",
          "lg:grid-cols-[minmax(0,1fr)_auto]",
        )}
      >
        <div className="min-w-0">
          <header className="min-w-0">
            {createElement(
              Heading,
              {
                id: headingId,
                className: cn(
                  "!m-0 text-lg font-bold leading-heading",
                  "tracking-[-0.015em] text-brand-ink",
                ),
              },
              experience.role,
            )}

            <p
              className={cn(
                "!mt-1 !mb-0 font-semibold",
                "leading-heading text-brand-primary",
              )}
            >
              {experience.organization}
            </p>

            {experience.location ? (
              <p className="!mt-1 !mb-0 text-sm text-muted-foreground">
                {experience.location}
              </p>
            ) : null}
          </header>

          <p
            className={cn(
              "!mt-4 !mb-0 max-w-readable",
              "text-foreground",
            )}
          >
            {experience.summary}
          </p>
        </div>

        <div
          className={cn(
            "flex min-w-0 flex-col items-stretch gap-2",
            "sm:items-start lg:w-52 lg:items-stretch",
          )}
        >
          <Button
            asChild
            className="min-h-11 w-full justify-between"
          >
            <Link to={getExperienceRoute(experienceId, language)}>
              <span className="min-w-0 whitespace-nowrap text-left">
                {t("actions.viewExperience", { lng: language })}
              </span>

              <ArrowRightIcon
                aria-hidden="true"
                className="shrink-0"
                weight="bold"
              />
            </Link>
          </Button>

          {relatedProjects.length > 0 ? (
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "min-h-11 w-full justify-between",
                    "text-brand-primary",
                    "hover:bg-action-soft hover:text-action-strong",
                    "data-[state=open]:bg-action-soft",
                    "data-[state=open]:text-action-strong",
                  )}
                >
                  <span className="min-w-0 whitespace-normal text-left">
                    {t("content.relatedProjects", {
                      lng: language,
                    })}
                  </span>

                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="shrink-0"
                    weight="bold"
                  />
                </Button>
              </DropdownMenuPrimitive.Trigger>

              <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                  align="end"
                  sideOffset={6}
                  className={cn(
                    "z-50 min-w-64 max-w-[calc(100vw-2rem)]",
                    "overflow-hidden rounded-md border",
                    "border-border-strong bg-popover p-1",
                    "text-popover-foreground shadow-elevated",
                  )}
                >
                  {relatedProjects.map(({ project, projectId }) => (
                    <DropdownMenuPrimitive.Item
                      asChild
                      key={projectId}
                    >
                      <Link
                        className={cn(
                          "flex min-h-11 cursor-pointer items-center",
                          "rounded-sm px-3 py-2",
                          "text-sm font-medium text-brand-ink",
                          "no-underline outline-none",
                          "data-[highlighted]:bg-action-soft",
                          "data-[highlighted]:text-action-strong",
                        )}
                        to={getProjectRoute(projectId, language)}
                      >
                        <span className="min-w-0">
                          {project.title}
                        </span>
                      </Link>
                    </DropdownMenuPrimitive.Item>
                  ))}
                </DropdownMenuPrimitive.Content>
              </DropdownMenuPrimitive.Portal>
            </DropdownMenuPrimitive.Root>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default TimelineEntry;