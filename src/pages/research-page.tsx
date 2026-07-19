import ExternalLink from "../components/external-link";
import PageHeader from "../components/page-header";
import PublicationEntry from "../components/publication-entry";
import SoftwareEntry from "../components/software-entry";
import { useSiteContent } from "../content/use-site-content";

function ResearchPage() {
  const { content } = useSiteContent();
  const page = content.researchPage;

  const selectedPublicationIds = new Set(page.selectedPublicationIds);

  const remainingPublicationIds = page.publicationIds.filter(
    (publicationId) => !selectedPublicationIds.has(publicationId),
  );

  return (
    <div className="page page--research" aria-labelledby="page-title">
      <div className="page__inner">
        <PageHeader
          eyebrow={page.eyebrow}
          title={page.title}
          introduction={page.introduction}
        />

        <section className="page-section" aria-labelledby="research-axes-title">
          <header className="section-header">
            <h2 id="research-axes-title">{page.axesTitle}</h2>
          </header>

          <div className="research-axes">
            {page.axes.map((axis) => (
              <article className="research-axis" key={axis.id}>
                <h3>{axis.title}</h3>
                <p>{axis.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" aria-labelledby="current-work-title">
          <header className="section-header">
            <h2 id="current-work-title">{page.currentWorkTitle}</h2>
          </header>

          <ul className="current-work-list">
            {page.currentWork.map((work) => (
              <li key={work}>{work}</li>
            ))}
          </ul>
        </section>

        <section
          className="page-section"
          aria-labelledby="selected-publications-title"
        >
          <header className="section-header">
            <h2 id="selected-publications-title">
              {page.selectedPublicationsTitle}
            </h2>
          </header>

          <div className="publication-list publication-list--selected">
            {page.selectedPublicationIds.map((publicationId) => (
              <PublicationEntry
                featured
                key={publicationId}
                publication={content.publications[publicationId]}
              />
            ))}
          </div>
        </section>

        {remainingPublicationIds.length > 0 ? (
          <section
            className="page-section"
            aria-labelledby="publications-title"
          >
            <header className="section-header">
              <h2 id="publications-title">{page.publicationsTitle}</h2>
            </header>

            <div className="publication-list">
              {remainingPublicationIds.map((publicationId) => (
                <PublicationEntry
                  key={publicationId}
                  publication={content.publications[publicationId]}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section
          className="page-section"
          aria-labelledby="research-resources-title"
        >
          <header className="section-header">
            <h2 id="research-resources-title">{page.resourcesTitle}</h2>
          </header>

          <div className="software-list software-list--compact">
            {page.softwareIds.map((softwareId) => (
              <SoftwareEntry
                key={softwareId}
                software={content.software[softwareId]}
                variant="summary"
              />
            ))}
          </div>
        </section>

        <section
          className="page-section external-resources"
          aria-labelledby="external-resources-title"
        >
          <header className="section-header">
            <h2 id="external-resources-title">{page.externalLinksTitle}</h2>
          </header>

          <ul className="resource-list">
            {page.externalLinkIds.map((linkId) => (
              <li key={linkId}>
                <ExternalLink linkId={linkId} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ResearchPage;
