import type { Icon } from '@phosphor-icons/react';

import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { cn } from '@/lib/utils';

type ProjectNarrativeSectionProps = {
  readonly title: string;
  readonly titleId: string;
  readonly icon: Icon;
  readonly description?: string;
  readonly paragraphs?: readonly string[];
  readonly items?: readonly string[];
  readonly className?: string;
};

function ProjectNarrativeSection({ title, titleId, icon: SectionIcon, description, paragraphs, items, className }: ProjectNarrativeSectionProps) {
  const visibleParagraphs = paragraphs?.filter((paragraph) => paragraph.trim().length > 0) ?? [];

  const visibleItems = items?.filter((item) => item.trim().length > 0) ?? [];

  if (visibleParagraphs.length === 0 && visibleItems.length === 0) {
    return null;
  }

  return (
    <Section contained={false} className={cn('py-12 sm:py-14 lg:py-16', className)} aria-labelledby={titleId}>
      <SectionHeader className="mb-8">
        <SectionTitle id={titleId}>{title}</SectionTitle>

        {description?.trim() ? <SectionDescription>{description}</SectionDescription> : null}
      </SectionHeader>

      <div className="grid min-w-0 gap-5 sm:grid-cols-[4rem_minmax(0,1fr)] sm:items-start sm:gap-7">
        <span aria-hidden="true" className="bg-brand-primary shadow-subtle flex size-14 items-center justify-center rounded-md text-white">
          <SectionIcon className="size-7" weight="regular" />
        </span>

        <div className="max-w-readable min-w-0">
          {visibleParagraphs.map((paragraph, paragraphIndex) => (
            <p
              key={`${paragraphIndex}-${paragraph}`}
              className={cn('!mt-0', paragraphIndex === visibleParagraphs.length - 1 && visibleItems.length === 0 ? '!mb-0' : '!mb-5')}
            >
              {paragraph}
            </p>
          ))}

          {visibleItems.length > 0 ? (
            <ul className="marker:text-brand-accent !m-0 grid list-disc gap-3 !pl-6">
              {visibleItems.map((item, itemIndex) => (
                <li key={`${itemIndex}-${item}`} className="text-foreground !m-0 pl-1">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

export default ProjectNarrativeSection;
