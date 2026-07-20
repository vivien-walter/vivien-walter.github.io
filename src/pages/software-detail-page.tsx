import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

import Breadcrumbs from "../components/breadcrumbs";
import ContentLink from "../components/content-link";
import ContentSections from "../components/content-sections";
import DetailNavigation from "../components/detail-navigation";
import PageHeader from "../components/page-header";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { cn } from "../lib/utils";
import {
  getLanguageFromPathname,
  getPageRoute,
  getSoftwareRoute,
} from "../navigation";
import {
  getAdjacentSoftwareIds,
  getSoftwareById,
} from "../routes/software/data/software-content.loader";
import NotFoundPage from "./not-found-page";

function SoftwareDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const software = slug ? getSoftwareById(language, slug) : undefined;

  if (!software || !slug) {
    return <NotFoundPage />;
  }

  const { previousId, nextId } = getAdjacentSoftwareIds(language, slug);

  const previousSoftware = previousId
    ? getSoftwareById(language, previousId)
    : undefined;

  const nextSoftware = nextId
    ? getSoftwareById(language, nextId)
    : undefined;

  return (
    <article
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
              to: getPageRoute("software", language),
            },
            {
              label: software.title,
            },
          ]}
        />

        <PageHeader
          eyebrow={t("softwareDetail.eyebrow", { lng: language })}
          title={software.title}
          introduction={software.summary}
        />

        <ContentSections
          idPrefix={`software-${slug}`}
          sections={software.sections}
        />

        {software.technologies && software.technologies.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="software-technologies"
          >
            <h2
              id="software-technologies"
              className={cn(
                "!mt-0 !mb-6 text-xl font-bold leading-heading",
                "tracking-[-0.025em] text-heading",
              )}
            >
              {t("softwareDetail.technologies", { lng: language })}
            </h2>

            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {software.technologies.map((technology) => (
                <li className="m-0" key={technology}>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "border border-border bg-muted px-3 py-1",
                      "font-mono font-medium text-muted-foreground",
                    )}
                  >
                    {technology}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {software.links && software.links.length > 0 ? (
          <section
            className="border-t border-border py-12 sm:py-14 lg:py-16"
            aria-labelledby="software-resources"
          >
            <h2
              id="software-resources"
              className={cn(
                "!mt-0 !mb-6 text-xl font-bold leading-heading",
                "tracking-[-0.025em] text-heading",
              )}
            >
              {t("softwareDetail.resources", { lng: language })}
            </h2>

            <Card className="gap-0 border-border-strong py-0 shadow-subtle">
              <CardContent className="grid gap-1 p-3 sm:p-4">
                {software.links.map((link, index) => (
                  <ContentLink
                    key={`${link.href}-${index}`}
                    link={link}
                    variant="resource"
                  />
                ))}
              </CardContent>
            </Card>
          </section>
        ) : null}

        <DetailNavigation
          ariaLabel={t("softwareDetail.navigationLabel", {
            lng: language,
          })}
          backLink={{
            label: t("actions.backToSoftware", { lng: language }),
            to: getPageRoute("software", language),
          }}
          previousLabel={t("actions.previousSoftware", {
            lng: language,
          })}
          nextLabel={t("actions.nextSoftware", {
            lng: language,
          })}
          previousLink={
            previousId && previousSoftware
              ? {
                  label: previousSoftware.title,
                  to: getSoftwareRoute(previousId, language),
                }
              : undefined
          }
          nextLink={
            nextId && nextSoftware
              ? {
                  label: nextSoftware.title,
                  to: getSoftwareRoute(nextId, language),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default SoftwareDetailPage;