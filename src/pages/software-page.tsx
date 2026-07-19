import ContentLink from "../components/content-link";
import PageHeader from "../components/page-header";
import SoftwareEntry from "../components/software-entry";
import { useSiteContent } from "../content/use-site-content";

function SoftwarePage() {
  const { content, language } = useSiteContent();
  const page = content.softwarePage;

  const featuredSoftware = content.software[page.featuredSoftwareId];

  return (
    <div className="page page--software" aria-labelledby="page-title">
      <div className="page__inner">
        <PageHeader
          eyebrow={page.eyebrow}
          title={page.title}
          introduction={page.introduction}
        />

        <section
          className="page-section page-section--featured"
          aria-labelledby={`software-${featuredSoftware.id}-title`}
        >
          <SoftwareEntry
            featured
            headingLevel={2}
            software={featuredSoftware}
          />
        </section>

        <section
          className="page-section"
          aria-labelledby="primary-software-title"
        >
          <header className="section-header">
            <h2 id="primary-software-title">{page.primaryTitle}</h2>
          </header>

          <div className="software-list">
            {page.primarySoftwareIds.map((softwareId) => (
              <SoftwareEntry
                key={softwareId}
                software={content.software[softwareId]}
              />
            ))}
          </div>
        </section>

        <section
          className="page-section"
          aria-labelledby="secondary-software-title"
        >
          <header className="section-header">
            <h2 id="secondary-software-title">{page.secondaryTitle}</h2>
          </header>

          <div className="software-list software-list--compact">
            {page.secondarySoftwareIds.map((softwareId) => (
              <SoftwareEntry
                key={softwareId}
                software={content.software[softwareId]}
                variant="summary"
              />
            ))}
          </div>
        </section>

        <section
          className="page-section continuation-section"
          aria-labelledby="software-continuation-title"
        >
          <header className="section-header">
            <h2 id="software-continuation-title">{page.continuationTitle}</h2>
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

export default SoftwarePage;
