import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  LinkSimpleIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getResearchPublicationRoute,
  getResearchThemeRoute,
} from "@/app/routing/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PageHero from "@/shared/components/page-hero";
import SectionHeader from "@/shared/components/section-header";

import PublicationTable from "./components/publication-table";
import ResearchThemeCard from "./components/research-theme-card";
import {
  getPublicationById,
  getPublicationIndex,
  getResearchPage,
} from "./data/research-content.loader";

type SocialResourceIconProps = {
  readonly href: string;
};

function SocialResourceIcon({
  href,
}: SocialResourceIconProps) {
  if (href.includes("github.com")) {
    return (
      <GithubLogoIcon
        aria-hidden="true"
        className="size-12"
        weight="regular"
      />
    );
  }

  if (href.includes("linkedin.com")) {
    return (
      <LinkedinLogoIcon
        aria-hidden="true"
        className="size-12"
        weight="regular"
      />
    );
  }

  return (
    <LinkSimpleIcon
      aria-hidden="true"
      className="size-12"
      weight="regular"
    />
  );
}

function ResearchPage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(
    location.pathname,
  );
  const page = getResearchPage(language);
  const index = getPublicationIndex(language);
  const themes = page.themes ?? [];
  const resources = page.links ?? [];

  const publications = index.order.flatMap(
    (publicationId) => {
      const publication = getPublicationById(
        language,
        publicationId,
      );

      return publication
        ? [
            {
              publication,
              publicationId,
              detailsPath:
                getResearchPublicationRoute(
                  publicationId,
                  language,
                ),
            },
          ]
        : [];
    },
  );

  return (
    <div className="overflow-hidden">
      <PageHero
        breadcrumbs={{
          ariaLabel: t("breadcrumbs.label", {
            lng: language,
          }),
          items: [
            {
              label: t("breadcrumbs.home", {
                lng: language,
              }),
              to: getPageRoute("home", language),
            },
            {
              label: t("pages.research.title", {
                lng: language,
              }),
            },
          ],
        }}
        title={page.title}
        introduction={page.introduction}
        image={page.heroImage}
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
              title={t(
                "pages.research.themesTitle",
                {
                  lng: language,
                },
              )}
              titleId="research-themes-title"
              className="mb-8 sm:mb-10"
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {themes.map((theme) => (
                <ResearchThemeCard
                  key={theme.id}
                  theme={theme}
                  to={getResearchThemeRoute(
                    theme.id,
                    language,
                  )}
                  headingLevel={3}
                />
              ))}
            </div>
          </section>
        ) : null}

        {publications.length > 0 ? (
          <PublicationTable
            items={publications}
            themes={themes}
            language={language}
          />
        ) : null}

        {resources.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="research-activities-title"
          >
            <SectionHeader
              title={t(
                "pages.research.followActivities",
                {
                  lng: language,
                },
              )}
              titleId="research-activities-title"
              className="mb-8 sm:mb-10"
            />

            <ul
              className={cn(
                "m-0 grid list-none gap-5 p-0",
                "sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {resources.map((resource) => (
                <li
                  key={resource.href}
                  className="m-0 min-w-0"
                >
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
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
                        "h-full min-h-40 gap-0 rounded-lg py-0",
                        "border-border-strong",
                        "bg-brand-background shadow-none",
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
                          "flex flex-1 items-center",
                          "justify-center px-5 pt-7 pb-4",
                          "text-brand-primary",
                          "transition-colors duration-200",
                          "group-hover:text-brand-dark",
                        )}
                      >
                        <SocialResourceIcon
                          href={resource.href}
                        />
                      </span>

                      <span
                        className={cn(
                          "flex min-h-14 items-center",
                          "justify-center px-5 py-3",
                          "text-center font-semibold",
                          "text-brand-ink",
                          "transition-colors duration-200",
                          "group-hover:text-brand-primary",
                        )}
                      >
                        {resource.label}
                      </span>
                    </Card>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default ResearchPage;