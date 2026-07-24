import type { ReactNode } from "react";

import Breadcrumbs, {
  type BreadcrumbItemData,
} from "@/components/breadcrumbs";
import { cn } from "@/lib/utils";

type PageHeroBreadcrumbs = {
  readonly ariaLabel: string;
  readonly items: readonly BreadcrumbItemData[];
};

type PageHeroImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

type PageHeroProps = {
  readonly title: string;
  readonly introduction: string | readonly string[];
  readonly eyebrow?: string;
  readonly breadcrumbs?: PageHeroBreadcrumbs;
  readonly actions?: ReactNode;
  readonly footer?: ReactNode;
  readonly image?: PageHeroImage;
};

function PageHero({
  title,
  introduction,
  eyebrow,
  breadcrumbs,
  actions,
  footer,
  image,
}: PageHeroProps) {
  const paragraphs =
    typeof introduction === "string"
      ? [introduction]
      : introduction;

  return (
    <section
      className="border-b border-border bg-brand-hero"
      aria-labelledby="page-title"
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-editorial",
          "lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]",
        )}
      >
        <div
          className={cn(
            "min-w-0 px-page",
            "pt-5 pb-8",
            "sm:pt-6 sm:pb-10",
            "lg:pt-6 lg:pb-12",
            "xl:pb-14",
          )}
        >
          <div className="min-h-6">
            {breadcrumbs ? (
              <Breadcrumbs
                ariaLabel={breadcrumbs.ariaLabel}
                items={breadcrumbs.items}
              />
            ) : null}
          </div>

          <header className="mt-4 max-w-readable sm:mt-5">
            {eyebrow ? (
              <p
                className={cn(
                  "!m-0",
                  "font-mono text-xs font-semibold uppercase",
                  "tracking-[0.12em] text-brand-accent",
                )}
              >
                {eyebrow}
              </p>
            ) : null}

            <h1
              id="page-title"
              className={cn(
                "!m-0 max-w-[18ch]",
                "!text-[clamp(2.25rem,1.55rem+2.5vw,4rem)]",
                "!leading-tight !tracking-[-0.04em]",
                "text-brand-ink",
                eyebrow && "!mt-3 sm:!mt-4",
              )}
            >
              {title}
            </h1>

            <div
              className={cn(
                "mt-6 max-w-[42rem]",
                "text-md text-muted-foreground",
              )}
            >
              {paragraphs.map((paragraph, index) => (
                <p
                  className={cn(
                    "!m-0",
                    index > 0 && "!mt-4",
                  )}
                  key={`${index}-${paragraph}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          {actions ? (
            <div
              className={cn(
                "mt-8 flex flex-wrap items-center",
                "gap-3 sm:gap-4",
              )}
            >
              {actions}
            </div>
          ) : null}

          {footer ? (
            <div
              className={cn(
                "mt-10 border-t border-border pt-6",
                "sm:mt-12 sm:pt-8",
              )}
            >
              {footer}
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "min-w-0",
            image
              ? [
                  "min-h-64 bg-brand-background",
                  "sm:min-h-80 lg:min-h-full",
                  "lg:border-l lg:border-border",
                ]
              : "hidden lg:block",
          )}
          aria-hidden={image ? undefined : "true"}
        >
          {image ? (
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              style={{
                objectPosition:
                  image.objectPosition ?? "center",
              }}
              decoding="async"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default PageHero;