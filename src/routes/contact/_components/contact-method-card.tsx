import { ArrowRightIcon } from "@phosphor-icons/react";

import { Card } from "@/components/ui/card";
import type { ContactMethod } from "@/content/contact/contact";
import { cn } from "@/lib/utils";

type ContactMethodCardProps = {
  readonly method: ContactMethod;
};

function ContactMethodCard({
  method,
}: ContactMethodCardProps) {
  const Icon = method.icon;
  const opensInNewTab =
    method.href.startsWith("https://");

  return (
    <a
      href={method.href}
      target={opensInNewTab ? "_blank" : undefined}
      rel={opensInNewTab ? "noreferrer" : undefined}
      aria-label={`${method.actionLabel} : ${method.value}`}
      className={cn(
        "group block h-full rounded-lg",
        "text-brand-ink no-underline",
        "focus-visible:outline-none",
        "focus-visible:ring-[3px]",
        "focus-visible:ring-ring/50",
        "focus-visible:ring-offset-2",
      )}
    >
      <Card
        className={cn(
          "h-full gap-0 rounded-lg p-5",
          "border-border bg-brand-background shadow-none",
          "transition-[transform,border-color,background-color,box-shadow]",
          "duration-200 ease-standard",
          "group-hover:-translate-y-1",
          "group-hover:border-brand-primary",
          "group-hover:bg-action-soft/45",
          "group-hover:shadow-elevated",
        )}
      >
        <div className="flex min-w-0 flex-col items-start">
          <span
            className={cn(
              "text-brand-primary",
              "transition-colors duration-200 ease-standard",
              "group-hover:text-brand-dark",
            )}
          >
            <Icon
              aria-hidden="true"
              className="size-9"
              weight="regular"
            />
          </span>

          <h3
            className={cn(
              "!mt-3 !mb-0",
              "!text-base !font-bold !leading-heading",
              "!tracking-[-0.0125em] text-brand-ink",
            )}
          >
            {method.label}
          </h3>

          <p
            className={cn(
              "!mt-1.5 !mb-0 min-h-12 max-w-full",
              "text-sm leading-relaxed text-muted-foreground",
              "[overflow-wrap:anywhere]",
            )}
          >
            {method.value}
          </p>

          <span
            className={cn(
              "mt-5 flex min-h-10 items-center gap-2.5",
              "text-sm font-semibold text-brand-primary",
              "transition-colors duration-200",
              "group-hover:text-brand-dark",
            )}
          >
            <span>{method.actionLabel}</span>

            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 shrink-0"
              weight="bold"
            />
          </span>
        </div>
      </Card>
    </a>
  );
}

export default ContactMethodCard;