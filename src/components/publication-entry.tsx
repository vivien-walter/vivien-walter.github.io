import { createElement, type ElementType } from "react";
import { Link } from "react-router-dom";

import type { PublicationEntry as PublicationEntryData } from "../content/site-content";
import { useSiteContent } from "../content/use-site-content";
import {
  getProjectRoute,
  getSoftwareRoute,
  type SupportedLanguage,
} from "../navigation";
import ContentLink from "./content-link";

type PublicationEntryProps = {
  readonly publication: PublicationEntryData;
  readonly headingLevel?: 2 | 3;
  readonly featured?: boolean;
};

const labels: Readonly<
  Record<
    SupportedLanguage,
    {
      readonly contribution: string;
      readonly relatedProjects: string;
      readonly relatedSoftware: string;
    }
  >
> = {
  fr: {
    contribution: "Contribution",
    relatedProjects: "Projets associés",
    relatedSoftware: "Logiciels associés",
  },
  en: {
    contribution: "Contribution",
    relatedProjects: "Related projects",
    relatedSoftware: "Related software",
  },
};

function PublicationEntry({
  publication,
  headingLevel = 3,
  featured = false,
}: PublicationEntryProps) {
  const { language, content } = useSiteContent();
  const text = labels[language];

  const headingId = `publication-${publication.id}-title`;
  const Heading = `h${headingLevel}` as ElementType;

  const relatedProjects = publication.relatedProjectIds.flatMap((projectId) => {
    const project = content.projects[projectId];

    return project ? [project] : [];
  });

  const relatedSoftware = publication.relatedSoftwareIds.flatMap(
    (softwareId) => {
      const software = content.software[softwareId];

      return software ? [software] : [];
    },
  );

  const className = [
    "publication-entry",
    featured ? "publication-entry--featured" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className} aria-labelledby={headingId}>
      <header className="publication-entry__header">
        <p className="publication-entry__year">
          <time dateTime={publication.year}>{publication.year}</time>
        </p>

        {createElement(
          Heading,
          {
            id: headingId,
            className: "publication-entry__title",
          },
          publication.title,
        )}
      </header>

      {publication.authors.trim().length > 0 ? (
        <p className="publication-entry__authors">{publication.authors}</p>
      ) : null}

      <p className="publication-entry__venue">{publication.venue}</p>

      {publication.reference.trim().length > 0 ? (
        <p className="publication-entry__reference">{publication.reference}</p>
      ) : null}

      <p className="publication-entry__contribution">
        <strong>
          {text.contribution}
          {" : "}
        </strong>

        {publication.contribution}
      </p>

      {publication.links.length > 0 ? (
        <div className="publication-entry__links">
          {publication.links.map((link, index) => (
            <ContentLink
              key={`${link.label}-${index}`}
              className="editorial-link"
              language={language}
              link={link}
            />
          ))}
        </div>
      ) : null}

      {relatedProjects.length > 0 ? (
        <div className="publication-entry__relations">
          <h4>{text.relatedProjects}</h4>

          <ul>
            {relatedProjects.map((project) => (
              <li key={project.id}>
                <Link
                  className="editorial-link"
                  to={getProjectRoute(project.id, language)}
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {relatedSoftware.length > 0 ? (
        <div className="publication-entry__relations">
          <h4>{text.relatedSoftware}</h4>

          <ul>
            {relatedSoftware.map((software) => (
              <li key={software.id}>
                <Link
                  className="editorial-link"
                  to={getSoftwareRoute(software.id, language)}
                >
                  {software.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export default PublicationEntry;
