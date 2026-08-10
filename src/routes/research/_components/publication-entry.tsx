import { ArrowRightIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';
import { type ElementType, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { InteractiveCard } from '@/components/interactive-card';
import { Button } from '@/components/ui/button';
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

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function PublicationEntry({ publication, viewMoreLabel, doiLabel, headingLevel = 3 }: PublicationEntryProps) {
  const headingId = `publication-${publication.id}-title`;

  const Heading = `h${headingLevel}` as ElementType;

  const citation = publication.reference?.trim() || publication.publication?.trim() || '';

  return (
    <article aria-labelledby={headingId} className="min-w-0">
      <InteractiveCard interaction="self" className="border-border-strong bg-brand-background gap-0 overflow-hidden rounded-lg py-0 shadow-none">
        <div className="grid min-w-0 gap-4 px-4 py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-5 sm:px-5 lg:grid-cols-[4.5rem_minmax(0,1fr)_13rem] lg:items-start lg:gap-x-7">
          <time
            dateTime={String(publication.year)}
            className="bg-action-soft text-brand-primary flex min-h-16 min-w-16 items-center justify-center self-start rounded-md px-3 py-3 font-mono text-base font-semibold"
          >
            {publication.year}
          </time>

          <div className="min-w-0">
            <Heading id={headingId} className="leading-heading text-brand-ink !m-0 text-sm font-bold tracking-[-0.005em] sm:text-base">
              <Link
                to={publication.detailsPath}
                className="ease-standard hover:text-brand-primary text-inherit no-underline transition-colors duration-150"
              >
                {publication.title}
              </Link>
            </Heading>

            {publication.authors.length > 0 ? (
              <p className="text-foreground !mt-1.5 !mb-0 text-sm leading-normal">
                {publication.authors.map((author, index) => (
                  <Fragment key={`${author.name}-${index}`}>
                    {index > 0 ? ', ' : null}

                    {author.href ? (
                      <a
                        href={author.href}
                        target={isExternalHref(author.href) ? '_blank' : undefined}
                        rel={isExternalHref(author.href) ? 'noreferrer' : undefined}
                        className="text-brand-primary hover:text-action-strong font-medium underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-current"
                      >
                        {author.name}
                      </a>
                    ) : (
                      author.name
                    )}
                  </Fragment>
                ))}
              </p>
            ) : null}

            {citation.length > 0 ? <p className="text-muted-foreground !mt-1.5 !mb-0 text-sm leading-normal">{citation}</p> : null}
          </div>

          <div className="flex min-w-0 flex-col items-stretch gap-2 sm:col-span-2 sm:ml-[5.75rem] lg:col-span-1 lg:ml-0 lg:w-52 lg:justify-self-end">
            <Button asChild className="min-h-10 w-full justify-between">
              <Link to={publication.detailsPath}>
                {viewMoreLabel}

                <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
              </Link>
            </Button>

            {publication.doi ? (
              <Button
                asChild
                variant="ghost"
                className="text-brand-primary hover:bg-action-soft hover:text-action-strong h-auto min-h-10 w-full justify-start overflow-hidden px-2 py-2 text-left"
              >
                <a
                  href={publication.doi.href}
                  target="_blank"
                  rel="noreferrer"
                  title={`${doiLabel} : ${publication.doi.value}`}
                  aria-label={`${doiLabel} ${publication.doi.value}`}
                >
                  <span className="shrink-0 text-sm font-semibold">
                    {doiLabel}
                    {' :'}
                  </span>

                  <span className="min-w-0 flex-1 truncate text-xs">{publication.doi.value}</span>

                  <ArrowSquareOutIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </InteractiveCard>
    </article>
  );
}

export default PublicationEntry;
