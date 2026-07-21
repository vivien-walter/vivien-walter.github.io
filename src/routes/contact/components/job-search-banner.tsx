import {
  BriefcaseIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type JobSearchBannerProps = {
  readonly message: string;
  readonly frenchCvLabel: string;
  readonly englishCvLabel: string;
};

function JobSearchBanner({
  message,
  frenchCvLabel,
  englishCvLabel,
}: JobSearchBannerProps) {
  const cvButtonClassName = cn(
    "min-h-11 w-full justify-between",
    "rounded-sm border-white",
    "!bg-white !text-brand-accent shadow-none",
    "hover:!bg-white/90 hover:!text-brand-accent",
    "dark:!bg-white dark:!text-brand-accent",
    "dark:hover:!bg-white/90",
    "dark:hover:!text-brand-accent",
  );

  return (
    <section
      className="bg-brand-accent py-10 sm:py-12"
      aria-label={message}
    >
      <div className="mx-auto w-full max-w-editorial px-page">
        <div
          className={cn(
            "rounded-sm border border-white/70",
            "bg-white/10 px-6 py-7",
            "sm:px-8 sm:py-8 lg:px-10",
          )}
        >
          <div
            className={cn(
              "grid gap-7",
              "lg:grid-cols-[minmax(0,1fr)_auto]",
              "lg:items-center lg:gap-10",
            )}
          >
            <div
              className={cn(
                "grid items-center gap-5",
                "sm:grid-cols-[auto_minmax(0,1fr)]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-14 shrink-0",
                  "items-center justify-center rounded-md",
                  "bg-white/15 text-white",
                )}
              >
                <BriefcaseIcon
                  className="size-8"
                  weight="regular"
                />
              </span>

              <p
                className={cn(
                  "!m-0 max-w-[42rem]",
                  "text-base font-semibold leading-relaxed",
                  "text-white sm:text-md",
                )}
              >
                {message}
              </p>
            </div>

            <div
              className={cn(
                "grid gap-3",
                "sm:grid-cols-2 lg:w-72 lg:grid-cols-1",
              )}
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                className={cvButtonClassName}
              >
                <span>{frenchCvLabel}</span>

                <DownloadSimpleIcon
                  aria-hidden="true"
                  className="size-4"
                  weight="bold"
                />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className={cvButtonClassName}
              >
                <span>{englishCvLabel}</span>

                <DownloadSimpleIcon
                  aria-hidden="true"
                  className="size-4"
                  weight="bold"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobSearchBanner;