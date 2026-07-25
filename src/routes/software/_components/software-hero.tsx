import { GithubLogoIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { getPageRoute } from '@/app/routing/navigation';
import heroImageSrc from '@/assets/images/softwares/hero.png';
import { Hero, HeroActions, HeroContainer, HeroContent, HeroDescription, HeroHeader, HeroImage, HeroMedia, HeroTitle } from '@/components/hero';
import { Button } from '@/components/ui/button';
import { getSoftwareContent } from '@/content/software/page';
import type { SupportedLanguage } from '@/types/localization';

interface SoftwareHeroProps {
  language: SupportedLanguage;
}

export default function SoftwareHero({ language }: SoftwareHeroProps) {
  const content = getSoftwareContent(language);

  return (
    <Hero aria-labelledby="page-title">
      <HeroContainer>
        <HeroContent>
          <div className="min-h-6" aria-hidden="true" />

          <HeroHeader className="mt-4 sm:mt-5">
            <HeroTitle id="page-title">{content.title}</HeroTitle>

            <HeroDescription>
              <p className="!m-0">{content.introduction}</p>
            </HeroDescription>
          </HeroHeader>

          <HeroActions>
            <Button asChild size="lg" className="min-h-11 rounded-sm px-5 shadow-none">
              <Link to={getPageRoute('projects', language)}>
                <span>{content.heroActions.github}</span>

                <GithubLogoIcon aria-hidden="true" weight="bold" />
              </Link>
            </Button>
          </HeroActions>
        </HeroContent>

        <HeroMedia>
          <HeroImage src={heroImageSrc} alt={content.heroImage.alt} />
        </HeroMedia>
      </HeroContainer>
    </Hero>
  );
}
