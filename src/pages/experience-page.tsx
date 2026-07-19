import PageHeader from "../components/page-header";
import TimelineEntry from "../components/timeline-entry";
import { useSiteContent } from "../content/use-site-content";

function ExperiencePage() {
  const { content } = useSiteContent();
  const page = content.experiencePage;

  return (
    <div className="page page--experience" aria-labelledby="page-title">
      <div className="page__inner">
        <PageHeader
          eyebrow={page.eyebrow}
          title={page.title}
          introduction={page.introduction}
        />

        <section className="page-section" aria-labelledby="journey-title">
          <header className="section-header">
            <h2 id="journey-title">{page.journeyTitle}</h2>
          </header>

          <ol className="journey-list">
            {page.journey.map((step) => (
              <li className="journey-entry" key={step.id}>
                <article>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="page-section"
          aria-labelledby="main-experience-title"
        >
          <header className="section-header">
            <h2 id="main-experience-title">{page.mainExperienceTitle}</h2>
          </header>

          <div className="timeline">
            {page.mainExperiences.map((experience) => (
              <TimelineEntry key={experience.id} experience={experience} />
            ))}
          </div>
        </section>

        <section className="page-section" aria-labelledby="parallel-title">
          <header className="section-header">
            <h2 id="parallel-title">{page.parallelTitle}</h2>
            <p>{page.parallelIntroduction}</p>
          </header>

          <div className="parallel-activities">
            {page.parallelActivities.map((activity) => (
              <article className="parallel-activity" key={activity.id}>
                <header className="parallel-activity__header">
                  <p className="parallel-activity__period">{activity.period}</p>

                  <h3>{activity.title}</h3>
                </header>

                <p className="parallel-activity__summary">{activity.summary}</p>

                <ul className="parallel-activity__highlights">
                  {activity.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" aria-labelledby="teaching-title">
          <header className="section-header">
            <h2 id="teaching-title">{page.teachingTitle}</h2>
          </header>

          <div className="teaching-list">
            {page.teaching.map((entry) => (
              <article className="teaching-entry" key={entry.id}>
                <header className="teaching-entry__header">
                  <p className="teaching-entry__period">{entry.period}</p>

                  <h3>{entry.title}</h3>

                  <p className="teaching-entry__organisation">
                    {entry.organisation}
                  </p>
                </header>

                <p className="teaching-entry__summary">{entry.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" aria-labelledby="education-title">
          <header className="section-header">
            <h2 id="education-title">{page.educationTitle}</h2>
          </header>

          <div className="education-list">
            {page.education.map((entry) => (
              <article className="education-entry" key={entry.id}>
                <header className="education-entry__header">
                  <p className="education-entry__period">{entry.period}</p>

                  <h3>{entry.qualification}</h3>

                  <p className="education-entry__institution">
                    {entry.institution}
                  </p>
                </header>

                {entry.detail ? (
                  <p className="education-entry__detail">{entry.detail}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" aria-labelledby="personal-title">
          <header className="section-header">
            <h2 id="personal-title">{page.personalTitle}</h2>
            <p>{page.personalIntroduction}</p>
          </header>

          <ul className="personal-activities">
            {page.personalActivities.map((activity) => (
              <li className="content-warning" key={activity}>
                {activity}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ExperiencePage;
