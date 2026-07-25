import { Hero, HeroContainer, HeroContent, HeroDescription, HeroEyebrow, HeroHeader, HeroImage, HeroMedia, HeroTitle } from '@/components/hero';
import { getContactContent } from '@/content/contact/contact';
import type { SupportedLanguage } from '@/types/localization';

interface ContactHeroProps {
  language: SupportedLanguage;
}

export default function ContactHero({ language }: ContactHeroProps) {
  const content = getContactContent(language);

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
        </HeroContent>

        <HeroMedia>
          <HeroImage src={content.heroImage.src} alt={content.heroImage.alt} />
        </HeroMedia>
      </HeroContainer>
    </Hero>
  );
}
