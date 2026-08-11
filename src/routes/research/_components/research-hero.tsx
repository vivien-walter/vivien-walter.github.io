import { useTranslation } from 'react-i18next';

import { getPageRoute } from '@/app/routing/navigation';
import { Hero, HeroBreadcrumbs, HeroContainer, HeroContent, HeroDescription, HeroHeader, HeroImage, HeroMedia, HeroTitle } from '@/components/hero';
import { getResearchPageContent } from '@/content/research/page';
import type { SupportedLanguage } from '@/types/localization';

type ResearchHeroProps = {
  readonly language: SupportedLanguage;
};

export default function ResearchHero({ language }: ResearchHeroProps) {
  const { t } = useTranslation();
  const content = getResearchPageContent(language);

  return (
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
                label: content.breadcrumbLabel,
              },
            ]}
          />

          <HeroHeader className="mt-4 sm:mt-5">
            <HeroTitle id="page-title">{content.title}</HeroTitle>

            <HeroDescription>
              <p className="!m-0">{content.introduction}</p>
            </HeroDescription>
          </HeroHeader>
        </HeroContent>

        <HeroMedia>
          <HeroImage src={content.heroImage.src} alt={content.heroImage.alt} />
        </HeroMedia>
      </HeroContainer>
    </Hero>
  );
}
