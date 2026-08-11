import { useTranslation } from 'react-i18next';

import { getPageRoute } from '@/app/routing/navigation';
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
import { getResearchPageContent } from '@/content/research/page';
import { getResearchThemeDetailById, getResearchThemePageContent } from '@/content/research/themes/page';
import type { SupportedLanguage } from '@/types/localization';

type ResearchThemeDetail = NonNullable<ReturnType<typeof getResearchThemeDetailById>>;

type ResearchThemeHeroProps = {
  readonly language: SupportedLanguage;
  readonly theme: ResearchThemeDetail;
};

export default function ResearchThemeHero({ language, theme }: ResearchThemeHeroProps) {
  const { t } = useTranslation();

  const page = getResearchPageContent(language);
  const detail = getResearchThemePageContent(language);

  return (
    <Hero aria-labelledby="page-title">
      <HeroContainer className={theme.heroImage ? undefined : 'lg:grid-cols-1'}>
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
                label: page.breadcrumbLabel,
                to: getPageRoute('research', language),
              },
              {
                label: theme.breadcrumbLabel,
              },
            ]}
          />

          <HeroHeader className="mt-4 sm:mt-5">
            <HeroEyebrow>{theme.eyebrow ?? detail.eyebrow}</HeroEyebrow>

            <HeroTitle id="page-title">{theme.title}</HeroTitle>

            <HeroDescription>
              <p className="!m-0">{theme.introduction}</p>
            </HeroDescription>
          </HeroHeader>
        </HeroContent>

        {theme.heroImage ? (
          <HeroMedia>
            <HeroImage src={theme.heroImage.src} alt={theme.heroImage.alt} objectPosition={theme.heroImage.objectPosition} />
          </HeroMedia>
        ) : null}
      </HeroContainer>
    </Hero>
  );
}
