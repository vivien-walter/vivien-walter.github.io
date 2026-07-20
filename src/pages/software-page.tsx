import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Breadcrumbs from "../components/breadcrumbs";
import ContentLink from "../components/content-link";
import ContentSections from "../components/content-sections";
import PageHeader from "../components/page-header";
import SoftwareEntry from "../components/software-entry";
import { Card, CardContent } from "../components/ui/card";
import { getLanguageFromPathname, getPageRoute } from "../navigation";
import {
  getSoftwareById,
  getSoftwareIndex,
  getSoftwarePage,
} from "../routes/software/data/software-content.loader";

function SoftwarePage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getSoftwarePage(language);
  const index = getSoftwareIndex(language);
  const featuredIds = new Set(index.featured ?? []);

  const softwareEntries = index.order.flatMap((softwareId) => {
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
              label: t("breadcrumbs.software", { lng: language }),
            },
          ]}
        />

        <PageHeader
          eyebrow={t("pages.software.title", { lng: language })}
          title={page.title}
          introduction={page.introduction}
        />

        <ContentSections
          idPrefix="software-page"
          sections={page.sections ?? []}
        />

        {softwareEntries.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="software-list-title"
          >
            <header className="mb-8 max-w-readable">
              <h2
                id="software-list-title"
                className={[
                  "!m-0 text-xl font-bold leading-heading",
                  "tracking-[-0.025em] text-heading",
                ].join(" ")}
              >
                {t("pages.software.title", { lng: language })}
              </h2>
            </header>

            <div className="grid gap-6">
              {softwareEntries.map(({ software, softwareId }) => (
                <SoftwareEntry
                  key={softwareId}
                  featured={featuredIds.has(softwareId)}
                  software={software}
                  softwareId={softwareId}
                  language={language}
                />
              ))}
            </div>
          </section>
        ) : null}

        {page.links && page.links.length > 0 ? (
          <nav
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-label={t("content.resources", { lng: language })}
          >
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
          </nav>
        ) : null}
      </div>
    </div>
  );
}

export default SoftwarePage;