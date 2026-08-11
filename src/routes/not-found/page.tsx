import { ArrowRightIcon, HouseIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { getLanguageFromPathname, getPageRoute } from '@/app/routing/navigation';
import { Hero, HeroContainer, HeroContent, HeroDescription, HeroEyebrow, HeroHeader, HeroTitle } from '@/components/hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFoundPage() {
  const location = useLocation();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(location.pathname);

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <Hero aria-labelledby="page-title">
        <HeroContainer className="lg:grid-cols-1">
          <HeroContent>
            <HeroHeader>
              <HeroEyebrow>
                {t('notFound.eyebrow', {
                  lng: language,
                })}
              </HeroEyebrow>

              <HeroTitle id="page-title">
                {t('notFound.title', {
                  lng: language,
                })}
              </HeroTitle>

              <HeroDescription>
                <p className="!m-0">
                  {t('notFound.introduction', {
                    lng: language,
                  })}
                </p>
              </HeroDescription>
            </HeroHeader>
          </HeroContent>
        </HeroContainer>
      </Hero>

      <div className="max-w-editorial px-page mx-auto w-full py-12 sm:py-14 lg:py-16">
        <nav
          aria-label={t('notFound.navigationLabel', {
            lng: language,
          })}
          className="max-w-readable"
        >
          <Card className="border-border-strong shadow-subtle gap-0 py-0">
            <CardHeader className="border-border border-b px-5 py-5 sm:px-6">
              <CardTitle className="text-heading text-base">
                {t('notFound.navigationLabel', {
                  lng: language,
                })}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:flex-wrap sm:p-6">
              <Button asChild size="lg" className="min-h-11 sm:min-w-40">
                <Link to={getPageRoute('home', language)}>
                  <HouseIcon aria-hidden="true" weight="bold" />

                  {t('notFound.homeLink', {
                    lng: language,
                  })}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border-strong bg-card text-heading hover:border-primary hover:bg-action-soft hover:text-action-strong min-h-11 shadow-none"
              >
                <Link to={getPageRoute('projects', language)}>
                  {t('notFound.projectsLink', {
                    lng: language,
                  })}

                  <ArrowRightIcon aria-hidden="true" weight="bold" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border-strong bg-card text-heading hover:border-primary hover:bg-action-soft hover:text-action-strong min-h-11 shadow-none"
              >
                <Link to={getPageRoute('software', language)}>
                  {t('notFound.softwareLink', {
                    lng: language,
                  })}

                  <ArrowRightIcon aria-hidden="true" weight="bold" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </nav>
      </div>
    </article>
  );
}
