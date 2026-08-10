import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname, getPageRoute, getResearchPublicationRoute, getResearchThemeRoute } from '@/app/routing/navigation';
import { Hero, HeroBreadcrumbs, HeroContainer, HeroContent, HeroDescription, HeroHeader, HeroImage, HeroMedia, HeroTitle } from '@/components/hero';
import { InteractiveCard } from '@/components/interactive-card';
import { Section, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { getResearchPageContent } from '@/content/research/page';
import { getPublicationCollection } from '@/content/research/publications/catalog';
import type { ResearchThemeId } from '@/content/research/registry';
import { getResearchThemeCollection } from '@/content/research/themes/catalog';
import { cn } from '@/lib/utils';

import type { PublicationEntryItem } from './_components/publication-entry';
import PublicationList from './_components/publication-list';
import ResearchThemeCard from './_components/research-theme-card';

function ResearchPage() {
  const location = useLocation();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  const page = getResearchPageContent(language);

  const themes = getResearchThemeCollection(language);

  const defaultThemeIndex = themes.length > 0 ? Math.floor((themes.length - 1) / 2) : -1;

  const defaultThemeId = defaultThemeIndex >= 0 ? themes[defaultThemeIndex]?.id : undefined;

  const [selectedThemeId, setSelectedThemeId] = useState<ResearchThemeId | undefined>(() => defaultThemeId);

  const activeThemeId = selectedThemeId && themes.some((theme) => theme.id === selectedThemeId) ? selectedThemeId : defaultThemeId;

  const publications: readonly PublicationEntryItem[] = getPublicationCollection(language).map((publication) => ({
    id: publication.id,
    kind: publication.kind,
    title: publication.title,
    authors: publication.authors,
    ...(publication.publication
      ? {
          publication: publication.publication,
        }
      : {}),
    year: publication.year,
    themeIds: publication.themeIds,
    detailsPath: getResearchPublicationRoute(publication.id, language),
    doi: publication.doi,
  }));

  const themeOptions = themes.map((theme) => ({
    id: theme.id,
    title: theme.title,
  }));

  return (
    <div className="overflow-hidden">
      <Hero aria-labelledby="page-title">
        <HeroContainer>
          <HeroContent>
            <HeroBreadcrumbs
              ariaLabel={t('breadcrumbs.label', {
                lng: language,
              })}
              items={[
                {
                  label: t('breadcrumbs.home', {
                    lng: language,
                  }),
                  to: getPageRoute('home', language),
                },
                {
                  label: page.breadcrumbLabel,
                },
              ]}
            />

            <HeroHeader className="mt-4 sm:mt-5">
              <HeroTitle id="page-title">{page.title}</HeroTitle>

              <HeroDescription>
                <p className="!m-0">{page.introduction}</p>
              </HeroDescription>
            </HeroHeader>
          </HeroContent>

          <HeroMedia>
            <HeroImage src={page.heroImage.src} alt={page.heroImage.alt} />
          </HeroMedia>
        </HeroContainer>
      </Hero>

      <div className="max-w-editorial px-page mx-auto w-full pb-12 sm:pb-14 lg:pb-16">
        {themes.length > 0 ? (
          <Section contained={false} className="py-12 sm:py-14 lg:py-16" aria-labelledby="research-themes-title">
            <SectionHeader className="mb-8 sm:mb-10">
              <SectionTitle id="research-themes-title">{page.sectionTitles.themes.title}</SectionTitle>
              <SectionDescription>{page.sectionTitles.themes.description}</SectionDescription>
            </SectionHeader>

            <ul className="m-0 flex list-none items-center gap-3 p-0 pt-2 sm:gap-4">
              {themes.map((theme) => {
                const isSelected = theme.id === activeThemeId;

                return (
                  <li
                    key={theme.id}
                    className={cn(
                      'ease-standard m-0 flex min-h-64 min-w-0 items-center transition-[flex-grow,flex-basis] duration-200',
                      isSelected ? 'flex-[1_1_0%]' : 'flex-[0_0_4rem]',
                      'motion-reduce:transition-none',
                    )}
                  >
                    <ResearchThemeCard
                      theme={theme}
                      to={getResearchThemeRoute(theme.id, language)}
                      headingLevel={3}
                      isSelected={isSelected}
                      viewMoreLabel={page.publications.actions.viewMore}
                      onSelect={() => {
                        setSelectedThemeId(theme.id);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </Section>
        ) : null}

        {publications.length > 0 ? (
          <PublicationList
            title={page.sectionTitles.publications.title}
            description={page.sectionTitles.publications.description}
            titleId="research-publications-title"
            items={publications}
            themes={themeOptions}
            language={language}
            labels={page.publications}
          />
        ) : null}

        {page.resources.length > 0 ? (
          <Section contained={false} className="border-border border-t py-12 sm:py-14 lg:py-16" aria-labelledby="research-activities-title">
            <SectionHeader className="mb-8 sm:mb-10">
              <SectionTitle id="research-activities-title">{page.sectionTitles.activities}</SectionTitle>
            </SectionHeader>

            <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {page.resources.map((resource) => {
                const ResourceIcon = resource.icon;

                return (
                  <li key={resource.id} className="m-0 min-w-0">
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                      data-external="true"
                      className="group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      <InteractiveCard
                        interaction="group"
                        className="border-border-strong bg-brand-background h-full min-h-40 gap-0 rounded-lg py-0 shadow-none"
                      >
                        <span className="text-brand-primary group-hover:text-brand-dark flex flex-1 items-center justify-center px-5 pt-7 pb-4 transition-colors duration-200">
                          <ResourceIcon aria-hidden="true" className="size-12" weight="regular" />
                        </span>

                        <span className="text-brand-ink group-hover:text-brand-primary flex min-h-14 items-center justify-center px-5 py-3 text-center font-semibold transition-colors duration-200">
                          {resource.label}
                        </span>
                      </InteractiveCard>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Section>
        ) : null}
      </div>
    </div>
  );
}

export default ResearchPage;
