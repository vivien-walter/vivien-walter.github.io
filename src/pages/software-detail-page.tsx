import { Link, useParams } from "react-router-dom";

import Breadcrumbs from "../components/breadcrumbs";
import ContentLink from "../components/content-link";
import DetailNavigation from "../components/detail-navigation";
import PageHeader from "../components/page-header";
import {
  getAdjacentSoftwareIds,
  getSoftware,
  missingContentPlaceholder,
} from "../content/site-content";
import { useSiteContent } from "../content/use-site-content";
import {
  getPageRoute,
  getProjectRoute,
  getSoftwareRoute,
  type SupportedLanguage,
} from "../navigation";
import NotFoundPage from "./not-found-page";

const labels: Readonly<
  Record<
    SupportedLanguage,
    {
      readonly eyebrow: string;
      readonly home: string;
      readonly software: string;
      readonly breadcrumbLabel: string;
      readonly quickSummary: string;
      readonly problemAndContext: string;
      readonly operation: string;
      readonly features: string;
      readonly personalContribution: string;
      readonly usageAndDocumentation: string;
      readonly relatedResearch: string;
      readonly maintenanceAndLimitations: string;
      readonly externalResources: string;
      readonly relatedProjects: string;
      readonly relatedPublications: string;
      readonly navigationLabel: string;
      readonly backToSoftware: string;
      readonly previousSoftware: string;
      readonly nextSoftware: string;
      readonly context: string;
      readonly contribution: string;
      readonly status: string;
    }
  >
> = {
  fr: {
    eyebrow: "Logiciel détaillé",
    home: "Accueil",
    software: "Logiciels",
    breadcrumbLabel: "Fil d’Ariane",
    quickSummary: "Résumé rapide",
    problemAndContext: "Problème et contexte",
    operation: "Fonctionnement général",
    features: "Fonctionnalités principales",
    personalContribution: "Contribution personnelle",
    usageAndDocumentation: "Utilisation et documentation",
    relatedResearch: "Recherche et publications associées",
    maintenanceAndLimitations: "État, maintenance et limites",
    externalResources: "Ressources externes",
    relatedProjects: "Projets associés",
    relatedPublications: "Publications associées",
    navigationLabel: "Navigation entre les logiciels",
    backToSoftware: "Retour à tous les logiciels",
    previousSoftware: "Logiciel précédent",
    nextSoftware: "Logiciel suivant",
    context: "Contexte",
    contribution: "Contribution",
    status: "Statut",
  },
  en: {
    eyebrow: "Software details",
    home: "Home",
    software: "Software",
    breadcrumbLabel: "Breadcrumb",
    quickSummary: "Quick summary",
    problemAndContext: "Problem and context",
    operation: "General operation",
    features: "Main features",
    personalContribution: "Personal contribution",
    usageAndDocumentation: "Usage and documentation",
    relatedResearch: "Related research and publications",
    maintenanceAndLimitations: "Status, maintenance and limitations",
    externalResources: "External resources",
    relatedProjects: "Related projects",
    relatedPublications: "Related publications",
    navigationLabel: "Software navigation",
    backToSoftware: "Return to all software",
    previousSoftware: "Previous software",
    nextSoftware: "Next software",
    context: "Context",
    contribution: "Contribution",
    status: "Status",
  },
};

function SoftwareDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, content } = useSiteContent();
  const text = labels[language];

  const software = slug ? getSoftware(language, slug) : undefined;

  if (!software) {
    return <NotFoundPage />;
  }

  const { previousId, nextId } = getAdjacentSoftwareIds(language, software.id);

  const previousSoftware = previousId
    ? getSoftware(language, previousId)
    : undefined;

  const nextSoftware = nextId ? getSoftware(language, nextId) : undefined;

  const relatedProjects = software.relatedProjectIds.flatMap((projectId) => {
    const project = content.projects[projectId];

    return project ? [project] : [];
  });

  const relatedPublications = software.relatedPublicationIds.flatMap(
    (publicationId) => {
      const publication = content.publications[publicationId];

      return publication ? [publication] : [];
    },
  );

  const description =
    software.description.trim().length > 0
      ? software.description
      : missingContentPlaceholder;

  return (
    <article className="page detail-page" aria-labelledby="page-title">
      <div className="page__inner">
        <Breadcrumbs
          ariaLabel={text.breadcrumbLabel}
          items={[
            {
              label: text.home,
              to: getPageRoute("home", language),
            },
            {
              label: text.software,
              to: getPageRoute("software", language),
            },
            {
              label: software.title,
            },
          ]}
        />

        <PageHeader
          eyebrow={text.eyebrow}
          title={software.title}
          introduction={software.summary}
        />

        <section
          className="page-section detail-section"
          aria-labelledby="software-summary"
        >
          <div className="section-header">
            <h2 id="software-summary">{text.quickSummary}</h2>
          </div>

          <dl className="software-entry__metadata">
            <div>
              <dt>{text.context}</dt>
              <dd>{software.context}</dd>
            </div>

            <div>
              <dt>{text.contribution}</dt>
              <dd>{software.contribution}</dd>
            </div>

            <div>
              <dt>{text.status}</dt>
              <dd>{software.status}</dd>
            </div>
          </dl>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="software-context"
        >
          <div className="section-header">
            <h2 id="software-context">{text.problemAndContext}</h2>
          </div>

          <p>{software.context}</p>
          <p>{description}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="software-operation"
        >
          <div className="section-header">
            <h2 id="software-operation">{text.operation}</h2>
          </div>

          <p className="content-warning">{missingContentPlaceholder}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="software-features"
        >
          <div className="section-header">
            <h2 id="software-features">{text.features}</h2>
          </div>

          {software.highlights.length > 0 ? (
            <ul>
              {software.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : (
            <p className="content-warning">{missingContentPlaceholder}</p>
          )}
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="software-contribution"
        >
          <div className="section-header">
            <h2 id="software-contribution">{text.personalContribution}</h2>
          </div>

          <p>{software.contribution}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="software-usage"
        >
          <div className="section-header">
            <h2 id="software-usage">{text.usageAndDocumentation}</h2>
          </div>

          {software.resources.length > 0 ? (
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
          ) : (
            <p className="content-warning">{missingContentPlaceholder}</p>
          )}
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="software-research"
        >
          <div className="section-header">
            <h2 id="software-research">{text.relatedResearch}</h2>
          </div>

          {relatedPublications.length > 0 ? (
            <>
              <h3>{text.relatedPublications}</h3>

              <ul>
                {relatedPublications.map((publication) => (
                  <li key={publication.id}>
                    {publication.title} — {publication.venue},{" "}
                    {publication.year}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="content-warning">{missingContentPlaceholder}</p>
          )}
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="software-maintenance"
        >
          <div className="section-header">
            <h2 id="software-maintenance">{text.maintenanceAndLimitations}</h2>
          </div>

          <p>{software.status}</p>

          <p className="content-warning">{missingContentPlaceholder}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="software-resources"
        >
          <div className="section-header">
            <h2 id="software-resources">{text.externalResources}</h2>
          </div>

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
          ) : (
            <p className="content-warning">{missingContentPlaceholder}</p>
          )}

          {software.technologies.length > 0 ? (
            <ul className="software-entry__technologies">
              {software.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : null}
        </section>

        {relatedProjects.length > 0 ? (
          <section
            className="page-section detail-section"
            aria-labelledby="software-projects"
          >
            <div className="section-header">
              <h2 id="software-projects">{text.relatedProjects}</h2>
            </div>

            <ul>
              {relatedProjects.map((project) => (
                <li key={project.id}>
                  <Link to={getProjectRoute(project.id, language)}>
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <DetailNavigation
          ariaLabel={text.navigationLabel}
          backLink={{
            label: text.backToSoftware,
            to: getPageRoute("software", language),
          }}
          previousLabel={text.previousSoftware}
          nextLabel={text.nextSoftware}
          previousLink={
            previousSoftware
              ? {
                  label: previousSoftware.title,
                  to: getSoftwareRoute(previousSoftware.id, language),
                }
              : undefined
          }
          nextLink={
            nextSoftware
              ? {
                  label: nextSoftware.title,
                  to: getSoftwareRoute(nextSoftware.id, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default SoftwareDetailPage;
