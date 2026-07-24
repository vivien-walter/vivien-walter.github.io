import { ArrowUpRightIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import type { HomeFollowContent } from "@/content/home/home";
import { cn } from "@/lib/utils";

type HomeFollowGridProps = {
  readonly content: HomeFollowContent;
};

function HomeFollowGrid({
  content,
}: HomeFollowGridProps) {
  const LocationIcon = content.location.icon;

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
        <LocationIcon
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
          {content.location.label}
        </p>
      </li>

      {content.links.map((link) => {
        const Icon = link.icon;

        return (
          <li
            className={cardClassName}
            key={link.id}
          >
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