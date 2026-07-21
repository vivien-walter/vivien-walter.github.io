import {
  createElement,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type SectionHeaderVariant = "default" | "inverse";

type SectionHeaderProps = {
  readonly title: string;
  readonly titleId: string;
  readonly description?: string;
  readonly action?: ReactNode;
  readonly headingLevel?: 2 | 3;
  readonly className?: string;
  readonly variant?: SectionHeaderVariant;
  readonly showAccent?: boolean;
};

function SectionHeader({
  title,
  titleId,
  description,
  action,
  headingLevel = 2,
  className,
  variant = "default",
  showAccent = true,
}: SectionHeaderProps) {
  const Heading = `h${headingLevel}` as ElementType;
  const isInverse = variant === "inverse";

  return (
    <header
      className={cn(
        "grid gap-x-6 gap-y-5",
        action && "sm:grid-cols-[minmax(0,1fr)_auto]",
        className,
      )}
    >
      <div className="min-w-0">
        {createElement(
          Heading,
          {
            id: titleId,
            className: cn(
              "!m-0 text-xl font-bold leading-heading",
              "tracking-[-0.025em]",
              isInverse
                ? "!text-white"
                : "text-brand-ink",
            ),
          },
          title,
        )}

        {showAccent ? (
          <span
            aria-hidden="true"
            className="mt-3 block h-0.5 w-12 bg-brand-accent"
          />
        ) : null}
      </div>

      {action ? (
        <div className="flex items-start sm:justify-end">
          {action}
        </div>
      ) : null}

      {description ? (
        <p
          className={cn(
            "!m-0 max-w-readable text-base",
            isInverse
              ? "font-medium !text-white/90"
              : "text-muted-foreground",
            action && "sm:col-span-2",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}

export default SectionHeader;