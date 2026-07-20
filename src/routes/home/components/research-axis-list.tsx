import {
  ArrowRightIcon,
  AtomIcon,
  BrainIcon,
  CodeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  getPageRoute,
  type SupportedLanguage,
} from "@/app/routing/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type {
  ResearchAxisIconId,
  ResearchAxisContent,
} from "../data/research-axis-content.types";

type ResearchAxisListProps = {
  readonly items: readonly ResearchAxisContent[];
  readonly language: SupportedLanguage;
};

const iconById = {
  optics: AtomIcon,
  "scientific-ai": BrainIcon,
  "scientific-software": CodeIcon,
  "collaborative-systems": UsersThreeIcon,
} satisfies Record<ResearchAxisIconId, typeof AtomIcon>;

function ResearchAxisList({
  items,
  language,
}: ResearchAxisListProps) {
  const { t } = useTranslation();
  const researchRoute = getPageRoute("research", language);

  return (
    <ul
      className={[
        "m-0 grid list-none p-0",
        "md:grid-cols-2 lg:grid-cols-4",
      ].join(" ")}
    >
      {items.map((axis, index) => {
        const Icon = iconById[axis.icon];
        const titleId = `home-research-axis-${axis.id}`;

        return (
          <li
            key={axis.id}
            className={cn(
              "m-0 border-t border-border py-7",
              "first:border-t-0 first:pt-0",
              "last:pb-0",
              "md:border-t-0 md:px-6 md:py-0",
              index % 2 === 0
                ? "md:pl-0"
                : "md:border-l md:pr-0",
              index >= 2 && "md:mt-10",
              "lg:mt-0 lg:border-l lg:px-7",
              index === 0 && "lg:border-l-0 lg:pl-0",
              index === items.length - 1 && "lg:pr-0",
            )}
          >
            <article
              className="flex h-full min-w-0 flex-col items-start"
              aria-labelledby={titleId}
            >
              <Icon
                aria-hidden="true"
                className="size-8 text-brand-primary"
                weight="regular"
              />

              <h3
                id={titleId}
                className={[
                  "!m-0 mt-5",
                  "text-md font-bold leading-heading",
                  "tracking-[-0.015em] text-brand-ink",
                ].join(" ")}
              >
                {axis.title}
              </h3>

              <p
                className={[
                  "!m-0 mt-3",
                  "text-sm leading-relaxed",
                  "text-muted-foreground",
                ].join(" ")}
              >
                {axis.description}
              </p>

              <Button
                asChild
                variant="ghost"
                className={[
                  "-ml-2 mt-5 min-h-10 px-2",
                  "text-brand-primary",
                  "hover:bg-action-soft",
                  "hover:text-brand-primary",
                ].join(" ")}
              >
                <Link to={researchRoute}>
                  {t("actions.learnMore", {
                    lng: language,
                  })}

                  <ArrowRightIcon
                    aria-hidden="true"
                    weight="bold"
                  />
                </Link>
              </Button>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default ResearchAxisList;