import { type ElementType } from 'react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import type { PublicationId } from '@/content/research/publications/registry';
import type { ResearchThemeId } from '@/content/research/registry';

type PublicationKind = 'article' | 'thesis';

type PublicationAuthor = {
  readonly name: string;
  readonly href?: string;
};

type PublicationDoi = {
  readonly value: string;
  readonly href: string;
};

export type PublicationEntryItem = {
  readonly id: PublicationId;
  readonly kind: PublicationKind;
  readonly title: string;
  readonly authors: readonly PublicationAuthor[];
  readonly publication?: string;
  readonly reference?: string;
  readonly year: number;
  readonly themeIds: readonly ResearchThemeId[];
  readonly detailsPath: string;
  readonly doi?: PublicationDoi;
};

type PublicationEntryProps = {
  readonly publication: PublicationEntryItem;
  readonly viewMoreLabel: string;
  readonly doiLabel: string;
  readonly headingLevel?: 3 | 4;
};

export default function PublicationEntry({ publication, headingLevel = 3 }: PublicationEntryProps) {
  const headingId = `publication-${publication.id}-title`;

  const Heading = `h${headingLevel}` as ElementType;

  const citation = publication.reference?.trim() || publication.publication?.trim() || '';

  return (
    <article aria-labelledby={headingId} className="min-w-0">
      <Link to={publication.detailsPath} aria-label={publication.title} className="group block rounded-lg focus-visible:outline-none">
        <InteractiveCard
          interaction="self"
          className="border-border-strong bg-brand-background group-focus-visible:border-brand-primary group-focus-visible:bg-action-soft/70 group-focus-visible:ring-brand-primary/30 gap-0 overflow-hidden rounded-lg py-0 shadow-none group-focus-visible:ring-2"
        >
          <div className="grid min-w-0 gap-4 px-4 py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-5 sm:px-5">
            <time
              dateTime={String(publication.year)}
              className="bg-action-soft text-brand-primary flex min-h-16 min-w-16 items-center justify-center self-start rounded-md px-3 py-3 font-mono text-base font-semibold"
            >
              {publication.year}
            </time>

            <div className="min-w-0">
              <Heading
                id={headingId}
                className="leading-heading text-brand-ink group-hover:text-brand-primary !m-0 text-sm font-bold tracking-[-0.005em] transition-colors duration-150 sm:text-base"
              >
                {publication.title}
              </Heading>

              {publication.authors.length > 0 ? (
                <p className="text-foreground !mt-1.5 !mb-0 text-sm leading-normal">{publication.authors.map((author) => author.name).join(', ')}</p>
              ) : null}

              {citation.length > 0 ? <p className="text-muted-foreground !mt-1.5 !mb-0 text-sm leading-normal">{citation}</p> : null}
            </div>
          </div>
        </InteractiveCard>
      </Link>
    </article>
  );
}
