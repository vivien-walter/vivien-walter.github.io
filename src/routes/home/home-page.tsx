import {
  ArrowRightIcon,
  BriefcaseIcon,
  CodeIcon,
  MapPinIcon,
  MicroscopeIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import { Button } from "@/components/ui/button";
import { getContactContent } from "@/routes/contact/data/contact-content.loader";
import PageHero from "@/shared/components/page-hero";
import SectionHeader from "@/shared/components/section-header";

import FeaturedWorkCard from "./components/featured-work-card";
import HomeFollowGrid from "./components/home-follow-grid";
import HomeStatement from "./components/home-statement";
import ResearchAxisList from "./components/research-axis-list";
import { getFeaturedWorksContent } from "./data/featured-work-content.loader";
import { getHomeContent } from "./data/home-content.loader";
import { getHomeStatementContent } from "./data/home-statement-content.loader";
import { getResearchAxesContent } from "./data/research-axis-content.loader";

function HomePage() {
  const location = useLocation();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);
  const page = getHomeContent(language);
  const featuredWorks = getFeaturedWorksContent(language);
  const homeStatement = getHomeStatementContent(language);
  const researchAxes = getResearchAxesContent(language);
  const contactContent = getContactContent(language);

  const profileItems = page.sections[0]?.items ?? [];
  const practicalItems = page.sections[1]?.items ?? [];

  const heroHighlights = [
    {
      label: profileItems[0]?.split(" — ")[0],
      icon: BriefcaseIcon,
    },
    {
      label: profileItems[1]?.split(" — ")[0],
      icon: CodeIcon,
    },
    {
      label: profileItems[2]?.split(" — ")[0],
      icon: MicroscopeIcon,
    },
    {
      label: practicalItems[0],
      icon: MapPinIcon,
    },
  ].flatMap(({ label, icon }) =>
    label
      ? [
          {
            label,
            icon,
          },
        ]
      : [],
  );

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow={t("pages.home.title", {
          lng: language,
        })}
        title={page.title}
        introduction={page.introduction}
        actions={
          <>
            <Button
              asChild
              size="lg"
              className="min-h-11 rounded-sm px-5 shadow-none"
            >
              <Link to={getPageRoute("projects", language)}>
                <span>
                  {t("pages.projects.title", {
                    lng: language,
                  })}
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
              <Link to={getPageRoute("experience", language)}>
                {t("pages.experience.title", {
                  lng: language,
                })}
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
            {heroHighlights.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="m-0 grid content-start gap-2"
              >
                <Icon
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
            ))}
          </ul>
        }
      />

      <div className="mx-auto w-full max-w-editorial px-page">
        {featuredWorks.items.length > 0 ? (
          <section
            className="py-12 sm:py-14 lg:py-16"
            aria-labelledby="home-featured-works-title"
          >
            <SectionHeader
              title={featuredWorks.title}
              titleId="home-featured-works-title"
              description={featuredWorks.description}
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
                  <Link to={getPageRoute("projects", language)}>
                    {t("pages.projects.title", {
                      lng: language,
                    })}

                    <ArrowRightIcon
                      aria-hidden="true"
                      weight="bold"
                    />
                  </Link>
                </Button>
              }
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredWorks.items.map((work) => (
                <FeaturedWorkCard
                  key={`${work.kind}-${work.contentId}`}
                  work={work}
                  language={language}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <div className="bg-brand-dark py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-editorial px-page">
          <HomeStatement
            content={homeStatement}
            language={language}
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-editorial px-page">
        {researchAxes.items.length > 0 ? (
          <section
            className="py-12 sm:py-14 lg:py-16"
            aria-labelledby="home-research-axes-title"
          >
            <SectionHeader
              title={researchAxes.title}
              titleId="home-research-axes-title"
              description={researchAxes.description}
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
                  <Link to={getPageRoute("research", language)}>
                    {t("pages.research.title", {
                      lng: language,
                    })}

                    <ArrowRightIcon
                      aria-hidden="true"
                      weight="bold"
                    />
                  </Link>
                </Button>
              }
            />

            <ResearchAxisList
              items={researchAxes.items}
              language={language}
            />
          </section>
        ) : null}

        {practicalItems[0] ? (
          <section
            className={[
              "border-t border-border",
              "py-12 sm:py-14 lg:py-16",
            ].join(" ")}
            aria-labelledby="home-follow-daily-title"
          >
            <SectionHeader
              title={t("pages.home.followDaily", {
                lng: language,
              })}
              titleId="home-follow-daily-title"
              className="mb-8 sm:mb-10"
            />

            <HomeFollowGrid
              location={practicalItems[0]}
              links={contactContent.links}
            />
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;