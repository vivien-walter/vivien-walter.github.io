import { GithubLogoIcon } from '@phosphor-icons/react';

import heroImageSrc from '@/assets/images/softwares/hero.png';
import {
  Hero,
  HeroActions,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroHeader,
  HeroImage,
  HeroMedia,
  HeroTitle,
} from '@/components/hero';
import { Button } from '@/components/ui/button';
import { getSoftwareContent } from '@/content/software/page';
import type { SupportedLanguage } from '@/types/localization';

interface SoftwareHeroProps {
  readonly language: SupportedLanguage;
}

export default function SoftwareHero({ language }: SoftwareHeroProps) {
  const content = getSoftwareContent(language);

  return (
    <Hero aria-labelledby="page-title">
      <HeroContainer>
        <HeroContent>
          <div className="min-h-6" aria-hidden="true" />

          <HeroHeader className="mt-4 sm:mt-5">
            <HeroEyebrow>{content.eyebrow}</HeroEyebrow>

            <HeroTitle id="page-title">{content.title}</HeroTitle>

            <HeroDescription>
              <p className="!m-0">{content.introduction}</p>
            </HeroDescription>
          </HeroHeader>

          <HeroActions>
            <Button asChild size="lg" className="min-h-11 rounded-sm px-5 shadow-none">
              <a href={content.githubResource.href} target="_blank" rel="noopener noreferrer" data-external="true">
                <span>{content.githubResource.label}</span>
                <GithubLogoIcon aria-hidden="true" weight="bold" />
              </a>
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
