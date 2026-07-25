import { BookBookmarkIcon, GraduationCapIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { getPageRoute } from '@/app/routing/navigation';
import {
  Hero,
  HeroActions,
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
import { Button } from '@/components/ui/button';
import { getHomeContent } from '@/content/home/home';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

interface HomeHeroProps {
  language: SupportedLanguage;
}

export default function HomeHero({ language }: HomeHeroProps) {
  const content = getHomeContent(language);

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
              <Link to={getPageRoute('projects', language)}>
                <span>{content.heroActions.projects}</span>

                <BookBookmarkIcon aria-hidden="true" weight="bold" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                'min-h-11 rounded-sm px-5',
                'border-brand-primary bg-transparent',
                'text-brand-primary shadow-none',
                'hover:bg-action-soft hover:text-brand-primary',
              )}
            >
              <Link to={getPageRoute('experience', language)}>
                {content.heroActions.experience}
                <GraduationCapIcon aria-hidden="true" weight="bold" />
              </Link>
            </Button>
          </HeroActions>

          <HeroFooter className="hidden lg:block">
            <ul className={cn('m-0 grid list-none p-0', 'grid-cols-4 gap-x-5 gap-y-6')}>
              {content.heroHighlights.map(({ id, label, icon: HighlightIcon }) => (
                <li key={id} className="m-0 grid content-start gap-2">
                  <HighlightIcon aria-hidden="true" className="text-brand-accent size-6 justify-self-center" weight="regular" />

                  <span className="text-brand-ink text-xs leading-normal font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </HeroFooter>
        </HeroContent>

        <HeroMedia>
          <HeroImage src={content.heroImage.src} alt={content.heroImage.alt} />
        </HeroMedia>
      </HeroContainer>
    </Hero>
  );
}
