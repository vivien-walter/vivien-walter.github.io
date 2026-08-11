import { useTranslation } from 'react-i18next';

import { getPageRoute } from '@/app/routing/navigation';
import {
  Hero,
  HeroBreadcrumbs,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroFooter,
  HeroHeader,
  HeroImage,
  HeroMedia,
  HeroTitle,
} from '@/components/hero';
import { type ExperienceDetailPageContent, getExperienceDetailById } from '@/content/experience/experiences/page';
import { formatContentDateRange } from '@/lib/content/formatters';
import type { SupportedLanguage } from '@/types/localization';

type ExperienceDetail = NonNullable<ReturnType<typeof getExperienceDetailById>>;

type ExperienceDetailHeroProps = {
  readonly detail: ExperienceDetailPageContent;
  readonly experience: ExperienceDetail;
  readonly language: SupportedLanguage;
};

export default function ExperienceDetailHero({ detail, experience, language }: ExperienceDetailHeroProps) {
  const { t } = useTranslation();

  return (
    <Hero aria-labelledby="page-title">
      <HeroContainer className={experience.heroImage ? undefined : 'lg:grid-cols-1'}>
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
                to: getPageRoute('experience', language),
              },
              {
                label: experience.breadcrumbLabel,
              },
            ]}
          />

          <HeroHeader className="mt-4 sm:mt-5">
            <HeroEyebrow>{experience.eyebrow ?? detail.eyebrow}</HeroEyebrow>

            <HeroTitle id="page-title">{experience.role}</HeroTitle>

            <HeroDescription>
              <p className="!m-0">{experience.summary}</p>
            </HeroDescription>
          </HeroHeader>

          <HeroFooter>
            <dl className="m-0 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="min-w-0">
                <dt className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.08em] uppercase">{detail.organization}</dt>

                <dd className="text-brand-ink m-0 mt-1 font-semibold">{experience.organization}</dd>
              </div>

              <div className="min-w-0">
                <dt className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.08em] uppercase">{detail.period}</dt>

                <dd className="text-brand-ink m-0 mt-1 font-semibold">{formatContentDateRange(experience.period, language)}</dd>
              </div>

              {experience.location ? (
                <div className="min-w-0">
                  <dt className="text-muted-foreground font-mono text-xs font-semibold tracking-[0.08em] uppercase">{detail.location}</dt>

                  <dd className="text-brand-ink m-0 mt-1 font-semibold">{experience.location}</dd>
                </div>
              ) : null}
            </dl>
          </HeroFooter>
        </HeroContent>

        {experience.heroImage ? (
          <HeroMedia>
            <HeroImage src={experience.heroImage.src} alt={experience.heroImage.alt} objectPosition={experience.heroImage.objectPosition} />
          </HeroMedia>
        ) : null}
      </HeroContainer>
    </Hero>
  );
}
