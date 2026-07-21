import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  IdentificationBadgeIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type {
  ContactMethod,
  ContactMethodIconId,
} from "../data/contact-content.types";

type ContactMethodCardProps = {
  readonly method: ContactMethod;
};

type ContactMethodIconProps = {
  readonly icon: ContactMethodIconId;
};

function ContactMethodIcon({
  icon,
}: ContactMethodIconProps) {
  const iconProps = {
    "aria-hidden": true,
    className: "size-9",
    weight: "regular" as const,
  };

  switch (icon) {
    case "email":
      return <EnvelopeSimpleIcon {...iconProps} />;

    case "linkedin":
      return <LinkedinLogoIcon {...iconProps} />;

    case "github":
      return <GithubLogoIcon {...iconProps} />;

    case "orcid":
      return <IdentificationBadgeIcon {...iconProps} />;
  }
}

function ContactMethodCard({
  method,
}: ContactMethodCardProps) {
  const opensInNewTab = method.href.startsWith("https://");

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
            <ContactMethodIcon icon={method.icon} />
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