import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getResearchPublicationRoute,
  getResearchThemeRoute,
} from "@/app/routing/navigation";
import PageHero from "@/components/page-hero";
import SectionHeader from "@/components/section-header";
import { Card } from "@/components/ui/card";
import {
  getPublicationCollection,
  getResearchPage,
  getResearchThemeCollection,
} from "@/content/research/page";
import { cn } from "@/lib/utils";

import ResearchThemeCard from "./_components/research-theme-card";
import type { PublicationEntryItem } from "./_components/publication-entry";
import PublicationList from "./_components/publication-list";

function ResearchPage() {
  const location = useLocation();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const page = getResearchPage(language);

  const themes =
    getResearchThemeCollection(language);

const publications:
  readonly PublicationEntryItem[] =
  getPublicationCollection(language).map(
      (publication) => ({
        id: publication.id,
        kind: publication.kind,
        title: publication.title,
        authors: publication.authors,
        publication:
          publication.publication,
        year: publication.year,
        themeIds: publication.themeIds,
        detailsPath:
          getResearchPublicationRoute(
            publication.id,
            language,
          ),
        doi: publication.doi,
      }),
    );

  const themeOptions = themes.map(
    (theme) => ({
      id: theme.id,
      title: theme.title,
    }),
  );

  return (
    <div className="overflow-hidden">
      <PageHero
        breadcrumbs={{
          ariaLabel: t(
            "breadcrumbs.label",
            {
              lng: language,
            },
          ),
          items: [
            {
              label: t(
                "breadcrumbs.home",
                {
                  lng: language,
                },
              ),
              to: getPageRoute(
                "home",
                language,
              ),
            },
            {
              label: page.title,
            },
          ],
        }}
        title={page.title}
        introduction={page.introduction}
      />

      <div
        className={cn(
          "mx-auto w-full max-w-editorial px-page",
          "pb-12 sm:pb-14 lg:pb-16",
        )}
      >
        {themes.length > 0 ? (
          <section
            className="py-12 sm:py-14 lg:py-16"
            aria-labelledby="research-themes-title"
          >
            <SectionHeader
              title={
                page.sectionTitles.themes
              }
              titleId="research-themes-title"
              className="mb-8 sm:mb-10"
            />

            <ul
              className={cn(
                "m-0 grid list-none gap-6 p-0",
                "md:grid-cols-2",
                "lg:grid-cols-3",
              )}
            >
              {themes.map((theme) => (
                <li
                  key={theme.id}
                  className="m-0 min-w-0"
                >
                  <ResearchThemeCard
                    theme={theme}
                    to={getResearchThemeRoute(
                      theme.id,
                      language,
                    )}
                    headingLevel={3}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {publications.length > 0 ? (
     <PublicationList
  title={
    page.sectionTitles
      .publications
  }
  titleId="research-publications-title"
  items={publications}
  themes={themeOptions}
  language={language}
  labels={page.publications}
/>
        ) : null}

        {page.resources.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="research-activities-title"
          >
            <SectionHeader
              title={
                page.sectionTitles.activities
              }
              titleId="research-activities-title"
              className="mb-8 sm:mb-10"
            />

            <ul
              className={cn(
                "m-0 grid list-none gap-5 p-0",
                "sm:grid-cols-2",
                "lg:grid-cols-3",
              )}
            >
              {page.resources.map(
                (resource) => {
                  const ResourceIcon =
                    resource.icon;

                  return (
                    <li
                      key={resource.id}
                      className="m-0 min-w-0"
                    >
                      <a
                        href={resource.href}
                        target="_blank"
                        rel="noreferrer"
                        data-external="true"
                        className={cn(
                          "group block h-full rounded-lg",
                          "text-brand-ink no-underline",
                          "focus-visible:outline-none",
                          "focus-visible:ring-[3px]",
                          "focus-visible:ring-ring/50",
                          "focus-visible:ring-offset-2",
                        )}
                      >
                        <Card
                          className={cn(
                            "h-full min-h-40 gap-0",
                            "rounded-lg py-0",
                            "border-border-strong",
                            "bg-brand-background",
                            "shadow-none",
                            "transition-[transform,border-color,background-color,box-shadow]",
                            "duration-200 ease-standard",
                            "group-hover:-translate-y-1",
                            "group-hover:border-brand-primary",
                            "group-hover:bg-action-soft/70",
                            "group-hover:shadow-elevated",
                            "group-hover:ring-2",
                            "group-hover:ring-brand-primary/30",
                          )}
                        >
                          <span
                            className={cn(
                              "flex flex-1",
                              "items-center justify-center",
                              "px-5 pt-7 pb-4",
                              "text-brand-primary",
                              "transition-colors",
                              "duration-200",
                              "group-hover:text-brand-dark",
                            )}
                          >
                            <ResourceIcon
                              aria-hidden="true"
                              className="size-12"
                              weight="regular"
                            />
                          </span>

                          <span
                            className={cn(
                              "flex min-h-14",
                              "items-center justify-center",
                              "px-5 py-3",
                              "text-center font-semibold",
                              "text-brand-ink",
                              "transition-colors",
                              "duration-200",
                              "group-hover:text-brand-primary",
                            )}
                          >
                            {resource.label}
                          </span>
                        </Card>
                      </a>
                    </li>
                  );
                },
              )}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default ResearchPage;