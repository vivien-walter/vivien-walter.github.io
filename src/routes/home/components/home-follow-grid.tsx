import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  IdentificationBadgeIcon,
  LinkedinLogoIcon,
  MapPinIcon,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ContentLink } from "@/shared/content/content.types";

type HomeFollowGridProps = {
  readonly location: string;
  readonly links: readonly ContentLink[];
};

const socialProfilePatterns = [
  {
    pattern: /^https:\/\/(?:www\.)?linkedin\.com\//,
    icon: LinkedinLogoIcon,
  },
  {
    pattern: /^https:\/\/github\.com\//,
    icon: GithubLogoIcon,
  },
  {
    pattern: /^https:\/\/orcid\.org\//,
    icon: IdentificationBadgeIcon,
  },
] as const;

function HomeFollowGrid({
  location,
  links,
}: HomeFollowGridProps) {
  const socialProfiles = socialProfilePatterns.flatMap(
    ({ pattern, icon }) => {
      const link = links.find((item) => pattern.test(item.href));

      return link
        ? [
            {
              ...link,
              icon,
            },
          ]
        : [];
    },
  );

  const cardClassName = cn(
    "m-0 grid min-h-40 grid-rows-2",
    "justify-items-center gap-4",
    "rounded-sm bg-muted/50 p-5 text-center",
  );

  return (
    <ul
      className={cn(
        "m-0 grid list-none gap-4 p-0",
        "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      <li className={cardClassName}>
        <MapPinIcon
          aria-hidden="true"
          className="size-10 self-center text-brand-accent"
          weight="regular"
        />

        <p
          className={cn(
            "!m-0 self-center",
            "text-sm font-semibold leading-relaxed",
            "text-brand-ink",
          )}
        >
          {location}
        </p>
      </li>

      {socialProfiles.map((link) => {
        const Icon = link.icon;

        return (
          <li className={cardClassName} key={link.href}>
            <Icon
              aria-hidden="true"
              className="size-10 self-center text-brand-accent"
              weight="regular"
            />

            <Button
              asChild
              variant="ghost"
              className={cn(
                "h-auto min-h-11 w-fit self-center",
                "px-3 text-sm font-semibold",
                "text-brand-primary",
                "hover:bg-action-soft hover:text-brand-primary",
              )}
            >
              <a href={link.href}>
                <span>{link.label}</span>

                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="size-4"
                  weight="bold"
                />
              </a>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

export default HomeFollowGrid;