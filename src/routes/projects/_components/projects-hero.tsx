import { useTranslation } from 'react-i18next';

import { getPageRoute } from '@/app/routing/navigation';
import heroImageSrc from '@/assets/images/projects/hero.png';
import { Hero, HeroBreadcrumbs, HeroContainer, HeroContent, HeroDescription, HeroHeader, HeroImage, HeroMedia, HeroTitle } from '@/components/hero';
import type { ProjectsPageContent } from '@/content/projects/page';
import type { SupportedLanguage } from '@/types/localization';

type ProjectsHeroProps = {
  readonly language: SupportedLanguage;
  readonly page: ProjectsPageContent;
};

function ProjectsHero({ language, page }: ProjectsHeroProps) {
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
                label: page.breadcrumbLabel,
              },
            ]}
          />

          <HeroHeader className="mt-4 sm:mt-5">
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

export default ProjectsHero;
