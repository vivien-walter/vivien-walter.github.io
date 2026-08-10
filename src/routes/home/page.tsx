import { ArrowRightIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { getLanguageFromPathname, getPageRoute } from '@/app/routing/navigation';
import { Section, SectionAction, SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Button } from '@/components/ui/button';
import { getHomeContent } from '@/content/home/home';

import FeaturedWorkCard from './_components/featured-work-card';
import HomeFollowGrid from './_components/home-follow-grid';
import HomeHero from './_components/home-hero';
import HomeStatement from './_components/home-statement';
import ResearchAxisList from './_components/research-axis-list';

export default function HomePage() {
  /* Fetch all data for the translation */
  const { t } = useTranslation();
  const location = useLocation();
  const language = getLanguageFromPathname(location.pathname);
  const content = getHomeContent(language);

  return (
    <div className="overflow-hidden">
      <HomeHero language={language} />

      {content.featuredWorks.items.length > 0 ? (
        <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="home-featured-works-title">
          <SectionHeader className="mb-8 sm:mb-10">
            <SectionTitle id="home-featured-works-title">{content.featuredWorks.title}</SectionTitle>
            <SectionDescription>{content.featuredWorks.description}</SectionDescription>
          </SectionHeader>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.featuredWorks.items.map((work, index) => (
              <FeaturedWorkCard key={`featured-work-${index}`} work={work} language={language} />
            ))}
          </div>
        </Section>
      ) : null}

      <div className="bg-brand-dark py-12 sm:py-14 lg:py-16">
        <div className="max-w-editorial px-page mx-auto w-full">
          <HomeStatement content={content.statement} language={language} />
        </div>
      </div>

      {content.researchAxes.items.length > 0 ? (
        <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby="home-research-axes-title">
          <SectionHeader className="mb-8 sm:mb-10">
            <SectionTitle id="home-research-axes-title">{content.researchAxes.title}</SectionTitle>

            <SectionAction className="hidden sm:flex">
              <Button asChild variant="ghost" className="text-brand-primary hover:bg-action-soft hover:text-brand-primary min-h-11 px-2">
                <Link to={getPageRoute('research', language)}>
                  {t('pages.research.title', {
                    lng: language,
                  })}

                  <ArrowRightIcon aria-hidden="true" weight="bold" />
                </Link>
              </Button>
            </SectionAction>

            <SectionDescription>{content.researchAxes.description}</SectionDescription>
          </SectionHeader>

          <ResearchAxisList items={content.researchAxes.items} language={language} />

          <SectionAction className="mt-6 w-full sm:hidden">
            <Button asChild className="min-h-11 w-full px-5">
              <Link to={getPageRoute('research', language)}>
                {t('pages.research.title', {
                  lng: language,
                })}
              </Link>
            </Button>
          </SectionAction>
        </Section>
      ) : null}

      <Section aria-labelledby="home-follow-daily-title" containerClassName="border-border border-t py-12 sm:py-14 lg:py-16">
        <SectionHeader className="mb-8 sm:mb-10">
          <SectionTitle id="home-follow-daily-title">
            {t('pages.home.followDaily', {
              lng: language,
            })}
          </SectionTitle>

          <SectionDescription>{content.follow.description}</SectionDescription>
        </SectionHeader>

        <HomeFollowGrid content={content.follow} />
      </Section>
    </div>
  );
}
