import { cn } from "@/lib/utils";
import SectionHeader from "@/shared/components/section-header";

import type { ExperienceDirectContribution } from "../data/experience-content.types";

type ExperienceDirectContributionsSectionProps = {
  readonly idPrefix: string;
  readonly items?: readonly ExperienceDirectContribution[];
  readonly title: string;
};

function ExperienceDirectContributionsSection({
  idPrefix,
  items,
  title,
}: ExperienceDirectContributionsSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const titleId = `${idPrefix}-direct-contributions-title`;

  return (
    <section
      className="border-t border-border py-12 sm:py-14 lg:py-16"
      aria-labelledby={titleId}
    >
      <SectionHeader
        title={title}
        titleId={titleId}
        className="mb-8"
      />

      <ul
        className={cn(
          "!m-0 grid list-disc gap-3",
          "!pl-6 marker:text-copper",
        )}
      >
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="!m-0 pl-1 text-foreground"
          >
            <strong className="font-bold text-brand-ink">
              {item.label}
            </strong>
            {" : "}
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ExperienceDirectContributionsSection;