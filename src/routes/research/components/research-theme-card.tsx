import {
  ApertureIcon,
  AtomIcon,
  WavesIcon,
} from "@phosphor-icons/react";
import {
  createElement,
  type ElementType,
} from "react";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type {
  ResearchThemeContent,
  ResearchThemeIcon as ResearchThemeIconName,
} from "../data/research-content.types";

type ResearchThemeCardProps = {
  readonly theme: ResearchThemeContent;
  readonly to: string;
  readonly headingLevel?: 2 | 3;
};

type ThemeIconProps = {
  readonly icon: ResearchThemeIconName;
};

function ThemeIcon({ icon }: ThemeIconProps) {
  const iconProps = {
    "aria-hidden": true,
    className: "size-7",
    weight: "regular" as const,
  };

  switch (icon) {
    case "molecular-interfaces":
      return <AtomIcon {...iconProps} />;

    case "optics-photonics":
      return <ApertureIcon {...iconProps} />;

    case "molecular-communication":
      return <WavesIcon {...iconProps} />;
  }
}

function ResearchThemeCard({
  theme,
  to,
  headingLevel = 2,
}: ResearchThemeCardProps) {
  const headingId = `research-theme-${theme.id}-title`;
  const Heading = `h${headingLevel}` as ElementType;

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
          <div className="flex flex-1 p-5 sm:p-6">
            <div
              className={cn(
                "grid min-w-0 flex-1",
                "grid-cols-[3.5rem_minmax(0,1fr)]",
                "items-start gap-4",
              )}
            >
              <span
                className={cn(
                  "flex size-14 shrink-0",
                  "items-center justify-center rounded-md",
                  "bg-brand-primary text-white",
                  "shadow-subtle",
                  "transition-colors duration-200 ease-standard",
                  "group-hover:bg-brand-dark",
                )}
              >
                <ThemeIcon icon={theme.icon} />
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
                    "text-sm leading-body text-muted-foreground",
                    "sm:text-base",
                  )}
                >
                  {theme.introduction}
                </p>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "aspect-[16/9] overflow-hidden",
              "bg-brand-hero",
            )}
          >
            <img
              src={theme.image.src}
              alt={theme.image.alt}
              className={cn(
                "h-full w-full object-cover",
                "transition-transform duration-300 ease-standard",
                "group-hover:scale-[1.025]",
              )}
              style={{
                objectPosition:
                  theme.image.objectPosition ?? "center",
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Card>
      </Link>
    </article>
  );
}

export default ResearchThemeCard;