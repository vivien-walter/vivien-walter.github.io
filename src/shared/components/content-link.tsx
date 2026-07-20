import { ArrowUpRightIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

import type { ContentLink as ContentLinkData } from "../content/content.types";

type ContentLinkVariant = "inline" | "resource" | "contact";

type ContentLinkProps = {
  readonly className?: string;
  readonly link: ContentLinkData;
  readonly variant?: ContentLinkVariant;
};

const variantClassNames: Record<ContentLinkVariant, string> = {
  inline: [
    "inline-flex min-h-11 items-center gap-1.5 rounded-sm py-2",
    "font-semibold text-primary underline",
    "decoration-primary/40 decoration-[0.08em] underline-offset-4",
    "transition-colors duration-150 ease-standard",
    "hover:text-action-strong hover:decoration-action-strong",
  ].join(" "),

  resource: [
    "group flex min-h-12 w-full items-center justify-between gap-4",
    "rounded-md px-3 py-3",
    "font-semibold text-heading no-underline",
    "transition-colors duration-150 ease-standard",
    "hover:bg-muted hover:text-action-strong",
  ].join(" "),

  contact: [
    "group flex min-h-20 w-full items-center justify-between gap-4",
    "rounded-lg border border-border-strong bg-card px-5 py-4",
    "text-md font-semibold text-heading no-underline shadow-subtle",
    "transition-[border-color,background-color,color,box-shadow]",
    "duration-150 ease-standard",
    "hover:border-primary hover:bg-action-soft",
    "hover:text-action-strong hover:shadow-elevated",
  ].join(" "),
};

function ContentLink({
  className,
  link,
  variant = "inline",
}: ContentLinkProps) {
  const isExternal = /^https?:\/\//.test(link.href);

  return (
    <a
      className={cn(
        "focus-visible:outline-none focus-visible:ring-[3px]",
        "focus-visible:ring-ring/50",
        variantClassNames[variant],
        className,
      )}
      href={link.href}
      data-external={isExternal ? "true" : undefined}
    >
      <span className="min-w-0">{link.label}</span>

      {isExternal ? (
        <ArrowUpRightIcon
          aria-hidden="true"
          className={[
            "size-4 shrink-0",
            "transition-transform duration-150 ease-standard",
            "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
          ].join(" ")}
          weight="bold"
        />
      ) : null}
    </a>
  );
}

export default ContentLink;