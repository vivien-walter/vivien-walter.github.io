import { getPageRoute } from '@/app/routing/navigation';
import { Hero, HeroBreadcrumbs, HeroContainer, HeroContent, HeroDescription, HeroHeader, HeroImage, HeroMedia, HeroTitle } from '@/components/hero';
import type { SiteContent } from '@/content/common/site';
import type { ContactContent } from '@/content/contact/contact';
import type { SupportedLanguage } from '@/types/localization';

interface ContactHeroProps {
  readonly breadcrumbs: SiteContent['breadcrumbs'];
  readonly content: ContactContent;
  readonly language: SupportedLanguage;
}

export default function ContactHero({ breadcrumbs, content, language }: ContactHeroProps) {
  return (
    <Hero aria-labelledby="page-title">
      <HeroContainer>
        <HeroContent>
          <HeroBreadcrumbs
            ariaLabel={breadcrumbs.label}
            items={[
              {
                label: breadcrumbs.home,
                to: getPageRoute('home', language),
              },
              {
                label: content.eyebrow,
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
