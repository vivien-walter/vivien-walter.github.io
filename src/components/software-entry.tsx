import { createElement, type ElementType } from "react";
import { Link } from "react-router-dom";

import type { SoftwareEntry as SoftwareEntryData } from "../content/site-content";
import { useSiteContent } from "../content/use-site-content";
import { getSoftwareRoute, type SupportedLanguage } from "../navigation";
import ContentLink from "./content-link";

type SoftwareEntryProps = {
  readonly software: SoftwareEntryData;
  readonly variant?: "summary" | "detailed";
  readonly headingLevel?: 2 | 3;
  readonly featured?: boolean;
};

const labels: Readonly<
  Record<
    SupportedLanguage,
    {
      readonly context: string;
      readonly contribution: string;
      readonly technologies: string;
      readonly resources: string;
      readonly viewDetails: string;
    }
  >
> = {
  fr: {
    context: "Contexte",
    contribution: "Contribution",
    technologies: "Technologies",
    resources: "Ressources",
    viewDetails: "Voir le logiciel détaillé",
  },
  en: {
    context: "Context",
    contribution: "Contribution",
    technologies: "Technologies",
    resources: "Resources",
    viewDetails: "View software details",
  },
};

function SoftwareEntry({
  software,
  variant = "detailed",
  headingLevel = 3,
  featured = false,
}: SoftwareEntryProps) {
  const { language } = useSiteContent();
  const text = labels[language];

  const headingId = `software-${software.id}-title`;
  const Heading = `h${headingLevel}` as ElementType;

  const className = [
    "software-entry",
    `software-entry--${variant}`,
    featured ? "software-entry--featured" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className} aria-labelledby={headingId}>
      <header className="software-entry__header">
        {createElement(
          Heading,
          {
            id: headingId,
            className: "software-entry__title",
          },
          software.title,
        )}

        <p className="software-entry__status">{software.status}</p>
      </header>

      <p className="software-entry__summary">{software.summary}</p>

      {variant === "detailed" ? (
        <>
          <dl className="software-entry__metadata">
            <div>
              <dt>{text.context}</dt>
              <dd>{software.context}</dd>
            </div>

            <div>
              <dt>{text.contribution}</dt>
              <dd>{software.contribution}</dd>
            </div>
          </dl>

          {software.description.trim().length > 0 ? (
            <p className="software-entry__description">
              {software.description}
            </p>
          ) : null}

          {software.highlights.length > 0 ? (
            <ul className="software-entry__highlights">
              {software.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}

          {software.technologies.length > 0 ? (
            <ul
              className="software-entry__technologies"
              aria-label={text.technologies}
            >
              {software.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : null}

          {software.links.length > 0 ? (
            <div className="software-entry__links">
              {software.links.map((link, index) => (
                <ContentLink
                  key={`${link.label}-${index}`}
                  className="editorial-link"
                  language={language}
                  link={link}
                />
              ))}
            </div>
          ) : null}

          {software.resources.length > 0 ? (
            <div className="software-entry__resources">
              <h4>{text.resources}</h4>

              <div className="software-entry__links">
                {software.resources.map((resource, index) => (
                  <ContentLink
                    key={`${resource.label}-${index}`}
                    className="editorial-link"
                    language={language}
                    link={resource}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      <div className="software-entry__links">
        <Link
          className="editorial-link"
          to={getSoftwareRoute(software.id, language)}
        >
          {text.viewDetails}
        </Link>
      </div>
    </article>
  );
}

export default SoftwareEntry;
