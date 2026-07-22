import {
  GithubLogoIcon,
  LinkSimpleIcon,
} from "@phosphor-icons/react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SectionHeader from "@/shared/components/section-header";
import type { ContentLink } from "@/shared/content/content.types";

type SoftwareResourcesSectionProps = {
  readonly links?: readonly ContentLink[];
  readonly title: string;
  readonly titleId: string;
};

function SoftwareResourceIcon({
  href,
}: {
  readonly href: string;
}) {
  if (href.includes("github.com")) {
    return (
      <GithubLogoIcon
        aria-hidden="true"
        className="size-12"
        weight="regular"
      />
    );
  }

  return (
    <LinkSimpleIcon
      aria-hidden="true"
      className="size-12"
      weight="regular"
    />
  );
}

function SoftwareResourcesSection({
  links,
  title,
  titleId,
}: SoftwareResourcesSectionProps) {
  const visibleLinks =
    links?.filter(
      (link) =>
        link.label.trim().length > 0 &&
        link.href.trim().length > 0,
    ) ?? [];

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-border py-12 sm:py-14 lg:py-16"
      aria-labelledby={titleId}
    >
      <SectionHeader
        title={title}
        titleId={titleId}
        className="mb-8 sm:mb-10"
      />

      <ul
        className={cn(
          "m-0 grid list-none gap-5 p-0",
          "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {visibleLinks.map((link, index) => {
          const isExternal = /^https?:\/\//.test(link.href);

          return (
            <li
              key={`${link.href}-${index}`}
              className="m-0 min-w-0"
            >
              <a
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
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
                    "h-full min-h-40 gap-0 rounded-lg py-0",
                    "border-border-strong",
                    "bg-brand-background shadow-none",
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
                  <span
                    className={cn(
                      "flex flex-1 items-center",
                      "justify-center px-5 pt-7 pb-4",
                      "text-brand-primary",
                      "transition-colors duration-200",
                      "group-hover:text-brand-dark",
                    )}
                  >
                    <SoftwareResourceIcon
                      href={link.href}
                    />
                  </span>

                  <span
                    className={cn(
                      "flex min-h-14 items-center",
                      "justify-center px-5 py-3",
                      "text-center font-semibold",
                      "leading-heading text-brand-ink",
                      "transition-colors duration-200",
                      "group-hover:text-brand-primary",
                    )}
                  >
                    {link.label}
                  </span>
                </Card>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default SoftwareResourcesSection;