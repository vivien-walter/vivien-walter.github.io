import { useTranslation } from "react-i18next";
import {
  useLocation,
  useParams,
} from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
  getSoftwareRoute,
} from "@/app/routing/navigation";
import NotFoundPage from "@/routes/not-found/not-found-page";
import DetailDescriptionSection from "@/shared/components/detail-description-section";
import DetailHighlightsBand from "@/shared/components/detail-highlights-band";
import DetailNavigation from "@/shared/components/detail-navigation";
import DetailTechnologiesSection from "@/shared/components/detail-technologies-section";
import PageHero from "@/shared/components/page-hero";

import SoftwareResourcesSection from "./components/software-resources-section";
import {
  getAdjacentSoftwareIds,
  getSoftwareById,
} from "./data/software-content.loader";

function SoftwareDetailPage() {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const language = getLanguageFromPathname(
    location.pathname,
  );

  const software = slug
    ? getSoftwareById(language, slug)
    : undefined;

  if (!software || !slug) {
    return <NotFoundPage />;
  }

  const { previousId, nextId } =
    getAdjacentSoftwareIds(language, slug);

  const previousSoftware = previousId
    ? getSoftwareById(language, previousId)
    : undefined;

  const nextSoftware = nextId
    ? getSoftwareById(language, nextId)
    : undefined;

  const labels =
    language === "fr"
      ? {
          highlights:
            "Informations clés sur le logiciel",
          description: "Description",
          externalLink: "Lien externe",
        }
      : {
          highlights: "Key software information",
          description: "Description",
          externalLink: "External link",
        };

  const idPrefix = `software-${slug}`;

  return (
    <article
      className="overflow-hidden"
      aria-labelledby="page-title"
    >
      <PageHero
        breadcrumbs={{
          ariaLabel: t("breadcrumbs.label", {
            lng: language,
          }),
          items: [
            {
              label: t("breadcrumbs.home", {
                lng: language,
              }),
              to: getPageRoute("home", language),
            },
            {
              label: t("breadcrumbs.software", {
                lng: language,
              }),
              to: getPageRoute(
                "software",
                language,
              ),
            },
            {
              label: software.title,
            },
          ],
        }}
        eyebrow={t("softwareDetail.eyebrow", {
          lng: language,
        })}
        title={software.title}
        introduction={software.summary}
      />

      <DetailHighlightsBand
        ariaLabel={labels.highlights}
        items={software.highlights}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        ].join(" ")}
      >
        <DetailDescriptionSection
          description={software.description}
          idPrefix={idPrefix}
          title={labels.description}
        />

        <DetailTechnologiesSection
          externalLinkLabel={labels.externalLink}
          groups={software.technologyGroups}
          idPrefix={idPrefix}
          title={t(
            "softwareDetail.technologies",
            {
              lng: language,
            },
          )}
        />

        <SoftwareResourcesSection
          links={software.links}
          title={t(
            "softwareDetail.resources",
            {
              lng: language,
            },
          )}
          titleId={`${idPrefix}-resources-title`}
        />

        <DetailNavigation
          ariaLabel={t(
            "softwareDetail.navigationLabel",
            {
              lng: language,
            },
          )}
          backLink={{
            label: t(
              "actions.backToSoftware",
              {
                lng: language,
              },
            ),
            to: getPageRoute(
              "software",
              language,
            ),
          }}
          previousLabel={t(
            "actions.previousSoftware",
            {
              lng: language,
            },
          )}
          nextLabel={t(
            "actions.nextSoftware",
            {
              lng: language,
            },
          )}
          previousLink={
            previousId && previousSoftware
              ? {
                  label:
                    previousSoftware.title,
                  to: getSoftwareRoute(
                    previousId,
                    language,
                  ),
                }
              : undefined
          }
          nextLink={
            nextId && nextSoftware
              ? {
                  label: nextSoftware.title,
                  to: getSoftwareRoute(
                    nextId,
                    language,
                  ),
                }
              : undefined
          }
        />
      </div>
    </article>
  );
}

export default SoftwareDetailPage;