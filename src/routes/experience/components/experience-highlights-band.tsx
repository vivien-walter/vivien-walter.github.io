import {
  ArticleIcon,
  AtomIcon,
  CodeIcon,
  CurrencyEurIcon,
  FlaskIcon,
  MicroscopeIcon,
  TargetIcon,
  UsersThreeIcon,
  type Icon,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

import type {
  ExperienceHighlightIconId,
  ExperienceHighlights,
} from "../data/experience-content.types";

type ExperienceHighlightsBandProps = {
  readonly items?: ExperienceHighlights;
};

const iconByHighlightId: Readonly<
  Record<ExperienceHighlightIconId, Icon>
> = {
  project: TargetIcon,
  funding: CurrencyEurIcon,
  team: UsersThreeIcon,
  laboratory: FlaskIcon,
  instrumentation: MicroscopeIcon,
  software: CodeIcon,
  research: AtomIcon,
  publication: ArticleIcon,
};

function ExperienceHighlightsBand({
  items,
}: ExperienceHighlightsBandProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <aside
      className="bg-brand-primary text-white"
      aria-label="Informations clés"
    >
      <dl
        className={cn(
          "mx-auto grid w-full max-w-editorial",
          "grid-cols-1 gap-x-10 gap-y-10",
          "px-page py-9 sm:py-10 md:grid-cols-3",
          "lg:py-12",
        )}
      >
        {items.map((item, index) => {
          const HighlightIcon = iconByHighlightId[item.icon];

          return (
            <div
              key={`${item.icon}-${index}`}
              className="m-0 grid min-w-0 content-start gap-4"
            >
              <HighlightIcon
                aria-hidden="true"
                className="size-12 justify-self-center text-white"
                weight="regular"
              />

              <div className="min-w-0">
                <dt
                  className={cn(
                    "text-center font-bold leading-heading",
                    "tracking-[-0.01em] text-white",
                  )}
                >
                  {item.label}
                </dt>

                <dd
                  className={cn(
                    "m-0 mt-2 text-sm leading-body",
                    "text-white/85",
                  )}
                >
                  {item.value}
                </dd>
              </div>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}

export default ExperienceHighlightsBand;