import { useTranslation } from 'react-i18next';

import { Hero, HeroContainer, HeroContent, HeroDescription, HeroEyebrow, HeroHeader, HeroTitle } from '@/components/hero';
import type { SupportedLanguage } from '@/types/localization';

type NotFoundHeroProps = {
  readonly language: SupportedLanguage;
};

export default function NotFoundHero({ language }: NotFoundHeroProps) {
  const { t } = useTranslation();

  return (
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
  );
}
