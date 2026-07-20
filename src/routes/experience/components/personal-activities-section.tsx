import { ImageBrokenIcon } from "@phosphor-icons/react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import ContentSections from "@/shared/components/content-sections";
import SectionHeader from "@/shared/components/section-header";

import type {
  ExperiencePersonalActivityContent,
  ExperiencePersonalActivityId,
  ExperiencePersonalActivityImage,
} from "../data/experience-content.types";

type PersonalActivityItem = {
  readonly activityId: ExperiencePersonalActivityId;
  readonly activity: ExperiencePersonalActivityContent;
};

type PersonalActivitiesSectionProps = {
  readonly title: string;
  readonly items: readonly PersonalActivityItem[];
};

type ActivityImageProps = {
  readonly image?: ExperiencePersonalActivityImage;
  readonly className?: string;
};

const contentLayoutByActivityId: Readonly<
  Record<ExperiencePersonalActivityId, string>
> = {
  music: "lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)]",
  illustrations:
    "lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1fr)]",
  "science-communication":
    "lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]",
};

function ActivityImage({
  image,
  className,
}: ActivityImageProps) {
  const [hasError, setHasError] = useState(false);
  const showFallback = !image || hasError;

  return (
    <div
      className={cn(
        "relative min-w-0 overflow-hidden bg-muted",
        className,
      )}
    >
      {showFallback ? (
        <div
          className={cn(
            "absolute inset-0 grid place-items-center",
            "bg-muted text-muted-foreground",
          )}
          aria-hidden="true"
        >
          <ImageBrokenIcon
            className="size-9"
            weight="regular"
          />
        </div>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: image.objectPosition ?? "center",
          }}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      )}

      {!showFallback && image.caption ? (
        <p
          className={cn(
            "absolute inset-x-0 bottom-0 !m-0",
            "bg-brand-ink/80 px-3 py-2",
            "text-xs font-normal text-white",
          )}
        >
          {image.caption}
        </p>
      ) : null}
    </div>
  );
}

function PersonalActivitiesSection({
  title,
  items,
}: PersonalActivitiesSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-border py-12 sm:py-14 lg:py-16"
      aria-labelledby="personal-activities-title"
    >
      <SectionHeader
        title={title}
        titleId="personal-activities-title"
        className="mb-8 sm:mb-10"
      />

      <Accordion
        type="single"
        collapsible
        className="grid gap-4"
      >
        {items.map(({ activity, activityId }) => {
          const triggerId =
            `personal-activity-${activityId}-trigger`;
          const contentId =
            `personal-activity-${activityId}-content`;

          const hasImages =
            activity.images !== undefined &&
            activity.images.length > 0;

          return (
            <AccordionItem
              key={activityId}
              value={activityId}
              className={cn(
                "overflow-hidden rounded-lg border",
                "border-border-strong bg-card shadow-subtle",
                "transition-[border-color,box-shadow]",
                "duration-150 ease-standard",
                "last:border-b",
                "data-[state=open]:border-brand-primary",
                "data-[state=open]:shadow-elevated",
              )}
            >
              <AccordionTrigger
                id={triggerId}
                aria-controls={contentId}
                className={cn(
                  "relative min-h-28 w-full min-w-0",
                  "rounded-none !p-0",
                  "text-left font-normal no-underline",
                  "hover:no-underline sm:min-h-32",
                  "[&>svg]:absolute",
                  "[&>svg]:right-4",
                  "[&>svg]:top-1/2",
                  "[&>svg]:m-0",
                  "[&>svg]:size-5",
                  "[&>svg]:-translate-y-1/2",
                  "[&>svg]:text-brand-primary",
                  "sm:[&>svg]:right-6",
                )}
              >
                <ActivityImage
                  image={activity.thumbnail}
                  className={cn(
                    "absolute inset-y-0 left-0",
                    "w-28 border-r border-border-strong",
                    "sm:w-40",
                  )}
                />

                <span
                  className={cn(
                    "block min-w-0 py-5",
                    "pl-[calc(7rem+1rem)] pr-12",
                    "font-normal",
                    "sm:pl-[calc(10rem+1.5rem)] sm:pr-16",
                  )}
                >
                  <span
                    className={cn(
                      "block text-lg font-bold",
                      "leading-heading tracking-[-0.015em]",
                      "text-brand-ink",
                    )}
                  >
                    {activity.title}
                  </span>

                  <span
                    className={cn(
                      "mt-2 block max-w-readable",
                      "text-sm font-normal leading-body",
                      "text-muted-foreground",
                    )}
                  >
                    {activity.summary}
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent
                id={contentId}
                aria-labelledby={triggerId}
                className={cn(
                  "grid gap-8 border-t border-border",
                  "px-5 py-7 sm:px-7 sm:py-8",
                  "lg:items-start lg:gap-10",
                  hasImages &&
                    contentLayoutByActivityId[activityId],
                )}
              >
                <div
                  className={cn(
                    "min-w-0",
                    hasImages &&
                      activityId === "illustrations" &&
                      "lg:order-2",
                  )}
                >
                  <ContentSections
                    idPrefix={`personal-activity-${activityId}`}
                    sections={activity.sections}
                    headingLevel={3}
                    variant="compact"
                  />
                </div>

                {hasImages ? (
                  <div
                    className={cn(
                      "grid min-w-0 gap-4",
                      activityId === "illustrations"
                        ? "sm:grid-cols-2 lg:order-1"
                        : "sm:grid-cols-2 lg:grid-cols-1",
                    )}
                  >
                    {activity.images?.map((image, index) => (
                      <figure
                        className="m-0 min-w-0"
                        key={`${image.src}-${index}`}
                      >
                        <ActivityImage
                          image={image}
                          className={cn(
                            "aspect-[4/3] rounded-md",
                            "border border-border-strong",
                          )}
                        />
                      </figure>
                    ))}
                  </div>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}

export default PersonalActivitiesSection;