import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { type ReactNode, useEffect, useState } from 'react';

import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getResearchPublicationDetailById, getResearchPublicationPageContent } from '@/content/research/publications/page';
import type { SupportedLanguage } from '@/types/localization';

type ResearchPublication = NonNullable<ReturnType<typeof getResearchPublicationDetailById>>;

type MetadataSectionProps = {
  readonly idPrefix: string;
  readonly language: SupportedLanguage;
  readonly publication: ResearchPublication;
};

type MetadataRowProps = {
  readonly label: string;
  readonly children: ReactNode;
};

type ReferenceCopyState = 'idle' | 'copied' | 'error';

function MetadataRow({ label, children }: MetadataRowProps) {
  return (
    <div className="grid min-w-0 gap-2 px-5 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:px-6">
      <dt className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.06em] uppercase">{label}</dt>

      <dd className="text-foreground m-0 min-w-0">{children}</dd>
    </div>
  );
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export default function MetadataSection({ idPrefix, language, publication }: MetadataSectionProps) {
  const detail = getResearchPublicationPageContent(language);

  const [referenceCopyState, setReferenceCopyState] = useState<ReferenceCopyState>('idle');

  useEffect(() => {
    setReferenceCopyState('idle');
  }, [publication.id]);

  async function handleCopyReference(reference: string) {
    try {
      await navigator.clipboard.writeText(reference);
      setReferenceCopyState('copied');
    } catch {
      setReferenceCopyState('error');
    }
  }

  const reference = publication.reference;

  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby={`${idPrefix}-metadata-title`}>
      <SectionHeader className="mb-8">
        <SectionTitle id={`${idPrefix}-metadata-title`}>{detail.metadata}</SectionTitle>
      </SectionHeader>

      <Card className="border-border-strong bg-brand-background shadow-subtle gap-0 overflow-hidden py-0">
        <CardContent className="p-0">
          <dl className="divide-border m-0 divide-y">
            <MetadataRow label={detail.title}>
              <strong className="text-brand-ink font-bold">{publication.title}</strong>
            </MetadataRow>

            {publication.publication ? (
              <MetadataRow label={detail.journal}>
                <span className="italic">{publication.publication}</span>
              </MetadataRow>
            ) : null}

            <MetadataRow label={detail.authors}>
              {publication.authors.length > 0 ? (
                <span>
                  {publication.authors.map((author, index) => (
                    <span key={`${author.name}-${index}`}>
                      {index > 0 ? ', ' : null}

                      {author.href ? (
                        <a
                          href={author.href}
                          target={isExternalHref(author.href) ? '_blank' : undefined}
                          rel={isExternalHref(author.href) ? 'noreferrer' : undefined}
                          className="text-brand-primary hover:text-action-strong font-medium underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
                        >
                          {author.name}
                        </a>
                      ) : (
                        author.name
                      )}
                    </span>
                  ))}
                </span>
              ) : (
                <span aria-hidden="true" className="text-muted-foreground">
                  —
                </span>
              )}
            </MetadataRow>

            <MetadataRow label={detail.year}>
              <Badge variant="outline" className="border-brand-accent/50 bg-copper-soft text-copper-strong px-3 py-1 font-mono font-semibold">
                <time dateTime={String(publication.year)}>{publication.year}</time>
              </Badge>
            </MetadataRow>

            <MetadataRow label={detail.reference}>
              {reference ? (
                <div className="flex min-w-0 items-start gap-2">
                  <span className="min-w-0 flex-1 italic">{reference}</span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => {
                      void handleCopyReference(reference);
                    }}
                    aria-label={detail.copyReference}
                    title={detail.copyReference}
                    className="text-muted-foreground hover:text-brand-primary"
                  >
                    {referenceCopyState === 'copied' ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
                  </Button>

                  <span className="sr-only" aria-live="polite">
                    {referenceCopyState === 'copied' ? detail.referenceCopied : referenceCopyState === 'error' ? detail.referenceCopyError : ''}
                  </span>
                </div>
              ) : (
                <span aria-hidden="true" className="text-muted-foreground">
                  —
                </span>
              )}
            </MetadataRow>
          </dl>
        </CardContent>
      </Card>
    </Section>
  );
}
