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

export type DetailHighlightIconId =
  | "project"
  | "funding"
  | "team"
  | "laboratory"
  | "instrumentation"
  | "software"
  | "research"
  | "publication";

export type DetailHighlightItem = {
  readonly icon: DetailHighlightIconId;
  readonly label: string;
  readonly value: string;
};

type DetailHighlightsBandProps = {
  readonly ariaLabel: string;
  readonly items?: readonly DetailHighlightItem[];
};

const iconByHighlightId: Readonly<
  Record<DetailHighlightIconId, Icon>
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

function DetailHighlightsBand({
  ariaLabel,
  items,
}: DetailHighlightsBandProps) {
  const visibleItems =
    items?.filter(
      (item) =>
        item.label.trim().length > 0 &&
        item.value.trim().length > 0,
    ) ?? [];

  if (visibleItems.length === 0) {
    return null;
  }

  const columnClassName =
    visibleItems.length === 1
      ? "md:grid-cols-1"
      : visibleItems.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <aside
      className="bg-brand-primary text-white"
      aria-label={ariaLabel}
    >
      <dl
        className={cn(
          "mx-auto grid w-full max-w-editorial",
          "grid-cols-1 gap-x-10 gap-y-10",
          "px-page py-9 sm:py-10 lg:py-12",
          columnClassName,
        )}
      >
        {visibleItems.map((item, index) => {
          const HighlightIcon =
            iconByHighlightId[item.icon];

          return (
            <div
              key={`${item.icon}-${item.label}-${index}`}
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

export default DetailHighlightsBand;