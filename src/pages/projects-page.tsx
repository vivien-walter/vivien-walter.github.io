import ContentLink from "../components/content-link";
import PageHeader from "../components/page-header";
import ProjectEntry from "../components/project-entry";
import { useSiteContent } from "../content/use-site-content";

function ProjectsPage() {
  const { content, language } = useSiteContent();
  const page = content.projectsPage;

  const featuredProject = content.projects[page.featuredProjectId];

  return (
    <div className="page page--projects" aria-labelledby="page-title">
      <div className="page__inner">
        <PageHeader
          eyebrow={page.eyebrow}
          title={page.title}
          introduction={page.introduction}
        />

        <section
          className="page-section page-section--featured"
          aria-labelledby={`project-${featuredProject.id}-title`}
        >
          <ProjectEntry featured headingLevel={2} project={featuredProject} />
        </section>

        <section
          className="page-section"
          aria-labelledby="other-projects-title"
        >
          <header className="section-header">
            <h2 id="other-projects-title">{page.otherProjectsTitle}</h2>
          </header>

          <div className="project-list">
            {page.otherProjectIds.map((projectId) => (
              <ProjectEntry
                key={projectId}
                project={content.projects[projectId]}
              />
            ))}
          </div>
        </section>

        <section
          className="page-section continuation-section"
          aria-labelledby="projects-continuation-title"
        >
          <header className="section-header">
            <h2 id="projects-continuation-title">{page.continuationTitle}</h2>

            <p>{page.continuationText}</p>
          </header>

          <nav
            className="continuation-links"
            aria-label={page.continuationTitle}
          >
            {page.continuationLinks.map((link, index) => (
              <ContentLink
                key={`${link.label}-${index}`}
                className="editorial-link"
                language={language}
                link={link}
              />
            ))}
          </nav>
        </section>
      </div>
    </div>
  );
}

export default ProjectsPage;
