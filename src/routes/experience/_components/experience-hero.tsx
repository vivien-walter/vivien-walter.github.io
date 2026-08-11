import { useTranslation } from 'react-i18next';

import { getPageRoute } from '@/app/routing/navigation';
import heroImageSrc from '@/assets/images/experiences/hero.jpg';
import {
  Hero,
  HeroBreadcrumbs,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroHeader,
  HeroImage,
  HeroMedia,
  HeroTitle,
} from '@/components/hero';
import type { ExperiencePageContent } from '@/content/experience/page';
import type { SupportedLanguage } from '@/types/localization';

type ExperienceHeroProps = {
  readonly eyebrow?: string;
  readonly language: SupportedLanguage;
  readonly page: ExperiencePageContent;
};

export default function ExperienceHero({ eyebrow, language, page }: ExperienceHeroProps) {
  const { t } = useTranslation();

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
                label: t('pages.experience.title', {
                  lng: language,
                }),
              },
            ]}
          />

          <HeroHeader className="mt-4 sm:mt-5">
            {eyebrow?.trim() ? <HeroEyebrow>{eyebrow}</HeroEyebrow> : null}

            <HeroTitle id="page-title">{page.title}</HeroTitle>

            <HeroDescription>
              <p className="!m-0">{page.introduction}</p>
            </HeroDescription>
          </HeroHeader>
        </HeroContent>

        <HeroMedia>
          <HeroImage src={heroImageSrc} alt="" />
        </HeroMedia>
      </HeroContainer>
    </Hero>
  );
}
