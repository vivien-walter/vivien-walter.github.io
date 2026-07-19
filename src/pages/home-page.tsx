import ContentLink from "../components/content-link";
import PageHeader from "../components/page-header";
import ProjectEntry from "../components/project-entry";
import SoftwareEntry from "../components/software-entry";
import { useSiteContent } from "../content/use-site-content";

function HomePage() {
  const { content, language } = useSiteContent();
  const page = content.home;

  return (
    <div className="page page--home" aria-labelledby="page-title">
      <div className="page__inner">
        <PageHeader
          eyebrow={page.eyebrow}
          title={page.title}
          introduction={page.introduction}
        />

        <div className="page-actions">
          {page.primaryLinks.map((link, index) => (
            <ContentLink
              key={`${link.label}-${index}`}
              className={
                index === 0
                  ? "button-link button-link--primary"
                  : "button-link button-link--secondary"
              }
              language={language}
              link={link}
            />
          ))}
        </div>

        <section
          className="page-section"
          aria-labelledby="home-dimensions-title"
        >
          <header className="section-header">
            <h2 id="home-dimensions-title">{page.dimensionsTitle}</h2>
          </header>

          <div className="profile-dimensions">
            {page.dimensions.map((dimension) => (
              <article className="profile-dimension" key={dimension.id}>
                <h3>{dimension.title}</h3>
                <p>{dimension.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="page-section"
          aria-labelledby="home-selected-content-title"
        >
          <header className="section-header">
            <h2 id="home-selected-content-title">
              {page.selectedContentTitle}
            </h2>
          </header>

          <div className="selected-content">
            {page.selectedProjectIds.map((projectId) => (
              <ProjectEntry
                key={projectId}
                project={content.projects[projectId]}
                variant="summary"
              />
            ))}

            {page.selectedSoftwareIds.map((softwareId) => (
              <SoftwareEntry
                key={softwareId}
                software={content.software[softwareId]}
                variant="summary"
              />
            ))}
          </div>
        </section>

        <section
          className="page-section practical-section"
          aria-labelledby="home-practical-title"
        >
          <div className="practical-section__content">
            <header className="section-header">
              <h2 id="home-practical-title">{page.practicalTitle}</h2>
            </header>

            <ul className="practical-list">
              {page.practicalItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="practical-section__action">
            <ContentLink
              className="button-link button-link--primary"
              language={language}
              link={page.contactLink}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
