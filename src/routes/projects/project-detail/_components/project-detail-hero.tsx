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
import type { getProjectDetailById } from '@/content/projects/detail/page';
import type { SupportedLanguage } from '@/types/localization';

type ProjectDetail = NonNullable<ReturnType<typeof getProjectDetailById>>;

type ProjectDetailHeroProps = {
  readonly language: SupportedLanguage;
  readonly project: ProjectDetail;
  readonly projectsBreadcrumbLabel: string;
  readonly defaultEyebrow: string;
};

export default function ProjectDetailHero({ language, project, projectsBreadcrumbLabel, defaultEyebrow }: ProjectDetailHeroProps) {
  const { t } = useTranslation();

  return (
    <Hero aria-labelledby="page-title">
      <HeroContainer className={project.heroImage ? undefined : 'lg:grid-cols-1'}>
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
                label: projectsBreadcrumbLabel,
                to: getPageRoute('projects', language),
              },
              {
                label: project.breadcrumbLabel,
              },
            ]}
          />

          <HeroHeader className="mt-4 sm:mt-5">
            <HeroEyebrow>{project.eyebrow ?? defaultEyebrow}</HeroEyebrow>

            <HeroTitle id="page-title">{project.title}</HeroTitle>

            <HeroDescription>
              <p className="!m-0">{project.summary}</p>
            </HeroDescription>
          </HeroHeader>
        </HeroContent>

        {project.heroImage ? (
          <HeroMedia>
            <HeroImage src={project.heroImage.src} alt={project.heroImage.alt} objectPosition={project.heroImage.objectPosition} />
          </HeroMedia>
        ) : null}
      </HeroContainer>
    </Hero>
  );
}
