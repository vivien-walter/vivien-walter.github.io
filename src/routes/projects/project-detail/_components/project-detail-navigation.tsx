import { getPageRoute, getProjectRoute } from '@/app/routing/navigation';
import DetailNavigation from '@/components/detail-navigation';
import { getProjectDetailById, getProjectDetailContent, getProjectDetailNavigation } from '@/content/projects/detail/page';
import type { SupportedLanguage } from '@/types/localization';

type ProjectDetail = NonNullable<ReturnType<typeof getProjectDetailById>>;
type ProjectDetailPageContent = ReturnType<typeof getProjectDetailContent>;

type ProjectDetailNavigationProps = {
  readonly language: SupportedLanguage;
  readonly projectId: ProjectDetail['id'];
  readonly labels: ProjectDetailPageContent;
};

export default function ProjectDetailNavigation({ language, projectId, labels }: ProjectDetailNavigationProps) {
  const { previous: previousProject, next: nextProject } = getProjectDetailNavigation(language, projectId);

  return (
    <DetailNavigation
      className="max-w-editorial px-page mx-auto mt-6 w-full pb-12 sm:mt-6 sm:pb-14 lg:pb-16"
      ariaLabel={labels.navigationLabel}
      backLink={{
        label: labels.backLabel,
        to: getPageRoute('projects', language),
      }}
      previousLabel={labels.previousLabel}
      nextLabel={labels.nextLabel}
      previousLink={
        previousProject
          ? {
              label: previousProject.title,
              to: getProjectRoute(previousProject.id, language),
            }
          : undefined
      }
      nextLink={
        nextProject
          ? {
              label: nextProject.title,
              to: getProjectRoute(nextProject.id, language),
            }
          : undefined
      }
    />
  );
}
