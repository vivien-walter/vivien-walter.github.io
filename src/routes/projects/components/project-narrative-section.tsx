import type { Icon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import SectionHeader from "@/shared/components/section-header";

type ProjectNarrativeSectionProps = {
  readonly title: string;
  readonly titleId: string;
  readonly icon: Icon;
  readonly paragraphs?: readonly string[];
  readonly items?: readonly string[];
  readonly className?: string;
};

function ProjectNarrativeSection({
  title,
  titleId,
  icon: SectionIcon,
  paragraphs,
  items,
  className,
}: ProjectNarrativeSectionProps) {
  const visibleParagraphs =
    paragraphs?.filter(
      (paragraph) => paragraph.trim().length > 0,
    ) ?? [];

  const visibleItems =
    items?.filter((item) => item.trim().length > 0) ?? [];

  if (
    visibleParagraphs.length === 0 &&
    visibleItems.length === 0
  ) {
    return null;
  }

  return (
    <section
      className={cn(
        "border-t border-border py-12",
        "sm:py-14 lg:py-16",
        className,
      )}
      aria-labelledby={titleId}
    >
      <SectionHeader
        title={title}
        titleId={titleId}
        className="mb-8"
      />

      <div
        className={cn(
          "grid min-w-0 gap-5",
          "sm:grid-cols-[4rem_minmax(0,1fr)]",
          "sm:items-start sm:gap-7",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "flex size-14 items-center justify-center",
            "rounded-md bg-brand-primary text-white",
            "shadow-subtle",
          )}
        >
          <SectionIcon
            className="size-7"
            weight="regular"
          />
        </span>

        <div className="min-w-0 max-w-readable">
          {visibleParagraphs.map(
            (paragraph, paragraphIndex) => (
              <p
                key={`${paragraphIndex}-${paragraph}`}
                className={cn(
                  "!mt-0",
                  paragraphIndex ===
                    visibleParagraphs.length - 1 &&
                    visibleItems.length === 0
                    ? "!mb-0"
                    : "!mb-5",
                )}
              >
                {paragraph}
              </p>
            ),
          )}

          {visibleItems.length > 0 ? (
            <ul
              className={cn(
                "!m-0 grid list-disc gap-3",
                "!pl-6 marker:text-brand-accent",
              )}
            >
              {visibleItems.map((item, itemIndex) => (
                <li
                  key={`${itemIndex}-${item}`}
                  className="!m-0 pl-1 text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ProjectNarrativeSection;