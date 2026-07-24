import {
  ArrowRightIcon,
  type Icon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { getParallelActivityRoute } from "@/app/routing/navigation";
import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ParallelActivityId } from "@/content/experience/registry";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/types/localization";

type ParallelActivityCardContent = {
  readonly id: ParallelActivityId;
  readonly icon: Icon;
  readonly title: string;
  readonly summary: string;
};

type ParallelActivitiesSectionProps = {
  readonly title: string;
  readonly items: readonly ParallelActivityCardContent[];
  readonly language: SupportedLanguage;
  readonly actionLabel: string;
};

function ParallelActivitiesSection({
  title,
  items,
  language,
  actionLabel,
}: ParallelActivitiesSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-border py-12 sm:py-14 lg:py-16"
      aria-labelledby="parallel-activities-title"
    >
      <SectionHeader
        title={title}
        titleId="parallel-activities-title"
        className="mb-8 sm:mb-10"
      />

      <ul
        className={cn(
          "m-0 grid list-none gap-5 p-0",
          "md:grid-cols-3",
        )}
      >
        {items.map((item) => {
          const ActivityIcon = item.icon;
          const titleId =
            `parallel-activity-${item.id}-title`;
          const actionId =
            `parallel-activity-${item.id}-action`;

          return (
            <li
              key={item.id}
              className="m-0 min-w-0"
            >
              <Card
                className={cn(
                  "h-full gap-0 overflow-hidden py-0",
                  "border-border-strong bg-card shadow-subtle",
                  "transition-[border-color,box-shadow]",
                  "duration-150 ease-standard",
                  "hover:border-brand-primary hover:shadow-elevated",
                )}
              >
                <CardHeader className="gap-5 px-6 pt-7 pb-0">
                  <ActivityIcon
                    aria-hidden="true"
                    className="size-11 text-brand-primary"
                    weight="regular"
                  />

                  <CardTitle
                    id={titleId}
                    className={cn(
                      "text-lg font-bold leading-heading",
                      "tracking-[-0.015em] text-brand-ink",
                    )}
                  >
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 px-6 pt-4">
                  <p className="!m-0 text-foreground">
                    {item.summary}
                  </p>
                </CardContent>

                <CardFooter className="px-6 pt-5 pb-6">
                  <Button
                    asChild
                    variant="link"
                    className={cn(
                      "h-auto min-h-11 justify-start px-0 py-2",
                      "font-semibold text-brand-primary",
                      "hover:text-action-strong",
                    )}
                  >
                    <Link
                      to={getParallelActivityRoute(
                        item.id,
                        language,
                      )}
                      aria-labelledby={`${titleId} ${actionId}`}
                    >
                      <span id={actionId}>
                        {actionLabel}
                      </span>

                      <ArrowRightIcon
                        aria-hidden="true"
                        weight="bold"
                      />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ParallelActivitiesSection;