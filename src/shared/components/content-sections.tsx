import { createElement, type ElementType } from "react";

import { cn } from "@/lib/utils";

import type { ContentSection } from "../content/content.types";

type ContentSectionsVariant = "page" | "compact";

type ContentSectionsProps = {
  readonly className?: string;
  readonly headingLevel?: 2 | 3 | 4;
  readonly idPrefix: string;
  readonly sections: readonly ContentSection[];
  readonly variant?: ContentSectionsVariant;
};

const headingClassNames: Record<2 | 3 | 4, string> = {
  2: [
    "!m-0 text-xl font-bold leading-heading",
    "tracking-[-0.025em] text-heading",
  ].join(" "),
  3: [
    "!m-0 text-lg font-bold leading-heading",
    "tracking-[-0.0125em] text-heading",
  ].join(" "),
  4: "!m-0 text-md font-semibold leading-heading text-heading",
};

const variantClassNames: Record<ContentSectionsVariant, string> = {
  page: [
    "max-w-readable",
    "!border-t !border-border",
    "!py-12 sm:!py-14 lg:!py-16",
  ].join(" "),
  compact: [
    "!border-t !border-border !pt-5",
    "first:!border-t-0 first:!pt-0",
  ].join(" "),
};

function ContentSections({
  className,
  headingLevel = 2,
  idPrefix,
  sections,
  variant = "page",
}: ContentSectionsProps) {
  const Heading = `h${headingLevel}` as ElementType;

  return sections.map((section, sectionIndex) => {
    const titleId = section.title
      ? `${idPrefix}-section-${sectionIndex + 1}`
      : undefined;

    return (
      <section
        className={cn(
          "grid gap-4",
          variantClassNames[variant],
          className,
        )}
        aria-labelledby={titleId}
        key={`${idPrefix}-${sectionIndex}`}
      >
        {section.title
          ? createElement(
              Heading,
              {
                id: titleId,
                className: headingClassNames[headingLevel],
              },
              section.title,
            )
          : null}

        {section.paragraphs.map((paragraph, paragraphIndex) => (
          <p
            className="!m-0 text-foreground"
            key={`${sectionIndex}-${paragraphIndex}-${paragraph}`}
          >
            {paragraph}
          </p>
        ))}

        {section.items && section.items.length > 0 ? (
          <ul className="!m-0 grid list-disc gap-2 !pl-6 marker:text-copper">
            {section.items.map((item, itemIndex) => (
              <li
                className="!m-0 pl-1 text-foreground"
                key={`${sectionIndex}-${itemIndex}-${item}`}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    );
  });
}

export default ContentSections;