import {
  createElement,
  type ElementType,
} from "react";
import type { Icon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";
import type { ResearchThemeId } from "@/content/research/registry";
import { cn } from "@/lib/utils";

type ResearchThemeCardContent = {
  readonly id: ResearchThemeId;
  readonly icon: Icon;
  readonly title: string;
  readonly introduction: string;
};

type ResearchThemeCardProps = {
  readonly theme: ResearchThemeCardContent;
  readonly to: string;
  readonly headingLevel?: 2 | 3;
};

function ResearchThemeCard({
  theme,
  to,
  headingLevel = 2,
}: ResearchThemeCardProps) {
  const headingId =
    `research-theme-${theme.id}-title`;

  const Heading =
    `h${headingLevel}` as ElementType;

  const ThemeIcon = theme.icon;

  return (
    <article
      className="h-full min-w-0"
      aria-labelledby={headingId}
    >
      <Link
        to={to}
        className={cn(
          "group block h-full rounded-lg",
          "text-foreground no-underline",
          "focus-visible:outline-none",
          "focus-visible:ring-[3px]",
          "focus-visible:ring-ring/50",
          "focus-visible:ring-offset-2",
        )}
      >
        <Card
          className={cn(
            "h-full gap-0 overflow-hidden rounded-lg py-0",
            "border-border-strong bg-card shadow-subtle",
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
          <div className="flex h-full p-5 sm:p-6">
            <div
              className={cn(
                "grid min-w-0 flex-1",
                "grid-cols-[3.5rem_minmax(0,1fr)]",
                "items-start gap-4",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-14 shrink-0",
                  "items-center justify-center rounded-md",
                  "bg-brand-primary text-white",
                  "shadow-subtle",
                  "transition-colors duration-200 ease-standard",
                  "group-hover:bg-brand-dark",
                )}
              >
                <ThemeIcon
                  className="size-7"
                  weight="regular"
                />
              </span>

              <div className="min-w-0">
                {createElement(
                  Heading,
                  {
                    id: headingId,
                    className: cn(
                      "!m-0 !text-base !font-bold",
                      "!leading-heading !tracking-[-0.0125em]",
                      "text-brand-ink",
                      "transition-colors duration-200 ease-standard",
                      "group-hover:text-brand-primary",
                      "sm:!text-lg",
                    ),
                  },
                  theme.title,
                )}

                <p
                  className={cn(
                    "!mt-3 !mb-0",
                    "text-sm leading-body",
                    "text-muted-foreground",
                    "sm:text-base",
                  )}
                >
                  {theme.introduction}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </article>
  );
}

export default ResearchThemeCard;