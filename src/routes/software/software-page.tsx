import {
  ArrowRightIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  LinkSimpleIcon,
} from "@phosphor-icons/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getSoftwareRoute,
} from "@/app/routing/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ContentLink from "@/shared/components/content-link";
import ContentSections from "@/shared/components/content-sections";
import PageHero from "@/shared/components/page-hero";
import SectionHeader from "@/shared/components/section-header";

import SoftwareCatalog from "./components/software-catalog";
import {
  getSoftwareById,
  getSoftwareIndex,
  getSoftwarePage,
} from "./data/software-content.loader";

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

function SoftwarePage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getSoftwarePage(language);
  const index = getSoftwareIndex(language);
  const resources = page.links ?? [];

  const {
    softwareEntries,
    pinnedSoftwareEntry,
  } = useMemo(() => {
    const entries = index.order.flatMap((softwareId) => {
      const software = getSoftwareById(language, softwareId);

      return software
        ? [{ software, softwareId }]
        : [];
    });

    const pinnedEntries = entries.filter(
      ({ software }) => software.pinned === true,
    );

    const selectedPinnedEntry =
      pinnedEntries.length > 0
        ? pinnedEntries[
            Math.floor(Math.random() * pinnedEntries.length)
          ]
        : undefined;

    return {
      softwareEntries: entries,
      pinnedSoftwareEntry: selectedPinnedEntry,
    };
  }, [index, language]);

  const githubLink = resources.find((link) =>
    link.href.includes("github.com"),
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
              label: t("breadcrumbs.software", {
                lng: language,
              }),
            },
          ],
        }}
        title={page.title}
        introduction={page.introduction}
        actions={
          githubLink ? (
            <Button
              asChild
              size="lg"
              className="min-h-11"
            >
              <a href={githubLink.href}>
                <GithubLogoIcon
                  aria-hidden="true"
                  weight="bold"
                />

                {t("links.github", {
                  lng: language,
                })}
              </a>
            </Button>
          ) : undefined
        }
      />

      {pinnedSoftwareEntry ? (
        <section
          className="border-b border-border"
          aria-labelledby="featured-software-title"
        >
          <div
            className={[
              "mx-auto w-full max-w-editorial px-page",
              "py-12 sm:py-14 lg:py-16",
            ].join(" ")}
          >
            <SectionHeader
              title={t(
                "pages.software.featuredTitle",
                {
                  lng: language,
                },
              )}
              titleId="featured-software-title"
            />

            <article
              className="mt-8 grid gap-6"
              aria-labelledby={
                `featured-software-${pinnedSoftwareEntry.softwareId}`
              }
            >
              <div className="max-w-readable">
                <h3
                  id={
                    `featured-software-${pinnedSoftwareEntry.softwareId}`
                  }
                  className={[
                    "!m-0 text-xl font-bold leading-heading",
                    "tracking-[-0.025em] text-brand-ink",
                  ].join(" ")}
                >
                  {pinnedSoftwareEntry.software.title}
                </h3>

                <p className="!mt-4 !mb-0 text-md text-muted-foreground">
                  {pinnedSoftwareEntry.software.summary}
                </p>
              </div>

              {pinnedSoftwareEntry.software.technologies &&
              pinnedSoftwareEntry.software.technologies.length > 0 ? (
                <ul
                  className="!m-0 flex list-none flex-wrap gap-2 !p-0"
                  aria-label={t(
                    "content.technologies",
                    {
                      lng: language,
                    },
                  )}
                >
                  {pinnedSoftwareEntry.software.technologies.map(
                    (technology) => (
                      <li
                        className="!m-0"
                        key={technology}
                      >
                        <Badge
                          variant="secondary"
                          className={[
                            "border border-border bg-muted",
                            "px-3 py-1 font-mono font-medium",
                            "text-muted-foreground",
                          ].join(" ")}
                        >
                          {technology}
                        </Badge>
                      </li>
                    ),
                  )}
                </ul>
              ) : null}

              <div
                className={[
                  "flex flex-wrap items-center gap-x-5 gap-y-2",
                  "border-t border-border pt-6",
                ].join(" ")}
              >
                <Button
                  asChild
                  className="min-h-11"
                >
                  <Link
                    to={getSoftwareRoute(
                      pinnedSoftwareEntry.softwareId,
                      language,
                    )}
                  >
                    {t("actions.viewSoftware", {
                      lng: language,
                    })}

                    <ArrowRightIcon
                      aria-hidden="true"
                      weight="bold"
                    />
                  </Link>
                </Button>

                {pinnedSoftwareEntry.software.links?.map(
                  (link, linkIndex) => (
                    <ContentLink
                      key={`${link.href}-${linkIndex}`}
                      link={link}
                      variant="inline"
                    />
                  ),
                )}
              </div>
            </article>
          </div>
        </section>
      ) : null}

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        ].join(" ")}
      >
        <ContentSections
          idPrefix="software-page"
          sections={page.sections ?? []}
        />

        {softwareEntries.length > 0 ? (
          <SoftwareCatalog
            items={softwareEntries}
            language={language}
          />
        ) : null}

        {resources.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="software-activities-title"
          >
            <SectionHeader
              title={t(
                "pages.software.followActivities",
                {
                  lng: language,
                },
              )}
              titleId="software-activities-title"
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

export default SoftwarePage;