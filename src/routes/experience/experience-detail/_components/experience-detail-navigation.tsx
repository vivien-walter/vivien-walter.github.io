import { getExperienceRoute, getPageRoute } from '@/app/routing/navigation';
import DetailNavigation from '@/components/detail-navigation';
import { type ExperienceDetailPageContent, getExperienceDetailById, getExperienceNavigation } from '@/content/experience/experiences/page';
import type { SupportedLanguage } from '@/types/localization';

type ExperienceDetail = NonNullable<ReturnType<typeof getExperienceDetailById>>;

type ExperienceDetailNavigationProps = {
  readonly detail: ExperienceDetailPageContent;
  readonly experienceId: ExperienceDetail['id'];
  readonly language: SupportedLanguage;
};

export default function ExperienceDetailNavigation({ detail, experienceId, language }: ExperienceDetailNavigationProps) {
  const { previous: previousExperience, next: nextExperience } = getExperienceNavigation(language, experienceId);

  return (
    <DetailNavigation
      className="max-w-editorial px-page mx-auto !mt-6 w-full pb-12 sm:!mt-6 sm:pb-14 lg:pb-16"
      ariaLabel={detail.navigationLabel}
      backLink={{
        label: detail.backLabel,
        to: getPageRoute('experience', language),
      }}
      previousLabel={detail.previousLabel}
      nextLabel={detail.nextLabel}
      previousLink={
        previousExperience
          ? {
              label: previousExperience.role,
              secondaryLabel: previousExperience.organization,
              to: getExperienceRoute(previousExperience.id, language),
            }
          : undefined
      }
      nextLink={
        nextExperience
          ? {
              label: nextExperience.role,
              secondaryLabel: nextExperience.organization,
              to: getExperienceRoute(nextExperience.id, language),
            }
          : undefined
      }
    />
  );
}
