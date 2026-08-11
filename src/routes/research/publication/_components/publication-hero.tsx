import { useTranslation } from 'react-i18next';

import { getPageRoute } from '@/app/routing/navigation';
import { Hero, HeroBreadcrumbs, HeroContainer, HeroContent, HeroEyebrow, HeroHeader, HeroTitle } from '@/components/hero';
import { getResearchPageContent } from '@/content/research/page';
import { getResearchPublicationDetailById, getResearchPublicationPageContent } from '@/content/research/publications/page';
import type { SupportedLanguage } from '@/types/localization';

type ResearchPublication = NonNullable<ReturnType<typeof getResearchPublicationDetailById>>;

type PublicationHeroProps = {
  readonly language: SupportedLanguage;
  readonly publication: ResearchPublication;
};

export default function PublicationHero({ language, publication }: PublicationHeroProps) {
  const { t } = useTranslation();

  const page = getResearchPageContent(language);
  const detail = getResearchPublicationPageContent(language);

  const defaultEyebrow = publication.kind === 'article' ? detail.articleEyebrow : detail.thesisEyebrow;
  const eyebrow = publication.eyebrow ?? defaultEyebrow;

  return (
    <Hero aria-labelledby="page-title">
      <HeroContainer className="lg:grid-cols-1">
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
                label: publication.breadcrumbLabel,
              },
            ]}
          />

          <HeroHeader className="mt-4 sm:mt-5">
            <HeroEyebrow>{eyebrow}</HeroEyebrow>

            <HeroTitle id="page-title">{publication.title}</HeroTitle>
          </HeroHeader>
        </HeroContent>
      </HeroContainer>
    </Hero>
  );
}
