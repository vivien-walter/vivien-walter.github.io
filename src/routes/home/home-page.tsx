import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { getLanguageFromPathname } from "@/app/routing/navigation";
import ProjectEntry from "@/routes/projects/components/project-entry";
import { getProjectById } from "@/routes/projects/data/project-content.loader";
import PublicationEntry from "@/routes/research/components/publication-entry";
import { getPublicationById } from "@/routes/research/data/research-content.loader";
import SoftwareEntry from "@/routes/software/components/software-entry";
import { getSoftwareById } from "@/routes/software/data/software-content.loader";
import ContentSections from "@/shared/components/content-sections";
import PageHeader from "@/shared/components/page-header";

import { getHomeContent } from "./data/home-content.loader";

function HomePage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getHomeContent(language);

  const projects = (page.featuredProjects ?? []).flatMap((projectId) => {
    const project = getProjectById(language, projectId);

    return project ? [{ project, projectId }] : [];
  });

  const softwareEntries = (page.featuredSoftware ?? []).flatMap(
    (softwareId) => {
      const software = getSoftwareById(language, softwareId);

      return software ? [{ software, softwareId }] : [];
    },
  );

  const publications = (page.featuredPublications ?? []).flatMap(
    (publicationId) => {
      const publication = getPublicationById(language, publicationId);

      return publication ? [{ publication, publicationId }] : [];
    },
  );

  return (
    <div
      className="relative isolate overflow-hidden"
      aria-labelledby="page-title"
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 top-0 -z-10",
          "h-[clamp(18rem,42vw,32rem)]",
          "bg-[linear-gradient(135deg,rgb(32_84_147_/_0.07),transparent_55%),linear-gradient(45deg,transparent_58%,rgb(173_89_55_/_0.06))]",
        ].join(" ")}
      />

      <div className="mx-auto w-full max-w-editorial px-page py-12 sm:py-16 lg:py-24">
        <PageHeader
          eyebrow={t("pages.home.title", { lng: language })}
          title={page.title}
          introduction={page.introduction}
        />

        <ContentSections
          idPrefix="home"
          sections={page.sections}
        />

        {projects.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="home-projects-title"
          >
            <header className="mb-8 max-w-readable">
              <h2
                id="home-projects-title"
                className={[
                  "!m-0 text-xl font-bold leading-heading",
                  "tracking-[-0.025em] text-heading",
                ].join(" ")}
              >
                {t("pages.projects.title", { lng: language })}
              </h2>
            </header>

            <div className="grid gap-5 lg:grid-cols-2">
              {projects.map(({ project, projectId }) => (
                <ProjectEntry
                  key={projectId}
                  project={project}
                  projectId={projectId}
                  language={language}
                  variant="summary"
                />
              ))}
            </div>
          </section>
        ) : null}

        {softwareEntries.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="home-software-title"
          >
            <header className="mb-8 max-w-readable">
              <h2
                id="home-software-title"
                className={[
                  "!m-0 text-xl font-bold leading-heading",
                  "tracking-[-0.025em] text-heading",
                ].join(" ")}
              >
                {t("pages.software.title", { lng: language })}
              </h2>
            </header>

            <div className="grid gap-5 lg:grid-cols-2">
              {softwareEntries.map(({ software, softwareId }) => (
                <SoftwareEntry
                  key={softwareId}
                  software={software}
                  softwareId={softwareId}
                  language={language}
                  variant="summary"
                />
              ))}
            </div>
          </section>
        ) : null}

        {publications.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="home-publications-title"
          >
            <header className="mb-8 max-w-readable">
              <h2
                id="home-publications-title"
                className={[
                  "!m-0 text-xl font-bold leading-heading",
                  "tracking-[-0.025em] text-heading",
                ].join(" ")}
              >
                {t("pages.research.title", { lng: language })}
              </h2>
            </header>

            <div className="grid gap-5 lg:grid-cols-2">
              {publications.map(({ publication, publicationId }) => (
                <PublicationEntry
                  key={publicationId}
                  publication={publication}
                  publicationId={publicationId}
                  language={language}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;