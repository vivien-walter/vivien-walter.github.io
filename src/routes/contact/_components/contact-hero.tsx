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
import { getSiteContent } from '@/content/common/site';
import type { ContactContent } from '@/content/contact/contact';
import type { SupportedLanguage } from '@/types/localization';

interface ContactHeroProps {
  readonly content: ContactContent;
  readonly language: SupportedLanguage;
}

export default function ContactHero({ content, language }: ContactHeroProps) {
  const siteContent = getSiteContent(language);

  return (
    <Hero aria-labelledby="page-title">
      <HeroContainer>
        <HeroContent>
          <HeroBreadcrumbs
            ariaLabel={siteContent.breadcrumbs.label}
            items={[
              {
                label: siteContent.breadcrumbs.home,
                to: getPageRoute('home', language),
              },
              {
                label: content.title,
              },
            ]}
          />

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
