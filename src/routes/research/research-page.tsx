import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import { Card, CardContent } from "@/components/ui/card";
import SoftwareEntry from "@/routes/software/components/software-entry";
import { getSoftwareById } from "@/routes/software/data/software-content.loader";
import Breadcrumbs from "@/shared/components/breadcrumbs";
import ContentLink from "@/shared/components/content-link";
import ContentSections from "@/shared/components/content-sections";
import PageHeader from "@/shared/components/page-header";

import PublicationEntry from "./components/publication-entry";
import {
  getPublicationById,
  getPublicationIndex,
  getResearchPage,
} from "./data/research-content.loader";

function ResearchPage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getResearchPage(language);
  const index = getPublicationIndex(language);
  const featuredIds = new Set(index.featured ?? []);

  const publications = index.order.flatMap((publicationId) => {
    const publication = getPublicationById(language, publicationId);

    return publication ? [{ publication, publicationId }] : [];
  });

  const softwareEntries = (page.softwareIds ?? []).flatMap((softwareId) => {
    const software = getSoftwareById(language, softwareId);

    return software ? [{ software, softwareId }] : [];
  });

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
        <Breadcrumbs
          ariaLabel={t("breadcrumbs.label", { lng: language })}
          items={[
            {
              label: t("breadcrumbs.home", { lng: language }),
              to: getPageRoute("home", language),
            },
            {
              label: t("pages.research.title", { lng: language }),
            },
          ]}
        />

        <PageHeader
          eyebrow={t("pages.research.title", { lng: language })}
          title={page.title}
          introduction={page.introduction}
        />

        <ContentSections
          idPrefix="research-page"
          sections={page.sections ?? []}
        />

        {publications.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="publications-title"
          >
            <header className="mb-8 max-w-readable">
              <h2
                id="publications-title"
                className={[
                  "!m-0 text-xl font-bold leading-heading",
                  "tracking-[-0.025em] text-heading",
                ].join(" ")}
              >
                {t("pages.research.title", { lng: language })}
              </h2>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              {publications.map(({ publication, publicationId }) => (
                <PublicationEntry
                  key={publicationId}
                  featured={featuredIds.has(publicationId)}
                  publication={publication}
                  publicationId={publicationId}
                  language={language}
                />
              ))}
            </div>
          </section>
        ) : null}

        {softwareEntries.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="research-software-title"
          >
            <header className="mb-8 max-w-readable">
              <h2
                id="research-software-title"
                className={[
                  "!m-0 text-xl font-bold leading-heading",
                  "tracking-[-0.025em] text-heading",
                ].join(" ")}
              >
                {t("pages.software.title", { lng: language })}
              </h2>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
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

        {page.links && page.links.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="research-links-title"
          >
            <header className="mb-8 max-w-readable">
              <h2
                id="research-links-title"
                className={[
                  "!m-0 text-xl font-bold leading-heading",
                  "tracking-[-0.025em] text-heading",
                ].join(" ")}
              >
                {t("content.resources", { lng: language })}
              </h2>
            </header>

            <Card className="gap-0 border-border-strong py-0 shadow-subtle">
              <CardContent className="grid gap-1 p-3 sm:p-4">
                {page.links.map((link, indexValue) => (
                  <ContentLink
                    key={`${link.href}-${indexValue}`}
                    link={link}
                    variant="resource"
                  />
                ))}
              </CardContent>
            </Card>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default ResearchPage;