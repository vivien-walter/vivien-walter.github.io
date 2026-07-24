import { ArrowRightIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import PageHero from "@/components/page-hero";
import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { getHomeContent } from "@/content/home/home";

import FeaturedWorkCard from "./_components/featured-work-card";
import HomeFollowGrid from "./_components/home-follow-grid";
import HomeStatement from "./_components/home-statement";
import ResearchAxisList from "./_components/research-axis-list";

function HomePage() {
  const location = useLocation();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const content = getHomeContent(language);

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow={t("pages.home.title", {
          lng: language,
        })}
        title={content.title}
        introduction={content.introduction}
        actions={
          <>
            <Button
              asChild
              size="lg"
              className="min-h-11 rounded-sm px-5 shadow-none"
            >
              <Link
                to={getPageRoute(
                  "projects",
                  language,
                )}
              >
                <span>
                  {t(
                    "pages.projects.title",
                    {
                      lng: language,
                    },
                  )}
                </span>

                <ArrowRightIcon
                  aria-hidden="true"
                  weight="bold"
                />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className={[
                "min-h-11 rounded-sm px-5",
                "border-brand-primary bg-transparent",
                "text-brand-primary shadow-none",
                "hover:bg-action-soft hover:text-brand-primary",
              ].join(" ")}
            >
              <Link
                to={getPageRoute(
                  "experience",
                  language,
                )}
              >
                {t(
                  "pages.experience.title",
                  {
                    lng: language,
                  },
                )}
              </Link>
            </Button>
          </>
        }
        footer={
          <ul
            className={[
              "m-0 grid list-none gap-x-5 gap-y-6 p-0",
              "grid-cols-2 lg:grid-cols-4",
            ].join(" ")}
          >
            {content.heroHighlights.map(
              ({
                id,
                label,
                icon: HighlightIcon,
              }) => (
                <li
                  key={id}
                  className="m-0 grid content-start gap-2"
                >
                  <HighlightIcon
                    aria-hidden="true"
                    className="size-6 text-brand-accent"
                    weight="regular"
                  />

                  <span
                    className={[
                      "text-xs leading-normal font-medium",
                      "text-brand-ink",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </li>
              ),
            )}
          </ul>
        }
      />

      <div className="mx-auto w-full max-w-editorial px-page">
        {content.featuredWorks.items.length >
        0 ? (
          <section
            className="py-12 sm:py-14 lg:py-16"
            aria-labelledby="home-featured-works-title"
          >
            <SectionHeader
              title={
                content.featuredWorks.title
              }
              titleId="home-featured-works-title"
              className="mb-8 sm:mb-10"
              action={
                <Button
                  asChild
                  variant="ghost"
                  className={[
                    "min-h-11 px-2",
                    "text-brand-primary",
                    "hover:bg-action-soft",
                    "hover:text-brand-primary",
                  ].join(" ")}
                >
                  <Link
                    to={getPageRoute(
                      "projects",
                      language,
                    )}
                  >
                    {t(
                      "pages.projects.title",
                      {
                        lng: language,
                      },
                    )}

                    <ArrowRightIcon
                      aria-hidden="true"
                      weight="bold"
                    />
                  </Link>
                </Button>
              }
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {content.featuredWorks.items.map(
                (work) => (
                  <FeaturedWorkCard
                    key={`${work.kind}-${work.contentId}`}
                    work={work}
                    language={language}
                  />
                ),
              )}
            </div>
          </section>
        ) : null}
      </div>

      <div className="bg-brand-dark py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-editorial px-page">
          <HomeStatement
            content={content.statement}
            language={language}
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-editorial px-page">
        {content.researchAxes.items.length >
        0 ? (
          <section
            className="py-12 sm:py-14 lg:py-16"
            aria-labelledby="home-research-axes-title"
          >
            <SectionHeader
              title={
                content.researchAxes.title
              }
              titleId="home-research-axes-title"
              className="mb-8 sm:mb-10"
              action={
                <Button
                  asChild
                  variant="ghost"
                  className={[
                    "min-h-11 px-2",
                    "text-brand-primary",
                    "hover:bg-action-soft",
                    "hover:text-brand-primary",
                  ].join(" ")}
                >
                  <Link
                    to={getPageRoute(
                      "research",
                      language,
                    )}
                  >
                    {t(
                      "pages.research.title",
                      {
                        lng: language,
                      },
                    )}

                    <ArrowRightIcon
                      aria-hidden="true"
                      weight="bold"
                    />
                  </Link>
                </Button>
              }
            />

            <ResearchAxisList
              items={
                content.researchAxes.items
              }
              language={language}
            />
          </section>
        ) : null}

        <section
          className={[
            "border-t border-border",
            "py-12 sm:py-14 lg:py-16",
          ].join(" ")}
          aria-labelledby="home-follow-daily-title"
        >
          <SectionHeader
            title={t(
              "pages.home.followDaily",
              {
                lng: language,
              },
            )}
            titleId="home-follow-daily-title"
            className="mb-8 sm:mb-10"
          />

          <HomeFollowGrid
            content={content.follow}
          />
        </section>
      </div>
    </div>
  );
}

export default HomePage;