import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { getSoftwareRoute } from '@/app/routing/navigation';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getSoftwareCollection } from '@/content/software/catalog';
import { getSoftwareContent } from '@/content/software/page';
import type { SoftwareId } from '@/content/software/registry';
import { getSoftwareTags } from '@/content/software/tags';
import type { SupportedLanguage } from '@/types/localization';

const MAXIMUM_VISIBLE_TAG_COUNT = 5;

interface FeaturedSectionProps {
  readonly language: SupportedLanguage;
}

export default function FeaturedSection({ language }: FeaturedSectionProps) {
  const page = getSoftwareContent(language);

  const softwareCollection = useMemo(() => getSoftwareCollection(language), [language]);

  const [featuredSoftwareId, setFeaturedSoftwareId] = useState<SoftwareId | null>(null);

  /* Select a random index */
  useEffect(() => {
    if (softwareCollection.length === 0) {
      setFeaturedSoftwareId(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * softwareCollection.length);

    setFeaturedSoftwareId(softwareCollection[randomIndex]?.id ?? softwareCollection[0]?.id ?? null);
  }, [softwareCollection]);

  const featuredSoftware = softwareCollection.find((software) => software.id === featuredSoftwareId) ?? softwareCollection[0];

  /* If no featured software is selected */
  if (!featuredSoftware) {
    return null;
  }

  /* Get information on the selected software */
  const FeaturedSoftwareIcon = featuredSoftware.icon;

  const softwareTags = getSoftwareTags(featuredSoftware);
  const visibleTags = softwareTags.slice(0, MAXIMUM_VISIBLE_TAG_COUNT);
  const hiddenTagCount = softwareTags.length - visibleTags.length;

  return (
    <Section className="border-border border-b" containerClassName="py-12 sm:py-14 lg:py-16" aria-labelledby="featured-software-title">
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id="featured-software-title">{page.featured.title}</SectionTitle>

        <SectionDescription>{page.featured.description}</SectionDescription>
      </SectionHeader>

      <Card className="border-border-strong bg-brand-background shadow-subtle gap-0 overflow-hidden rounded-lg py-0">
        <article className="grid min-w-0 md:grid-cols-[10rem_minmax(0,1fr)]" aria-labelledby={`featured-software-${featuredSoftware.id}`}>
          <div className="bg-action-soft text-brand-primary flex min-h-36 items-center justify-center md:min-h-full">
            <FeaturedSoftwareIcon aria-hidden="true" className="size-14" weight="regular" />
          </div>

          <div className="min-w-0 p-5 sm:p-7">
            <div className="flex min-w-0 items-start justify-between gap-4">
              <h3
                id={`featured-software-${featuredSoftware.id}`}
                className="leading-heading text-brand-ink !m-0 min-w-0 flex-1 text-xl font-bold tracking-[-0.025em]"
              >
                {featuredSoftware.title}
              </h3>

              <Badge
                variant="outline"
                className="border-brand-primary/35 bg-brand-background text-brand-primary shrink-0 font-mono text-xs font-semibold"
              >
                {page.kindLabels[featuredSoftware.kind]}
              </Badge>
            </div>

            <p className="max-w-readable text-muted-foreground !mt-4 !mb-0">{featuredSoftware.summary}</p>

            {visibleTags.length > 0 ? (
              <ul className="!mt-5 !mb-0 flex list-none flex-wrap gap-2 !p-0" aria-label={page.catalog.technologiesLabel}>
                {visibleTags.map((tag) => (
                  <li key={tag} className="!m-0">
                    <Badge variant="secondary" className="border-border bg-brand-hero text-muted-foreground border px-3 py-1 font-mono font-medium">
                      {tag}
                    </Badge>
                  </li>
                ))}
                {hiddenTagCount > 0 ? (
                  <li className="!m-0">
                    <Badge
                      variant="outline"
                      className="border-border-strong bg-brand-background text-brand-primary px-3 py-1 font-mono font-semibold"
                      aria-label={`${page.catalog.technologiesLabel}: +${hiddenTagCount}`}
                    >
                      +{hiddenTagCount}
                    </Badge>
                  </li>
                ) : null}
              </ul>
            ) : null}

            <div className="border-border mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t pt-6">
              <Button asChild className="min-h-11">
                <Link to={getSoftwareRoute(featuredSoftware.id, language)}>
                  {page.featured.viewAction}

                  <ArrowRightIcon aria-hidden="true" weight="bold" />
                </Link>
              </Button>

              {featuredSoftware.resources.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-external="true"
                  className="text-brand-primary hover:text-action-strong inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
                >
                  {resource.label}

                  <ArrowUpRightIcon aria-hidden="true" weight="bold" />
                </a>
              ))}
            </div>
          </div>
        </article>
      </Card>
    </Section>
  );
}
