import { Link, useParams } from "react-router-dom";

import Breadcrumbs from "../components/breadcrumbs";
import ContentLink from "../components/content-link";
import DetailNavigation from "../components/detail-navigation";
import PageHeader from "../components/page-header";
import {
  getAdjacentProjectIds,
  getProject,
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
      readonly projects: string;
      readonly breadcrumbLabel: string;
      readonly executiveSummary: string;
      readonly contextAndObjectives: string;
      readonly roleAndResponsibilities: string;
      readonly contributionDistribution: string;
      readonly ledOrCoordinated: string;
      readonly personallyDelivered: string;
      readonly collectivelyDelivered: string;
      readonly specialistTeam: string;
      readonly decisionsAndOrganisation: string;
      readonly contributionsAndAchievements: string;
      readonly difficultiesAndTradeoffs: string;
      readonly resultsAndFinalState: string;
      readonly technologiesAndMethods: string;
      readonly evidenceAndResources: string;
      readonly confidentialityAndLimits: string;
      readonly skills: string;
      readonly relatedSoftware: string;
      readonly relatedPublications: string;
      readonly navigationLabel: string;
      readonly backToProjects: string;
      readonly previousProject: string;
      readonly nextProject: string;
      readonly context: string;
      readonly role: string;
      readonly period: string;
      readonly status: string;
    }
  >
> = {
  fr: {
    eyebrow: "Projet détaillé",
    home: "Accueil",
    projects: "Projets",
    breadcrumbLabel: "Fil d’Ariane",
    executiveSummary: "Résumé exécutif",
    contextAndObjectives: "Contexte et objectifs",
    roleAndResponsibilities: "Rôle, équipe et responsabilités",
    contributionDistribution: "Répartition des contributions",
    ledOrCoordinated: "Piloté ou coordonné",
    personallyDelivered: "Réalisé personnellement",
    collectivelyDelivered: "Livré collectivement",
    specialistTeam: "Réalisé par une équipe spécialisée",
    decisionsAndOrganisation: "Décisions et organisation",
    contributionsAndAchievements: "Contributions et réalisations",
    difficultiesAndTradeoffs: "Difficultés et arbitrages",
    resultsAndFinalState: "Résultats et état final",
    technologiesAndMethods: "Technologies et méthodes",
    evidenceAndResources: "Preuves et ressources",
    confidentialityAndLimits: "Confidentialité et limites",
    skills: "Compétences illustrées",
    relatedSoftware: "Logiciels associés",
    relatedPublications: "Publications associées",
    navigationLabel: "Navigation entre les projets",
    backToProjects: "Retour à tous les projets",
    previousProject: "Projet précédent",
    nextProject: "Projet suivant",
    context: "Contexte",
    role: "Rôle",
    period: "Période",
    status: "État final",
  },
  en: {
    eyebrow: "Project details",
    home: "Home",
    projects: "Projects",
    breadcrumbLabel: "Breadcrumb",
    executiveSummary: "Executive summary",
    contextAndObjectives: "Context and objectives",
    roleAndResponsibilities: "Role, team and responsibilities",
    contributionDistribution: "Contribution breakdown",
    ledOrCoordinated: "Led or coordinated",
    personallyDelivered: "Personally delivered",
    collectivelyDelivered: "Delivered collectively",
    specialistTeam: "Delivered by a specialist team",
    decisionsAndOrganisation: "Decisions and organisation",
    contributionsAndAchievements: "Contributions and achievements",
    difficultiesAndTradeoffs: "Difficulties and trade-offs",
    resultsAndFinalState: "Results and final state",
    technologiesAndMethods: "Technologies and methods",
    evidenceAndResources: "Evidence and resources",
    confidentialityAndLimits: "Confidentiality and limitations",
    skills: "Skills demonstrated",
    relatedSoftware: "Related software",
    relatedPublications: "Related publications",
    navigationLabel: "Project navigation",
    backToProjects: "Return to all projects",
    previousProject: "Previous project",
    nextProject: "Next project",
    context: "Context",
    role: "Role",
    period: "Period",
    status: "Final state",
  },
};

function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, content } = useSiteContent();
  const text = labels[language];

  const project = slug ? getProject(language, slug) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  const { previousId, nextId } = getAdjacentProjectIds(language, project.id);

  const previousProject = previousId
    ? getProject(language, previousId)
    : undefined;

  const nextProject = nextId ? getProject(language, nextId) : undefined;

  const relatedSoftware = project.relatedSoftwareIds.flatMap((softwareId) => {
    const software = content.software[softwareId];

    return software ? [software] : [];
  });

  const relatedPublications = project.relatedPublicationIds.flatMap(
    (publicationId) => {
      const publication = content.publications[publicationId];

      return publication ? [publication] : [];
    },
  );

  const description =
    project.description.trim().length > 0
      ? project.description
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
              label: text.projects,
              to: getPageRoute("projects", language),
            },
            {
              label: project.title,
            },
          ]}
        />

        <PageHeader
          eyebrow={text.eyebrow}
          title={project.title}
          introduction={project.summary}
        />

        <section
          className="page-section detail-section"
          aria-labelledby="project-executive-summary"
        >
          <div className="section-header">
            <h2 id="project-executive-summary">{text.executiveSummary}</h2>
          </div>

          <dl className="project-entry__metadata">
            <div>
              <dt>{text.period}</dt>
              <dd>{project.period}</dd>
            </div>

            <div>
              <dt>{text.context}</dt>
              <dd>{project.context}</dd>
            </div>

            <div>
              <dt>{text.role}</dt>
              <dd>{project.role}</dd>
            </div>

            <div>
              <dt>{text.status}</dt>
              <dd>{project.status}</dd>
            </div>
          </dl>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-context"
        >
          <div className="section-header">
            <h2 id="project-context">{text.contextAndObjectives}</h2>
          </div>

          <p>{project.context}</p>
          <p>{description}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-role"
        >
          <div className="section-header">
            <h2 id="project-role">{text.roleAndResponsibilities}</h2>
          </div>

          <p>{project.role}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-contributions"
        >
          <div className="section-header">
            <h2 id="project-contributions">{text.contributionDistribution}</h2>
          </div>

          <dl className="contribution-distribution">
            <div>
              <dt>{text.ledOrCoordinated}</dt>
              <dd>{missingContentPlaceholder}</dd>
            </div>

            <div>
              <dt>{text.personallyDelivered}</dt>
              <dd>{missingContentPlaceholder}</dd>
            </div>

            <div>
              <dt>{text.collectivelyDelivered}</dt>
              <dd>{missingContentPlaceholder}</dd>
            </div>

            <div>
              <dt>{text.specialistTeam}</dt>
              <dd>{missingContentPlaceholder}</dd>
            </div>
          </dl>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-decisions"
        >
          <div className="section-header">
            <h2 id="project-decisions">{text.decisionsAndOrganisation}</h2>
          </div>

          <p className="content-warning">{missingContentPlaceholder}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-achievements"
        >
          <div className="section-header">
            <h2 id="project-achievements">
              {text.contributionsAndAchievements}
            </h2>
          </div>

          {project.highlights.length > 0 ? (
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : (
            <p className="content-warning">{missingContentPlaceholder}</p>
          )}
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-difficulties"
        >
          <div className="section-header">
            <h2 id="project-difficulties">{text.difficultiesAndTradeoffs}</h2>
          </div>

          <p className="content-warning">{missingContentPlaceholder}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-results"
        >
          <div className="section-header">
            <h2 id="project-results">{text.resultsAndFinalState}</h2>
          </div>

          <p>{project.status}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-technologies"
        >
          <div className="section-header">
            <h2 id="project-technologies">{text.technologiesAndMethods}</h2>
          </div>

          {project.technologies.length > 0 ? (
            <ul className="project-entry__technologies">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          ) : (
            <p className="content-warning">{missingContentPlaceholder}</p>
          )}
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-resources"
        >
          <div className="section-header">
            <h2 id="project-resources">{text.evidenceAndResources}</h2>
          </div>

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
          ) : (
            <p className="content-warning">{missingContentPlaceholder}</p>
          )}

          {relatedSoftware.length > 0 ? (
            <>
              <h3>{text.relatedSoftware}</h3>

              <ul>
                {relatedSoftware.map((software) => (
                  <li key={software.id}>
                    <Link to={getSoftwareRoute(software.id, language)}>
                      {software.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

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
          ) : null}
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-confidentiality"
        >
          <div className="section-header">
            <h2 id="project-confidentiality">
              {text.confidentialityAndLimits}
            </h2>
          </div>

          <p>{project.confidentiality ?? missingContentPlaceholder}</p>
        </section>

        <section
          className="page-section detail-section"
          aria-labelledby="project-skills"
        >
          <div className="section-header">
            <h2 id="project-skills">{text.skills}</h2>
          </div>

          <p className="content-warning">{missingContentPlaceholder}</p>
        </section>

        <DetailNavigation
          ariaLabel={text.navigationLabel}
          backLink={{
            label: text.backToProjects,
            to: getPageRoute("projects", language),
          }}
          previousLabel={text.previousProject}
          nextLabel={text.nextProject}
          previousLink={
            previousProject
              ? {
                  label: previousProject.title,
                  to: getProjectRoute(previousProject.id, language),
                }
              : undefined
          }
          nextLink={
            nextProject
              ? {
                  label: nextProject.title,
                  to: getProjectRoute(nextProject.id, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default ProjectDetailPage;
