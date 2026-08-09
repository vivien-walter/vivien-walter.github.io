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
import type { SoftwareCatalogItem } from '@/content/software/catalog';
import { getSoftwareContent } from '@/content/software/page';
import type { SupportedLanguage } from '@/types/localization';

interface SoftwareDetailHeroProps {
  readonly language: SupportedLanguage;
  readonly software: SoftwareCatalogItem;
}

function SoftwareDetailHero({ language, software }: SoftwareDetailHeroProps) {
  const { t } = useTranslation();

  const softwarePage = getSoftwareContent(language);
  const SoftwareIcon = software.icon;

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
                label: softwarePage.breadcrumbLabel,
                to: getPageRoute('software', language),
              },
              {
                label: software.breadcrumbLabel,
              },
            ]}
          />

          <HeroHeader className="mt-4 sm:mt-5">
            <HeroEyebrow>{software.eyebrow}</HeroEyebrow>

            <HeroTitle id="page-title">{software.title}</HeroTitle>

            <HeroDescription>
              <p className="!m-0">{software.summary}</p>
            </HeroDescription>
          </HeroHeader>
        </HeroContent>
        <HeroMedia className="bg-action-soft text-brand-primary relative flex items-center justify-center overflow-hidden p-8 sm:p-10 lg:p-12">
          {software.heroImage ? (
            <HeroImage src={software.heroImage.src} alt={software.heroImage.alt} />
          ) : (
            <SoftwareIcon aria-hidden="true" className="size-24 sm:size-28 lg:size-32" weight="regular" />
          )}
        </HeroMedia>
      </HeroContainer>
    </Hero>
  );
}

export default SoftwareDetailHero;
