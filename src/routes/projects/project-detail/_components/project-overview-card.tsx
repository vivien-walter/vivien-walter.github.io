import { ImageIcon } from '@phosphor-icons/react';
import { useId, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatContentDateRange } from '@/lib/content/formatters';
import { cn } from '@/lib/utils';
import type { ContentDateRange, ContentImage } from '@/types/content';
import type { SupportedLanguage } from '@/types/localization';

type ProjectOverviewFact = {
  readonly label: string;
  readonly value: string;
};

type ProjectOverview = {
  readonly image?: ContentImage;
  readonly facts?: readonly ProjectOverviewFact[];
};

type ProjectOverviewCardProps = {
  readonly ariaLabel: string;
  readonly language: SupportedLanguage;
  readonly ongoingLabel: string;
  readonly overview?: ProjectOverview;
  readonly period?: ContentDateRange;
  readonly periodLabel: string;
  readonly programmingLanguages?: readonly string[];
  readonly tagsLabel: string;
  readonly technologies?: readonly string[];
};

function ProjectOverviewCard({
  ariaLabel,
  language,
  ongoingLabel,
  overview,
  period,
  periodLabel,
  programmingLanguages,
  tagsLabel,
  technologies,
}: ProjectOverviewCardProps) {
  const tagsLabelId = useId();

  const [failedImageSrc, setFailedImageSrc] = useState<string>();

  const image = overview?.image;

  const showImage = image !== undefined && failedImageSrc !== image.src;

  const facts: readonly ProjectOverviewFact[] = [
    ...(period
      ? [
          {
            label: periodLabel,
            value: period.end ? formatContentDateRange(period, language) : `${formatContentDateRange(period, language)} - ${ongoingLabel}`,
          },
        ]
      : []),
    ...(overview?.facts ?? []),
  ];

  const tags = Array.from(new Set([...(programmingLanguages ?? []), ...(technologies ?? [])]));

  if (facts.length === 0 && tags.length === 0) {
    return null;
  }

  return (
    <section aria-label={ariaLabel}>
      <Card
        className={cn(
          'grid gap-0 overflow-hidden rounded-lg py-0',
          'border-border-strong bg-brand-background',
          'shadow-subtle',
          'md:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)]',
        )}
      >
        <div
          className={cn(
            'flex min-h-52 items-center justify-center',
            'border-border overflow-hidden border-b',
            'bg-brand-hero text-muted-foreground',
            'sm:min-h-64',
            'md:min-h-full md:border-r md:border-b-0',
          )}
        >
          {showImage ? (
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              style={{
                objectPosition: image.objectPosition ?? 'center',
              }}
              loading="lazy"
              decoding="async"
              onError={() => {
                setFailedImageSrc(image.src);
              }}
            />
          ) : (
            <ImageIcon aria-hidden="true" className="size-16 opacity-45 sm:size-20" weight="thin" />
          )}
        </div>

        <div className={cn('flex min-w-0 items-center', 'px-5 py-7 sm:px-7 sm:py-8')}>
          <dl className="m-0 grid w-full gap-4">
            {facts.map((fact, index) => (
              <div key={`${fact.label}-${index}`} className={cn('grid min-w-0 gap-1', 'sm:grid-cols-[8.5rem_minmax(0,1fr)]', 'sm:gap-5')}>
                <dt className={cn('text-brand-ink font-semibold', 'sm:text-right')}>
                  {fact.label}
                  <span aria-hidden="true">{' :'}</span>
                </dt>

                <dd className="text-foreground m-0 min-w-0">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {tags.length > 0 ? (
          <div className={cn('border-border border-t px-5 py-5', 'sm:px-7', 'md:col-span-2')}>
            <p id={tagsLabelId} className="sr-only">
              {tagsLabel}
            </p>

            <ul className={cn('m-0 flex list-none flex-wrap', 'gap-2 p-0')} aria-labelledby={tagsLabelId}>
              {tags.map((tag) => (
                <li key={tag} className="m-0">
                  <Badge
                    variant="secondary"
                    className={cn('border-border rounded-full border', 'bg-brand-hero px-3 py-1', 'font-mono font-medium', 'text-muted-foreground')}
                  >
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Card>
    </section>
  );
}

export default ProjectOverviewCard;
