import { createElement, type ElementType } from "react";
import { useTranslation } from "react-i18next";

import type { ExperienceEntry } from "../content/site-content";

type TimelineEntryProps = {
  readonly experience: ExperienceEntry;
  readonly headingLevel?: 2 | 3;
};

function TimelineEntry({ experience, headingLevel = 3 }: TimelineEntryProps) {
  const { t } = useTranslation();

  const headingId = `experience-${experience.id}-title`;
  const Heading = `h${headingLevel}` as ElementType;

  return (
    <article className="timeline-entry" aria-labelledby={headingId}>
      <header className="timeline-entry__header">
        <p className="timeline-entry__period">{experience.period}</p>

        {createElement(
          Heading,
          {
            id: headingId,
            className: "timeline-entry__title",
          },
          experience.organisation,
        )}

        <p className="timeline-entry__location">{experience.location}</p>
      </header>

      <dl className="timeline-entry__roles">
        {experience.publicTitle ? (
          <div className="timeline-entry__role">
            <dt>{t("content.publicTitle")}</dt>
            <dd>{experience.publicTitle}</dd>
          </div>
        ) : null}

        <div className="timeline-entry__role">
          <dt>{t("content.contractualTitle")}</dt>
          <dd>{experience.contractualTitle}</dd>
        </div>
      </dl>

      <p className="timeline-entry__summary">{experience.summary}</p>

      <ul className="timeline-entry__highlights">
        {experience.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  );
}

export default TimelineEntry;
