import { createElement, type ElementType } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import type { ProjectEntry as ProjectEntryData } from "../content/site-content";
import { useSiteContent } from "../content/use-site-content";
import { getProjectRoute, type SupportedLanguage } from "../navigation";
import ContentLink from "./content-link";

type ProjectEntryProps = {
  readonly project: ProjectEntryData;
  readonly variant?: "summary" | "detailed";
  readonly headingLevel?: 2 | 3;
  readonly featured?: boolean;
};

const labels: Readonly<
  Record<
    SupportedLanguage,
    {
      readonly viewDetails: string;
      readonly confidentiality: string;
    }
  >
> = {
  fr: {
    viewDetails: "Voir le projet détaillé",
    confidentiality: "Confidentialité et limites",
  },
  en: {
    viewDetails: "View project details",
    confidentiality: "Confidentiality and limitations",
  },
};

function ProjectEntry({
  project,
  variant = "detailed",
  headingLevel = 3,
  featured = false,
}: ProjectEntryProps) {
  const { t } = useTranslation();
  const { language } = useSiteContent();
  const text = labels[language];

  const headingId = `project-${project.id}-title`;
  const Heading = `h${headingLevel}` as ElementType;

  const className = [
    "project-entry",
    `project-entry--${variant}`,
    featured ? "project-entry--featured" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className} aria-labelledby={headingId}>
      <header className="project-entry__header">
        <p className="project-entry__period">{project.period}</p>

        {createElement(
          Heading,
          {
            id: headingId,
            className: "project-entry__title",
          },
          project.title,
        )}

        <p className="project-entry__status">{project.status}</p>
      </header>

      <p className="project-entry__summary">{project.summary}</p>

      {variant === "detailed" ? (
        <>
          <dl className="project-entry__metadata">
            <div>
              <dt>{t("content.context")}</dt>
              <dd>{project.context}</dd>
            </div>

            <div>
              <dt>{t("content.role")}</dt>
              <dd>{project.role}</dd>
            </div>
          </dl>

          {project.description.trim().length > 0 ? (
            <p className="project-entry__description">{project.description}</p>
          ) : null}

          {project.highlights.length > 0 ? (
            <ul className="project-entry__highlights">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}

          {project.technologies.length > 0 ? (
            <ul
              className="project-entry__technologies"
              aria-label={t("content.technologies")}
            >
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : null}

          {project.confidentiality ? (
            <div className="project-entry__confidentiality">
              <h4>{text.confidentiality}</h4>
              <p>{project.confidentiality}</p>
            </div>
          ) : null}

          {project.links.length > 0 ? (
            <div className="project-entry__links">
              {project.links.map((link, index) => (
                <ContentLink
                  key={`${link.label}-${index}`}
                  className="editorial-link"
                  language={language}
                  link={link}
                />
              ))}
            </div>
          ) : null}
        </>
      ) : null}

      <div className="project-entry__links">
        <Link
          className="editorial-link"
          to={getProjectRoute(project.id, language)}
        >
          {text.viewDetails}
        </Link>
      </div>
    </article>
  );
}

export default ProjectEntry;
