import { ArrowRightIcon, HouseIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getPageRoute } from '@/app/routing/navigation';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SupportedLanguage } from '@/types/localization';

type ContentProps = {
  readonly language: SupportedLanguage;
};

export default function Content({ language }: ContentProps) {
  const { t } = useTranslation();

  return (
    <Section className="py-12 sm:py-14 lg:py-16">
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
    </Section>
  );
}
