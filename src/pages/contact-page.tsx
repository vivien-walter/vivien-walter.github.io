import ExternalLink from "../components/external-link";
import PageHeader from "../components/page-header";
import { useSiteContent } from "../content/use-site-content";

function ContactPage() {
  const { content } = useSiteContent();
  const page = content.contactPage;

  return (
    <div className="page page--contact" aria-labelledby="page-title">
      <div className="page__inner">
        <PageHeader
          eyebrow={page.eyebrow}
          title={page.title}
          introduction={page.introduction}
        />

        <section
          className="page-section"
          aria-labelledby="contact-channels-title"
        >
          <header className="section-header">
            <h2 id="contact-channels-title">{page.channelsTitle}</h2>
          </header>

          <ul className="contact-channels">
            {page.channelLinkIds.map((linkId) => (
              <li key={linkId}>
                <ExternalLink className="contact-channel" linkId={linkId} />
              </li>
            ))}
          </ul>
        </section>

        <section className="page-section" aria-labelledby="availability-title">
          <header className="section-header">
            <h2 id="availability-title">{page.availabilityTitle}</h2>
          </header>

          <ul className="availability-list">
            {page.availabilityItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="page-section" aria-labelledby="cv-title">
          <header className="section-header">
            <h2 id="cv-title">{page.cvTitle}</h2>
          </header>

          <p className="content-warning">{page.cvNotice}</p>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
