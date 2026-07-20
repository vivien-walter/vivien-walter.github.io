import {
  CalendarBlankIcon,
  CodeIcon,
  ImageIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  getProjectRoute,
  type SupportedLanguage,
} from "@/app/routing/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { ProjectContent } from "../data/project-content.types";

type ProjectIndexCardProps = {
  readonly project: ProjectContent;
  readonly projectId: string;
  readonly language: SupportedLanguage;
};

const maximumVisibleTechnologies = 3;

function formatProjectYears(project: ProjectContent): string | undefined {
  if (!project.period) {
    return undefined;
  }

  const startYear = project.period.start.slice(0, 4);
  const endYear = project.period.end?.slice(0, 4);

  if (!endYear || endYear === startYear) {
    return startYear;
  }

  return `${startYear} – ${endYear}`;
}

function ProjectIndexCard({
  project,
  projectId,
  language,
}: ProjectIndexCardProps) {
  const { t } = useTranslation();
  const headingId = `project-index-${projectId}-title`;
  const period = formatProjectYears(project);
  const programmingLanguages = project.programmingLanguages ?? [];
  const programmingLanguageSet = new Set(programmingLanguages);

  const visibleTechnologies = (project.technologies ?? [])
    .filter((technology) => !programmingLanguageSet.has(technology))
    .slice(0, maximumVisibleTechnologies);

  return (
    <article
      className="min-w-0"
      aria-labelledby={headingId}
    >
      <Link
        to={getProjectRoute(projectId, language)}
        className={cn(
          "group block rounded-lg text-inherit no-underline",
          "focus-visible:outline-none",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "focus-visible:ring-offset-2",
        )}
      >
        <Card
          className={cn(
            "grid gap-0 overflow-hidden rounded-lg py-0",
            "border-border-strong bg-brand-background shadow-none",
            "transition-[transform,border-color,background-color,box-shadow]",
            "duration-200 ease-standard",
"group-hover:-translate-y-1",
"group-hover:border-brand-primary",
"group-hover:bg-action-soft/70",
"group-hover:shadow-elevated",
"group-hover:ring-2 group-hover:ring-brand-primary/30",
            "md:grid-cols-[13rem_minmax(0,1fr)_11rem]",
          )}
        >
          <div
            className={cn(
              "flex min-h-32 items-center justify-center",
              "border-b border-border bg-transparent",
              "p-4 text-muted-foreground",
              "md:min-h-full md:border-b-0",
            )}
            aria-hidden="true"
          >
            <div
              className={cn(
                "flex h-full min-h-24 w-full items-center justify-center",
                "rounded-md border border-dashed border-border-strong",
                "bg-transparent",
              )}
            >
              <ImageIcon
                className="size-10 opacity-50"
                weight="thin"
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col p-4 sm:p-5">
            <h2
              id={headingId}
              className={cn(
                "!m-0 !text-base !font-semibold",
                "!leading-heading !tracking-[-0.0125em]",
                "text-brand-ink transition-colors",
                "group-hover:text-brand-primary",
                "sm:!text-lg",
              )}
            >
              {project.title}
            </h2>

            <p
              className={cn(
                "!m-0 mt-2 max-w-readable",
                "text-sm leading-relaxed text-muted-foreground",
              )}
            >
              {project.summary}
            </p>

            {visibleTechnologies.length > 0 ? (
              <ul
                className={cn(
                  "!m-0 mt-auto flex list-none flex-wrap",
                  "gap-2 pt-3 !p-x-0 !pb-0",
                )}
                aria-label={t("content.technologies", {
                  lng: language,
                })}
              >
                {visibleTechnologies.map((technology) => (
                  <li
                    className="!m-0"
                    key={technology}
                  >
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-md border-0",
                        "bg-action-soft px-2 py-0.5",
                        "text-xs font-medium text-brand-primary",
                      )}
                    >
                      {technology}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div
            className={cn(
              "flex min-w-0 flex-col gap-3",
              "border-t border-border p-4",
              "text-sm leading-snug text-muted-foreground",
              "md:border-t-0 md:border-l",
            )}
          >
            {period ? (
              <div className="flex items-start gap-2.5">
                <CalendarBlankIcon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-brand-ink"
                  weight="regular"
                />

                <span className="min-w-0">
                  <span className="sr-only">
                    {t("content.period", {
                      lng: language,
                    })}
                    {": "}
                  </span>

                  {period}
                </span>
              </div>
            ) : null}

            {programmingLanguages.length > 0 ? (
              <div className="flex items-start gap-2.5">
                <CodeIcon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-brand-ink"
                  weight="regular"
                />

                <span className="min-w-0">
                  <span className="sr-only">
                    {t(
                      "pages.projects.controls.filterByLanguage",
                      {
                        lng: language,
                      },
                    )}
                    {": "}
                  </span>

                  {programmingLanguages.join(", ")}
                </span>
              </div>
            ) : null}
          </div>
        </Card>
      </Link>
    </article>
  );
}

export default ProjectIndexCard;